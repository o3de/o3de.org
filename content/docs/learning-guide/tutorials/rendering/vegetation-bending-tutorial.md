---
linkTitle: Vertex Deformation for Vegetation Bending Tutorial
title: Vertex Deformation for Vegetation Bending Tutorial
description: A tutorial for add vegetation bending with the Atom rendered in the Open 3D Engine (O3DE).
toc: true
---

In this tutorial, we cover how to make your own material type and how to edit vertex shaders to achieve a vegetation bending effect. While we use vegetation bending as an example, the primary goal of this tutorial is to familiarize yourself with how to use and create custom material types and vertex shaders. 

This tutorial covers the following concepts:
* Making your own material type
* Creating materials in the **Material Editor**
* Editing vertex shaders
* Adding editable properties for your material type
* Using optional vertex streams
* Adding passes to your material type
* Using the Pass Tree Visualizer to debug passes

The VegetationBending materialtype allows materials to bend and sway, simulating how wind affects vegetation. It allows for detail bending with slight movement of branches and leaves, as well as movement of the entire object. 

The code in this tutorial can be found in the [AtomTutorials Gem](https://github.com/o3de/sample-code-gems/tree/main/atom_gems/AtomTutorials). There, you can find the template code to use to follow this tutorial, the final code, and the assets we are using.

As we go along, you may wish to reference the[Material Types and Shaders guide](get-started-materialtypes-and-shaders), which gives higher-level explanations of the mechanisms we are using.

## Get started
Before you can create your material type, ensure you have [installed the engine](/docs/welcome-guide/setup/), [set up a project](/docs/welcome-guide/create/), and [launched the editor](/docs/welcome-guide/tours/editor-tour).

Next, perform the following steps to get started on making the vegetation bending material type.
1. Download the template files from [here](https://github.com/o3de/sample-code-gems/tree/main/atom_gems/AtomTutorials/Templates/VegetationBending).
   * You'll notice that there are a couple key files and file extensions that we need to make our custom material type. More details can be found in [this guide](get-started-materialtypes-and-shaders/#1-set-up-the-files), but this tutorial will explain each file as we go along.
1. Move `VegetationBendingPropertyGroup.json` to `{your-project-path}\Materials\Types\MaterialInputs\`. Create the folders as needed!
1. Move the rest of the downloaded files to 
   `{your-project-path}\Materials\Types\`.
1. Open `{your-project-path}\Materials\Types\VegetationBending.materialtype`. Under `propertyLayout` > `propertyGroups`, you'll see there are many entries with `{your-path-to-o3de}`. Replace `{your-path-to-o3de}` with your appropriate path to the engine.
   * For example, `C:/o3de/Gems/Atom/Feature/Common/Assets/Materials/Types/MaterialInputs/BaseColorPropertyGroup.json`.
   * Currently we cannot import property groups across gems, so we are hard coding the absolute path as a proof of concept, even though it is not portable. There is a GHI to enable importing across gems at [o3de#10623](https://github.com/o3de/o3de/issues/10623).
1. Run the **Editor**, and the assets should automatically process. At this point, none of them should fail. If `VegetationBending.materialtype` fails to process, check that you used the correct paths in step 4.

These template files were created by duplicating important parts of the `StandardPBR` files and then modifying them. When you create your own material types in the future, you can similalry duplicate `StandardPBR` files and work from there.

As a high-level overview, [`.materialtype`](/docs/atom-guide/dev-guide/materials/materials/#material-types) references the shader files we will use on the material of this material type. The [`.shader`](/docs/atom-guide/look-dev/shaders/shader-file-spec.md) files define which types of shaders, such as vertex and pixel shaders, should be used and references the actual shader code in [`.azsl`](/docs/atom-guide/dev-guide/shaders/azsl/) files. They also specify the `DrawList`, which controls which pass should run that shader. Often, `.azsl` files will include `.azsli` files, which are also written in the Amazon shading language (AZSL), but are separate so multiple `.azsl` files can reuse the shader code from the `.azsli` files. 

## Add a material with the VegetationBending material type
Before we begin editing any files, we want to ensure we can make a material using our material type in the **Editor**.
 1. Launch the **Editor**, and open the **Material Editor** by pressing **M** on the keyboard or choosing **Tools** > **Material Editor**.
 1. Create a new material by choosing **File** > **New**. Then in the dropdown under **Select Type**, choose `VegetationBending` and give the material a name, such as `my_material`. Save it in your project's `Materials` folder.
 1. Save your material by hitting **CTRL-S**, and close the **Material Editor**.
 1. Back in the **Editor**, click on the *shader ball* that is already included in the default level. 
 1. In the **[Entity Inspector](/docs/user-guide/editor/entity-inspector)**, look for the **Mesh** component and click **Add Material Component**.
 1. In the material component, find the file icon next to *Default Material*, click it, and select the VegetationBending material that you just created.

{{< image-width src="/images/atom-guide/vegetation-bending-tutorial/materialeditor.png" width="100%" alt="Material added." >}}

{{< image-width src="/images/atom-guide/vegetation-bending-tutorial/material.png" width="100%" alt="Material added." >}}

## Edit the vertex shader
Now we are ready to edit our shader to change how the engine renders our material type. 

### Render the material at an offset
To start off, let's edit the vertex shader to render our shader ball at an offset.
1. Open `{your-project-path}\Materials\Types\VegetationBending_ForwardPass.azsli`. Recall that `.azsli` files contain shader code. This file contains the vertex and pixel shader code for the *forward pass* of the vegetation bending material type.
   {{< note >}}
   There is also a `VegetationBending_ForwardPass.azsl` file. Make sure you are opening the `.azsli` file.
   {{< /note >}}
1. Find the function `VegetationBending_ForwardPassVS`.
1. Towards the end of the function, right before `OUT.m_worldPosition = worldPosition.xyz;`, add: 
   
   ```hlsl
   worldPosition.x += 5.0;
   ```
   This will adjust the position in the positive x direction by `5` units. You may wonder why we are editing `worldPosition` instead of `m_position`; `m_position` is the position of this vertex relative to the origin of the model, whereas `m_worldPosition` is the position of this vertex relative to the origin of the level (or world). Try out editing the other dimensions and `m_position` and `worldPosition` and see what they do!
1. Make sure the **Editor** is open, if it is not already open.
1. Save your file with **CTRL-S** and the **Asset Processor** should automatically detect changes and process the file. You can open the **Asset Processor** and check when the file is done processing. 
   {{< note >}}
   If you can't find the **Asset Processor**, click the arrow on the bottom right of your taskbar, and then click on the icon of two arrows in a circle.
   {{< /note >}}
1. Once the **Asset Processor** is done processing the changes, you should see in the **Editor** that your material looks different!

{{< image-width src="/images/atom-guide/vegetation-bending-tutorial/offset.png" width="100%" alt="Forward pass offset." >}}

The main texture of our shader ball seems to be showing up at an offset as we intended, but a grey outline is still at the origin of the object. This is because we only edited the forward pass, but have yet to edit the *depth pass*. All the passes we go through are referenced in `VegetationBending.materialtype`.
More information about passes can be found [here](/docs/atom-guide/dev-guide/passes/), but keep in mind that different passes render different parts of the material, and some passes' outputs are used as inputs to other passes.

Let's repeat the above steps but with the depth pass:
1. Open `{your-project-path}\Materials\Types\VegetationBending_DepthPass.azsli`.
   * Make sure you are not editing the `VegetationBending_DepthPass_WithPS.azsli` file.
1. Find the function `DepthPassVS`.
1. Towards the end of the function, right before `OUT.m_position = mul(ViewSrg::m_viewProjectionMatrix, worldPosition);`, add: 
   
   ```
   worldPosition.x += 5.0;
   ```
1. Save your file and look at the **Editor**. The shader ball should now be completely rendered at an offset! 
   * Note that the shadow is still in the original position. We'll be correcting this later on in the tutorial when we add a custom shadowmap with pixel shader. For brevity, we are not covering the vertex-only shadowmap shader in the tutorial and instead using the StandardPBR one. After finishing this tutorial, see if you can add and adjust the vertex-only shadow (used for opaque materials that don't have alpha-cutout) yourself!

{{< image-width src="/images/atom-guide/vegetation-bending-tutorial/fulloffset.png" width="100%" alt="Completed offset added." >}}

### Add material property parameters
For now, we have just been moving the ball an offset of `5` units. However, we may want an easy way to change the offset in the **Editor** instead of having to change the code. We can do this with adjustable parameters in the **Material Editor**.

1. Open `{your-project-path}\Materials\Types\MaterialInputs\VegetationBendingPropertyGroup.json`.
1. Under `properties`, you'll see that there is already a property, `xOffset`, written there for you. Following `xOffset` as a guide, add another property `yOffset`. Don't forget to add a comma after the brackets surrounding the `xOffset` property, so that the file is valid `json`. The code should end up looking something like this:
   
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
1. Open `{your-project-path}\Materials\Types\VegetationBending_Common.azsli`.
   * This file is included in every pass of the vegetation bending material type. There are many included files to other *shader resource groups* (SRGs) and other functions in this file that are necessary for all passes.
1. Look for `ShaderResourceGroup MaterialSRG : SRG_PerMaterial`. 
1. Here, we will define the variables that we reference as the *connection name* in `VegetationBendingPropertyGroup.json`, which should be `m_xOffset` and `m_yOffset`. So, in `MaterialSRG`, add 

   ```
   float m_xOffset;
   float m_yOffset;
   ```
1. Now, we need to include the properties in the `.materialtype` file. Open `VegetationBending.materialtype`, and take a look at the list of `propertyLayout` > `propertyGroups`. These are all editable properties for a material in the **Material Editor**. 
   * If you look at the **Material Editor** and open a material of type VegetationBending, you can see that the adjustments to the material you can make on the right follow the properties described in all of these `.json` files.
1. Add a property group entry at the top of the list for vegetation bending. Add:

   ```
   {
      "$import": "MaterialInputs/VegetationBendingPropertyGroup.json"
   },
   ```
   Note that you can also place the `json` properties directly in this `.materialtype` file, without having to import another `.json` file. 

Great, now we have parameters, but let's actually use the parameters in the code and view them.
1. Open `{your-project-path}\Materials\Types\VegetationBending_ForwardPass.azsli`. 
1. We can reference the x offset parameter by using `MaterialSrg::m_xOffset`. So, where you previously put `worldPosition.x += 5.0`, replace it and add the y offset: 

   ```
   worldPosition.x += MaterialSrg::m_xOffset;
   worldPosition.y += MaterialSrg::m_yOffset;
   ```
   Recall that we added the parameters into the material shader resource group, so that's how we can reference them with MaterialSrg.
1. Repeat with the depth pass.
1. Save your files and open the **Material Editor**.
1. Select the material you made with the VegetationBending material type previously (`my_material`), and find **Vegetation Bending** in the **Inspector** on the right. Adjust the x and y offsets as you see fit!
1. Save and return to the **Editor**.
1. Observe how the offset matches your inputs from the **Material Editor**!

{{< image-width src="/images/atom-guide/vegetation-bending-tutorial/parameteroffset.png" width="100%" alt="Parameter offset added." >}}

Congrats! Now you have taken the first step to writing your own custom shaders.

## Prepare to add vegetation bending
Now that we've edited our vertex shader, let's take the next step and prepare to add vegetation bending by adding an appropriate model.

### Add a tree
In order to test the code that we are about to write, we need an appropriate mesh!

1. Download `tree.fbx` from [here](https://github.com/o3de/sample-code-gems/blob/main/atom_gems/AtomTutorials/Assets/VegetationBending/Objects/tree.fbx).
1. Place `tree.fbx` in `{your_project_path}\Objects`. Make the `Objects` folder as needed.
1. Open the **Editor** to your project and level. 
1. In the **Entity Outliner**, **right-click** and select **Create entity**. **Right-click** the new entity in the **Entity Outliner**, and rename the entity to `Tree`.
1. In the **Entity Inspector**, click **Add Component** and select **Mesh**.
1. In the mesh component, click the file icon next to **Model Asset** select `tree.fbx` in your project's `Objects` folder.
1. Again in the mesh component, click **Add Material Component**, click the file icon next to *Default Material* and select your material that you made earlier (`my_material`).

Now, we have a tree (at an offset)! This tree is important because it uses vertex colors that we will be using to determine how the tree should bend.

Note on vertex colors: You can use a DCC tool to color the vertices to match the type of bending you want to do on each part of the tree: 
* Red vertex color: smaller movement with high frequency of random sinusoidal noise.
* Green vertex color: delays the start of the movement for variations with high frequency of random sinusoidal noise.
* Blue vertex color: larger movement and bending with low frequency of sinusoidal noise. 
In the case of our tree, the trunk's vertices are colored blue and leaves are colored red.

### Add a shader option
Our tree mesh that we just added has colored vertices; however, not every mesh that you want to apply your material type to may have colored vertices. Therefore, we want to add a [*shader option*](/docs/atom-guide/dev-guide/shaders/azsl/#shader-variant-options) that allows the vertex shader to handle both of these cases. We also want to add the reference to the colors so we can use them in the code.

1. Open `{your-project-path}\Materials\Types\VegetationBending_Common.azsli`.
1. At the bottom of the file, add:

   ```
   option bool o_color_isBound;
   ```
   We place this variable in the common file because we will be using it in all the passes.
1. Open `{your-project-path}\Materials\Types\VegetationBending_ForwardPass.azsli`. Inside `struct VegetationVSInput`, add another field:

   ```
   float4 m_optional_color : COLOR0;
   ```
   If the material's vertices are colored, `m_optional_color` will be set at runtime if it's available. Then, if `m_optional_color` is available, a soft naming convention will set `o_color_isBound` to true, which we can use later to determine if we want to perform the bending or not. Note that this soft naming convention is a very specific sub-feature of shader options that are set based on the presence or absence of an optional vertex stream, as opposed to shader options set based on material properties.
   
   All of the fields are indicated by [HLSL semantics](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics#vertex-shader-semantics). The engine processes the semantics and updates the fields accordingly.
1. Inside the function `VegetationBending_ForwardPassVS`, encase the offset code with a conditional using the option boolean:

   ```
   if (o_color_isBound) {
      worldPosition.x += MaterialSrg::m_xOffset;
      worldPosition.y += MaterialSrg::m_yOffset;
   }
   ```
1. Repeat steps 3 and 4 with the depth pass in `{your-project-path}\Materials\Types\VegetationBending_DepthPass.azsli`. Note that the depth pass' vertex shader input struct is `VSInput`.
1. Save both files and open your level in the **Editor** from the previous steps. You should see that the tree entity is offset, but the shader ball (which doesn't have a vertex color stream) is not!

{{< image-width src="/images/atom-guide/vegetation-bending-tutorial/optionoffset.png" width="100%" alt="Option offset added." >}}

### Delete previous offset code
Now that we have our tree and tested the shader options, let's delete the previous offset code so that we can start fresh with vegetation bending. That is, delete the following:
* The code added to adjust the position in the vertex shaders of both the forward pass and depth pass
* The `m_xOffset` and `m_yOffset` variable declarations in the `VegetationBending_Common.azsli` file in the `MaterialSrg`
* The `xOffset` and `yOffset` properties in the `.json` file, but keep the rest of the file and its connection in `VegetationBending.materialtype`; we will need it for later!

Make sure you are keeping the declarations for `m_optional_color` and `o_color_isBound`.

### Create materials for the tree
Let's add some textures to make our tree look more realistic! For the tree, we need 3 materials: one for the trunk, one for the branches, and one for the leaves.

1. Download the 3 `.tif` textures from [here](https://github.com/o3de/sample-code-gems/tree/main/atom_gems/AtomTutorials/Assets/VegetationBending/Objects).
1. Place the textures in `{your_project_path}/Objects`.
1. Open the **Editor**, and then the **Material Editor** by hitting **M**.
1. Choose **File** > **New** and, in the pop-up, choose **VegetationBending**, name the material `aspen_leaf.material`, and save it in the `Materials` folder.
1. On the right side in the **Inspector**, find **Base Color** and click on the file icon next to *Texture*. Choose `aspen_leaf_basecolora.tif`.
   * The suffix `_basecolora` tells the engine to process the texture with a specific [*preset*](/docs/user-guide/assets/texture-settings/texture-presets). Appending a suffix to the name of a texture tells the engine to use the corresponding preset. In this case, we are using the `_basecolora` preset because this texture has the base color in the rgb channels and the opacity in the alpha channel.
1. Find **Opacity** and, for **Opacity Mode**, select `Cutout`. We need to set this to `Cutout` because the leaf texture has transparent parts.
1. Under **General Settings**, enable **Double-sided**. This renders both sides of meshes.
1. Save your leaf material. Now, we need to repeat with the branch and the trunk. Instead of making whole new materials, we can make the leaf material the parent of the branch and trunk materials so the properties stay constant for all 3.
   1. In the **Asset Browser** of the **Material Editor**, **right-click** `aspen_leaf.material`. Select **Create Child Material...** and save it in the same `Materials` folder as `aspen_bark_01.material`. Find **Base Color** in the **Inspector** and choose `aspen_bark_01_basecolor.tif`.
   1. In the **Asset Browser** of the **Material Editor**, **right-click** `aspen_leaf.material`. Select **Create Child Material...** and save it in the same `Materials` folder as `aspen_bark_02.material`. Find **Base Color** in the **Inspector** and choose `aspen_bark_02_basecolor.tif`.

   Notice how the other properties are the same as the leaf's! If you edit the parent material's properties after creating these child materials, it will automatically update the child materials' property values. This will be important later when we adjust the bending properties so all parts of the tree remain in sync while bending.
1. Save all 3 materials and exit the **Material Editor**. In the **Editor**, click on the tree entity (`Tree`).
1. In the **Entity Inspector** on the right, find the **Material** component. Click the **X** to delete the **Default Material**. Under **Model Materials** > **AM_Aspen_Bark_01**, select `aspen_bark_01.material`. For **AM_Aspen_Bark_02**, select `aspen_bark_02.material`. For **AM_Aspen_Leaf**, select `aspen_leaf.material`.

{{< image-width src="/images/atom-guide/vegetation-bending-tutorial/greytree.png" width="100%" alt="Tree added." >}}

Great, the tree looks better! However, notice that there are still grey areas around the leaves -- look familiar? Recall that there was a grey area when we edited the forward pass, but not the depth pass. We need to add more passes! 

### Add depth pass and shadowmap pass with pixel shaders
The depth pass that we use right now is for opaque objects. It doesn't use a pixel shader, so the depth pass doesn't know which pixels are supposed to be transparent, even though we already specified that our materials have `Cutout` opacity. So, we need to use a depth pass with a pixel shader (PS)! We also need a shadowmap pass with a pixel shader for the tree's shadow to appear correctly as well.

1. There were also template files included for `DepthPass_WithPS` and `Shadowmap_WithPS`. These files don't need to be edited for now, but we need to add connections to them to ensure our material type will use these ones. They already include the shader option we just added.
1. Open `VegetationBending.materialtype`.
1. Find `shaders`, a list of the `.shader` files that our material type can use. Notice that each shader file is referenced with a tag. The tag allows us to reference the shader easily.
1. Under the shader with `"tag": "Shadowmap"`,  add a new entry for our shadow map with PS:
   ```json
   {
      "file": "./VegetationBending_Shadowmap_WithPS.shader",
      "tag": "Shadowmap_WithPS"
   },
   ```
1. Similarly, under the shader with `"tag": "DepthPass"`,  add a new entry for our depth map with PS:
   ```json
   {
      "file": "./VegetationBending_DepthPass_WithPS.shader",
      "tag": "DepthPass_WithPS"
   }
   ```
1. Save the file.
   
Now, we've added the appropriate shaders to the list of shaders for our material type. However, you may notice that just adding to the list of shaders doesn't change our tree. We need to give the engine instructions for which shader to use for different materials. This is where `.lua` material functors come in. 

1. Open `VegetationBending_ShaderEnable.lua`.
1. Look through the file, and observe how it enables the pixel shader versions of the depth and shadowmap passes if `OpacityMode_Cutout` is used or if parallax with pixel depth offset is enabled. There is no need to edit anything in the `.lua` file for now.
1. Open `VegetationBending.materialtype`.
1. We need to include the `.lua` file so the engine can process it and determine which shaders to use. After the list for `"shaders"` and before `"uvNameMap"`, add:
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
1. Save the file, allow the **Asset Processor** to process the changes, and open the **Editor** again. Observe how the tree now looks pretty realistic! 

{{< image-width src="/images/atom-guide/vegetation-bending-tutorial/treeallpasses.png" width="100%" alt="All tree passes added." >}}

## Add vegetation bending
Great, now we can start adding the code for vegetation bending! We first need to set up the wind constants. Then, we will determine the detail bending, which is the slight movement that you generally see in leaves and at the end of branches. Finally, we will add main bending, which is the overall swaying of the tree.

Note that the following bending functions are derived from [Vegetation Procedural Animation and Shading in Crysis](https://developer.nvidia.com/gpugems/gpugems3/part-iii-rendering/chapter-16-vegetation-procedural-animation-and-shading-crysis) in GPU Gems 3.

### Add vegetation bending parameters
We need several parameters to determine how we want our materials to bend:
* DetailBendFrequency - The frequency of the detail bending.
* DetailBendLeafAmplitude - The amplitude in which leaves can bend.
* DetailBendBranchAmplitude - The amplitude in which branches can bend.
* WindX -The amount of wind in the x direction.
* WindY - The amount of wind in the y direction.
* WindBendingStrength - The amount in which the vegetation bends as a result of the wind.
* WindBendingFrequency - The frequency that the object sways back and forth caused by the wind.

The "DetailBend" parameters are specfically used for detail bending, but the "Wind" parameters are used for all parts of the bending.

1. Open `{your-project-path}\Materials\Types\MaterialInputs\VegetationBendingPropertyGroup.json`.
1. Delete the `xOffset` and `yOffset` properties that we added previously if you haven't already, and add these six:
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
1. Open `{your-project-path}\Materials\Types\VegetationBending_Common.azsli`.
1. Delete the previous offset variables if you haven't already, and declare the bending property variables in `MaterialSrg`:
   
   ```hlsl
    float m_detailFreq;
    float m_detailLeafAmp;
    float m_detailBranchAmp;
    float m_windDirX;
    float m_windDirY;
    float m_bendingStrength;
    float m_windBendingFrequency;
    ```
1. Open the **Editor**, then open the **Material Editor**, and choose to edit the leaf material (`aspen_leaf.material`). Make sure you select the leaf material because that is the parent material of the other parts of the tree.
1. On the right, scroll down to **Vegetation Bending** and ensure that the 6 properties we just added are there.
1. Adjust the parameters! Make sure you adjust all of them so that you can see bending in the later steps.

### Add process bending function
First, let's add a function that our multiple vertex shaders can call to avoid repeat code. We will be writing more functions for different parts of the bending and calling them all from this function. 
1. Open `{your-project-path}\Materials\Types\VegetationBending_Common.azsli`.
1. At the bottom, add the following code: 
   ```hlsl
   float4 ProcessBending(float currentTime, float3 objectSpacePosition, float3 normal, float4 detailBendingParams, float4 worldPosition, float4x4 objectToWorld) 
   {
      float4 adjustedWorldPosition = float4(worldPosition);
      if (o_color_isBound) 
      {
         // We will add function calls here.
      }
      return adjustedWorldPosition;
   }

   ```
   The parameters given to this function will all be helpful for determining bending. Notice how, like before, we are using a conditional with `o_color_isBound` to ensure that we only perform bending on proper meshes.

   This function will return the world position that the vertex should be at after applying bending.
1. Now, we have to call the `ProcessBending` function in our vertex shaders! Open `{your-project-path}\Materials\Types\VegetationBending_ForwardPass.azsli`.
1. Find the vertex shader (`VegetationBending_ForwardPassVS`). Now, above `OUT.m_worldPosition = worldPosition.xyz`, add a call to our function:
   
   ```hlsl
   float currentTime = SceneSrg::m_time;
   worldPosition = ProcessBending(currentTime, IN.m_position, IN.m_normal, IN.m_optional_color, worldPosition, objectToWorld);

   OUT.m_worldPosition = worldPosition.xyz;
   OUT.m_position = mul(ViewSrg::m_viewProjectionMatrix, worldPosition);

   return OUT;
   ```
   In the *scene shader resource group* (`SceneSrg`), there is a parameter `m_time` that gives us the number of seconds since the start of the application. 

   Note that we're using the optional color parameter. Remember that we should only use it when it's available. We know it's available when o_color_isBound evaluates to true.
   
   We need the code to be above the two `OUT` lines because we will edit `worldPosition` and then will need to adjust the `OUT` variables accordingly.
1. Repeat steps 3-4 with the depth pass in `{your-project-path}\Materials\Types\VegetationBending_DepthPass.azsli` and the depth pass with PS in `{your-project-path}\Materials\Types\VegetationBending_DepthPass_WithPS.azsli`.
   * Note that the depth pass does not output a world position. Just place the code above the `OUT.m_position` line. The depth pass with PS has some extra code in the vertex shader, but you can still place this code about the two `OUT` statements.

### Set up wind bending
Now, let's begin editing the code to add wind. 

1. Open `{your-project-path}\Materials\Types\VegetationBending_Common.azsli`.
1. At the bottom, add the following code:

   ```hlsl
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
   Most of the code just takes the parameters that we enter in and calculates the amplitude, frequency, and phase of the movement according to the time. This is then used to calculate the appropriate movement of the vertex. 
   Note that we also take into account the `worldPosition` for the phase. This is because we want to mimic how wind should affect nearby objects similarly but faraway objects differently. Faraway objects may not be affected by the same "breeze".
   {{< note >}}
   This function could potentially be run once per-object on the CPU with the results updated each frame in the ObjectSrg instead of being run once per-vertex on the GPU. It's a tradeoff between doing the computation once per frame per vegetation object + an extra SRG compile per frame per vegetation object vs. re-doing the computation on the GPU per frame per vegetation object per vertex. It's content specific, with the redundant GPU cost increasing as vertex density increases, and also depends on if the GPU is the bottleneck, and whether or not the vertex shader is the bottleneck, and also if the vertex shader is bandwidth bound or ALU bound. 
   {{< /note >}}
1. Now, let's call the function in our `ProcessBending` function. Inside the conditional, add a call to our wind function:
   
   ```hlsl
   if (o_color_isBound) 
   {
      // Overall wind
      float4 currentBending = SetUpWindBending(currentTime, worldPosition);
   }

   return adjustedWorldPosition;
   ```

Great, now we have our wind bending function set up! Note that this doesn't enact any changes on our tree just yet, and the tree should be rendered as normal.

### Add detail bending
Using the wind bending constants that we just calculated, we can now determine the bending of the leaves.

1. Open `{your-project-path}\Materials\Types\VegetationBending_Common.azsli`.
1. At the bottom, add the following code:
   
   ```hlsl
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
1. Call the detail bending function in our `ProcessBending` function. Inside the conditional, add the call:
   
   ```hlsl
   if (o_color_isBound) 
   {
      // Overall wind
      float4 currentBending = SetUpWindBending(currentTime, worldPosition);

      // Detail bending
      float3 currentOutPosition = DetailBending(objectSpacePosition, normal, detailBendingParams, currentTime, worldPosition, currentBending.w);
   }

   return adjustedWorldPosition;
   ```
   Note that `currentBending.w` is passed in to the detail bending function. This is the overall bending length we want according to the wind strength and direction. 
1. Now, we need to set the actual vertex shader outputs to use the output from the detail bending function. We need to set the world position so the code following the conditional can update the positions correctly. 
   
   ```hlsl
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
1. Open the **Editor** and you should see your tree's leaves bending slightly. If you don't, try opening the **Material Editor** and increasing all the parameters. 

{{< video src="/images/atom-guide/vegetation-bending-tutorial/detailbendingtree.mp4" autoplay="true" loop="true" width="100%" muted="true" info="Video of tree detail bending." >}}

### Add main bending
The leaves are moving now, but the tree doesn't sway yet. We will now add main bending, the overall sway and movement that the whole tree experiences.

1. Open `{your-project-path}\Materials\Types\VegetationBending_Common.azsli`.
1. At the bottom, add the following code:
   
   ```hlsl
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
   Using the current position of the vertex (after it has been changed from the detail bending) and the bending determined by the wind, we can bend the tree as a whole.
1. Add a call to our detail bending function under the wind function call in our `ProcessBending` function:
   
   ```hlsl
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
1. Open the **Editor** and you should see your tree swaying with the leaves still bending. If you don't, try opening the **Material Editor** and increasing the wind parameters.

Amazing, our tree now sways and reacts to wind! Try to place multiple trees and observe how the trees sway differently when close together versus farther away. Also, add some lighting to make the trees pop!

{{< video src="/images/atom-guide/vegetation-bending-tutorial/tree3.mp4" autoplay="true" loop="true" width="100%" muted="true" info="Video of trees swaying." >}}

### Add motion vectors
Because our tree is moving, we should add a *motion vector pass* so we can choose to add motion blur or other effects. For example, we have a [Temporal Anti-Aliasing (TAA)](/docs/atom-guide/features/taa.md) feature which uses the motion vectors.

If you take a look at the `MeshMotionVectorVegetationBending.azsl` file, you can see that the vertex shader looks similar to the other vertex shaders we have seen, but there's a new output `OUT.m_worldPosPrev`. This is the position of the vector in the last time frame. The pixel shader uses both the previous vector position and the current one to calculate the motion vector. 

However, we don't have a vertex shader input that gives us the previous position. Therefore, in the vertex shader, we want to calculate the bending for not only the current time as we have been, but also for the previous time frame.

Let's add the motion vector shader and then edit its vertex shader:

1. Open `VegetationBending.materialtype`. At the bottom of the `shaders` list, add the motion vector pass:
   
   ```json
   {
      "file": "./MeshMotionVectorVegetationBending.shader",
      "tag": "MeshMotionVector"
   }
   ```
1. Open `MeshMotionVectorVegetationBending.azsl`.
1. Add the call to `ProcessBending`, just as we did in the previous steps with the other shaders. Under the declaration for `float4 prevWorldPosition`, but above `OUT.m_worldPos`, add:
   ```hlsl
   float currentTime = SceneSrg::m_time;
   worldPosition = ProcessBending(currentTime, IN.m_position, IN.m_normal, IN.m_optional_color, worldPosition, objectToWorld);
   ```
1. Now, for our motion vectors to work we need to find the previous world position. We want to perform bending on the vertex at the `IN.m_position` but at the previous frame time, with the previous world position. We can use `SceneSrg::m_prevTime` to get the previous frame time. Call our `ProcessBending` function again, but with the appropriate time and world position:
   ```hlsl
   float currentTime = SceneSrg::m_time;
   worldPosition = ProcessBending(currentTime, IN.m_position, IN.m_normal, IN.m_optional_color, worldPosition, objectToWorld);
   float prevTime = SceneSrg::m_prevTime;
   prevWorldPosition = ProcessBending(prevTime, IN.m_position, IN.m_normal, IN.m_optional_color, prevWorldPosition, prevObjectToWorld);
   ```
1. Take a look at the pixel shader to see how the motion vector is calculated! There is no need to edit the pixel shader.

Amazing, we have added everything we need to add for motion vectors! However, if you open the **Editor** and just view the tree, you'll see that there is no difference. We can, however, observe that the motion vector pass works by using the **pass tree visualizer**.
1. Open the **Editor** and press **CTRL-G** to enter gameplay mode.
1. Press the **Home** key on your keyboard. This brings up the toolbar at the top.
1. Select **Atom Tools** > **Pass Viewer**.
1. In the pop-up **PassTree View**, enable **Preview Attachment** and **Show Pass Attachments**.
1. In the **PassTree**, find *MotionVectorPass* > *MeshMotionVectorPass* and select the line with `CameraMotion`. 
1. Ensure you are viewing your tree. Note that you probably won't see much except black on the bottom left preview, because the motion vectors are very small since our tree only moves minimally. However, if you move the camera around or translate the tree quickly, you may see some motion vectors pop up. You can also open `MeshMotionVectorVegetationBending.azsl` and scale `OUT.m_motion` in the pixel shader to ensure that the motion vectors' directions are working properly.

This video shows the motion vectors when `OUT.m_motion` is scaled by `10000.0`.
{{< video src="/images/atom-guide/vegetation-bending-tutorial/motionvectortree.mp4" autoplay="true" loop="true" muted="true" width="100%" info="Video of tree motion vector." >}}

The pass tree visualizer tool is also helpful with debugging shaders and passes, so you can see the output of certain steps of different passes when you select them in the **PassTree**.

## Download the AtomTutorial Gem sample
Now that you've completed this tutorial, you can compare your results to our working version of the vegetation bending material type in the **AtomTutorials** gem in the [o3de/sample-code-gems repository](https://github.com/o3de/sample-code-gems). You can either download and place the [final working vegetation bending files](https://github.com/o3de/sample-code-gems/tree/main/atom_gems/AtomTutorials/Assets/VegetationBending) in your project, or you can download the gem and add it to the engine.

If you'd like to download and enable the **AtomTutorials** gem, do the following:
1. Download or clone the [o3de/sample-code-gems repository](https://github.com/o3de/sample-code-gems). 
1. Open `VegetationBending.materialtype` and replace all the instances of `{your-path-to-o3de}` with your absolute path to O3DE. 
1. [Register the **AtomTutorials** gem to the engine](/docs/user-guide/project-config/register-gems). In the command line interface, `cd` into the engine. Then, run
   ```
   scripts\o3de register -gp {your-path-to-sample-code-gems}\atom_gems\AtomTutorials -espp {your-project-path}
   ```
   For example, `scripts\o3de register -gp C:\sample-code-gems\atom_gems\AtomTutorials -espp C:\MyProject`
1. Now, [add the gem into your project](/docs/user-guide/project-config/add-remove-gems). 
   1. Open the **Project Manager**, which should be located in your project's `build/windows/bin/profile/o3de.exe`.
   1. In the menu, find your project, click on the three bars, and select **Configure Gems...**.
   1. In the **Gem Catalog**, search for **AtomTutorials** and enable the gem.
   1. Click **Save** in the bottom right.
1. Re-build your project by clicking **Build Project**, or on the three bars again and selecting **Build**. 
1. Open the **Editor** and [add a tree](vegetation-bending-tutorial/#add-a-tree) and [make vegetation bending materials](vegetation-bending-tutorial/#create-materials-for-the-tree)! 

{{< note >}}
If you have both your version of the vegetation bending material type and our version, there may be naming duplication errors as specified in the **Asset Processor**. You can either rename one version or move it away from the project folders temporarily while checking out one version or the other. 
{{< /note >}}

Congratulations! You are now done with this tutorial.
