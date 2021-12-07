---
linkTitle: PhysX Rigid Body
description: ' Learn more about the PhysX Rigid Body component in Open 3D Engine. '
title: PhysX Rigid Body Component
---



The **PhysX Rigid Body** component defines the entity as a rigid object that is solid and can move and collide with other PhysX entities. For example, you can add the **PhysX Rigid Body** component to the entity to create a projectile.

You can specify two main modes for a **PhysX Rigid Body** component.

**Dynamic**
Dynamic rigid bodies will be fully simulated by O3DE and respond to collision events with other rigid bodies. O3DE will apply forces to two dynamic objects that collide, which results in a realistic physics simulation. The simulation will also apply a gravity force to rigid bodies in dynamic mode. You can disable this feature for each rigid body on the component. Dynamic rigid bodies should be used for semi-realistic solid objects that are effected by gravity and other forces.
Dynamic is the default.

**Kinematic**
Kinematic rigid bodies are not fully simulated. Kinematic rigid bodies are moved by script and not effected by forces or gravity. Movement is created with the `SetKinematicTarget` method that you specify in the script.
Use this feature for objects such as moving platforms, doors, or anything that doesn't need to be fully simulated by physics.

{{< note >}}
You should always add the **PhysX Rigid Body** component to the top level of an entity hierarchy. If you add the component to a child entity, this can cause conflicts with the entity's world transform and result in undefined behavior.
{{< /note >}}

The **PhysX Rigid Body** components requires the [PhysX](/docs/user-guide/gems/reference/physics/nvidia/physx/) gem.

For more information, see [Simulating physics behavior with the PhysX system](/docs/user-guide/interactivity/physics/nvidia-physx/).

**Topics**
+ [PhysX Rigid Body component properties](#physx-rigid-body-component-properties)
+ [Creating a Dynamic PhysX Entity](#creating-a-dynamic-physx-entity)

## PhysX Rigid Body component properties

![PhysX Rigid Body component properties.](/images/user-guide/component/physx/component-physx-rigid-body.png)

The **PhysX Rigid Body** component has the following properties.

**Initial linear velocity**
Specifies the starting linear velocity of the rigid body when spawned. This creates movement in the direction of the linear velocity.

**Initial angular velocity**
Specifies the starting angular velocity of the rigid body when spawned. This creates rotation in the direction of the angular velocity.

**Linear damping**
Specifies the rate of decay over time for linear velocity even if no forces are acting on the rigid body. A non-zero eventually stops the rigid body if no linear force is applied.
Value must be non-negative between **0** and **infinity**.

**Angular damping**
Specifies the rate of decay over time for angular velocity even if no forces are acting on the rigid body. A non-zero eventually stops the rigid body if no torque force is applied.
Value must be non-negative between **0** and **infinity**.

**Sleep threshold**
Specifies the kinetic energy per unit mass below which the rigid body can go to sleep.
Value must be non-negative between **0** and **infinity**.

**Start asleep**
When enabled, the rigid body component is asleep when the entity is spawned, and will wake when a sufficient force is applied.

**Interpolate motion**
When enabled, the resulting motion from the simulation is smoothed.
Enable this property for objects that require smooth motion such as vehicles.

**Gravity enabled**
When enabled, the rigid body is effected by gravity. This only applies to dynamic rigid bodies.

**Kinematic**
When enabled, the rigid body is kinematic. The rigid body is not be effected by gravity or other forces and is moved by script.
When disabled, the rigid body is dynamic. The rigid body responds to gravity and other forces and its motion is simulated by PhysX.

**CCD enabled**
When enabled, the rigid body is will have continuous collision detection (CCD). This property is useful for high speed objects to ensure accurate collision detection. Enabling continuous collision detection reveals two additional properties, **Min advance coefficient** and **CCD Friction**
To set this property, you must also set the **Continuous Collision Detection** in the **PhysX Configuration** window. See [Scene Configuration](/docs/user-guide/interactivity/physics/nvidia-physx/configuring/configuration-global/#scene-configuration).

**Min advance coefficient**
Lower values reduce clipping but can affect motion smoothness.
The value must be a decimal between **0.01** and **0.99**.

**CCD friction**
When enabled, friction is applied when CCD collisions are resolved.

**Compute mass**
When enabled, mass is computed for the rigid body.

**Mass**
When **Compute Mass** is disabled, a **Mass** value can be specified for the PhysX rigid body. Valid **Mass** values range for **0** to **Infinity**. A value of **0** is treated as infinite. The trajectory of infinite mass bodies cannot be affected by any collisions or forces other than gravity.

**Compute COM**
When enabled, the center of mass is computed for the rigid body.

**COM offset**
When **Compute COM** is disabled, the center of mass can be specified as an offset.

**Compute inertia**
When enabled, inertia is computed based on the mass and shape of the rigid body.

**Inertia diagonal**
When **Compute inertia** is disabled, an **Inertia diagonal** can be specified as the diagonal elements of the inertia tensor.

**Maximum angular velocity**
Angular velocity is clamped to the specified value. Valid values range from **0** to **infinity**.

**Include non-simulated shapes in Mass**
When enabled, non-simulated shapes will be included in the mass, center of mass, and inertia calculations.

**Debug draw COM**
When enabled, the center of mass is displayed for this PhysX rigid body.

## Creating a Dynamic PhysX Entity

A PhysX entity that is dynamic can move and collide with other entities.

**To create a dynamic PhysX entity:**

1. Create an entity.

1. In the **Entity Inspector**, choose **Add Component** and then select a **Mesh** component.

1. For **Mesh asset**, select the mesh asset so that your entity is visible, such as a `box.cgf`.

1. Add the **PhysX Collider** component to the entity.

1. Add the **PhysX Rigid Body** component to the entity.

1. Create another entity underneath the first, with a **PhysX Collider** component and a **Mesh** component but without a **PhysX Rigid Body** component. This will create a static rigid body.

1. Press **Ctrl+G** to enter gameplay mode.

    ![Animated example of a dynamic entity falling to the terrain and bouncing around.](/images/user-guide/shared/physx-creating-dynamic-object-1.gif)

    The entity has a **PhysX Collider** component and a **PhysX Rigid Body** component attached. Because the object is dynamic, it falls and then collides with the static rigid body.

{{< note >}}
For the **[Transform](/docs/user-guide/components/reference/transform/)** component, clear the **Static** property. This ensures that the mesh moves with the physics simulation.
{{< /note >}}
