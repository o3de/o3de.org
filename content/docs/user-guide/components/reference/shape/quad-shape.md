---
title: Quad Shape Component
linktitle: Quad Shape
description: ' Open 3D Engine (O3DE) Quad Shape component reference. '
weight: 100
---



The **Quad Shape** component creates a transparent square plane that's oriented on the local Z axis. The dimensions of the quad can be edited with the **Width** and **Height** properties. The Quad Shape component is not a mesh, but rather a helper geometry that can be used to define areas for area lights, spawners, shape gradients, audio, vegetation, PhysX, and any application that can utilize the Shape EBus. For more information on using Shape components, see [Shape components](/docs/user-guide/components/reference/shape/).

## Provider

[O3DE Core (LmbrCentral) Gem](/docs/user-guide/gems/reference/o3de-core)

## Quad Shape properties

![Quad Shape component properties](/images/user-guide/components/reference/shape/quad-shape-component-ui-01.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Visible** | Enable to always display the shape in the viewport, even when the entity is not selected. Disable to hide the shape when the entity is not selected. | Boolean | `Enabled` |
| **Game View** | Enable to display the shape while in **Game** mode. | Boolean | `Disabled` |
| **Shape Color** | The color of the shape. | Eight bits per channel color: 0-255 | `255,255,199` |
| **Width** | The width of the shape in meters on the local X axis. | 0.0 to Infinity | `1.0` |
| **Height** | The height of the shape in meters on the local Y axis. | 0.0 to Infinity | `1.0` |

## QuadShapeComponentRequestsBus

Use the following request functions with the `QuadShapeComponentRequestsBus` EBus interface to communicate with Quad Shape components in your game.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetQuadConfiguration` | Returns the configuration of the quad shape. | None | `LmbrCentral_QuadShapeConfig` object that contains the properties `Height` and `Width`. | Yes |
|`GetQuadHeight`| Returns the **Height** of the quad shape. | None | Height: Float | Yes |
|`GetQuadOrientation`| Returns the orientation of the quad shape. | None | Orientation: Quaternion | Yes |
|`GetQuadWidth`| Returns the **Width** of the quad shape. | None | Width: Float | Yes |
|`SetQuadHeight`| Sets the **Height** of the quad shape. | Height: Float | None | Yes |
|`SetQuadWidth`| Sets the **Width** of the quad shape. | Width: Float | None | Yes |

Refer to [Shape component Ebus interface](./#shape-component-ebus-interface) for a description of functions that are available to all Shape components.
