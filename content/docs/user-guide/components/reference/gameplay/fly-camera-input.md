---
linkTitle: Fly Camera Input
title: Fly Camera Input Component
description: Use the Fly Camera Input component to add quickly add a controllable camera to your Open 3D Engine (O3DE) level.
---

Use the **Fly Camera Input** component to quickly add a controllable camera to your level. The Fly Camera Input component receives inputs from a mouse and keyboard, gamepad, or touch device.  You can control the forward, backward, and lateral movement as well as the look direction of a camera component that is attached to the same entity as the Fly Camera Input component.  Mouse X and Y-axis movements control look direction. The keyboard keys `W`, `A`, `S`, and `D` control forward, left, backward, and right motion respectively.

## Provider

[Atom Bridge Gem](/docs/user-guide/gems/reference/rendering/atom/atom-o3de-integration/)

## Dependencies ##

[Camera component](/docs/user-guide/components/reference/camera/camera)

## Fly Camera Input properties

![Fly Camera Input component properties](/images/user-guide/components/reference/gameplay/fly-camera-input-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Move Speed** | Sets the movement speed of the camera. | 1.0 - 100.0 | `20.0` |
| **Rotation Speed** | Sets the rotational speed of the camera. | 1.0 - 100.0 | `5.0` |
| **Mouse Sensitivity** | Sets the input sensitivity of the mouse. | 0.0 - 1.0 | `0.025` |
| **Invert Rotation Input X** | Inverts the value of X-axis rotation inputs (yaw, left-right look direction). | Boolean | `Disabled` |
| **Invert Rotation Input Y** | Inverts the value of Y-axis rotation inputs (pitch, up-down look direction). | Boolean | `Disabled` |
| **Is Initially Enabled** | If set to enabled, the fly camera will be active and controllable when the parent entity is activated. | Boolean | `Enabled` |

## FlyCameraInputBus

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetIsEnabled` | Returns `True`, if the fly camera is active. | None | Boolean | Yes |
| `SetIsEnabled` | If `True`, sets the fly camera as active.  If `False`, deactivates the fly camera. | Boolean | None | Yes |

For more information, see [Working with the Event Bus (EBus) system](/docs/user-guide/programming/messaging/ebus/).
