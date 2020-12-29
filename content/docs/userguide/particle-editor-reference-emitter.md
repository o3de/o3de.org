# Emitter Attribute<a name="particle-editor-reference-emitter"></a>

In the **Emitter** attribute, specify how to control the location and spawning attributes of the particle and emitter shape\. The parameters are updated based on the type that you select\. 

![\[Emitter attributes in the Particle Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/particles/particle-editor-emitter.png)


**Emitter Attribute Parameters**  

| Name | Description | 
| --- | --- | 
| Particle Type | Specifies whether the emitter is a CPU or GPU type\. | 
| Emitter Shape Type | Specifies the emitter shape type\.[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/particle-editor-reference-emitter.html) | 
| Relative Particle Movement | Determines the particle motion in the emitter's space\. The following is an example of particles that are emitted upward from an emitter: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/particle-editor-reference-emitter.html)Default value: **No** | 
| Parameter Inheritance | Specifies the source for default \(starting\) effect parameters\. [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/particle-editor-reference-emitter.html)The selected source has the following consequences:[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/particle-editor-reference-emitter.html)To reset parameters to the default values that are located in the `DefaultParticleEmitters.xml` file, right\-click the parameter and choose **Reset to default**\. You can modify the default values for the project using the same file\. When you save effects to `.xml` libraries, only non\-default values are saved\. When you load effects from the `.xml` libraries, the current default values for the effect's inheritance are used as a base\.When you edit a parent effect's parameters, the non\-edited parameters of all children \(and descendants\) that have **Parent** selected are instantly updated\. | 
| Spawn Indirection |  This parameter has the following values: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/particle-editor-reference-emitter.html)  This parameter is supported only within the same CPU or GPU particle type\.   | 
| Attach Type | Specifies the emission location when the parent emitter has geometry\.[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/particle-editor-reference-emitter.html)Default value: **None** | 
| Attach Form | Specifies the elements of the geometry from which particles emit\.[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/particle-editor-reference-emitter.html)Default value: **Vertices**  | 
| Count | Specifies the total number of particles that are active at a given time and determines the emission rate \(Count/Particle Lifetime\)\. You can set a Random value and the Strength Over Emitter Life curve\. Valid values: `0+` | 
| Maintain Density | Increases the emission rate \(and particle count\) when an emitter moves in order to maintain the same spatial density as when motionless\. You can scale the increase from 0 to 1\. [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/particle-editor-reference-emitter.html)Valid values: `0+` | 
| Continuous | If false, emits all particles at once and then dies\. If true, emits particles gradually over the emitter lifetime\. If true and Emitter Lifetime = 0, emits particles gradually at a rate of Count/Particle Lifetime per second, indefinitely\. Default value: false  | 
| Spawn Delay | Delays the start of the emitter for the specified time\. This is useful to delay subeffects relative to the overall emitter creation time\. Can set a Random value\.Valid values: `0+`Default value: `0` | 
| Emitter Lifetime | If Continuous = true, specifies the lifetime of the emitter\. Emitter lifetime does not apply to noncontinuous effects, which always disappear as soon as they have emitted all of their particles\. You can set a Random value\.Valid values: `0+`Default value: `0` \(infinite lifetime\) | 
| Pulse Period | If greater than 0 and Continuous = false, restarts the emitter repeatedly at this interval\. You can set a Random value\.Valid values: anyDefault value: `0` | 
| Orient to Velocity | Forces the particle x\-axis to align to the velocity direction\. You can use Rotation parameters to rotate the particle further\. Default value: false | 
| Position Offset | XYZ values define the spawning position away from the emitter itself in emitter space\. Valid values: any Default values: `0`, `0`, `0`  | 
| Random Offset | XYZ values define the range of a random spawning box in both directions, away from the position offset\. Valid values: any Default values: `0`, `0`, `0` | 
| Offset Roundness | Specifies the fraction of spawning volume corners to round\. Valid values: `0` \(box shape\) to `1` \(ellipsoid shape\)Default value: `0` | 
| Offset Inner Fraction | Specifies the ratio of inner to outer spawning volume\. Valid values: `0` \(spawn within entire volume\) to `1` \(spawn only at surface\)Default value: `0` | 