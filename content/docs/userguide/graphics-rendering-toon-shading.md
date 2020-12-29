# Toon Shading \(Experimental Feature\)<a name="graphics-rendering-toon-shading"></a>

Toon shading is a feature with which you can simulate cartoon effects for your game\. Instead of using a shade gradient, toon shading uses less shading color to make 3D graphics appear flat\. You can use toon shading to create a comic book or cartoon style for your game\. Lumberyard's toon shading feature projects the scene luminance into a lookup table, which controls the smoothness of shading on the surface to achieve the intended look\.

As a best practice for toon shading, use clear textures with fewer patterns when designing game art\. Also, create models with fewer features at a lower level of detail \(LOD\)\. Otherwise, your models can have darker meshes in the distance due to their feature lines\. For example, if you have a high density of polygons for vegetation, the vegetation can appear too dark or have too many black lines\.

To enable toon shading, use the console to specify the console variable \(CVAR\): `r_AlphaBlendLayerCount`\.

Valid values: 0 – 1

For more information, see [Configuring Console Variables](console-intro.md#configuring-console-variables-cvars)\.

The following example level does not have toon shading enabled \(`r_AlphaBlendLayerCount=0`\)\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/graphics-rendering-toon-shading-02.png)

The following example level has toon shading enabled \(`r_AlphaBlendLayerCount=1`\)\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/graphics-rendering-toon-shading-01.png)

See additional examples of toon shading enabled:

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/graphics-rendering-toon-shading-03.gif)

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/graphics-rendering-toon-shading-04.gif)