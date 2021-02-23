# Functions

## Function Declarations
Functions can be declared but not defined. They act similarly to a forward declaration. AZSLc will ignore repetitions of declarations. However, redefinition leads to an error. 

### Default parameter values
```cpp
void F(float F = 0.3f, int I);
void F(float f, int i = 6)
{
}
```

This is converted to the following HLSL code.

```cpp
void Func(float = 0.3f, int = 6);
void Func(float f, int i)
{
}
```

AZSLc performs a step called "Merge default parameters" at each encounter of a declaration for a given function. In the final emission, they are regenerated on the first appearance of the symbol.

The parameter names have been removed from the first re-emitted line, that's an artefact of an internal trick to avoid symbol collisions because they would end up with the same mangled name. This might lead to side effects as shown in the following example. 

```cpp
void Func(float F = 0.3f, int I);
static typeof(Func)::F g_f;
 
void Func(float F2, int I2)
{}
static typeof(Func)::F g_f2;
```

The compiler complains with the following warning: 
    /tmp/tmp-127915h0Nwkp0K0HE(7,22) : warning: undeclared sub-symbol in idexpression: F
    /tmp/tmp-127915h0Nwkp0K0HE(7,22) : warning: type tracking fail: F is not a member of /Func(?float,?int)

It produces the following HLSL. 
```cpp
void Func(float = 0.3f, int);
static float g_f;
void Func(float F2, int I2)
{}
static <fail> g_f2;
```

As you can see `/Func/F` got erased from the symbol table after the apparition of the final definition of the symbol `Func`. This is a rare occurrence of a destructive mutation on the symbol table. We try to avoid this mutation because the symbol table is supposed to be an immutable concept. Further code may never alter previous code. Since semantic checks happen simultaneously to that table's construction, they cannot be retroactively amended. Functions with named parameters which were declared early are the only known exceptions. 



## Function Overloading
<!-- [WRITER NOTE: Reword] -->
### Parameter default values
Overloading was introduced in version 1.3, but to limit costs of implementation of the symbol migration system (to erase SRG in HLSL), overloads are not combinable with default parameter values. If you want the full story, the whole implementation journal is available here.

### Overload resolution
A second limitation, more subtle, is that sometimes the compiler internals may not be able to determine what overload is called, on a given call site. This stems from the potential inability of the compiler to deduce the types used in the arguments. This can happen in expressions that implicates HLSL intrinsics, or expression with operators.
Example:

```cpp
struct A {};
struct B {};
 
A make(int);
B make(uint);
 
void main()
{
    float x = 0.5;
    A a = make(floor(x) + 1);   // line 10
}
```

After running the above code, AZSL outputs the error below. This is an error because functions belonging to this overload-set have heterogeneous return types. Consider using type-casts to help type resolution.
  
    /tmp/tmp-13891Ko0tSIPy5nhu(10,14) : Semantic error #41: unable to match arguments (<fail>) to a registered overload. candidates are:
    /make(?int)
    /make(?uint)

You can fix this by using a cast, the cast expression is simple to understand to AZSLc.
Change line 10 to: `A a = make((int)(floor(x) + 1));`

### Expression is not supported, but resolution is not important
<!-- [WRITER NOTE: Rename heading. Reword content] -->
There are 2 cases where resolution is not important and will not result in an error, and one case where resolution will happen even with unsupported expressions:

#### fundamental return types
If all your overloaded functions return fundamental types (float2, matrix3x3, bool, dword...) the compiler isn't required anymore to track what overload was selected because a fundamental type is a dead end for the symbol reference tracking system. Meaning there is no transpilation to be performed on such types or their members (like .rgb).

you may refer to Overhaul/tests/Semantic/overload-resolution-impossible-made-possible2.azsl test file in the code repository of AZSLc

#### homogeneous return types
If all your overloaded functions return the same type, maybe an UDT (user defined type), then resolution is not necessary because the symbol reference tracking system only needed to "pass through" the call of the function to evaluate it's return type. If the return type is invariant, it's trivial to do.

you may refer to Overhaul/tests/Semantic/overload-resolution-impossible-made-possible3.azsl test file in the code repository of AZSLc

#### discriminated arity
If your functions have different number of parameters, unsupported expressions are not a problem because resolution becomes trivial. (if and only if there are no possible default argument values! this is also why it's forbidden to mix them with overloading)

you may refer to Overhaul/tests/Semantic/overload-resolution-impossible-made-possible4.azsl test file in the code repository of AZSLc

### Other notes on function overloading
Note: that there is no ADL lookup in AZSL. Because there are no front-end available namespaces.
Note: It is not possible to overload by return type. Only parameters.


## Intrinsic Functions
<!-- [WRITER NOTE: Reword] -->
Let's take for example:
```cpp
float4 MainPS(float2 uv) : SV_Target0
{
    float s, c;
    sincos(uv.x, s, c);
    return s.xxxx;
}
```

with --W3 this will cause

    /tmp/tmp-8761qOeVI0uo89CU(10,5) : warning: undeclared sub-symbol in idexpression: sincos

The reason is: no HLSL intrinsic function, or submembers of intrinsic types, are registered within AZSLc. It has no knowledge of all these symbols, so it can't track them, nor migrate or translate anything on them. It is deemed not a problem because there is usually nothing to translate on them (except for template Load on append buffer which returns a UDT, support for this should happen later).
