---
description: ' Open 3D Engine (O3DE) Quad Shape component reference. '
title: Quad Shape component
date: 2021-03-05
---

The **Quad Shape** component creates a transparent square plane that's oriented on the local Z axis. The dimensions of the quad can be edited with the **Width** and **Height** properties. The Quad Shape component is not a mesh, but rather a helper geometry that can be used to define areas for area lights, spawners, shape gradients, audio, vegetation, PhysX, and any application that can utilize the Shape EBus. For more information on using Shape components, see [Shape components](/docs/user-guide/features/components/reference/shape/intro.md).

## Provider ##

[LmbrCentral Gem](/docs/user-guide/features/gems/reference/lmbr-central.md)

## Properties ##

![Quad Shape component properties](/images/user-guide/features/components/reference/shape/quad-shape-component-ui-01.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Visible** | Enable to always display the Shape component in the Perspective view, even when the entity is not selected. Disable to hide the Shape component when the entity is not selected. | Boolean | `Enabled` |
| **Game View** | Enable to display the Shape component while in game mode in the editor. | Boolean | `Disabled` |
| **Shape Color** | The color of the Shape component. | Eight bits per channel color: 0-255 | `255,255,199` |
| **Width** | The width of the Quad Shape in meters on the local X axis. | 0 - Infinity | `1.0` |
| **Height** | The height of the Quad Shape in meters on the local Y axis. | 0 - Infinity | `1.0` |

## Component request bus ##

Use the following request functions with the `QuadShapeComponentRequestBus` EBus interface to communicate with other components of your game.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetQuadConfiguration` | Returns the configuration of the quad shape. | None | `QuadShapeConfiguration` object that contains the configuration for the quad shape. | Yes |
