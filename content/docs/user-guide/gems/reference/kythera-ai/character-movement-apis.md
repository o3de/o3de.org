---
linkTitle: Character Movement APIs
title: Character Movement APIs
description: Details of APIs for character movement with the Kythera AI Gem in Open 3D Engine (O3DE).
weight: 400
---

There are two main buses which we expose to implement character movement on a two dimensional navigation mesh - `Kythera::MovementRequestBus` and `Kythera::MovementNotificationBus`.

*   [MovementRequestBus](#CharacterMovementAPIs(O3DE)-MovementRequestBus)
    *   [MovementRequest](#CharacterMovementAPIs(O3DE)-MovementRequest)
        *   [GoTo](#CharacterMovementAPIs(O3DE)-GoTo)
        *   [ExactGoTo](#CharacterMovementAPIs(O3DE)-ExactGoTo)
        *   [Animation](#CharacterMovementAPIs(O3DE)-Animation)
*   [MovementNotificationBus](#CharacterMovementAPIs(O3DE)-MovementNotificationBus)

**MovementRequestBus**
======================

This bus is used by Kythera AI to make requests to the game for an entity to move. In order for an entity to have movement driven by Kythera AI, it is required to have a component which implements this bus.

The Gem contains a very basic implementation of this Bus in the form of the SimpleMovementControllerComponent. This implementation does not support animations yet.

The movement request bus uses the struct `MovementRequest` to encapsulate Kythera AI's requested movement, and consists of three methods - `SetMovementRequest`, `ClearMovementRequest` and `IsAnimationSupported`.

*   **`SetMovementRequest`** is the method which Kythera AI calls to request movement from an entity. It is expected that a component implementing this will take this request, in some way hold onto it, and then try to implement the movement it requests starting on the next Tick of the component.
*   **`ClearMovementRequest`** is the method which Kythera AI calls when there is currently no movement that it would like an entity to carry out. It is expected that a component implementing this will keep the character approximately stationary at their current location until a new movement request is received. 
*   **`IsAnimationSupported`** is the method which Kythera AI calls to query whether a character currently supports a named animation. For example, when pathfinding, this can be used to determine whether an entity is able to use a [Navigation Mesh Link](https://kythera.atlassian.net/wiki/spaces/KYTDOC/pages/641531905/Navigation+Objects+in+Lumberyard). If a mesh link specifies that a character needs an animation named _JetPack_ to use it, Kythera AI will call this method with `animationName` _JetPack_. If this returns false, Kythera AI will not attempt to generate a navigation path using this meshlink. If it returns true, Kythera AI will be free to use the meshlink as part of a navpath. 

**MovementRequest**
-------------------

A MovementRequest has three possible modes - **GoTo**, **ExactGoTo**, and **Animation**. The current mode of the MovementRequest is indicated by the `mode` parameter.

### **GoTo**

A **GoTo** request represents a standard movement command. This is typically used when an entity is following a standard navpath, with no special requirements. For a GoTo request, the character is expected to move toward the world coordinate `goal` at approximately the speed requested, looking at `lookTarget`, and with the entity's body oriented towards `bodyTarget`. The `allowStrafing` parameter indicates whether the character should be able to strafe or not. When the character is within a sufficient distance of its goal (or passes it), Kythera AI will detect that the movement request is complete and update the movement request to point at the next goal position. 

### **ExactGoTo**

The `ExactGoTo` mode is used when an entity must be precisely positioned and oriented when it finishes a move. For example, this can be used when a special animation is about to be triggered or the entity is about to traverse a Navigation Mesh and the exact positioning of the character is crucial for the animation to look correct.

`ExactGoTo` functions similarly to the `GoTo` mode, but with one important distinction – Kythera doesn't automatically detect that the movement request is complete. The game code must determine whether the character is positioned and oriented correctly, and then use the `ExactGotoEnded` method on the `MovementNotificationBus` to notify Kythera that the move has ended. Then Kythera will update the movement request with the next goal.

The accuracy required for orientation and positioning can vary between different animation systems, and can be specified.

### **Animation**

#### Animation
The `Animation` mode triggers a specific animation to move a character between two locations. This is typically triggered when a character is traversing a navigation mesh. For example, a "climb ladder" animation to move between floors, or a "vault wall" animation to move over a low obstacle.

The parameters in the `animation` struct define the `name` of the animation to use, the `start` position for the animation, and the desired `end` position for the animation. The choice of animation system is left to the integrator. The name of the animation will be taken from user provided input, for example, the name of animation associated with a navigation mesh. Once the animation has completed, the game code must call the `AnimationEnded` method on the `MovementNotificationBus` to notify Kythera that the move has ended. Kythera then updates the movement request with the next goal.

**MovementNotificationBus**
===========================

The **MovementNotificationBus** is called by game code to notify Kythera AI when certain types of movement have completed. It has two methods, `AnimationEnded` and `ExactGotoEnded` , which respectively notify Kythera AI that an Animation movement request or an ExactGoTo request has completed.
