---
linkTitle: Material Type Tutorial with Vegetation Bending
title: Material Type Tutorial with Vegetation Bending
description: A tutorial for add vegetation bending with the Atom rendered in the Open 3D Engine (O3DE).
weight: 300
toc: true
---

In this tutorial, we cover how to make your own material type and how to edit vertex shaders to achieve a vegetation bending effect. While we use vegetation bending as an example, the primary goal of this tutorial is to familiarize yourself with how to use and create custom material types and vertex shaders. 

This tutorial covers the following concepts:
- Making your own material type
- Creating materials in the **Material Editor**
- Editing vertex shaders
- Adding editable properties for your material type
- Adding shader options
- Adding passes
- Using the ImGui to debug passes

The VegetationBending materialtype allows materials to bend and sway, simulating how wind affects vegetation. It allows for detail bending with slight movement of branches and leaves, as well as movement of the entire object. 

We reference LINK HERE this branch for the code in this tutorial. There, you can find the template code to use to follow this tutorial, the final code, and the assets we are using.

As we go along, you may wish to reference the [Material Types and Shaders guide](https://www.o3de.org/docs/atom-guide/look-dev/get-started-materialtypes-and-shaders/), which gives higher-level explanations of the mechanisms we are using.

## Get started
Before you can create your material type, ensure you have [installed the engine](https://www.o3de.org/docs/welcome-guide/setup/), [set up a project](https://www.o3de.org/docs/welcome-guide/create/), and [launched the editor](https://www.o3de.org/docs/welcome-guide/tours/editor-tour/).

Next, perform the following steps to get started on making the vegetation bending material type.
1. Download the template files from [here](). Download all of them EXCEPT the `MeshMotionVectorVegetationBending` folder.
   > You'll notice that there are a couple key files and file extensions that we need to make our custom material type. More details can be found in [this guide](https://www.o3de.org/docs/atom-guide/look-dev/get-started-materialtypes-and-shaders/#1-set-up-the-files), but this tutorial will explain each file as we go along.
2. Move `VegetationBendingPropertyGroup.json` to `{your-path-to-o3de}\o3de\Gems\Atom\Feature\Common\Assets\Materials\Types\MaterialInputs`.
3. Move the rest of the downloaded files to 
   `{your-path-to-o3de}\o3de\Gems\Atom\Feature\Common\Assets\Materials\Types`.

> These template files duplicate important parts of the `StandardPBR` files. When you create your own material types in the future, you can duplicate `StandardPBR` files and work from there.

As a high-level overview, `.materialtype` references the shader files we will use on the material of this material type. The `.shader` files define which types of shaders, such as vertex and pixel shaders, should be used and references the actual shader code in `.azsl` files. They also specify the `DrawList`, which is what layer the results should be drawn on. Often, `.azsl` files will just include `.azsli` files, which are also written in the Amazon shading language (AZSL), but are separate so multiple `.azsl` files can include the `.azsli` files. 

## Add a material with the VegetationBending material type
Before we begin editing any files, we want to ensure we can make a material using our material type in the **Editor**.
 1. Launch the **Editor**, and open the **Material Editor** by pressing **M** on the keyboard or choosing **Tools** > **Material Editor**.
 2. Create a new material by choosing **File** > **New**. Then, in the pop-up, select **VegetationBending** and give the material a name, such as `my_material`. You can save it in your project's `Assets` folder.
 3. Save your material by hitting **CTRL-S**, and close the **Material Editor**.
 4. Back in the **Editor**, click on the *shader ball* that is already included in the default level. 
 5. On the right side, look for the **Mesh** component and click **Add Material Component**.
 6. In the material component, find the file icon next to *Default Material*, click it, and select the VegetationBending material that you just created.

{{< image-width src="/images/atom-guide/vegetation-bending-tutorial/material.png" width="100%" alt="Material added." >}}

## Edit the vertex shader
Now we are ready to edit our shader to change how the engine renders our material type. 

### Render the material at an offset
To start off, let's edit the vertex shader to render our shader ball at an offset.
1. Open `o3de\Gems\Atom\Feature\Common\Assets\Materials\Types\VegetationBending_ForwardPass.azsli`.
   > Remember that `.azsli` files contain shader code. This file contains the vertex and pixel shader code for the *forward pass* of the vegetation bending material type.
2. Find the function `VegetationBending_ForwardPassVS`.
3. At the end of the function, right before `return OUT;`, add: 
   ```
   OUT.m_position.x += 5;
   ```
   > This will adjust the position in the positive x direction by 5 units. You may wonder why we are editing `m_position` instead of `m_worldPosition`; `m_position` is the position of this vertex relative to the origin of the material, whereas `m_worldPosition` is the position of this vertex relative to the origin of the level (or world). Try out editing the other dimensions and `m_position` and `m_worldPosition` and see what they do!
4. Make sure the **Editor** is open, if it is not already open.
5. Save your file with **CTRL-S** and the **Asset Processor** should automatically detect changes and process the file. You can open the **Asset Processor** and check when the file is done processing. 
   > Note: If you can't find the **Asset Processor**, click the arrow on the bottom right of your taskbar, and then click on the icon of two arrows in a circle.
6. Once the **Asset Processor** is done processing the changes, you should see in the **Editor** that your material looks different!

{{< image-width src="/images/atom-guide/vegetation-bending-tutorial/offset.png" width="100%" alt="Forward pass offset." >}}

The main texture of our shader ball seems to be showing up at an offset as we intended, but a grey outline is still at the origin of the object. This is because we only edited the forward pass, but have yet to edit the *depth pass*. All the passes we go through are referenced in `VegetationBending.materialtype`.
> More information about passes can be found [here](https://www.o3de.org/docs/atom-guide/dev-guide/passes/), but keep in mind that different passes render different parts of the material, and some passes' outputs are used as inputs to other passes.

Let's repeat the above steps but with the depth pass:
1. Open `o3de\Gems\Atom\Feature\Common\Assets\Materials\Types\VegetationBending_DepthPass.azsli`.
   > Make sure you are not editing the `VegetationBending_DepthPass_WithPS.azsli` file.
2. Find the function `DepthPassVS`.
3. At the end of the function, right before `return OUT;`, add: 
   ```
   OUT.m_position.x += 5;
   ```
4. Save your file and check our the **Editor**. The shader ball should now be completely rendered at an offset! 
   > Note that the shadow is still in the original position. After finishing this tutorial, see if you can adjust the shadow yourself!

{{< image-width src="/images/atom-guide/vegetation-bending-tutorial/fulloffset.png" width="100%" alt="Completed offset added." >}}

### Add material property parameters
For now, we have just been moving the ball an offset of `5` units. However, we may want an easy way to change the offset in the **Editor** instead of having to change the code. We can do this with adjustable parameters in the **Material Editor**.

1. Open `o3de\Gems\Atom\Feature\Common\Assets\Materials\Types\MaterialInputs\VegetationBendingPropertyGroup.json`.
2. Under `properties`, you'll see that there is already a property, `xOffset`, written there for you. Following `xOffset` as a guide, add another property `yOffset`. The code should end up looking something like this:
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
3. Open `o3de\Gems\Atom\Feature\Common\Assets\Materials\Types\VegetationBending_Common.azsli`.
   > This file is included in every pass of the vegetation bending material type. There are many included files to other *shader resource groups* (SRGs) and other functions in this file that are necessary for all passes.
4. Look for `ShaderResourceGroup MaterialSRG : SRG_PerMaterial`. 
5. Here, we will initialize the variables that we reference as the *connection name* in `VegetationBendingPropertyGroup.json`, which should be `m_xOffset` and `m_yOffset`. So, in `MaterialSRG`, add 
   ```
   float m_xOffset;
   float m_yOffset;
   ```
6. Now, we need to include the properties in the `.materialtype` file. Open `VegetationBending.materialtype`, and take a look at the list of `propertyLayout` > `propertyGroups`. These are all editable properties for a material in the **Material Editor**. 
   > If you look at the **Material Editor** and open a material of type VegetationBending, you can see that the adjustments to the material you can make on the right follow the properties described in all of these `.json` files.
7. Add a property group entry at the bottom for vegetation bending. Add:
   ```
   {
      "$import": "MaterialInputs/VegetationBendingPropertyGroup.json"
   }
   ```

Great, now we have parameters, but let's actually use the parameters in the code and view them.
1. Open `o3de\Gems\Atom\Feature\Common\Assets\Materials\Types\VegetationBending_ForwardPass.azsli`. 
2. We can reference the x offset parameter by using `MaterialSrg::m_xOffset`. So, where you previously put `OUT.m_position.x += 5`, replace it and add the y offset: 
   ```
   OUT.m_position.x += MaterialSrg::m_xOffset;
   OUT.m_position.y += MaterialSrg::m_yOffset;
   ```
   > Remember that we added the parameters into the material shader resource group, so that's how we can reference them with MaterialSrg.
3. Repeat with the depth pass.
4. Save your files and open the **Material Editor**.
5. Select the material you made with the VegetationBending material type previously (`my_material`), and scroll down on the right to find **Vegetation Bending**. Adjust the x and y offsets as you see fit!
6. Save and return to the **Editor**.
7. Observe how the offset matches your inputs from the **Material Editor**!

{{< image-width src="/images/atom-guide/vegetation-bending-tutorial/parameteroffset.png" width="100%" alt="Parameter offset added." >}}

Congrats! Now you have taken the first step to writing your own custom shaders.

## Prepare to add vegetation bending
Now that we've edited our vertex shader, let's take the next step and prepare to add vegetation bending by adding an appropriate model.

### Add a tree
In order to test the code that we are about to write, we need an appropriate mesh!

1. Download `tree.fbx` from here.
2. Place `tree.fbx` in `{your_project_path}\Assets`.
3. Open the **Editor** to your project and level. 
4. On the left in the **Entity Outliner**, **right-click** and select **Create entity**. **Right-click** the new entity in the **Entity Outliner**, and rename the entity to `Tree`.
5. On the right, in the **Entity Inspector** click **Add Component** and select **Mesh**.
6. In the mesh component, click the file icon next to **Model Asset** select `tree.fbx` in your project's `Assets` folder.
7. Again in the mesh component, click **Add Material Component**, click the file icon next to *Default Material* and select your material that you made earlier (`my_material`).

Now, we have a tree (at an offset)! This tree is important because it uses vertex colors that we will be using to determine how the tree should bend.
> Note on vertex colors: You can use a DCC tool to color the vertices to match the type of bending you want to do on each part of the tree: 
> - Red vertex color: smaller movement with high frequency of random sinusoidal noise.
> - Green vertex color: delays the start of the movement for variations with high frequency of random sinusoidal noise.
> - Blue vertex color: larger movement and bending with low frequency of sinusoidal noise. 
> 
> In the case of our tree, the trunk's vertices are colored blue and leaves are colored red.

### Add a shader option
Our tree mesh that we just added has colored vertices; however, not every mesh that you want to use your material type on may have colored vertices. Therefore, we want to add a [*shader option*](https://www.o3de.org/docs/atom-guide/dev-guide/shaders/azsl/#shader-variant-options) that allows the vertex shader to handle both of these cases. We also want to add the reference to the colors so we can use them in the code.

1. Open `o3de\Gems\Atom\Feature\Common\Assets\Materials\Types\VegetationBending_ForwardPass.azsli`.
2. Near the top of the file, before `struct VSInput`, add 
   ```
   option bool o_color_isBound;
   ```
3. Inside `struct VSInput`, add another field:
   ```
   float4 m_optional_color : COLOR0;
   ```
   > If the material's vertices are colored, `m_optional_color` will be set at runtime if it's available. Then, if `m_optional_color` is available, a soft naming convention will set `o_color_isBound` to true, which we can use later to determine if we want to perform the bending or not.
   > 
   > All of the fields are indicated by [HLSL semantics](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics#vertex-shader-semantics). The engine processes the semantics and updates the fields accordingly.
4. Inside the function `VegetationBending_ForwardPassVS`, encase the offset code with a conditional using the option boolean:
   ```
   if (o_color_isBound) {
      OUT.m_position.x += MaterialSrg::m_xOffset;
      OUT.m_position.y += MaterialSrg::m_yOffset;
   }
   ```
5. Repeat with the depth pass in `o3de\Gems\Atom\Feature\Common\Assets\Materials\Types\VegetationBending_DepthPass.azsli`.
6. Save both files and open your level in the **Editor** from the previous steps. You should see that the tree entity is offset, but the shader ball is not!

{{< image-width src="/images/atom-guide/vegetation-bending-tutorial/optionoffset.png" width="100%" alt="Option offset added." >}}

### Delete previous offset code
Now that we have our tree and tested the shader options, let's delete the previous offset code so that we can start fresh with vegetation bending. That is, delete the following:
- The code added to adjust the position in the vertex shaders of both the forward pass and depth pass
- The `m_xOffset` and `m_yOffset` variable declarations in the `VegetationBending_Common.azsli` file in the `MaterialSrg`
- The `xOffset` and `yOffset` properties in the `.json` file, but keep the rest of the file and its connection in `VegetationBending.materialtype`; we will need it for later!

### Create materials for the tree
Let's add some textures to make our tree look more realistic! For the tree, we need 3 materials: one for the trunk, one for the branches, and one for the leaves.

1. Download the 3 textures from here.
2. Place the textures in `{your_project_path}/Assets`.
3. Open the **Editor**, and then the **Material Editor** by hitting **M**.
4. Choose **File** > **New** and, in the pop-up, choose **VegetationBending**, name the material `aspen_leaf.material`, and save it in the same place.
5. On the right side in the **Inspector**, find **Base Color** and click on the file icon next to *Texture*. Choose `aspen_leaf_basecolora.tif`.
   > The suffix `_basecolora` tells the engine to process the texture with a specific [*preset*](https://www.o3de.org/docs/user-guide/assets/texture-settings/texture-presets/). Appending a suffix to the name of a texture tells the engine to use the corresponding preset.
6. Find **Opacity** and, for **Opacity Mode**, select `Cutout`. We need to set this to `Cutout` because the leaf texture has transparent parts.
7. Under **General Settings**, enable **Double-sided**. This renders both sides of meshes.
6. Save your leaf material. Now, we need to repeat with the branch and the trunk. Instead of making whole new materials, we can make the leaf material the parent of the branch and trunk materials so the properties stay constant for all 3.
   1. In the **Asset Browser**, **right-click** `aspen_leaf.material`. Select **Create Child Material...** and save it in the same `Assets` folder as `aspen_bark_01.material`. Find **Base Color** in the **Inspector** and choose `aspen_bark_01.tif`.
   2. In the **Asset Browser**, **right-click** `aspen_leaf.material`. Select **Create Child Material...** and save it in the same `Assets` folder as `aspen_bark_02.material`. Find **Base Color** in the **Inspector** and choose `aspen_bark_02.tif`.
   > Notice how the other properties are the same as the leaf's! If you edit the parent material's properties after creating these children material, it will automatically update the children materials' property values.
7. Save all 3 materials and exit the **Material Editor**. In the **Editor**, click on the tree entity (`Tree`).
8. In the **Entity Inspector** on the right, find the **Material** component. Click the **X** to delete the **Default Material**. Under **Model Materials** > **AM_Aspen_Bark_01**, select `aspen_bark_01.material`. For **AM_Aspen_Bark_02**, select `aspen_bark_02.material`. For **AM_Aspen_Leaf**, select `aspen_leaf.material`.

ADD IMAGE (greytree.png)

{{< image-width src="/images/atom-guide/vegetation-bending-tutorial/greytree.png" width="100%" alt="Tree added." >}}

Great, the tree looks better! However, notice that there are still grey areas around the leaves -- look familiar? Recall that there was a grey area when we edited the forward pass, but not the depth pass. We need to add more passes! 

### Add depth pass and shadowmap pass with pixel shaders
The depth pass that we use right now is for opaque objects. It doesn't use a pixel shader, so the depth pass doesn't know which pixels are supposed to be transparent, even though we already specified that our materials have `Cutout` opacity. So, we need to use a depth pass with a pixel shader (PS)! We also need a shadowmap pass with a pixel shader for the tree's shadow to appear correctly as well.

1. There were also template files included for `DepthPass_WithPS` and `Shadowmap_WithPS`. These files don't need to be edited for now, but we need to add connections to them to ensure our material type will use these ones. They already include the shader option we just added.
2. Open `VegetationBending.materialtype`.
3. Find `shaders`, a list of the `.shader` files that our material type can use. Notice that each shader file is referenced with a tag. The tag allows us to reference the shader easily.
4. Under the shader with `"tag": "Shadowmap"`,  add a new entry for our shadow map with PS:
   ```json
   {
      "file": "./VegetationBending_Shadowmap_WithPS.shader",
      "tag": "Shadowmap_WithPS"
   },
   ```
5. Similarly, under the shader with `"tag": "DepthPass"`,  add a new entry for our depth map with PS:
   ```json
   {
      "file": "./VegetationBending_DepthPass_WithPS.shader",
      "tag": "DepthPass_WithPS"
   }
   ```
6. Save the file.
   
Now, we've added the appropriate shaders to the list of shaders for our material type. However, you may notice that just adding to the list of shaders doesn't change our tree. We need to give the engine instructions for which shader to use for different materials. This is where `.lua` files come in. 

1. Open `VegetationBending_ShaderEnable.lua`.
2. Look through the file, and observe how it takes some properties' values and enable and disable specific shaders accordingly. There is no need to edit anything in the `.lua` file for now.
3. Open `VegetationBending.materialtype`.
4. We need to include the `.lua` file so the engine can process it and determine which shaders to use. After the list for `"shaders"` and before `"uvNameMap"`, add:
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
5. Save the file, allow the **Asset Processor** to process the changes, and open the **Editor** again. Observe how the tree now looks pretty realistic! 

{{< image-width src="/images/atom-guide/vegetation-bending-tutorial/treeallpasses.png" width="100%" alt="All tree passes added." >}}

## Add vegetation bending
Great, now we can start adding the code for vegetation bending! We first need to set up the wind constants. Then, we will determine the detail bending, which is the slight movement that you generally see in leaves and at the end of branches. Finally, we will add main bending, which is the overall swaying of the tree.

### Add vegetation bending parameters
We need several parameters to determine how we want our materials to bend:
- DetailBendFrequency - The frequency of the detail bending.
- DetailBendLeafAmplitude - The amplitude in which leaves can bend.
- DetailBendBranchAmplitude - The amplitude in which branches can bend.
- WindX -The amount of wind in the x direction.
- WindY - The amount of wind in the y direction.
- WindBendingStrength - The amount in which the vegetation bends as a result of the wind.

The "DetailBend" parameters are specfically used for detail bending, but the "Wind" parameters are used for all parts of the bending.

1. Open `o3de\Gems\Atom\Feature\Common\Assets\Materials\Types\MaterialInputs\VegetationBendingPropertyGroup.json`.
2. Delete the `xOffset` and `yOffset` properties that we added previously if you haven't already, and add these six:
   ```json
   {
      "name": "DetailBendFrequency",
      "displayName": "Detail bend frequency",
      "description": "Detail bend frequency.",
      "type": "Float",
      "defaultValue": 0.0,
      "min": 0.0,
      "max": 1.0,
      "connection": {
        "type": "ShaderInput",
        "name": "m_detailFreq"
      }
    },
    {
      "name": "DetailBendLeafAmplitude",
      "displayName": "Detail bend leaf amplitude",
      "description": "Detail bend leaf amplitude.",
      "type": "Float",
      "defaultValue": 0.0,
      "min": 0.0,
      "max": 1.0,
      "connection": {
        "type": "ShaderInput",
        "name": "m_detailLeafAmp"
      }
    },
    {
      "name": "DetailBendBranchAmplitude",
      "displayName": "Detail branch amplitude",
      "description": "Detail branch amplitude.",
      "type": "Float",
      "defaultValue": 0.0,
      "min": 0.0,
      "max": 1.0,
      "connection": {
        "type": "ShaderInput",
        "name": "m_detailBranchAmp"
      }
    },
    {
      "name": "WindX",
      "displayName": "Wind direction x",
      "description": "Wind direction x.",
      "type": "Float",
      "defaultValue": 0.0,
      "min": -1.0,
      "max": 1.0,
      "connection": {
        "type": "ShaderInput",
        "name": "m_windDirX"
      }
    },
    {
      "name": "WindY",
      "displayName": "Wind direction y",
      "description": "Wind direction y.",
      "type": "Float",
      "defaultValue": 0.0,
      "min": -1.0,
      "max": 1.0,
      "connection": {
        "type": "ShaderInput",
        "name": "m_windDirY"
      }
    },
    {
      "name": "WindBendingStrength",
      "displayName": "Bending strength",
      "description": "Bending strength.",
      "type": "Float",
      "defaultValue": 0.0,
      "min": 0.0,
      "max": 7.0,
      "connection": {
        "type": "ShaderInput",
        "name": "m_bendingStrength"
      }
    }
   ```
3. Open `o3de\Gems\Atom\Feature\Common\Assets\Materials\Types\VegetationBending_Common.azsli`.
4. Delete the previous offset variables if you haven't already, and declare the bending property variables in `MaterialSrg`:
   ```
    float m_detailFreq;
    float m_detailLeafAmp;
    float m_detailBranchAmp;
    float m_windDirX;
    float m_windDirY;
    float m_bendingStrength;
    ```
5. Open the **Editor**, then open the **Material Editor**, and choose to edit the leaf material (`aspen_leaf.material`). Make sure you select the leaf material because that is the parent material of the other parts of the tree.
6. On the right in the, scroll down to **Vegetation Bending** and ensure that the 6 properties we just added are there.
7. Adjust the parameters! Make sure you adjust all of them so that you can see bending in the later steps.

### Set up wind bending
Now, let's begin editing the code to add wind. 

1. Open `o3de\Gems\Atom\Feature\Common\Assets\Materials\Types\VegetationBending_Common.azsli`.
   > Because we need to have the bending be done on all passes, we can add the code in the common `.azsli` file to avoid repeat code. The functions we write will be called by the vertex shaders.
2. At the bottom, add the following code:
   ```
   float4 setUpWindBending(float currentTime, float4 worldPosition) {

      float2 wind = float2(MaterialSrg::m_windDirX, MaterialSrg::m_windDirY);
      float bendStr = MaterialSrg::m_bendingStrength;
      float2 amp = float2(wind.x * 0.4 + wind.y * 0.2, wind.y * 0.4 - wind.x * 0.2);
      float2 freq = float2(0.8, 0.8 * 1.125);
      float2 phase = float2(worldPosition.x * 0.08f, worldPosition.y * 0.08f);

      float2 addBending = float2(sin(currentTime * freq.x + phase.x) * amp.x, sin(currentTime * freq.y + phase.y) * amp.y);

      float4 result;
      result.x = addBending.x + wind.x;
      result.y = addBending.y + wind.y;
      result.z = sqrt(wind.x * wind.x + wind.y * wind.y);
      result *= bendStr * 0.08;
      float2 totalBending = addBending + wind;
      result.w = sqrt(totalBending.x * totalBending.x + totalBending.y * totalBending.y) * 0.3f;

      return result;
   }
   ```
   Most of the code just takes the parameters that we enter in and calculates the amplitude, frequency, and phase of the movement according to the time. This is then used to calculate the appropriate movement of the vertex. 
   Note that we also take into account the `worldPosition` for the phase. This is because we want to mimic how wind should affect nearby objects similarly but faraway objects differently. Faraway objects may not be affected by the same "breeze".
   > This function can actually be optimized because it can be ran in the CPU for the material instead of in the GPU for each vertex, but for simplicity we have this here with the other functions.
3. Now, let's call the function in the vertex shaders. Open `o3de\Gems\Atom\Feature\Common\Assets\Materials\Types\VegetationBending_ForwardPass.azsli`.
4. Find the vertex shader (`VegetationBending_ForwardPassVS`). Now, above `OUT.m_worldPosition = worldPosition.xyz`, add the conditional and a call to our wind function:
   ```
   if (o_color_isBound) {
      float currentTime = SceneSrg::m_time;

      // Overall wind
      float4 currentBending = setUpWindBending(currentTime, worldPosition);
   }

   OUT.m_worldPosition = worldPosition.xyz;
   OUT.m_position = mul(ViewSrg::m_viewProjectionMatrix, worldPosition);

   return OUT;
   ```
   In the *scene shader resource group* (`SceneSrg`), there is a parameter `m_time` that gives us the number of seconds since the start of the application. 
   
   We need to move the code to be above the two `OUT` lines because we will edit `worldPosition` and then will need to adjust the `OUT` variables accordingly.
5. Repeat steps 3-4 with the depth pass in `o3de\Gems\Atom\Feature\Common\Assets\Materials\Types\VegetationBending_DepthPass.azsli` and the depth pass with PS in `o3de\Gems\Atom\Feature\Common\Assets\Materials\Types\VegetationBending_DepthPass_WithPS.azsli`.
   > Note that the depth pass does not output a world position. Just place the code above the `OUT.m_position` line. The depth pass with PS has some extra code in the vertex shader, but you can still place this code about the two `OUT` statements.

Great, now we have our wind bending set up! Note that this doesn't enact any changes on our tree just yet, and the tree should be rendered as normal.

### Add detail bending
Using the wind bending constants that we just calculated, we can now determine the bending of the leaves.

1. Open `o3de\Gems\Atom\Feature\Common\Assets\Materials\Types\VegetationBending_Common.azsli`.
2. At the bottom, add the following code:
   ```
   float3 detailBending(float3 position, float3 normal, float4 color, float currentTime, float4 worldPosition, float bendLength) {
      // The information from the vertex colors about how to bend this vertex.
      float edgeInfo = color.x;
      float branchPhase = color.y;
      float branchBendAmount = color.z;

      // Phases (object, vertex, branch)
      float objPhase = (dot(worldPosition.xyz, 2)); 
      branchPhase += objPhase;
      float vtxPhase = (dot(position, branchPhase)); 

      // Detail bending for leaves
      // x: is used for leaves, y is used for branch
      float2 wavesIn = currentTime;
      wavesIn += float2(vtxPhase, branchPhase);
      float4 waves = (frac(wavesIn.xxyy * float4(1.975, 0.793, 0.375,  0.193)) * 2.0 - 1.0) * MaterialSrg::m_detailFreq * bendLength;
      waves = abs(frac(waves + 0.5) * 2.0 - 1.0);

      // x: is used for leaves, y is used for branches
      float2 wavesSum = ((waves.xz + waves.yw));

      // Leaf and branch bending (xy is used for leaves, z for branches)
      return position + (wavesSum.xxy * float3(edgeInfo * MaterialSrg::m_detailLeafAmp * normal.xy, branchBendAmount * MaterialSrg::m_detailBranchAmp));
   }
   ```
3. Call the detail bending function in the vertex shaders. Open `o3de\Gems\Atom\Feature\Common\Assets\Materials\Types\VegetationBending_ForwardPass.azsli`.
4. Find the vertex shader (`VegetationBending_ForwardPassVS`) and add a call to our detail bending function under the wind function call:
   ```
   if (o_color_isBound) {
      float currentTime = SceneSrg::m_time;

      // Overall wind
      float4 currentBending = setUpWindBending(currentTime, worldPosition);

      // Detail bending
      float3 currentOutPosition = detailBending(IN.m_position, IN.m_normal, IN.m_optional_color, currentTime, worldPosition, currentBending.w);
   }
   ```
   Note that we're using the optional color parameter. Remember that we should only use it when it's available, which we know it is since we have the conditional.
   
   Also note that `currentBending.w` is passed in to the detail bending function. This is the overall bending length we want according to the wind strength and direction. 
5. Now, we need to set the actual vertex shader outputs to use the output from the detail bending function. We need to set the world position so the code following the conditional can update the positions correctly. 
   ```
   if (o_color_isBound) {
      float currentTime = SceneSrg::m_time;

      // Overall wind
      float4 currentBending = setUpWindBending(currentTime, worldPosition);

      // Detail bending
      float3 currentOutPosition = detailBending(IN.m_position, IN.m_normal, IN.m_optional_color, currentTime, worldPosition, currentBending.w);

      worldPosition = mul(objectToWorld, float4(currentOutPosition, 1.0));
   }

   OUT.m_worldPosition = worldPosition.xyz;
   OUT.m_position = mul(ViewSrg::m_viewProjectionMatrix, worldPosition);
   ```
6. Repeat steps 3-4 with the depth pass in `o3de\Gems\Atom\Feature\Common\Assets\Materials\Types\VegetationBending_DepthPass.azsli` and the depth pass with PS in `o3de\Gems\Atom\Feature\Common\Assets\Materials\Types\VegetationBending_DepthPass_WithPS.azsli`. Note that in the depth pass you still need to update `worldPosition`, even if there is no `OUT.m_worldPosition`.
7. Open the **Editor** and you should see your tree's leaves bending slightly. If you don't, try opening the **Material Editor** and increasing all the parameters. 

{{< video src="/images/atom-guide/vegetation-bending-tutorial/detailbending.mp4" autoplay="true" loop="true" width="100%" info="Video of tree detail bending." >}}

### Add main bending
The leaves are moving now, but the tree doesn't sway yet. We will now add main bending, the overall sway and movement that the whole tree experiences.

1. Open `o3de\Gems\Atom\Feature\Common\Assets\Materials\Types\VegetationBending_Common.azsli`.
2. At the bottom, add the following code:
   ```
   float3 mainBending(float3 position, float4 bending) {
      float bendFactor = position.z * bending.z;
      bendFactor *= bendFactor; 

      float len = length(position); 

      float3 newPos = position;
      newPos.xy += float2(bending.x, bending.y) * bendFactor;

      return normalize(newPos) * len;
   }
   ```
   Using the current position of the vertex (after it has been changed from the detail bending) and the bending determined by the wind, we can bend the tree as a whole.
3. Call the detail bending function in the vertex shaders. Open `o3de\Gems\Atom\Feature\Common\Assets\Materials\Types\VegetationBending_ForwardPass.azsli`.
4. Find the vertex shader (`VegetationBending_ForwardPassVS`) and add a call to our detail bending function under the wind function call:
   ```
   if (o_color_isBound) {
      float currentTime = SceneSrg::m_time;

      // Overall wind
      float4 currentBending = setUpWindBending(currentTime, worldPosition);

      // Detail bending
      float3 currentOutPosition = detailBending(IN.m_position, IN.m_normal, IN.m_optional_color, currentTime, worldPosition, currentBending.w);

      currentOutPosition = mainBending(currentOutPosition, currentBending);

      worldPosition = mul(objectToWorld, float4(currentOutPosition, 1.0));
   }
   ```
5. Repeat steps 3-4 with the depth pass in `o3de\Gems\Atom\Feature\Common\Assets\Materials\Types\VegetationBending_DepthPass.azsli` and the depth pass with PS in `o3de\Gems\Atom\Feature\Common\Assets\Materials\Types\VegetationBending_DepthPass_WithPS.azsli`.
6. Open the **Editor** and you should see your tree swaying with the leaves still bending. If you don't, try opening the **Material Editor** and increasing the wind parameters.

Amazing, our tree now sways and reacts to wind! Try to place multiple trees and observe how the trees sway differently when close together versus farther away. Also, add some lighting to make the trees pop!

{{< video src="/images/atom-guide/vegetation-bending-tutorial/tree.mp4" autoplay="true" loop="true" width="100%" info="Video of trees swaying." >}}

### Add motion vectors
Because our tree is moving, we can add a *motion vector pass* so we can choose to add motion blur or other effects in the future.

If you take a look at the `MeshMotionVectorVegetationBending.azsli` file, you can see that the vertex shader looks similar to the other vertex shaders we have seen, but there's a new output `OUT.m_worldPosPrev`. This is the position of the vector in the last time frame. The pixel shader uses both the previous vector position and the current one to calculate the motion vector. 

However, we don't have an vertex shader input that gives us the previous position. Therefore, in the vertex shader, we want to calculate the bending for not only the current time as we have been, but also for the previous time frame.

1. Download the three files in the `MeshMotionVectorVegetationBending` folder and move it to `o3de\Gems\Atom\Feature\Common\Assets\Materials\Types`.
2. The `MeshMotionVectorVegetationBending` files already contain all the previous steps that we have done, like adding the shader option and calling the bending functions. 
2. Open `VegetationBending.materialtype`. Add the bottom of the `shaders` list, add the motion vector pass:
   ```
   {
      "file": "./MeshMotionVectorVegetationBending.shader",
      "tag": "MeshMotionVector"
   }
   ```
3. Remember the `.lua` files and how we could enable/disable shaders? Let's ensure our motion vector shader is enabled. Open `VegetationBending_ShaderEnable.lua`.
4. At the bottom of the `Process` fuunction, outside of any conditionals, enable the motion vector shader:
   ```
   local motionPass = context:GetShaderByTag("MeshMotionVector")
   motionPass:SetEnabled(true)
   ```

Great, now we have included the motion vector shader, so we have to go in and edit the vertex shader. Before that, however, we need to have a way to get the previous frame's time to use in our bending calculations. The `SceneSrg` has the current frame's time (`m_time`), but it doesn't contain the previous frame's time. Let's add the previous time in the `SceneSrg`.

1. Open `Gems/Atom/RPI/Assets/ShaderLib/Atom/RPI/ShaderResourceGroups/DefaultSceneSrg.azsli`. This is where the `m_time` variable is declared.
2. Declare the previous time by adding `m_prevTime`:
   ```
   partial ShaderResourceGroup SceneSrg
   {
      float m_time; // number of seconds since the application started
      float m_prevTime; // previous frame's time
   }
   ```
   This allows us to use `m_prevTime` with the `SceneSrg`, but we need to actually set and update the `m_prevTime` value.
3. Open `Gems/Atom/RPI/Code/Include/Atom/RPI.Public/Scene.h`. In the `Scene` class under the `private` instance fields, find the declaration for `m_simulationTime`. This is the variable that the engine uses to  HAJWEEJ. Similarly, add the previous simulation time declarations:
   ```c++
   RHI::ShaderInputConstantIndex m_timeInputIndex;
   float m_simulationTime;
   RHI::ShaderInputConstantIndex m_prevTimeInputIndex;
   float m_prevSimulationTime;
   ```
4. Open `Gems/Atom/RPI/Code/Source/RPI.Public/Scene.cpp`. There are a few places we need to add code to to update the previous time.
   1. In `Scene::CreateScene()`, define `m_prevTimeInputIndex` that we just declared in the `.h` file: 
      ```c++
      scene->m_timeInputIndex = scene->m_srg->FindShaderInputConstantIndex(Name{ "m_time" });
      scene->m_prevTimeInputIndex= scene->m_srg->FindShaderInputConstantIndex(Name{ "m_prevTime" });
      ```
      This gives us the reference to the `SceneSrg`'s `m_prevTime` field that we need to update.
   2. In `Scene::Simulate()`, right before `m_simulationTime` is updated, set `m_prevSimulationTime` to `m_simulationTime`, which as this point should be the previous frame's time:
      ```
      m_prevSimulationTime = m_simulationTime;
      m_simulationTime = simulationTime;
      ```
   3. In `Scene::PrepareSceneSrg()`, set the value of `SceneSrg`'s `m_prevTime` using the index:
      ```c++
      if (m_timeInputIndex.IsValid())
      {
         m_srg->SetConstant(m_timeInputIndex, m_simulationTime);
      }

      if (m_prevTimeInputIndex.IsValid()) {
         m_srg->SetConstant(m_prevTimeInputIndex, m_prevSimulationTime);
      }
      ```

Now that we have the previous time set up, we can actually use it in the vertex shader for our motion vector shader.

1. Open `MeshMotionVectorVegetationBending.azsli`.
2. We want to perform bending on the vertex at the `IN.m_position` but at the previous frame time, with the previous world position. Edit the code inside the `o_color_isBound` conditional to do the exact same as we did before, but with the appropriate time the world position:
   ```
   if (o_color_isBound) {
      float currentTime = SceneSrg::m_time;
      float prevTime = SceneSrg::m_prevTime;

      // Overall wind
      float4 currentBending = setUpWindBending(currentTime, worldPosition);
      float4 prevBending = setUpWindBending(prevTime, prevWorldPosition);

      // Detail bending
      float3 currentOutPosition = detailBending(IN.m_position, IN.m_normal, IN.m_optional_color, currentTime, worldPosition, currentBending.w);
      float3 prevOutPosition = detailBending(IN.m_position, IN.m_normal, IN.m_optional_color, prevTime, prevWorldPosition, prevBending.w);

      // Main bending
      OUT.m_position.xyz = mainBending(currentOutPosition, currentBending);
      float3 prevPosition = mainBending(prevOutPosition, prevBending);

      worldPosition = mul(objectToWorld, float4(OUT.m_position.xyz, 1.0));
      prevWorldPosition = mul(prevObjectToWorld, float4(prevPosition, 1.0));
   }
   ```
3. Take a look at the pixel shader to see how the motion vector is calculated! There is no need to edit the pixel shader.

Amazing, we have added everything we need to add for motion vectors! However, if you open the **Editor** and just view the tree, you'll see that there is no difference. We can, however, observe that the motion vector pass works by using [**ImGui**](https://www.o3de.org/docs/user-guide/interactivity/physics/debugging/#debugging-with-the-imgui-tool).
1. Open the **Editor** and press **CTRL-G** to enter gameplay mode.
2. Press the **Home** key on your keyboard. This brings up the toolbar at the top.
3. Select **Atom Tools** > **Pass Viewer**.
4. In the pop-up **PassTree View**, enable **Preview Attachment** and **Show Pass Attachments**.
5. In the **PassTree**, find *MotionVectorPass* > *MeshMotionVectorPass* and select the line with `CameraMotion`. 
6. Look at your tree, and you should see the motion vectors, with the colors denoting the direction!

{{< video src="/images/atom-guide/vegetation-bending-tutorial/motionvector.mp4" autoplay="true" loop="true" width="100%" info="Video of tree motion vector." >}}

This tool is also helpful with debugging shaders and passes, so you can see the output of certain steps of different passes when you select them in the **PassTree**.

Congratulations! You are now done with this tutorial.
