# Eye Shader<a name="shader-ref-eye"></a>

The Eye shader is used to render realistic eyes that take sclera, cornea, iris, and eye moisture properties into account\.

## Shader Parameters<a name="shader-ref-eye-shader-parameters"></a>

**Cornea Refraction**  
Controls and optionally animates pupil size\.   
Default value: 0\.01

**Cornea Smoothness**  
Controls the glossiness of corneas reflections\.  
The default creates smaller and sharper highlights that are more lifelike\.  
Default value: 1

**Indirect bounce color**  
Sets the amount of indirectly bounced color\. Has no effect when the Physically Based Shading \(PBR\) model is used\.  
Default value: 136,136,136

**Iris Color**  
Tweaks the iris color without affecting the eye white\.   
**Iris Color** can be used for eye variation between characters that use the same texture\.  
Default value: 187,187,187

**Iris Depth**  
Simulates the actual form of the iris, since the in\-game mesh has the shape of a sphere\.   
Default value: 0\.005

**Iris Shadowing**  
Controls iris self\-shadowing, which further simulates the actual form of the iris\.   
This effect is only affected by sunlight and not by other light sources\.
Default value: 5

**Iris SSS**  
Controls the subsurface scattering \(SSS\) amount of the iris, which blurs the shadows\. Higher values blur the shading more\.  
Default value: 0\.6

**Sclera SSS**  
Controls the subsurface scattering \(SSS\) amount of the eye whites, which blurs the shadows\. Higher values blur the shading more\.  
Default value: 0\.4

**Depth bias scale**  
Sets the depth bias of the overlay mesh to avoid clipping with the eyes\.  
This parameter requires that the **Specular overlay** shader generation parameter is enabled\.  
Default value: 

**Diffuse occlusion strength**  
Controls the strength of the occlusion effect on the eyes\.  
This parameter requires that the **Ambient occlusion overlay** shader generation parameter is enabled\.  
Default value: 1

**Specular occlusion strength**  
Controls the strength of the occlusion effect on the eyes' specular highlights\.  
This parameter requires that the **Ambient occlusion overlay** shader generation parameter is enabled\.  
Default value: 1

## Shader Generation Parameters<a name="shader-ref-eye-shader-generation-parameters"></a>

**Environment map**  
Enables environment map as a separate texture\.  
If the blending cube map feature isn’t used, **Environment map** must be enabled and **nearest\_cubemap** must be assigned for the texture's environment\.

**Ambient occlusion overlay**  
Enables ambient occlusion overlay rendering\.  
Must be enabled to use the occlusion mesh that overlays the eye\. This mesh gives the eyes a more natural shadowing and integrates them with the head\.

**Specular overlay**  
Enables the eye water mesh\.