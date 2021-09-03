---
title: Terrain Layer Spawner component
linktitle: LayerSpawner
description: ' Open 3D Engine (O3DE) Terrain Layer Spawner reference. '
weight: 100
---

The **Terrain Layer Spawner** component spawns a terrain layer within given bounds, and enables the ordering of multiple layers.  
The priority is controlled firstly by assigning a layer, either **Foregound**(Highest priority) or **Background**, then by using the **Priority** setting, with a higher number being a higher priority.  
The dimensions of the layer can be configured by modifying the [Box component](/docs/user-guide/components/reference/shape/box-shape) on the same entity.
The **Box component** is required for the **Layer Spawner** to operate.

## Provider ##

[Terrain Gem](/docs/user-guide/gems/reference/terrain)

## Properties ##

| Property | Description | Values | Default |
|-|-|-|-|
| **Layer Priority** | The priority of the spawner, Foreground has a higher priority than Background. | Foreground or Background | `Foreground` |
| **Sub Priority** | Sets the priority of this spawner within the layer. Higher numbers will override lower. | 0 - 10000 | 0 |
| **Use Ground Plane** | Enable this to provide a default ground plane where no terrain is defined. | Boolean | `Disabled` |


## TerrainSpawnerRequestBus ##

Use the following request functions with the `TerrainSpawnerRequestBus` EBus interface to communicate with other components of your game.

### GetPriority 

Retrieves the terrain layer priority.

**Parameters**  
Layer \[out\] - Index of the Layer Priority setting (Foreground is 0).
Type: Unsigned Int  
Priority \[out\] - Value of the sub priority setting. 
Type: Unsigned Int

**Return**
None

### GetUseGroundPlane 

Retrieves the value of the Use Ground Plane setting.

**Parameters**
None

**Return**
Value of the setting .
Type: Boolean
