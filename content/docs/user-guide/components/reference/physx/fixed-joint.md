---
linkTitle: PhysX Fixed Joint
description: ' The Open 3D Engine PhysX Fixed Joint component. '
title: PhysX Fixed Joint Component
---



With the **PhysX Fixed Joint** component, you can create a dynamic fixed joint that constrains an entity to the joint with no degree of freedom in any axis.

## PhysX Fixed Joint component properties 

![Properties of the PhysX Fixed Joint component](/images/user-guide/physx/physx/ui-physx-fixed-joint-component.png)

**Local Position**
Specify the position of the joint relative to the entity transform.

**Local Rotation**
Specify the rotation of the joint relative to the entity transform.

**Lead Entity**
Specify the parent entity that will drive the joint.

**Breakable**
When enabled, the joint will break if sufficient force is applied. Enabling **Breakable** exposes the **Maximum Force** and **Maximum Torque** properties.
**PhysX Dynamic Rigid Body** components that have their **Compute Mass** property enabled might have very large mass values. If the entity containing the joint component or the leader entity have their **Compute Mass** property enabled, the **Maximum Force** and **Maximum Torque** properties might require very high values to resist breaking.

**Maximum Force**
When **Breakable** is enabled, specify the maximum force the joint can sustain before breaking. Valid values range from **0.01** to **Infinity**.

**Maximum Torque**
When **Breakable** is enabled, specify the maximum torque the joint can sustain before breaking. Valid values range from **0.01** to **Infinity**.

**Display Setup in Viewport**
When enabled, a line that represents the connection between the joint and its leader are displayed.

**Select Lead on Snap**
When enabled, snapping the joint to an entity in component mode will set the entity as the **Lead Entity**. The entity containing the joint component is excluded from this operation.

**Lead-Follower Collide**
When enabled, the lead entity and follower entity (the entity containing the joint component) will collide.

**Edit**
When clicked, component edit mode is enabled. In component edit mode, all components are locked except for the **PhysX Ball Joint** component. The properties of the **PhysX Ball Joint** component can be edited in **Perspective**. Press **Tab** to cycle through the component edit modes. Click **Done** to exit component mode.
