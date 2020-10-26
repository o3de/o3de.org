# Illum Shader<a name="shader-ref-illum"></a>

The Illum shader is the most commonly used shader\. You can use this shader to create a variety of effects\.

## Shader Parameters<a name="shader-ref-illum-shader-parameters"></a>

**Blend Factor**  
Controls the visibility of the blended layer\.  
To use this parameter, you must enable the **Blendlayer** shader generation parameter\.  
Default value: 8

**Blend Falloff**  
Controls blending falloff\.  
To use this parameter, you must enable the **Blendlayer** shader generation parameter\.  
Default value: 32

**Blend Layer 2 Tiling**  
Controls tiling of the second blend layer\.  
To use this parameter, you must enable the **Blendlayer** shader generation parameter\.  
Default value: 1

**Blend Layer 2\-Diffuse\(Tint\)**  
Controls the diffuse \(tint\) of the second blend layer\.  
To use this parameter, you must enable the **Blendlayer** shader generation parameter\.

**Blend Layer 2\-Smoothness**  
Controls the smoothness of the second blend layer\.  
To use this parameter, you must enable the **Blendlayer** shader generation parameter\.  
Default value: 10

**Blend Layer 2\-Specular**  
Controls specular intensity of the second blend layer\.  
To use this parameter, you must enable the **Blendlayer** shader generation parameter\.  
Default value: 132, 132, 132

**Blend Mask Tiling**  
Controls tiling of the blend mask\.  
To use this parameter, you must enable the **Blendlayer** shader generation parameter\.  
Default value: 1

**Detail bump scale**  
Sets detail bump scale\.  
To use this parameter, you must enable the **Detail mapping** shader generation parameter\.  
Default value: 0\.5

**Detail diffuse scale**  
Sets diffuse detail blend scale\.  
To use this parameter, you must enable the **Detail mapping** shader generation parameter\.  
Default value: 0\.5

**Detail gloss scale**  
Sets gloss detail blend scale\.  
To use this parameter, you must enable the **Detail mapping** shader generation parameter\.  
Default value: 0\.5

**Dissolve Color**  
Determines color of the edge if edge thickness is greater than 0  
To use this parameter, you must enable the **Dissolve FX** shader generation parameter\.  
Default value: 255,255,255

**Dissolve Edge Thickness**  
Determines the thickness of a border that is the **Dissolve Color** around the edge of the effect\.  
To use this parameter, you must enable the **Dissolve FX** shader generation parameter\.  
Default value: 0  
Valid values: 0\.000 to 1

**Dissolve Noise Map**  
A grayscale map that defines the dissolve pattern\. Black areas dissolve first; white areas dissolve last\.  
Appears under **Texture Maps** after you enable **Dissolve FX** shader generation parameter\.

**Dissolve Percentage**  
Controls the amount that the texture is dissolved\.  
To use this parameter, you must enable the **Dissolve FX** shader generation parameter\.  
Default value: 0  
Valid values: 0\.000 to 1

**Height bias**  
Controls the height bias\.  
To use this parameter, you must enable the **Parallax occlusion mapping** shader generation parameter\.  
Default value: 0\.5

**Indirect bounce color**  
Adds an extra color tint to the reflection\.  
Default value: 136,136,136

**OBM Displacement**  
Controls the amount of displacement for offset bump mapping \(OBM\)\.  
To use this parameter, you must enable the **Offset bump mapping** shader generation parameter\.  
Default value: 0\.01

**POM Displacement**  
Controls the amount of displacement for parallax occlusion mapping \(POM\)\.  
To use this parameter, you must enable the **Parallax occlusion mapping** shader generation parameter\.  
Default value: 0\.01

**Self shadow strength**  
Allows movable objects, such as interactive objects or game characters, to cast shadows on themselves and each other\. Without self\-shadowing, for example, if a character holds their right arm over the left, the right arm does not cast a shadow on the left arm\.  
To use this parameter, you must enable the **Parallax occlusion mapping** shader generation parameter\.  
Default value: 3

**Roughness maximum footprint**  
Specifies the maximum allowed area of the projected pixel footprint at any point in the scene\.  
To use this parameter, you must enable the **Specular Antialiasing** shader generation parameter\.  
Valid value ranges: 0–10

**SAA Roughness Boost**  
Specifies the degree to which the effect should be applied\.  
To use this parameter, you must enable the **Specular Antialiasing** shader generation parameter\.  
Valid value ranges: 0–10

**SSS Index**  
Controls subsurface scattering profile \(SSS\) and the amount\.  
Valid value ranges: 0\.01–0\.99 for marble; 1\.00–1\.99 for skin\.  
Default value: 1\.2

## Shader Generation Parameters<a name="shader-ref-illum-shader-generation-parameters"></a>

**Detail mapping**  
Enables detail mapping\. This option requires a **Detail** map, which you can select under the **Texture Maps** heading\.

**Use UV set 2 for detail map**  
Enables a second UV channel, if available, for detail map\.

**Offset bump mapping**  
Enables offset bump mapping\. This option requires a heightmap, which you can select for the **Normal Map** option under the **Texture Maps** heading\.

**Dissolve FX**  
Enables dissolve effect\. Selecting this parameter enables the **Dissolve Noise Map** under **Texture Maps**, and three **Shader Parameters**: **Dissolve Color**, **Dissolve Edge Thickness**, and **Dissolve Percentage**\.  
These three parameters work in tandem to determine the dissolve effect\.  
For example, assume your **Dissolve Color** is *white*, **Dissolve Edge Thickness** is *0\.1*, and **Dissolve Percentage** is *0\.5*\. In that case, any area on the surface of the **Dissolve Noise Map** that is less than *0\.5* \(the value set for **Dissolve Percentage**\) is completely transparent\. Areas from *0\.5* to *0\.6*, which is a difference of *0\.1* \(the value set for **Dissolve Edge Thickness**\) are white \(the value set for **Dissolve Color**\)\. Areas from *0\.6* to *1\.0* are unchanged and appear with the original material\.

**Vertex Colors**  
Allows the use of fake ambient occlusion\. Also adds more depth and contrast to the model\.  
You must add vertex colors to the geometry in the DCC tool\.

**Decal**  
Applies a decal appearance when enabled for a material\. Decal planes are normally placed close to other geometry\.  
Use this parameter to prevent flickering and [z\-fighting](ly-glos-chap.md#z_fighting) when faces are close to each other\.

**[Parallax occlusion mapping](mat-maps-parallax-blending.md)**  
Enables parallax occlusion mapping\. This option requires a heightmap, which you can select for the **Normal Map** option under the **Texture Maps** heading\.

**Displacement mapping**  
Enables displacement mapping\. This option requires a heightmap, which you can select for the **Normal Map** option under the **Texture Maps** heading\.

**Phong tessellation**  
Enables the rough approximation of smooth surface subdivision\.

**PN triangles tessellation**  
Enables the rough approximation of smooth surface subdivision\.

**Blendlayer**  
Enables the blending of the normal\-mapped diffuse layer on top of the base material\.

**Use UV set 2 for [blendlayer](mat-maps-blend.md) maps**  
Enables a second UV channel, if available, for blend layer texture maps and blend mask\.

**Use UV set 2 for emittance map**  
Enables a second UV channel, if available, for emittance map\.

**DetailMap mask in Diffuse alpha**  
Enables diffuse map alpha for masking detail maps\. With this option you can use the alpha channel in the RGBA texture map to mask the decal\.

**[Silhouette POM](mat-maps-parallax-spom.md)**  
Enables parallax occlusion mapping with silhouettes\. This option requires a heightmap, which you can select for the **Normal Map** option under the **Texture Maps** heading\.

**Depth Fixup**  
Enables write depth for depth of field and postprocessing\.

**Specular Antialiasing**  
Enables specular antialiasing\. Enable this feature for highly glossy highlights on curved surfaces, which can be challenging to render without specular shimmering and crawling\. This antialiasing feature estimates the subpixel region of the scene over which the specular normal distribution function should be filtered\. The computation of the region is based on the projected size of each pixel\. The normal distribution function \(NDF\) used in the specular bidirectional reflection distribution function \(BRDF\) is then filtered over this region, minimizing shimmering, crawling, and other specular aliasing artifacts\. This method has almost no impact to GPU performance, is temporally stable, and compatible with Lumberyard's deferred shading system\. Normal maps and normal map filtering techniques are compatible with this feature\.

**Occlusion Map**  
Enables support for a single channel occlusion map\. If provided, this map decreases the amount of influence that indirect light has on a surface\. When calculating the occlusion for a given pixel, if the occlusion map occludes more than the dynamically calculated occlusion, then that occlusion map is used instead\. Otherwise it is ignored\.

**Dynamic Lighting for Transparency**  
Transparent materials \(defined as having an alpha less than `100`\) that use this option are rendered using a full lighting pass\. The lighting pass renders the object using a forward pass, forcing the object to be fully lit in any type of light\. This parameter creates a better visual effect, but is also more GPU demanding\.