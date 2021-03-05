---
description: ' Open 3D Engine (O3DE) Tube Shape component reference. '
title: Tube Shape component
---

The **Tube Shape** component creates a transparent, enclosed cylindrical volume with a 1-meter diameter that's fit to a Spline. The dimensions of the tube can be edited with the **Radius** and **Variable Radius** properties, and by editing the Spline component. The Tube Shape component is not a mesh, but rather a helper geometry that can be used to define volumes for shape gradients, audio, vegetation, PhysX, and any application that can utilize the Shape EBus. For more information on using Shape components, see [Shape components](/docs/user-guide/features/components/reference/shape/intro.md).


**Provided by:** [LmbrCentral Gem](/docs/user-guide/features/gems/reference/lmbr-central.md)

**Dependencies:** [Spline component](/docs/user-guide/features/components/reference/shape/spline.md)

## Properties ##

![Tube Shape component properties](/images/user-guide/features/components/reference/shape/tube-shape-component-ui-01.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Visible** | Enable to always display the Shape component in the Perspective view, even when the entity is not selected. Disable to hide the Shape component when the entity is not selected. | Boolean | Enabled |

| **Game View** | Enable to display the Shape component while in game mode in the editor. | Boolean | Disabled |

| **Shape Color** | The color of the Shape component. | Eight bits per channel color: 0-255 | R:255, G:255, B:199 |

| **Tube Shape - Radius** | The uniform radius that defines the Tube Shape's width. | 0.1 - Infinity | 1.0 |
| **Tube Shape - Variable Radius** | The Variable Radius property contains a list with one item for each point of the spline backbone. The list values are added to the uniform Radius values for the corresponding points on the spline to create a tube with a variable radius at each point.  | 0.0 - Infinity | 0.0 |
| **Edit** | Click to enter Edit mode. In Edit mode, you can modify the Variable Radius for each point of the Tube Shape in the Perspective view by clicking and dragging the black handles at each spline point. While in Edit mode, the Edit menu in the menu bar displays available actions and hotkeys. To exit Edit mode, choose **Done** in the component interface. |  |  |


## TubeShapeComponentRequestBus ##

Use the following request functions with the `TubeShapeComponentRequestBus` EBus interface to communicate with other components of your game.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetRadius` | Returns the radius of the tube. | None | Float | Yes |
| `GetTotalRadius` | Returns the total interpolated radius of the tube. This is the sum of the radius and the variable radius. | Integer - Spline vertex index. | Float | Yes |
| `GetVariableRadius` | Returns the variable radius along the spline. | Integer - Spline vertex index. | Float | Yes |
| `SetRadius` | Sets the radius of the tube. | Float | Void | Yes |
| `SetVariableRadius` | Sets the variable radius of the tube at a spline point. | Float | Void | Yes |
