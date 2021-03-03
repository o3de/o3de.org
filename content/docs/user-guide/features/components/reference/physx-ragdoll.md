---
description: ' Use the PhysX Ragdoll component to create a physical representation
  of a character in the Open 3D Engine Animation Editor . '
title: PhysX Ragdoll
---
# PhysX Ragdoll {#component-physx-ragdoll}

You can use the **PhysX Ragdoll** component to create a physical representation of a character in the animation system and to simulate certain behaviors, such as hit reactions and character death\. The physical representation consists of a hierarchy of rigid bodies with simple shapes that are connected by joints\. You can adjust the ragdoll settings as needed for physical plausibility and performance\.

The **PhysX Ragdoll** component requires the [PhysX Characters](/docs/user-guide/features/gems/physx-characters.md) gem\.

For more information about the PhysX system, see [Simulating physics behavior with the PhysX system](/docs/user-guide/features/interactivity/physics/nvidia-physx/intro.md)\.

## Using the PhysX Ragdoll Component {#physx-ragdoll-using-the-component}

You use the PhysX system and the **Animation Editor** to create a ragdoll\.

**To use the PhysX Ragdoll component**

1. In Lumberyard Editor, add the **PhysX Ragdoll** component to an entity that represents a character\. For more information, see [Adding Components to an Entity](/docs/userguide/components/working-adding.md)\.

1. Choose **Tools**, **Animation Editor**\.

1. Use the **Animation Editor** to create and control the physical representation of the ragdoll\. For more information, see [Creating and Simulating a PhysX Ragdoll](/docs/user-guide/features/visualization/animation/animation-editor/creating-and-simulating-physx-ragdoll.md)\.

## PhysX Ragdoll Component Properties {#physx-ragdoll-component-properties}

![\[PhysX Ragdoll component properties.\]](/images/user-guide/component/physx/ui-physx-ragdoll-component-properties-1.27.png)


****

| Property | Description |
| --- | --- |
| Position Iteration Count |  Specifies the number of iterations to use for joint stability and accuracy\.  A higher iteration count produces more realistic behavior but decreases performance\.  A lower iteration count may result in unrealistic behavior, such as joints separating and parts of the ragdoll intersecting with the terrain\. Default: `16` Valid values: `1` to `255`  |
| Velocity Iteration Count |  Specifies the number of iterations to use for resolving collisions, such as restitution \(bounciness\) and rigid body intersection\.  A higher iteration count resolves collisions based on the material settings but decreases performance\.  Use a lower iteration count to reduce the restitution for your ragdoll\. Default: `8` Valid values: `1` to `255`  |
| Enable Joint Projection |  If set, joint projection preserves joint constraints in demanding situations, such as parts of the ragdoll moving energetically\. This setting may improve physical plausibility\. Enabled by default\.  |
| Joint Projection Linear Tolerance |  The maximum linear deviation that the PhysX system allows in each joint\. Values less than `0.001` meters are not recommended due to jittering\.  To edit this property, you must set the **Enable Joint Projection** property\. Default: `0.001`  |
| Joint Projection Angular Tolerance |  Maximum angular deviation that the PhysX system allows in each joint\. Values less than `1` degree are not recommended due to jittering\.  To edit this property, you must set the **Enable Joint Projection** property\. Default: `1`  |