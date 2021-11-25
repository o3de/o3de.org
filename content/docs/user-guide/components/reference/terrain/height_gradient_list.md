---
title: Terrain Height Gradient List Component
linktitle: Terrain Height Gradient List
description: ' Open 3D Engine (O3DE) Terrain Height Gradient List reference. '
weight: 100
---

The **Terrain Height Gradient List** provides height data for the terrain system from a list of one or more gradients.
The range of heights is adjusted by scaling the height of the [Axis Aligned Box Shape Component](/docs/user-guide/components/reference/shape/axis-aligned-box-shape) on the same entity.


## Provider ##

[Terrain Gem](/docs/user-guide/gems/reference/terrain)

## TerrainAreaHeightRequestBus ##

Use the following request functions with the `TerrainAreaHeightRequestBus` EBus interface to communicate with other components of your game.

### GetHeight

Retrieves the height of the gradient at a given position. In the event of multiple gradients being defined, will return the highest point.

**Parameters**  
InPosition - The position for which to retrieve the height. Type: AZ::Vector3  
OutPosition \[out\] - InPosition with its Z value adjusted to the correct height. Type: AZ::Vector3  
TerrainExists \[out\] - Indicates whether gradient data exists for the given position. Type: Boolean

**Return**  
None


