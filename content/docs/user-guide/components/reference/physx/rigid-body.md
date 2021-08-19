---
linkTitle: PhysX Rigid Body
title: PhysX Rigid Body Component
description: The PhysX Rigid Body component creates a dynamic or kinematic solid object that can move and collide with other PhysX entities.
toc: true
---

The **PhysX Rigid Body** component makes an entity a *dynamic* or *kinematic* solid object that can move and collide with other PhysX entities. The entity must also have at least one [PhysX Shape Collider](/docs/user-guide/components/reference/physx/shape-collider/)  or [PhysX Collider](/docs/user-guide/components/reference/physx/collider/)  component that defines a collider for the entity.

Dynamic rigid bodies are fully simulated by PhysX. Dynamic rigid bodies move in response to collision events and forces and are not animated through motions or scripts. By default, dynamic rigid bodies are affected by gravity, but gravity can be deactivated in the PhysX Rigid Body component.

Kinematic rigid bodies are not fully simulated by PhysX. Kinematic rigid bodies have scripted animation and are not affected by forces or gravity. Doors, for example, often have scripted animation. If the door is a kinematic rigid body, the door can move through scripted animation and collide with other PhysX entities during simulation. Movement is created with the `SetKinematicTarget` method that you specify in a script.

{{< note >}}
You should always add the PhysX Rigid Body component to the top level of an entity hierarchy. Adding the PhysX Rigid Body component to a child entity can cause conflicts with the entity's world transform and result in undefined behavior.
{{< /note >}}

## Provider

[PhysX Gem](/docs/user-guide/gems/reference/physx/)

## Properties 

![PhysX Rigid Body component interface.](/images/user-guide/components/reference/physx/ui-rigid-body.png)

| Property | Description | Value | Default |
| - | - | - | - |
| **Initial linear velocity** | Specifies the starting linear velocity of the rigid body when spawned. This creates movement in the direction of the linear velocity vector. | Vector | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Initial angular velocity** | Specifies the starting angular velocity of the rigid body when spawned. This creates rotation in the direction of the angular velocity vector. | Vector | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Linear damping** | Specifies the rate of decay over time for linear velocity even if no forces are acting on the rigid body. A non-zero value eventually stops the rigid body if no linear force is applied. Value must be non-negative. | `0.0` to `Infinity` | `0.05` |
| **Angular damping** | Specifies the rate of decay over time for angular velocity even if no forces are acting on the rigid body. A non-zero value eventually stops the rigid body if no torque force is applied. Value must be non-negative. | `0.0` to `Infinity`| `0.15` |
| **Sleep threshold** | Specifies the kinetic energy per unit mass below which the rigid body can go to sleep. Value must be non-negative. | `0.0` to `Infinity` | `0.005` |
| **Start asleep** | The Rigid Body component is asleep when the entity is spawned, and will wake when a sufficient force is applied. | Boolean | `Off` |
| **Interpolate motion** | Smooth the resulting motion from the simulation. Activate this property for objects that require smooth motion such as vehicles.  | Boolean | `Off` |
| **Gravity enabled** | The rigid body is affected by gravity. This only applies to dynamic rigid bodies. | Boolean | `On` |
| **Kinematic** | Activate to make the rigid body kinematic. A kinematic rigid body is not affected by gravity or other forces and is moved by script. When deactivated, the rigid body is dynamic. A dynamic rigid body responds to collision events and forces, and its motion is simulated by PhysX. | Boolean | `Off` |
| **CCD enabled** | Activate for continuous collision detection (CCD). This property is useful for high speed objects to ensure accurate collision detection. Activating this property reveals two additional properties, **Min advance coefficient** and **CCD Friction**. To use continuous collision detection, you must also activate **Continuous Collision Detection** in the **PhysX Configuration** window. For more information, refer to [Global Configuration](/docs/user-guide/interactivity/physics/nvidia-physx/configuring/configuration-global/#physx-configuration-global-world). | Boolean | `Off` |
| **Min advance coefficient** | Fine tune continuous collision detection. Lower values reduce clipping but can affect motion smoothness. | `0.01` and `0.99` | `0.15` |
| **CCD friction** | Applies friction when CCD collisions are resolved. | Boolean | `Off` |
| **Compute mass** | Compute mass for the rigid body. | Boolean | `On` |
| **Mass** | When **Compute Mass** is `Off`, a **Mass** value can be specified for the PhysX rigid body in kilograms. | `0.0` to `Infinity` | `999.99` |
| **Compute COM** | Compute the center of mass for the rigid body. | Boolean | `On` |
| **COM offset** | When **Compute COM** is `Off`, the center of mass can be specified as an offset. | Vector position | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Compute inertia** | Compute the inertia based on the mass and shape of the rigid body. | Boolean | `On` |
| **Inertia diagonal** | When **Compute inertia** is `Off`, an **Inertia diagonal** can be specified as the diagonal elements of the inertia tensor. | Vector | X:`166.66`, Y:`166.66`, Z:`166.66` |
| **Maximum angular velocity** | Clamp angular velocity to the specified value. This is useful in scenarios where the rigid body rotates at an unrealistically fast angular velocity. | `0` to `Infinity` | `100.0` |
| **Include non-simulated shapes in Mass** | Include non-simulated shapes in the mass, center of mass, and inertia calculations. | Boolean | `Off` |
| **Debug draw COM** | Display the center of mass for this PhysX rigid body. | Boolean | `Off` |
