---
linkTitle: PhysX Heightfield Collider
title: PhysX Heightfield Collider Component
description: Use the PhysX Heightfield Collider component to create collision for heightfields such as terrain in Open 3D Engine (O3DE).
toc: true
---

The **PhysX Heightfield Collider** component creates NVIDIA PhysX simulation collider geometry based on the shape definition supplied by an [Axis-Aligned Box Shape](/docs/user-guide/components/reference/shape/axis-aligned-box-shape/) component.

{{< note >}}
The PhysX Heightfield Collider component attached to an entity with an **Axis-Aligned Box Shape component** and a **Terrain Physics Collider** creates a static (non-moving) entity.
{{< /note >}}

## Provider

[PhysX](/docs/user-guide/gems/reference/physics/nvidia/physx/)

## Dependencies

[Axis-Aligned Box Shape](/docs/user-guide/components/reference/shape/axis-aligned-box-shape)

## PhysX Heightfield Collider properties 

![\[PhysX Heightfield Collider component interface.\]](/images/user-guide/component/physx/physx/ui-physx-heightfield-collider-A.png)

| Property | Description | Values | Default |
| - | - | - | - |
| Collision Layer | The collision layer that's assigned to this collider. For more information, see [Collision Layers](/docs/user-guide/interactivity/physics/nvidia-physx/configuring/configuration-collision-layers/). | Collision layer | `Default` |
| Collides With | The collision group containing the layers that this collider collides with. For more information, see [Collision Groups](/docs/user-guide/interactivity/physics/nvidia-physx/configuring/configuration-collision-groups/). | Collision group | `All` |
| Tag |  Set a tag for this heightfield collider. Tags can be used to quickly identify components in script or code. | String | |
| Rest offset |  PhysX bodies come to rest separated by the sum of their rest offset values. The **Rest offset** value must be less than the **Contact offset** value. | -Infinity to `50.0` | `0.0` |
| Contact offset | PhysX bodies generate contacts when they are within the sum of their contact offset values. The **Contact offset** value must be greater than the **Rest offset** value. | `0.0` to `50.0` | `0.02` |
| Draw collider |  Render this heightfield collider in the viewport. Disabled by default. | Boolean | `Disabled` |
| Use Baked Heightfield |  Selects between a dynamically generated or a baked heightfield. A baked heightfield can't be modified at runtime. A dynamic heightfield can be modified at runtime by changes to the heightfield provider. Disabled by default. | Boolean | `Disabled` |
| Baked Heightfield Relative Path |  Read-only field displaying the path to the generated baked heightfield asset. | String | |
| Bake Heightfield | Bakes the heightfield asset. | - | - |

## Colliders as triggers 

Triggers allow colliders to perform efficient overlap tests. Colliders marked as triggers won't have forces applied when they intersect with another collider. This is useful for detecting when something enters a certain area or when two objects overlap. Use Lua or Script Canvas to detect overlap.

{{< note >}}
Because triggers don't perform contact resolution, the contact points between a trigger and another collider aren't available.
{{< /note >}}

## Console variables

There are following console variables available for PhysX Heightfield Collider:

| Name | Description | Values | Default |
| - | - | - | - |
| physx_heightfieldDebugDrawDistance | Distance for PhysX Heightfields debug visualization | Float | 50.0 |
| physx_heightfieldDebugDrawBoundingBox | Draw the bounding box used for heightfield debug visualization | Boolean | False |
