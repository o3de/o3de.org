---
description: ' See the following best practices for working with PhysX in Open 3D Engine. '
title: PhysX Best Practices
weight: 600
---

See the following best practices when working with PhysX.
+ Colliders intersecting with terrain can result in unexpected behavior. For example, the object might rocket into space, jitter, or slow down performance. Avoid intersecting colliders with terrain. If you need to intersect a collider with terrain, use a small value for the collider size. These scenarios can be mitigated by clearing the **Persistent Contact Manifold** check box in the **Global Configuration** tab in the **PhysX Configuration** tool.
+ The **PhysX Character Controller** component must be on the same entity as the **Actor** component in order to work with the **Animation Editor**.
+ When adding the **PhysX Static Rigid Body** component to entities, check the **Static** option in the **Transform** component. This allows other systems to apply optimizations to static entities that will never move at run time.
+ Avoid checking the **Static** option when there is a **PhysX Dynamic Rigid Body** component. The rigid body will behave statically and a warning will appear about the incompatibility of the **PhysX Dynamic Rigid Body** component and the **Static** transform option.
+ When adding the **PhysX Collider** component to entities, prefer a primitive shape (box, capsule, or sphere) for the collider. These shape colliders offer better performance and should be used when possible.

