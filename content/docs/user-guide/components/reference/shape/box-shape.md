---
title: Box Shape component
linktitle: Box
description: ' Open 3D Engine (O3DE) Box Shape component reference. '
weight: 100
---



The **Box Shape** component creates transparent box. The dimensions of the box can be edited with the **Dimensions** property or by entering **Edit** mode. The Box Shape component is not a mesh, but rather a helper geometry that can be used to define volumes for fog, spawners, shape gradients, audio, vegetation, PhysX, and any application that can utilize the Shape EBus. For more information on using Shape components, see [Shape components](/docs/user-guide/components/reference/shape/).

## Provider ##

[LmbrCentral Gem](/docs/user-guide/gems/reference/core/lmbr-central)

## Properties ##

![Box Shape component properties](/images/user-guide/components/reference/shape/box-shape-component-ui-01.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Visible** | Enable to always display the Shape component in the Perspective view, even when the entity is not selected. Disable to hide the Shape component when the entity is not selected. | Boolean | `Enabled` |
| **Game View** | Enable to display the Shape component while in game mode in the editor. | Boolean | `Disabled` |
| **Shape Color** | The color of the Shape component. | Eight bits per channel color: 0-255 | `255,255,199` |
| **Box Shape - Dimensions** | The size of the Box Shape in X, Y and Z dimensions in local space. | Vector3: -Infinity to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Edit** | Click to enter Edit mode. In Edit mode, you can modify the dimensions of the Box Shape in the Perspective view using the methods outlined in [Edit mode actions](#edit-mode-actions) below. While in Edit mode, the Edit menu in the menu bar displays available actions and hotkeys. To exit Edit mode, choose **Done** in the component interface. |  |  |

## Edit mode actions ##

* Click and drag the black handles on the sides of the Box Shape to resize the box in its local X, Y, and Z dimensions.

## BoxShapeComponentRequestBus ##

Use the following request functions with the `BoxShapeComponentRequestBus` EBus interface to communicate with other components of your game.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetBoxConfiguration` | Returns the configuration of the box shape. | None | `BoxShapeConfiguration` object that contains the configuration for the box shape. | Yes |
