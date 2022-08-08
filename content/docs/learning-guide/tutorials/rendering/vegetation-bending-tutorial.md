---
linkTitle: Vertex Deformation
title: Vertex Deformation for Vegetation Bending Tutorial
description: A tutorial for adding vegetation bending by creating custom a material type and authoring shaders with the Atom Renderer in the Open 3D Engine (O3DE).
toc: true
---

In this tutorial, you will learn how to make your own material type and how to edit vertex shaders to achieve a vegetation bending effect. While we use vegetation bending as an example, the primary goal of this tutorial is to familiarize yourself with how to use and create custom material types and vertex shaders. 

This tutorial covers the following concepts:
* Creating *materials* in the **Material Editor**
* Creating a custom *material type*
  * Adding *adjustable properties* for your material type
  * Adding *passes* to your material type
* Editing *vertex shaders*
  * Using *optional vertex streams*
* Using the **Pass Tree Visualizer** to debug passes

The **VegetationBending** material type allows materials to bend and sway, simulating how wind affects vegetation. It allows for detail bending with slight movement of branches and leaves, as well as movement of the entire object. 

The code in this tutorial can be found in the [**Atom Tutorials Gem**](https://github.com/o3de/sample-code-gems/tree/main/atom_gems/AtomTutorials) in the `o3de/samples-code-gems` repository. There, you can find the template code and assets needed for this tutorial, as well as the final code.

As you go along, you can reference the [Material Types and Shaders](get-started-materialtypes-and-shaders) tutorial, which gives higher-level explanations of the mechanisms used in this tutorial.

## Create a material type

Vegetation bending is done through a material that uses vertex shaders to create the effect. Begin by setting up a vegetation bending material type with the following steps:
 
1. Download or clone the `o3de/sample-code-gems` repository from [GitHub](https://github.com/o3de/sample-code-gems).

1. The template files for this tutorial are in `atom_gems/AtomTutorials/Templates/VegetationBending/`. Move all of the files to `{your-project-path}\Materials\Types\`.

1. Move all the files in `atom_gems/AtomTutorials/Assets/VegetationBending/Objects/` to `{your_project_path}\Objects`. Make the `Objects` folder as needed.

1. Open `{your-project-path}\Materials\Types\VegetationBending.materialtype` in a text editor. 

1. Under `propertyLayout` > `propertyGroups`, notice that there are many entries with `{your-path-to-o3de}`. Replace `{your-path-to-o3de}` with the appropriate path to your engine.  

   For example, the resulting path might look like: `C:/o3de/Gems/Atom/Feature/Common/Assets/Materials/Types/MaterialInputs/BaseColorPropertyGroup.json`.
   
   {{< known-issue >}}
   Currently, O3DE cannot import property groups across Gems. So, you must hard code the absolute path as a proof of concept, even though hard-coding is not recommended as it restricts portability. 
   
   There is a [GitHub issue](https://github.com/o3de/o3de/issues/10623) to enable importing across Gems.
   {{< /known-issue>}}

1. Open the **Editor**, and the assets should automatically process. You can check their status in the **Asset Processor**. If `VegetationBending.materialtype` fails to process, check that you used the correct paths in step 5.

The following list is an overview of the files required for a material:
``
- The [`.materialtype`](/docs/atom-guide/dev-guide/materials/materials/#material-types) file references the shader files you will use on the material of this material type. 
- The [`.shader`](/docs/atom-guide/look-dev/shaders/shader-file-spec.md) files define which types of shaders, such as vertex and pixel shaders, should be used, and references the actual shader code in [`.azsl`](/docs/atom-guide/dev-guide/shaders/azsl/) files. They also specify the `DrawList`, which controls which pass should run that shader. 
- Often, `.azsl` files will include `.azsli` files, which are also written in the Amazon Shading Language (AZSL). These files are separate so multiple `.azsl` files can reuse the shader code from the `.azsli` files. 

{{< tip >}}
These template files were created by duplicating important parts of the `StandardPBR` files and then modifying them. When you create your own material types in the future, you can similarly duplicate `StandardPBR` files and work from there.
{{< /tip >}}

## Add a material with the VegetationBending material type
Before you begin editing any files, make a material using your material type in the **Editor**.


 1. Create a new material by choosing **File** > **New**. Then in the **Select Type** drop down, choose **VegetationBending** and give the material a name, such as `my_material`. Choose the file location to be somewhere in your project folder, such as in your project's `Materials` folder.

 1. Save your material by pressing **Ctrl-S**. Then, close the Material Editor.

 1. Back in the Editor, select the *shader ball* that is already included in the default level. The **Entity Inspector** should now show the properties of the shader ball object. 

 1. In the Entity Inspector, look for the **Mesh** component of the shader ball and click **Add Material Component**.

 1. In the Material component of the shader ball, click the file icon next to *Default Material*. Then, select the VegetationBending material, named `my_material`, that you just created.

{{< image-width src="/images/learning-guide/tutorials/rendering/vegetation-bending-tutorial/material.png" width="100%" alt="Adding a VegetationBending material to an object's Material component in the O3DE Editor." >}}

Great, you created a material with your custom material type!

## Edit the vertex shader
Now you are ready to edit your shader to change how the engine renders your material type. 

### Render the material at an offset
To start off, you will edit the vertex shader to render a shader ball at an offset.
1. Open `{your-project-path}\Materials\Types\VegetationBending_ForwardPass.azsli`. Recall that `.azsli` files contain shader code. This file contains the vertex and pixel shader code for the *forward pass* of the VegetationBending material type.

   {{< caution >}}
   Make sure you are opening the `.azsli` file. There is also a `VegetationBending_ForwardPass.azsl` file.
   {{< /caution >}}

1. Find the function `VegetationBending_ForwardPassVS`.

1. Towards the end of the function, right before `OUT.m_worldPosition = worldPosition.xyz;`, add the following. This adjusts the object's position in the positive x direction by `5` units.
   
   ```glsl
   worldPosition.x += 5.0;
   ```
   {{< tip >}}
   You may wonder why you are editing `worldPosition` instead of `m_position`; `m_position` is the position of this vertex relative to the origin of the model, whereas `worldPosition` is the position of this vertex relative to the origin of the level (or world). Try editing the other dimensions of  `m_position` and `worldPosition` and see what they do!
   {{< /tip >}}

1. Make sure the **Editor** is open, if it is not already open.

1. Save your file with **Ctrl-S** and the **Asset Processor** should automatically detect changes and process the file. You can open the Asset Processor and check when the file is done processing. 

   {{< note >}}
   If you can't find the Asset Processor, navigate to the Windows taskbar at the bottom right, and click on {{< icon "asset-processor.svg" >}}.
   {{< /note >}}

1. When the Asset Processor is done processing the changes, you should see in the Editor that your material looks different!

{{< image-width src="/images/learning-guide/tutorials/rendering/vegetation-bending-tutorial/offset.png" width="100%" alt="The shader ball in the Editor, with the offset applied to the forward pass." >}}

The main texture of the shader ball shows up at an offset as intended, but a grey outline is still at the origin of the object. This is because you only edited the forward pass, and have yet to edit the *depth pass*. All the passes this material goes through are referenced in `VegetationBending.materialtype`.
Keep in mind that different passes render different parts of the material, and some passes' outputs are used as inputs to other passes. You can find more information about passes in the [Passes](/docs/atom-guide/dev-guide/passes/) section.

Repeat the above steps for the depth pass:
1. Open `VegetationBending_DepthPass.azsli`.

   {{< caution >}}
   Make sure you are not editing the `VegetationBending_DepthPass_WithPS.azsli` file.
   {{< /caution >}}

1. Find the function `DepthPassVS`.

1. Towards the end of the function, right before `OUT.m_position = mul(ViewSrg::m_viewProjectionMatrix, worldPosition);`, add: 
   
   ```
   worldPosition.x += 5.0;
   ```

1. Save your file and look at the Editor. The shader ball should now be completely rendered at an offset! 
   
   {{< note >}}
   Note that the shadow is still in the original position. That's because you haven't updated the shadowmap shader, yet. Later in the tutorial, you will add a custom shadowmap with a pixel shader, which will fix the shadow. 
   {{< /note >}}

{{< image-width src="/images/learning-guide/tutorials/rendering/vegetation-bending-tutorial/fulloffset.png" width="100%" alt="The shader ball in the Editor, after the offset is applied to both forward and depth pass." >}}

### Add material properties
For now, the code specifies to move the ball at an offset of `5` units. However, you may want an easier way to change the offset in the Editor, instead of having to change the code. You can do this with _adjustable properties_ in the **Material Editor**.

1. Open `{your-project-path}\Materials\Types\MaterialInputs\VegetationBendingPropertyGroup.json` in a text editor.

1. Under `properties`, notice that the `xOffset` property is already written there for you. Following `xOffset` as a guide, add another property, `yOffset`. The code should end up looking something like this:
   
   ``` json
   {
      "name": "yOffset",
      "displayName": "yOffset",
      "description": "The offset in the y direction.",
      "type": "Float",
      "defaultValue": 0.0,
      "min": 0.0,
      "max": 10.0,
      "connection": {
        "type": "ShaderInput",
        "name": "m_yOffset"
      }
    }
    ```

   {{< caution >}}
   Don't forget to add a comma after the brackets surrounding the `xOffset` property, so that the file is valid JSON.
   {{< /caution >}}

1. Open `{your-project-path}\Materials\Types\VegetationBending_Common.azsli` in a text editor. This file is included in every pass of the VegetationBending material type. It includes many files to other Shader Resource Groups (SRGs) and other functions that are necessary for all passes.

1. Look for the SRG definition: `ShaderResourceGroup MaterialSRG : SRG_PerMaterial`. Here, you will define the variables that the *connection name* in `VegetationBendingPropertyGroup.json` references, which should be `m_xOffset` and `m_yOffset`. 

   So, in `MaterialSRG`, add the following: 

   ```
   float m_xOffset;
   float m_yOffset;
   ```

1. You will need to include the properties in the `.materialtype` file. Open `VegetationBending.materialtype`, and look at the `propertyLayout` > `propertyGroups`, which contains a list of JSON files. The JSON files define the material's properties, and listing them here allows the properties to be adjustable in the Material Editor. 
   If you look at the Material Editor and open a material of type VegetationBending, you can see that the adjustable properties of the material match the properties defined in the JSON files.
1. Add a property group entry at the top of the list for vegetation bending.

   ```
   {
      "$import": "MaterialInputs/VegetationBendingPropertyGroup.json"
   },
   ```
   {{< note >}}
   Alternatively, you can place the properties directly in this `.materialtype` file, without having to import another `.json` file. See **propertyLayout** in the [Material Type File Specification](/docs/atom-guide/look-dev/materials/material-type-file-spec/#propertylayout).
   {{< /note >}}

Great, now that you have included the properties, you can use the properties in the code and view them.
1. Open `VegetationBending_ForwardPass.azsli` in a text editor.

1. You can reference the x offset parameter by using `MaterialSrg::m_xOffset`. So,  replace `worldPosition.x += 5.0` with the following, and do the same for the y offset: 

   ```
   worldPosition.x += MaterialSrg::m_xOffset;
   worldPosition.y += MaterialSrg::m_yOffset;
   ```
   {{< tip >}}
   Recall that you defined the properties in the material SRG in `VegetationBending_Common.azsli`. That's how you can reference them with `MaterialSrg` here.
   {{< /tip >}}

1. Repeat step 2 for the depth pass, `VegetationBending_DepthPass.azsli`.

1. Save your files and open the Material Editor.

1. Select the VegetationBending material that you made previously, (`my_material`), and find **Vegetation Bending** in the **Inspector** on the right. Adjust the x and y offsets as you see fit!

1. Save and return to the Editor.

1. Observe how the offset matches your inputs from the Material Editor!

{{< image-width src="/images/learning-guide/tutorials/rendering/vegetation-bending-tutorial/parameteroffset.png" width="100%" alt="The shader ball in the Editor, after using the offset from the adjustable properties in the Material Editor." >}}

Congrats! Now you have taken the first step to writing your own custom shaders.

## Prepare to add vegetation bending
Before you dive into writing code for vegetation bending, you will add a tree model and material, introduce an optional vertex stream, and add a few more passes.

### Add a tree
The next step is to add a model, which you'll add vegetation bending to later. With the model, you can also test the code that you'll write in the later steps. 

1. Open the **Editor** to your project and level. 
1. Create a new entity and rename it to `Tree`. For help, refer to the [Entity and Prefab Basics](/docs/learning-guide/tutorials/entities-and-prefabs/entity-and-prefab-basics/) page.
1. Add a **Mesh** component to the entity. In the **Entity Inspector**, click **Add Component** and select **Mesh**.
1. Add the `tree.fbx` model to the entity. In the Mesh component, for the **Model Asset** property, search for and select `tree.fbx`. 
1. Still in the Mesh component, click **Add Material Component**. 

1. In the added **Material** component, for the **Default Material** property, click {{< icon "file-folder.svg" >}} and select the material  that you made earlier (`my_material`).

Now, you have a tree (at an offset)! This tree is important because it uses _vertex colors_ in the _vertex stream_ that you will use in the shader code to determine how the tree should bend. A vertex stream is data stored in the vertex of a model, and a vertex color is the color stored in that vertex. 

{{< note >}}
You can color the vertices on each part of the tree by using a digital content creation (DCC) tool. The vertex colors indicate the type of bending as follows:
* **Red**: Smaller movement with a high frequency of random sinusoidal noise.
* **Green**: Delays the start of the movement for variations with high frequency of random sinusoidal noise.
* **Blue**: Larger movement and bending with low frequency of sinusoidal noise. 

In the case of the tree model, the trunk's vertices are blue and the leaves are red.
{{< /note >}}

### Use an optional vertex stream
You will add a shader input that takes the vertex stream so you can use the colors to do the appropriate bending. The tree mesh already has colored vertices; however, other meshes may not have colored vertices. Adding a _shader option_ allows the vertex shader to handle both of these cases.

1. In the `VegetationBending_Common.azsli` file, at the bottom, define a boolean shader option. You can place this variable in the common file so you can use it in all the passes.

   ```
   option bool o_color_isBound;
   ```
   
1. In the `VegetationBending_ForwardPass.azsli` file, inside `struct VegetationVSInput`, add the following field. 

   ```
   float4 m_optional_color : COLOR0;
   ```

   {{< note >}}
   For a mesh with colored vertices, `m_optional_color` gets set at runtime, if it's available. Then, a soft name convention sets `o_color_isBound` to `true`, which you can use to determine if the material should perform the bending or not. This soft name convention is a very specific sub-feature of shader options that are set based on the presence or absence of an optional vertex stream, as opposed to shader options set based on material properties.
   
   All of the fields are indicated by [HLSL semantics](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics#vertex-shader-semantics). The engine processes the semantics and updates the fields accordingly.
   {{< /note >}}

1. Inside the function `VegetationBending_ForwardPassVS`, encase the offset code with an `if`-condition by using the boolean shader option:

   ```
   if (o_color_isBound) {
      worldPosition.x += MaterialSrg::m_xOffset;
      worldPosition.y += MaterialSrg::m_yOffset;
   }
   ```

1. Repeat steps 2 and 3 with the depth pass in `VegetationBending_DepthPass.azsli`.

1. Save both files and open your level in the **Editor** from the previous steps. 

You should see that the tree entity is offset, but the shader ball is not! That's because the shader ball doesn't have a vertex color stream.

{{< image-width src="/images/learning-guide/tutorials/rendering/vegetation-bending-tutorial/optionoffset.png" width="100%" alt="The tree and the shader ball in the Editor, with only the tree offset from adding the shader option." >}}

### Delete previous offset code
Delete the previous offset code so that you can implement vegetation bending. 

Delete the following: 
* The code added to adjust the position in the vertex shaders of both the forward pass and depth pass.
* The `m_xOffset` and `m_yOffset` variable declarations in the `MaterialSrg`, in the `VegetationBending_Common.azsli` file.
* The `xOffset` and `yOffset` properties in the `VegetationBendingPropertyGroup.json` file. However,  keep the rest of the file and its connection in `VegetationBending.materialtype`.
* In the Editor, `my_material` from the **Default Material** in the **Material** component for both the tree and the shader ball.

Make sure to keep the declarations for `m_optional_color` and `o_color_isBound`.

### Create materials for the tree
Add some textures to make your tree look more realistic! For the tree, you need 3 materials: for the trunk, the branches, and the leaves.

1. Open the Editor, and then the **Material Editor**.

1. Create a new material of the **VegetationBending** material type named `aspen_leaf.material`. Save it in the same folder where you saved your previous material in, such as the `Materials` folder.

1. Set the base color texture of the material. In the **Inspector**, under the **Base Color** > **Texture** property, click {{< icon "file-folder.svg" >}} and choose `aspen_leaf_basecolora.tif`.

   {{< note >}}
   The suffix `_basecolora` tells the engine to process the texture with a specific [*preset*](/docs/user-guide/assets/texture-settings/texture-presets). Appending a suffix to the name of a texture tells the engine to use the corresponding preset. In this case, you'll use the `_basecolora` preset because this texture has the base color in the rgb channels and the opacity in the alpha channel.
   {{< /note >}}

1. Set the opacity mode. For the **Opacity** > **Opacity Mode** property, select `Cutout`. You need to set this to `Cutout` because the leaf texture has transparent parts. Ensure the **Alpha Source** is `Packed`. You can choose to adjust the **Factor** as you wish.

1. Under **General Settings**, enable **Double-sided**. This renders both sides of the material.

1. Save your `aspen_leaf.material` material. 
2. Repeat the above steps for the branch and the trunk materials, but don't make new materials. Instead, make the branch and trunk materials be children of the leaf material. This allows the material properties to stay constant for all three.

   1. In the **Asset Browser** of the Material Editor, **right-click** `aspen_leaf.material`. 
      - Select **Create Child Material...** and save it as `aspen_bark_01.material` in the same folder as `aspen_leaf.material`. 
      - Find **Base Color** in the **Inspector** and choose `aspen_bark_01_basecolor.tif`.

   1. Repeat the above step for `aspen_bark_02.material`. Make it a child of `aspen_leaf.material` and set **Base Color** as `aspen_bark_02_basecolor.tif`.

   {{< note >}}
   Notice how the other properties are the same as the leaf's! If you edit the parent material's properties after creating these child materials, it will automatically update the child materials' property values. This will be important later when you adjust the bending properties so all parts of the tree remain in sync while bending.
   {{< /note >}}

1. Save all 3 materials and exit the Material Editor. In the **Editor**, select the tree entity (`Tree`).

1. Add the materials you just made to the Material component. In the **Entity Inspector**, find the **Material** component. For the **Model Materials** property, map the following materials:
   * **AM_Aspen_Bark_01**: `aspen_bark_01.material`
   * **AM_Aspen_Bark_02**: `aspen_bark_02.material`
   * **AM_Aspen_Leaf**: `aspen_leaf.material`

{{< image-width src="/images/learning-guide/tutorials/rendering/vegetation-bending-tutorial/greytree.png" width="100%" alt="The tree in the Editor with new materials but with grey areas." >}}

Great, the tree looks better! However, notice that there are still grey areas around the leaves -- look familiar? Recall that there was a grey area when you edited the forward pass, but not the depth pass. You will need to add more passes! 

### Add depth pass and shadowmap pass with pixel shaders
The depth pass that you use right now is for opaque objects. It doesn't use a pixel shader, so the depth pass doesn't know which pixels are supposed to be transparent, even though you already specified that the materials have `Cutout` opacity. So, you will need to use a depth pass with a pixel shader (PS)! You will also need a shadowmap pass with a pixel shader for the tree's shadow to appear correctly as well.

The Vegetation Bending templates in the Atom Tutorials Gem also includes `DepthPass_WithPS` and `Shadowmap_WithPS`. These files don't need to be edited now, but in this step, you will add connections to them to ensure your material type uses them. (They already include the vertex color input you just added.)

1. Open `VegetationBending.materialtype`.

1. Find `shaders`, a list of the `.shader` files that your material type can use. Notice that each shader file is referenced with a tag. The tag allows us to reference the shader easily.

1. Under the shader with `"tag": "Shadowmap"`,  add a new entry for the shadowmap with PS:

   ```json
   {
      "file": "./VegetationBending_Shadowmap_WithPS.shader",
      "tag": "Shadowmap_WithPS"
   },
   ```

1. Similarly, under the shader with `"tag": "DepthPass"`,  add a new entry for the depth map with PS:

   ```json
   {
      "file": "./VegetationBending_DepthPass_WithPS.shader",
      "tag": "DepthPass_WithPS"
   }
   ```

1. Save the file.
   
You've added the appropriate shaders to the list of shaders for your material type. However, you may notice that only adding to the list of shaders doesn't change the tree. You will need to give the engine instructions for which shader to use for different materials. This is where Lua material functors come in. 

1. Open `VegetationBending_ShaderEnable.lua`.

1. In the file, observe how it enables the pixel shader versions of the depth and shadowmap passes (`depthPassWithPS` and `shadowMapWithPS`) if parallax with pixel depth offset is enabled, or if `OpacityMode_Cutout` is used.
   
   There is no need to edit anything in this file for now.

1. Open `VegetationBending.materialtype`.

1. Create a functor and include the `VegetationBending_ShaderEnable.lua` file. This allows the engine to process it and determine which shaders to use. 

   ```json
      "functors": [
         {
            "type": "Lua",
            "args": {
               "file": "Materials/Types/VegetationBending_ShaderEnable.lua"
            }
         }
      ],
   ```

1. Save the file, allow the **Asset Processor** to process the changes, and open the **Editor** again. 

Observe how the tree looks more realistic! 

{{< image-width src="/images/learning-guide/tutorials/rendering/vegetation-bending-tutorial/treeallpasses.png" width="100%" alt="The tree properly rendered in the Editor with all appropriate passes added." >}}

## Add vegetation bending
Great, now you can start adding the code for vegetation bending! 

First, you need to set up the wind constants. Then, you will determine the detail bending, which is the slight movement that you see in leaves and at the end of branches. Finally, you will add main bending, which is the overall swaying of the tree.

{{< note >}}
The following bending functions are derived from [Vegetation Procedural Animation and Shading in Crysis](https://developer.nvidia.com/gpugems/gpugems3/part-iii-rendering/chapter-16-vegetation-procedural-animation-and-shading-crysis) in NVIDIA GPU Gems 3.
{{< /note >}}

### Add vegetation bending properties
You need several properties to determine how the materials should bend:
* `DetailBendingFrequency` - The frequency of the detail bending.
* `DetailBendingLeafAmplitude` - The amplitude in which leaves can bend.
* `DetailBendingBranchAmplitude` - The amplitude in which branches can bend.
* `WindX` -The amount of wind in the x direction.
* `WindY` - The amount of wind in the y direction.
* `WindBendingStrength` - The amount in which the vegetation bends as a result of the wind.
* `WindBendingFrequency` - The frequency that the object sways back and forth caused by the wind.

The `DetailBending`- properties are specifically used for detail bending, while the `Wind`- properties are used for all parts of the bending.

1. Open `VegetationBendingPropertyGroup.json`.

1. Delete the `xOffset` and `yOffset` properties that you added previously, if you haven't already. Add these seven:

   ```json
   {
   "name": "vegetationBending",
   "displayName": "Vegetation Bending",
   "description": "Properties for configuring the bending.",
   "properties": [
      {
         "name": "DetailBendingFrequency",
         "displayName": "Detail bending frequency",
         "description": "Detail bending frequency.",
         "type": "Float",
         "defaultValue": 0.0,
         "min": 0.0,
         "max": 1.0,
         "connection": {
         "type": "ShaderInput",
         "name": "m_detailFrequency"
         }
      },
      {
         "name": "DetailBendingLeafAmplitude",
         "displayName": "Detail bending leaf amplitude",
         "description": "Detail bending leaf amplitude.",
         "type": "Float",
         "defaultValue": 0.0,
         "min": 0.0,
         "max": 1.0,
         "connection": {
         "type": "ShaderInput",
         "name": "m_detailLeafAmplitude"
         }
      },
      {
         "name": "DetailBendingBranchAmplitude",
         "displayName": "Detail branch amplitude",
         "description": "Detail branch amplitude.",
         "type": "Float",
         "defaultValue": 0.0,
         "min": 0.0,
         "max": 1.0,
         "connection": {
         "type": "ShaderInput",
         "name": "m_detailBranchAmplitude"
         }
      },
      {
         "name": "WindX",
         "displayName": "Wind direction x",
         "description": "Wind in the x direction. This would typically come from a wind system instead of a material property, but is here as a proof of concept.",
         "type": "Float",
         "defaultValue": 0.0,
         "min": -1.0,
         "max": 1.0,
         "connection": {
         "type": "ShaderInput",
         "name": "m_windX"
         }
      },
      {
         "name": "WindY",
         "displayName": "Wind direction y",
         "description": "Wind in the y direction. This would typically come from a wind system instead of a material property, but is here as a proof of concept.",
         "type": "Float",
         "defaultValue": 0.0,
         "min": -1.0,
         "max": 1.0,
         "connection": {
         "type": "ShaderInput",
         "name": "m_windY"
         }
      },
      {
         "name": "WindBendingStrength",
         "displayName": "Bending strength",
         "description": "Bending strength. This would typically come from a wind system instead of a material property, but is here as a proof of concept.",
         "type": "Float",
         "defaultValue": 0.0,
         "min": 0.0,
         "max": 7.0,
         "connection": {
         "type": "ShaderInput",
         "name": "m_bendingStrength"
         }
      },
      {
         "name": "WindBendingFrequency",
         "displayName": "Wind Bending Frequency",
         "description": "The frequency that the object sways back and forth caused by the wind. This would typically come from a wind system instead of a material property, but is here as a proof of concept.",
         "type": "Float",
         "defaultValue": 0.0,
         "min": 0.0,
         "max": 1.5,
         "connection": {
         "type": "ShaderInput",
         "name": "m_windBendingFrequency"
         }
      }
   ]
   }

   ```

1. Open `VegetationBending_Common.azsli`.

1. Delete the previous offset variables if you haven't already, and declare the bending property variables in `MaterialSrg`:
   
   ```glsl
    float m_detailFrequency;
    float m_detailLeafAmplitude;
    float m_detailBranchAmplitude;
    float m_windX;
    float m_windY;
    float m_bendingStrength;
    float m_windBendingFrequency;
    ```

1. Open the leaf material (`aspen_leaf.material`) in the **Material Editor**. Make sure you select the leaf material because that is the parent material of the other parts of the tree.

1. In the **Inspector**, scroll to the **Vegetation Bending** property group. Ensure that the seven properties you just added are there.

1. Adjust the properties! You can adjust them to the following to ensure you can see bending later:
   * **Detail bending frequency** - `0.3`
   * **Detail bending leaf amplitude** - `0.3`
   * **Detail bending branch amplitude** - `0.3`
   * **Wind direction x** - `0.5`
   * **Wind direction y** - `0.5`
   * **Bending strength** - `4.0`
   * **Wind bending frequency** - `0.7`

### Add process bending function
First, add a function to handle process bending, which your multiple vertex shaders can call. Later, you will write more functions for different parts of the bending and call them from this function. 
1. Open `VegetationBending_Common.azsli`.

1. At the bottom, add a function that will apply bending, and then return the world position of the vertex. The parameters given to this function are helpful to determine bending.

   ```glsl
   float4 ProcessBending(float currentTime, float3 objectSpacePosition, float3 normal, float4 detailBendingParams, float4 worldPosition, float4x4 objectToWorld) 
   {
      float4 adjustedWorldPosition = float4(worldPosition);
      if (o_color_isBound) 
      {
         // You will add function calls here.
      }
      return adjustedWorldPosition;
   }
   ```

   {{< note >}}
   Like before, notice how you use a conditional with `o_color_isBound` to ensure that only meshes with vertex streams perform bending.
   {{< /note >}}

1. Call the `ProcessBending` function in your vertex shaders.

   1. Open `VegetationBending_ForwardPass.azsli` and find the vertex shader, `VegetationBending_ForwardPassVS`. 
   
   1. Above `OUT.m_worldPosition = worldPosition.xyz`, call the `ProcessBending` function. 
   
      The parameters to pass in are inputs to your vertex shader, values you have calculated already, and `m_time`, the number of seconds since the start of the application. `m_time` is provided by the *scene Shader Resource Group* (`SceneSrg`).
   
      ```glsl
      float currentTime = SceneSrg::m_time;
      worldPosition = ProcessBending(currentTime, IN.m_position, IN.m_normal, IN.m_optional_color, worldPosition, objectToWorld);

      OUT.m_worldPosition = worldPosition.xyz;
      OUT.m_position = mul(ViewSrg::m_viewProjectionMatrix, worldPosition);

      return OUT;
      ``` 
      {{< note >}}
      The code must be above the two `OUT` lines because it updates the `worldPosition`, which adjusts the `OUT` variables accordingly.
      {{< /note >}}
  
2. Repeat step 3 with the depth pass in `VegetationBending_DepthPass.azsli` and the depth pass with PS in `VegetationBending_DepthPass_WithPS.azsli`.

### Set up wind bending
Let's begin editing the code to add wind. 

1. Open `VegetationBending_Common.azsli`.

1. Above your `ProcessBending` function, add a function to calculate the amplitude, frequency, and phase of the wind according to the time and world position of the vertex. The wind's phase uses the `worldPosition` to mimic how wind affects nearby objects similarly, but faraway objects differently. This is because in real life, faraway objects may not be affected by the same breeze. 
  
   Later, you'll use this function to calculate the appropriate movement of the vertex.

   ```glsl
   float4 SetUpWindBending(float currentTime, float4 worldPosition) 
   {
      float2 wind = float2(MaterialSrg::m_windX, MaterialSrg::m_windY);
      float bendingStrength = MaterialSrg::m_bendingStrength;
      float2 amplitude = float2(wind.x * 0.4 + wind.y * 0.2, wind.y * 0.4 - wind.x * 0.2);
      float2 frequency = float2(MaterialSrg::m_windBendingFrequency, MaterialSrg::m_windBendingFrequency * 1.125);
      // Using the world position to modify the phase makes it so different trees near each other are at similar but not equal points in the animation, 
      // so they appear to be reacting to the same wind but at different times as the wind moves through the vegetation.
      float2 phase = worldPosition.xy * 0.08;

      float2 bendAmount = sin(currentTime * frequency + phase) * amplitude;

      float4 result;
      result.xy = bendAmount + wind;
      result.z = length(wind);
      result.w = 0.3 * length(result.xy);
      result.xyz *= bendingStrength * 0.08;

      return result;
   }
   ```

   {{< note >}}
   By default, this function runs once per vertex on the GPU. Instead, you can potentially run it once per object on the CPU, causing the results to update each frame in the ObjectSrg. The tradeoff is between recomputing on the GPU per object, per vertex, per frame, versus computing with an extra SRG compile once per frame, per object.

   Your choice may depend on how much content you have, since the redundant GPU cost increases as vertex density increases. Your choice may also depend on whether the GPU or the vertex shader is the bottleneck, or if the vertex shader is bandwidth bound or arithmetic logic unit (ALU) bound. 
   {{< /note >}}

1. Call the `SetUpWindBending` function in the `ProcessBending` function, inside the conditional.
   
   ```glsl
   if (o_color_isBound) 
   {
      // Overall wind
      float4 currentBending = SetUpWindBending(currentTime, worldPosition);
   }

   return adjustedWorldPosition;
   ```

Great, now you have your wind bending function set up! Note that this doesn't enact any changes on the tree just yet, and the tree should be rendered as normal.

### Add detail bending
Using the wind bending constants that you just calculated, you can now determine the bending of the leaves.

1. Open `VegetationBending_Common.azsli`.

1. Add a `DetailBending` function that calculates the amount of movement and returns the resulting position for a vertex. Place this above the `ProcessBending` function.
   
   ```glsl
   float3 DetailBending(float3 objectSpacePosition, float3 normal, float4 detailBendingParams, float currentTime, float4 worldPosition, float bendLength)
   {
      // The information from the vertex colors about how to bend this vertex.
      float edgeInfo = detailBendingParams.x;
      float branchPhase = detailBendingParams.y;
      float branchBendAmount = detailBendingParams.z;

      // Phases (object, vertex, branch)
      float objPhase = dot(worldPosition.xyz, 2.0); 
      branchPhase += objPhase;
      float vtxPhase = dot(objectSpacePosition, branchPhase); 

      // Detail bending for leaves
      // x: is used for leaves, y is used for branch
      float2 wavesIn = currentTime;
      wavesIn += float2(vtxPhase, branchPhase);
      float4 waves = (frac(wavesIn.xxyy * float4(1.975, 0.793, 0.375,  0.193)) * 2.0 - 1.0) * MaterialSrg::m_detailFrequency * bendLength;
      waves = abs(frac(waves + 0.5) * 2.0 - 1.0);

      // x: is used for leaves, y is used for branches
      float2 wavesSum = waves.xz + waves.yw;

      // Leaf and branch bending (xy is used for leaves, z for branches)
      float3 movement = wavesSum.xxy * float3(edgeInfo * MaterialSrg::m_detailLeafAmplitude * normal.xy, branchBendAmount * MaterialSrg::m_detailBranchAmplitude);
      return objectSpacePosition + movement;
   }
   ```

1. In the `ProcessBending` function, inside the conditional:

   * Call the `DetailBending` function.
   
   * Set and return the adjusted world position, so the actual vertex shader output uses the output from the `DetailBending` function. 
   
   ```glsl
   if (o_color_isBound) 
   {
      // Overall wind
      float4 currentBending = SetUpWindBending(currentTime, worldPosition);

      // Detail bending
      float3 currentOutPosition = DetailBending(position, normal, detailBendingParams, currentTime, worldPosition, currentBending.w);

      adjustedWorldPosition = mul(objectToWorld, float4(currentOutPosition, 1.0));
   }

   return adjustedWorldPosition;
   ```
   
   {{< note >}}
   The `currentBending.w` parameter that's passed into the `DetailBending` function controls the overall bending length according to the wind's strength and direction. 
   {{< /note >}}
1. Open the Editor. You should see that your tree's leaves bend slightly. If you don't, try increasing all the properties in the Material Editor.

{{< video src="/images/learning-guide/tutorials/rendering/vegetation-bending-tutorial/detailbendingtree.mp4" autoplay="true" loop="true" width="100%" muted="true" info="The tree in the Editor with detail bending applied, moving the leaves slightly." >}}

### Add main bending
The leaves move now, but the tree doesn't sway yet. In this step, you will add main bending, the overall sway and movement that the whole tree experiences.

1. Open `VegetationBending_Common.azsli`.

1. Above your `ProcessBending` function, add a function to make the tree sway. Using the current position of the vertex (after it has been changed from the detail bending) and the bending determined by the wind, you can bend the tree as a whole.
   
   ```glsl
   float3 MainBending(float3 objectSpacePosition, float4 bending)
   {
      float windX = bending.x;
      float windY = bending.y;
      float bendScale = bending.z;

      // More bending occurs higher up on the object
      float bendFactor = objectSpacePosition.z * bendScale;
      bendFactor *= bendFactor; 

      // Rescale the displaced vertex position with the original distance to the object's center
      // to restrict vertex movement to minimize deformation artifacts
      float len = length(objectSpacePosition); 
      float3 newPos = objectSpacePosition;
      newPos.xy += float2(windX, windY) * bendFactor;

      return normalize(newPos) * len;
   }
   ```

1. Call the `MainBending` function after the call to the `DetailBending` function, in the `ProcessBending` function.
   
   ```glsl
   if (o_color_isBound)
   {
      // Overall wind
      float4 currentBending = SetUpWindBending(currentTime, worldPosition);

      // Detail bending
      float3 currentOutPosition = DetailBending(position, normal, color, currentTime, worldPosition, currentBending.w);

      currentOutPosition = MainBending(currentOutPosition, currentBending);

      adjustedWorldPosition = mul(objectToWorld, float4(currentOutPosition, 1.0));
   }
   ```

1. Open the **Editor**. You should see that your tree sways and the leaves still bend. If you don't, try increasing the wind properties in the Material Editor.

Amazing, your tree now sways and reacts to wind! Try to place multiple trees and observe how the trees sway differently when close together versus farther away. Also, add some lighting to make the trees pop!

{{< video src="/images/learning-guide/tutorials/rendering/vegetation-bending-tutorial/tree3.mp4" autoplay="true" loop="true" width="100%" muted="true" info="Three trees in the Editor, all swaying at a different pace with detail bending." >}}

### Add motion vectors
Since your tree moves, you can add cool effects by using a *motion vector pass*. Motion vectors are used by effects such as motion blur and [Temporal Anti-Aliasing (TAA)](/docs/atom-guide/features/taa.md).

If you look at the `MeshMotionVectorVegetationBending.azsl` file, the vertex shader looks similar to the other vertex shaders, but there's a new output. `OUT.m_worldPosPrev` is the position of the vector in the previous frame. The pixel shader uses both the previous vector position and the current one to calculate the motion vector. 

However, there isn't a vertex shader input that gives us the previous position. Therefore, in the vertex shader, you will calculate the bending for not only the current time as you have been, but also for the previous time frame.

Let's add the motion vector shader and then edit its vertex shader:

1. Open `VegetationBending.materialtype`. At the bottom of the `shaders` list, add the motion vector pass:
   
   ```json
   {
      "file": "./MeshMotionVectorVegetationBending.shader",
      "tag": "MeshMotionVector"
   }
   ```

1. Open `MeshMotionVectorVegetationBending.azsl`.

1. For motion vectors to work, you need to perform bending at the current frame time and the previous frame time.
 
   Under the `float4 prevWorldPosition` declaration, above `OUT.m_worldPos`, add the following:

   1. Call the `ProcessBending` function and pass in the current time and world position. This is similar to the calls you made in the earlier shaders.
   
   1. Call `ProcessBending` again, but this time, pass in the previous frame time and previous world position. Use `SceneSrg::m_prevTime` to get the previous frame time.

   ```glsl
   float currentTime = SceneSrg::m_time;
   worldPosition = ProcessBending(currentTime, IN.m_position, IN.m_normal, IN.m_optional_color, worldPosition, objectToWorld);
   
   float prevTime = SceneSrg::m_prevTime;
   prevWorldPosition = ProcessBending(prevTime, IN.m_position, IN.m_normal, IN.m_optional_color, prevWorldPosition, prevObjectToWorld);
   ```

1. Take a look at the pixel shader to see how the motion vector is calculated! There is no need to edit the pixel shader.

Amazing, you have added everything you need to add for motion vectors! However, if you open the **Editor** and just view the tree, you'll see that there is no difference. To observe that the motion vector pass works, you can use the **Pass Tree Visualizer**.
#### Debugging with the Pass Tree Visualizer

1. Open the Editor and press **Ctrl-G** to enter gameplay mode.

1. Press the **Home** key on your keyboard. This brings up the toolbar at the top.

1. Select **Atom Tools** > **Pass Viewer**.

1. In the pop-up **PassTree View**, enable **Preview Attachment** and **Show Pass Attachments**.

1. In the **PassTree**, find *MotionVectorPass* > *MeshMotionVectorPass* and select the line with `CameraMotion`. 

1. Ensure you are viewing your tree. 
   
   {{< note >}}
   You may only see black on the bottom left preview, because the motion vectors are small, meaning the tree moves minimally. 

   To better see the motion vectors, you can move the camera around or translate the tree quickly. You can also open `MeshMotionVectorVegetationBending.azsl` and scale `OUT.m_motion` in the pixel shader to ensure that the motion vectors' directions are working properly.
   {{< /note >}}

This video shows the motion vectors when `OUT.m_motion` is scaled by `10000.0`.
{{< video src="/images/learning-guide/tutorials/rendering/vegetation-bending-tutorial/motionvectortree.mp4" autoplay="true" loop="true" muted="true" width="100%" info="Three trees in the Editor swaying with detail bending, with the motion vector visualizer on the bottom right indicating the direction of movement." >}}

{{< tip >}}
The Pass Tree Visualizer tool is also helpful for debugging shaders and passes. It allows you to see the output of certain steps of different passes when you select them in the **PassTree**.
{{< /tip >}}

## Download the AtomTutorial Gem sample
Now that you've completed this tutorial, you can compare your results to our working version of the VegetationBending material type in the **AtomTutorials Gem** in the [o3de/sample-code-gems repository](https://github.com/o3de/sample-code-gems). You can either download and place the [final working vegetation bending files](https://github.com/o3de/sample-code-gems/tree/main/atom_gems/AtomTutorials/Assets/VegetationBending) in your project, or you can download the Gem and add it to the engine.

To download and enable the **AtomTutorials Gem**, do the following:
1. Download or clone the [o3de/sample-code-gems repository](https://github.com/o3de/sample-code-gems). 

   {{< note >}}
   If you followed this tutorial, then you already downloaded or cloned this repository and may have moved the files in `Assets/VegetationBending/Objects/` out of the repository. You can move the files back in, or re-download or clone the repository.
   {{< /note >}}

1. Open `VegetationBending.materialtype` and replace all the instances of `{your-path-to-o3de}` with your absolute path to O3DE. 

1. Register the **AtomTutorials Gem** to your project. In the command line interface, run the following command:

   ```
   cd {path-to-o3de-engine}
   scripts\o3de register -gp {your-path-to-sample-code-gems}\atom_gems\AtomTutorials -espp {your-project-path}
   ```

   For example, with paths:
   ```
   scripts\o3de register -gp C:\sample-code-gems\atom_gems\AtomTutorials -espp C:\MyProject
   ```

1. Add the **AtomTutorials** Gem to your project. Follow the instructions in [Adding and Removing Gems in a Project](/docs/user-guide/project-config/add-remove-gems). 

1. Re-build your project by clicking **Build Project**, or by clicking {{< icon "menu.svg" >}} and selecting **Build**. 

1. Open the **Editor** and [add a tree](vegetation-bending-tutorial/#add-a-tree) and [make vegetation bending materials](vegetation-bending-tutorial/#create-materials-for-the-tree)! 

{{< note >}}
If you have both your version of the vegetation bending material type and our version, there may be naming duplication errors as specified in the **Asset Processor**. You can either rename one version or move it away from the project folders temporarily while checking out one version or the other. 
{{< /note >}}

Congratulations! You are now done with this tutorial.
