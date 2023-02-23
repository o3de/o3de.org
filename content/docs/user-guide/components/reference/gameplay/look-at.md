---
linkTitle: Look-At
title: Look-At Component
description: Use the Look-At component to force an entity to face another entity in your Open 3D Engine (O3DE) level.
---

Use the **Look-At** component to force an entity to face another entity or position in your Open 3D Engine (O3DE) level.

## Provider

[O3DE Core (LmbrCentral) Gem](/docs/user-guide/gems/reference/o3de-core)

## Look-At properties

![Look-At component properties](/images/user-guide/components/reference/gameplay/look-at-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Target** | Sets a target entity, the **Forward Axis** of the entity with the Look-At component will always point towards the **Target** entity. | EntityId | None |
| **Forward Axis** | Sets the axis that will always point towards **Target** entity. | `Y+`, `Y-`, `X+`, `X-`, `Z+`, `Z-` | None |

## LookAt

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `SetAxis` | Sets the **Forward Axis** of the Look-At component. | Axis: 0 - 5; 0 = `X+`, 1 = `X-`, 2 = `Y+`, 3 = `Y-`, 4 = `Z+`, 5 = `Z-`| None | Yes |
| `SetTarget` | Sets the **Target** entity of the Look-At component. | Target Entity: EntityId | None | Yes |
| `SetTargetPosition` | Sets the Look-At component to always point to a specific position. | Target Position: Vector3 | None | Yes |

## LookAtNotification

| Notification Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `OnTargetChanged` | Notifies listeners when the **Target** entity of the Look-At component changes. | None | Target Entity: EntityId | Yes |

For more information, see [Working with the Event Bus (EBus) system](/docs/user-guide/programming/messaging/ebus/).
