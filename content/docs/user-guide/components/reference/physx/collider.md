---
linkTitle: PhysX Collider
title: PhysX Collider Component
description: The PhysX Collider component adds a PhysX collider to an entity so that the entity can be included in PhysX simulation.
toc: true
---

The **PhysX Collider** component adds a PhysX collider to an entity so that the entity can be included in PhysX simulation. The collider can be defined by a mesh you create, automatically generated convex meshes, shapes that have been automatically fit to a decomposed mesh, or a simple shape primitive selected in the PhysX Collider component. The PhysX Collider component can also define a trigger area or a force region.

{{< note >}}
The PhysX Collider component attached to an entity by itself creates a *static* (non-moving) entity. Add a [PhysX Rigid Body](/docs/user-guide/components/reference/physx/rigid-body/) component with a PhysX Collider component to create a *dynamic* or a *kinematic* entity. Dynamic entities have simulated movement in response to collisions and forces. Kinematic entities aren't affected by collisions or forces, but are driven by scripted movement. For information about the various PhysX collider types and how to process them, refer to [Process PhysX Collider Assets](/docs/learning-guide/tutorials/assets/physx-colliders/).
{{< /note >}}

## Provider

[PhysX Gem](/docs/user-guide/gems/reference/physics/nvidia/physx/)

## Properties 

![PhysX Collider component interface.](/images/user-guide/components/reference/physx/physx-collider-ui-01.png)

### Base properties

| Property | Description | Value | Default |
| - | - | - | - |
| **Collision Layer** | Assigns the collider to a collision layer. Collision layers can be used to restrict physical interactions between PhysX objects. | Any collision layer defined in the project's [Collision Layers](/docs/user-guide/interactivity/physics/nvidia-physx/configuring/configuration-collision-layers/).  | `Default` |
| **Collides With** | Assigns the collider to a collision group. Collision groups contain the collision layers that this collider can collide with. | Any collision group defined in the project's [Collision Groups](/docs/user-guide/interactivity/physics/nvidia-physx/configuring/configuration-collision-groups/). | `All` |
| **Trigger** | If enabled, this collider functions as a trigger. Triggers perform quick overlap tests with other colliders. Triggers don't apply forces or return contact point information. Use this to speed up PhysX computations in which a simple overlap test between colliders is sufficient. Triangle meshes are not supported as triggers. | Boolean | `Disabled` |
| **Simulated** | If enabled, this collider is included in the physics simulation. | Boolean | `Enabled` |
| **In Scene Queries** | If enabled, this collider can be queried for raycasts, shapecasts, and overlap. | Boolean | `Enabled` |
| **Offset** | Sets the collider's local offset position relative to the entity. | Vector3: -Infinity to Infinity | X: `0.0`, Y: `0.0`, Z: `0.0` |
| **Rotation** | Sets a local rotation for the collider around the **Offset** of the PhysX collider component. | Vector3: -180.0 to 180.0 | X: `0.0`, Y: `0.0`, Z: `0.0` |
| **Physics Materials** | Choose a physics material for each material of this collider. Physics materials define physical properties for the surface such as dynamic and static friction, and density. A collider can have multiple physics materials assigned. | A `.physxmaterial` asset assigned. | `(default)` |
| **Tag** | Sets a tag for this collider. Tags can be used to quickly identify components in script or code. | String | None |
| **Rest offset** | Sets the minimum distance between this collider and other colliders. Although this property applies to all colliders, it is particularly important for dynamic colliders. Dynamic colliders are at rest when the forces affecting them drop below the **Sleep threshold** of their rigid body component. When a dynamic collider comes to rest while in contact with any other collider, the colliders are separated by the sum of their **Rest offset** values. **Rest offset** values that are too large might make dynamic entities appear to float. Negative **Rest offset** values might make dynamic entities appear to intersect. You might need to adjust this value in scenarios where the collider does not closely match the render mesh of the entity. The **Rest offset** value must be less than the **Contact offset** value. | Float: -Infinity to 50.0 | `0.0` |
| **Contact offset** | Sets the distance from the collider where collisions are detected. PhysX bodies generate contacts when they are within the sum of their **Contact offset** values. The **Contact offset** value must be greater than the **Rest offset** value. | Float: 0.0 to 50.0 | `0.02` |
| **Shape** | See [Shape properties](#shape-properties) | `PhysicsAsset`, `Sphere`, `Box`, `Capsule` | `PhysicsAsset` |
| **Draw Collider** | If enabled, the collider is displayed in the viewport. | Boolean | `Enabled` |
| **Edit** | Enter collider component edit mode to adjust properties of the collider with manipulators in the viewport. |  |  |

### Shape properties
Sets the collider for the collider component. A collider can be a primitive shape or a physics asset. Primitive shape colliders are not meshes. They are defined by simple dimension parameters that describe a box, sphere, or capsule. Primitive shape colliders are high performance, but they may not accurately represent the surface of the mesh provided by a **Mesh** component. Physics asset colliders are based on meshes that are processed by **Asset Processor**. Physics asset colliders can more accurately represent the shape of the mesh provided by a Mesh component, but incur a higher performance cost over primitive shapes. This property is set automatically if a `.pxmesh` product asset exists for the associated mesh or actor asset. For information on processing collider assets, refer to [Process PhysX Collider Assets](/docs/learning-guide/tutorials/assets/physx-colliders/).

{{< tabs name="shape-ui" >}}
{{% tab name="PhysicsAsset" %}}

![PhysX Collider component interface, Physics Asset.](/images/user-guide/components/reference/physx/physx-collider-ui-02.png)

| Property | Description | Value | Default |
| - | - | - | - |
| **PhysX Mesh** | Assigns a `.pxmesh` collider product asset for this collider. For more information on creating PhysX mesh asset colliders, refer to [Process PhysX Collider Assets](/docs/learning-guide/tutorials/assets/physx-colliders/). | Product asset `.pxmesh` PhysX mesh. |  |
| **Asset Scale** | Scales the collider shape independent of the entity. | Vector3: 0.0 to Infinity | X: `1.0`, Y: `1.0`, Z: `1.0` |
| **Physics Materials from Asset** | If enabled, the physics materials for this collider are automatically set based on the Physics Materials from the mesh's PhysX asset. Physics material assignments cannot be edited while this option is enabled. | Boolean | `Enabled`|

{{% /tab %}}
{{% tab name="Sphere" %}}

![PhysX Collider component interface, Sphere.](/images/user-guide/components/reference/physx/physx-collider-ui-03.png)

| Property | Description | Value | Default |
| - | - | - | - |
| **Radius** | Radius multiplier of the sphere collider. The size of the sphere primitive is the **Radius** value multiplied by the largest value in the **Scale** property in the entity's [Transform](/docs/user-guide/components/reference/transform/) component. | Float: 0.0 to Infinity | `0.5` |

{{% /tab %}}
{{% tab name="Box" %}}

![PhysX Collider component interface, Box.](/images/user-guide/components/reference/physx/physx-collider-ui-04.png)

| Property | Description | Value | Default |
| - | - | - | - |
| **Dimensions** | Width, depth, and height of the box collider. | Vector3: 0.0 to Infinity | X: `1.0`, Y: `1.0`, Z: `1.0` |

{{% /tab %}}
{{% tab name="Capsule" %}}

![PhysX Collider component interface, Box.](/images/user-guide/components/reference/physx/physx-collider-ui-05.png)

| Property | Description | Value | Default |
| - | - | - | - |
| **Height** | Height of the capsule collider. The **Height** value of the capsule must be at least twice the **Radius** value. For example, if the **Radius** of the capsule is `5.0`, the minimum **Height** is `10.0`. | Float: 0.0 to Infinity | `1.0` |
| **Radius** | Radius of the capsule collider. The **Radius** value of the capsule must be no greater than half the **Height** value. For example, if the **Height** of the capsule is `10.0`, the maximum **Radius** is `5.0`. | Float: 0.0 to Infinity | `0.25` |

{{% /tab %}}
{{< /tabs >}}

## Collider component mode

In collider component mode, you can edit colliders with manipulators in the viewport. To enter collider component mode, choose the **Edit** button at the bottom of the PhysX Collider component properties in the **Entity Inspector**.

### Sub component modes

There are three editing modes available in collider component mode.

| Mode | Description |
| - | - |
| **Resize** |  Scales the collider. The manipulator displayed in the viewport in resize mode is dependent on the collider shape. For primitive colliders, the resize manipulator handles are represented as black squares. For **Physics Asset** colliders, the resize manipulator is represented as a familiar scale manipulator. |
| **Offset** | Translates the collider relative to its entity transform. |
| **Rotation** | Rotates the collider around the component's **Offset**. |

### Resize (Sphere Shape)

Sphere resize mode has one linear manipulator that controls the **Radius** property.

![PhysX Collider component mode sphere resize manipulator](/images/user-guide/components/reference/physx/physx-collider-resize-sphere.png)

### Resize (Box Shape)

Box resize mode has six linear manipulators, one on each side of the box. The manipulators control the width, depth, and height **Dimensions** property.

![PhysX Collider component mode box resize manipulator](/images/user-guide/components/reference/physx/physx-collider-resize-box.png)

### Resize (Capsule Shape)

Capsule resize mode has two linear manipulators. The manipulator at the top of the capsule controls the **Height** property. The manipulator on the side controls the **Radius** property.

![PhysX Collider component mode capsule resize manipulator](/images/user-guide/components/reference/physx/physx-collider-resize-capsule.png)

### Offset

Offset mode has a three-axis translate manipulator.

![PhysX Collider component mode offset manipulator](/images/user-guide/components/reference/physx/physx-collider-offset-mode.png)

### Rotation

Rotation mode has a three-axis rotate manipulator.

![PhysX Collider component mode rotate manipulator](/images/user-guide/components/reference/physx/physx-collider-rotate-mode.png)

### Resize (Physics Asset Shape)

Physics Asset resize mode has a three-axis scale manipulator.

![PhysX Collider component mode physics asset resize manipulator](/images/user-guide/components/reference/physx/physx-collider-resize-physicsasset.png)

### Collider component mode hotkeys

The following navigation hotkeys are available in collider component mode.

| Hotkey | Action |
| - | - |
| **1** | Offset mode. |
| **2** | Rotation mode. |
| **3** | Resize mode. |
| **Ctrl + Mouse Wheel Down** | Next mode. |
| **Ctrl + Mouse Wheel Up** | Previous mode. |
| **R** | Reset current mode. This is effectively an undo operation. You can step through the Resize, Offset, and Rotation modes and press **R** to reset changes to the current mode. |
| **ESC** | Exit component mode. |

## Colliders as triggers

Triggers allow colliders to perform efficient overlap tests. Colliders marked as triggers won't be affected by forces when they intersect with another collider. This is useful for detecting when something enters a certain area or when two objects overlap. Use Lua or Script Canvas to detect overlap.

{{< note >}}
Because triggers don't perform contact resolution, the contact points between a trigger and another collider aren't available.
Triangle meshes are not supported as triggers.
{{< /note >}}