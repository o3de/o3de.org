# Root Signatures
<!-- More info on Root Signatures is found here: https://docs.microsoft.com/en-us/windows/win32/direct3d12/root-signatures -->

## Root Constants
Since the beginning of descriptor tables in the modern binding models of the graphics API, it became possible to pass data, not only through buffers, but also immediately embedded into the root signature. In AZSL, you can access root signatures using the keyword `rootconstant`. `rootconstant` is a type qualifier and can be used for variable declarations. Root constants are only accepted in the global scope. This contradicts how root constants are treated in Shader Resource Groupsm but this approach is meant to demonstrate their independence towards descriptor tables, constant buffers, or register space. Root constants can be passed as specialization constants on Vulkan and Metal. 

In the following example, using a `rootconstant` might be beneficial for a couple of cases. For the variable `cameraheight`, You might expect a high update frequency, or a different cyclomatic optimization by the driver. 

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

*Note: Using the `const`* qualifier on a `rootconstant` will produce a warning because the data is already considered `const`. 