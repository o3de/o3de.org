---
title: AZSL Functions
description: Learn about functions in the AZSL shader language.
---

Functions in AZSL work similarly to HLSL (see the [Microsoft DirectX HLSL - Functions documentation](https://docs.microsoft.com/windows/win32/direct3dhlsl/dx-graphics-hlsl-functions)). However, there are a few differences to note about functions in AZSL. 

## Function Declarations
AZSL supports forward declarations of functions, meaning a function can be declared before it is defined. If a function is declared multiple times, AZSLc will ignore the repeated declarations. Note that redefined functions are not permitted and lead to a compile error.

### Default Parameter Values
When compiling functions that are declared multiple times, AZSLc merges the function's default parameters at each encounter of the function declaration. In the final emission, the default parameters are generated in the first appearance of the symbol. 

To demonstrate this behavior, consider the following AZSL code sample and its HLSL translation after compilation. Here we declare and later define the function `Func` with default parameter values.
```cpp
// AZSL code
void Func(float F = 0.3f, int I);
void Func(float f, int i = 6)
{
}

...


// HLSL translation after compiling
void Func(float = 0.3f, int = 6);   // parameter names are removed to avoid symbol collision
void Func(float f, int i)
{
}
```

Note that in the HLSL translation, the parameter names have been removed from the first re-emitted line. This is to avoid symbol collisions. Otherwise, the function declarations lead to the same mangled name. However, there are some side effects to this that lead to an undesired mutation in the symbol table. 

To demonstrate this limitation, consider the following AZSL code sample. Just as in the previous code sample, we declare and later define `Func`. This time, we also insert variable declarations with type `typeof(Func)` after each declaration.

```cpp
void Func(float F = 0.3f, int I);
static typeof(Func)::F g_f;
 
void Func(float F2, int I2)
{}
static typeof(Func)::F g_f2;
```

After compiling this code sample, AZSLc complains with the following warning. 
```
/tmp/tmp-127915h0Nwkp0K0HE(7,22) : warning: undeclared sub-symbol in idexpression: F
/tmp/tmp-127915h0Nwkp0K0HE(7,22) : warning: type tracking fail: F is not a member of /Func(?float,?int)
```    

It also produces the following HLSL code. 
```cpp
void Func(float = 0.3f, int);
static float g_f;
void Func(float F2, int I2)
{}
static <fail> g_f2;     // not okay
```

As you can see from the compiler error and the HLSL translation, the symbol `/Func/F` got erased from the symbol table when the symbol `Func` was redeclared. This is a rare occurrence of a destructive mutation on the symbol table, which is supposed to be an immutable concept. Since semantic checks happen simultaneously to the symbol table's construction, they cannot be retroactively amended. 

This case, where functions with named parameters are declared early, is the only known cause to this problem.


## Function Overloading
Function overloading is supported in AZSL. However, there are a few limitations to bear in mind:  
- Overloads cannot be combined with default parameter values.
- Overload resolution might encounter trouble resolving types in the function's arguments.
- In some cases, overload resolutions are not required and do not lead to errors.
- In another case, overload resolution successfully occurs even with unsupported expressions. 

The last three points are described in further detail. 

### Overload Resolution 
When compiling a function call to a function with multiple declarations, there might be multiple candidate functions. In that case, overload resolution must select the function to be called. 

#### Resolving Types
A limitation to this is that the compiler internals might not be able to determine what overload is called on a given call site. This is caused by the compiler's inability to deduce the types used in the function's arguments. This commonly appears in arguments that contain expressions that implicate intrinsics or expressions with operators. 

To demonstrate this behavior, consider the following AZSL code sample. 
```cpp
struct A {};
struct B {};
 
A Func(int);
B Func(uint);
 
void main()
{
    float x = 0.5;
    A a = Func(floor(x) + 1);   // line 10
}
```

The above code leads to the following compiler error. 
```
/tmp/tmp-13891Ko0tSIPy5nhu(10,14) : Semantic error #41: unable to match arguments (<fail>) to a registered overload. candidates are:
/Func(?int)
/Func(?uint)
```
This error occurs because functions belonging to the overloaded function have heterogeneous return types. As a solution, consider using type-casts for type resolution. For example, you can insert a type-cast into line 10: `A a = Func((int)(floor(x) + 1));`

#### Other Cases
There are a couple of other cases to consider regarding overload resolutions. 

In the following two cases, overload resolution is not important and will not result in an error. 
- **Fundamental return types**  
    If all your overloaded functions return fundamental types, such as *float2*, *matrix3x3*, *bool*, *dword*, the compiler is not required to track what overload was selected because a fundamental type is a dead end for the symbol reference tracking system. This means the compiler does not need to transpile such types or their members, such as *.rgb*.

- **Homogeneous return types**  
    If all your overloaded functions return the same type, maybe an UDT (user defined type), then resolution is not necessary because the symbol reference tracking system only needed to "pass through" the call of the function to evaluate its return type. If the return type is invariant, it's trivial to do.

In the following case, overload resolution occurs even with unsupported expressions. 
- **Discriminated arity**  
    If your functions have different numbers of parameters, unsupported expressions are not a problem because resolution becomes trivial for the compiler.

## Intrinsic Functions
HLSL contains a list of intrinsic functions that can also be used in AZSL (see [Microsoft DirectX HLSL - Intrinsics documentation](https://docs.microsoft.com/windows/win32/direct3dhlsl/dx-graphics-hlsl-intrinsic-functions)). Although intrinsic functions are supported, using them leads to compiler warnings. This is because HLSL intrinsic functions, or submembers of intrinsic types are not registered within AZSLc. AZSLc has no knowledge of any of these symbols, so it can't track them nor migrate or translate anything on them. This warning can be safely ignored because the intrinsic functions get passed on into HLSL, which will then be compiled. 

The following AZSL code sample demonstrates the use of the intrinsic function `sincos` and the resulting warning. 
```cpp
float4 MainPS(float2 uv) : SV_Target0
{
    float s, c;
    sincos(uv.x, s, c);
    return s.xxxx;
}
```

When running AZSLc with the option `--W3`, the compiler outputs the following. AZSLc does not recognize sincos as an intrinsic function, but it is not a problem because it is later handled by the HLSL compiler.
```
/tmp/tmp-8761qOeVI0uo89CU(10,5) : warning: undeclared sub-symbol in idexpression: sincos
```
