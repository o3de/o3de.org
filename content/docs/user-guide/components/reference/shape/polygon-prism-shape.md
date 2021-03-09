---
description: ' Open 3D Engine (O3DE) Polygon Prism Shape component reference. '
title: Polygon Prism Shape component
date: 2021-03-05
---

{{< preview-migrated >}}

The **Polygon Prism Shape** component creates a transparent cuboid volume. The prism shape is defined by points that lie on the local XY plane. The point positions create identical parallel planes that are separated by a height value, and are connected by edges at right angles. The Polygon Prism Shape can be defined using the component's **Height** property and **Edit** functionality. Polygon Prism Shapes can have three or more sides that do not self-intersect. The Polygon Prism Shape component is not a mesh, but rather a helper geometry that can be used to define volumes for area lights, AI, shape gradients, audio, vegetation, PhysX, and any application that can utilize the Shape EBus. For more information on using Shape components, see [Shape components](/docs/user-guide/components/reference/shape/_index.md).

## Provider ##

[LmbrCentral Gem](/docs/user-guide/gems/reference/lmbr-central.md)

## Properties ##

![Polygon Prism Shape component properties](/images/user-guide/components/reference/shape/polygon-prism-shape-component-ui-01.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Visible** | Enable to always display the Shape component in the Perspective view, even when the entity is not selected. Disable to hide the Shape component when the entity is not selected. | Boolean | `Enabled` |
| **Game View** | Enable to display the Shape component while in game mode in the editor. | Boolean | `Disabled` |
| **Shape Color** | The color of the Shape component. | Eight bits per channel color: 0-255 | `255,255,199` |
| **Height** | The height of the Polygon Prism Shape in meters. | 0 - Infinity | `1.0` |
| **Edit** | Click to enter Edit mode. In Edit mode, you can modify the dimensions of the Polygon Prism Shape in the Perspective view using the methods outlined in [Edit mode actions](#edit-mode-actions) below. While in Edit mode, the Edit menu in the menu bar displays available actions and hotkeys. To exit Edit mode, choose **Done** in the component interface. |  |  |

## Edit mode actions ##

* **Select a vertex** - Click any vertex.
* **Add to selection** - While holding **Control**, click an unselected vertex.
* **Remove from selection** - While holding **Control**, click a selected vertex.
* **Select multiple** - While holding **Shift**, click and drag over multiple vertices.
* **Move vertices** - Click and drag the red and green transform manipulator of a selected vertex. The top and bottom prism planes must be parallel, so vertex movement is limited to the XY plane.
* **Add a vertex** - While holding **Control**, click on an edge between existing vertices.
* **Delete a vertex** - While holding **Alt**, click on a vertex.
* **Delete multiple vertices** - Press **Delete** to delete all selected vertices.
* **Modify Height** - Click and drag the blue transform manipulator at the top-center of the Polygon Prism Shape.
* **Snap vertices to position** - While holding **Control + Shift**, click in the Perspective view to snap the selected vertices to the position.
* **Snap vertices to grid** - If the **Snap to grid** tool is enabled in Edit mode, vertices will snap to positions on the construction plane.

## PolygonPrismShapeComponentRequestBus ##

Use the following request functions with the `PolygonPrismShapeComponentRequestBus` EBus interface to communicate with other components of your game. The Polygon Prism Shape component also uses `VertexContainer` functions. See [Vertex Container](/docs/user-guide/components/reference/shape/vertex-container.md) for more information.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetPolygonPrism` | Returns a constant pointer to the underlying polygon prism shape data. | None | `AZ::ConstPolygonPrismPtr` | Yes |
| `SetHeight` | Sets the height of the polygon prism shape. | Float: 0.0 - Infinity | Void | Yes |
