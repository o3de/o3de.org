# Beam Emitter \(CPU\)<a name="particle-editor-emitter-shape-type-beam"></a>

The **Beam** emitter spawns a length of connected particles at once, based on the origin and specified target position\. You can also set wave form attributes to shape or animate the beam\.

The following are parameters for the **Beam** emitter \(CPU\)\. 

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/particles/particle-emitter-type-beam.png)


**Beam Emitter Parameters for CPU Attributes**  

| Parameter  | Description | 
| --- | --- | 
| Beam Lifetime | Sets the beam lifetime, in seconds\. You must use this in conjunction with particle lifetime\. Valid values: 0\+Default value: 1 | 
| Target Position | Specifies the XYZ position to set the beam target, offset from the origin\. Default value: 0, 0, 15 | 
| Random Target Offset | Randomizes the XYZ beam target, offset from the target position\. Valid values: anyDefault value: 0, 0, 0 | 
| Segment Type | Specifies how each segment generates over the length of the beam\. Use Fixed to set the number of segments over the length\. Use Length to set the length of each segment over the beam length\. Valid values: **Fixed**, **Length**Default value: **Fixed** | 
| Segment Count | Defines the number of segments with the Fixed type set\. Valid values: 0\+Default value: 10 | 
| Segment Length | Defines the length of each segment with the Length type set\. Valid values: 0\+Default value: 5 | 
| Texture Shift | Shifts the texture coordinate in the V direction at the specified rate\. Valid values: 0\+Default value: 0 | 
| Up Vector for Waves | Specifies the XYZ vector on which the waveform occurs\. Valid values: anyDefault value: 0, 0, 0 | 
| Wave Form Source | Specifies the side of the beam from which to generate the waveform\. [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/particle-editor-emitter-shape-type-beam.html)Default value: **Origin** | 
| Wave Form Type | Sets the behavior for the waveform\. [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/particle-editor-emitter-shape-type-beam.html)Default value: **None** | 
| Wave Phase | Sets the position of the waveform at the specified source\. A value of 360 completes one full cycle of the waveform\. You can animate the beam waveform by using Emitter Lifetime, Pulse Period, and Strength over Emitter Lifetime in conjunction\.  The beam animation is updated when a new one is spawned based on the **Beam Lifetime** parameter\. A lower lifetime provides a smoother animation\. The following example demonstrates the wave phase parameter: Beam lifetime = \.01, Emitter lifetime = 2, Pulse period = 2, Up vector = 1, 0, 0, Wave form type = Sine, wave phase = 180 \(with a curve set on **Strength over Emitter Lifetime**\), Wave amplitude = 2, Wave frequency = 0\.5Valid values: 0\+Default value: 0 | 
| Wave Amplitude | Sets the strength of the waveform deformation\. Valid values: 0\+Default value: 0 | 
| Wave Frequency | Sets the number of wave cycles over the waveform length\. Valid values: 0\+Default value: 0  | 
| Texture Mapping |  Maps the assigned texture to each particle quad or across the trail stream\. [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/particle-editor-emitter-shape-type-beam.html) Default value: **Per Particle**  | 

**Note**  
When there is a single light source, some or all particles for **Trail** emitters can appear unlit \(black\)\. This is most apparent when the sun is the only light source and the time and day setting is noon\. To address this:  
Add an Environment Probe to the scene to create indirect lighting\. For more information, see [Environment Probe](component-environment-probe.md)\.
Enable Environment Probe Lighting on the particle system by specifying a value for the Environment Probe Lighting parameter\. For example, a value of `0.5` applies light from the Environment Probe at half intensity\. For more information, see [Lighting Attribute](particle-editor-reference-lighting.md)\.