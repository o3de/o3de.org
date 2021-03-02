---
title: "Creating a StandardPBR Material"
description: "This tutorial walks you through how to create a StandardPBR material in Atom."
date: 2021-03-04
toc: false
---

This tutorial walks you through how to create a StandardPBR material in Atom. The StandardPBR material type allows you to create an artist-friendly, full-featured physically based rendering (PBR) material.

This tutorial covers the following concepts:
- The elements of a StandardPBR material
- Creating a material using the Material Editor
- Working with texture files 
- Using texture file masks

## Before starting
A material can have multiple textures, such as base color, normal map, and roughness. These textures contain different data that are combined to create the overall look of the material. You can design the textures for a material using external tools, such as [Substance Designer](https://www.substance3d.com/products/substance-designer/) and [Materialize](http://boundingboxsoftware.com/materialize/). In this tutorial, we use ready-made materials from [Texture Haven](https://texturehaven.com/). 

### Download texture files
Download the [castle brick material](https://texturehaven.com/tex/?t=castle_brick_02_red) in any resolution from Texture Haven. When downloading, make sure to choose **All Maps** to download all textures that make up this material.

After downloading, move and extract the zip file to the folder *\<project-folder\>/Assets/Materials/TextureHaven/*.

We use the following files as our input textures:
-  castle_brick_02_red_ao_1k (ambient occlusion)
-  castle_brick_02_red_diff_1k (diffuse, base color)
-  castle_brick_02_red_disp_1k (displacement)
-  castle_brick_02_red_nor_1k (normal)
-  castle_brick_02_red_rough_1k (roughness)

### Apply a filemask to the texture files
To make sure that these texture files work correctly, you must indicate which texture preset should be used by the Asset Processor to process these files. The easiest way to do this is rename the files to use a texture file mask. A **texture file mask** is the suffix at the end of a file's name that indicates which texture preset to use. This allows the Asset Processor to correctly convert this image type into its runtime format. <!-- [Future work] For more information on texture presets, see -->

There are different variations of texture file masks that can work for a single texture. For example, "_ao" or "_ambientocclusion" are both valid and the Asset Processor knows to process the texture as an ambient occlusion texture. These texture file masks are defined in the preset (`*.preset`) files that configure Atom's Image Processor. The preset files can be found in the folder */dev/Gems/Atom/Asset/ImageProcessingAtom/Config/*. 

We rename the following files to properly apply a filemask. (For the sake of clarity, we use the descriptive texture file mask names.)
- castle_brick_02_red_**ao**\_1k &rarr; castle_brick_02_red\_**ambientocclusion**
- castle_brick_02_red_**diff**\_1k &rarr; castle_brick_02_red\_**basecolor**
- castle_brick_02_red_**disp**\_1k &rarr; castle_brick_02_red\_**displ**
- castle_brick_02_red_**nor**\_1k &rarr; castle_brick_02_red\_**normal**
- castle_brick_02_red_**rough**\_1k &rarr; castle_brick_02_red\_**roughness**
  

## Create material with Material Editor
To create a material using the Material Editor:
1. Open the Material Editor. If you are in the Open 3D Engine Editor, go to *Tools > Material Editor*, or press *M*. Otherwise, you can open the Material Editor as a standalone application by running *MaterialEditor.exe* from the folder *dev/\<build_folder\>/bin/profile/*.
   
2. Create a new StandardPBR material by choosing **File** > **New** > **Standard PBR**. This opens the file browser and prompts you to save the new file. In the **Inspector** tab, you can verify that the material type is `StandardPBR` by checking the `Material Type` property in the `Details` property group. 

    *Note: The file browser looks for materials in the project folder, any Gem's *Assets* folders, or any other folder included in the AssetProcessorPlatformConfig.ini.*

3. Browse and load each texture file into the `Texture Map` property under the texture's associated property group. Depending on the property group, additional properties might appear so you can further configure the property group. 

    The textures are loaded into their associated property group in the following way. 
    
   - **Base Color**: castle_brick_02_red_basecolor
   - **Roughness**: castle_brick_02_red_roughness
   - **Normal**: castle_brick_02_red_normal
   - **Ambient Occlusion**: castle_brick_02_red_ambientocclusion
   - **Parallax Mapping**: castle_brick_02_red_displacement  

    *Note: The downloaded normal map is flipped. To flip it back, enable the `Flip Y Channel` property.*
<!--     [Future work] Add a link here to a page that includes:  more detail about all the settings. Provide tips on determining whether they need to flip X/Y channels of a normal map. For one thing, it's easier to tell if you use a light preset with a strong directional light like the "Goegap" presets -->

You've successfully created a new StandardPBR material! The following figure shows the property settings and the expected material.

<!-- [TODO] @HogJonny-AMZN Will need to update this image with up-to-date Material Editor GUI.  -->

![Creating a StandardPBR material using the Material Editor](/images/atom-guide/architecture/materials/create-standardpbr-material.png)


<!--
## Extra Credit 
Create a high pass texture!  

[WRITER NOTE: TODO. Won't do until after March 9. See wiki: Create a standardpbr material]
-->