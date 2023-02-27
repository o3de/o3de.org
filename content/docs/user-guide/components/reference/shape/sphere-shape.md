---
title: Sphere Shape Component
linktitle: Sphere Shape
description: ' Open 3D Engine (O3DE) Sphere Shape component reference. '
weight: 100
---



The **Sphere Shape** component creates a transparent sphere. The dimensions of the sphere can be edited with the **Radius** property. The Sphere Shape component is not a mesh, but rather a helper geometry that can be used to define volumes for area lights, shape gradients, audio, vegetation, PhysX, and any application that can utilize the Shape EBus. For more information on using Shape components, see [Shape components](/docs/user-guide/components/reference/shape/).

## Provider

[O3DE Core (LmbrCentral) Gem](/docs/user-guide/gems/reference/o3de-core)

## Sphere Shape properties

![Sphere Shape component properties](/images/user-guide/components/reference/shape/sphere-shape-component-ui-01.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Visible** | Enable to always display the shape in the viewport, even when the entity is not selected. Disable to hide the shape when the entity is not selected. | Boolean | `Enabled` |
| **Game View** | Enable to display the shape while in game mode. | Boolean | `Disabled` |
| **Filled** | Enable to display the shape as filled.  Disable to display the shape as a wireframe. | Boolean | `Enabled` |
| **Shape Color** | The color of the shape. | Eight bits per channel color: 0-255 | `255,255,199` |
| **Radius** | The radius of the shape in meters. | 0.0 to Infinity | `0.5` |
| **Translation Offset** | Translation offset of the shape relative to its entity. | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Edit** | Choose the **Edit** button to enter Edit mode. In Edit mode, you can modify the dimensions of the shape in the viewport using the methods outlined in [Edit mode actions](#edit-mode-actions) below. While in Edit mode, the Edit menu in the menu bar displays available actions and hotkeys. To exit Edit mode, choose **Done** in the component interface. |  |  |

## Edit mode actions

The edit mode provides two sub-modes. You can switch between sub-modes using the buttons in the **Viewport UI Cluster** in the top left of the **Editor**, by using the keyboard hotkeys listed below, or by using **Ctrl + Mousewheel Up/Down**.

| Mode | Icon | Keyboard Hotkey | Description |
| - | - | - | - |
| **Dimensions** | ![Shape component mode dimensions submode icon](/images/user-guide/components/reference/shape/shape-component-mode-submode-dimensions.svg) | **1** | **Left-click** and drag the black handle on the surface of the Sphere Shape to edit the **Radius**. |
| **Translation Offset** | ![Shape component mode translation offset submode icon](/images/user-guide/components/reference/shape/shape-component-mode-submode-translation-offset.svg) | **2** | **Left-click** and drag the linear or planar manipulators to edit the **Translation Offset**. |
| **Reset Current Mode** | | **R** | Resets the properties manipulated by the current sub-mode to their default values. | 

## SphereShapeComponentRequestsBus

Use the following request functions with the `SphereShapeComponentRequestsBus` EBus interface to communicate with Sphere Shape components in your game.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetSphereConfiguration` | Returns the configuration of the sphere shape. | None | `SphereShapeConfig` object that contains the property `Radius`. | Yes |
| `SetRadius` | Sets the **Radius** of the sphere shape. | Radius: Float | None | Yes |

Refer to [Shape component Ebus interface](./#shape-component-ebus-interface) for a description of functions that are available to all Shape components.
