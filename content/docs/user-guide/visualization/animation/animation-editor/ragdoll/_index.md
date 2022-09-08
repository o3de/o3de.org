---
title: Ragdoll
description: Learn how to use a ragdoll to simulate realistic behaviors of a character in the animation system of Open 3D Engine (O3DE).
---

A ragdoll is a physical representation of a character in the animation system that you can use to simulate behavior, such as hit reactions and character death. The physical representation consists of a hierarchy of rigid bodies with simple shapes that are connected by joints. The animation system and the PhysX system work together to simulate realistic behaviors. While the ragdoll setup occurs in the animation system, the PhysX system is responsible for how a character moves based on environmental interactions and external forces. For example, you can set up your ragdoll so that the character will rotate as it collapses when you apply a force to the character's outer shoulder area.

To use the **[PhysX Ragdoll](/docs/user-guide/components/reference/physx/ragdoll/)** component, add it to an entity in O3DE Editor. You can then follow the procedures below to create and control the physical representation of the ragdoll.

This topic will teach you how to do the following:

+ [Set up the physics configuration for a ragdoll.](/docs/user-guide/visualization/animation/animation-editor/ragdoll/ragdoll-physics-setup.md)
+ [Add the ragdoll to an animation graph.](/docs/user-guide/visualization/animation/animation-editor/ragdoll/ragdoll-adding-to-animation-graph.md)
+ [Simulate a ragdoll in O3DE Editor.](/docs/user-guide/visualization/animation/animation-editor/ragdoll/ragdoll-simulating-in-editor.md)

