# Importing a Megaterrain Texture<a name="terrain-import-color-megaterrain"></a>

A megaterrain texture, also known as a color map, is a texture that covers part of or the entire terrain\. This texture is visible from a distance and presents sweeping vistas\. As the camera moves closer to the terrain, the megaterrain texture is replaced by more detailed terrain textures\.

Although you can import data for individual tiles, a more common workflow is to use a single megaterrain texture for the entire terrain\. 

**Note**  
Lumberyard doesn't match or fix tile edges\. Ensure that your tile data is authored so that adjacent tile edges match\. Otherwise, your level may render with visible seams\. Lumberyard supports the BMP image file type only for megatexture terrains\.

**To import a megaterrain texture**

1. In Lumberyard Editor, choose **Tools**, **Terrain Editor**\.

1. In the **Terrain Editor**, choose **Tools**, **Export/Import Megaterrain Texture**\.

1. Click and drag to select the tiles that you want\.

1. Click **Import**, select your megaterrain texture file, and then click **Open**\.