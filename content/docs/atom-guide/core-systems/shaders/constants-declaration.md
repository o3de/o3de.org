# Constants Declaration in SRGs
As a rule of thumb, every constant declaration that is valid in HLSL is also valid in an AZSL Shader Resource Group (SRG). 

A complete list of constant declarations allowed in an SRG can be found in [SRG Declarations](./srg-declarations.md). This includes variables of a *predefined type*, such as `float4` or `uint`, or a *user-defined type*, such as a `struct`. An Although data views (textures, SRVs, UAVs) are user-defined types, they are not allowed in SRGs. 

Constant variables can be defined in an SRG as `static const` data. They are treated as **SRG constants** and can be accessed inside the SRG scope using its variable name or outside the SRG scope by prefixing the variable name with the containing SRG namespace (`SRGName::variableName`). 


## Top-Level Variable Declarations
Top-Level variable declarations, which are declared outside of all functions, must contain `static` variables. This includes the `option` variable, which acts as `static const` (see [Shader Variants](shader-variants.md)). A `static`, non-`const` variable is also allowed; it declares a variable in global memory, local to the thread. 

As opposed to HLSL, AZSL requires that uniform shader inputs and varying shader inputs can only be declared in SRGs. They are not allowed in the top-level declarations because they are treated as external inputs to the shader (similar to *extern* in HLSL). 
 
Data views can be declared inside function bodies and as part of function signature because they don't implicitly bind to shader uniforms or shader variables. 

## Mapping Constant Data to SRGs
SRG constants in a single SRG are packed into a single Constant Buffer View and managed internally. Constant data is mapped to SRGs by declaring them within SRGs. At runtime, you can also map constant data by using SetConstant(...) with the reflected ID per constant. However, this doesn't give access to the data view directly.

### Declaring SRG Constants Example
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
 // Initialization
 // Do this once per shader initialization.
 const Data::Asset<ShaderResourceGroupAsset>& perMaterialSrgAsset = shader->FindShaderResourceGroupAsset(AZ::Name("PerMaterial"));
 
 // Find the reflected ID of "m_diffuseColor", and store it in "diffuseColorInputIndex".
 AZ::RHI::ShaderInputConstantIndex diffuseColorInputIndex = m_perMaterialSrgAsset->GetLayout()->FindShaderInputConstantIndex(AZ::Name("m_diffuseColor"));
 
 // Create an instance of the SRG.
 Data::Instance<ShaderResourceGroup> perMaterialSrg = AZ::RPI::ShaderResourceGroup::Create(perMaterialSrgAsset);
 
 ...

 // Update the SRG constant at runtime as needed.
perMaterialSrg->SetConstant(diffuseColorInputIndex , Vector4(1.0f, 0.0f, 0.0f, 0.0f));
```

## Constant Buffers `implicit` vs. `explicit`
SRG Constants are managed by the SRG and compile to a single implicit Constant Buffer for each SRG. This is the preferred for the following reasons.
- The SRG manages the memory layout per platform and is free to optimize if needed.
- The SRG provides a good caching mechanism - it only maps constants which have been updated and flushes all updates into at most a single map (per frame).
- The user will likely set the constants at different points during the execution. The SRG takes care to flush them in the best way possible.
  
SRG Constant Buffers should be used sparingly and after careful consideration. It is recommended they are used only for optimization purposes. Keep in mind the following points when using SRG Constant Buffers.
- The SRG does not manage the layout of the buffer; the user must manage all layouts for all different platforms. Some platforms might have different packing rules. It's recommended to use explicit padding and attributes that are 16-bytes aligned.
- The user can optimize the code and manage the constant buffer if the following occur.
  - A constant data fails outside of the frequency updates (per scene, per view, per material) and there is no obvious candidate for it.
  - A constant data is shared between many SRGs of the same frequency. It makes sense to extract it to a shared buffer.