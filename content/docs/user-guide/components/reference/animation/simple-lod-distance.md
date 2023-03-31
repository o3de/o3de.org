---
linkTitle: Simple LOD Distance
title: Simple LOD Distance Component
description: Use the Simple LOD Distance component to set the distance for each actor LOD in Open 3D Engine (O3DE).
---

The **Simple LOD Distance** component allows you to set the distance and motion sample rate for each level of detail (LOD) of an actor. It requires an **Actor** component that references an actor asset with at least one LOD mesh group in addition to the base actor mesh group.

The Simple LOD Distance component automatically creates an element in the **LOD distance (Max)** and **Anim graph sample rates** lists for each LOD found in the actor asset. Up to six LODs are supported including the base mesh group. You can set a display distance in meters and a motion sample rate (per second) for each LOD mesh group.

For more information on actor LODs, refer to the topic [Using Actor LODs to Optimize Performance](/docs/user-guide/visualization/animation/using-actor-lods-optimize-game-performance/).

## Provider

[EMotionFX](/docs/user-guide/gems/reference/animation/emotionfx)

## Dependencies

* [Actor component](actor)
* An actor asset with a base mesh group and at least one LOD mesh group.

## Simple LOD Distance properties

![Add the Simple LOD Distance component to an entity to set display distances for each LOD mesh group.](/images/user-guide/components/reference/animation/simple-lod-distance-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **LOD distance (Max)** | Sets the max display distance for each LOD of the actor. The distance value is in meters (world units) from the camera. Index 0 is the base mesh group for the actor. | 0 to Infinity | Depends on the LOD index. |
| **Enable LOD anim graph sampling** | Enable per LOD animation sample rates. When enabled, the **Anim graph sample rate** list is displayed with one element per LOD. | Boolean | `Disabled` |
| **Anim graph sample rate** | Sets the animation sample rate (per second) for each LOD. Index 0 is the base mesh group for the actor. Setting an LOD's sample rate to `0` maximizes the sample rate, so that animation is sampled as many times as possible per second for the LOD. Any non-zero value specifies a maximum animation sample rate for the LOD. Lower values that are greater than `0` provide better performance. Higher values (or `0`) might decrease performance but produce smoother animation. | 0 to Infinity | Depends on the LOD index. |
