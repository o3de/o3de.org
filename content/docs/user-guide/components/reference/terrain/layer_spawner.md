---
title: Terrain Layer Spawner Component
linktitle: Terrain Layer Spawner
description: Open 3D Engine (O3DE) Terrain Layer Spawner reference.
weight: 100
---

The **Terrain Layer Spawner** component spawns a terrain layer within given bounds, and enables the ordering of multiple layers.  

## Usage 

The priority is controlled by first assigning a layer, either **Foregound**(Highest priority) or **Background**, and then by using the **Priority** setting, with a higher number being a higher priority.  You can configure the dimensions of the layer by modifying the [**Axis Aligned Box Shape** component](/docs/user-guide/components/reference/shape/axis-aligned-box-shape) on the same entity. 

## Provider

[Terrain Gem](/docs/user-guide/gems/reference/environment/terrain)

## Dependencies

The [Axis-Aligned Box Shape component](/docs/user-guide/components/reference/shape/axis-aligned-box-shape) is required for the Terrain Layer Spawner to operate.

## Properties

![Terrain Layer Spawner component properties](/images/user-guide/components/reference/terrain/terrain-layer-spawner-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Layer Priority** | The priority of the spawner. Foreground has a higher priority than Background. | Foreground or Background | `Foreground` |
| **Sub Priority** | Sets the priority of this spawner within the layer. Higher numbers will override lower. | 0 - 10000 | 0 |
| **Use Ground Plane** | Enable this setting to provide a default ground plane where no terrain is defined. | Boolean | `True` |


## TerrainSpawnerRequestBus

Use the following request functions with the `TerrainSpawnerRequestBus` EBus interface to communicate with Terrain Layer Spawner components of your game.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetPriority` | Returns the **Layer Priority** and **Sub Priority** of the Terrain Layer Spawner. | None | Layer Priority: Integer; Sub Priority: Integer | No |
| `GetUseGroundPlane` | Returns the value of **Use Ground Plane**. | None | Boolean | No |
