# Working with Textures<a name="mat-texture-intro"></a>

Textures can be used to provide color, depth, and details to a surface\. For example, a repeating brick\-and\-mortar texture can be used to simulate a brick wall, rather than creating geometry for each individual brick\. 

A texture is an image file that consists of a number of pixels, called texels, each occupying a coordinate determined by the width and height of the texture\. These coordinates are then mapped into values ranging from 0 to 1 along a U \(width\) and V \(height\) axis\. This process produces a 2D texture map that is stored in a `.DDS` file\. 

In turn, the process of mapping the UV coordinates of a texture map to the corresponding UV coordinates at the vertices on a 3D object is called UV mapping\. This in effect wraps the 2D texture onto the 3D object\. 

Textures are dictated by, and applied by, the shader that is selected for a material\. There can be multiple textures applied by the shader for a material\. 

Textures used in Lumberyard are usually created with Adobe Photoshop or other DCC tool\. 

**Topics**
+ [Texture Map Types](mat-texture-types.md)
+ [Texture Settings Editor](texture-settings-editor.md)
+ [Texture Best Practices](mat-texture-best-practices.md)
+ [Working with Diffuse Maps](mat-maps-diffuse.md)
+ [Working with Normal Maps](mat-maps-normal-intro.md)
+ [Working with Gloss Maps](mat-maps-gloss.md)
+ [Working with Detail Maps](mat-maps-detail-intro.md)
+ [Working with Decals](mat-maps-decal-intro.md)
+ [Displacement Maps and Tessellation](mat-maps-displacement-intro.md)