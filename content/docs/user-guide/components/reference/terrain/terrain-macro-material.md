---
title: Terrain Macro Material Component
linktitle: Terrain Macro Material
description: 'Open 3D Engine (O3DE) Terrain Macro Material component reference.'
weight: 100
---

The **Terrain Terrain Macro Material** component provides a method of defining a macro-level appearance of a region of terrain.

## Usage

You assign a color and a normal texture by dragging texture assets to the **Color Texture** or **Normal Texture** fields, or by clicking {{< icon "file-folder.svg" >}}. Once the textures are assigned, you can adjust the appearance by using the **Normal Flip X** and **Normal Flip Y** toggles, and adjust the strength of the normals by using the **Normal Factor** slider. You can configure the dimensions of the region by adjusting the [Axis Aligned Box Shape](/docs/user-guide/components/reference/shape/axis-aligned-box-shape) component.

## Provider

[Terrain Gem](/docs/user-guide/gems/reference/environment/terrain)

## Dependencies

[Axis Aligned Box Shape](/docs/user-guide/components/reference/shape/axis-aligned-box-shape)

## Properties

![Terrain Macro Material component properties](/images/user-guide/components/reference/terrain/terrain-macro-material-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Color Texture** | The image that will be rendered on the terrain. | Texture | None |
| **Normal Texture** | The texture that will be used as the normal map. | Texture | None |
| **Normal Flip X** | Set to true to flip the normals about X. | Boolean | `False` |
| **Normal Flip Y** | Set to true to flip the normals about Y. | Boolean | `False` |
| **Normal Factor** | Adjusts the strength of the normal values. | Float | `1.0` |
| **Priority** | Sets the rendering priority of the macro material. Higher numbers are higher priority. | Integer | `0` |
| **Save Mode** | Specify how to choose the path for saving the image after any image edits. | `Save As...`, `Auto Save`, `Auto Save With Incrementing Names` | `Auto Save` |

### Creating a new image

To create a new image, press the **Create New Image...** button. You will be prompted for an image width and height in pixels, then for a location to save the image. If the image is saved into a source asset directory that is used by the project, the Terrain Macro Material will automatically populate the **Color Texture** field with the saved image.

## Editing an image

To edit an existing color texture, press the **Edit** button on the Terrain Macro Material component or select the Terrain Macro Material component's icon in the **Component Switcher** in the viewport. This will enter Paint Brush mode. Refer to the [Paint Brush](/docs/user-guide/components/reference/paintbrush/paintbrush) documentation for more details on how to use the Paint Brush.

After editing is complete, end the Paint Brush mode by pressing **Esc**, pressing the **Done** button on the Terrain Macro Material component, or by selecting a different component's icon in the **Component Switcher** in the viewport. At this point, the image changes will be saved, re-processed by the Asset Processor, and reloaded when processing is complete.

The **Save Mode** determines where the image will be saved.
| Save Mode | Description |
| - | - |
| `Save As...` | Prompts for a save location every time the image is saved. |
| `Auto Save` | Prompts for a save location the first time the image is saved after loading the level, but on every subsequent save, it automatically overwrites the image in that location. |
| `Auto Save With Incrementing Names` | Automatically saves the image with an incrementing number at the end of the name and only prompts for a save location if there is already an existing image with that name.<br><br>For example, if the initially-selected image is `image.tif`, this will save it as `image.0000.tif`, then as `image.0001.tif`, then as `image.0002.tif`, etc. |

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

The TerrainMacroMaterialRequestBus is an internal EBus used by the terrain rendering and editing systems to query Terrain Macro Material settings. Other systems generally do not need to use this EBus since nothing outside the terrain system should need any information about individual Terrain Macro Materials. However, if a use case arises, the following request functions on the TerrainMacroMaterialRequestBus EBus interface can be used to query the individual Terrain Macro Material components.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetTerrainMacroMaterialData` | Returns the `MacroMaterialData` structure assigned to the Terrain Macro Material component. | None | [MacroMaterialData](#macromaterialdata) | Yes |
| `GetTerrainMacroColorImageSize` | Returns the height/width/depth of the color texture in pixels. | None | RHI::Size | No |
| `GetMacroColorImagePixelsPerMeter` | Returns the number of color texture pixels per meter in world space. | None | Vector2 | No |

## TerrainMacroMaterialNotificationBus

The TerrainMacroMaterialNotificationBus is an internal EBus used by the terrain rendering and editing systems to monitor changes to Terrain Macro Materials. Other systems generally do not need to use this EBus since nothing outside the terrain system should need any information about individual Terrain Macro Materials. However, if a use case arises, the following notification functions on the TerrainMacroMaterialNotificationBus EBus interface can be used to monitor Terrain Macro Material changes.

| Notification Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `OnTerrainMacroMaterialCreated` | Notifies listeners when a new macro material has been created. | None | EntityId; [MacroMaterialData](#macromaterialdata) | Yes |
| `OnTerrainMacroMaterialChanged` | Notifies listeners when a macro material has been changed. | None | EntityId; [MacroMaterialData](#macromaterialdata) | Yes |
| `OnTerrainMacroMaterialDestroyed` | Notifies listeners when a Macro Material is removed. | None | EntityId | Yes |
| `OnTerrainMacroMaterialRegionChanged` | Notifies listeners when the bounding area of the macro material changes. | None | EntityId; Old Region: Aabb; New Region: Aabb | Yes |

## TerrainMacroColorModificationBus

The TerrainMacroColorModificationBus is an internal EBus used by the terrain editing systems to modify the Terrain Macro Material color texture. This is a lower-level API, most systems should use the higher-level [Paint Brush](/docs/user-guide/components/reference/paintbrush/paintbrush) painting API to modify the texture.

| Notification Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `StartMacroColorImageModification` | Start an image modification session. | None | None | No |
| `EndMacroColorImageModification` | Finish an image modification session. | None | None | No |
| `GetMacroColorPixelIndicesForPositions` | Given a list of world positions, return a list of pixel indices into the image. | positions: The list of positions to query, outIndices: The output list of pixel indices | None | No |
| `GetMacroColorPixelValuesByPosition` | Get the image pixel values at a list of positions. | positions: The list of positions to query, outValues: The output list of pixel colors | None | No |
| `GetMacroColorPixelValuesByPixelIndex` | Get the image pixel values at a list of pixel indices. | indices: The list of pixel indices to query, outValues: The output list of pixel colors | None | No |
| `StartMacroColorPixelModifications` | Start a series of pixel modifications. | None | None | No |
| `EndMacroColorPixelModifications` | Finish a series of pixel modifications. | None | None | No |
| `SetMacroColorPixelValuesByPixelIndex` | Set the image pixel values at a list of pixel indices. | indices: The list of pixel indices to set the values for, outValues: The list of pixel colors to set | None | No |

## TerrainMacroColorModificationNotificationBus

The TerrainMacroColorModificationNotificationBus is an internal EBus used by the terrain editing systems to modify the Terrain Macro Material color texture. This is a lower-level API, most systems should use the higher-level [Paint Brush](/docs/user-guide/components/reference/paintbrush/paintbrush) painting API to modify the texture.

| Notification Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `OnTerrainMacroColorBrushStrokeBegin` | Notify any listeners that a brush stroke has started on the macro color image. | None | None | No |
| `OnTerrainMacroColorBrushStrokeEnd` | Notify any listeners that a brush stroke has ended on the macro color image. | changedDataBuffer: A pointer to the ImageTileBuffer containing the changed data, dirtyRegion: The AABB defining the world space region affected by the brush stroke | None | No |
