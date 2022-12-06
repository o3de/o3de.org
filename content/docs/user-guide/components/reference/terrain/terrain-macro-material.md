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

## Usage

The **Terrain Macro Material** component provides low-fidelity color information to the terrain system within a volume. The color data is used as the only source of color for any portion of the terrain that exists beyond the **Detail material render distance** defined on the [**Terrain World Renderer**](/docs/user-guide/components/reference/terrain/world-renderer) component. Within the **Detail material render distance** the color data is blended with the [terrain detail materials](/docs/user-guide/components/reference/terrain/terrain-detail-material) to provide color variation as the detail textures repeat on the surface.

The component also provides optional macro normal information to the terrain system so that distant terrain can have higher quality normals on the lower-poly LODs. The macro normals are difficult to author correctly, so they aren't recommended for typical use. The macro normals must be in world space and generated at the same terrain scale in all dimensions as the terrain in the O3DE level. If the terrain in O3DE is resized unevenly in any direction, the normals will no longer line up with the terrain geometry and the terrain surface lighting will be incorrect.

You can configure the dimensions of the volume by adjusting the [Axis Aligned Box Shape](/docs/user-guide/components/reference/shape/axis-aligned-box-shape) component on the entity. You can assign a color texture and an optional normal texture by dragging texture assets to the **Color Texture** or **Normal Texture** fields, or by clicking {{< icon "file-folder.svg" >}}. When the textures are assigned, you can adjust the direction and magnitude of the normals by using the **Normal Flip X** and **Normal Flip Y** toggles, and the **Normal Factor** slider.

The **Terrain Macro Material** can exist on the same entity as a **Terrain Layer Spawner** component if it's convenient, but this is not a requirement. This component can be used with any world region whether it overlaps multiple spawners, a single spawner, or no spawners at all. The macro material data is applied to any terrain data that appears within its volume and does not render wherever terrain is absent. This flexibility allows the terrain macro material to be authored, loaded, and unloaded at different sizes and resolutions than the rest of the terrain data.

If two **Terrain Macro Material** volumes overlap, the **Priority** field dictates which macro material data will be used. Larger values are higher in priority.

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

The `TerrainMacroMaterialRequestBus` is an internal system bus that is only intended for communication between the terrain renderer and the **Terrain Macro Material** component. Other systems generally do not need to use this EBus since nothing outside the terrain system should need any information from the individual component instances. However, if a use case arises, the following request functions on the `TerrainMacroMaterialRequestBus` EBus interface can be used to query individual **Terrain Macro Material** components.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetTerrainMacroMaterialData` | Returns the `MacroMaterialData` structure assigned to the **Terrain Macro Material** component. | None | [MacroMaterialData](#macromaterialdata) | Yes |

## TerrainMacroMaterialNotificationBus

The `TerrainMacroMaterialNotificationBus` is also an internal system bus that is only intended for communication between the terrain renderer and the **Terrain Macro Material** component. The `TerrainMacroMaterialNotificationBus` EBus notifies listeners through the following notification functions.

| Notification Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `OnTerrainMacroMaterialCreated` | Notifies listeners when a new macro material has been created. | None | EntityId; [MacroMaterialData](#macromaterialdata) | Yes |
| `OnTerrainMacroMaterialChanged` | Notifies listeners when a macro material has been changed. | None | EntityId; [MacroMaterialData](#macromaterialdata) | Yes |
| `OnTerrainMacroMaterialDestroyed` | Notifies listeners when a macro material is removed. | None | EntityId | Yes |
| `OnTerrainMacroMaterialRegionChanged` | Notifies listeners when the bounding area of the macro material changes. | None | EntityId; Old Region: Aabb; New Region: Aabb | Yes |
