---
linkTitle: PhysX Shape Collider
title: PhysX Shape Collider Component
description: The PhysX Shape Collider component adds a PhysX collider that utilizes a shape component to an entity so that the entity can be included in PhysX simulation.
toc: true
---

The **PhysX Shape Collider** component creates a NVIDIA PhysX simulation collider based on the shape definition supplied by a **Shape** component. The PhysX Shape Collider component can also define a trigger area or a force region. 

{{< note >}}
The PhysX Shape Collider component attached to an entity by itself creates a *static* (non-moving) entity. Add a [PhysX Rigid Body](/docs/user-guide/components/reference/physx/rigid-body/) component with a PhysX Shape Collider component to create a *dynamic* or a *kinematic* entity. Dynamic colliders have simulated movement in response to collisions and forces. Kinematic colliders aren't affected by collisions or forces, but are driven by scripted movement.
{{< /note >}}

## Provider

[PhysX Gem](/docs/user-guide/gems/reference/physics/nvidia/physx/)

## Dependencies

The PhysX Shape Collider requires one of the following Shape components:

* [Box Shape](/docs/user-guide/components/reference/shape/box-shape/)
* [Capsule Shape](/docs/user-guide/components/reference/shape/capsule-shape/)
* [Cylinder Shape](/docs/user-guide/components/reference/shape/cylinder-shape/)
* [Polygon Prism Shape](/docs/user-guide/components/reference/shape/polygon-prism-shape/)
* [Sphere Shape](/docs/user-guide/components/reference/shape/sphere-shape/)

## Use cases

Although the PhysX Shape Collider is similar to the [PhysX Collider](/docs/user-guide/components/reference/physx/collider/) component, you might prefer to use the PhysX Shape Collider in these scenarios:

* The shape information defined by the Shape component is used elsewhere in code or script. For example, the shape defines another volume, such as an audio volume or fog volume, and you want to keep the collider geometry and volume synchronized.
* You want to use a Shape component such as [Polygon Prism Shape](/docs/user-guide/components/reference/shape/polygon-prism-shape/) that is not provided by PhysX Collider.
* You have existing Shape components and don't want to migrate them to use PhysX Collider components.

## Limitations

The PhysX Shape Collider component has some limitations compared to the PhysX Collider component:

* Only one Shape component can be used per entity, and so only one PhysX Shape Collider component is supported per entity. Any number of PhysX Collider components can also be used on the same entity, however.
* The position and rotation of the PhysX Shape Collider component can't be offset relative to the entity position.

## Properties 

![PhysX Shape Collider component interface](/images/user-guide/components/reference/physx/ui-shape-collider-a.png)

| Property | Description | Value | Default |
| - | - | - | - |
| **Collision Layer** | The collision layer that's assigned to the collider. | Any collision layer | `Default` |
| **Collides With** | The collision group containing the layers that this collider collides with. | Any collision group | `All` |
| **Trigger** | Make this collider a trigger. A trigger performs a quick overlap test and does not apply forces or return contact point information. Use this to speed up PhysX computations where a simple overlap between colliders is sufficient. Triangle meshes are not supported as triggers. | Boolean | `Off` |
| **Simulated** | Include this collider in the PhysX simulation. | Boolean | `On` |
| **In Scene Queries** | Allow this collider can be queried for raycasts, shapecasts, and overlap. | Boolean | `On` |
| **Library (Physics Materials)** | The physics material library of the project. | `.physmaterial` | The global `.physmaterial` asset |
| **Slots (Physics Materials)** | Choose a physics material for each material of this collider. Physics materials define physical properties for the surface such as dynamic and static friction, and density. A collider can have multiple physics materials assigned. | Physics material from the assigned `.physmaterial` | `<Default Physics Material>` |
| **Tag** | Set a tag for this collider. Tags can be used to quickly identify components in script or code. | String |  |
| **Rest offset** | PhysX bodies come to rest separated by the sum of their **Rest offset** values. The **Rest offset** value must be less than the **Contact offset** value. | `-Infinity` to `50.0` | `0.0` |
| **Contact offset** | PhysX bodies generate contacts when they are within the sum of their **Contact offset** values. The **Contact offset** value must be greater than the **Rest offset** value. | `0.0` to `50.0` | `0.02` |
| **Draw Collider** | Render the collider in the viewport. | Boolean | `On` |

## Complex polygon prism shapes 

The [Polygon Prism Shape](/docs/user-guide/components/reference/shape/polygon-prism-shape/) is automatically subdivided into convex portions, which means that polygon prisms can be used with dynamic rigid bodies or as triggers in PhysX. The subdivision is automatically updated if the vertices of the polygon prism are modified.

![A complex polygon prism can't be converted to convex geometry.](/images/user-guide/components/reference/physx/ui-shape-collider-b.png)

If the vertices are modified so that the polygon prism is no longer a simple polygon, it isn't possible to subdivide the polygon prism into convex pieces. In the example image above, the polygon prism is self-intersecting. If the polygon prism can't be subdivided into convex pieces, an error will display in the Editor Console, as shown in the following example.

![A complex polygon prism console error.](/images/user-guide/components/reference/physx/ui-shape-collider-c.png)

## Colliders as triggers 

Triggers allow colliders to perform efficient overlap tests. Colliders marked as triggers won't have forces applied when they intersect with another collider. This is useful for detecting when something enters a certain area or when two objects overlap. Use Lua or **Script Canvas** to detect overlap.

{{< note >}}
Because triggers don't perform contact resolution, the contact points between a trigger and another collider aren't available.
Triangle meshes are not supported as triggers.
{{< /note >}}
