---
description: ' See the following best practices for working with PhysX in Open 3D Engine. '
title: PhysX Best Practices
weight: 600
---

See the following best practices when working with PhysX.
+ Colliders intersecting with terrain can result in unexpected behavior. For example, the object might rocket into space, jitter, or slow down performance. Avoid intersecting colliders with terrain. If you need to intersect a collider with terrain, use a small value for the collider size. These scenarios can be mitigated by clearing the **Persistent Contact Manifold** check box in the **Global Configuration** tab in the **PhysX Configuration** tool.
+ The **PhysX Character Controller component** must be on the same entity as the **Actor** component in order to work with the **Animation Editor**.
+ Only use **PhysX Static Rigid Body** when the **Static** check box in the **Transform** component of an entity is enabled. If you select the **Static** when there is also a **PhysX Dynamic Rigid Body** component, the rigid body behaves statically and a warning appears about the incompatibility of the **PhysX Dynamic Rigid Body** component and the **Static** transform option.
+ When adding the **PhysX Collider** component to entities, prefer a primitive shape (box, capsule, or sphere) for the collider. These shape colliders offer better performance and should be used when possible.

