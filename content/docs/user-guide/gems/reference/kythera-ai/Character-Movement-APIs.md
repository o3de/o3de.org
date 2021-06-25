[Kythera AI Gem](index.md)

# Character Movement APIs


There are two main buses that we expose to implement character movement on a two dimensional navigation mesh - `Kythera::MovementRequestBus` and `Kythera::MovementNotificationBus`. 

/\*<!\[CDATA\[\*/ div.rbtoc1624455559093 {padding: 0px;} div.rbtoc1624455559093 ul {list-style: disc;margin-left: 0px;} div.rbtoc1624455559093 li {margin-left: 0px;padding-left: 0px;} /\*\]\]>\*/

*   [MovementRequestBus](#CharacterMovementAPIs(O3DE)-MovementRequestBus)
    *   [MovementRequest](#CharacterMovementAPIs(O3DE)-MovementRequest)
        *   [GoTo](#CharacterMovementAPIs(O3DE)-GoTo)
        *   [ExactGoTo](#CharacterMovementAPIs(O3DE)-ExactGoTo)
        *   [Animation](#CharacterMovementAPIs(O3DE)-Animation)
*   [MovementNotificationBus](#CharacterMovementAPIs(O3DE)-MovementNotificationBus)

**MovementRequestBus**
======================

This bus is used by Kythera to make requests to the game for an entity to move. In order for an entity to have movement driven by Kythera, it is required to have a component which implements this bus. For example, in our **ShooterDemo** demonstration, the **Simple Movement Controller Component** implements the MovementRequestBus. 

The movement request bus uses the struct `MovementRequest` to encapsulate Kythera's requested movement, and consists of three methods - `SetMovementRequest`, `ClearMovementRequest` and `IsAnimationSupported`.

*   **`SetMovementRequest`** is the method which Kythera calls to request movement from an entity. It is expected that a component implementing this will take this request, in some way hold onto it, and then try to implement the movement it requests starting on the next Tick of the component.
*   **`ClearMovementRequest`** is the method which Kythera calls when there is currently no movement that it would like an entity to carry out. It is expected that a component implementing this will keep the character approximately stationary at their current location until a new movement request is received. 
*   **`IsAnimationSupported`** is the method which Kythera calls to query whether a character currently supports a named animation. For example, when pathfinding, this can be used to determine whether an entity is able to use a [Navigation Mesh Link](https://kythera.atlassian.net/wiki/spaces/KYTDOC/pages/641531905/Navigation+Objects+in+Lumberyard). If a mesh link specifies that a character needs an animation named _JetPack_ to use it, Kythera will call this method with `animationName` _JetPack_. If this returns false, Kythera will not attempt to generate a navigation path using this meshlink. If it returns true, Kythera will be free to use the meshlink as part of a navpath. 

**MovementRequest**
-------------------

A MovementRequest has three possible modes - **GoTo**, **ExactGoTo**, and **Animation**. The current mode of the MovementRequest is indicated by the `mode` parameter.

### **GoTo**

A **GoTo** request represents a standard movement command. This is typically used when an entity is following a standard navpath, with no special requirements. For a GoTo request, the character is expected to move toward the world coordinate `goal` at approximately the speed requested, looking at `lookTarget`, and with the entity's body oriented towards `bodyTarget`. The `allowStrafing` parameter indicates whether the character should be able to strafe or not. When the character is within a sufficient distance of its goal (or passes it), Kythera will detect that the movement request is complete and update the movement request to point at the next goal position. 

### **ExactGoTo**

The **ExactGoTo** mode is used when it is important that an entity is positioned and oriented in exactly the right way when it finishes a move. For example, this can be used when a special animation is about to be triggered or the entity is about to traverse a [Navigation Mesh Link](https://kythera.atlassian.net/wiki/spaces/KYTDOC/pages/641531905/Navigation+Objects+in+Lumberyard) and the exact positioning of the character is crucial for the animation to look correct.

ExactGoTo functions almost exactly the same as the GoTo mode, but with one important distinction – Kythera **does not** automatically detect that the movement request is complete. The game code must determine whether the character is positioned and oriented correctly, and then use the `ExactGotoEnded` method on the `MovementNotificationBus` to notify Kythera that the move has ended. At this point Kythera will update the movement request with the next goal.

The specific accuracy required for orientation and positioning will vary between different animation systems and games, and as such this is left up to the user.

### **Animation**

The **Animation** mode is used when a specific animation is being triggered to move a character between two locations. This is typically triggered when a character is traversing a [Navigation Mesh Link](https://kythera.atlassian.net/wiki/spaces/KYTDOC/pages/641531905/Navigation+Objects+in+Lumberyard) – for example, they might be using a special "climb ladder" animation to move between floors, or a "vault wall" animation to move over a low obstacle.

When in Animation mode, the parameters in the `animation` struct are set – these define the `name` of the animation to use, the `start` position for the animation, and the desired `end` position for the animation. The choice of actual animation system used to implement this animation is left to the integrator. The name of the animation will be taken from user provided input- for example, the name of animation associated with a [Navigation Mesh Link](https://kythera.atlassian.net/wiki/spaces/KYTDOC/pages/641531905/Navigation+Objects+in+Lumberyard). Once the animation has completed, the game code must call the `AnimationEnded` method on the `MovementNotificationBus` to notify Kythera that the move has ended. At this point Kythera will update the movement request with the next goal. 

  

**MovementNotificationBus**
===========================

The **MovementNotificationBus** is called by game code to notify Kythera when certain types of movement have completed. It has two methods, `AnimationEnded` and `ExactGotoEnded` , which respectively notify Kythera that an Animation movement request or an ExactGoTo request has completed.