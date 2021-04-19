---
linktitle: Shader Resource Group Constants
title: Shader Resource Group (SRG) Constants
description: Learn about how constants are declared and used in AZSL shader resource groups.
---

{{< preview-new >}}

In addition to textures, buffers, and samplers, Shader Resource Groups (SRGs) may include a list of constants. In AZSL, these fields are easily accessed, like `MaterialSrg::m_baseColor`. In C++, they are easily accessed through the `ShaderResourceGroup` class API. Behind the scenes, the system packs all this data into a single implicit constant buffer, manages the layout of that buffer, and protects client code from invalid access. However, this complexity is all conveniently hidden. The programmer using this API only needs to know the name and data type for the constants.

Generally, every constant declaration that is valid in HLSL is also valid in an AZSL Shader Resource Group (SRG). This includes variables of a *primitive* type, such as `float4` or `uint`, or a *user-defined* type, such as a `struct`. 

This includes variables of a *primitive* type, such as `float4` or `uint`, or a *user-defined* type, such as a `struct`. 

Note that constant variables can be defined inside a ShaderResourceGroup as `static const` data. They are accessed in AZSL just like SRG normal constants, but are part of the implicit constant buffer and are not exposed in C++. 

## Top-Level Variable Declarations
Top-level variable declarations, which are declared outside of all functions, must contain `static` variables. This includes the `option` variable, which acts as `static const` (see [Shader Variants](shader-variants.md)). A `static`, non-`const` variable is also allowed; it declares a thread-local variable in global memory.

### Declaring SRG Constants Example
```glsl
ShaderResourceGroup MaterialSrg : SRG_PerMaterial
{
    // Any primitive data types can be used (structs can be used too but aren't shown here)
    float3 m_color;
	float m_factor;
 
    // Functions can be defined inside the SRG
    float3 GetColor()
    {
	    // The constants are available in the local scope (i.e. "MaterialSrg::" isn't necessary)
        return m_color;
    }
	
	// Functions can be declared inside the SRG and defined outside it
    float3 GetModifiedColor();
}
 
float3 MaterialSrg::GetModifiedColor()
{
	// The constants are available in the local scope (i.e. "MaterialSrg::" isn't necessary)
	return m_color * m_factor;
}
	
float4 PixelShader(float4 screenSpacePosition : SV_Position) : SV_Target
{
	// Note that here "MaterialSrg::" must be used to access the members.
	
	float4 result;
	result.a = 1.0;
	
    // All of these approaches are valid...
	
	result.rgb = MaterialSrg::m_color * MaterialSrg::m_factor;
	// or
	result.rgb = MaterialSrg::GetColor() * MaterialSrg::m_factor;
	// or
	result.rgb = MaterialSrg::GetModifiedColor();
	
	return result;
}
```

### API Usage Example
In the shader code shown above there's an SRG named "MaterialSrg", and it contains a constant property named "m_color" of type "float3". Here is a code snippet to set the value of "MaterialSrg::m_color" (Error checking not shown for the sake of simplicity):

```cpp
// The class has member variables like this...
Data::Asset<AZ::RPI::ShaderResourceGroupAsset> m_materialSrgAsset;
Data::Instance<AZ::RPI::ShaderResourceGroup> m_materialSrg;
AZ::RHI::ShaderInputConstantIndex m_colorInputIndex;
...
// One-time initialization...
m_materialSrgAsset = shader->FindShaderResourceGroupAsset(AZ::Name("MaterialSrg"));
// Find the index of the SRG constant "m_color", and store it in "m_colorInputIndex". We save this index once and re-use it each frame for performance.
m_colorInputIndex = m_materialSrgAsset->GetLayout()->FindShaderInputConstantIndex(AZ::Name("m_color"));
// Create an instance of the SRG.
m_materialSrg = AZ::RPI::ShaderResourceGroup::Create(m_materialSrgAsset);
...
// Update the SRG constant at runtime as needed.
void MyClass::SetColor(const Color& color)
{
	m_materialSrg->SetConstant(m_colorInputIndex , color);
}

```

## Constant Buffers `implicit` vs. `explicit`
SRG Constants are managed by the SRG and compile to a single implicit Constant Buffer for each SRG. This is preferred for the following reasons:
- The SRG manages the memory layout per platform and is free to optimize if needed.
- The ShaderResourceGroup C++ API makes it easy for developers to access shader constants without thinking about memory layouts.
- The SRG provides a good caching mechanism - it only maps constants which have been updated and flushes all updates into at most a single map (per frame).
- The user will likely set the constants at different points during the execution. The SRG takes care to flush them in the best way possible.
  
SRG Constant Buffers should be used sparingly and after careful consideration. It is recommended they are used only for optimization purposes. Keep in mind the following points when using SRG Constant Buffers.
- The SRG does not manage the layout of the buffer; the user must manage all layouts for all different platforms. Some platforms might have different packing rules. It's recommended to use explicit padding and attributes that are 16-bytes aligned.
- The user can optimize the code and manage the constant buffer if the following occur.
  - A constant data fails outside of the frequency updates (per scene, per view, per material) and there is no obvious candidate for it.
  - A constant data is shared between many SRGs of the same frequency. It makes sense to extract it to a shared buffer.