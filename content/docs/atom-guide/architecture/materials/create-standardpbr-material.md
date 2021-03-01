# Creating a StandardPBR Material
This tutorial walks you through how to create a StandardPBR material in Atom. The StandardPBR material is an artist-friendly, full-featured PBR material.

This tutorial covers the following concepts:
- The elements of a StandardPBR material
- Creating a material using a Material Editor
- Working with texture files 
- Using filemasks in texture file names

## Before starting
A material can have multiple texture channels, such as basecolor, normal map, and roughness. Texture channels contain different data that can be combined to create the overall look of the material. You can design the texture channels of a material using external tools, such as [Substance Designer](https://www.substance3d.com/products/substance-designer/) and [Materialize](http://boundingboxsoftware.com/materialize/). In this tutorial, we use ready-made materials from [Texture Haven](https://texturehaven.com/). 

### Download texture files
Download the [castle brick material](https://texturehaven.com/tex/?t=castle_brick_02_red) in any resolution from Texture Haven. When downloading, make sure to click "All Maps" to download all texture channels that make up this material.

After downloading, move and extract the zip file to the folder *../Assets/Materials/TextureHaven/*.

We use the following files as our input texture channels:
-  castle_brick_02_red_ao_1k (ambient occlusion)
-  castle_brick_02_red_diff_1k (diffuse, base color)
-  castle_brick_02_red_disp_1k (displacement)
-  castle_brick_02_red_nor_1k (normal)
-  castle_brick_02_red_rough_1k (roughness)

### Apply a filemask to the texture files
To make sure these texture files work with the Material Editor, you must rename the files and apply a filemask. A **filemask** is the suffix at the end of a file's name that indicates its associated texture channel. The filemask allows the Asset Processor to correctly convert this image type into its runtime format. 

We rename the following files to properly apply a filemask:
- castle_brick_02_red_**ao**\_1k &rarr; castle_brick_02_red\_**ambientocclusion**
- castle_brick_02_red_**diff**\_1k &rarr; castle_brick_02_red\_**basecolor**
- castle_brick_02_red_**disp**\_1k &rarr; castle_brick_02_red\_**displacement**
- castle_brick_02_red_**nor**\_1k &rarr; castle_brick_02_red\_**normal**
- castle_brick_02_red_**rough**\_1k &rarr; castle_brick_02_red\_**roughness**
  
*Note: There are different variations of filemask suffixes. These are defined in the preset files (.preset) that configure Atom's Image Processor. The preset files can be found in the folder *../dev/Gems/Atom/Asset/ImageProcessingAtom/*.*


## Create material with Material Editor
To create a material using the Material Editor:
1. Open the Material Editor by running *MaterialEditor.exe* from the folder *../dev/windows_v2019/bin/profile/*.
   
2. Create a new StandardPBR material by clicking *File > New > StandardPBR*. This will open the file browser and prompt you to save the new file. 
<!--    [NOTE FOR DEVS: From which folder does the material Editor look for materials? Like, which materials will appear in the asset folder of the Material Editor?.] -->

1. In the Inspector tab, verify the material type is StandardPBR by checking the `Material Type` property in the `Details` property group. 
   
2. Browse and load each texture file into the `Texture Map` property under the texture's associated property group. Make sure to enable the `Use Texture` property. Depending on the property group, additional properties may appear to further configure the property group. 

    The textures are loaded into their associated property group in the following way. 
    
   - **Base Color**: castle_brick_02_red_basecolor
   - **Roughness**: castle_brick_02_red_roughness
   - **Normal**: castle_brick_02_red_normal
   - **Ambient Occlusion**: castle_brick_02_red_ambientocclusion
   - **Parallax Mapping**: castle_brick_02_red_displacement

    *Note: The downloaded normal map is flipped. To flip it back, enable the `Flip Y Channel` property.*

You've successfully created a new StandardPBR material! The following figure shows the property settings and the expected material.

![Creating a StandardPBR material using the Material Editor](../../../../../static/images/atom-guide/architecture/materials/create-standardpbr-material.svg)


<!--
## Extra Credit 
Create a high pass texture!  

[WRITER NOTE: TODO. Won't do until after March 9. See wiki: Create a standardpbr material]
-->
