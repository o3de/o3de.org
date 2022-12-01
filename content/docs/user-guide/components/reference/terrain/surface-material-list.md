---
title: Terrain Surface Materials List Component
linktitle: Terrain Surface Materials List
description: 'Open 3D Engine (O3DE) Terrain Surface Materials List component reference.'
weight: 100
---

The **Terrain Surface Materials List** component defines mappings between surface types and render materials. You can use this to change the appearance of a surface type within different areas of your game. When you assign a material to a surface type, all the visible surfaces of that type, within the bounds of the required [Axis Aligned Box Shape](/docs/user-guide/components/reference/shape/axis-aligned-box-shape/) component, will adopt that material.

This component uses [macro materials](/docs/user-guide/components/reference/terrain/terrain-macro-material) and [detail materials](/docs/user-guide/components/reference/terrain/terrain-detail-material/) across a large terrain surface and blends between them. This blending of detail materials with the macro material enables you to use small high-fidelity tiled detail materials that have variations in color and lighting across the terrain.

Macro and detail material blending is based on the surface weights of the materials. The three surface materials with the highest weight values at every point blend together with relative weighting to add up to 100%, or 1.0. For example, suppose you have the following surface materials and weights:
* Grass = 0.25
* Dirt = 0.125
* Sand = 0.125
* Rock = 0.05

In this scenario, the blend ignores rock, and the result is 50% grass, 25% dirt, and 25% sand.

For an example of how to use the detail materials with a surface materials list, follow the [Apply detail materials](/docs/learning-guide/tutorials/environments/create-terrain-from-images/#apply-detail-materials) section of the **Create Terrain from Images** tutorial.

## Usage
Select the surface type tag using the **SurfaceTag** drop-down menu, then assign a material by clicking {{< icon "file-folder.svg" >}} and choosing a material, or by dragging a material from the AssetBrowser window.

## Provider

[Terrain Gem](/docs/user-guide/gems/reference/environment/terrain)

## Dependencies

[Axis-Aligned Box Shape](/docs/user-guide/components/reference/shape/axis-aligned-box-shape)

## Properties

![Terrain Surface Materials List component properties](/images/user-guide/components/reference/terrain/terrain-surface-materials-list-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Default Material** | The default material to fall back to when no other material surface mappings exist.<br><br>**NOTE:** The default material doesn't blend with other materials because it has no surface weight. The primary intended uses of the default material are either as an error material to see every place that a detail material hasn't been mapped, or to quickly cover an entire terrain surface with a single material without setting up more complicated mappings. | Material Asset | None |
| **Material Mappings** | An array of [surface tags](/docs/user-guide/gems/reference/environment/surface-data) and material assets to map together. |  |  |
| **Surface Tag** | Selects a surface tag to map to a material. | Surface:  Surface Tag | None |
| **Material Asset** | Selects a material asset to apply to the surface. | Material Asset | None |

## TerrainAreaMaterialRequestBus

Use the following request functions with the `TerrainAreaMaterialRequestBus` EBus interface to communicate with Surface Material List components of your game.


| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetTerrainSurfaceMaterialRegion` | Retrieves the Aabb for the region where a `TerrainSurfaceMaterialMapping` exists.  | None | Aabb | No |
| `GetSurfaceMaterialMappings` | Retrieves all the assigned surface types, the materials that you have assigned to them, and the bounds that are set for this entity.  | None | Terrain Surface Material Mapping: Vector | No |
| `GetDefaultMaterial` | Retrieves the default material for this surface material.  | None | Terrain Surface Material Mapping | No |

## TerrainAreaMaterialNotificationBus

| Notification Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `OnTerrainDefaultSurfaceMaterialCreated` | Notifies listeners when the default surface material has been assigned and loaded. | None | EntityId; Material | No |
| `OnTerrainDefaultSurfaceMaterialDestroyed` | Notifies listeners when the default surface material has been unassigned. | None | EntityId | No |
| `OnTerrainDefaultSurfaceMaterialChanged` | Notifies listeners when the default surface material has been changed to a different material. | None | EntityId; Material | No |
| `OnTerrainSurfaceMaterialMappingCreated` | Notifies listeners when a new mapping between a Surface and a Material is set up. | None | EntityId; Surface Tag; Material | No |
| `OnTerrainSurfaceMaterialMappingDestroyed` | Notifies listeners when a mapping between a Surface and a Material is removed. | None | EntityId; Surface Tag | No |
| `OnTerrainSurfaceMaterialMappingTagChanged` | Notifies listeners when a surface tag has changed to tag for an existing material. | None | EntityId; Surface Tag; Surface Tag | No |
| `OnTerrainSurfaceMaterialMappingMaterialChanged` | Notifies listeners when the material has changed for an existing surface tag. | None | EntityId; Surface Tag; Material | No |
| `OnTerrainSurfaceMaterialMappingRegionCreated` | Notifies listeners when a set of surface material mappings has been created. | None | EntityId; Aabb | No |
| `OnTerrainSurfaceMaterialMappingRegionDestroyed` | Notifies listeners when a set of surface material mappings has been destroyed. | None | EntityId; Aabb | No |
| `OnTerrainSurfaceMaterialMappingRegionChanged` | Notifies listeners when the bounds of this set of surface material mappings has changed. | None | EntityId; Old Region: Aabb; New Region: Aabb | No |
