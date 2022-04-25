---
title: Disk Shape Component
linktitle: Disk Shape
description: ' Open 3D Engine (O3DE) Disk Shape component reference. '
weight: 100
---



The **Disk Shape** component creates a transparent circular surface that's oriented on the local Z axis. The dimensions of the disk can be edited with the **Radius** property. The Disk Shape component is not a mesh, but rather a helper geometry that can be used to define areas for area lights, spawners, shape gradients, audio, vegetation, PhysX, and any application that can utilize the Shape EBus. For more information on using Shape components, see [Shape components](/docs/user-guide/components/reference/shape/).

## Provider

[O3DE Core (LmbrCentral) Gem](/docs/user-guide/gems/reference/o3de-core)

## Disk Shape properties

![Disk Shape component properties](/images/user-guide/components/reference/shape/disk-shape-component-ui-01.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Visible** | Enable to always display the shape in the viewport, even when the entity is not selected. Disable to hide the shape when the entity is not selected. | Boolean | `Enabled` |
| **Game View** | Enable to display the shape while in game mode. | Boolean | `Disabled` |
| **Filled** | Enable to display the shape as filled.  Disable to display the shape as a wireframe. | Boolean | `Enabled` |
| **Shape Color** | The color of the shape. | Eight bits per channel color: 0-255 | `255,255,199` |
| **Radius** | The radius of the shape in meters. | 0.0 to Infinity | `0.5` |

## DiskShapeComponentRequestsBus

Use the following request functions with the `DiskShapeComponentRequestsBus` EBus interface to communicate with Disk Shape components in your game.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetDiskConfiguration` | Returns the configuration of the disk shape. | None | `DiskShapeConfig` object that contains the property `Radius`. | Yes |
|`GetRadius`| Returns the **Radius** of the disk shape. | None | Radius: Float | Yes |
|`SetRadius`| Sets the **Radius** of the disk shape. | Radius: Float | None | Yes |

Refer to [Shape component Ebus interface](./#shape-component-ebus-interface) for a description of functions that are available to all Shape components.
