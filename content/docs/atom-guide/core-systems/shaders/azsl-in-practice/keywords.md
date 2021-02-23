# Keywords
## Typeof
`typeof` is a keyword of AZSL akin to `decltype` of C++. It is exposed as the artefact of an internal requirement. Since it is absent from the public feature list, it is not universally supported.
It will work within` __azslc_print_symbol` debug intrinsic, or at a declaration scope. It will not get resolved when used within function bodies within imperative code.

Example: 
```cpp
static int g_i = 2;
static typeof(g_i) g_j;  // ok! will result in `static int g_j;` in HLSL
 
struct S
{
    float4 light;
    typeof(light) antilight;  // ok! will result in `float4` in HLSL
};
 
void Func()
{
    float g;
    typeof(g) h;  // no! because as of now, those tokens will just be replayed as is.
}
```

A limitation may happen when the expression within the parenthesis is too hard for AZSLc to decipher. In that case, an indication of type-collapse failure will happen through a warning and the emission of a `<fail>` in the HLSL product. 

## Typedef AND Typealias
`typedef` was introduced in HLSL6 with the switch from fxc to dxc and is  supported in AZSL. `typedef` works with the same syntax rule as in C. `typealias` is an equivalent feature named after the Swift™ language that behaves like `using` in C++11.

Consider the following example.
```cpp
typealias UVType = float2;
 
float4 MainPS(UVType uv) : SV_Target0
{
    return (float4)0;
}
```
In this context, the reference to the `typealias`'s name UVType, appears in declarative code (the signature of MainPS definition). AZLSc will translate it fully for the HLSL side. This results in the following HLSL. 
```cpp
typedef float2 UVType;
float4 MainPS(float2 uv) : SV_Target0
{
    return (float4) 0 ;
}
```

It is possible to immediately alias types that are declared inline to the type expression. 
```cpp
typealias NewStruct = struct S {};
typedef struct S2 {} NewS2;
```
This results in the following HLSL. 
```cpp

struct S
{
};
 
typedef ::S NewStruct;
struct S2
{
};
 
typedef ::S2 NewS2;
```
