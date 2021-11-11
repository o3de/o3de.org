---
title: Terrain Macro Material Component
linktitle: Terrain Macro Material
description: 'Open 3D Engine (O3DE) Terrain Macro Material component reference.'
weight: 100
---

The **Terrain Terrain Macro Material** component provides a method of defining a macro-level appearance of a region of terrain.

## Usage ##

You assign a color and a normal texture by dragging texture assets to the **Color Texture** or **Normal Texture** fields, or by clicking {{< icon "file-folder.svg" >}}. Once the textures are assigned, you can adjust the appearance by using the **Normal Flip X** and **Normal Flip Y** toggles, and adjust the strength of the normals by using the **Normal Factor** slider. You can configure the dimensions of the region by adjusting the [Axis Aligned Box Shape](/docs/user-guide/components/reference/shape/axis-aligned-box-shape)

## Provider ##

[Terrain Gem](/docs/user-guide/gems/reference/environment/terrain)

## Dependencies ##

[Axis Aligned Box Shape](/docs/user-guide/components/reference/shape/axis-aligned-box-shape)

## Properties ##

| Property | Description | Values | Default |
|-|-|-|-|
| **Color Texture** | The image that will be rendered on the terrain. | Texture | None |
| **Normal Texture** | The texture that will be used as the normal map. | Texture | None |
| **Normal Flip X** | Set to true to flip the normals about X. | Boolean | false |
| **Normal Flip Y** | Set to true to flip the normals about Y. | Boolean | false |
| **Normal Factor** | Adjusts the strength of the normal values. | Float | 1.0 |


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

## TerrainMacroMaterialRequestBus  ##

Use the following request functions with the `TerrainMacroMaterialRequestBus ` EBus interface to communicate with other components of your game.

### GetTerrainMacroMaterialData 

Retrieves the information assigned to the macro material.

#### Parameters

None

#### Returns

Type: [MacroMaterialData](#macromaterialdata)  
The settings of this Macro Material.

## TerrainMacroMaterialNotificationBus  ##

The `TerrainMacroMaterialNotificationBus ` EBus interface provides the following notifications.

### OnTerrainMacroMaterialCreated

Called when a new macro material has been created.

#### Parameters

#### `MacroMaterialEntity`

Type: `AZ::EntityId`  
The id of the entity that owns the macro material.

#### `MacroMaterial`

Type: [MacroMaterialData](#macromaterialdata)   
Information about the macro material

### OnTerrainMacroMaterialChanged

Called when a macro material has been changed.

#### Parameters

#### `MacroMaterialEntity`

Type: `AZ::EntityId`  
The id of the entity that owns the macro material.

#### `MacroMaterial`

Type: [MacroMaterialData](#macromaterialdata)  
Information about the updated macro material.

### OnTerrainMacroMaterialRegionChanged

Called when the bounding area of the macro material changes.

#### Parameters

#### `MacroMaterialEntity`

Type: `AZ::EntityId`  
The id of the entity that owns the macro material.

#### `oldRegion`

Type: `AZ::Aabb`  
The previous region bounding area.

#### `newRegion`

Type: `AZ::Aabb`  
The new region bounding area.

### OnTerrainMacroMaterialDestroyed

Called when a Macro Material is destroyed.

#### Parameters

#### `MacroMaterialEntity`

Type: `AZ::EntityId`  
The id of the entity that owned the destroyed macro material.