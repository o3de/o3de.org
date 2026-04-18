---
linkTitle: Particle Component
description: 'Particle Component'
title: Particle Component
---

The Particle Component is a O3DE Component added by the Open Particle System Gem

![Particle Component Image](/images/user-guide/visualization/particles/particle-component.png)

It contains the following fields:

**Asset**
Assign an asset created using the [Particle Editor](../particle-editor) to select which effect to use.

**Enable**
You can turn a particle effect off entirely (and have it ignore bus messages to play it by setting this to **OFF**)

**FollowActiveCam**
If set to **ON**, the particles will always spawn relative to the actual active camera's location and orientation, ignoring the actual entity they are attached to.

**AutoPlay**
If set to **ON**, the particle will emit immediately when the entity spawns with the component on it, without having to be triggered by an EBus message.



