---
description: ' Apply shaders and materials for objects in &ALYlong;. '
title: Working with shaders and materials
---
# Working with shaders and materials<a name="mat-intro"></a>

There is a close relationship between materials, textures and shaders\. For a material, you select a shader and then specify the material's properties and attributes such as color, specularity, and texture that are used by the shader for rendering the object\. In this way, the shader entirely defines how the object looks\. Lumberyard uses physically\-based rendering \(PBR\) shaders, which use real\-world physical rules and properties to describe how light interacts with the surface of objects\. This means that game object materials look realistic under all lighting conditions\. For more information, see [Shader Rendering System](/docs/userguide/materials/shaders/intro.md)\. 

For computer monitors, the sRGB \(instead of RGB\) color space is used\. Using sRGB, you have greater precision for darker colors to which the human eye is more sensitive\. sRGB also minimizes any banding artifacts\. Always ensure that your monitor is calibrated properly\. In sRGB, a 50% mid\-gray is not 0\.5 or 127 but rather 0\.5 raised by the inverse of gamma 2\.2, which equals 187 in Adobe Photoshop\. For Photoshop, make sure that color management is be set to sRGB and Gray\-to\-Gray Gamma 2\.2\. By default, Gray is often set to Dot Gain 20%, which results in a color transformation in the alpha channel\. A value of 127 comes into Lumberyard as 104 and cause inconsistencies\. 

The Material Editor is the primary tool used to create materials, texture mapping, setting opacity and lighting effects, setting shader parameters, vertex deformations, tessellation, and more, as shown below\. 

![\[Image NOT FOUND\]](/images/userguide/material-editor.png)

**Topics**
+ [Concepts](/docs/userguide/graphics-concepts.md)
+ [Shader Rendering System](/docs/userguide/materials/shaders/intro.md)
+ [Shader Reference](/docs/userguide/shaders/intro.md)
+ [Selecting Material Surface Type](/docs/userguide/materials/surface-types.md)
+ [Setting Material Opacity](/docs/userguide/materials/opacity.md)
+ [Setting Material Lighting and Color Settings](/docs/userguide/materials/color-lighting.md)
+ [Material ID Mapping in Autodesk 3ds Max](/docs/userguide/materials/3dsmax-material-id-mapping.md)
+ [Working with Textures](/docs/userguide/materials/texture-intro.md)
+ [Working with Substances](/docs/userguide/materials/substances.md)
+ [Working with Blend Layers](/docs/userguide/materials/maps/blend.md)
+ [Parallax Mapping](/docs/userguide/materials/maps/parallax-intro.md)
+ [Using Vertex Colors](/docs/userguide/materials/vertex-colors.md)
+ [Customizing Post\-Processing Effects](/docs/userguide/rendering/effect-groups/customizing-intro.md)
+ [Toon Shading \(Experimental Feature\)](/docs/userguide/rendering/toon-shading.md)
+ [Order\-Independent Transparency](/docs/userguide/rendering/order-independent-transparency.md)