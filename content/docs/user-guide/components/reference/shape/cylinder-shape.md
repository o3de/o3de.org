---
title: Cylinder Shape component
linktitle: Cylinder
description: ' Open 3D Engine (O3DE) Cylinder Shape component reference. '
weight: 100
---

{{< preview-migrated >}}

The **Cylinder Shape** component creates a transparent cylinder that's oriented on the local Z axis. The dimensions of the cylinder can be edited with the **Height** and **Radius** properties. The Cylinder Shape component is not a mesh, but rather a helper geometry that can be used to define volumes for spawners, shape gradients, audio, vegetation, PhysX, and any application that can utilize the Shape EBus. For more information on using Shape components, see [Shape components](/docs/user-guide/components/reference/shape/_index.md).

## Provider ##

[LmbrCentral Gem](/docs/user-guide/gems/reference/lmbr-central.md)

## Properties ##

![Capsule Shape component properties](/images/user-guide/components/reference/shape/cylinder-shape-component-ui-01.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Visible** | Enable to always display the Shape component in the Perspective view, even when the entity is not selected. Disable to hide the Shape component when the entity is not selected. | Boolean | `Enabled` |
| **Game View** | Enable to display the Shape component while in game mode in the editor. | Boolean | `Disabled` |
| **Shape Color** | The color of the Shape component. | Eight bits per channel color: 0-255 | `255,255,199` |
| **Height** | The height of the Cylinder Shape in meters. | 0 - Infinity | `1.0` |
| **Radius** | The radius of the Cylinder Shape in meters. | 0 - Infinity | `0.5` |

## CylinderShapeComponentRequestBus ##

Use the following request functions with the `CylinderShapeComponentRequestBus` EBus interface to communicate with other components of your game.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetCylinderConfiguration` | Returns the configuration of the cylinder shape. | None | `CylinderShapeConfiguration` object that contains the configuration for the cylinder shape. | Yes |
