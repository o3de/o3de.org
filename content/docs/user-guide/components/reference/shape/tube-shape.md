---
title: Tube Shape Component
linktitle: Tube Shape
description: ' Open 3D Engine (O3DE) Tube Shape component reference. '
weight: 100
---



The **Tube Shape** component creates a transparent, enclosed cylindrical volume that's fit to a [Spline component](/docs/user-guide/components/reference/shape/spline/). The dimensions of the tube can be edited with the **Radius** and **Variable Radius** properties, and by editing the [Spline component](/docs/user-guide/components/reference/shape/spline/). The Tube Shape component is not a mesh, but rather a helper geometry that can be used to define volumes for shape gradients, audio, vegetation, PhysX, and any application that can utilize the Shape EBus. For more information on using Shape components, see [Shape components](/docs/user-guide/components/reference/shape/).

## Provider

[O3DE Core (LmbrCentral) Gem](/docs/user-guide/gems/reference/o3de-core)

## Dependencies

[Spline component](/docs/user-guide/components/reference/shape/spline/)

## Tube Shape properties

![Tube Shape component properties](/images/user-guide/components/reference/shape/tube-shape-component-ui-01.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Visible** | Enable to always display the shape in the viewport, even when the entity is not selected. Disable to hide the shape when the entity is not selected. | Boolean | `Enabled` |
| **Game View** | Enable to display the shape while in **Game** mode. | Boolean | `Disabled` |
| **Filled** | Enable to display the shape as filled.  Disable to display the shape as a wireframe. | Boolean | `Enabled` |
| **Shape Color** | The color of the shape. | Eight bits per channel color: 0-255 | `255,255,199` |
| **Tube Shape - Radius** | The uniform radius that defines the Tube Shape's width. | 0.1 to Infinity | `1.0` |
| **Tube Shape - Variable Radius** | The Variable Radius property contains a list with one item for each point of the spline backbone. The list values are added to the uniform Radius values for the corresponding points on the spline to create a tube with a variable radius at each point.  | 0.0 to Infinity | `0.0` |
| **Edit** | Choose the **Edit** button to enter Edit mode. In Edit mode, you can modify the dimensions of the shape in the viewport using the methods outlined in [Edit mode actions](#edit-mode-actions) below. While in Edit mode, the Edit menu in the menu bar displays available actions and hotkeys. To exit Edit mode, choose **Done** in the component interface. |  |  |

## Edit mode actions

* **Left-click** and drag the black handles at each spline point in the viewport to modify the **Variable Radius** for each section of the Tube Shape.

## TubeShapeComponentRequestsBus

Use the following request functions with the `TubeShapeComponentRequestsBus` EBus interface to communicate with Tube Shape components in your game.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetRadius` | Returns the **Radius** of the tube. | None | Radius: Float | Yes |
| `GetTotalRadius` | Returns the total interpolated radius of the tube. This is the sum of the radius and the variable radius. | Index: Integer | Total Radius: Float | Yes |
| `GetVariableRadius` | Returns the **Variable Radius** along the spline. | Index: Integer | Variable Radius: Float | Yes |
| `SetRadius` | Sets the **Radius** of the tube. | Radius: Float | None | Yes |
| `SetVariableRadius` | Sets the **Variable Radius** of the tube at a spline point. | Index: Integer, Radius: Float | None | Yes |

Refer to [Shape component Ebus interface](./#shape-component-ebus-interface) for a description of functions that are available to all Shape components.
