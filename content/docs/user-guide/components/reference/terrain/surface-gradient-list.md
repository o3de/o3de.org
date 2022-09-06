---
title: Terrain Surface Gradient List Component
linktitle: Terrain Surface Gradient List
description: 'Open 3D Engine (O3DE) Terrain Surface Gradient List component reference.'
weight: 100
---

The **Terrain Surface Gradient List** component defines mappings between a gradient and a surface type on a terrain layer.  When you assign a gradient to a surface, the gradient defines the strength of that surface in the displayed terrain. For example, you can assign a gradient to a rocky surface to make parts of it appear through a grassy region.

## Usage

You select a gradient either by dragging an entity containing a gradient component to the **GradientEntity** field, or by clicking {{< icon "picker.svg" >}}. Once a gradient is assigned, you can select the surface type that this gradient represents, by using the **Surface Tag** pull-down menu. You can configure the dimensions and priority of the layer using the required [Terrain Layer Spawner](/docs/user-guide/components/reference/terrain/layer_spawner).

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
| **Surface Tag** | Sets the surface type that this gradient represents. | Surface Tag | (unassigned) |


## TerrainAreaSurfaceRequestBus

Use the following request functions with the `TerrainAreaSurfaceRequestBus ` EBus interface to communicate with Surface Gradient List components of your game.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetSurfaceWeights` | Returns all of the surfaces that are assigned to this component, along with the gradient's weight value at a specific position. | Position: Vector3 | Surface Weights: Surface Tag Weight Map | No |
