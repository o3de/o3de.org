# Point Emitter \(CPU and GPU\)<a name="particle-editor-emitter-shape-type-point"></a>

The **Point** emitter spawns particles in a spherical distribution from the origin\. This allows you to control the spread angle to create complex conical and spherical effects\.

The following are parameters for the **Point** emitter\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/particles/particle-emitter-type-point.png)


**Point Emitter Parameters**  

| Parameter  | Description | 
| --- | --- | 
| Spawn Offset | Offsets the spawning of particles spherically at distance from the emitter origin\. Valid values: 0\+ \(radius\)Default value: 0 | 
| Spawn Pos XYZ | XYZ values define the spawning position away from the emitter itself in emitter space\. You can set a Random value and Strength over Emitter Lifetime curve\. Valid values: anyDefault value: 0, 0, 0 | 
| Spawn Pos XYZ Random | For additional random layering, XYZ values define the range of random spawning in both directions, away from the spawn position\. You can set a Random value and Strength over Emitter Lifetime curve\. Valid values: anyDefault value: 0, 0, 0 | 
| Velocity XYZ | XYZ values define the velocity applied to particles in world space\. The velocity direction also sets the axis around which velocity spread occurs\. You can set a Random value and Strength over Emitter Lifetime curve\. Valid values: anyDefault values: 0, 0, 0 | 
| Velocity XYZ Random | For additional random layering, XYZ values define the random velocity applied to particles in world space\. You can set a Random value and Strength over Emitter Lifetime curve\. Valid values: anyDefault value: 0, 0, 0 | 
| Velocity Spread | Restricts the angle of spherical distribution in the direction of the velocity XYZ vector\. For example, a value of 360 = Sphere, 180 = Hemisphere, and so on\. You can set a Random value and Strength over Emitter Lifetime curve\. Valid values: 0 – 360Default value: 360 | 