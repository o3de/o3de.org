---
title: Shader Resource Groups (SRG)
description: Learn about how shader resource groups (SRGs) are used in the Atom renderer.
---

In AZSL, uniform constants and shader resources are declared through **Shader Resource Groups (SRGs)**. Data views and sampler states are declared and bundled in an SRG. It's common practice to define SRGs based on the frequency of the binding data. Common cases include per-object, per-scene, per-view, and per-material. For example, the view projection matrix associated with the camera should be declared as part of a per-view SRG because it only changes when the camera/view is updated; a position vector should be in the per-entity group because every time the entity's position changes in the scene, the per-entity group gets updated.

### SRG Definition Requirements
Each SRG definition will include a name, an SRG semantic, and a list of constants and shader resources. 

{{< note >}}
SRGs may also be defined as multiple "partial" SRGs that get combined during compilation (see link to partial SRGs page).
{{< /note >}}

#### Defining an SRG Semantic
Each Shader Resource Group (SRG) must indicate which SRG semantic it uses. The **Shader Resource Group (SRG) semantic** defines a _category_ of SRG, which primarily indicates the SRG's update frequency, but may include other metadata as well. It is declared using the keyword `ShaderResourceGroupSemantic`. The semantic defines `FrequencyId`, which corresponds to the frequency that the SRG changes. It may also define a `ShaderVariantFallback`, which is a fallback value for the support of shader variants. (`ShaderVariantFallback` may be defined in a single SRG and is only necessary when the shader contains shader options).

For more information on SRG Semantic, see the [SRG Semantic](#srg-semantics-shaderresourcegroupsemantic) section below.

While shaders can declare their own SRG semantics, Atom includes a collection of common semantics in `SrgSemantics.azsli` (see [SRGs and SRG Semantics in Atom](#srgs-and-srg-semantics-in-atom) section below).

An SRG semantic is declared with the following syntax:
```glsl
ShaderResourceGroupSemantic <Name>
{
    FrequencyId = <Frequency>;
    ShaderVariantFallback = <Fallback>;
};
```
- `<Name>` is the user defined name for the SRG semantic.
- `<Frequency>` is the value for the SRG frequency.
- `<Fallback>` is the number of bits for the fallback value.

#### Defining an SRG
An SRG is a struct defined using the keyword, `ShaderResourceGroup` and must indicate a `ShaderResourceGroupSemantic`.  

An SRG is declared with the following syntax:
```glsl
ShaderResourceGroup <Name> : <Semantic>
{
    <Data>
};
```
- `<Name>` is the user defined name for the SRG.
- `<Semantic>` is the name of the semantic for the SRG.
- `<Data>` is one or more declaration for the binding data contained in the SRG.

#### SRG Minimal Code Sample
The following sample shows the minimal required syntax to declare an SRG. First, we declare the SRG semantic `SRG_PerDraw`. Then, we declare the SRG `ExampleSRG` which indicates the semantic `SRG_PerDraw`. `ExampleSRG` contains a list of uniform constants and shader resources. 

```glsl
ShaderResourceGroupSemantic SRG_PerDraw
{
    FrequencyId = 0;
};
 
ShaderResourceGroup ExampleSRG : SRG_PerDraw
{
    // Resource declarations go here
    float4          m_uniformColor;
    Texture2D       m_texture;
    Buffer<float>   m_buffer;
    Sampler m_dynamicSampler;
    Sampler m_staticSampler
    {
        AddressU = Wrap;
        AddressV = Wrap;
        AddressW = Wrap;
        MagFilter = Linear;
    };
};
 
 
float4 MainPS() : SV_TARGET
{
    // Every SRG defines a scope and the SRG constants, textures, buffers and samplers must be fully qualified when accessed from outside the scope
    float4 color = ExampleSRG::m_uniformColor;
    color *= ExampleSRG::m_texture.Sample(ExampleSRG::m_staticSampler, float2(0.5, 0.5));
    return color;
}
```

### SRGs and SRG Semantics in Atom
When defining an SRG, it must indicate a semantic. In Atom, common SRG semantics are defined in the file **SrgSemantics.azsli**. To access the definitions of all available SRG semantics in your shader source file, add the following include directive at the top of your file. 

```cpp
#include <Atom/Features/SrgSemantics.azsli>
```
{{< note >}}
The file `SrgSemantics.azsli` is located in the folder, `Gems/Atom/Feature/Common/Assets/ShaderLib/Atom/Features`.
{{< /note >}}

The common SRG semantics are `SRG_PerDraw`, `SRG_PerObject`, `SRG_PerMaterial`,  `SRG_PerSubPass`,  `SRG_PerPass`, `SRG_PerPass_WithFallback`, `SRG_PerView`, and `SRG_PerScene`. The file also includes a series of semantics for raytracing support. Shader resources should be grouped into an SRG based on how frequently it changes. To get a clearer understanding of how to group shader resources into SRGs, consider the following examples: 
- The global delta time belongs in the per-scene SRG because it is likely to change only with the scene.
- The project matrix belongs to the per-view SRG because it depends on the camera/view.
- The uniform data for the object (geometry) being drawn belongs in the per-object SRG, regardless of materials or passes. 
- The uniform data for the material used belongs in the per-material SRG. Uniform data for objects or active passes does not belong here. 

Atom has the following SRG semantics built in.    
- **SRG_PerDraw**
  - This SRG contains data which is likely to change with every draw call, regardless of other SRGs. 
  - This contains the fallback key for Shader Variants. 
  - This SRG is unique for every draw item and not shared by any. 
  
- **SRG_PerObject**
  - This SRG contains data specific for the object or geometry being rendered. 
  - It should work with multiple materials and should not contain any data specific for materials. 
  - This SRG is shared by all draw items generated from a single draw packet. 
    
- **SRG_PerMaterial**  
  - This SRG contains surface data specific for the material, but which can be shared between different geometries. 
  - It should not contain any data which affects the object or its geometry.
  - This SRG is shared by all draw items generated from a single draw packet. 
  - SRGs of this type are normally managed by the material system. 
  <!-- [todo] [Add a link to a page where we talk about the MaterialSRG, we might not have this yet] -->

- **SRG_PerSubPass**
<!-- [NOTE TO DEVS: Elaborate] -->

- **SRG_PerPass**  
  <!-- [NOTE TO DEVS: Elaborate] -->
  
- **SRG_PerPass_WithFallback**  
  <!-- [NOTE TO DEVS: Elaborate] -->

- **SRG_PerView**
  - This SRG is compiled by the Asset Processor. In each game project, reads the file `<Gproject>/ShaderLib/viewsrg.srgi` and stitches together the SRG definitions from multiple files. 
  - It should contain information related to the view (camera) changes, such as view, projection, inverse viewProjection matrices, and culling frustum.
  - It should contain data which is culled per view, such as lists of active lights and occlusion bodies. 
  - Any `*.azsl` or `*.azsli` file that needs the symbols defined in `scenesrg.srgi` must have the include directive: `#include <viewsrg.srgi>`

- **SRG_PerScene**
  - This SRG is compiled by the Asset Processor. In each game project, Asset Processor reads the file `<project>/ShaderLib/scenes.srgi` and stitches together the SRG definitions from multiple files. 
  - It should contain data shared for the whole scene, such as global time or the sky constants. These data belong to the PerScene SRG because they are likely to change only with the scene. 
  - Any `*.azsl` or *`.azsli`* file that needs the symbols defined in `scenesrg.srgi` must have the include directive: `#include <scenesrg.srgi>`


### SRG Semantics (ShaderResourceGroupSemantic)
An SRG Semantic provides meta-data for the SRG that is reflected to the Atom Asset Builder. SRG semantics contain the attributes, **FrequencyId** and **ShaderVariantFallback**. 
#### FrequencyId
The `FrequencyId` attribute contains a value that indicates a specific frequency in which that SRG changes. A lower value indicates higher priority, while a higher value indicates lower priority. Logically, each SRG is a shader resource data mapped per frequency. For example, once every time the scene changes (PerScene), the view changes (PerView), the material changes (PerMaterial), and the geometry changes (PerObject). 
#### **ShaderVariantFallback**
When using option variables, you must designate exactly one SRG as a fallback for the shader variant key. The size must be large enough to fit all options serialized into a single key. The value is in bits and is 128-bit aligned, so it's recommended to choose values such as 128, 256, 384, and so on. The size limit prevents an unwanted explosion of options. Setting it to 128 should be sufficient unless a higher value is needed. 

### SRG Functions
SRGs contain function declarations.

The following code sample demonstrates function declarations in SRGs. 
```glsl
// From DefaultObjectSrg.azsli
ShaderResourceGroup PerObject : SRG_PerObject
{
    row_major float3x4 m_modelToWorld;
    row_major float3x3 m_normalMatrix;
 
    float4x4 GetWorldMatrix()
    {
        float4x4 modelToWorld = float4x4(
            float4(1, 0, 0, 0),
            float4(0, 1, 0, 0),
            float4(0, 0, 1, 0),
            float4(0, 0, 0, 1));
 
        modelToWorld[0] = m_modelToWorld[0];
        modelToWorld[1] = m_modelToWorld[1];
        modelToWorld[2] = m_modelToWorld[2];
        return modelToWorld;
    }
     
    float3x3 GetNormalMatrix()
    {
        return m_normalMatrix;
    }
 
}
 
 
// From DefaultMaterial.azsl
VertexOutput MainVS(VertexInput input)
{
    const float4x4 worldMatrix = PerObject::GetWorldMatrix();
 
    VertexOutput output;
    float3 worldPosition = mul(worldMatrix, float4(input.m_position,1)).xyz;
    output.m_position = mul(GetView_ViewProjectionMatrix(), float4(worldPosition, 1.0));
 
    output.m_uv = input.m_uv;
         
    output.m_positionToCamera = GetView_WorldPosition() - worldPosition;
 
    output.m_normal = mul(PerObject::GetNormalMatrix(), input.m_normal);
    output.m_tangent = mul(PerObject::GetNormalMatrix(), input.m_tangent);
 
    return output;
}
```

AZSL also supports out-of-class method definitions. The following sample shows a valid SRG declaration.

```glsl
ShaderResourceGroup PerObject : SRG_PerObject
{
    row_major float3x3 m_normalMatrix;
    float3x3 GetNormalMatrix();
}
 
 
float3x3 PerObject::GetNormalMatrix()
{
    return m_normalMatrix;
}
```

### ShaderResourceGroup samplers
In AZSL, Samplers are a tad different from DirectX Samplers. All samplers are defined as SamplerState, unless CompareFunc is declared, in which case it will be transpiled to SamplerComparisonState for HLSL.

As of now, samplers need to be defined into the SRG. Samplers without body definition are dynamic and have to be set from the runtime side. Dynamic samplers can be declared as arrays as well. Samplers with a body definition are static.

### Limitations with SRGs
A stray semicolon is not allowed in the middle of an SRG scope. The semicolon tolerance in grammar is only present within the "embedded statement" rule, which is not part of what is allowed within SRG.
