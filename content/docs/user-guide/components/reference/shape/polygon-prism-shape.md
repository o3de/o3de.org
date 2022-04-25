---
title: Polygon Prism Shape Component
linktitle: Polygon Prism Shape
description: ' Open 3D Engine (O3DE) Polygon Prism Shape component reference. '
weight: 100
---



The **Polygon Prism Shape** component creates a transparent cuboid volume. The prism shape is defined by points that lie on the local XY plane. The point positions create identical parallel planes that are separated by a height value, and are connected by edges at right angles. The Polygon Prism Shape can be defined using the component's **Height** property and **Edit** functionality. Polygon Prism Shapes can have three or more sides that do not self-intersect. The Polygon Prism Shape component is not a mesh, but rather a helper geometry that can be used to define volumes for area lights, AI, shape gradients, audio, vegetation, PhysX, and any application that can utilize the Shape EBus. For more information on using Shape components, see [Shape components](/docs/user-guide/components/reference/shape/).

## Provider

[O3DE Core (LmbrCentral) Gem](/docs/user-guide/gems/reference/o3de-core)

## Polygon Prism Shape properties

![Polygon Prism Shape component properties](/images/user-guide/components/reference/shape/polygon-prism-shape-component-ui-01.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Visible** | Enable to always display the shape in the viewport, even when the entity is not selected. Disable to hide the shape when the entity is not selected. | Boolean | `Enabled` |
| **Game View** | Enable to display the shape while in game mode. | Boolean | `Disabled` |
| **Filled** | Enable to display the shape as filled.  Disable to display the shape as a wireframe. | Boolean | `Enabled` |
| **Shape Color** | The color of the shape. | Eight bits per channel color: 0-255 | `255,255,199` |
| **Height** | The height of the shape in meters. | 0.0 to Infinity | `1.0` |
| **Edit** | Choose the **Edit** button to enter Edit mode. In Edit mode, you can modify the dimensions of the shape in the viewport using the methods outlined in [Edit mode actions](#edit-mode-actions) below. While in Edit mode, the Edit menu in the menu bar displays available actions and hotkeys. To exit Edit mode, choose **Done** in the component interface. |  |  |

## Edit mode actions

* **Select a vertex** - **Left-click** any vertex.
* **Add to selection** - Hold **Ctrl** and **Left-click** an unselected vertex.
* **Remove from selection** - Hold **Ctrl** and **Left-click** a selected vertex.
* **Select multiple** - Hold **Shift** and **Left-click** and drag over multiple vertices.
* **Move vertices** - **Left-click** and drag the red and green transform manipulator of a selected vertex. The top and bottom prism planes must be parallel, so vertex movement is limited to the XY plane.
* **Add a vertex** - Hold **Ctrl** and **Left-click** on an edge between existing vertices.
* **Delete a vertex** - Hold **Alt** and **Left-click** on a vertex.
* **Delete multiple vertices** - Press **Delete** to delete all selected vertices.
* **Modify Height** - **Left-click** and drag the blue transform manipulator at the top-center of the Polygon Prism Shape.
* **Snap vertices to position** - Hold **Ctrl + Shift** and **Left-click** in the viewport to snap the selected vertices to the position.
* **Snap vertices to grid** - If the **Snap to grid** tool is enabled in Edit mode, vertices will snap to positions on the construction plane.

## PolygonPrismShapeComponentRequestBus

Use the following request functions with the `PolygonPrismShapeComponentRequestBus` EBus interface to communicate with Polygon Prism Shape components in your game. The Polygon Prism Shape component also uses `VertexContainer` functions. See [Vertex Container](/docs/user-guide/components/reference/shape/vertex-container/) for more information.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `AddVertex` | Adds a vertex to the polygon prism shape. | Vertex: Vector2 | None | Yes |
| `ClearVertices` | Removes all vertices from the polygon prism shape.  | None | None | Yes |
| `GetPolygonPrism` | Returns a constant pointer to the underlying polygon prism shape object that contains the properties `Height` and `vertexContainer`. | None | `AZ::ConstPolygonPrismPtr` | Yes |
| `InsertVertex` | Inserts a vertex at the index position specified. | Index: Integer, Vertex: Vector2 | None | Yes |
| `RemoveVertex` | Removes the vertex at the index position specified. | Index: Integer | None | Yes |
| `SetHeight` | Sets the **Height** of the polygon prism shape. | Height: Float | None | Yes |
| `UpdateVertex` | Modifies the vertex at the index position specified. | Index: Integer, Vertex: Vector2 | None | Yes |

Refer to [Shape component Ebus interface](./#shape-component-ebus-interface) for a description of functions that are available to all Shape components.
