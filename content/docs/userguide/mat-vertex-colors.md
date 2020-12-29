# Using Vertex Colors<a name="mat-vertex-colors"></a>

Vertex color, or vcolor, is just a color with RGB and alpha channel values stored for each vertex of a mesh\. Vertex color and alpha can be used for multi\-texturing, transparency, or fake ambient occlusion\. 

Vertex color is typically multiplied against the Diffuse color, colorizing or darkening the color map\. 

When used for non\-color effects, typically each color channel is treated as a separate monochrome set of values, so for example vertex color can control three different per\-vertex effects\. 

Vertex Colors is a Shader Generation parameter that can be enabled using the Material Editor, which is part of Lumberyard Editor\. 

For a good application of vertex colors, see [Defining Vegetation Vertex Colors with a DCC Tool](vegetation-bending-detail-intro.md#vegetation-bending-detail-vertex-colors)\.