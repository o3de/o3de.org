# Particles Shader<a name="shader-ref-particles"></a>

The Particles shader is used to render particle effects for fire, smoke, lightning, sparks, and fog that are affected by light, and as such cast shadows and cause reflections\.

## Shader Parameters<a name="shader-ref-particles-shader-parameters"></a>

**Color lookup amplitude**  
Sets the color lookup brightness and multiplier\.  
This parameter requires that the **Color lookup** shader generation parameter is enabled\.  
Default value: 1

**Color lookup color phase**  
Sets the per\-color phase to be used\.  
This parameter requires that the **Color lookup** shader generation parameter is enabled\.  
Default value: 1

**Global Illumination Amount**  
Sets the amount of global illumination\.  
Default value: 1

**Perturbation amount**  
Controls the amount of deformation that is used\.  
This parameter requires that the **Screen space deformation** shader generation parameter is enabled\.  
Default value: 0\.01

**Perturbation anim speed**  
Controls animation translation speed and frequency that is applied to the deformation map\.  
This parameter requires that the **Screen space deformation** shader generation parameter is enabled\.  
Default value: 0\.05

**Perturbation tiling**  
Controls the tiling amount of deformation\.  
This parameter requires that the **Screen space deformation** shader generation parameter is enabled\.  
Default value: 0\.5

**Deform amount**  
Controls deformation multiplier\.  
This parameter requires that the **Deformation** shader generation parameter is enabled\.  
Default value: 0

**Deform anim speed**  
Controls deformation animation translation speed and frequency\.  
This parameter requires that the **Deformation** shader generation parameter is enabled\.  
Default value: 0

**Deform tiling**  
Controls deformation tiling\.  
This parameter requires that the **Deformation** shader generation parameter is enabled\.  
Default value: 0\.1

**Refraction Bump Scale**  
Sets the refraction bump scale\.  
This parameter requires that the **Refraction** shader generation parameter is enabled\.  
Valid value range: 0 \- 2\.0  
Default value: 0\.1

**Soft particles scale**  
Controls soft particle intersection softness for sharper or softer intersections\.  
Default value: 1

**Threshold for writing depth**  
Sets the threshold for writing depth\.  
This parameter requires that the **Depth Fixup** shader generation parameter is enabled\.  
Default value: 0\.05

## Shader Generation Parameters<a name="shader-ref-particles-shader-generation-parameters"></a>

**Refraction**  
Enables the use of a bump\-map texture as the displacement for refraction\.

**Refraction Tinting**  
Enables the use of a color texture to tint refraction\.

**Screen space deformation**  
When enabled, the **Refraction Normal** texture map slot also becomes available under **Texture Maps**\.

**Deformation**  
When enabled, the **Deformation Normal** texture map slot also becomes available under **Texture Maps**\.

**Color lookup**  
Enables the use of the color lookup map for applying color lookup\. When enabled, the **Color Lookup Map** texture map slot also becomes available under **Texture Maps**\.

**Specular Lighting**  
Enables the calculation of specular lighting in addition to diffuse lighting\.

**Depth Fixup**  
Enables writing depth for depth of field and post processing\.