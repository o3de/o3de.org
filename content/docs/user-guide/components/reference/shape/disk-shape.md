---
title: Disk Shape component
linktitle: Disk
description: ' Open 3D Engine (O3DE) Disk Shape component reference. '
weight: 100
---



The **Disk Shape** component creates a transparent circular surface that's oriented on the local Z axis. The dimensions of the disk can be edited with the **Radius** property. The Disk Shape component is not a mesh, but rather a helper geometry that can be used to define areas for area lights, spawners, shape gradients, audio, vegetation, PhysX, and any application that can utilize the Shape EBus. For more information on using Shape components, see [Shape components](/docs/user-guide/components/reference/shape/_index.md).

## Provider ##

[LmbrCentral Gem](/docs/user-guide/gems/reference/core/lmbr-central)

## Properties ##

![Disk Shape component properties](/images/user-guide/components/reference/shape/disk-shape-component-ui-01.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Visible** | Enable to always display the Shape component in the Perspective view, even when the entity is not selected. Disable to hide the Shape component when the entity is not selected. | Boolean | `Enabled` |
| **Game View** | Enable to display the Shape component while in game mode in the editor. | Boolean | `Disabled` |
| **Shape Color** | The color of the Shape component. | Eight bits per channel color: 0-255 | `255,255,199` |
| **Radius** | The radius of the Disk Shape in meters. | 0 - Infinity | `0.5` |

## DiskShapeComponentRequestBus ##

Use the following request functions with the `DiskShapeComponentRequestBus` EBus interface to communicate with other components of your game.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetDiskConfiguration` | Returns the configuration of the disk shape. | None | `DiskShapeConfiguration` object that contains the configuration for the disk shape. | Yes |
