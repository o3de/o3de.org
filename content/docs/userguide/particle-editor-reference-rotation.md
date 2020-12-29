# Rotation Attribute<a name="particle-editor-reference-rotation"></a>

In the **Rotation** attribute, specify how to control the particle's rotation\.

![\[Rotation attributes in the Particle Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/particles/particle-editor-rotation.png)


**Rotation Attribute Parameters**  

| Name | Description | 
| --- | --- | 
| Init Angles | XYZ values define the initial angle, in degrees, that is applied to the particles upon spawning\. For Facing = Camera particles, only the y\-axis is used and refers to rotation in screen space\. For 3D particles, all three axes are used and refer to emitter local space\. Valid values: anyDefault value: `0` | 
| Random Angles | XYZ values define the random variation \(bidirectional\), in degrees, to Init Angles\. Valid values: `0+`Default value: `0` | 
| Rotation Rate X, Y, Z | Specifies the constant particle rotation in degrees/second\. The axes are the same as Init Angles\. You can set a Random value and Strength Over Emitter Lifetime and Strength Over Particle Lifetime curves\. Valid values: anyDefault value: `0` | 