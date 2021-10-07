---
title: Terrain Surface Material List component
linktitle: TerrainSurfaceMaterialList
description: ' Open 3D Engine (O3DE) Terrain Surface Material List reference. '
weight: 100
---

The **Terrain Surface Material List** defines mappings between surface types and render materials.  
You can use this to change the appearance of a surface type within different areas of your game.
When you assign a material to a surface type, all the visible surfaces of that type, within the bounds of the controlling
[Terrain Layer Spawner](/docs/user-guide/components/reference/terrain/layer_spawner), will adopt that material.


## Usage ##
Select the surface type tag using the **SurfaceTag** pull down, then assign a material by using the open button, or by dragging from the AssetBrowser window.

## Provider ##

[Terrain Gem](/docs/user-guide/gems/reference/terrain)

## TerrainAreaMaterialRequestBus ##

Use the following request functions with the `TerrainAreaMaterialRequestBus` EBus interface to communicate with other components of your game.

### GetSurfaceMaterialMappings

Retrieves all the assigned surface types along with the materials that you have assigned to them.

### GetSurfaceWeights 

Retrieves all of the configured surface types, along with the gradient's weight value at the given position.

#### Parameters

None

#### Returns

Type: AZStd::vector<SurfaceMaterialMapping>  
A list of pairs of SurfaceTags and Material Instances.

## TerrainAreaMaterialNotificationBus ##
Connect to the `TerrainAreaMaterialNotificationBus` to listen for changes in the material assignments.

### OnTerrainSurfaceMaterialMappingChanged

#### Parameters

##### `entityid`

Type: AZ::EntityId  
The Id of the entity that is sending this notification.




