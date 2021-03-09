---
description: ' Open 3D Engine (O3DE) Capsule Shape component reference. '
title: Capsule Shape component
date: 2021-03-05
---

{{< preview-migrated >}}

The **Capsule Shape** component creates a transparent capsule that's oriented on the local Z axis. The dimensions of the capsule can be edited with the **Height** and **Radius** properties. The Capsule Shape component is not a mesh, but rather a helper geometry that can be used to define volumes for area lights, shape gradients, audio, vegetation, PhysX, and any application that can utilize the Shape EBus. For more information on using Shape components, see [Shape components](/docs/user-guide/components/reference/shape/_index.md).

## Provider ##

[LmbrCentral Gem](/docs/user-guide/gems/reference/lmbr-central.md)

## Properties ##

![Capsule Shape component properties](/images/user-guide/components/reference/shape/capsule-shape-component-ui-01.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Visible** | Enable to always display the Shape component in the Perspective view, even when the entity is not selected. Disable to hide the Shape component when the entity is not selected. | Boolean | `Enabled` |
| **Game View** | Enable to display the Shape component while in game mode in the editor. | Boolean | `Disabled` |
| **Shape Color** | The color of the Shape component. | Eight bits per channel color: 0-255 | `255,255,199` |
| **Height** | The height of the Capsule Shape in meters. The height value must be at least twice the value of **Radius**. | 0 - Infinity | `1.0` |
| **Radius** | The radius of the Capsule Shape in meters. The radius value must be no more than half the value of **Height**. | 0 - Infinity | `0.25` |

## CapsuleShapeComponentRequestBus ##

Use the following request functions with the `CapsuleShapeComponentRequestBus` EBus interface to communicate with other components of your game.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetCapsuleConfiguration` | Returns the configuration of the capsule shape. | None | `CapsuleShapeConfiguration` object that contains the configuration for the capsule shape. | Yes |
