---
title: Terrain Surface Material List component
linktitle: TerrainSurfaceMaterialList
description: ' Open 3D Engine (O3DE) Terrain Surface Material List reference. '
weight: 100
---

The **Terrain Surface Material List** defines mappings between surface types and render materials.  
You can use this to change the appearance of a surface type within different areas of your game.
When you assign a material to a surface type, all the visible surfaces of that type, within the bounds of the required
[Axis Aligned Box Shape](/docs/user-guide/components/reference/shape/axis-aligned-box-shape/), will adopt that material.


## Usage ##
Select the surface type tag using the **SurfaceTag** pull down, then assign a material by using the open button, or by dragging from the AssetBrowser window.

## Provider ##

[Terrain Gem](/docs/user-guide/gems/reference/terrain)

## TerrainAreaMaterialRequestBus ##

Use the following request functions with the `TerrainAreaMaterialRequestBus` EBus interface to communicate with other components of your game.

### GetSurfaceMaterialMappings

Retrieves all the assigned surface types, the materials that you have assigned to them, and the bounds that are set for this entity.

#### Parameters

##### `region [out]`

Type: `AZ::Aabb&`  
The bounds of this component.

#### Returns

Type: `AZStd::vector<struct TerrainSurfaceMaterialMapping>`  
A list of SurfaceTags and Material Instances.

## TerrainAreaMaterialNotificationBus ##
Connect to the `TerrainAreaMaterialNotificationBus` to listen for changes in the material assignments.

### OnTerrainSurfaceMaterialMappingCreated
Called when a new mapping between a Surface and a Material is set up.

#### Parameters

##### `entityid`

Type: `AZ::EntityId`  
The Id of the entity that is sending this notification.

##### `surface`

Type: `SurfaceData::SurfaceTag`  
The SurfaceTag that is mapped.

##### `material`

Type: `AZ::Data::Instance<AZ::RPI::Material>`  
The Material instance that is mapped to the SurfaceTag.

### OnTerrainSurfaceMaterialMappingDestroyed
Called when a mapping between a Surface and a Material is removed.
#### Parameters

##### `entityid`

Type: `AZ::EntityId`  
The Id of the entity that is sending this notification.

##### `surface`

Type: `SurfaceData::SurfaceTag`  
The SurfaceTag that is no longer mapped.

### OnTerrainSurfaceMaterialMappingChanged
Called when a mapping between a Surface and a Material is changed.

#### Parameters

##### `entityid`

Type: `AZ::EntityId`  
The Id of the entity that is sending this notification.

##### `surface`

Type: `SurfaceData::SurfaceTag`  
The SurfaceTag that is mapped.

##### `material`

Type: `AZ::Data::Instance<AZ::RPI::Material>`  
The new Material instance that is mapped to the SurfaceTag.

### OnTerrainSurfaceMaterialMappingRegionChanged
Called when the bounds of the component are modified.

#### Parameters

##### `entityid`

Type: `AZ::EntityId`  
The Id of the entity that is sending this notification.

##### `oldRegion`

Type: `const AZ::Aabb&`  
The previous bounds of the component.

##### `newRegion`

Type: `const AZ::Aabb&`  
The new bounds of the component.





