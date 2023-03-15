---
linktitle: Material Types and Shaders
title: "Get Started with Material Types and Shaders"
description: "Create a new material type and shader in the Atom renderer."
toc: true
---

In this tutorial, you'll create a new material type with a simple, unlit color shader. This tutorial covers the following key concepts:

- Files needed for creating materials and shaders.
- Basic shader programming concepts in **AZSL**, including Shader Resource Groups.
- Creating shader asset files.
- Creating a material types and attaching shaders.
- Debugging shaders with **Asset Processor**.

## 1. Set up the files

The process of developing a combination of shaders and materials that create an appearance for a surface is called *look development*. For Atom renderer, this process requires several interdependent files including the following:

- `.azsl`: This file contains AZSL shader code. The AZSL shader code includes  Shader Resource Groups, shader inputs and outputs, and shader programs.
- `.shader`: This file contains data that describes the shader asset and is structured in JSON format. It references the `.azsl` file and configures the **AZSLc** shader compiler.
- `.materialtype`: This file contains material type data, and is structured in JSON format. A material type references one or more `.shader` files to create an appearance, defines properties for the material type, and links the material type properties to variables in the referenced shaders.
- `.material`: This file contains material data and is structured in JSON format. Materials must be created from a material type. Materials inherit the material type's properties and shaders. These properties' values are set in the `.material` file, describing the look of the material. Materials can be created using the Material Editor.

Asset Processor compiles run-time assets from these files. When a new asset file is saved to disk, or an existing asset file is modified, Asset Processor automatically detects the change and processes the files. For Asset Processor to detect new or updated files, the files must exist in a subdirectory of your project, or in a directory Asset Processor is monitoring. For this tutorial, use a project subdirectory named `Materials`.

In the `Materials` subdirectory of your project, create the following files:

- `MyUnlitColor.azsl`
- `MyUnlitColor.shader`
- `MyUnlitColor.materialtype`

{{< note >}}
The `.material` file is created using **Material Editor** later in the tutorial.
{{< /note >}}

## 2. Author AZSL shader code (.azsl)

You write AZSL shader code in the `MyUnlitColor.azsl` file containing the following components:

- preprocessor directives
- Shader Resource Groups (SRGs)
- Vertex and fragment shader input and output structs
- Vertex and fragment shader programs

### Preprocessor directives

At the very top of the file, are a set of preprocessor directives. A shader program can use shared Shader Resource Groups (SRGs) and reusable AZSL code, which are contained in .srgi and .azsli files.

For this tutorial, you need the following `#include` preprocessor directives:

- `viewsrg.srgi`: Defines a shared view SRG.
- `DefaultObjectSrg.azsli`: Defines an object SRG.
- `ForwardPassOutput.azsli`: Defines a ForwardPassOutput struct.
- `SrgSemantics.azsl`: Defines SRG semantics. Anytime you want to define an SRG, the SRG must inherit from an SRG semantic.

Add the following code in the `MyUnlitColor.azsl` file:

```cpp
#pragma once

#include <viewsrg.srgi>
#include <Atom/Features/PBR/DefaultObjectSrg.azsli>
#include <Atom/Features/Pipeline/Forward/ForwardPassOutput.azsli>
#include <Atom/Features/SrgSemantics.azsli>
```

Next, you'll learn about these referenced SRGs: what they are, how they are used throughout your shader code, and how to define a new SRG.

### Shader resource groups

Throughout a shader program, you need to store, use, and pass constant data. In AZSL, this is handled through Shader Resource Groups (SRGs). SRGs contain shader resources and uniforms that can be shared throughout the system. SRGs are bound to a specific frequency (such as per frame view, per object, per material, and more). They are designed to be shared across multiple shaders, so a single material type can only define one material SRG.

In this tutorial, MyUnlitColor.azsl uses the following SRGs:  

- ViewSrg: This is provided by `viewsrg.srgi`. ViewSrg contains data related to the camera such as view, projection, inverse viewProjection matrices, and culling frustum.
- ObjectSrg: This is provided by `DefaultObjectSrg.azsli`. ObjectSrg contains data that is specific for the object or geometry being rendered such as the object's position.
- MaterialSrg: This is defined in this `.azsl` file and contains data that is specific to the material type.

### Define a material SRG

Next, you need to define a material SRG to store data that needs to be updated at a per-material frequency. A material SRG must inherit an `SRG_PerMaterial` semantic. `SRG_PerMaterial` contains data specific to the material. In this tutorial, you are creating a simple unlit color material, so the material SRG must contain a variable to hold the color value.

As shown in the following code, define an SRG named `UnlitColorSrg` that inherits from `SRG_PerMaterial`. Then, define variable `m_unlitColor` that holds a color value.

```cpp
ShaderResourceGroup UnlitColorSrg : SRG_PerMaterial
{
    float3 m_unlitColor;
}
```

{{< note >}}
The `MyUnlitColor.materialtype` file must establish a connection between `m_unlitColor` and the color property. You'll do this later in the tutorial.
{{< /note >}}

Next, you're going to write the vertex and fragment shaders that use these SRGs.

### Define vertex structs

Shaders must have inputs and outputs to pass constant data and communicate with the rest of the render pipeline. Writing shader programs in AZSL follows similar practices as in HLSL (see [Microsoft DirectX HLSL documentation](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl)).

The vertex shader input and output is defined inside the structs `VertexInput` and `VertexShaderOutput`. The type of input and output is indicated by HLSL semantics (see Microsoft DirectX HLSL - Semantics](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics) documentation).

The vertex shader program for this simple shader only needs the geometry's position. You can define the vertex input and output structs using the following code:

```cpp
struct VertexShaderInput
{
    float3 m_position : POSITION;
};

struct VertexShaderOutput
{
    float4 m_position : SV_Position;
};
```

### Vertex Shader

The vertex shader program entry point is defined in the function `MainVS`. The following vertex shader has a basic function that transforms the object's position from model space to clip space by applying a series of matrix transformations:

```cpp
VertexShaderOutput MainVS(VertexInput IN)
{
    VertexShaderOutput OUT;
    float3 worldPosition = mul(ObjectSrg::GetWorldMatrix(), float4(IN.m_position, 1)).xyz;
    OUT.m_position = mul(ViewSrg::m_viewProjectionMatrix, float4(worldPosition, 1.0));        
    return OUT;
}
```

### Fragment Shader

The fragment shader program entry point is defined in the function `MainPS`. It takes `VertexShaderOutput` as input. The resulting fragment shader outputs are stored in the `ForwardPassOutput` struct that is defined in `ForwardPassOutput.azsli`.

Since this is an unlit single shader color, you only need to set the value for diffuse color and disable specular lighting.

The following sample shows the fragment shader program:

```cpp
ForwardPassOutput MainPS(VertexShaderOutput IN)
{
    ForwardPassOutput OUT;

    // standard ForwardPassOutput G-buffer layout
    OUT.m_diffuseColor = float4(UnlitColorSrg::m_unlitColor, -1.0); // Subsurface scattering is disabled
    OUT.m_specularColor = float4(0.0, 0.0, 0.0, 0.0);   // Disable specular lighting

    return OUT;
}
```

### Complete `MyUnlitColor.azsl`

The following is the full AZSL code:

```cpp
#pragma once

#include <viewsrg.srgi>
#include <Atom/Features/PBR/DefaultObjectSrg.azsli>
#include <Atom/Features/Pipeline/Forward/ForwardPassOutput.azsli>
#include <Atom/Features/SrgSemantics.azsli>

ShaderResourceGroup UnlitColorSrg : SRG_PerMaterial
{
    float3 m_unlitColor;
}

struct VertexShaderInput
{
    float3 m_position : POSITION;
};

struct VertexShaderOutput
{
    float4 m_position : SV_Position;
};

VertexShaderOutput MainVS(VertexShaderInput IN)
{
    VertexShaderOutput OUT;
    float3 worldPosition = mul(ObjectSrg::GetWorldMatrix(), float4(IN.m_position, 1)).xyz;
    OUT.m_position = mul(ViewSrg::m_viewProjectionMatrix, float4(worldPosition, 1.0));        
    return OUT;
}

ForwardPassOutput MainPS(VertexShaderOutput IN)
{
    ForwardPassOutput OUT;

    // standard ForwardPassOutput G-buffer layout
    OUT.m_diffuseColor = float4(UnlitColorSrg::m_unlitColor, -1.0); // Subsurface scattering is disabled
    OUT.m_specularColor = float4(0.0, 0.0, 0.0, 0.0);   // Disable specular lighting

    return OUT;
}
```

## 3. Author shader asset data (.shader)

The `.shader` file defines metadata to configure the shader compiler for the referenced `.azsl` source file and specifies how the render pipeline should use the shader. The `.shader` file is responsible for the following:

- Referencing the `.azsl` source file.
- Configuring depth, stencil, and blend states.
- Specifying shader compiler hints.
- Specifying entry points to the vertex and fragment shader programs.
- Specifying where in the render queue this shader should be drawn.

### Components of `MyUnlitColor.shader`

The configuration in the `.shader` file contains the following properties:

Source
: This shader references the `.azsl` source file `MyUnlitColor.azsl`.

DepthStencilState
: The `CompareFunc` property sets the comparison operator to `GreaterEqual` in order to discard pixels that have depth values that are lower than the current value in the depth buffer. This is necessary because Atom implements reverse depth buffers and uses a separate depth pre-pass that runs before the lighting pass.

Entry Points
: By default, any functions that start or end with `VS` or `PS` (corresponding to vertex and fragment shaders) are recognized by the asset builder as shader entry points. To explicitly identify the shader's entry points, specify the function's name and the type of shader program.

- The vertex shader's entry point is at the MainVS function. 
- The fragment shader's entry point is at the MainPS function. 

DrawList
: Specify the name of the draw list where draw items using this shader should be queued for rendering. Generally, the name should match the draw list name in a `.pass`. 

### Complete `MyUnlitColor.shader`

The following is the full shader description:

```json
{
    "Source": "MyUnlitColor.azsl",

    "DepthStencilState": {
        "Depth": {
            "Enable": true,
            "CompareFunc": "GreaterEqual"
        }
    },

    "ProgramSettings": {
        "EntryPoints": [
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

    "DrawList": "forward"
}
```

## 4. Author material type data (.materialtype)

The `MyUnlitColor.materialtype` file contains the material type data in JSON format. This materialtype is used to create materials in **Material Editor**. Material types are responsible for the following:

- Linking to shaders.
- Defining property groups
- Defining material properties for property groups.

### Link to shaders

Linking to shaders in a `.materialtype` defines which shader(s) the material type uses to compute the appearance of the surface. It also exposes the variables of the shader(s) to the material type, so they can be linked to material properties. In this tutorial, the `color` property is connected to the variable `m_unlitColor`, which is defined inside `MyUnlitColor.azsl` and referenced by the `MyUnlitColor.shader` file.

For this tutorial, the MyUnlitColor material type links to a few shaders:

- `MyUnlitColor.shader`: This is the shader you created earlier in this tutorial. The color property is connected to the variable `m_unlitColor`, which is defined inside `MyUnlitColor.azsl` and referenced by the `MyUnlitColor.shader` file. 
- `DepthPass.shader`: This shader is needed to write to the depth buffer.
- `Shadowmap.shader`: This shader enables the object to cast a shadow.

{{< note >}}
`DepthPass.shader` and `Shadowmap.shader` are common shaders provided by Atom.
{{< /note >}}

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

### Define material properties

In a `.materialtype` file, material properties are defined in groups of properties within the `propertyLayout` container. The groups container arranges the properties into collapsible groups displayed in the **Inspector** of Material Editor. Each property has several attributes including an id, name, type, default value, and a link to a variable in one of the shaders referenced by the `.materialtype` file. 

For this tutorial, there is one material property: color. To define the color property in the propertyLayout container do the following:

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

To recap, the above example accomplishes a couple of things:

- Defines the material properties.
- Creates a connection to the variables used by the shader source code (`.azsl`).
- Sets up the metadata that configures how the material properties appear in the Inspector in Material Editor.

### Complete `MyUnlitColor.materialtype`

The following is the full materialtype definition:

```json
{
    "description": "Renders a model unlit with a single suface color value.",
    "version": 3,
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
    "propertyLayout": {
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
    }
}
```

## 5. Compile and debug with Asset Processor

With the complete `MyUnlitColor.materialtype`, `MyUnlitColor.shader`, and `MyUnlitColor.azsl` files, you can make sure they compile successfully.

Asset Processor monitors your project's subdirectories and automatically compiles and debugs assets when it detects new or updated files. Because the files are in the Materials directory of your project, Asset Processor can detect them, compile the shader, and build the materialtype. Asset Processor automatically launches when Material Editor is open and runs in the background in the system tray. You can also launch Asset Processor from the directory for your build config such as `<build>/bin/profile/` or `<install>/bin/<platform>/profile/Default`.  

If Asset Processor encounters an error, it displays a message above the system tray. To view the results of recently processed jobs, open Asset Processor by choosing its icon in the system tray. You can see the results for the most recent jobs by sorting the **Asset Status** list by **Completed** descending.

If a job displays an error or warning, select the job in the Asset Status list and view the log in the **Event Log Details** list below. The event log contains verbose information you can use to solve any errors or warnings emitted when specific assets are processed.

## 6. Create a material using the Material Editor

If all the files build successfully, you can create a material based on the MyUnlitColor material type.

To create a new material using Material Editor:

1. Launch Material Editor from the directory for your build config such as `<build>/bin/profile/` or `<install>/bin/<platform>/profile/Default`.  
2. From the **File** menu in Material Editor, select **New**, or press **Ctrl+N** to create a new material.
3. In the **Create New Material** dialog, select **MyUnlitColor** in the **Material Type** list.
4. Choose the folder icon below **Select Material Filename**. Ensure the file browser has your project's `Materials` directory selected and name the material `MyUnlitColor.material`. Choose **OK** to close both the file browser and the **Create New Material** dialog.
5. The new material is automatically selected in Asset Browser and its settings group and color property are available in Material Editor's Inspector.
6. Change the material color by specifying a comma separated list of RGB values in the **Color** property field, or choose the color swatch to open the color picker.
7. Save changes to the material by choosing **Save** from the **File** menu or by pressing **Ctrl+S**.

![Creating a material from MyUnlitColor material type](/images/learning-guide/tutorials/rendering/unlit-color-material.jpg)

That's it! You created an AZSL shader, a new material type, and a material.

## Dive Deeper

Check out the following pages to learn more about materials and shaders in Atom.

- [Shader System and AZSL Reference](/docs/atom-guide/dev-guide/shaders/): Learn about the Shader System, including the AZSL language.
- [Material System](/docs/atom-guide/dev-guide/materials/): Learn about the technical details underlying the material system in Atom.