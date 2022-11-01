---
title: Terrain Surface Materials List Component
linktitle: Terrain Surface Materials List
description: 'Open 3D Engine (O3DE) Terrain Surface Materials List component reference.'
weight: 100
---

The **Terrain Surface Materials List** component defines mappings between surface types and render materials.  You can use this to change the appearance of a surface type within different areas of your game. When you assign a material to a surface type, all the visible surfaces of that type, within the bounds of the required [Axis Aligned Box Shape](/docs/user-guide/components/reference/shape/axis-aligned-box-shape/) component, will adopt that material.


## Usage
Select the surface type tag using the **SurfaceTag** drop-down menu, then assign a material by clicking {{< icon "file-folder.svg" >}} and choosing a material, or by dragging a material from the AssetBrowser window.

## Provider

[Terrain Gem](/docs/user-guide/gems/reference/environment/terrain)

## Properties

![Terrain Surface Materials List component properties](/images/user-guide/components/reference/terrain/terrain-surface-materials-list-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Gradient to Material Mappings** | An array of [surface tags](/docs/user-guide/gems/reference/environment/surface-data) and material assets to map together. |  |  |
| **Surface Tag** | Selects a surface tag to map to a material. | Surface:  Surface Tag | None |
| **Material Asset** | Selects a material asset to apply to the surface. | Material Asset | None |

## TerrainAreaMaterialRequestBus

Use the following request functions with the `TerrainAreaMaterialRequestBus` EBus interface to communicate with Surface Material List components of your game.


| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetSurfaceMaterialMappings` | Retrieves all the assigned surface types, the materials that you have assigned to them, and the bounds that are set for this entity.  | None | Terrain Surface Material Mapping: Vector | No. |


## TerrainAreaMaterialNotificationBus

| Notification Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `OnTerrainSurfaceMaterialMappingCreated` | Notifies listeners when a new mapping between a Surface and a Material is set up. | None | EntityId; Surface Tag; Material | No |
| `OnTerrainSurfaceMaterialMappingDestroyed` | Notifies listeners when a mapping between a Surface and a Material is removed. | None | EntityId; Surface Tag | No |
| `OnTerrainSurfaceMaterialMappingChanged` | Notifies listeners when a mapping between a Surface and a Material is changed. | None | EntityId; Surface Tag; Material | No |
| `OnTerrainSurfaceMaterialMappingRegionChanged` | Notifies listeners when the bounds of the component are modified. | None | EntityId; Old Region: Aabb; New Region: Aabb | No |
