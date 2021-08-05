---
linkTitle: PhysX Collider
title: PhysX Collider component
description: The PhysX Collider component adds a PhysX collider to an entity so that the entity can be included in PhysX simulation.
toc: true
---

The **PhysX Collider** component adds a PhysX collider to an entity so that the entity can be included in PhysX simulation. The collider can be defined by a mesh you create, automatically generated convex meshes, shapes that have been automatically fit to a decomposed mesh, or a simple shape primitive selected in the the PhysX Collider component. The PhysX Collider component can also define a trigger area or a force region.

{{< note >}}
The PhysX Collider component attached to an entity by itself creates a *static* (non-moving) entity. Add a [PhysX Rigid Body](/docs/user-guide/components/reference/physx/rigid-body/) component with a PhysX Collider component to create a *dynamic* or a *kinematic* entity. Dynamic colliders have simulated movement in response to collisions and forces. Kinematic colliders aren't affected by collisions or forces, but are driven by scripted movement. The PhysX Rigid Body component requires either a primitive shape collider or convex mesh collider. Triangle mesh colliders only work with static entities.
{{< /note >}}

## Provider

[PhysX Gem](/docs/user-guide/gems/reference/physics/nvidia/physx/)

## Properties 

![PhysX Collider component interface.](/images/user-guide/components/reference/physx/ui-collider-a.png)

### Base Properties

| Property | Description | Value | Default |
| - | - | - | - |
| **Collision Layer** | The collision layer that's assigned to the collider. | Any collision layer | `Default` |
| **Collides With** | The collision group containing the layers that this collider collides with. | Any collision group | `All` |
| **Trigger** | Make this collider a trigger. A trigger performs a quick overlap test and does not apply forces or return contact point information. Use this to speed-up PhysX computations where a simple overlap between colliders is sufficient. Triangle meshes are not supported as triggers. | Boolean | `On` |
| **Simulated** | Include this collider in the physics simulation. | Boolean | `On` |
| **In Scene Queries** | Allow this collider can be queried for raycasts, shapecasts, and overlap. | Boolean | `On` |
| **Offset** | Local offset position of the collider, relative to the entity. | Vector position | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Rotation** | Local rotation of the collider about the **Offset** of the PhysX collider component. | Vector rotation | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Library (Physics Materials)** | The physics material library of the project. | `.physmaterial` | The global `.physmaterial` asset |
| **Slots (Physics Materials)** | Choose a physics material for each material of this collider. Physics materials define physical properties for the surface such as dynamic and static friction, and density. A collider can have multiple physics materials assigned. | Physics material from the assigned `.physmaterial` | `<Default Physics Material>` |
| **Tag** | Set a tag for this collider. Tags can be used to quickly identify components in script or code. | String |  |
| **Rest offset** | PhysX bodies come to rest separated by the sum of their **Rest offset** values. The **Rest offset** value must be less than the **Contact offset** value. | `-Infinity` to `50.0` | `0.0` |
| **Contact offset** | PhysX bodies generate contacts when they are within the sum of their **Contact offset** values. The **Contact offset** value must be greater than the **Rest offset** value. | `0.0` to `50.0` | `0.02` |
| **Shape** | A collider can be a primitive shape or a physics asset. Primitive shape colliders are not meshes. They are defined by simple dimension parameters that describe a box, sphere, or capsule. Primitive shape colliders are high performance, but they may not accurately represent the surface of the mesh provided by a **Mesh** component. Physics asset colliders are based on meshes that are processed by **Asset Processor**. Physics asset colliders can more accurately represent the shape of the mesh provided by a Mesh component, with a higher performance cost over primitive shapes. | `PhysicsAsset`, `Sphere`, `Box`, `Capsule` | `PhysicsAsset` |
| **Draw Collider** | Render the collider in the viewport. | Boolean | `On` |
| **Edit** | Enter collider component edit mode to adjust properties of the collider with manipulators in the viewport. |  |  |

### PhysicsAsset shape properties

![PhysX Collider component interface, Physics Asset.](/images/user-guide/components/reference/physx/ui-collider-b.png)

| Property | Description | Value | Default |
| - | - | - | - |
| **PhysX Mesh** | Assign a physics asset to the collider. For more information, refer to [FBX Settings PhysX export](/docs/user-guide/assets/fbx-settings/physx-export/). | PhysX mesh |  |
| **Asset Scale** | Scale the collider shape independent of the entity. | Vector Scale | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Physics Materials from Asset** | The physics materials for this collider are automatically set based on the Physics Materials from the mesh's PhysX asset (refer to [FBX Settings PhysX tab](/docs/user-guide/assets/fbx-settings/settings-physx-tab/)). If the physics material doesn't exist in the **Physics Materials - Library**, the default physics material from will be used. Physics material assignments cannot be edited while this option is on. | Boolean | `On`|

### Sphere shape properties

![PhysX Collider component interface, Sphere.](/images/user-guide/components/reference/physx/ui-collider-c.png)

| Property | Description | Value | Default |
| - | - | - | - |
| **Radius** | Defines the size of the sphere primitive shape collider. | `0.0` to `Infinity`  | `0.5` |

### Box shape properties

![PhysX Collider component interface, Box.](/images/user-guide/components/reference/physx/ui-collider-d.png)

| Property | Description | Value | Default |
| - | - | - | - |
| **Dimensions** | Defines the width, depth, and height of the box primitive shape collider. | Vector scale | X:`1.0`, Y:`1.0`, Z:`1.0` |

### Capsule shape properties

![PhysX Collider component interface, Capsule.](/images/user-guide/components/reference/physx/ui-collider-e.png)

| Property | Description | Value | Default |
| - | - | - | - |
| **Height** | Defines the size of the capsule primitive shape collider. The **Height** property value of the capsule must be at least twice the **Radius** property value. For example, if the **Radius** of the capsule is `5.0`, the minimum **Height** is `10.0`. | `0.0` to `Infinity` | `1.0` |
| **Radius** | Defines the width and the hemispheres at either end of the capsule primitive shape collider. The **Radius** property value of the capsule must be no greater than half the **Height** property value. For example, if the **Height** of the capsule is `10.0`, the maximum **Radius** is `5.0`. | `0.0` to `Infinity` | `0.25` |

## Collider component edit mode 

In collider component edit mode, you can edit colliders with manipulators in the viewport. To enter collider component edit mode, choose the **Edit** button at the bottom of the PhysX Collider component properties in **Entity Inspector**. There are three editing modes available in collider component mode: [Resize mode](#resize-mode), [Offset mode](#offset-mode), and [Rotate mode](#rotate-mode).

### Resize mode

Resize mode scales the collider. The manipulator displayed in the viewport in resize mode is dependent on the collider shape. For primitive shape colliders, the resize manipulator handles are represented as black squares. For PhysicsAsset colliders, the resize manipulator is represented as a familiar scale manipulator.

#### Resize Sphere shape

Sphere resize mode has one linear manipulator that modifies the **Radius** property.

![PhysX Collider component mode sphere resize manipulator](/images/user-guide/components/reference/physx/ui-collider-f.png)

#### Resize Box shape

Box resize mode has six linear manipulators, one on each side of the box. The manipulators modify the **Dimensions** property.

![PhysX Collider component mode box resize manipulator](/images/user-guide/components/reference/physx/ui-collider-g.png)

#### Resize Capsule shape

Capsule resize mode has two linear manipulators. The manipulator at the top of the capsule modifies the **Height** property. The manipulator on the side modifies the **Radius** property.

![PhysX Collider component mode capsule resize manipulator](/images/user-guide/components/reference/physx/ui-collider-h.png)

#### Resize PhysicsAsset shape

Physics Asset resize mode has a three axis scale manipulator that modifies the **Asset Scale** property.

![PhysX Collider component mode Physics Asset resize manipulator](/images/user-guide/components/reference/physx/ui-collider-i.png)

### Offset mode

Offset mode translates the collider relative to its entity transform. Offset mode has a three axis translate manipulator that modifies the **Offset** property.

![PhysX Collider component mode offset manipulator](/images/user-guide/components/reference/physx/ui-collider-j.png)

### Rotate mode

Rotation mode rotates the collider about the component's **Offset**. Rotation mode has a three axis rotate manipulator that modifies the **Rotation** property.

![PhysX Collider component mode rotate manipulator](/images/user-guide/components/reference/physx/ui-collider-k.png)

### Component mode keyboard shortcuts

The following keyboard shortcuts are available in collider component edit mode.

| Keyboard shortcut | Action |
| - | - |
| **1** | Resize mode |
| **2** | Offset mode |
| **3** | Rotation mode |
| **CTRL + Mouse Wheel Up** | Next mode |
| **CTRL + Mouse Wheel Down** | Previous mode |
| **R** | Reset current mode. This is effectively an undo operation. You can step through the Resize, Offset, and Rotation modes and press R to reset changes to the current mode. |
| **Escape** | Exit component mode |

## Colliders as triggers 

Triggers allow colliders to perform efficient overlap tests. Colliders marked as triggers won't have forces applied when they intersect with another collider. This is useful for detecting when something enters a certain area or when two objects overlap. Use Lua or **Script Canvas** to detect overlap.

{{< note >}}
Because triggers don't perform contact resolution, the contact points between a trigger and another collider aren't available.
Triangle meshes are not supported as triggers.
{{< /note >}}
