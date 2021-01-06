---
description: ' Use the Polygon Prism Shape component to define a volume in &ALYlong;. '
title: Polygon Prism Shape
---
# Polygon Prism Shape<a name="component-polygon-prism"></a>


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

You can use the **Polygon Prism Shape** component to define a volume\. A right polygonal prism is a 3D prism made from two translated polygons connected by rectangles\. The **Polygon Prism Shape** component is defined by one polygon and a height property\. All vertices lie on the local plane, where z = `0`\. The polygon is defined in the xy\-plane of the entity\. All vertices are in the local space of the entity\. You can use the **Polygon Prism Shape** component with the **[Trigger Area](/docs/userguide/components/triggerarea.md)** component to create a volume for the trigger area bounds\.

**Note**  
The **Polygon Prism Shape** component supports only simple polygons\. It can't have self\-intersecting sides\. Parallelogram sides aren't supported\. 

**Contents**
+ [Polygon Prism Shape Component Properties](#component-polygon-prism-properties)
+ [Working with Polygon Prism Components](#working-with-polygon-prism-components)
+ [EBus Request Bus Interface](#component-polygon-prism-ebus-request)
  + [Example Polygon Prism Component EBus Request](#component-polygon-prism-ebus-request-component-example)

## Polygon Prism Shape Component Properties<a name="component-polygon-prism-properties"></a>

![\[The Polygon Prism Shape component properties in Lumberyard Editor.\]](/images/userguide/component/polygon-prism-component-properties.png)

The **Polygon Prism Shape** component has the following properties\.


****  

| Name | Description | 
| --- | --- | 
| Visible |  The component always appears in the viewport, even if the entity isn't selected\.   | 
| Game View |  Renders the shape in game mode in Lumberyard Editor\. To enter game mode, press **Ctrl \+ G**\.  | 
|  **Shape Color**  |  Specifies the color to render the shape\.  | 
| Height |  The height of the polygon prism shape, in meters\.  | 
|  **Edit**  | Choose Edit, and the component is locked for editing\. For more information, see [Editing Components in the Viewport](edit-mode-for-components.md)\. | 

By default, when you add the **Polygon Prism Shape** component to an entity, the component has four vertices\.

![\[Default Polygon Prism Shape component with four vertices.\]](/images/userguide/component/polygon-prism-shape-component-1.png)

## Working with Polygon Prism Components<a name="working-with-polygon-prism-components"></a>

Each vertex has one planar and two linear manipulators\. Combined, these are called the *translation manipulator*\. You can use the translation manipulator to move the vertices\. The translation manipulator limits moving a vertex only to the xy\-plane\. No surface manipulator is present as all vertices must exist on the same plane\. You can't change the z\-position of the polygon in the local space\. 

**To change the vertex positions**
+  Do one of the following: 
  + In the **Polygon Prism Shape** component property window, change the vertex values\.
  + Select a vertex\. In the translation manipulator, click and drag the green or red arrow to a position\.

![\[Select a vertex and a translation manipulator appears.\]](/images/userguide/component/polygon-prism-shape-component-2.png)

**Note**  
The manipulators follow the grid snap setting that you can configure in the Lumberyard Editor toolbar\.

You can use the blue arrow in the center of the volume to change the height\.<a name="component-polygon-prism-height-adjustment"></a>

**To change the height of the polygon prism**
+ Drag the blue arrow to change the height of the polygon prism\.

![\[Change the height of the polygon prism.\]](/images/userguide/component/polygon-prism-shape-component-3.png)

**Note**  
If the entity is scaled, the manipulators continue to behave correctly, but the scaling must be uniform so that the x, y, and z scale values match\.

**To select multiple vertices**
+ Press **Shift** and select the vertices\. Selected vertices appear yellow\.  
![\[Select multiple vertices for the polygon prism.\]](/images/userguide/component/polygon-prism-shape-component-4.png)

**Note**  
Currently, you can't click and draw a box around the vertices to select them\.

You can also snap a vertex to another position on the terrain\.

**To snap a vertex to another position**

1. Select a vertex\.

1. Hold **Shift\+Ctrl** and click another position on the terrain\. The vertex snaps to that position\.

You can also add vertices to the polygon prism\.

**To add a vertex to the polygon prism**

1. Pause on a line and hold **Ctrl**\. A preview appears where you can add a vertex\.  
![\[Add vertices to the polygon prism.\]](/images/userguide/component/polygon-prism-shape-component-5.png)

1. Click to add the vertex to the polygon prism\.  
![\[A yellow box appears when you add the vertex to the polygon prism.\]](/images/userguide/component/polygon-prism-shape-component-6.png)

You can also delete vertices from the polygon prism\.

**To delete a vertex from a polygon prism**

1. Hold **Alt** and pause on a vertex\. The vertex appears gray\.  
![\[Delete a vertex from the polygon prism.\]](/images/userguide/component/polygon-prism-shape-component-7.png)

1. Click the vertex to remove it from the polygon prism\. You can also select a vertex and press **Delete**\.  
![\[The vertex is removed from the polygon prism.\]](/images/userguide/component/polygon-prism-shape-component-8.png)

## EBus Request Bus Interface<a name="component-polygon-prism-ebus-request"></a>

Use the following request functions with the `PolygonPrismShapeComponentRequestBus` EBus interface to communicate with other components of your game\. The **Polygon Prism Shape** component also uses `VertexContainer` functions\. For more information, see [Vertex Containers](/docs/userguide/components/vertex-container.md)\.

For more information about using the event bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](/docs/userguide/programming/ebus/intro.md)\.


****  

| Request Name | Description | Parameters | Return | Scriptable | 
| --- | --- | --- | --- | --- | 
| GetPolygonPrism |  Returns a constant pointer to the underlying polygon prism shape data\.  |  None  | AZ::ConstPolygonPrismPtr | Yes | 
| SetHeight |  Sets the height of the polygon prism shape\.  | HeightDefault value: `1.0`Min: `0.0`Max: N/A | None | Yes | 

### Example Polygon Prism Component EBus Request<a name="component-polygon-prism-ebus-request-component-example"></a>

The following script uses the request bus interface\.

```
-- PolygonPrism Interface
  
local polygonPrism = PolygonPrismShapeComponentRequestBus.Event.GetPolygonPrism(self.entityId);
  
polygonPrism.height
polygonPrism.vertexContainer:Size()
polygonPrism.vertexContainer[1]
  
PolygonPrismShapeComponentRequestBus.Event.SetHeight(self.entityId, 5.0);
  
-- VertexContainer interface
local firstVertex = spline.vertexContainer[1];
local lastVertex = spline.vertexContainer[spline.vertexContainer:Size()];
 
-- Attention: You can use the bus interface directly, but here (at the moment at least) indexing will start from 0, not 1 as is the norm in Lua. Instead, you should use the functions directly on the VertexContainer, listed below
PolygonPrismShapeComponentRequestBus.Event.AddVertex(self.entityId, Vector2(10, 10));
PolygonPrismShapeComponentRequestBus.Event.UpdateVertex(self.entityId, 0, firstVertex + Vector2(5, 5));
PolygonPrismShapeComponentRequestBus.Event.InsertVertex(self.entityId, spline.vertexContainer:Size() - 1, lastVertex);
PolygonPrismShapeComponentRequestBus.Event.ClearVertices(self.entityId);
PolygonPrismShapeComponentRequestBus.Event.RemoveVertex(self.entityId, spline.vertexContainer:Size() - 1);
  
-- Prefer these functions - indexing will start from 1
polygonPrism.vertexContainer:AddVertex(lastVertex + Vector2(5, 5));
polygonPrism.vertexContainer:UpdateVertex(1, firstVertex + Vector2(10, 10));
polygonPrism.vertexContainer:InsertVertex(polygonPrism.vertexContainer:Size(), lastVertex + Vector2(2, 2));
polygonPrism.vertexContainer:Clear();
polygonPrism.vertexContainer:RemoveVertex(polygonPrism.vertexContainer:Size());
```