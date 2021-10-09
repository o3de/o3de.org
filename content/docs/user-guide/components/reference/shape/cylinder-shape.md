---
title: Cylinder Shape Component
linktitle: Cylinder Shape
description: ' Open 3D Engine (O3DE) Cylinder Shape component reference. '
weight: 100
---



The **Cylinder Shape** component creates a transparent cylinder that's oriented on the local Z axis. The dimensions of the cylinder can be edited with the **Height** and **Radius** properties. The Cylinder Shape component is not a mesh, but rather a helper geometry that can be used to define volumes for spawners, shape gradients, audio, vegetation, PhysX, and any application that can utilize the Shape EBus. For more information on using Shape components, see [Shape components](/docs/user-guide/components/reference/shape/).

## Provider

[O3DE Core (LmbrCentral) Gem](/docs/user-guide/gems/reference/o3de-core)

## Cylinder Shape properties

![Capsule Shape component properties](/images/user-guide/components/reference/shape/cylinder-shape-component-ui-01.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Visible** | Enable to always display the shape in the viewport, even when the entity is not selected. Disable to hide the shape when the entity is not selected. | Boolean | `Enabled` |
| **Game View** | Enable to display the shape while in **Game** mode. | Boolean | `Disabled` |
| **Filled** | Enable to display the shape as filled.  Disable to display the shape as a wireframe. | Boolean | `Enabled` |
| **Shape Color** | The color of the shape. | Eight bits per channel color: 0-255 | `255,255,199` |
| **Height** | The height of the shape in meters. | 0 - Infinity | `1.0` |
| **Radius** | The radius of the shape in meters. | 0 - Infinity | `0.5` |

## CylinderShapeComponentRequestsBus

Use the following request functions with the `CylinderShapeComponentRequestsBus` EBus interface to communicate with Cylinder Shape components in your game.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetCylinderConfiguration` | Returns the configuration of the cylinder shape. | None | `CylinderShapeConfig` object that contains the properties `Height` and `Radius`. | Yes |
| `SetHeight` | Sets the **Height** of the cylinder shape. | Height: Float | Returned: Boolean | Yes |
| `SetRadius` | Sets the **Radius** of the cylinder shape. | Radius: Float | Returned: Boolean | Yes |

Refer to [Shape component Ebus interface](./#shape-component-ebus-interface) for a description of functions that are available to all Shape components.
