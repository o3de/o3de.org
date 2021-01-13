---
description: ' Use the Spline component to author lines and curves in &ALYlong;. '
title: Spline
---
# Spline {#component-spline}


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

You can create lines and curves in Lumberyard Editor by using the **Spline** component, 

A spline is a curve that connects two or more specific points\. This is useful if you want to animate entities along a spline, such as a road or river\.

**Topics**
+ [Spline Properties](#component-spline-properties)
+ [Working with Spline Components](#working-with-spline-component)
+ [EBus Request Bus Interface](#component-spline-ebus-request)

## Spline Properties {#component-spline-properties}

![\[Example Spline component with the Component Mode option.\]](/images/shared/using-component-mode-3.png)

The **Spline** component has the following properties\.


****  

| Name | Description | 
| --- | --- | 
| Visible |  The component always appears in the viewport, even if the entity isn't selected\.   | 
| Spline Type |  Interpolation type to use between vertices\. The component supports the following spline types: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/component-spline.html)  | 
| Closed |  Specifies whether a spline is a closed or open loop\.  | 
| Granularity |  This property is available only for Bézier and Catmull\-Rom spline types\. The number of steps for each segment that are in the spline\. A step is one of the many short lines that are arranged to approximate the shape of the curve\. A segment is the part of the spline between two vertices\.   | 
| Knot Parameterization |  This property is available only for the Catmull\-Rom spline type\. Adjusts the curvature and smoothness of the spline\. Specify a value to support parameterization\.  A value of `0` creates a standard Catmull\-Rom spline\. A value of `1` creates a chordal Catmull\-Rom spline\.  For more information, see [Knot Parameterization examples](#knot-paramterization-example)\.  | 
|  **Edit**  |  Choose **Edit** and the component is locked for editing\. For more information, see [Editing Components in the Viewport](/docs/userguide/edit-mode-for-components.md)\.  | 

By default, a **Spline** component has four vertices that are spaced evenly in a line\. The vertex positions are stored in the local space of the entity\.

![\[Default Spline component with the linear type.\]](/images/userguide/component/spline-component-1.png)

## Working with Spline Components {#working-with-spline-component}

You can move the vertices in the local space of the entity along each axis\. Each vertex has a planar, linear, and surface manipulator\. Combined, these are called the *translation manipulator*\. You can use the translation manipulator to move the vertices\.

**To change the vertex positions for a spline**

1. Do one of the following:
   + In the viewport, double\-click the spline\.
   + In the **Entity Inspector**, choose **Edit**\. For more information, see [Editing Components in the Viewport](/docs/userguide/edit-mode-for-components.md)\.

1.  Do one of the following: 
   + Select a vertex on the component and drag either the blue, green, or red arrow \(linear manipulator\) or the hollow blue, green, or red square \(planar manipulator\) to a position\.
   + Select a vertex on the component and drag the yellow point \(surface manipulator\) to move the vertex\.

**Note**  
The manipulators follow the grid snap setting that you can specify in Lumberyard Editor toolbar\. For more information, see [Using the Top Toolbar](/docs/userguide/editor/toolbars.md)\.

![\[Select a vertex and a translation manipulator appears in the Spline component.\]](/images/userguide/component/spline-component-2.png)

**Note**  
The manipulators behave correctly if the entity is scaled, but the scaling must be uniform so that the x, y, and z values match \(for example, `2.0`, `2,0`, `2.0`\)\. We recommend that you use uniform scaling for entities with a **Spline** component\.

You can also select multiple vertices\.

**To select multiple vertices on a spline**
+ Hold **Ctrl** and select the vertices\. Selected vertices appear yellow\.  
![\[Select and move multiple vertices.\]](/images/userguide/component/spline-component-3.png)
**Note**  
Currently, you can't click and draw a box around the vertices to select them\.

You can also snap a vertex to another position on the terrain\.

**To snap a vertex to another position**

1. Select a vertex\.

1. Hold **Shift\+Ctrl** and click another position on the terrain\. The vertex snaps to that position\.

You can also add vertices to the spline\.

**To add a vertex to a spline**

1. Pause over a line and hold **Ctrl**\. A preview appears where you can add the vertex\.  
![\[A green point appears where you can add a vertex to the Spline component.\]](/images/userguide/component/spline-component-4.png)

1. Click to add the vertex to the spline\.  
![\[Click to add a vertex to the spline. A translation manipulator appears where you add the vertex.\]](/images/userguide/component/spline-component-5.png)

You can also delete vertices from the spline\.

**To delete a vertex from the spline**

1. Hold **Alt** and pause on a vertex\. The vertex appears gray\.  
![\[Select the vertex to delete. The vertex color turns gray.\]](/images/userguide/component/spline-component-6.png)

1. Click the vertex to delete it\. You can also select a vertex and press **Delete**\. 
**Note**  
Linear and Bézier splines must have a minimum of two vertices\. Catmull\-Rom splines must have a minimum of four vertices\.  
![\[The deleted vertex is removed from the spline.\]](/images/userguide/component/spline-component-7.png)

If you change the spline type, the component is updated to represent the new interpolation method\.

**Example Bézier**  

![\[The linear spline changes to a Bézier spline.\]](/images/userguide/component/spline-component-8.png)

**Example Catmull\-Rom**  

![\[The linear spline changes to a Catmull-Rom spline.\]](/images/userguide/component/spline-component-9.png)

**Note**  
The first and last vertices of a Catmull\-Rom spline are only control points\. They don't form part of the curve\. A well\-formed Catmull\-Rom spline must have a minimum of four vertices\. The spline doesn't render if there are fewer than four vertices\. {#knot-paramterization-example}

The following examples show how Catmull\-Rom splines change when you adjust the **Knot Parameterization** property\.

**Example Knot Parameterization = 0**  

![\[Knot Parameterization value is 0 for the Catmull-Rom spline.\]](/images/userguide/component/spline-component-10.png)

**Example Knot Parameterization =1**  

![\[Knot Parameterization value is 1 for the Catmull-Rom spline.\]](/images/userguide/component/spline-component-11.png)

**Example Linear and Bézier Splines**  
The following examples are linear and Bézier splines with the same vertices but with open and closed loops\.  

![\[Example open and closed Linear and Bézier splines.\]](/images/userguide/component/spline-component-12.png)

## EBus Request Bus Interface {#component-spline-ebus-request}

Use the following request functions with the `SplineComponentRequestBus` EBus interface to communicate with other components of your game\. The **Spline** component also uses `VertexContainer` functions\. For more information, see [Vertex Containers](/docs/userguide/components/vertex-container.md)\.

For more information about using the event bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](/docs/userguide/programming/ebus/intro.md)\.


****  

| Request Name | Description | Parameters | Return | Scriptable | 
| --- | --- | --- | --- | --- | 
| GetSpline |  Returns a constant pointer to the underlying spline type\. You can use this function to query the spline against raycasts and positions\. You can also request information, such as the length of the spline, its position, normal, and tangent at various points along the spline\.  |  None  | AZ::ConstSplinePtr | Yes | 
| ChangeSplineType |  Changes the spline type\. The `AZ::u64` value refers to the RTTI hash of the underlying spline type\.  For example, `AZ::LinearSpline::RTTI_Type().GetHash())`\.  | AZ::u64 | None | Yes | 
| SetClosed |  Specifies whether the spline forms a closed or open loop\.  | Boolean | None | Yes | 

**Example**  
The following script uses the request bus interface\.  

```
local spline = SplineComponentRequestBus.Event.GetSpline(self.entityId);
 
  
-- GetNearestAddressPosition
local posSplineQueryResult = spline:GetNearestAddressPosition(Vector3(0, 0, 0));
  
posSplineQueryResult.splineAddress
posSplineQueryResult.splineAddress.segmentIndex
posSplineQueryResult.splineAddress.segmentFraction
posSplineQueryResult.distanceSq
  
-- GetNearestAddressRay
local raySplineQueryResult = spline:GetNearestAddressRay(Vector3(10, -1, 0), Vector3(0, -1, 0));
raySplineQueryResult.splineAddress.segmentIndex
raySplineQueryResult.splineAddress.segmentFraction
raySplineQueryResult.distanceSq
raySplineQueryResult.rayDistance
  
local splineAddressFromDistance = spline:GetAddressByDistance(3.0);
local splineAddressFromFraction = spline:GetAddressByFraction(0.75);
  
-- Test SplineAddress Constructor (1 param)
local splineAddress_1 = SplineAddress(2);
 
-- Test SplineAddress Constructor (2 params)
local splineAddress_2 = SplineAddress(1, 0);
  
spline:GetPosition(splineAddress_1)
spline:GetNormal(splineAddress_1)
spline:GetTangent(splineAddress_1)
spline:GetLength(splineAddress_1)
spline:GetSplineLength()
spline:GetSegmentLength(1)
spline:GetSegmentCount()
spline:GetSegmentGranularity()
  
local aabb = spline:GetAabb(Transform:CreateIdentity());
  
local closed = spline:IsClosed();
local firstVertex = spline.vertexContainer[1];
local lastVertex = spline.vertexContainer[spline.vertexContainer:Size()];
 
-- Attention: You can use the bus interface directly, but here (at the moment at least) indexing will start from 0, not 1 as is the norm in Lua. Instead, you should use the functions directly on the VertexContainer, listed below
SplineComponentRequestBus.Event.AddVertex(self.entityId, lastVertex + Vector3(1, 2, 3));
SplineComponentRequestBus.Event.UpdateVertex(self.entityId, 0, firstVertex + Vector3(1, 2, 3));
SplineComponentRequestBus.Event.InsertVertex(self.entityId, spline.vertexContainer:Size() - 1, lastVertex + Vector3(1, 2, 3));
SplineComponentRequestBus.Event.ClearVertices(self.entityId);
SplineComponentRequestBus.Event.RemoveVertex(self.entityId, spline.vertexContainer:Size() - 1);
  
-- Prefer these functions - indexing will start from 1
spline.vertexContainer:AddVertex(lastVertex + Vector3(1, 2, 3));
spline.vertexContainer:UpdateVertex(1, firstVertex + Vector3(1, 2, 3));
spline.vertexContainer:InsertVertex(spline.vertexContainer:Size(), lastVertex + Vector3(1, 2, 3));
spline.vertexContainer:ClearVertices();
spline.vertexContainer:RemoveVertex(spline.vertexContainer:Size());
```