---
description: ' Use the PhysX Heightfield Collider component to define where collision
  detection and response occur in Open 3D Engine. '
title: 'PhysX Heightfield Collider'
---

The **PhysX Heightfield Collider** component creates NVIDIA PhysX simulation collider geometry based on the shape definition supplied by an [**Axis-Aligned Box Shape**](/docs/user-guide/components/reference/shape/axis-aligned-box-shape/) component.

**Note**
The **PhysX Heightfield Collider** component attached to an entity with an Axis-Aligned Box Shape component and a Terrain Physics Collider creates a static (non-moving) entity.

To use the PhysX Heightfield Collider component you must enable [PhysX](/docs/user-guide/gems/reference/physics/nvidia/physx/) gem in your project.

For more information, see [Simulating physics behavior with the PhysX system](/docs/user-guide/interactivity/physics/nvidia-physx/).

**Topics**
- [PhysX Heightfield Collider properties](#physx-heightfield-collider-properties)
- [Colliders as triggers](#colliders-as-triggers)

## PhysX Heightfield Collider properties 

![\[PhysX Heightfield Collider component interface.\]](/images/user-guide/component/physx/physx/ui-physx-heightfield-collider-A.png)

****Collision Layer****
The collision layer that's assigned to this collider. For more information, see [Collision Layers](/docs/user-guide/interactivity/physics/nvidia-physx/configuring/configuration-collision-layers/).

****Collides With****
The collision group containing the layers that this collider collides with. For more information, see [Collision Groups](/docs/user-guide/interactivity/physics/nvidia-physx/configuring/configuration-collision-groups/).

****Trigger****
When enabled, this heightfield collider functions as a trigger. A trigger performs a quick overlap test and does not apply forces or return contact point information. Use this to speed up PhysX computations where a simple overlap between colliders is sufficient.
Trigger Area components are legacy components and cannot be used with PhysX Heightfield Collider.

****Simulated****
When enabled, this heightfield collider will be part of the physics simulation.

****In Scene Queries****
When enabled, this heightfield collider can be queried for raycasts, shapecasts and overlap.

****Tag****
Set a tag for this heightfield collider. Tags can be used to quickly identify components in script or code.

****Rest offset****
PhysX bodies come to rest separated by the sum of their rest offset values. The **Rest offset** value must be less than the **Contact offset** value. Valid values rage from **-Infinity** to **50**.

****Contact offset****
PhysX bodies generate contacts when they are within the sum of their contact offset values. The **Contact offset** value must be greater than the **Rest offset** value. Valid values rage from **0** to **50**.

****Draw collider****
Render this heightfield collider in the viewport. Enabled by default.

## Colliders as triggers 

Triggers allow colliders to perform efficient overlap tests. Colliders marked as triggers won't have forces applied when they intersect with another collider. This is useful for detecting when something enters a certain area or when two objects overlap. Use Lua or Script Canvas to detect overlap.

**Note**
Because triggers don't perform contact resolution, the contact points between a trigger and another collider aren't available.
Trigger Area components are legacy components and cannot be used with PhysX Heightfield Collider.
