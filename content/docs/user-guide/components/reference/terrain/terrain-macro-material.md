---
title: Terrain Macro Material Component
linktitle: Terrain Macro Material
description: 'Open 3D Engine (O3DE) Terrain Macro Material component reference.'
weight: 100
---

The **Terrain Macro Material** component applies a terrain base color texture to all terrain regions that fall within its volume.

## Provider

[Terrain Gem](/docs/user-guide/gems/reference/environment/terrain)

## Dependencies

[Terrain World](/docs/user-guide/components/reference/terrain/world)  
[Terrain World Renderer](/docs/user-guide/components/reference/terrain/world-renderer)  
[Axis Aligned Box Shape](/docs/user-guide/components/reference/shape/axis-aligned-box-shape)

The **Terrain Macro Material** also depends on at least one **Terrain Layer Spawner** existing within its volume because this component enhances existing terrain data.

## Properties

![Terrain Macro Material component properties](/images/user-guide/components/reference/terrain/terrain-macro-material-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Color Texture** | The image that will be rendered on the terrain. | Texture | None |
| **Normal Texture** | The texture that will be used as the normal map. | Texture | None |
| **Normal Flip X** | Set to true to flip the normals about X. | Boolean | `False` |
| **Normal Flip Y** | Set to true to flip the normals about Y. | Boolean | `False` |
| **Normal Factor** | Adjusts the strength of the normal values. | Float | `1.0` |
| **Priority** | The priority of the macro material data relative to other **Terrain Macro Material** components. Larger values are higher in priority. | Integer | `0` |
| **Save Mode** | Specify how to choose the path for saving the image after any image edits. | `Save As...`, `Auto Save`, `Auto Save With Incrementing Names` | `Auto Save` |

## Usage

The **Terrain Macro Material** component provides low-fidelity color information to the terrain system within a volume. The color data is used as the only source of color for any portion of the terrain that exists beyond the **Detail material render distance** defined on the [**Terrain World Renderer**](/docs/user-guide/components/reference/terrain/world-renderer) component. Within the **Detail material render distance** the color data is blended with the [terrain detail materials](/docs/user-guide/components/reference/terrain/terrain-detail-material) to provide color variation as the detail textures repeat on the surface.

The component also provides optional macro normal information to the terrain system so that distant terrain can have higher quality normals on the lower-poly LODs. The macro normals are difficult to author correctly, so they aren't recommended for typical use. The macro normals must be in world space and generated at the same terrain scale in all dimensions as the terrain in the O3DE level. If the terrain in O3DE is resized unevenly in any direction, the normals will no longer line up with the terrain geometry and the terrain surface lighting will be incorrect.

You can configure the dimensions of the volume by adjusting the [Axis Aligned Box Shape](/docs/user-guide/components/reference/shape/axis-aligned-box-shape) component on the entity. You can assign a color texture and an optional normal texture by dragging texture assets to the **Color Texture** or **Normal Texture** fields, or by clicking {{< icon "file-folder.svg" >}}. When the textures are assigned, you can adjust the direction and magnitude of the normals by using the **Normal Flip X** and **Normal Flip Y** toggles, and the **Normal Factor** slider.

The **Terrain Macro Material** can exist on the same entity as a **Terrain Layer Spawner** component if it's convenient, but this is not a requirement. This component can be used with any world region whether it overlaps multiple spawners, a single spawner, or no spawners at all. The macro material data is applied to any terrain data that appears within its volume and does not render wherever terrain is absent. This flexibility allows the terrain macro material to be authored, loaded, and unloaded at different sizes and resolutions than the rest of the terrain data.

If two **Terrain Macro Material** volumes overlap, the **Priority** field dictates which macro material data will be used. Larger values are higher in priority.

### Creating a new image

To create a new image, press the **Create New Image...** button. You will be prompted for an image width and height in pixels, then for a location to save the image. If the image is saved into a [source asset directory](/docs/user-guide/assets/pipeline/scan-directories/) that is used by the project, the Terrain Macro Material will automatically populate the **Color Texture** field with the saved image.

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

The `TerrainMacroMaterialRequestBus` is an internal system bus that is only intended for communication between the terrain rendering and editing systems and the Terrain Macro Material component. Other systems generally do not need to use this EBus since nothing outside the terrain system should need any information from the individual component instances. However, if a use case arises, the following request functions on the `TerrainMacroMaterialRequestBus` EBus interface can be used to query individual Terrain Macro Material components.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetTerrainMacroMaterialData` | Returns the `MacroMaterialData` structure assigned to the **Terrain Macro Material** component. | None | [MacroMaterialData](#macromaterialdata) | Yes |
| `GetTerrainMacroColorImageSize` | Returns the height/width/depth of the color texture in pixels. | None | RHI::Size | No |
| `GetMacroColorImagePixelsPerMeter` | Returns the number of color texture pixels per meter in world space. | None | Vector2 | No |

## TerrainMacroMaterialNotificationBus

The `TerrainMacroMaterialNotificationBus` is an internal EBus used by the terrain rendering and editing systems to monitor changes to Terrain Macro Materials. Other systems generally do not need to use this EBus since nothing outside the terrain system should need any information about individual Terrain Macro Materials. However, if a use case arises, the following notification functions on the `TerrainMacroMaterialNotificationBus` EBus interface can be used to monitor Terrain Macro Material changes.

| Notification Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `OnTerrainMacroMaterialCreated` | Notifies listeners when a new macro material has been created. | None | EntityId; [MacroMaterialData](#macromaterialdata) | Yes |
| `OnTerrainMacroMaterialChanged` | Notifies listeners when a macro material has been changed. | None | EntityId; [MacroMaterialData](#macromaterialdata) | Yes |
| `OnTerrainMacroMaterialDestroyed` | Notifies listeners when a macro material is removed. | None | EntityId | Yes |
| `OnTerrainMacroMaterialRegionChanged` | Notifies listeners when the bounding area of the macro material changes. | None | EntityId; Old Region: Aabb; New Region: Aabb | Yes |

## TerrainMacroColorModificationBus

The `TerrainMacroColorModificationBus` is an internal EBus used by the terrain editing systems to modify the Terrain Macro Material color texture. This is a lower-level API, most systems should use the higher-level [Paint Brush](/docs/user-guide/components/reference/paintbrush/paintbrush) painting API to modify the texture.

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

The `TerrainMacroColorModificationNotificationBus` is an internal EBus used by the terrain editing systems to modify the Terrain Macro Material color texture. This is a lower-level API, most systems should use the higher-level [Paint Brush](/docs/user-guide/components/reference/paintbrush/paintbrush) painting API to modify the texture.

| Notification Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `OnTerrainMacroColorBrushStrokeBegin` | Notify any listeners that a brush stroke has started on the macro color image. | None | None | No |
| `OnTerrainMacroColorBrushStrokeEnd` | Notify any listeners that a brush stroke has ended on the macro color image. | changedDataBuffer: A pointer to the ImageTileBuffer containing the changed data, dirtyRegion: The AABB defining the world space region affected by the brush stroke | None | No |
