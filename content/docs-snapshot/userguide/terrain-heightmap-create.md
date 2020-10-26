# Creating a Terrain Heightmap<a name="terrain-heightmap-create"></a>

The first step in creating the heightmap using Lumberyard Editor is to specify the resolution and grid spacing, both of which define the terrain size\. Terrain size is determined by multiplying heightmap resolution by meters per texel\. This value should not exceed 4096 x 4096 kilometers\.

Meters per texel is the distance in meters between two vertices on the grid\. So a value of two means there is a grid point every two meters\. You can use larger values to create a larger terrain, but it is less detailed for the same heightmap resolution\.

The following images show a terrain heightmap and the corresponding generated terrain\. 

**Example Terrain Heightmap**  

![\[Create a terrain heightmap in Lumberyard\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/terrain/terrain-heightmap-create.png)

**Example Generated Terrain**  

![\[\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/terrain/terrain-heightmap-create-2.png)

If you want to create the highest quality terrain heightmap for a 2K world, use the following settings:
+ 2K heightmap
+ 2K splatmaps

  As the splat weighting is applied and stored in the terrain mesh, the splatmaps should match the terrain heightmap resolution\.
+ 4K – 16K megaterrain color map

**To create a heightmap using the Terrain Editor**

1. In Lumberyard Editor, click **File**, **New\.**

1. In **New Level**, enter a file name and directory location for the heightmap file\.

1. Select the desired **Heightmap Resolution** and **Meters per Texel** values and click **OK**\.

1. In the editor menu, click **Game**, **Terrain**, **Edit Terrain**\.

1. In Terrain Editor, click **Tools**, **Generate Terrain**\.

1. In **Generation**, adjust the following parameter values as needed\.  
**Feature Size**  
Determines the amount of land created\.  
**Bumpiness/Noise \(Fade\)**  
Determines the degree of bumpiness or deformation of the surface\.  
**Slope Detail \(Passes\)**  
Determines the number of times that effect is applied\.  
**Seed \(Random Base\)**  
Determines the degree of random variation for the heightmap\.  
**Slope Smoothing \(Blur Passes\)**  
Sets the number of times that smoothing is applied to the noise filter\.  
**Cover \(Exp\. Substract\)**    
**Sharpness \(Exp\. Base\)**  
Determines the sharpness of the surface\.  
**Sharpness \(Freq\. Step\)**  
Determines the number of times that the sharpness filter is applied to the surface\.