## Shader Resource Group
In AZSL, uniform constants and shader resources are declared through **Shader Resource Groups (SRGs)**. Data views and sampler states are declared and bundled in an SRG. It's common practice to define SRGs based on the frequency of the binding data. Common cases include per Entity, per Geometry, per Scene, per View, and per Material. For example, the view projection matrix associated with the camera should be declared as part of the PerView SRG because it only changes when the camera/view is updated; a position vector should be in the PerEntity group because everytime the entity's position changes in the scene, the PerEntity group gets updated.

### SRG Binding Model
Logically, SRGs follow this ideal binding model: 

![SRG Binding Model](/static/images/atom-guide/core-systems/shaders/srg-binding-model.png)

*[NOTE TO DEVS: Is this still an accurate model? Can we explain what's happening in the binding model?]*


### SRG Definition Requirements
When defining an SRG, you must declare its uniform constants and shader resources. You must also define and/or specify the semantic the SRG is built off of. The SRG semantic provides meta-data to the SRG that is used by the Atom Asset Builder. 

#### Defining an SRG Semantic
A **Shader Resource Group (SRG) semantic** is a struct declared using the keyword `ShaderResourceGroupSemantic`. The semantic defines `FrequencyId`, which corresponds to the frequency which the SRG changes. It also defines `ShaderVariantFallback`, which is a fallback value for the support of shader variants. `ShaderVariantFallback` must be defined in a single SRG and is only necessary when the shader contains options. 

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
An SRG is a struct defined using the keyword, `ShaderResourceGroup`, which must inherit from a `ShaderResourceGroupSemantic`.  

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
The following sample shows the minimal required syntax to declare an SRG. First, we declare the SRG semantic, `SRG_PerExample`. Then, we declare the SRG, `ExampleSRG`, which inherits from the semantic, `SRG_PerExample`. `ExampleSRG` contains a list of uniform constants and shader resources. 
```glsl
ShaderResourceGroupSemantic SRG_PerExample
{
    FrequencyId = 0;
};
 
ShaderResourceGroup ExampleSRG : SRG_PerExample
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
When defining an SRG, you must inherit a semantic. In Atom, SRG semantics are defined in the file **SrgSemantics.azsli**. To get the definitions of all available SRG semantics in your shader source file, add the following include directive at the top of your file. 
```
#include <Atom/Features/SrgSemantics.azsli
```
** *SrgSemantics.azsli is located in the folder, `dev\Gems\Atom\Feature\Common\Assets\ShaderLib\Atom\Features`.*

The SRG semantics are `SRG_PerMaterial`, `SRG_PerObject`, `SRG_PerPass`, `SRG_PerSubPass`, `SRG_PerDraw`, `SRG_PerScene`, `SRG_PerView`, and `SRG_Single`, and their corresponding `FrequencyId`'s. Shader resources should be grouped into a SRG based on how frequently it changes. To get a clearer understanding of how to group shader resources into SRGs, consider the following examples: 
- The global delta time belongs in the PerScene SRG because it is likely to change only with the scene.
- The project matrix belongs to the PerView SRG because it depends on the camera/view.
- The uniform data for the object (geometry) being drawn belongs in the PerObject SRG, regardless of materials or passes. 
- The uniform data for the material used belongs in the PerMaterial SRG. Uniform data for objects or active passes does not belong here. 

Atom is built in with the following SRG semantics.  
- **PerMaterial** (inherits from SRG_PerMaterial) 
  - This SRG contains surface data specific for the material, but which can be shared between different geometries. 
  - It should not contain any data which affects the object or its geometry.
  - This is SRG is shared by all draw items generated from a single draw packet. 
  
- **PerObject** (inherits from SRG_PerObject)
  - This SRG contains data specific for the object or geometry being rendered. 
  - It should work with multiple materials and should not contain any data specific for materials. 
  - This SRG is shared by all draw items generated from a single draw packet. 
  
- **PerPass** (inherits from SRG_PerPass)  
  <!-- [NOTE TO DEVS: Elaborate] -->

- **PerSubPass** (inherits from SRG_PerSubPass)
<!-- [NOTE TO DEVS: Elaborate] -->

- **PerDraw** (inherits from SRG_PerDraw)
  - This SRG contains data which is likely to change with every draw call, regardless of other SRGs. 
  - This is the default fallback for Shader Variants. 
  - This SRG is unique for every draw item and not shared by any. 
  
- **SRG_PerScene** (inherits from SRG_PerScene)
  - This SRG is compiled by the Asset Processor. In each game project, reads the file *\<Dev>/\<GameProject>/ShaderLib/scenes.srgi* and stitches together the SRG definitions from multiple files. 
  - It should contain data shared for the whole scene, such as global time or the sky constants. These data belon to the PerScene SRG because they are likely to change only with the scene. 
  - Any **.azsl* or **.azsli* file that needs the symbols defined in scenesrg.srgi must have the include directive: `#include <scenesrg.srgi>`
  
- **SRG_PerView** (inherits from SRG_perView)  
  - This SRG is compiled by the Asset Processor. In each game project, reads the file *\<Dev>/\<GameProject>/ShaderLib/viewsrg.srgi* and stitches together the SRG definitions from multiple files. 
  - It should contain information related to the view (camera) changes, such as view, projection, inverse viewProjection matrices, and culling frustum.
  - It should contain data which is culled per view, such as lists of active lights and occlusion bodies. 
  - Any **.azsl* or **.azsli* file that needs the symbols defined in scenesrg.srgi must have the include directive: `#include <viewsrg.srgi>`

- **SRG_Single** 
<!-- [NOTE TO DEVS: Elaborate] -->


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

AZSL also supports deported function definitions. The following sample shows a valid SRG declaration. 
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
