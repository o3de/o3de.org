# Changing Terrain Tile Resolution<a name="terrain-texture-tiles-resolution"></a>

A terrain layer can be divided into multiple tiles, each of which can be painted with a resolution between 64x64 and 2048x2048 kilometers\. The higher the resolution, the softer the transition between terrain texture layers\.

If you know a player spends a lot of time in specific areas of the level and thus have more opportunity to view the terrain, you can save resources by increasing the resolution in just those areas\. Follow this two\-step process:

You first subdivide the texture layer, then change the individual tile resolution, as follows:

**To subdivide the terrain texture layer**

1. In Lumberyard Editor, click **Tools**, **Other**, **Terrain Texture Layers**\.

1. Click **File**, **Refine Terrain Texture Tiles**\. The layer is now split into 2x2 \(4\) tiles\.

1. Repeat step 2\. The layer is now divided into 4x4 \(16\) tiles\.

1. Repeat only as needed as there is no way to go back and reduce the number of tiles\.

**To change terrain tile resolution**

1. In Lumberyard Editor, click **Game**, **Terrain**, **Export/Import Megaterrain Texture**\.

1. In **Terrain Texture**, click a tile whose resolution you want to change\. Then click **Change tile resolution**\.  
![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/terrain/terrain-texture-tiles-resolution.png)

1. Choose a new resolution and then click **OK**\. Click **Close**\.