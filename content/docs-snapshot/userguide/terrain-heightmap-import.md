# Importing a Terrain Heightmap<a name="terrain-heightmap-import"></a>

In order to support full, 32\-bit heightmap resolution, use one of the following file formats when you import a heightmap file\.
+ `.asc`
+ `.bt` \(binary terrain\) – Highest precision
+ `.tif` \(32\-bit\)

The following file formats are supported but not recommended\. These file formats are imported in 16\-bit or 8\-bit resolution\. We recommend using a minimum of 16\-bit resolution for heightmaps, as 8\-bit resolution can cause blocky\-looking terrain\. 
+ `.pgm` \(16\-bit\)
+ `.raw` \(16\-bit\)
+ `.r16` \(16\-bit\)
+ `.png` \(8\-bit\)
+ `.bmp` \(8\-bit\)
+ `.tif` \(8\-bit or 16\-bit\)

Lumberyard Editor supports importing only a single heightmap for the entire terrain\. You can, however, import color or texture data to individual tiles within the terrain\. For information about importing color maps, see [Importing a Megaterrain Texture](terrain-import-color-megaterrain.md)\.

If you attempt to import a file with a different resolution than your existing heightmap, Lumberyard prompts you to do one of the following:
+ Clip your imported file to remove any values that are outside the boundary of your existing heightmap\.
+ Resize your imported file to shrink or stretch to fit the heightmap\. Resizing may introduce artifacts that can cause blocky\-looking terrain\. 

**Note**  
If your heightmap resolution is greater than your level's resolution, you should downsample your heightmap with an external graphics application before you import it into Lumberyard\.  
If, for example, you attempt to import a 4k heightmap into a 2k level, Lumberyard prompts you to clip or resize your heightmap\. This may be sufficient, but using an external graphics application to downsample your heightmap provides superior results\.

**To import a heightmap**

1. In Lumberyard Editor, choose **Game**, **Terrain**, **Edit Terrain**\.

1. In **Terrain Editor**, choose **File**, **Import Heightmap**\.