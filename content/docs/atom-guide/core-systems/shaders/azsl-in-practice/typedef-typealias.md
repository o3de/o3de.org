# Typedef AND Typealias
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