# DistanceClouds Shader<a name="shader-ref-distanceclouds"></a>

The DistanceClouds shader is a dedicated shader used for 2D clouds that are placed at a far distance\. 

## Shader Parameters<a name="shader-ref-distanceclouds-shader-parameters"></a>

**Alpha Multiplier**  
Alpha multiplier for cloud texture\.  
This parameter requires that the **Advance distance clouds** shader generation parameter is enabled\.  
Default value: 1

**AlphaSaturation**  
Controls the alpha saturation of clouds when blending them with the sky\. High values make less opaque parts of the cloud texture fade out more\.  
You can reuse the same texture for slightly different looking clouds by defining several materials with custom **AlphaSaturation** values\.  
This parameter does not apply if the **Simple distance clouds** shader generation parameter is enabled\.  
Default value: 2

**Attenuation**  
Controls how strongly sun light is attenuated when traveling through the distance cloud\. Light attenuation is computed per pixel\.  
Use **Attenuation** to blend between current sun color and sky color\. Use higher attenuation values to accentuate cloud self\-shadowing \(for example, strong cloud layers\)\.  
This parameter applies if no Shader Generation parameter is enabled\.  
Default value: 0\.6

**Cloud Height**  
Sets the height of the cloud layer\.  
This parameter requires that the **Advanced distance clouds** shader generation parameter is enabled\.  
Default value: 0\.3

**Density Sky**  
Sets the cloud density that is used for sky light scattering\.  
This parameter requires that the **Advanced distance clouds** shader generation parameter is enabled\.  
Default value: 4\.5

**Density Sun**  
Sets the cloud density that is used for sunlight scattering\.  
This parameter requires that the **Advanced distance clouds** shader generation parameter is enabled\.  
Default value: 1\.5

**Exposure**  
Sets exposure amount to enable **HDR** on **LDR** cloud texture\.  
This parameter requires that the **Simple distance clouds** shader generation parameter is enabled\.  
Default value: 1

**Opacity**  
Sets opacity modifier for the cloud\.  
This parameter requires that the **Simple distance clouds** shader generation parameter is enabled\.  
Default value: 1

**SkyColorMultiplier**  
A value multiplied to the sky color defined for the current time of day\.   
The result is used in the pixel shader to blend between sun and sky color using the computed light attenuation value\.  
This parameter applies if no shader generation parameter is enabled\.  
Default value: 1\.5

**StepSize**  
Controls how fast to step through the cloud texture \(density\) to compute per\-pixel light attenuation\.   
This effect determines the appearance of the gradient\. Higher values create smoother and less abrupt gradients, but can also produce unnatural gradient changes over time of day\.  
This parameter applies if no shader generation parameter is enabled\.  
Default value: 0\.004

**SunColorMultiplier**  
A value multiplied by the sun color that is defined for the current time of day\. The result is used in the pixel shader to blend between sun and sky color using the computed light attenuation value\.  
This parameter applies if no shader generation parameter is enabled\.  
Default value: 4

## Shader Generation Parameters<a name="shader-ref-distanceclouds-shader-generation-parameters"></a>

**Simple distance clouds**  
Enables the use of distance clouds with no volumetric shading computations\.

**Advanced distance clouds**  
Enables the use of distance clouds with more accurate shading computations\.