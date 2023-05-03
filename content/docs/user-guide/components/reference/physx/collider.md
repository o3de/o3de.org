---
linkTitle: PhysX Primitive Collider
title: PhysX Primitive Collider Component
description: The PhysX Primitive Collider component adds a PhysX collider to an entity so that the entity can be included in PhysX simulation.
toc: true
---

The **PhysX Primitive Collider** component adds a PhysX collider to an entity so that the entity can be included in PhysX simulation. The collider is defined by a simple shape primitive selected in the the PhysX Primitive Collider component. The PhysX Primitive Collider component can also define a trigger area or a force region.

{{< note >}}
Add a [PhysX Static Rigid Body](/docs/user-guide/components/reference/physx/static-rigid-body/) component with a PhysX Primitive Collider component to create a *static* entity that will never move. Add a [PhysX Dynamic Rigid Body](/docs/user-guide/components/reference/physx/rigid-body/) component to create a *simulated* or a *kinematic* entity. Simulated entities move in response to collisions and forces. Kinematic entities aren't affected by collisions or forces, but are driven by scripted movement.
{{< /note >}}

## Provider

[PhysX Gem](/docs/user-guide/gems/reference/physics/nvidia/physx/)

## Properties 

![PhysX Primitive Collider component interface.](/images/user-guide/components/reference/physx/physx-collider-ui-01.png)

### Base properties

| Property | Description | Value | Default |
| - | - | - | - |
| **Collision Layer** | Assigns the collider to a collision layer. Collision layers can be used to restrict physical interactions between PhysX objects. | Any collision layer defined in the project's [Collision Layers](/docs/user-guide/interactivity/physics/nvidia-physx/configuring/configuration-collision-layers/).  | `Default` |
| **Collides With** | Assigns the collider to a collision group. Collision groups contain the collision layers that this collider can collide with. | Any collision group defined in the project's [Collision Groups](/docs/user-guide/interactivity/physics/nvidia-physx/configuring/configuration-collision-groups/). | `All` |
| **Trigger** | If enabled, this collider functions as a trigger. Triggers perform quick overlap tests with other colliders. Triggers don't apply forces or return contact point information. Use this to speed up PhysX computations in which a simple overlap test between colliders is sufficient. | Boolean | `Disabled` |
| **Simulated** | If enabled, this collider is included in the physics simulation. | Boolean | `Enabled` |
| **In Scene Queries** | If enabled, this collider can be queried for raycasts, shapecasts, and overlap. | Boolean | `Enabled` |
| **Offset** | Sets the collider's local offset position relative to the entity. | Vector3: -Infinity to Infinity | X: `0.0`, Y: `0.0`, Z: `0.0` |
| **Rotation** | Sets a local rotation for the collider around the **Offset** of the PhysX Primitive collider component. | Vector3: -180.0 to 180.0 | X: `0.0`, Y: `0.0`, Z: `0.0` |
| **Physics Materials** | Choose a physics material for each material of this collider. Physics materials define physical properties for the surface such as dynamic and static friction, and density. A primitive collider has a single physics material for the entire collider. | A `.physxmaterial` asset assigned. | `(default)` |
| **Tag** | Sets a tag for this collider. Tags can be used to quickly identify components in script or code. | String | None |
| **Rest offset** | Sets the minimum distance between this collider and other colliders. Although this property applies to all colliders, it is particularly important for dynamic colliders. Dynamic colliders are at rest when the forces affecting them drop below the **Sleep threshold** of their rigid body component. When a dynamic collider comes to rest while in contact with any other collider, the colliders are separated by the sum of their **Rest offset** values. **Rest offset** values that are too large might make dynamic entities appear to float. Negative **Rest offset** values might make dynamic entities appear to intersect. You might need to adjust this value in scenarios where the collider does not closely match the render mesh of the entity. The **Rest offset** value must be less than the **Contact offset** value. | Float: -Infinity to 50.0 | `0.0` |
| **Contact offset** | Sets the distance from the collider where collisions are detected. PhysX bodies generate contacts when they are within the sum of their **Contact offset** values. The **Contact offset** value must be greater than the **Rest offset** value. | Float: 0.0 to 50.0 | `0.02` |
| **Shape** | See [Shape properties](#shape-properties) | `Sphere`, `Box`, `Capsule`, `Cylinder` | `Box` |
| **Draw Collider** | If enabled, the collider is displayed in the viewport. | Boolean | `Enabled` |
| **Edit** | Enter collider component edit mode to adjust properties of the collider with manipulators in the viewport. |  |  |

### Shape properties
Sets the collider for the collider component. Primitive shape colliders are not meshes. They are defined by simple dimension parameters that describe a box, sphere, capsule or cylinder. Primitive shape colliders are high performance, but they may not accurately represent the surface of the mesh provided by a **Mesh** component.

{{< tabs name="shape-ui" >}}
{{% tab name="Sphere" %}}

![PhysX Primitive Collider component interface, Sphere.](/images/user-guide/components/reference/physx/physx-collider-ui-03.png)

| Property | Description | Value | Default |
| - | - | - | - |
| **Radius** | Radius multiplier of the sphere collider. The size of the sphere primitive is the **Radius** value multiplied by the largest value in the **Scale** property in the entity's [Transform](/docs/user-guide/components/reference/transform/) component. | Float: 0.0 to Infinity | `0.5` |

{{% /tab %}}
{{% tab name="Box" %}}

![PhysX Primitive Collider component interface, Box.](/images/user-guide/components/reference/physx/physx-collider-ui-04.png)

| Property | Description | Value | Default |
| - | - | - | - |
| **Dimensions** | Width, depth, and height of the box collider. | Vector3: 0.0 to Infinity | X: `1.0`, Y: `1.0`, Z: `1.0` |

{{% /tab %}}
{{% tab name="Capsule" %}}

![PhysX Primitive Collider component interface, Capsule.](/images/user-guide/components/reference/physx/physx-collider-ui-05.png)

| Property | Description | Value | Default |
| - | - | - | - |
| **Height** | Height of the capsule collider. The **Height** value of the capsule must be at least twice the **Radius** value. For example, if the **Radius** of the capsule is `5.0`, the minimum **Height** is `10.0`. | Float: 0.0 to Infinity | `1.0` |
| **Radius** | Radius of the capsule collider. The **Radius** value of the capsule must be no greater than half the **Height** value. For example, if the **Height** of the capsule is `10.0`, the maximum **Radius** is `5.0`. | Float: 0.0 to Infinity | `0.25` |

{{% /tab %}}
{{% tab name="Cylinder" %}}

![PhysX Primitive Collider component interface, Cylinder.](/images/user-guide/components/reference/physx/physx-collider-ui-06.png)

| Property | Description | Value | Default |
| - | - | - | - |
| **Subdivision** | Cylinder subdivision count. | Int: `3` to `125` | `16` |
| **Height** | Height of the cylinder collider. | Float: 0.0 to Infinity | `1.0` |
| **Radius** | Radius of the cylinder collider. | Float: 0.0 to Infinity | `1.0` |

{{% /tab %}}
{{< /tabs >}}

## Collider component mode

In collider component mode, you can edit colliders with manipulators in the viewport. To enter collider component mode, choose the **Edit** button at the bottom of the PhysX Primitive Collider component properties in the **Entity Inspector**.

### Sub component modes

There are three editing modes available in collider component mode.

| Mode | Description |
| - | - |
| **Resize** | Edits the collider dimensions. The resize manipulator handles are represented as black squares. |
| **Offset** | Translates the collider relative to its entity transform. |
| **Rotation** | Rotates the collider around the component's **Offset**. |

### Resize (Sphere Shape)

Sphere resize mode has one linear manipulator that controls the **Radius** property.

![PhysX Primitive Collider component mode sphere resize manipulator](/images/user-guide/components/reference/physx/physx-collider-resize-sphere.png)

### Resize (Box Shape)

Box resize mode has six linear manipulators, one on each side of the box. The manipulators control the width, depth, and height **Dimensions** property.

![PhysX Primitive Collider component mode box resize manipulator](/images/user-guide/components/reference/physx/physx-collider-resize-box.png)

### Resize (Capsule Shape)

Capsule resize mode has two linear manipulators. The manipulator at the top of the capsule controls the **Height** property. The manipulator on the side controls the **Radius** property.

![PhysX Primitive Collider component mode capsule resize manipulator](/images/user-guide/components/reference/physx/physx-collider-resize-capsule.png)

### Resize (Cylinder Shape)

Cylinder resize mode has three linear manipulators. The manipulators at the top and bottom of the cylinder control the **Height** property. By default, each end of the cylinder can be separately edited. Hold **Shift** to edit both ends symmetrically. The manipulator on the side controls the **Radius** property.

![PhysX Primitive Collider component mode cylinder resize manipulator](/images/user-guide/components/reference/physx/physx-collider-resize-cylinder.png)

### Offset

Offset mode has a three-axis translate manipulator.

![PhysX Primitive Collider component mode offset manipulator](/images/user-guide/components/reference/physx/physx-collider-offset-mode.png)

### Rotation

Rotation mode has a three-axis rotate manipulator.

![PhysX Primitive Collider component mode rotate manipulator](/images/user-guide/components/reference/physx/physx-collider-rotate-mode.png)

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
{{< /note >}}
