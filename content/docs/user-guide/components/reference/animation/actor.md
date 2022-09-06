---
linkTitle: Actor
title: Actor Component
description: Use the Actor component to add an actor file to your entity in Open 3D Engine (O3DE).
---

You can use the **Actor** component to create characters for your game. After you import your character files from your DCC tool into O3DE, you can create an entity and add the Actor component to it. You must use an Actor component to create a controllable character for your game.

## Provider

[EMotionFX](/docs/user-guide/gems/reference/animation/emotionfx)

## Dependencies

You must also add one of the following components:
+ **[Simple Motion](./simple-motion)** component - Use a single motion for your actor.
+ **[AnimGraph](./animgraph)** component - Use an animation graph to control your actor's motions.

## Actor Component Properties 

![Actor component properties.](/images/user-guide/components/reference/animation/actor-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Actor asset** | Sets the actor asset for this component. | Actor Asset | None |
| **Attach To - Attachment type** | Sets the type of attachment to use when attaching to the target entity. | `None`, `Skin attachment` | `None` |
| **Attach To - Target entity** | <p>Sets the entity to attach to.</p><p>*This field is available only if **Attachment type** is set to `Skin attachment`.*</p> | EntityId | None |
| **Render options - Draw skeleton** | Draws the actor's joints. | Boolean | `Disabled` |
| **Render options - Draw character** | Draws the actor's mesh. | Boolean | `Enabled` |
| **Render options - Draw bounds** | Draws the actor's bounding box. | Boolean | `Disabled` |
| **Render options - Skinning method** | Sets the skinning method to use for the actor. | `Dual quat skinning`, `Linear skinning` | `Dual quat skinning` |
| **Out of view - Force update Joints** | Updates joint transforms when the actor is out of camera view. | Boolean | `Disabled` |
| **Out of view - Bounding box configuration - Bounds type** | Sets the method used to compute the actor's bounding box. | `Static`, `Bone position-based`, `Mesh vertex-based` | `Static` |
| **Out of view - Bounding box configuration - Automatically update bounds?** | <p>If `False`, actor bounds will only be calculated on activation or by calling a recalculation explicitly.  If `True`, actor bounds will be calculated at a regular interval determined by the **Update frequency** and **Update item skip factor** properties below.</p><p>*This field is available only if **Bounds type** is set to `Bone position-based` or `Mesh vertex-based`.*</p>| Boolean | `Enabled` |
| **Out of view - Bounding box configuration - Update frequency** | <p>Sets the frequency of bounding box updates in hertz.</p><p>*This field is available only if **Bounds type** is set to `Bone position-based` or `Mesh vertex-based`.*</p> | 0.0 to Infinity | `0.0` |
| **Out of view - Bounding box configuration - Update item skip factor** | <p>Sets bounding box updates to only calculate bounds based on every *n<sup>th</sup>* item (bone or vertex), where *n* is the **Update item skip factor**.</p><p>*This field is available only if **Bounds type** is set to `Bone position-based` or `Mesh vertex-based`.*</p> | 1 to Infinity | `1` |
| **Out of view - Bounding box configuration - Expand by** | Expands the dimensions of a calculated bounding box by a percentage. | -99.999 to Infinity | `25.0` |

## ActorComponentRequestBus

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| **AttachToEntity** | Attaches an attachment to an target entity at a specific joint index. | Target: EntityId, Joint Index: Integer | None | Yes |
| **DebugDrawRoot** | Draws the root of the actor. | Boolean | None | Yes |
| **DetachFromEntity** | Detaches an attachment from the entity it is attached to. | None | None | Yes |
| **GetJointIndexByName** | Returns the joint index of a specific joint. | Joint Name: String | Joint Index: Integer | Yes |
| **GetJointTransform** | Returns a specific joint's transform. | Joint Index: Integer, Joint Space: Integer | Transform: Quaternion | Yes |
| **GetRenderCharacter** | Returns `True` if the actor is rendered. | None | Boolean | Yes |
| **SetRenderCharacter** | If `True`, renders the actor. | Boolean | None | Yes |

## ActorComponentNotificationBus

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| **OnActorInstanceCreated** | Notifies listeners when an actor instance is created. | None | Actor Instance | Yes |
| **OnActorInstanceDestroyed** | Notifies listeners when an actor instance is destroyed. | None | Actor Instance | Yes |

## ActorNotificationBus

| Notification Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| **OnMotionEvent** | Notifies listeners when a motion event begins. | None | Motion Event: Motion | Yes |
| **OnMotionLoop** | Notifies listeners when a motion begins a new loop. | None | Motion Name: String | Yes |
| **OnStateEntered** | Notifies listeners when the transition to a specific state is complete. | None | State: String | Yes |
| **OnStateEntering** | Notifies listeners when the transition to a specific state has started. | None | State: String | Yes |
| **OnStateExited** | Notifies listeners when the transition from a specific state is complete. | None | State: String | Yes |
| **OnStateExiting** | Notifies listeners when the transition from a specific state has started. | None | State: String | Yes |
| **OnStateTransitionEnd** | Notifies listeners when a state transition has completed. | None | New State: String, Old State: String | Yes |
| **OnStateTransitionStart** | Notifies listeners when a state transition has started. | None | New State: String, Old State: String | Yes |


## Related links
+ [Using Multiple Skin Attachments for an Actor](/docs/user-guide/visualization/animation/actor-multiple-skin)
+ [Setting Up Actor Entities](/docs/user-guide/visualization/animation/actor-component-entity-setup)
