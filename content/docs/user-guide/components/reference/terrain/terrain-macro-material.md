---
title: Terrain Macro Material Component
linktitle: Terrain Macro Material
description: 'Open 3D Engine (O3DE) Terrain Macro Material component reference.'
weight: 100
---

The **Terrain Terrain Macro Material** component provides a method of defining a macro-level appearance of a region of terrain.

## Usage

You assign a color and a normal texture by dragging texture assets to the **Color Texture** or **Normal Texture** fields, or by clicking {{< icon "file-folder.svg" >}}. Once the textures are assigned, you can adjust the appearance by using the **Normal Flip X** and **Normal Flip Y** toggles, and adjust the strength of the normals by using the **Normal Factor** slider. You can configure the dimensions of the region by adjusting the [Axis Aligned Box Shape](/docs/user-guide/components/reference/shape/axis-aligned-box-shape).

## Provider

[Terrain Gem](/docs/user-guide/gems/reference/environment/terrain)

## Dependencies

[Axis Aligned Box Shape](/docs/user-guide/components/reference/shape/axis-aligned-box-shape)

## Properties

![Terrain Surface Materials List component properties](/images/user-guide/components/reference/terrain/terrain-macro-material-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Color Texture** | The image that will be rendered on the terrain. | Texture | None |
| **Normal Texture** | The texture that will be used as the normal map. | Texture | None |
| **Normal Flip X** | Set to true to flip the normals about X. | Boolean | `False` |
| **Normal Flip Y** | Set to true to flip the normals about Y. | Boolean | `False` |
| **Normal Factor** | Adjusts the strength of the normal values. | Float | `1.0` |


## MacroMaterialData

This structure is used when sending out information about the macro material settings.

| Field | Description | Type | 
|-|-|-|
| **m_entityId** | The EntityId of the owning entity. | `AZ::EntityId` |
| **m_bounds** | The bounds of the region that this macro-material component affects. | `AZ::Aabb` |
| **m_colorImage** | The image that should be applied to the terrain. | `AZ::Data::Instance<AZ::RPI::Image>` |
| **m_normalImage** | The normal map to be used in this region. | `AZ::Data::Instance<AZ::RPI::Image>` |
| **m_normalFlipX** | Whether or not the normal map should be flipped about the X axis. | `bool` |
| **m_normalFlipY** | Whether or not the normal map should be flipped about the Y axis. | `bool` |
| **m_normalFactor** | The strength of the normal map. | `float` |

## TerrainMacroMaterialRequestBus 

Use the following request functions with the `TerrainMacroMaterialRequestBus` EBus interface to communicate with Terrain Macro Material components of your game.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetTerrainMacroMaterialData` | Returns the `MacroMaterialData` structure assigned to the Terrain Macro Material component. | None | [MacroMaterialData](#macromaterialdata) | Yes |


## TerrainMacroMaterialNotificationBus

| Notification Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `OnTerrainMacroMaterialCreated` | Notifies listeners when a new macro material has been created. | None | EntityId; [MacroMaterialData](#macromaterialdata) | Yes |
| `OnTerrainMacroMaterialChanged` | Notifies listeners when a macro material has been changed. | None | EntityId; [MacroMaterialData](#macromaterialdata) | Yes |
| `OnTerrainMacroMaterialDestroyed` | Notifies listeners when a Macro Material is removed. | None | EntityId | Yes |
| `OnTerrainMacroMaterialRegionChanged` | Notifies listeners when the bounding area of the macro material changes. | None | EntityId; Old Region: Aabb; New Region: Aabb | Yes |
