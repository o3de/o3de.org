# TemplBeamProc Shader<a name="shader-ref-templbeamproc"></a>

The TemplBeamProc shader is used to create inexpensive fog\-like light beam effects, enabling control over beam size and blending\.

## Best Practices<a name="shader-ref-templbeamproc-examples-using"></a>

The following are some best practices for using this shader:
+ Select the **No Shadow** property under **Advanced**\.
+ Set **Opacity** to 100%\.
+ Use a simple grayscale texture with no alpha in the **Diffuse** texture map slot\.
+ The shader fades out rendering faces that are at a certain angle to the camera\. As such, use different sub\-materials for the top plane and the intersecting planes to allow control of the angle of visibility\. 

## Shader Parameters<a name="shader-ref-templbeamproc-shader-parameters"></a>

**ColorMultiplier**  
Increases or decreases brightness and blending\.  
Default value: 1

**EndColor**  
Sets the end color for the gradient\.  
Default value: 255,255,255

**EndRadius**  
Sets the radius \(in meters\) of the effect at the end of the object\.  
Default value: 2

**Length**  
Adjusts the scaling of the rendered effect\.  
Default value: 10

**OriginalLength**  
Sets the length scaling factor\. If the values of **Length** and **OriginalLength** are identical, the object has scale of 100%\.  
Default value: 10

**OriginalWidth**  
Sets the width scaling factor\. If the values of **Width** and **OriginalWidth** are identical, the object has scale of 100%\.  
Default value: 1

**Soft intersection factor**  
Controls softness of surface interaction with other opaque scene geometry\.  
Default value: 1

**StartColor**  
Sets the start color for the gradient\.  
Default value: 255,255,255

**StartRadius**  
Sets the radius \(in meters\) of the effect at the start of the object\.  
Default value: 1

**View dependency factor**  
Controls the blending in and out depending on the facing angle to the camera\.  
The higher the value, the longer the effect is visible even when nearly 90° to camera, the smaller the value the earlier the effect starts to vanish\.  
Default value: 2

## Shader Generation Parameters<a name="shader-ref-templbeamproc-shader-generation-parameters"></a>

**Noise map**  
Enables the use of a 3D animated noise map, which enables a nice motion to the beams\. However, this motion cannot be controlled by any parameters\.

**Muzzleflash**  
Enables use as a muzzle flash effect\.