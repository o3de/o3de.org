---
title: Capsule Shape Component
linktitle: Capsule Shape
description: ' Open 3D Engine (O3DE) Capsule Shape component reference. '
weight: 100
---



The **Capsule Shape** component creates a transparent capsule that's oriented on the local Z axis. The dimensions of the capsule can be edited with the **Height** and **Radius** properties. The Capsule Shape component is not a mesh, but rather a helper geometry that can be used to define volumes for area lights, shape gradients, audio, vegetation, PhysX, and any application that can utilize the Shape EBus. For more information on using Shape components, see [Shape components](/docs/user-guide/components/reference/shape/).

## Provider

[O3DE Core (LmbrCentral) Gem](/docs/user-guide/gems/reference/o3de-core)

## Capsule Shape properties

![Capsule Shape component properties](/images/user-guide/components/reference/shape/capsule-shape-component-ui-01.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Visible** | Enable to always display the shape in the viewport, even when the entity is not selected. Disable to hide the shape when the entity is not selected. | Boolean | `Enabled` |
| **Game View** | Enable to display the shape while in game mode. | Boolean | `Disabled` |
| **Filled** | Enable to display the shape as filled.  Disable to display the shape as a wireframe. | Boolean | `Enabled` |
| **Shape Color** | The color of the shape. | Eight bits per channel color: 0-255 | `255,255,199` |
| **Height** | The height of the shape in meters. The height value must be at least twice the value of **Radius**. | 0.0 to Infinity | `1.0` |
| **Radius** | The radius of the shape in meters. The radius value must be no more than half the value of **Height**. | 0.0 to Infinity | `0.25` |
| **Translation Offset** | Translation offset of the shape relative to its entity. | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Edit** | Choose the **Edit** button to enter Edit mode. In Edit mode, you can modify the dimensions of the shape in the viewport using the methods outlined in [Edit mode actions](#edit-mode-actions) below. While in Edit mode, the Edit menu in the menu bar displays available actions and hotkeys. To exit Edit mode, choose **Done** in the component interface. |  |  |

## Edit mode actions

The edit mode provides two sub-modes.
| Mode | Icon | Description
| - | - | - |
| **Dimensions** | ![Shape component mode dimensions submode icon](/images/user-guide/components/reference/shape/shape-component-mode-submode-dimensions.svg) | **Left-click** and drag the black handles on the ends of the Capsule Shape to edit the **Height**. By default, each end of the capsule can be separately edited. Hold **Shift** to edit both ends symmetrically. **Left-click** and drag the black handle halfway along the Capsule Shape to edit the **Radius**. |
| **Translation Offset** | ![Shape component mode translation offset submode icon](/images/user-guide/components/reference/shape/shape-component-mode-submode-translation-offset.svg) | **Left-click** and drag the linear manipulators or planar manipulators to edit the **Translation Offset**. |

## CapsuleShapeComponentRequestsBus

Use the following request functions with the `CapsuleShapeComponentRequestsBus` EBus interface to communicate with Capsule Shape components in your game.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetCapsuleConfiguration` | Returns the configuration of the capsule shape. | None | `CapsuleShapeConfig` object that contains the properties `Height` and `Radius`. | Yes |
| `SetHeight` | Sets the **Height** of the capsule shape. | Height: Float | None | Yes |
| `SetRadius` | Sets the **Radius** of the capsule shape. | Radius: Float | None | Yes |

Refer to [Shape component Ebus interface](./#shape-component-ebus-interface) for a description of functions that are available to all Shape components.
