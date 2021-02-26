# Classes
SImilar to HLSL, classes in AZSL can be defined using the `class` keyword, and they can inherit from a single class or from multiple interfaces. However, there are a couple of points to consider when working with classes in AZSL. 
- Late symbols are not tolerated in the class method scope; this can be worked around by using deported method definition. 
- Repeatedly qualifying in-class method definitions is tolerated.
- Variables defined in class cannot be initialized immediately because there are no constructors in AZSL. 

These points are described in further detail below. 

## Late Symbols
In the class method scope, you should not reference symbols that are declared later in the class because the symbols will not be linked properly. 

Consider the following AZLS code sample, where method `M` references the symbol `v` before it is declared. 
```cpp
class C
{
    void M(){ v = 2; }
    int v; 
};
```
This is not good practice, however it will not cause an error in the compiler. AZSLc is permissive, meaning if it can't verify a construct, it will let the construct pass as is. The converted HLSL code will have the same behavior because HLSL6 handles classes and methods.

However, a problem might occur if the symbol `v` needs a translation. In such case, AZSLc cannot perform the translation within M()'s body. Translations are commonly needed in nested user-defined types, which are declared within SRGs or functions. 

We can verify that a symbol isn't properly handled by AZSLc by using the `--dumpsym` option on that program as shown below. Notice that symbol `'/C/v'` has no references. Also, the symbol is not shown in line 3 within method `M`'s body.

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

Alternatively, we can declare the symbol `v` before calling it in method `M`, as shown in the following code. The symbol `'C/v'` now has a reference in line 4. This refers to the symbol's appearance within `M`'s body.

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

To summarize, if you refer to symbols that are declared at a later point, it is not guaranteed that the emission will be correct. Unlike C++, AZSL doesn't support multi-pass compilation and is not able to see symbols declared later. In some cases, the problem might not occur if the symbols do not undergo any migration or rename. Still, it is not recommended. The warning appears as an "undeclared reference to identifier" from DXC.

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
It is recommended to work around the late symbols problem by using deported definitions, or out-of-class definitions.

The following code shows examples of deported method definitions. The functions `GetTransform` and `Apply` are first declared in the class and are later defined outside of the class. 
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

It is still possible to declare methods earlier than memebers. Then, you can define the method bodies outside of the class. This way, symbol lookup appears to behave as one would expect in C++. 

Going back to our previous code sample that contained the late symbols problem, we can work around the problem by applying a deported method definition. We get the following code: 
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

Note that this time, variable `v` is left un-mutated. This is because AZSLc understood that `v` was referring to the one within class CB, and not the one within the SRG. 

Note: AZSLc will emit the fully qualified name wherever it has a procedural emission routine, which is usually in any declarative construct. This is opposed to a token pass through routine, such as variable initializer expressions and function bodies.


## Method Definition Overqualification
<!-- [WRITER NOTE: Reword] -->
In AZSL, you are allowed to redundantly qualify method definitions (not declarations). This is allowed as long as the methods are declared at an earlier point. A *qualified* method definition is one that is unambiguous. For example, if method M is defined within class A, its qualified name would be `A::M`.

In this code sample, the method definition for `M` is considered to be overqualified because it is defined within class `A` *and* it is defined as `A::M`. However, AZSLc has no problem compiling this because M is declared before its overqualified method definition. 
```cpp
class A
{
    void M();       // line 3 
    void A::M() {}  // overqualification is tolerated
};
```

If instead you overqualify the early method declaration (in line 3); then the compiler will output the following error:
```
    /tmp/tmp-19052HwyLl3Bez6II(4,12) : Semantic error #6: voidA::M() is overly qualified. In-class declarations spawn new identifiers, and don't have to refer to existing symbols.
```

Also, note that if you declare and define a method in a single statement, the compiler will output an error, as shown below. 
```cpp
class A
{
    void A::M() {}  // not ok
};
```
```
/tmp/tmp-19052HwyLl3Bez6II(3,4) : Semantic error #4: class /A doesn't have a declaration for M()
```

When introducing a new symbol, an unqualified identifier is required. However, when referencing an existing symbol, a qualified identifier is permitted. 

## Member Initializers
<!-- [WRITER NOTE: Reword] -->
In C++11, members can be initialized immediately in the class declaration. This behavior is not permitted in AZSL (nor in HLSL) because there are no constructors. 

```cpp
class C
{
    int member = 3;  // #EC 43 default member init not supported
};
```