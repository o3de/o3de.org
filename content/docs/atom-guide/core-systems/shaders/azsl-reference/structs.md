---
title: Structs
description: Learn about Structs in AZSL shading language.
---

{{< preview-new >}}

Structs in AZSL are very similar to structs in HLSL (see [Microsoft DirectX HLSL - Struct](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-struct) documentation). They can be used to generally group and organize data in a shader, and are commonly used to define the vertex input and output layout for shader entry points.

<!-- [NOTE TO DEVS: Do you have another concrete example for when structs are useful?] -->

## Nested Structures
In AZSL, it is possible to define a nested struct (or class). However, nested structs are not supported as vertex shader entry point input. Also, in Metal, nested structs are not supported in ConstantBuffers. 

Below is an example of a nested struct. 
```glsl
struct PbrSurface
{
    float3 position;
    float3 normal;
    float3 albedo;                   
    float3 specularF0;
    float roughness;
    
    struct Anisotropy
    {
        float3 tangent; 
        float3 bitangent;   
        float2 factors;
    } anisotropy;
    
    struct ClearCoat
    {
        float factor;           
        float roughness;        
        float3 normal; 
    } clearCoat;
};
```