---
title: Root Signatures
description: Learn how to create root signatures to pass data to your shaders in O3DE Atom renderer.
---

{{< preview-new >}}

Root Signatures are a means of passing data to shaders. Root signatures can be defined in AZSL in a similar way to HLSL. (See the [Microsoft DirectX HLSL documentation](https://docs.microsoft.com/en-us/windows/win32/direct3d12/specifying-root-signatures-in-hlsl) on specifying root signatures in HLSL). 

## `rootconstant`
In AZSL, root signatures can also be accessed using the keyword `rootconstant`. This is not to be confused by the *RootConstants* clause in HLSL. `rootconstant` is a type qualifier, so it can be used on variable declarations. However, it can only be used in the global scope. This contradicts how root constants are treated in Shader Resource Groups, but this approach is meant to demonstrate their independence towards descriptor tables, constant buffers, or register space. Variables that are `rootconstant` can be passed as specialization constants on Vulkan and Metal. 

The following AZSL code sample demonstrates one of the benefits of using a `rootconstant`. For the variable `cameraheight`, you might expect a high update frequency or a different cyclomatic optimization by the driver. 

```glsl
ShaderResourceGroupSemantic slot1 { FrequencyId = 1; ShaderVariantFallback = 128; };
ShaderResourceGroup Scene : slot1
{
    struct Desc { float3 sundir; float fog; };
    StructuredBuffer<Desc> m_desc;
};
 
rootconstant float cameraheight;
 
float4 MainPS(float2 uv) : SV_Target0
{
    ...
}
```

{{< note >}}
Using the `const`* qualifier on a `rootconstant` will produce a warning because the data is already considered `const`.
{{< /note >}}