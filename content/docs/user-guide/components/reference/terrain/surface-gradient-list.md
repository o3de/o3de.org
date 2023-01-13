---
title: Terrain Surface Gradient List Component
linktitle: Terrain Surface Gradient List
description: 'Open 3D Engine (O3DE) Terrain Surface Gradient List component reference.'
weight: 100
---

The **Terrain Surface Gradient List** component defines mappings between a gradient and a surface type on a terrain layer.  When you assign a gradient to a surface, the gradient defines the strength of that surface in the displayed terrain. For example, you can assign a gradient to a rocky surface to make parts of it appear through a grassy region.

## Usage

Terrain surface weight mappings control the strength of a surface type across the terrain surface. Multiple surface types and weights can exist at the same point. For example, a surface can be 30% grass, 50% dirt, and 20% rock. Other systems query these weights to determine how to render the terrain, what physics properties to apply to the terrain, and so on.

You select a gradient either by dragging an entity containing a gradient component to the **GradientEntity** field, or by clicking {{< icon "picker.svg" >}}. Once a gradient is assigned, you can select the surface type that this gradient represents, by using the **Surface Tag** pull-down menu. You can configure the dimensions and priority of the layer using the required [Terrain Layer Spawner](/docs/user-guide/components/reference/terrain/layer_spawner).

More than one gradient to surface type mapping can be defined in this component. Each gradient needs to map to a different surface type. A simple example of multiple gradient mappings would be to have two surface types where one gradient is the inverse of the other. You can have more than two as well that can be blended together.

## Provider

[Terrain Gem](/docs/user-guide/gems/reference/environment/terrain)

## Dependencies

[Terrain Layer Spawner](/docs/user-guide/components/reference/terrain/layer_spawner)

## Properties

![Terrain Surface Gradient List component properties](/images/user-guide/components/reference/terrain/terrain-surface-gradient-list-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Gradient to Surface Mappings** | An array of gradient entities and surface tags to map together. |  |  |
| **GradientEntity** | The gradient entity to assign to this layer. | Gradient Entity | None |
| **Surface Tag** | Sets the [surface tag](/docs/user-guide/gems/reference/environment/surface-data) that this gradient represents.<br><br>See the [adding surface tag names](/docs/user-guide/gems/reference/environment/surface-data/#adding-surface-tag-names) guide for creating your own surface tags. | Surface Tag | (unassigned) |


## TerrainAreaSurfaceRequestBus

The `TerrainAreaSurfaceRequestBus` is an internal EBus used by the terrain system to query individual **Terrain Surface Gradient List** components. Other systems generally do not need to use this EBus since nothing outside the terrain system should need any information from the individual component instances. However, if a use case arises, the following request functions on the `TerrainAreaSurfaceRequestBus` EBus interface can be used to query the individual **Terrain Surface Gradient List** components.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetSurfaceWeights` | Returns all of the surfaces that are assigned to this component, along with the gradient's weight value at a specific position. | Position: Vector3 | Surface Weights: Surface Tag Weight List | No |
| `GetSurfaceWeightsFromList` | Returns all of the surfaces that are assigned to this component, along with the gradient's weight value at a list of positions. | Position: Vector3 List | Surface Weights: Surface Tag Weight List of Lists | No |
