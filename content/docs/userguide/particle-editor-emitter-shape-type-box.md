# Box Emitter \(CPU and GPU\)<a name="particle-editor-emitter-shape-type-box"></a>

The **Box** emitter enables spawning of particles along the shapes axial coordinate system\. This allows you to create complex planar and rectangular effects\.

The following is an example of the **Box** emitter in the **Preview** viewport\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/particles/particle-emitter-type-box-1.png)

The following are parameters for the **Box** emitter\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/particles/particle-emitter-type-box-2.png)


**Box Emitter Parameters**  

| Parameter  | Description | 
| --- | --- | 
| Emitter Size XYZ | Sets the size of the box emitter in meters\. Valid values: 0\+ \(radius\)Default value: 5 | 
| Confine XYZ | Confines the particles to render within the box size on each axis\. Default value: false | 
| Spawn Pos XYZ | XYZ values define the spawning position away from the emitter in emitter space\. You can set a Random value and Strength over Emitter Lifetime curve\. Valid values: any Default value: 0, 0, 0 | 
| Spawn Pos XYZ Random | For additional random layering, XYZ values define the range of random spawning in both directions, away from the spawn position\. You can set a Random value and Strength over Emitter Lifetime curve\. Valid values: anyDefault value: 0, 0, 0 | 
| Velocity XYZ | XYZ values define the velocity applied to particles in world space\. The velocity direction also sets the axis in which velocity spread occurs around\. You can set a Random value and Strength over Emitter Lifetime curve\. Valid values: anyDefault values: 0, 0, 0 | 
| Velocity XYZ Random | For additional random layering, XYZ values define the random velocity applied to particles in world space\. You can set a Random value and Strength over Emitter Lifetime curve\. Valid values: anyDefault value: 0, 0, 0  | 