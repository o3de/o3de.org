---
linktitle: Material Types and Shaders
title: "Get Started with Material Types and Shaders"
description: "Create your first material type and shader in the Atom renderer."
toc: true
---

In this tutorial, you will create your first custom material type with a simple, unlit color shader.  This tutorial covers the following key concepts:
- Files needed for creating materials and shaders.
- Creating and attaching shaders to a material type.
- Basic shader programming concepts in AZSL, including Shader Resource Groups.
- Debugging shaders with the Asset Processor.
- Creating a material from the new material type.

## 1. Set up the files
When creating custom materials and shaders, there are a couple of different files involved: shader source code (_*.azsl_), shader asset (_*.shader_), material type (_*.materialtype_), and a material (_*.material_). These files depend on each other, with each playing a key role in the material-shader workflow. 
- `.azsl`: This file contains AZSL shader code. The AZSL shader code includes shader programs, shader inputs and outputs, and Shader Resource Groups. 
- `.shader`: This file contains data that describes the shader and is structured in JSON format. It references the AZSL source file (_*.azsl_) and configures the AZSL shader compiler (AZSLc).
- `.materialtype`: This file contains material type data and is structured in JSON format. A material type defines how a material behaves and what properties the material has. Material types also link to the shaders (_*.shader_) that are used to describe the material. 
- `.material`: This file contains material data and is structured in JSON format. Materials must be created from a material type. Materials inherit the material type's properties and shaders, and assigns values to them that describe the look of the material. Materials can be created using the Material Editor. 

The Asset Processor is responsible for compiling and building assets from these files. To ensure that the Asset Processor recognizes these files, the files must be stored in the following ways:
- **Gem**: You can share art assets between different projects using Gems.
- **Project folder**: If you are working from a specific project, you can store art assets directly in your project folder. The Asset Processor must be configured to build this project folder. 
- **Any directory**: You can configure the Asset Processor to recognize any directory by including that directory in the `AssetProcessorPlatformConfig.ini`.

For the sake of this tutorial, a Gem is already set up for you in the directory `Gems\AtomTechSamples\ExampleShaders\Assets\Materials\Types`.   
Create the following empty files:
- `MyUnlitColor.azsl`
- `MyUnlitColor.shader`
- `MyUnlitColor.materialtype`

Note that the `.material` file will be created using the Material Editor later in the tutorial.

## 2. Author material type data (.materialtype)
The `MyUnlitColor.materialtype` file contains the material type data in JSON format. Material types are responsible for:
- Defining the set of material properties.
- Linking to shaders.

#### Defining material properties
Material properties include variables that are used by shaders, and metadata that describe how the material appears in the Material Editor. In a `.materialtype` file, material properties are defined in groups of properties within the `propertyLayout` container.

Here is the structure of the `propertyLayout` container in JSON format: 
```json
    "propertyLayout": {
        "version": 3,
        "groups": [ ... ],
        "properties": {
			"groupID": [ ... ]
        }
    }
```

For this tutorial, we only have one material property: color. To define the color property in the propertyLayout container: 
1. Define a `settings` property group in the `groups` container. 
2. Define a `settings` property group in the `properties` container to hold details about the properties that belong to the settings `property` group.
3. Define the `color` property within the `settings` property group inside `properties`.

This results in the following example:
```json

    "propertyLayout": {
        "version": 3,
        "groups": [
            {
                "id": "settings",
                "displayName": "Settings"
            }
        ],
        "properties": {
            "settings": [
                {
                    "id": "color",						// Unique, C-style identifier 		
                    "displayName": "Color",				// Name (appears in the Material Editor)
                    "type": "Color",					// Data type
                    "defaultValue": [ 0.5, 0.0, 0.5 ],	// Default value (depends on data type)
                    "connection": {						// Establish a connection between the property and a variable in the shader.
                        "type": "ShaderInput",			// - Any changes made to this 'color' property serialize to the 'm_unlitColor' 
                        "id": "m_unlitColor"            // - variable in the UnlitSingleColor shader.
                    }
                }
            ]
        }
    }

```

The above example accomplishes a couple of things:
- Defines the material properties.
- Creates a connection to the variables used by the shader source code (`.azsl`).
- Sets up the metadata that configures how the material properties appears in the Material Editor. 

#### Linking to shaders
Linking to shaders exposes the shader variables to the material type. In this tutorial, the `color` property is connected to the variable `m_unlitColor`, which is defined inside `MyUnlitColor.azsl` and referenced by the `MyUnlitColor.shader` file. 

For this tutorial, the MyUnlitColor material type links to a couple of shaders: 
- `MyUnlitColor.shader`: This is the shader that we are creating in this tutorial. The color property is connected to the variable `m_unlitColor`, which is defined inside `MyUnlitColor.azsl` and referenced by the `MyUnlitColor.shader` file. 
- `DepthPass.shader`: This shader is needed to write to the depth buffer.
- `Shadowmap.shader`: This shader enables the object to cast a shadow.

This results in the following example:
```json
"shaders": [
        {
            "file": "./MyUnlitColor.shader"
        },
        {
            "file": "Shaders/Depth/DepthPass.shader"
        },
        {
            "file": "Shaders/Shadow/Shadowmap.shader"
        }
]	
```

#### MyUnlitColor.materialtype
Here is the complete `MyUnlitColor.materialtype` file:
```json
{
    "description": "Renders a model unlit with a single suface color value.",
    "propertyLayout": {
        "version": 3,
        "groups": [
            {
                "id": "settings",
                "displayName": "Settings"
            }
        ],
        "properties": {
            "settings": [
                {
                    "id": "color",						
                    "displayName": "Color",
                    "type": "Color",
                    "defaultValue": [ 0.5, 0.0, 0.5 ],
                    "connection": {
                        "type": "ShaderInput",
                        "id": "m_unlitColor"
                    }
                }
            ]
        }
    },
    "shaders": [
        {
            "file": "./MyUnlitColor.shader"
        },
        {
            "file": "Shaders/Depth/DepthPass.shader"
        },
        {
            "file": "Shaders/Shadow/Shadowmap.shader"
        }
    ],
    "functors": [
    ]
}
```

## 3. Author shader asset source data (.shader)
The shader asset source file (`.shader`) references the AZSL source file. This shader asset source file defines metadata for configuring the shader compiler, and indicates how the render pipeline should use this shader. 

The `.shader` file is responsible for the following:
- Referencing the AZSL source file (_*.azsl_).
- Configuring depth, stencil, and blend states.
- Specifying entry points to the vertex and fragment shader programs.

#### MyUnlitColor.shader
Here is the complete MyUnlitColor.shader file:
```json

{
    "Source" : "MyUnlitColor.azsl",

    "DepthStencilState" :
    {
        "Depth" :
        {
            "Enable" : true,
            "CompareFunc" : "GreaterEqual"
        }
    },

    "BlendState" : {
        "Enable" : false
    },

    "CompilerHints" : { 
        "DxcDisableOptimizations" : false
    },

    "ProgramSettings":
    {
      "EntryPoints":
      [
        {
          "name": "MainVS",
          "type": "Vertex"
        },
        {
          "name": "MainPS",
          "type": "Fragment"
        }
      ]
    },

    "DrawList" : "forward"
}
```

#### Breakdown of MyUnlitColor.shader
Breaking it down, MyUnlitColor.shader contains the following components:

Source
: This shader refers to the shader code that's defined in the AZSL source file, UnlitSingleColor.azsl.

DepthStencilState
: The `CompareFunc` property sets the comparison operator to `GreaterEqual`, in order to discard pixels that have depth values that are lower than the current value in the depth buffer and because Atom uses a separate depth pre-pass that runs before the lighting pass. This is necessary because the Atom renderer implements reverse depth buffers. 

BlendState
: Disable the blend state.

CompilerHints
: Set compiler hints for AZSLc. 

Entry Points
: By default, any functions that start or end with `VS` or `PS` (corresponding to vertex and fragment shaders) are recognized by the asset builder as shader entry points. To explicitly identify the shader's entry points, specify the function's name and the type of shader program.

- The vertex shader's entry point is at the MainVS function. 
- The fragment shader's entry point is at the MainPS function. 

DrawList
: The name of the draw list where draw items using this shader should be queued for rendering.

## 4. Author AZSL shader code (.azsl)
The vertex and fragment shader programs are defined in the same file, UnlitSimpleColor.azsl. 

The AZSL shader contains the following components:
- #include directives
- Shader Resource Groups (SRGs)
- Vertex and fragment shader inputs and outputs
- Vertex and fragment shader programs

#### Includes
At the very top of the file are a set of `#include` directives. A shader program can use shared Shader Resource Groups (SRGs) and reusable AZSL code, which are contained in .srgi and .azsli files. 

#### Shader Resource Groups
Shader Resource Groups (SRGs) contain shader resources and uniforms. SRGs are bound to a specific frequency (such as per frame view, per object, per material, and more). They are designed to be shared across multiple shaders, so a material type can only have one SRG for each frequency.

In this tutorial, UnlitSimpleColor.azsl uses the following SRGs:  

ViewSrg
:  This is provided by `viewsrg.srgi`. ViewSrg contains data related to the camera changes (such as view, projection, inverse viewProjection matrices, and culling frustum). 

DrawSrg
:  This is provided by `DefaultDrawSrg.azsli`. DrawSrg contains data that changes at every draw call.

ObjectSrg
:  This is provided by `DefaultObjectSrg.azsli`. ObjectSrg contains data that is specific for the object or geometry being rendered (such as the object's position).

MaterialSrg
:  This is defined in this `.azsl` file and contains data that is specific to the material type. 

We define a material SRG based off of the `SRG_PerMaterial` semantic. `SRG_PerMaterial` contains data specific to the material. In this tutorial, we want to configure a single color of the material. 

As shown in the following code, we define the SRG `UnlitColorSrg` and inherit from `SRG_PerMaterial`. Then, we define a `float3` variable `m_unlitColor`, which holds a color value. Note that the variable `m_unlitColor` is the variable connected to the `color` property in the `MyUnlitColor.materialtype` file. 

```hlsl
ShaderResourceGroup UnlitColorSrg : SRG_PerMaterial
{
    float3 m_unlitColor;
}
```

#### Vertex and Fragment Shaders
Shaders are only one part of the render pipeline – they must have inputs and outputs to keep the flow going. We define shader inputs and indicate their intended use by attaching HLSL semantics. Writing shader programs in AZSL follows similar practices as in HLSL.

Shader inputs and outputs can be defined via either input/output variables or via a structure containing them. 

Vertex Shader
: The vertex shader program entry point is defined in the function `MainVS`. This example is a simple vertex shader that transforms the object's position from model space to clip space by applying a series of matrix transformations. 

The vertex shader inputs and outputs are defined inside the structs `VertexInput` and `VertexShaderOutput`. The type of input and output is indicated by HLSL semantics (see [Microsoft DirectX HLSL - Semantics](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics) documentation).

Here is the vertex shader:
```hlsl
struct VertexInput
{
    float3 m_position : POSITION;
    float3 m_normal : NORMAL;
};

struct VertexShaderOutput
{
    float4 m_position : SV_Position;
    float3 m_normal: NORMAL;
};

VertexShaderOutput MainVS(VertexInput IN)
{
    VertexShaderOutput OUT;
    float3 worldPosition = mul(ObjectSrg::GetWorldMatrix(), float4(IN.m_position, 1)).xyz;
    OUT.m_position = mul(ViewSrg::m_viewProjectionMatrix, float4(worldPosition, 1.0));        
    return OUT;
}
```

Fragment Shader
: The fragment shader program entry point is defined in the function `MainPS` and takes as input `VertexInput`. The resulting fragment shader outputs are stored in the struct ForwardPassOutput. Since this is an unlit single shader color, we only need to set the values for diffuse color, albedo, and normal. 

Here is the fragment shader:
```hlsl

struct PixelOutput
{
    float4 m_color : SV_Target0;
};

ForwardPassOutput MainPS(VertexShaderOutput IN)
{
    ForwardPassOutput OUT;

    // standard ForwardPassOutput G-buffer layout
    OUT.m_diffuseColor = float4(UnlitColorSrg::m_unlitColor, -1.0); // Subsurface scattering is disabled
    OUT.m_specularColor = float4(0.0, 0.0, 0.0, 0.0);
    OUT.m_albedo = float4(UnlitColorSrg::m_unlitColor, 1.0);
    OUT.m_specularF0 = float4(0.0, 0.0, 0.0, 0.0);
    OUT.m_normal = float4(0.0, 1.0, 0.0, 0.0);
    OUT.m_clearCoatNormal = float4(0.0, 0.0, 0.0, 0.0);
    OUT.m_scatterDistance = float3(0.0, 0.0, 0.0);

    return OUT;
}
```

#### MyUnlitColor.azsl
Here is the complete `MyUnlitColor.azsl` file:
```hlsl

#include <viewsrg.srgi>
#include <Atom/RPI/ShaderResourceGroups/DefaultDrawSrg.azsli>
#include <Atom/Features/PBR/DefaultObjectSrg.azsli>
#include <Atom/Features/PBR/ForwardPassOutput.azsli>
#include <Atom/Features/SrgSemantics.azsli>
#include <Atom/Features/ColorManagement/TransformColor.azsli>

option bool o_enableIBL = false;

ShaderResourceGroup UnlitColorSrg : SRG_PerMaterial
{
    float3 m_unlitColor;
}

struct VertexInput
{
    float3 m_position : POSITION;
    float3 m_normal : NORMAL;
};

struct VertexShaderOutput
{
    float4 m_position : SV_Position;
    float3 m_normal: NORMAL;
};

VertexShaderOutput MainVS(VertexInput IN)
{
    VertexShaderOutput OUT;
    float3 worldPosition = mul(ObjectSrg::GetWorldMatrix(), float4(IN.m_position, 1)).xyz;
    OUT.m_position = mul(ViewSrg::m_viewProjectionMatrix, float4(worldPosition, 1.0));        
    return OUT;
}

struct PixelOutput
{
    float4 m_color : SV_Target0;
};

ForwardPassOutput MainPS(VertexShaderOutput IN)
{
    ForwardPassOutput OUT;

    // standard ForwardPassOutput G-buffer layout
    OUT.m_diffuseColor = float4(UnlitColorSrg::m_unlitColor, -1.0); // Subsurface scattering is disabled
    OUT.m_specularColor = float4(0.0, 0.0, 0.0, 0.0);
    OUT.m_albedo = float4(UnlitColorSrg::m_unlitColor, 1.0);
    OUT.m_specularF0 = float4(0.0, 0.0, 0.0, 0.0);
    OUT.m_normal = float4(0.0, 1.0, 0.0, 0.0);
    OUT.m_clearCoatNormal = float4(0.0, 0.0, 0.0, 0.0);
    OUT.m_scatterDistance = float3(0.0, 0.0, 0.0);

    return OUT;
}
```

## 5. Compile and debug with the Asset Processor
At this point, we've finished writing the files `MyUnlitColor.materialtype`, `MyUnlitColor.shader`, and `MyUnlitColor.azsl`. Now, we are going to make sure they compile successfully. 

The Asset Processor is responsible for compiling and debugging `.material`, `.materialtype,` `.shader`, and `.azsl` files (among many other assets). The Asset Processor automatically launches when the Material Editor is open. However, you can also launch the Asset Processor from `<build>/bin/profile/`.  

The Asset Processor automatically compiles and debugs your files every time you save changes.

## 6. Create a material using the Material Editor
At this point, all of our files should compile successfully. Now, we are going to create a material based on the MyUnlitColor material type. 

To create a new material using the Material Editor: 
1. Launch the Material Editor from the directory `<build>/bin/profile/`.  
2. From the File menu in the Material Editor, select **New** and choose the material type **MyUnlitColor**. 
3. Continue to edit the material using the Material Editor. 

![Creating a material from MyUnlitColor material type](/images/atom-guide/get-started/unlit-color-material.jpg)