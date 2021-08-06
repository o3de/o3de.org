---
description: ' Learn about the Open 3D Engine Blast Family component. '
title: Blast Family component
---

{{< preview-migrated >}}


With the **Blast Family** component, you can enable destruction simulation using the NVIDIA Blast library, and set properties for the simulation. The **Blast Family** component is used with the **Blast Family Mesh Data** component. This topic describes the properties of the **Blast Family** component.

The **Blast Family** component is provided by the [NVIDIA Blast gem](/docs/user-guide/gems/reference/physics/nvidia/nvidia-blast/).

For information on using the **Blast Family** component see [Simulated destruction with NVIDIA Blast](/docs/user-guide/interactivity/physics/nvidia-blast/).

## Blast Family component properties 

![\[Properties of the Blast Family component\]](/images/user-guide/physx/blast/ui-blast-family-component.png)

**Blast Asset**
The blast asset that will be used for the destruction simulation.

**Blast Material**
A blast material from the blast material library. Blast materials define how much damage various forces cause to the bonds holding the fractured asset together, and how much damage is required to trigger destruction. For more information, see [Specify destruction properties with Blast materials](/docs/user-guide/interactivity/physics/nvidia-blast/materials/).

**Physics Material**
The physics material for the blast asset. Physics materials define physical properties such as friction.

**Collision Layer**
The collision layer for this **Blast Family**.

**Collides With**
The collision group containing the layers that this **Blast Family** collides with.

**Simulated**
When enabled, this **Blast Family**'s collision will be part of the PhysX simulation.

**In Scene Queries**
When enabled, this **Blast Family**'s colliders will be available for scene queries.

**CCD Enabled**
When enabled, this **Blast Family** will use continuous collision detection. **CCD** is useful for ensuring accurate collision detection for high-speed objects.

**Tag**
Set a tag for this **Blast Family**. Tags can be used to quickly identify components in script or code.
