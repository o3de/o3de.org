---
description: ' Use manipulators to adjust various component properties in the viewport
  in &ALYlong;. '
slug: component-manipulators-using
title: Using Manipulators
---
# Using Manipulators<a name="component-manipulators-using"></a>


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

With manipulators, you can edit certain component properties directly in the viewport instead of the component's property window\. Manipulators help you visualize and achieve the results that you want for your components\. For example, you can add, move, and delete vertices on a **[Spline](/docs/userguide/components/spline.md)** component to create the exact curvature that you want for your level\.

By default, some components support manipulators\.When you author new components, you can also manually add manipulator support\. For more information, see [Editing Components in the Viewport](edit-mode-for-components.md)\.

**Topics**
+ [General Case Manipulators](#component-manipulators-general)
+ [Special Case Manipulators](#component-manipulators-special)
+ [Advanced Use Case Manipulators](#component-manipulators-advanced)
+ [Manipulator Appearance](#component-manipulators-appearance)
+ [Creating New Manipulators](#component-manipulators-creating-new)
+ [EBus Request Bus Interface](#component-manipulators-ebus-requestbus)

## General Case Manipulators<a name="component-manipulators-general"></a>

The following are general case manipulators\.

**Linear Manipulator**  
Moves the position of an object along one axis\.

**Planar Manipulator**  
Moves the position of an object along a plane, which is two axes, such as XY, YZ, or XZ\.

**Surface Manipulator**  
Moves the position of the object over the terrain\.

**Translation Manipulator**  
Aggregate manipulator that combines multiple linear and planar manipulators \(depending on which axes are defined\) and an optional surface manipulator\.

**Selection Manipulator**  
Performs no movement but provides an interface to detect when part of a component has been clicked\.

## Special Case Manipulators<a name="component-manipulators-special"></a>

The following special case manipulators appear only on applicable components\.

**Line Segment Selection Manipulator**  
Determines the location on a line segment over which the mouse is hovering to insert a new point\.

**Spline Selection Manipulator**  
Determines the location on a spline over which the mouse is hovering to insert a new point\.

## Advanced Use Case Manipulators<a name="component-manipulators-advanced"></a>

You can provide a streamlined editing experience by creating a system that manages manipulators across components with similar requirements\.

For example, you can edit the vertex positions for the following components in the viewport\.
+ **[OccluderArea](/docs/userguide/components/occluder-area.md)**
+ **[Polygon Prism Shape](/docs/userguide/components/polygon-prism.md)**
+ **[Portal](/docs/userguide/components/portal.md)**
+ **[Spline](/docs/userguide/components/spline.md)**
+ **[VisArea](/docs/userguide/components/vis-area.md)**

`EditorVertexSelection` is an example of a component that encapsulates manipulator behavior that can be shared by multiple components – in this case, all components that require vertex editing\.

The following core classes are related to `EditorVertexSelection`\.
+ `HoverSelection` \(Spline and LineSegment variants\)
+ `VertexContainerInterface`
+ `VariableVertices`
+ `FixedVertices` \(for when selection and editing of vertices is allowed, but vertices cannot be added or removed\)
+ Many other manipulators such as `Translation`, `LineSegmentSelection`, and `SplineSelection`\.

## Manipulator Appearance<a name="component-manipulators-appearance"></a>

A manipulator's visual appearance does not determine its behavior\. This means that any manipulator can have any view\. This is abstracted through the `ManipulatorView` class\. Lumberyard provides a number of concrete views, such as `Line`, `Cylinder`, `Cone`, `Box`, `Quad`, and `Billboard`\.

You can choose which view to use with a particular manipulator\. All manipulators delegate their rendering to a `ManipulatorView`\. The view also updates the bounds of the manipulator to handle interaction and picking\. `ManipulatorView` provides several utility functions to make creating views easier\. You can ignore these and create custom implementations if preferred\.

## Creating New Manipulators<a name="component-manipulators-creating-new"></a>

To create a manipulator, you must derive from `BaseManipulator`\. By doing so, you can observe how existing manipulators are implemented and follow a similar approach\.

The following are key functions to implement:
+ `OnMouseDown`
+ `OnMouseUp`
+ `OnMouseOver`
+ `Draw`
+ `Invalidate`
+ `SetBoundsDirty`

To call the mouse functions, in the derived manipulator constructor, `Attach` must be called; for example, `AttachLeftMouseDownImpl();`\.

The new manipulator should provide callbacks in the overridden mouse functions so that classes can handle their own unique use cases\.

**Note**  
Adding new manipulators is often unnecessary\. The existing set provides most of the behavior that is required\. For example, you can use the manipulator `LinearManipulators` in a variety of scenarios\. This is recommended for most users\.

## EBus Request Bus Interface<a name="component-manipulators-ebus-requestbus"></a>

Use the following request functions with the EBus interface to communicate with other components of your game\.

For more information, see [Working with the Event Bus \(EBus\) system](/docs/userguide/programming/ebus/intro.md)\.

### Manipulator Manager Requests<a name="component-manipulators-ebus-requestbus-manipulator-manager-requests"></a>


****  

| Name | Description | Parameters | Return | Scriptable | 
| --- | --- | --- | --- | --- | 
| RegisterManipulator | Clears the active manipulator and destroys what is associated with it \(for example, "Remove Vertex"\)\. | BaseManipulator& | None | No | 
| UnregisterManipulator | Clears the active manipulator and destroys what is associated with it \(for example, "Remove Vertex\."\)\. | BaseManipulator& | None | No | 
| SetActiveManipulator | Override what the currently bound active manipulator is set, or set to null\. | BaseManipulator\* | None | No | 
| DeleteManipulatorBound |  Delete the specified manipulator bound\.  | RegisteredBoundId | None | No | 
| SetBoundDirty | Mark the bound of the manipulator dirty, so that it's excluded from mouse hit direction\. Bound will usually be recalculated the next time it is drawn\. | RegisteredBoundId | None | No | 
| SetAllBoundsDirty | Mark bounds of all manipulators as dirty\. | None | None | No | 
| UpdateBound |  Update the bound for a manipulator, for example, if the manipulator has moved or changed shape\.  |  `ManipulatorId` `RegisteredBoundId` `BoundRequestShapeBase&`  | RegisteredBoundId | No | 