# Importing Splat Maps<a name="terrain-splat-maps"></a>

Splat maps are 8\-bit monochrome bitmap `.bmp` files that contain weight information for each vertex in a terrain map\. Splat maps are generated using a DCC tool such as World Machine's Splat Converter\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/terrain/terrain-splat-map-2.png)

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/terrain/terrain-splat-map-1.png)

All splat map operations in Lumberyard are done using the **Terrain Texture Layers** editor\.

**To import splat maps**

1. In Lumberyard Editor, choose **Tools**, **Other**, [**Terrain Texture Layers**](terrain-texture-layers-intro.md)\.

1. In the **Terrain Texture Layers** editor, under **Layer Tasks**, assign each splat map to a texture layer by clicking a layer and then clicking **Assign Splat Map**\.

1. When prompted, select a `.bmp` file\. You don't need to assign a splat map path to a layer, but you can't assign more than one path either\.

1. Under **Layer Tasks**, click **Import Splat Maps**\. This clears the current weight map for the terrain and then rebuilds it using the selected splat maps\.

1. In **Lumberyard Editor**, choose **Game**, **Terrain**, **Generate Terrain Texture**\.

**Note**  
You cannot apply masking to an imported splat map\.