# Working with shaders and materials<a name="mat-intro"></a>

There is a close relationship between materials, textures and shaders\. For a material, you select a shader and then specify the material's properties and attributes such as color, specularity, and texture that are used by the shader for rendering the object\. In this way, the shader entirely defines how the object looks\. Lumberyard uses physically\-based rendering \(PBR\) shaders, which use real\-world physical rules and properties to describe how light interacts with the surface of objects\. This means that game object materials look realistic under all lighting conditions\. For more information, see [Shader Rendering System](mat-shaders-intro.md)\. 

For computer monitors, the sRGB \(instead of RGB\) color space is used\. Using sRGB, you have greater precision for darker colors to which the human eye is more sensitive\. sRGB also minimizes any banding artifacts\. Always ensure that your monitor is calibrated properly\. In sRGB, a 50% mid\-gray is not 0\.5 or 127 but rather 0\.5 raised by the inverse of gamma 2\.2, which equals 187 in Adobe Photoshop\. For Photoshop, make sure that color management is be set to sRGB and Gray\-to\-Gray Gamma 2\.2\. By default, Gray is often set to Dot Gain 20%, which results in a color transformation in the alpha channel\. A value of 127 comes into Lumberyard as 104 and cause inconsistencies\. 

The Material Editor is the primary tool used to create materials, texture mapping, setting opacity and lighting effects, setting shader parameters, vertex deformations, tessellation, and more, as shown below\. 

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/material-editor.png)

**Topics**
+ [Concepts](graphics-concepts.md)
+ [Shader Rendering System](mat-shaders-intro.md)
+ [Shader Reference](shader-ref-intro.md)
+ [Selecting Material Surface Type](mat-surface-types.md)
+ [Setting Material Opacity](mat-opacity.md)
+ [Setting Material Lighting and Color Settings](mat-color-lighting.md)
+ [Material ID Mapping in Autodesk 3ds Max](mat-3dsmax-material-id-mapping.md)
+ [Working with Textures](mat-texture-intro.md)
+ [Working with Substances](mat-substances.md)
+ [Working with Blend Layers](mat-maps-blend.md)
+ [Parallax Mapping](mat-maps-parallax-intro.md)
+ [Using Vertex Colors](mat-vertex-colors.md)
+ [Customizing Post\-Processing Effects](effect-groups-customizing-intro.md)
+ [Toon Shading \(Experimental Feature\)](graphics-rendering-toon-shading.md)
+ [Order\-Independent Transparency](graphics-rendering-order-independent-transparency.md)