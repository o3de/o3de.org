---
title: Terrain Surface Gradient List component
linktitle: TerrainSurfaceGradientList
description: ' Open 3D Engine (O3DE) Terrain Surface Gradient List reference. '
weight: 100
---

The **Terrain Surface Gradient List** component allows you to define mappings between a gradient and a surface on a terrain layer.
You select a gradient either by dragging a entity containing a gradient component to the **GradientEntity** field, or by using the select button.
Once a gradient is assigned, you can select the surface type that this gradient represents, by using the **Surface Tag** option.
You can configure the dimensions and priority of the layer using the required [Terrain Layer Spawner](/docs/user-guide/components/reference/terrain/layer_spawner)

## Provider ##

[Terrain Gem](/docs/user-guide/gems/reference/environment/terrain)

## Properties ##

| Property | Description | Values | Default |
|-|-|-|-|
| **GradientEntity** | The gradient entity to assign to this layer. | Gradient Entity | None |
| **Surface Tag** | Sets the surface type that this gradient repersents. | Surface Tag | Mone |


## TerrainAreaSurfaceRequestBus  ##

Use the following request functions with the `TerrainAreaSurfaceRequestBus ` EBus interface to communicate with other components of your game.

### GetSurfaceWeights 

Retrieves all the surfaces assigned to this component, along with the weight values which come from the gradient as the given position.

**Parameters**  
InPosition - Position to retrieve information for.
Type: Vector3  
SurfaceWeights \[out\] - A list of all the retrieved surfaces and weight values. 
Type: SurfaceTagWeightMap

**Return**
None
