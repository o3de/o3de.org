# Concepts<a name="graphics-concepts"></a>

## Materials<a name="graphics-concepts-materials"></a>

A material has a set of properties that determines how its [surface](mat-surface-types.md) reacts to physical actions, other materials, and its environment\. For example, a metal surface is hard, doesn’t shatter, reacts to bullets by generating spark particles, and has a unique sound when struck\. Contrast this with a grass surface, which is soft, responds to wind, generates grass strands and dirt particles when hit, and sounds different than metal\.

Within the definition of a material, you can also change its transparency \([opacity](mat-opacity.md)\) level, [color, specular reflections, glossiness, and glow](mat-color-lighting.md)\. [Textures](#graphics-concepts-textures) and [shaders](mat-shaders-intro.md) are parameters of a material\.

## Textures<a name="graphics-concepts-textures"></a>

A texture is simply a 2D image\. This image file can be a digital photo or other image file created with Photoshop, paint programs, or other applications\.

In Lumberyard, these image files can be imported from `.tif`, `.jpg`, `.png`, `.bmp`, or `.tga` images\. When you browse to select them in the **Material Editor**, for example, they appear with their original file extensions but are actually processed as `.dds` texture files\.

Lumberyard uses textures to help define what the surface of an object looks like\. You can layer textures on top of each other to define different aspects of the material's appearance\. Lumberyard uses the following types of texture maps\. These are the most common types you'll use with the default [Illum](shader-ref-illum.md) shader\.

[Diffuse](mat-maps-diffuse.md)  
Defines the base color of the material\. For example, this could be a detailed image of a marble surface or wood grain\. Defining a diffuse texture is optional; if you need a uniform color, you can instead define a diffuse color or tint\.

[Normal](mat-maps-normal-intro.md)  
Simulates bumps on the surface of the material\. Using a normal map can make a low\-polygon mesh look like it has high\-resolution geometry\. Normal maps do not change the actual geometry of the surface to which it's mapped but only simulate variances in height\. For example, a rock wall with a normal map applied might look like it has holes and projections that respond to light and shadows when the viewer faces it directly\. But when viewed from the side, its silhouette appears as a flat surface\.

Specular  
Defines a surface's shininess and the color of its reflective highlights\. A high value pixel \(for example, white or light colors\) renders a material as more shiny, such as metal details\. A lower value pixel \(for example, black, gray, or other dark colors\) renders a less reflective surface, such as leather\.

[Detail](mat-maps-detail-intro.md)  
Provides additional detail for close\-up viewing\. This map is typically a small image that is tiled many times across a larger surface\. This level of detail would appear only at a close range; from a distance, the object still retains its normal level of detail\. For example, a boulder can gain extra details such as scratches and dents or a porous surface when viewed at close range\. Human skin can appear smooth from a distance but show pores and imperfections when viewed up close\. To use, enable **Detail Mapping** under **Shader Generation Params**\.

[Heightmap](mat-maps-displacement-intro.md)  
Specifies height or elevation in a grayscale image that uses 256 shades\. Black and white represent the lowest and highest elevations, respectively\. High\-quality [32\-bit heightmaps](terrain-heightmap-import.md) are recommended for large terrain areas\. An important difference between heightmaps and normal mapping is that a heightmap changes the actual geometry of the surface to which you apply it\. This is crucial, for example, if you apply a heightmap to a terrain, as objects and players need to respond to the changes in elevation\. In Lumberyard, the heightmap setting in the **Material Editor** can be applied as offset bump map, [POM](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#pom), silhouette POM, and displacement mapping\.

Emittance Multiplier  
Multiplies the emissive color with RGB texture\.

[Decal Opacity](mat-maps-decal-intro.md)  
Alpha mask used for decal entities\. To use, enable **Decal** under **Shader Generation Params**\.

Emittance  
Multiplies the emissive color with RGB texture\. Emissive alpha mask is contained in alpha channel\.

## Shaders<a name="graphics-concepts-shaders"></a>

[Shaders](mat-shaders-intro.md) use real\-world physical rules and properties to describe how incoming light interacts with objects\. This means that object materials look more convincing under different lighting conditions\. The two main types of shaders are metallic and nonmetallic\. Examples of metallic materials include iron, gold, and copper\. Nonmetallic material examples include plastic, stone, wood, skin, and glass\. A shader can also mix metal and nonmetal materials\.