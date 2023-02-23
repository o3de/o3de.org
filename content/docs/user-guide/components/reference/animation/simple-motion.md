---
linkTitle: Simple Motion
title: Simple Motion Component
description: ' Use the Simple Motion component to add motion effects to your actor in Open 3D Engine (O3DE). '
---

You can use the **Simple Motion** component to play a motion without an animation graph. Add this component to an entity with the **[Actor](/docs/user-guide/components/reference/animation/actor/)** component to use a single motion for your actor. For complex motions, refer to the **[AnimGraph](/docs/user-guide/components/reference/animation/animgraph/)** component.

## Provider

[EMotionFX](/docs/user-guide/gems/reference/animation/emotionfx)

## Dependencies

[Actor component](./actor)

## Simple Motion properties 

![Add the Simple Motion component to an entity to assign a motion for the actor.](/images/user-guide/components/reference/animation/simple-motion-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview In Editor** | Plays the motion in **Open 3D Engine (O3DE) Editor**. | Boolean | `Disabled` |
| **Motion** | 	Specifies the motion asset that you want to animate the actor with. | Motion asset | None |
| **Loop motion** | Runs the animation continuously. | Boolean | `Disabled` |
| **Retarget motion** | Allows motion that was created with an actor that was configured with specific bone lengths to be played on another actor with different bone lengths. When applied, the motion does not affect bone lengths. The skeleton must follow the same hierarchy and the bone names must be identical to work properly. | Boolean | `Disabled` |
| **Reverse motion** | Runs the animation in reverse. | Boolean | `Disabled` |
| **Mirror motion** | Mirrors the animation of the character’s body parts. For example, if the actor kicks with the right leg while the left leg is planted, the mirror effect causes the left leg to kick while the right leg is planted. | Boolean | `Disabled` |
| **Play speed** | Specifies the rate at which the motion is played. | 0 to Infinity | `1.0` |
| **Blend In Time** | Specifies the blend in time (in seconds) for the motion. You can set this parameter for a motion that you want to start and that is blending from a previous motion. | 0 to Infinity | `0.0` |
| **Blend Out Time** | Specifies the blend out time (in seconds) for the motion. You can set this parameter for a motion that is currently playing and that will blend into the next motion. | 0 to Infinity | `0.0` |
| **Play on active** | Start the animation when the entity is activated. | Boolean | `Enabled` |
| **In-place** | Removes any positional or rotational changes of root joints from the animation. | Boolean | `Disabled` |

## SimpleMotionComponentRequestBus ##

Use the following request functions with the `SimpleMotionComponentRequestBus` EBus interface to communicate Simple Motion components in your game. For more information, refer to [Working with the Event Bus (EBus) system](/docs/user-guide/programming/messaging/ebus/).

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `BlendInTime` | Sets the **Blend In Time** of the motion. | Time: Float | None | Yes |
| `BlendOutTime` | Sets the **Blend Out Time** of the motion. | Time: Float | None | Yes |
| `GetBlendInTime` | Returns the **Blend In Time** of the motion. | None | Time: Float | Yes |
| `GetBlendOutTime` | Returns the **Blend Out Time** of the motion. | None | Time: Float | Yes |
| `GetLoopMotion` | Returns `True` if the motion is set to loop. | None | Boolean | Yes |
| `GetMotion` | Returns the AssetId of the motion. | None | Motion: AssetId | Yes |
| `GetPlaySpeed` | Returns the **Play speed**. | None | Speed: Float | Yes |
| `GetPlayTime` | Returns the amount of time elapsed since the start of the current motion. | None | Time: Float | Yes |
| `LoopMotion` | If `True`, sets the motion to loop. | Boolean | None | Yes |
| `MirrorMotion` | If `True`, mirrors the motion. | Boolean | None | Yes |
| `Motion` | Sets the motion asset. | Motion: AssetId | None | Yes |
| `PlayMotion` | Starts playing the motion. | None | None | Yes |
| `PlayTime` | Starts playing the motion from a specific elapsed time. | Time: Float | None | Yes |
| `RetargetMotion` | If `True`, enables the motion to be retargeted to the current actor. | Boolean | None | Yes |
| `ReverseMotion` | If `True`, sets the motion to play in reverse. | Boolean | None | Yes |
| `SetPlaySpeed` | Sets the **Play speed**. | Speed: Float | None | Yes |
