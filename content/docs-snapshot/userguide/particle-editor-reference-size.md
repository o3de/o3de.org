# Size Attribute<a name="particle-editor-reference-size"></a>

In the **Size** attribute, specify how to control the particle's size and shape\.

![\[Size attributes in the Particle Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/particles/particle-editor-size.png)

For the **Size**, **Pivot**, and **Stretch** parameters, you can set a **Random** value and **Strength Over Emitter Lifetime** and **Strength Over Particle Lifetime** curves\.


**Size Attribute Parameters**  

| Name | Description | 
| --- | --- | 
| Lock Aspect Ratio | Maintains the particle aspect ratio\.Default value: false  | 
| Size X, Y, Z |  Specifies the world particle size\.  For 2D sprite particles, only **X** and **Y** are used\.  For geometry particles, **X**, **Y**, and **Z** are used\. For more information, see the [Geometry](particle-editor-reference-particles.md#geometry-attribute) parameter\. Valid values: `0`\+ Default value: `1`  | 
| Pivot X, Y, Z |  Moves the sprite's pivot point\. For 2D sprite particles, only **X** and **Y** are used\.  For geometry particles, **X**, **Y**, and **Z** are used\. For more information, see the [Geometry](particle-editor-reference-particles.md#geometry-attribute) parameter\. Valid values: `-1` to `+1` Default value: `0` \(texture center\)   | 
| Stretch | Specifies the amount of stretch, in seconds, that is applied to the particle in the direction of travel\. This is based on the current velocity and stretches in both directions by default\. **Offset Ratio** – Adjusts the center of stretching\. `0` = stretch both directions \| `1` = stretch backward only \| –1 = stretch forward only\.Valid values: `0+`Default value: `0` | 
| Tail Length | \(CPU only\) The length of the particle's tail in seconds\. The particle texture is stretched through the tail\. **Tail Steps** – The number of segments for the tail\. A higher number produces smoother tail curves for nonlinear, moving particles\.Valid values: `0+`Default value: `0`  | 
| Min Pixels | \(CPU only\) Adds the specified number of pixels to the particle's true size when rendering\. This is useful for important effects that should be visible even at a distance\. Valid values: `0+`Default value: `0` | 