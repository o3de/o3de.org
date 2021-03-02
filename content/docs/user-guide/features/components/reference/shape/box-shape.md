---
description: ' Open 3D Engine (O3DE) Box Shape component reference. '
title: Box Shape component
---

The **Box Shape** component creates a 1 cubic meter box that is displayed with a transparent color. The dimensions of the box can be edited with the **Dimensions** property or by entering **Edit** mode. The Box Shape component is not a mesh but rather a helper geometry that can be used to define volumes for fog, spawners, shape gradients, audio, vegetation, PhysX, and any application that can utilize the Shape EBus. For more information on using Shape components, see [Shape components](/docs/user-guide/features/components/reference/shape/intro.md).

**Provided by:** [LmbrCentral Gem](/docs/user-guide/features/gems/reference/lmbr-central.md)

## Properties ##

![Box Shape component properties](/images/user-guide/features/components/reference/shape/box-shape-component-ui-01.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Visible** | Enable to always display the shape component in the Perspective view, even when the entity is not selected. Disable to hide the shape component when the entity is not selected. | Boolean | Enabled |
| **Game View** | Enable to display the shape component while in game mode in the editor. | Boolean | Disabled |
| **Shape Color** | The color of the shape component. | Eight bits per channel color: 0-255 | R:255, G:255, B:199 |
| **Box Shape - Dimensions** | The size of the Box Shape in X, Y and Z dimensions in local space. | Vector3: -Infinity to Infinity | X:1.0, Y:1.0, Z:1.0 |
| **Edit** | Click to enter Edit mode. In Edit mode, you can modify the dimensions of the Box Shape in the Perspective view by clicking and dragging the black handles on the sides of the Box Shape. While in Edt mode, the Edit menu in the menu bar displays available actions and hotkeys. To exit Edit mode, choose **Done** in the component interface. |  |  |

## BoxShapeComponentRequestBus ##

Use the following request functions with the `BoxShapeComponentRequestBus` EBus interface to communicate with other components of your game.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetBoxConfiguration` | Returns the configuration of the box shape. | None | `BoxShapeConfiguration` object that contains the configuration for the box shape. | Yes |
