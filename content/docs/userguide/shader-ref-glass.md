# Glass Shader<a name="shader-ref-glass"></a>

The Glass shader renders windows and other glass objects, imparting refractive, tint, fog, and cracking effects for both breakable and non\-breakable glass objects\. Use the [Illum Shader](shader-ref-illum.md) instead if you require non\-refractive effects for non\-breakable glass objects\. 

Here are a few things to keep in mind when using the Glass shader:
+ Ambient diffuse lighting from cube maps isn't taken into account\.
+ The shader uses the sky color exclusively for all ambient lighting\.
+ Except for the sun, all deferred lights don't affect transparent glass objects\.
+ The shader can't receive sun shadows\.

## Shader Parameters<a name="shader-ref-glass-shader-parameters"></a>

**Back light scale**  
Controls the amount of light that gets through the glass\.   
Default value: 0\.5

**Blur Amount**  
Controls the amount of blur\.  
This parameter requires that the **Blur refraction – PC Only** shader generation parameter is enabled\.  
Default value: 0\.5

**Bump Map Tiling**  
Adjusts tiling of the bump map independently from diffuse\.  
Default value: 1

**Bump Scale**  
Sets the reflection and refraction bump scale\.  
Default value: 0\.005

**Cloudiness Masks Blur**  
Applies blur to just cloudy areas\.  
This parameter requires that the **Tint map – Tint/Gloss/Spec** shader generation parameter is enabled\.  
Default value: 0

**Cloudiness Masks Gloss**  
Makes cloudy areas less glossy\.  
This parameter requires that the **Tint map – Tint/Gloss/Spec** shader generation parameter is enabled\.  
Default value: 0\.5

**Fog color**  
Sets fog color\.  
This parameter requires that the **Depth Fog** shader generation parameter is enabled\.  
Default value: 255,255,255

**Fog cutoff end depth**  
Sets the distance, in meters, after which fog doesn’t get any stronger\.   
This parameter requires that the **Depth Fog** shader generation parameter is enabled\.  
Default value: 20

**Fog density**  
Sets fog density\.  
This parameter requires that the **Depth Fog** shader generation parameter is enabled\.  
Default value: 1

**Indirect bounce color**  
Sets the amount of indirectly bounced color\.   
Not used if the **Depth Fog** shader generation parameter is enabled\.  
Default value: 136,136,136

**Tint Cloudiness**  
Adjusts the cloudiness of tinted areas\.  
Default value: 0

**Tint Color**  
Applies a tint color to the glass\.   
Default value: 255,255,255

## Shader Generation Parameters<a name="shader-ref-glass-shader-generation-parameters"></a>

**Use Diffuse map**  
Enables diffuse map for dirt, and so on\. Requires alpha channel\.

**Environment map**  
Enables environment map as a separate texture\.

**Tint map – Tint/Gloss/Spec**  
Enables the RGB spec map to control tinting in red channel, cloudiness in green channel, and specular in blue channel\.

**Use Tint Color Map**  
Enables the Tint Color map\. Used for multicolored glass, which goes in the custom Tint Color map slot\.

**Blur refraction – PC Only**  
Enables the blurring of objects seen through the glass\.

**Depth Fog**  
Enables depth fog behind the glass surface\.

**Disable Lights**  
Disables the reflection of lights\.