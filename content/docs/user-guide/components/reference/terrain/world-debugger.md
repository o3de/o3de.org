---
title: Terrain Debugger Component
linktitle: Terrain Debugger
description: 'Open 3D Engine (O3DE) Terrain Debugger component reference.'
weight: 100
---

The **Terrain Surface Gradient List** component defines mappings between a gradient and a surface type on a terrain layer.  When you assign a gradient to a surface, the gradient defines the strength of that surface in the displayed terrain. For example, you can assign a gradient to a rocky surface to make parts of it appear through a grassy region.

## Usage ##

You select a gradient either by dragging an entity containing a gradient component to the **GradientEntity** field, or by clicking {{< icon "picker.svg" >}}.
Once a gradient is assigned, you can select the surface type that this gradient represents, by using the **Surface Tag** pull-down menu. 
You can configure the dimensions and priority of the layer using the required [Terrain Layer Spawner](/docs/user-guide/components/reference/terrain/layer_spawner)

## Provider ##

[Terrain Gem](/docs/user-guide/gems/reference/environment/terrain)

## Dependencies ##

[Terrain Layer Spawner](/docs/user-guide/components/reference/terrain/layer_spawner)

## Properties ##

| Property | Description | Values | Default |
|-|-|-|-|
| **GradientEntity** | The gradient entity to assign to this layer. | Gradient Entity | None |
| **Surface Tag** | Sets the surface type that this gradient represents. | Surface Tag | None |


## TerrainAreaSurfaceRequestBus  ##

Use the following request functions with the `TerrainAreaSurfaceRequestBus ` EBus interface to communicate with other components of your game.

### GetSurfaceWeights 

Retrieves all of the surfaces that are assigned to this component, along with the gradient's weight value at the given position.

#### Parameters

##### `InPosition`

Type: Vector3  
Position to retrieve information for.

##### `SurfaceWeights [out]`

Type: SurfaceTagWeightMap  
A list of all the retrieved surfaces and weight values. 

#### Returns

None

