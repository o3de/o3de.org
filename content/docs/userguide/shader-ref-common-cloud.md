# Common\.Cloud Shader<a name="shader-ref-common-cloud"></a>

The Common\.Cloud shader is used exclusively for [common clouds](component-sky-cloud.md)\. The shader uses per\-vertex gradient lighting and takes the sun, cloud, and viewer positions into account\. Gradient lighting interpolates between the bright color, which is calculated from the HDR Sun color multiplier, and the dark color, which is calculated from the HDR Sky color multiplier\. In addition, rim lighting is also applied on a per\-pixel basis to capture the effects of light scattering when looking at clouds that are lit by the sun from behind\.

Common clouds use soft clipping to gradually fade in and out at the near and far clipping plane\. This prevents rendering artifacts in the far distance and flickering due to cloud particles entering and leaving the view cone near the camera during a flythrough\. Additionally, clouds blend softly against opaque scene geometry\.

The default **Diffuse** texture map for this shader is `cumulus_01.dds`, which contains images of cloud particles\.

![\[Default diffuse texture map for the common cloud shader\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-common-cloud-1.png)

![\[Example image of default diffuse texture map for the common cloud shader.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-common-cloud-2.png)

## Shader Parameters<a name="shader-ref-common-cloud-shader-parameters"></a>

**CloudAngularAtten**  
Defines the angular attenuation factor for rim lighting\. The smaller the value, the more widespread the rim lighting effect for clouds \(partially\) covering the sun becomes from the viewer's point of view\.  
Valid values: `1` to `100`  
Default value: `30`  

**Example**  
The following examples show a cloud with angular attenuation set to `20` and `100`\.  

![\[Example clouds with angular attenuation.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-common-cloud-shader-parameters-1.png)

**CloudBacklightingScale**  
Defines how much to scale rim lighting\. Higher values increase the glow of cloud edges\.  
Valid values: `0` to `5`  
Default value: `1`  

**Example**  
The following examples show a cloud with backlighting scale set to `0` and `5`\.  

![\[Example clouds with backlighting.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-common-cloud-shader-parameters-2.png)

**CloudOutlineSlope**  
Defines the slope of the ramp function used to blend in rim lighting\. Higher values create harder transitions\.  
Valid values: `0` to `20`  
Default value: `1`  

**Example**  
The following examples show a cloud with outline slope set to `0` and `20`\.  

![\[Example clouds with the cloud outline slope.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-common-cloud-shader-parameters-3.png)

**CloudOutlineThreshold**  
Defines the cloud's opacity threshold value below which the rim lighting effect is applied\. Higher thresholds cause the rim lighting to grow inward\.  
Valid values: `0.0` to `1.0`  
Default value: `0.4`  

**Example**  
The following examples show a cloud with outline threshold set to `0.0` and `1.0`\.  

![\[Example clouds with the cloud outline threshold.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shaders/shader-ref-common-cloud-shader-parameters-4.png)

**HDRBrightnessAdjust**  
Controls brightness of clouds in high dynamic range \(HDR\) image format \(relative to low dynamic range \(LDR\) image format\)\.  
Default value: `1`