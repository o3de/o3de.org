---
linkTitle: PhysX Rigid Body
title: PhysX Rigid Body Component
description: The PhysX Rigid Body component creates a dynamic or kinematic solid object that can move and collide with other PhysX entities.
toc: true
---

The **PhysX Rigid Body** component makes an entity a *dynamic* or *kinematic* solid object that can move and collide with other PhysX entities. The entity must also have at least one [PhysX Shape Collider](/docs/user-guide/components/reference/physx/shape-collider/)  or [PhysX Collider](/docs/user-guide/components/reference/physx/collider/)  component that defines a collider for the entity.

Dynamic rigid bodies are fully simulated by PhysX. Dynamic rigid bodies move in response to collision events and forces and are not animated through motions or scripts. By default, dynamic rigid bodies are affected by gravity, but gravity can be deactivated in the PhysX Rigid Body component.

Kinematic rigid bodies are not fully simulated by PhysX. They have scripted animation and are not affected by forces or gravity. Doors, for example, often have scripted animation. If the door is a kinematic rigid body, the door can move through scripted animation and collide with other PhysX entities during simulation. Movement is created with the `SetKinematicTarget` method that you specify in a script.

{{< note >}}
You should always add the PhysX Rigid Body component to the top level of an entity hierarchy. Adding the PhysX Rigid Body component to a child entity can cause conflicts with the entity's world transform and result in undefined behavior.
{{< /note >}}

## Provider

[PhysX Gem](/docs/user-guide/gems/reference/physics/nvidia/physx/)

## Properties

![PhysX Rigid Body component interface.](/images/user-guide/components/reference/physx/physx-rigid-body-ui-01.png)

| Property | Description | Value | Default |
| - | - | - | - |
| **Initial linear velocity** | Sets the starting linear velocity (in meters per second) of the rigid body when the entity is activated. This creates movement in the direction of the linear velocity vector. | Vector3: -Infinity to Infinity | X: `0.0`, Y: `0.0`, Z: `0.0` |
| **Initial angular velocity** | Sets the starting angular velocity (in radians per second) of the rigid body when the entity is activated. This creates rotation in the direction of the angular velocity vector. | Vector3: -Infinity to Infinity | X: `0.0`, Y: `0.0`, Z: `0.0` |
| **Linear damping** | Sets the rate of decay over time for linear velocity even if no forces are acting on the rigid body. A non-zero value eventually stops the rigid body if no linear force is applied. Value must be non-negative. | Float: 0 to Infinity | `0.05` |
| **Angular damping** | Sets the rate of decay over time for angular velocity even if no forces are acting on the rigid body. A non-zero value eventually stops the rigid body if no torque force is applied. Value must be non-negative. | Float: 0.0 to Infinity | `0.15` |
| **Sleep threshold** | Sets the kinetic energy per unit mass below which the rigid body can go to sleep. Value must be non-negative. | Float: 0.0 to Infinity | `0.005` |
| **Start asleep** | If enabled, the PhysX Rigid Body component is asleep when the entity is activated and wakes when a sufficient force is applied. | Boolean | `Disabled` |
| **Interpolate motion** | If enabled, the resulting motion from the simulation is smoothed. Enable this property for objects that require smooth motion such as vehicles.  | Boolean | `Disabled` |
| **Gravity enabled** | If enabled, the rigid body is affected by gravity. This only applies to dynamic rigid bodies. | Boolean | `Enabled` |
| **Kinematic** | If enabled, the rigid body is kinematic. A kinematic rigid body is not affected by gravity or other forces and can be moved by script. If disabled, the rigid body is dynamic. A dynamic rigid body responds to collision events and forces, and its motion is simulated by PhysX. | Boolean | `Disabled` |
| **CCD enabled** | If enabled, continuous collision detection (CCD) is performed. This property is useful for high speed objects to ensure accurate collision detection. Activating this property reveals two additional properties, **Min advance coefficient** and **CCD Friction**. To use continuous collision detection, you must also activate **Continuous Collision Detection** in the **PhysX Configuration** window. For more information, refer to [PhysX Configuration](/docs/user-guide/interactivity/physics/nvidia-physx/configuring/configuration-global/#physx-configuration-global-world). | Boolean | `Disabled` |
| **Min advance coefficient** | Fine-tune continuous collision detection. Lower values reduce clipping but can affect motion smoothness. | Float: 0.01 to 0.99 | `0.15` |
| **CCD friction** | If enabled, friction is applied when CCD collisions are resolved. | Boolean | `Disabled` |
| **Compute mass** | If enabled, mass is computed for the rigid body. | Boolean | `Disabled` |
| **Linear Axis - Lock X** | If enabled, forces won't create translation on the X-axis of the rigid body. | Boolean | `Disabled` |
| **Linear Axis - Lock Y** | If enabled, forces won't create translation on the Y-axis of the rigid body. | Boolean | `Disabled` |
| **Linear Axis - Lock Z** | If enabled, forces won't create translation on the Z-axis of the rigid body. | Boolean | `Disabled` |
| **Angular Axis - Lock X** | If enabled, forces won't create rotation on the X-axis of the rigid body. | Boolean | `Disabled` |
| **Angular Axis - Lock Y** | If enabled, forces won't create rotation on the Y-axis of the rigid body. | Boolean | `Disabled` |
| **Angular Axis - Lock Z** | If enabled, forces won't create rotation on the Z-axis of the rigid body. | Boolean | `Disabled` |
| **Mass** | If **Compute Mass** is disabled, a **Mass** value can be specified for the PhysX rigid body in kilograms. | Float: 0.0 to Infinity | `1.0` |
| **Compute COM** | If enabled, the center of mass is automatically computed for the rigid body. | Boolean | `Enabled` |
| **COM offset** | If **Compute COM** is disabled, the center of mass can be specified as an offset. | Vector3: -Infinity to Infinity | X: `0.0`, Y: `0.0`, Z: `0.0` |
| **Compute inertia** | If enabled, inertia is computed based on the mass and shape of the rigid body. | Boolean | `Enabled` |
| **Inertia diagonal** | If **Compute inertia** is disabled, an **Inertia diagonal** can be specified as the diagonal elements of the inertia tensor. This is the torque required to rotate the rigid body on each axis. | Vector3: 0.0 to Infinity | X: `1.0`, Y: `1.0`, Z: `1.0` |
| **Maximum angular velocity** | Clamps angular velocity to the specified value. This is useful in scenarios where the rigid body rotates at an unrealistically fast angular velocity. | Float: 0.0 to Infinity | `100.0` |
| **Include non-simulated shapes in Mass** | If enabled, non-simulated shapes are included in the mass, center of mass, and inertia calculations. | Boolean | `Disabled` |
| **Debug draw COM** | If enabled, the center of mass for this rigid body is displayed. | Boolean | `Disabled` |
| **Solver Position Iterations** | Number of iterations used when computing the body's position update. Higher values may increase simulation fidelity, but will increase computational cost. | Integer: 1 to 255 | `4` |
| **Solver Velocity Iterations** | Number of iterations used when computing the body's velocity update. Higher values may increase simulation fidelity, but will increase computational cost.| Integer: 1 to 255 | `1` |
