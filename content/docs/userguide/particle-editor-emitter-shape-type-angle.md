# Angle Emitter \(CPU and GPU\)<a name="particle-editor-emitter-shape-type-angle"></a>

The **Angle** emitter spawns particles in a directional pattern based on the parameters\. This is done to control the angle of emission from its source\.

The following are parameters for the **Angle** emitter \(CPU\)\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/particles/particle-emitter-type-angle.png)


**Angle Emitter Parameters for CPU Attributes**  

| Parameter  | Description | 
| --- | --- | 
| Focus Angle | Specifies the number of degrees to rotate from the y\-axis\. Valid values: 0 \(up\) – 180 \(down\)Default value: 0 | 
| Focus Azimuth | Specifies the number of degrees to rotate the new axis about the y\-axis\. Valid values: any \(0, 360 = North, 90 = West, 180 = South, 270 = East\)Default value: 0 | 
| Focus Camera Direction | Sets the focus direction to face the camera\. You can set a Random value and the Strength over Emitter Lifetime curve\. Valid values: 0 – 1Default value: 0 | 
| Focus Gravity Direction | Ignores the emitter rotation and focuses gravity on world Z\. Default value: false | 
| Focus Rotates Emitter | Default value: false | 
| Emit Offset Direction | If true, changes each particle's emission direction to align with its offset from the origin\. Default value: false | 
| Emit Angle | Sets the angle deviation of an emitted particle from the default focus \(\+Y\) axis\. 0 = up, 90 = horizontal, 180 = down\. This is the maximum angle from the focus\. You can set a Random value \(determines minimum angle\) and the Strength over Emitter Lifetime curve\. [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/particle-editor-emitter-shape-type-angle.html)Valid values: 0 – 180Default value: 0 | 
| Curvature | Sets how far to bend the vertex normals for Facing=Camera particles into a spherical shape\. This affects lighting\. Valid values: 0 \(flat\) – 1 \(hemispherical shape\)Default value: 1 | 

The following are parameters for the **Angle** emitter \(GPU\)\. 

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/particles/particle-emitter-type-angle-2.png)


**Angle Emitter Parameters for GPU Attributes**  

| Parameter  | Description | 
| --- | --- | 
| Focus Angle | Specifies the number of degrees to rotate from the y\-axisValid values: 0 \(up\) – 180 \(down\)Default value: 0 | 
| Focus Azimuth | Specifies the number of degrees to rotate the new axis about the y\-axis\. Valid values: any \(0, 360 = North, 90 = West, 180 = South, 270 = East\)Default value: 0 | 
| Emit Angle | Sets the angle deviation of an emitted particle from the default focus \(\+Y\) axis\. 0 = up, 90 = horizontal, 180 = down\. This is the maximum angle from the focus\. You can set a Random value \(determines minimum angle\) and the Strength over Emitter Lifetime curve[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/particle-editor-emitter-shape-type-angle.html)Valid values: 0 – 180Default value: 0 | 