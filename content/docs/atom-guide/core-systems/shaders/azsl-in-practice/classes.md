# Classes
A class can have object-oriented features and methods. Classes can also inherit multiple interfaces and class-to-class inheritance is allowed. 

## Late symbols in the class method scope
In the class method scope, you should not reference symbols that are declared later in the class because the symbols will not be linked properly. 

### Incorrect way
Consider the following example, where method `M` references the symbol `v` before it is declared. 

```cpp
class C
{
    void M(){ v = 2; }
    int v; 
};
```
This is not good practice, however it will not cause an error in the compiler. AZSLc is permissive; if it can't verify a construct, it will let the construct pass as is. The converted HLSL code will have the same behavior because HLSL6 handles classes and methods.

The problem is, if the symbol `v` needs a translation, AZSLc cannot perform it within M()'s body. Such translations might be needed in nested user-defined types, which are declared within SRGs or functions. 

We can verify that a symbol isn't properly handled by AZSLc by using the `--dumpsym` option on that program as shown below. Notice that Symbol `'/C/v'` has no references. Also, it isn't seen on line 3 within method `M`'s body.

```cpp
Symbol '/C':
  kind: Class
  references:
  line: 1
  members:
    - {kind: Function, name: '/C/M()'}
    - {kind: Variable, name: '/C/v'}
Symbol '/C/M()':        
  kind: Function
  references:
  line: 3
  def line: 3
  must override: 0
  is method: 1
  is virtual: 0
  return type:
    core: {name: "?void", validity: found, tclass: Void, underlying_scalar: <NA>}
    generic: <NA>
  has overriding children:
  is hiding base symbol: ''
  parameters:
Symbol '/C/M':
  kind: OverloadSet
  references:
  functions:
    - '/C/M()'
Symbol '/C/v':
  kind: Variable
  references:           // Symbol `/C/v` has no references
  line: 4
  type:
    core: {name: "?int", validity: found, tclass: Scalar, underlying_scalar: int}
    generic: <NA>
  array dim: ""
  has sampler state: no
  storage:
```
### Correct way
Alternatively, if we declare the symbol `v` before calling it in method `M`, we get the following code. The Symbol `'C/v'` now has a reference line 4 column 15. This is its appearance in the assignation expression within `M`'s body.
```cpp
class C
{
    int v;
    void M(){ v = 2; }
};
```
Now, if we run the `--dumpsym` option on the code, we get the result below. 
```cpp
Symbol '/C':
  kind: Class
  references:
  line: 1
  members:
    - {kind: Variable, name: '/C/v'}
    - {kind: Function, name: '/C/M()'}
Symbol '/C/v':
  kind: Variable
  references:               // Symbol `/C/v` is referenced in line 4
    - {line: 4, col: 15}
  line: 3
  type:
    core: {name: "?int", validity: found, tclass: Scalar, underlying_scalar: int}
    generic: <NA>
  array dim: ""
  has sampler state: no
  storage:
Symbol '/C/M()':        // Method M is defined in line 4
  kind: Function
  references:
  line: 4
  def line: 4
  must override: 0
  is method: 1
  is virtual: 0
  return type:
    core: {name: "?void", validity: found, tclass: Void, underlying_scalar: <NA>}
    generic: <NA>
  has overriding children:
  is hiding base symbol: ''
  parameters:
Symbol '/C/M':
  kind: OverloadSet
  references:
  functions:
    - '/C/M()'
```


In conclusion, it is not guaranteed that emission will be correct if you refer to symbols that are declared at a later point. Unlike C++, AZSL doesn't support multi-pass compilation and is not able to see symbols declared later. In some cases, the problem might not occur if the symbols do not undergo any migration or rename. Still, it is not recommended. The warning appears as an "undeclared reference to identifier" from DXC.

This might also cause a greater risk in lookups, such as in the AZSL code below. Picking an unrelated identifier with a mutated name might result in a silent, false-positive build.

```cpp
ShaderResourceGroupSemantic slot1 { FrequencyId = 1; };
ShaderResourceGroup SRG : slot1
{
    int v;
    struct S
    {
        class CB
        {
            void M() { v = 3; }
            int v;
        };
    };
};
```

This converts to the following HLSL code. In line 8, we expect to see the expression `v = 3`, but got an unintended conversion. The variable has to be hooked up to a symbol outside of C and mutated to its transpiled identity. 

```cpp
// HLSL emission by AZSL Compiler 1.7.13 Unix
struct SRG_S
{
    class CB
    {
            void M()
            {
                ::SRG_SRGConstantBuffer.SRG_v = 3 ;     // line 8
            }
 
            int v;
    };
};
 
/* Generated code from
ShaderResourceGroup SRG
*/
struct SRG_SRGConstantsStruct
{
    int SRG_v;
};
 
ConstantBuffer<::SRG_SRGConstantsStruct> SRG_SRGConstantBuffer :
register(b0);
```
In this instance, DXC complains with `8:19: error: no member named 'SRG_SRGConstantBuffer' in the global namespace`. To resolve this, add `static` in front of `int v;`. This results in a silent success built in both AZSLc and DXC. 


## Deported Method Definition
<!-- [WRITER NOTE: Reword] -->
Instead, it is recommended to work around the late symbols problem by using deported definitions. Sometimes called out-of-class definitions.
Example:

```cpp
class Light
{
    float4x4 GetTransform();
    float3 Apply(float3 albedo, float3 incident);
     
    float3 m_color;
    float4x4 m_transform;
};
 
float4x4 Light::GetTransform()
{
    return m_transform;
}
 
float3 Light::Apply(float3 albedo, float3 incident)
{
    return m_color * albedo * Lambert(incident, GetTransform());
}
```

You may still declare methods earlier than members, but if you put their definition bodies later, you will get the unsurprising symbol lookups, as a C++ programmer expects.

If we apply that recommendation to the previously problematic snippet presented, we get:

```cpp
ShaderResourceGroupSemantic slot1 { FrequencyId = 1; };
ShaderResourceGroup SRG : slot1
{
    int v;
    struct S
    {
        class CB
        {
            void M();
            int v;
        };
    };
};
 
void SRG::S::CB::M() { v = 3; }
```

The output for method `M` is: 
```cpp
void (::SRG_S::CB::M)()
{
    v = 3 ;
}
```
`v` is left un-mutated because this time around, AZSLc understood it was referring to the one within CB, and not the one within SRG. Don't mind the parenthesis, it's an HLSL/C++ syntax inconvenience to separate the nested identifiers that compose the class fully qualified name, from the return type.

Note: AZSLc will emit fully qualified name wherever it has a procedural emission routine. Mostly any declarative construct. As opposed to a token pass through routine*, such as variable initializer expressions and function bodies.


### Method Definition Overqualification
<!-- [WRITER NOTE: Reword] -->
Nethod in-class definition overqualification is tolerated, if pre-declared. In AZSL, you are allowed to redundantly qualify method definitions (not declarations)
Example:
```cpp
class A
{
    // declare
    void M();
    // define
    void A::M() {}  // overqualification is tolerated
};
```

But if you over-qualify the early declaration in line 4; then the compiler will complain with:

    /tmp/tmp-19052HwyLl3Bez6II(4,12) : Semantic error #6: voidA::M() is overly qualified. In-class declarations spawn new identifiers, and don't have to refer to existing symbols.

Likewise, if you collapse both declaration & definition into one statement, the compiler will complain with:
    /tmp/tmp-19052HwyLl3Bez6II(3,4) : Semantic error #4: class /A doesn't have a declaration for M()

That's the difference between the introduction of a new symbol, which requires a unqualified identifier; with the reference to an existing symbol, which may be qualified.

#### Member Initializers
<!-- [WRITER NOTE: Reword] -->
In C++11 struct/class members can bear their initializer expression immediately on the in-class declaration line. But in HLSL and AZSL since there are no constructors, this construct is ill-formed.
Example:
```cpp
class C
{
    int member = 3;  // #EC 43 default member init not supported
};
```