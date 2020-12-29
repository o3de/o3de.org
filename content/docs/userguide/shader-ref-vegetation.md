# Vegetation Shader<a name="shader-ref-vegetation"></a>

The Vegetation shader is used to render trees, bushes, grass and other vegetation, as well as imparting various bending motion effects\.

See the following guidelines for best results and performance with this shader:
+ Use an **AlphaTest** value of `50` for opacity\.
+ Use a **Diffuse** color value of `128,128,128` for lighting\.

## Shader Parameters<a name="shader-ref-vegetation-shader-parameters"></a>

**Bending branch amplitude**  
Defines the movement of blue color in the complex bending setup\.  
Default value: `-0.5`

**Bending edges amplitude**  
Defines the movement of red color in the in the complex bending setup\.  
Default value: `0.2`

**Blend Factor**  
Changes visibility of blending layer\. **Blendlayer** generation parameter must be enabled first\.  
Default value: `0`

**Blend Falloff**  
Changes the falloff of blending\.   
Default value: `1`

**Blend Layer 2 Spec**  
Changes specular intensity of second blend layer\. **Blendlayer** generation parameter must be enabled first\.  
Default value: 

**Blend Layer 2 Tiling**  
Changes tiling of second blend layer\. **Blendlayer** generation parameter must be enabled first\.  
Default value: 

**Blend Mask Tiling**  
Changes tiling of blend mask\.   
Default value: `1`

**Cap opacity fall off**  
Controls the fading of alpha test textures when seen at a steep angle \(so they look less like a plane\)\. A value of `1` means it's turned off; `0` means it’s fully activated\.   
Default value: `1`

**Detail bending frequency**  
Defines the bending speed for complex \(wind\) bending\. Make sure that this value is in the correct proportion to the wind in your level\.  
Default value: `1`

**Indirect bounce color**  
Sets the amount of indirectly bounced color\.   
Default value: `136`, `136`, `136`

**Terrain Color Blend**  
Controls how much of the terrain color is blended into the diffuse color when up close\. **Use Terrain Color** for the selected vegetation object must be enabled first, except when **AutoMerge** is enabled\.  
Default value: `0`

**Terrain Color Blend Dist**  
Controls how much of the terrain color is blended into the diffuse color at a distance\. **Use Terrain Color** for the selected vegetation object must be enabled first, except when **AutoMerge** is enabled\.   
Default value: `0.5`

**Transmittance Color**  
Applies color tint for translucency\. **Leaves** or **Grass** shader generation parameter must be enabled first\.  
Default value: `255`, `255`, `203`

## Shader Generation Parameters<a name="shader-ref-vegetation-shader-generation-parameters"></a>

**Leaves**  
Enables leaf shading and leaves animation\. This parameter causes the gaming Lumberyard to use a much more complex \(expensive\) shading, so activate only for leaves rendering\.

**Grass**  
Enables simple and cheap grass rendering\. Specular and normal map setting are essentially disabled, so the shading is only diffuse\.

**Detail bending**  
Enables detail bending, which simulates wind on vegetation objects\. Activate for leaves and grass only\. Also, make sure to paint required vertex colors\.

**Detail mapping**  
Enables detail mapping\. 

**Blendlayer**  
Enables normal\-mapped diffuse layer blended on top of base material\.

**Displacement mapping**  
Enables displacement mapping\. Requires a height map \(\_displ format\)\. 

**Phong tessellation**  
Enables rough approximation of smooth surface subdivision\. 

**PN triangles tessellation**  
Enables rough approximation of smooth surface subdivision\.