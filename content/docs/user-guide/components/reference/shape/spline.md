---
title: Spline Component
linktitle: Spline
description: ' Open 3D Engine (O3DE) Spline component reference. '
weight: 100
---



The **Spline** component creates a line that is 8 meters long, with 4 points. The point positions are defined in the local space of the entity. The spline's length, segments, and shape can be defined using the component's **Spline Type** property and **Edit** functionality. Splines are curves that connect two or more points and can be used as paths for animated entities or as a backbone for components such as the [Tube Shape](/docs/user-guide/components/reference/shape/tube-shape/) component.

## Provider

[O3DE Core (LmbrCentral) Gem](/docs/user-guide/gems/reference/o3de-core)

## Spline properties

{{< tabs name="spline-component-ui" >}}
{{% tab name="Linear Spline" %}}

![Linear Spline](/images/user-guide/components/reference/shape/linear-spline-component-ui-01.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Visible** | Enable to always display the spline in the viewport, even when the entity is not selected. Disable to hide the spline when the entity is not selected. | Boolean | `Enabled` |
| **Configuration - Spline Type** | The interpolation type that defines the spline's segments. Linear splines have straight segments. Bezier splines interpolate a curve with uniform steps through the spline's segments. Catmull-Rom splines are defined by control points. A Catmull-Rom spline needs four control points to define each segment, so the default spline with four points will only generate one segment.  | [Linear,](#linear-spline-type-properties) [Bezier,](#bezier-spline-type-properties) [Catmull-Rom](#catmull-rom-spline-type-properties) | `Linear` |
| **Spline** | The Spline property group options for the selected Spline Type. | | |
| **Closed** | Enable to close the spline and create a loop. | Boolean | `Disabled` |
| **Edit** | Choose the **Edit** button to enter Edit mode. In Edit mode, you can modify the length, segments and shape of the spline in the viewport using the methods outlined in [Edit mode actions](#edit-mode-actions) below. While in Edit mode, the Edit menu in the menu bar displays available actions and hotkeys. To exit Edit mode, choose **Done** in the component interface. |  |  |

{{% /tab %}}
{{% tab name="Bezier Spline" %}}

![Bezier Spline](/images/user-guide/components/reference/shape/bezier-spline-component-ui-01.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Visible** | Enable to always display the spline in the viewport, even when the entity is not selected. Disable to hide the spline when the entity is not selected. | Boolean | `Enabled` |
| **Configuration - Spline Type** | The interpolation type that defines the spline's segments. Linear splines have straight segments. Bezier splines interpolate a curve with uniform steps through the spline's segments. Catmull-Rom splines are defined by control points. A Catmull-Rom spline needs four control points to define each segment, so the default spline with four points will only generate one segment.  | [Linear,](#linear-spline-type-properties) [Bezier,](#bezier-spline-type-properties) [Catmull-Rom](#catmull-rom-spline-type-properties) | `Linear` |
| **Spline** | The Spline property group options for the selected Spline Type. | | |
| **Closed** | Enable to close the spline and create a loop. | Boolean | `Disabled` |
| **Granularity** | The number of interpolation steps in each spline segment. The higher the Granularity value, the smoother the curve segment. | 2 - 64 | `8` |
| **Edit** | Choose the **Edit** button to enter Edit mode. In Edit mode, you can modify the length, segments and shape of the spline in the viewport using the methods outlined in [Edit mode actions](#edit-mode-actions) below. While in Edit mode, the Edit menu in the menu bar displays available actions and hotkeys. To exit Edit mode, choose **Done** in the component interface. |  |  |

{{% /tab %}}
{{% tab name="Catmull-Rom Spline" %}}

![Catmull-Rom Spline](/images/user-guide/components/reference/shape/catmull-rom-spline-component-ui-01.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Visible** | Enable to always display the spline in the viewport, even when the entity is not selected. Disable to hide the spline when the entity is not selected. | Boolean | `Enabled` |
| **Configuration - Spline Type** | The interpolation type that defines the spline's segments. Linear splines have straight segments. Bezier splines interpolate a curve with uniform steps through the spline's segments. Catmull-Rom splines are defined by control points. A Catmull-Rom spline needs four control points to define each segment, so the default spline with four points will only generate one segment.  | [Linear,](#linear-spline-type-properties) [Bezier,](#bezier-spline-type-properties) [Catmull-Rom](#catmull-rom-spline-type-properties) | `Linear` |
| **Spline** | The Spline property group options for the selected Spline Type. | | |
| **Closed** | Enable to close the spline and create a loop. | Boolean | `Disabled` |
| **Knot Parameterization** | Specifies how the spline is interpolated between control points. Smaller values sharpen the interpolation around control points and higher values ease the interpolation around control points. | 0 - 1 | `0.0` |
| **Granularity** | The number of interpolation steps in each spline segment. The higher the Granularity value, the smoother the curve segment. | 2 - 64 | `8` |
| **Edit** | Choose the **Edit** button to enter Edit mode. In Edit mode, you can modify the length, segments and shape of the spline in the viewport using the methods outlined in [Edit mode actions](#edit-mode-actions) below. While in Edit mode, the Edit menu in the menu bar displays available actions and hotkeys. To exit Edit mode, choose **Done** in the component interface. |  |  |

{{% /tab %}}
{{< /tabs >}}

## Edit mode actions

* **Select a point** - **Left-click** any point.
* **Add to selection** - Hold **Ctrl** and **Left-click** an unselected point.
* **Remove from selection** - Hold **Ctrl** and **Left-click** a selected point.
* **Select multiple** - **Left-click** and drag over multiple points.
* **Move point(s)** - With point(s) selected, **Left-click** and drag the transform manipulator.
* **Add a point** - Hold **Ctrl** and **Left-click** on a segment between existing points.
* **Delete a point** - Hold **Alt** and **Left-click** on a point.
* **Delete selected points** - Press **Delete** to delete all selected points.
* **Snap points to position** - Hold **Ctrl + Shift** and **Left-click** in the viewport to snap the selected points to the position.
* **Snap points to grid** - If the **Enable Grid Snapping** is set to true in viewport options, points will snap to positions on the construction plane.

## SplineComponentRequestBus

Use the following request functions with the `SplineComponentRequestBus` EBus interface to communicate with Spline components in your game. The Spline component also uses `VertexContainer` functions. See [Vertex Container](/docs/user-guide/components/reference/shape/vertex-container/) for more information.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetSpline` | Returns a constant pointer to the underlying spline type. You can use this function to query the spline against raycasts and positions. You can also request information, such as the length of the spline, its position, normal, and tangent at various points along the spline. | None | Spline: `AZ::ConstSplinePtr` | No |
| `ChangeSplineType` | Changes the type of the spline to Linear, Bezier, or Catmull-Rom. | Spline Type: `AZ::u64` containing RTTI hash of the **Spline Type**. | None | No |
| `SetClosed` | Specify `True` to connect the end points of the spline and create a closed loop. Specify `False` to disconnect the end points of the spline and create an open curve.  | SetClosed: Boolean | None | No |

## SplineComponentNotificationBus

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `OnSplineChanged` | Notifies listeners that the spline has been updated. | None | None | Yes |
