# Sphere Emitter \(CPU and GPU\)<a name="particle-editor-emitter-shape-type-sphere"></a>

The **Sphere** emitter enables spawning of particles along the shapes axial coordinate system \(see diagram below\)\. This allows you to create complex spherical effects\.

The following is an example of the **Sphere** emitter in the **Preview** viewport\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/particles/particle-emitter-type-sphere-1.png)

The following are parameters for the **Sphere** emitter\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/particles/particle-emitter-type-sphere-2.png)


**Sphere Emitter Parameters**  

| Parameter  | Description | 
| --- | --- | 
| Emitter Size | Sets the size of the sphere emitter in meters\. Valid values: 0\+ \(radius\)Default value: 5 | 
| Spawn Pos XYZ | XYZ values define the spawning position away from the emitter itself in emitter space\. You can set a Random value and Strength over Emitter Lifetime curve\. Valid values: any Default value: 0, 0, 0 | 
| Spawn Pos XYZ Random | For additional random layering, XYZ values define the range of random spawning in both directions, away from the spawn position\. You can set a Random value and Strength over Emitter Lifetime curve\. Valid values: anyDefault value: 0, 0, 0 | 
| Spawn Pos Increment XYZ | Spawns each subsequent particle at incremental positions along the axis over the emitter size, based on a percentage value\. For example, if you set a value of 20, a particle spawns every 20% along the axis, making 5 particles on the axis to equal 100%\. You can set a Random value and Strength over Emitter Lifetime curve\. Valid values: any \(percentage\)Default value: 0 | 
| Spawn Pos Increment XYZ Random | Provides another layer of randomization for each particle to spawn at percentages over the axis, independent of the Spawn Pos Increment parameter\. You can set a Random value and Strength Over Emitter Lifetime curve\. Valid values: any \(percentage\)Default value: 0 | 
| Velocity XYZ | XYZ values define the velocity applied to particles in world space\. The velocity direction also sets the axis around which velocity spread occurs\. You can set a Random value and Strength over Emitter Lifetime curve\. Valid values: anyDefault values: 0, 0, 0 | 
| Velocity XYZ Random | For additional random layering, XYZ values define the random velocity applied to particles in world space\. You can set a Random value and Strength over Emitter Lifetime curve\. Valid values: anyDefault value: 0, 0, 0 | 