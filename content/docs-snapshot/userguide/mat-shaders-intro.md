# Shader Rendering System<a name="mat-shaders-intro"></a>

Lumberyard uses physically\-based rendering \(PBR\) shaders that use real\-world physical rules and properties to describe how incoming light interacts with objects\. This means that object materials look more convincing under different lighting conditions\. A basic understanding of how light interacts with objects in the real world can be very helpful when setting up materials\.

Each shader has a unique set of shader parameters \(**Shader Params**\) and generation parameters \(**Shader Generation Params**\)\. Some shader parameters become available \(are visible\) only if an associated shader generation parameter is first enabled\. This is also true for certain texture map slots \(file paths\) under **Texture Maps**\. For a listing of all shaders, see [Shader Reference](shader-ref-intro.md)\. 

There are two categories of materials that are relevant for shader rendering: metals such as like iron, gold, copper, and non\-metals such as plastic, stone, wood, skin, glass\. Each has different diffuse and specular reflectance characteristics\. 

**Shading Metallic Materials** \- Metal reflects all visible light, hence has specular reflectance\. The different types of metal have different specular colors, and should always be above sRGB 180\. Metal has no diffuse reflection and thus has a black diffuse color\. Rusty metal however needs some diffuse color\. 

**Shading Nonmetallic Materials** \- In contrast, non\-metals have diffuse reflection with weak, monochromatic \(gray\) specular reflections\. Most non\-metals reflect only 2%\-5% of the light as specular\. The sRGB color range for most non\-metal materials is between 40 and 60 and should never be above 80\. A good clean diffuse map is required for non\-metals\. 

As the variation is so little, it is often enough to use a constant specular color instead of a specular texture map\. 

**Shading Mixed Metal and Nonmetal Materials** \- Materials that contain both metals and non\-metals require a specular map, as metal has a much brighter specular color than non\-metal\. If a specular map is used, the specular color should be set to white \(255/255/255\) \- as it gets multiplied with the values from the specular map and would otherwise lower the physical values from the map\. 

**To access a shader**

1. In Lumberyard Editor, click **Tools**, **Material Editor**\.

1. In the left tree pane, select a material to work with\.

1. Under **Material Settings**, **Shader**, make a selection\.

1. Locate shader\-specific parameters under **Shader Params** and associated **Shader Generation Params**\.

**Topics**
+ [Image\-Based Lighting](mat-shaders-image-lighting.md)
+ [Environment Probes and Cubemaps](mat-shaders-environment-probes-intro.md)
+ [Height Map Ambient Occlusion](mat-shaders-heightmap_ambient_occlusion.md)
+ [Developing a Custom Shader](mat-shaders-custom-dev-intro.md)