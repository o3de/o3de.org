---
title: Terrain Height Gradient List Component
linktitle: Terrain Height Gradient List
description: Use the Terrain Height Gradient List component in your Open 3D Engine (O3DE) level to convert gradients to height data.
---

The **Terrain Height Gradient List** provides height data for the terrain system from a list of one or more gradients. The range of heights is adjusted by scaling the height of the [Axis Aligned Box Shape](/docs/user-guide/components/reference/shape/axis-aligned-box-shape) component on the same entity.

The [Terrain Layer Spawner](/docs/user-guide/components/reference/terrain/layer_spawner) that exists on the same Entity will query the **Terrain Height Gradient List** via the `TerrainAreaHeightRequestBus`. If the list contains multiple gradients, the highest point per position queried will be used from each gradient.

## Provider

[Terrain Gem](/docs/user-guide/gems/reference/environment/terrain)

## Dependencies

[Axis Aligned Box Shape](/docs/user-guide/components/reference/shape/axis-aligned-box-shape)

[Terrain Layer Spawner](/docs/user-guide/components/reference/terrain/layer_spawner)

## Terrain Height Gradient List properties

![Terrain Height Gradient List component properties](/images/user-guide/components/reference/terrain/terrain-height-gradient-list-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Gradient Entities** | An array of entities with a **Gradient** component. | Array: EntityId | None |

## TerrainAreaHeightRequestBus

Use the following request functions with the `TerrainAreaHeightRequestBus` EBus interface to communicate with Terrain Height Gradient List components of your game.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetHeight` | Returns a Vector3 of the Query Position with the Z-value updated to the terrain's height at the query position.  Also returns a boolean value indicating if terrain exists at the Query Position. | Query Position: Vector3 | Terrain Height: Vector3, Terrain Exists: Boolean | No |
| `GetHeights` | Takes in a list of Vector3s as input and returns the Vector3s with Z-value updated to the terrain's height at the query position.  Also updates the list of boolean values indicating if terrain exists at each Query Position. | Query Positions: List of Vector3 | Terrain Height: List of Vector3, Terrain Exists: List of Boolean | No |
