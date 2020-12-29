# Resizing a Terrain Heightmap<a name="terrain-heightmap-resize"></a>

Resizing the terrain heightmap involves changing the resolution of your heightmap\. Terrain size is determined by multiplying heightmap by meters per texel\. When resizing, this value should not exceed 4096x4096 meters\. 

Meters per texel is the distance in meters between two vertices on the grid\. So a value of two means there is a grid point every two meters\. You can use larger values to create a larger terrain, but it is less detailed for the same heightmap resolution\.

**To resize a heightmap**

1. In Lumberyard Editor, click **Game**, **Terrain**, **Resize Terrain**\.

1. For **Heightmap Resolution**, select the desired value\.

1. For **Meters Per Texel**, select the desired value\.