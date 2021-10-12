---
linkTitle: Character Movement APIs
title: Kythera AI Character Movement APIs
description: Details of APIs for character movement with the Kythera AI Gem in Open 3D Engine (O3DE).
weight: 400
toc: true
---

There are two main EBuses to implement character movement on a two dimensional navigation mesh: `Kythera::MovementRequestBus` and `Kythera::MovementNotificationBus`.

## MovementRequestBus

The `MovementRequestBus` is used by Kythera AI to make requests to the game for an entity to move. In order for an entity to have movement driven by Kythera AI, it is required to have a component which implements this EBus.

The Kythera AI Gem contains a very basic implementation of this EBus in the form of the **Simple Movement Controller** component.

{{< note >}}
The Simple Movement Controller component implementation does not support animations yet.
{{< /note >}}

The `MovementRequestBus` uses the struct `MovementRequest` to encapsulate Kythera AI's requested movement, and consists of three methods: `SetMovementRequest`, `ClearMovementRequest` and `IsAnimationSupported`.

* `SetMovementRequest` is the method that Kythera AI calls to request movement from an entity. A component implementing this request is expected to take this request, hold onto it, and then try to implement the requested movement starting on the next tick of the component.

* `ClearMovementRequest` is the method that Kythera AI calls when there is currently no movement for an entity to carry out. A component implementing this request is expected to keep the character approximately stationary at its current location until a new movement request is received.
 
* `IsAnimationSupported` is the method that Kythera AI calls to query whether a character currently supports a named animation. For example, when pathfinding, this can be used to determine whether an entity is able to use a meshlink. If a meshlink specifies that a character needs an animation named `JetPack` to use it, Kythera AI calls this method with `animationName JetPack`. If this returns false, Kythera AI does not attempt to generate a navigation path using this meshlink. If it returns true, Kythera AI uses the meshlink as part of a navpath. 

## MovementRequest

A `MovementRequest` has three possible modes: `GoTo`, `ExactGoTo`, and `Animation`. The current mode of the `MovementRequest` is indicated by the `mode` parameter.

### GoTo

A `GoTo` request represents a standard movement command. This is typically used when an entity is following a standard navpath, with no special requirements. For a `GoTo` request, the character is expected to move toward the world coordinate `goal`, at approximately the speed requested, looking at `lookTarget`, with the entity's body oriented towards `bodyTarget`. The `allowStrafing` parameter indicates whether the character should be able to strafe or not. When the character is within a sufficient distance of its goal (or passes it), Kythera AI detects that the movement request is complete and update the movement request to point at the next goal position. 

### ExactGoTo

The `ExactGoTo` mode is used when an entity must be precisely positioned and oriented when it finishes a move. For example, this can be used when a special animation is about to be triggered or the entity is about to traverse a navmesh and the exact positioning of the character is crucial for the animation to look correct.

`ExactGoTo` functions similarly to the `GoTo` mode, but with one important distinction; Kythera doesn't automatically detect that the movement request is complete. The runtime code must determine whether the character is positioned and oriented correctly, and then use the `ExactGotoEnded` method on the `MovementNotificationBus` to notify Kythera that the move has ended. Then, Kythera updates the movement request with the next goal.

The accuracy required for orientation and positioning can vary between different animation systems, and can be specified.

### Animation

The `Animation` mode triggers a specific animation to move a character between two locations. This is typically triggered when a character is traversing a navigation mesh. For example, a "climb ladder" animation to move between floors, or a "vault wall" animation to move over a low obstacle.

The parameters in the `animation` struct define the `name` of the animation to use, the `start` position for the animation, and the desired `end` position for the animation. The choice of animation system is left to the integrator. The name of the animation is taken from provided input, for example, the name of animation associated with a navmesh. Once the animation has completed, the game code must call the `AnimationEnded` method on the `MovementNotificationBus` to notify Kythera that the move has ended. Kythera then updates the movement request with the next goal.

## MovementNotificationBus

The `MovementNotificationBus` is called by game code to notify Kythera AI when certain types of movement have completed. It has two methods: `AnimationEnded` and `ExactGotoEnded`. `AnimationEnded` notifies Kythera AI that an `Animation` movement request has completed. `ExactGotoEnded` notifies Kythera AI that an `ExactGoTo` request has completed.
