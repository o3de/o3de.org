---
description: ' Use the Movement attribute in the Amazon Lumberyard Particle Editor to control
  the movement of the particle. '
title: Movement Attribute
---
# Movement Attribute {#particle-editor-reference-movement}

In the **Movement** attribute, specify how to control the particle's movement\.

![\[Movement attributes in the Particle Editor.\]](/images/userguide/particles/particle-editor-reference-movement.png)

For the **Air Resistance**, **Gravity Scale**, **Turbulence 3D Speed**, **Turbulence Size**, and **Turbulence Speed** parameters, you can set a **Random** value and **Strength Over Emitter Lifetime** and **Strength Over Particle Lifetime** curves\.


**Movement Attribute Parameters**

| Name | Description |
| --- | --- |
| Min visible segment length | [Trail Emitter \(CPU\)](/docs/userguide/particles/editor/emitter-shape-type-trail.md) only\) Tail particles are visible only when they have moved the specified distance\. Default value: false |
| Min visible distance | [Trail Emitter \(CPU\)](/docs/userguide/particles/editor/emitter-shape-type-trail.md) only\) Specifies the minimum distance between the start and end of a trail segment\. Segments that are smaller than this value become transparent\. Valid values: `0+`Default value: `0` |
| Speed | Specifies the initial speed of particles\. You can set a Random value and Strength Over Emitter Lifetime curve\. Valid values: anyDefault value: `5` |
| Acceleration | XYZ values define the constant acceleration that is applied to particles in world space\. Valid values: anyDefault value: `0`, `0`, `0`  |
| Inherit Velocity | Specifies the fraction of initial velocity that is inherited from the particle's parent\. For indirect particles, the parent particle's velocity is inherited\. For direct particles, the emitter's velocity is inherited\. Valid values: anyDefault value: `0` |
| Bind Emitter to Camera | \(CPU only\) Forces the emitter to relocate to the main camera's position\. This is useful \(with Space Loop\) for making a rain or snow effect, which the player cannot pass\. Default value: false |
| Space Loop | \(CPU only\) Loops particles within a region around the camera, as defined by Camera Min/Max Distance \(under the Visibility tab\)\. This is useful for making a rain or snow effect, which has an effective infinite spawning area\. Default value: false |
| Air Resistance | Particles behave as if encountering resistance and slow down over time\. Valid values: `0+`Default value: `0`  |
| Gravity Scale | Applies multiple of world gravity to particles\. Set most physicalized particles to 1 \(use air resistance to provide drag\)\. Set the parameter to a negative value for buoyant particles such as smoke\. Valid values: anyDefault value: `0`, `0`, `0` |
| Turbulence 3D Speed | Adds a 3D, random, turbulent movement to the particle, with the specified average speed\. Valid values: `0+`Default value: `0` |
| Turbulence Size | Adds a spiral movement to the particle, with the specified radius\. Set the axis of the spiral from the particle's velocity\. Valid values: `0+`  |
| Turbulence Speed | When Turbulence Size is greater than 0, specifies the angular speed, in degrees/second, of the spiral motion\. Valid values: anyDefault value: `0` |
| Target Attraction | Specifies how particles behave if the emitter is attached to a target\. By default, all particles are attracted to any target to which the emitter is linked\. These parameters customize that behavior\.[\[See the AWS documentation website for more details\]](/docs/userguide/particles/editor/reference-movement)Valid values: anyDefault value: `0` |