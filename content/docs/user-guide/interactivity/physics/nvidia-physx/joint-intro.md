---
description: ' Create dynamic joint constraints between entities in Open 3D Engine with
  PhysX joints. '
title: Dynamic joints with PhysX
weight: 400
---

PhysX joint components constrain the position and orientation of one PhysX Dynamic Rigid Body called the *follower*, relative to another rigid body, called the *leader*. The follower rigid body will have rotational freedom in zero, one, or two axes around the joint, depending on the type of PhysX joint.

The example image below is a simple demonstration of the different joint types. In each example, the blue sphere is the lead rigid body. The red sphere is the follower rigid body, which must always be a simulated rigid body. The joint component is always part of the follower entity. Once the joint is added to the follower, it needs to be configured to be placed around the leader (using the **Local Position** and **Local Rotation** properties of the joint component). In this example, the ball and hinge leaders are static rigid bodies, but they could be kinematic or simulated rigid bodies too.

![PhysX Joints example](/images/user-guide/physx/physx/anim-joints-example.gif)

**Contents**
+ [PhysX joint types](#physx-joint-types)
+ [PhysX joint setup](#physx-joint-setup)
+ [PhysX Joint configuration](#physx-joint-configuration)
  + [Position mode](#position-mode)
  + [Rotation mode](#rotation-mode)
  + [Snap position mode](#snap-position-mode)
  + [Snap rotation mode](#snap-rotation-mode)
  + [Maximum Force and Maximum Torque modes](#maximum-force-and-maximum-torque-modes)
  + [Swing limits mode](#swing-limits-mode)
  + [Twist limits mode](#twist-limits-mode)
  + [Stiffness and Damping modes](#stiffness-and-damping-modes)
+ [Notes on stability](#notes-on-stability)

## PhysX joint types 

See the linked component reference below for information on the three PhysX joint types:
+ [ PhysX Ball Joint component reference ](/docs/user-guide/components/reference/physx/ball-joint/) - The **PhysX Ball Joint** component allows freedom of rotation of the follower rigid body in two axes.
+ [ PhysX Fixed Joint component reference ](/docs/user-guide/components/reference/physx/fixed-joint/) - The **PhysX Fixed Joint** component does not allow freedom of rotation of the follower rigid body in any axis.
+ [ PhysX Hinge Joint component reference ](/docs/user-guide/components/reference/physx/hinge-joint/) - The **PhysX Hinge Joint** component allows freedom of rotation of the follower rigid body in one axis.

## PhysX joint setup 

The setup for each joint type is the same.

1. Create an entity for the **leader** rigid body.

   1. Create a new entity. Right click in **Perspective** and choose **Create enity** from the context menu.

   1. Add a **PhysX Static Rigid Body** or a **PhysX Dynamic Rigid Body** (type *kinematic* or *simulated*) component depending if you want the leader to move or not.

   1. Add a PhysX collider to the entity.

1. Create an entity for the **follower** rigid body and the joint.

   1. Create a new entity.

   1. Add a **PhysX Dynamic Rigid Body** (type *simulated*) component to the entity.

   1. Add a PhysX collider to the entity. This is required for angle limits to work correctly. Joints still work without a PhysX collider but angle limits and might not be enforced. This is also true when using trigger colliders.

   1. Add one of the PhysX joint components:
      + **PhysX Ball Joint**
      + **PhysX Fixed Joint**
      + **PhysX Hinge Joint**

   1. Assign the leader entity to the PhysX joint by clicking the **Target** button to the right of the **Lead Entity** property and select the leader entity in **Perspective**.

   1. Adjust the position and orientation of the joint to move it to the leader's location. Use the **Local Position** and **Local Rotation** fields in the PhysX joint component. You can enter component mode by clicking the **Edit** button and configure the joint in **Perspective**.

{{< note >}}
It is not required for a follower rigid body to have an leader rigid body. When a follower doesn't have a leader it will be constrained on global position.
{{< /note >}}

## PhysX Joint configuration using component edit mode

Joint components have an **Edit** button that enables component edit mode. In component edit mode, you can edit the properties of the joint in **Perspective**. You can use one of several edit contexts in component edit mode. Press the **Tab** key to cycle through the edit mode contexts. The current context is displayed at the bottom of the **Perspective** pane.

### Position mode 

**Applies to:** All Joints

![PhysX joint position mode](/images/user-guide/physx/physx/ui-physx-joint-position-mode.png)

Position mode displays a translate gizmo that you can click and drag to adjust the **Local Position** of the joint relative to the entity transform.

### Rotation mode 

**Applies to:** All Joints

![PhysX joint rotation mode](/images/user-guide/physx/physx/ui-physx-joint-rotation-mode.png)

Rotation mode displays a rotation gizmo that you can click and drag on any axis to adjust the **Local Rotation** of the joint relative to the entity transform.

### Snap position mode 

**Applies to:** Ball Joint and Hinge Joint

![PhysX joint snap position mode](/images/user-guide/physx/physx/ui-physx-joint-snap-position-mode.png)

Snap position mode displays a highlight bounding box and target when you hover over an entity. Click the entity to snap the joint **Local Position** to the highlighted entity's position. If **Select Lead on Snap** is enabled in the joint properties, the entity will be assigned to the joint's **Lead Entity** property. Any entity can be selected except the follower entity.

### Snap rotation mode 

**Applies to:** Ball Joint

![PhysX joint snap rotation mode](/images/user-guide/physx/physx/ui-physx-joint-snap-rotation-mode.png)

Snap rotation mode displays a highlight bounding box and target when you hover over an entity. Click the entity to snap the joint **Local Rotation** to the highlighted entity's rotation. Any entity can be selected except the leader entity.

### Maximum Force and Maximum Torque modes 

**Applies to:** All Joints

![PhysX joint maximum force and maximum torque modes](/images/user-guide/physx/physx/ui-physx-joint-breakable-properties-mode.png)

Maximum force and maximum torque modes display a gray box that you can click and drag to adjust the **Maximum Force** and **Maximum Torque** properties. The maximum force and maximum torque modes and properties are available only when the **Breakable** property is enabled for the joint.

### Swing limits mode 

**Applies to:** Ball Joint

![PhysX joint swing limits mode](/images/user-guide/physx/physx/ui-physx-joint-swing-limit-mode.png)

Swing limits mode displays a ring gizmo at the local root of the joint that you can use to rotate the swing limits on the joint's x-axis, and a scale gizmo that you can use to scale the swing limits uniformly or non-uniformly on the joint's y- and z-axes. Swing limits mode is available only when the **Limits** property is enabled for the ball joint component.

### Twist limits mode 

**Applies to:** Hinge Joint

![PhysX joint twist limits mode](/images/user-guide/physx/physx/ui-physx-joint-twist-limit-mode.png)

Twist limits mode displays two ring gizmos that you can click and drag to adjust the **Positive angular limit** and **Negative angular limit** properties. The red ring adjusts the positive limit and the green ring adjusts the negative limit. Twist limits mode is available only when the **Limits** property is enabled for the hinge joint component.

### Stiffness and Damping modes 

**Applies to:** Ball Joint and Hinge Joint

![PhysX joint stiffness and damping modes](/images/user-guide/physx/physx/ui-physx-joint-soft-limit-properties-mode.png)

Stiffness and damping modes display a gray box that you can click and drag to adjust the **Stiffness** and **Damping** properties. The stiffness and damping modes and properties are available only when the **Soft limit** property is enabled for the joint.

## Notes on stability 

The iterative solver used by PhysX joints may not be able to maintain constraints in some configurations. For example, the solver might fail to converge. The result is unstable or unexpected motion during simulation. The PhysX documentation describes configurations that could help avoid such occurrences. Please see [Configuring Joints for Best Behavior](https://docs.nvidia.com/gameworks/content/gameworkslibrary/physx/guide/Manual/Joints.html#configuring-joints-for-best-behavior) in NVIDIA's PhysX Joint documentation.
