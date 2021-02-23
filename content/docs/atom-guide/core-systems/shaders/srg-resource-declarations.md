# SRG Resource Declaration
As a rule of thumb, every resource declaration that is valid in HLSL is also valid in an AZSL ShaderResourceGroup. The following is a complete list of resources allowed in an SRG, which is also defined in the file srg-declaration.azsl. 


[TODO: Insert Constant declarations here]

## Top Level Declarations in SRGs
The following rules are applied in the top level declarations of an SRG. 
- Only `static` variables are allowed in top level declarations. This includes the variable `option`, which acts as `static const` (see [Shader Variants](shader-variants.md)). All other variables are not allowed because they are treated as external inputs to the shader (similar to *extern* in HLSL). In AZSL, SRGs are the only structure which can manage uniform and shader resource data.
- A static, non-const variable is allowed; it will declare a global-scope, thread-local variable. 
- Data views can be declared inside function bodies and as part of function signature, because they don't implicitly bind to uniform or shader resource data. 

## SRG Constants
Every variable of a *predefined type*, such as `float4` or `uint`, or a *user-defined type*, such as a `struct`, in an SRG is treated as an **SRG constant**. An SRG constant is a `static const` data. It can be accessed inside the SRG scope using its variable name or outside the SRG scope by prefixing the variable name with the containing SRG namespace (`SRGName::variableName`). 

*Note: User-defined types include data views (textures, SRVs, UAVs), but such types cannot be used as SRG constants.*

SRG constants from a single SRG are packed into a single Constant Buffer View and managed internally. The user can map data by using SetConstant(...) on the runtime with the reflected ID per constant, but doesn't have access to the data view directly.

The following example demonstrates how to map constant data to SRGs. 
```cpp
ShaderResourceGroup PerMaterial : SRG_PerMaterial
{
    float4 m_diffuseColor;
 
    float4 GetDiffuseColor()
    {
        return m_diffuseColor;
    }
}
 
 
float4 GetDiffuseColor()
{
    return PerMaterial::m_diffuseColor;
}
```

### API Usage Example
In the shader code shown above there's an SRG named "PerMaterial", and it contains a constant property named "m_diffuseColor" of type "float4". Here is a code snippet to set the value of "PerMaterial::m_diffuseColor" (Error checking not shown for the sake of simplicity):
```cpp

//////////////////////////////////////////////////
 // Initialization
 //////////////////////////////////////////////////
 // Do this once per shader initialization.
 const Data::Asset<ShaderResourceGroupAsset>& perMaterialSrgAsset = shader->FindShaderResourceGroupAsset(AZ::Name("PerMaterial"));
 
 // Find the reflected ID of "m_diffuseColor", and store it in "diffuseColorInputIndex".
 AZ::RHI::ShaderInputConstantIndex diffuseColorInputIndex = m_perMaterialSrgAsset->GetLayout()->FindShaderInputConstantIndex(AZ::Name("m_diffuseColor"));
 
 // Create an instance of the SRG.
 Data::Instance<ShaderResourceGroup> perMaterialSrg = AZ::RPI::ShaderResourceGroup::Create(perMaterialSrgAsset);
 
 ...
 ////////////////////////////////////////////////
 // Update the SRG constant at runtime as needed.
 ////////////////////////////////////////////////
perMaterialSrg->SetConstant(diffuseColorInputIndex , Vector4(1.0f, 0.0f, 0.0f, 0.0f));
```