---
description: ' Open 3D Engine (O3DE) Spline component reference. '
title: Spline component
date: 2021-03-05
---

{{< preview-migrated >}}

The **Spline** component creates a line that is 4 meters long, with 4 points. The point positions are defined in the local space of the entity. The spline's length, segments, and shape can be defined using the component's **Spline Type** property and **Edit** functionality. Splines are curves that connect two or more points and can be used as paths for animated entities or as a backbone for components such as the [Tube Shape](/docs/user-guide/components/reference/shape/tube-shape.md) component.

## Provider ##

[LmbrCentral Gem](/docs/user-guide/gems/reference/lmbr-central.md)

## Base properties ##

![Spline component properties](/images/user-guide/components/reference/shape/spline-component-ui-01.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Visible** | Enable to display the spline in the editor Perspective view. | Boolean | `Enabled` |
| **Configuration - Spline Type** | The interpolation type that defines the spline's segments. Linear splines have straight segments. Bezier splines interpolate a curve with uniform steps through the spline's segments. Catmull-Rom splines are defined by control points. A Catmull-Rom spline needs four control points to define each segment, so the default spline with four points will only generate one segment.  | [Linear,](#linear-spline-type-properties) [Bezier,](#bezier-spline-type-properties) [Catmull-Rom](#catmull-rom-spline-type-properties) | `Linear` |
| **Spline** | The Spline property group options depend on the selected Spline Type. See the property group sections below for more information. | [Linear,](#linear-spline-type-properties) [Bezier,](#bezier-spline-type-properties) [Catmull-Rom](#catmull-rom-spline-type-properties) |  |
| **Edit** | Click to enter Edit mode. In Edit mode, you can modify the length, segments and shape of the spline in the Perspective view using the methods outlined in [Edit mode actions](#edit-mode-actions) below. While in Edit mode, the Edit menu in the menu bar displays available actions and hotkeys. To exit Edit mode, choose **Done** in the component interface. |  |  |

## Linear spline type properties ##

![Linear spline component properties](/images/user-guide/components/reference/shape/spline-component-ui-02.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Closed** | Enable to close the spline and create a loop. | Boolean | `Disabled` |

## Bezier spline type properties ##

![Bezier spline component properties](/images/user-guide/components/reference/shape/spline-component-ui-03.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Closed** | Enable to close the spline and create a loop. | Boolean | `Disabled` |
| **Granularity** | The number of interpolation steps in each spline segment. The higher the Granularity value, the smoother the curve segment. | 2 - 64 | `8` |

## Catmull-Rom spline type properties ##

![Catmull-Rom spline component properties](/images/user-guide/components/reference/shape/spline-component-ui-04.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Closed** | Enable to close the spline and create a loop. | Boolean | `Disabled` |
| **Knot Parameterization** | Specifies how the spline is interpolated between control points. Smaller values sharpen the interpolation around control points and higher values ease the interpolation around control points. | 0 - 1 | `0.0` |
| **Granularity** | The number of interpolation steps in each spline segment. The higher the Granularity value, the smoother the curve segment. | 2 - 64 | `8` |

## Edit mode actions ##

* **Select a point** - Click any point.
* **Add to selection** - While holding **Control**, click an unselected point.
* **Remove from selection** - While holding **Control**, click a selected point.
* **Select multiple** - While holding **Shift**, click and drag over multiple points.
* **Move point(s)** - With point(s) selected, click and drag the transform manipulator.
* **Add a point** - While holding **Control**, click on a segment between existing points.
* **Delete a point** - While holding **Alt**, click on a point.
* **Delete selected points** - Press **Delete** to delete all selected points.
* **Snap points to position** - While holding **Control + Shift**, click in the Perspective view to snap the selected points to the position.
* **Snap points to grid** - If the **Snap to grid** tool is enabled in Edit mode, points will snap to positions on the construction plane.

## SplineComponentRequestBus ##

Use the following request functions with the `BoxShapeComponentRequestBus` EBus interface to communicate with other components of your game. The Spline component also uses `VertexContainer` functions. See [Vertex Container](/docs/user-guide/components/reference/shape/vertex-container.md) for more information.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetSpline` | Returns a constant pointer to the underlying spline type. You can use this function to query the spline against raycasts and positions. You can also request information, such as the length of the spline, its position, normal, and tangent at various points along the spline. | None | `AZ::ConstSplinePtr` | Yes |
| `ChangeSplineType` | Changes the type of the spline to Linear, Bezier, or Catmull-Rom. | `AZ::u64` containing RTTI hash of the spline type. | Void | Yes |
| `SetClosed` | Specify `True` to connect the the end points of the spline and create a closed loop. Specify `False` to disconnect the the end points of the spline and create an open curve.  | Boolean | Void | Yes |
