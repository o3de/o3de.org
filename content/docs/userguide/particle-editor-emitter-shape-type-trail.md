# Trail Emitter \(CPU\)<a name="particle-editor-emitter-shape-type-trail"></a>

The **Trail** emitter connects particles together to create a trailing effect as the system moves through space\.

The following are parameters for the **Trail** emitter\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/particles/particle-emitter-type-trail.jpg)


**Trail Emitter Parameters**  

| Parameter Function | Description | 
| --- | --- | 
| Connect to Origin | Connects a newly spawned particle to the origin\. Default value: false | 
| Texture Mirror | Mirrors alternating texture tiles\. Default value: true | 
| Texture Frequency | Specifies the number of texture wraps per trail emitter sequence, based on the Texture Mapping type\. Valid values: 0\+Default value: 1 | 
| Lock Anchor Points | Locks the UV anchor points of the texture to stay in place, rather than follow the emitter location\. Default value: false | 
| Texture Mapping |  Maps the assigned texture to each particle quad or across the trail stream\. [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/particle-editor-emitter-shape-type-trail.html) Default value: **Per Particle**  | 

**Note**  
When there is a single light source, some or all particles for **Trail** emitters can appear unlit \(black\)\. This is most apparent when the sun is the only light source and the time and day setting is noon\. To address this:  
Add an Environment Probe to the scene to create indirect lighting\. For more information, see [Environment Probe](component-environment-probe.md)\.
Enable Environment Probe Lighting on the particle system by specifying a value for the Environment Probe Lighting parameter\. For example, a value of `0.5` applies light from the Environment Probe at half intensity\. For more information, see [Lighting Attribute](particle-editor-reference-lighting.md)\.

## Particle Trail Visibility<a name="particle-emitter-type-trail-movement"></a>

Trail segments are drawn when the distance between the start and end of a segment exceed the value for **Min visible distance**\. You can choose to automatically disable the drawing of trails that are not moving or are moving too slowly\. This is useful if you have particle trail effects that need to be drawn only when the emitter is moving\.

The following are movement parameters for the **Trail** emitter\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/particles/particle-emitter-type-trail-movement.png)


**Related Movement Attributes**  

| Parameter  | Description | 
| --- | --- | 
| Min visible segment length | \([Trail Emitter \(CPU\)](#particle-editor-emitter-shape-type-trail) only\) Tail particles are visible only when they have moved the specified distance\. Default value: false | 
| Min visible distance | \([Trail Emitter \(CPU\)](#particle-editor-emitter-shape-type-trail) only\) Specifies the minimum distance between the start and end of a trail segment\. Segments that are smaller than this value become transparent\. Valid values: 0\+Default value: 0 | 