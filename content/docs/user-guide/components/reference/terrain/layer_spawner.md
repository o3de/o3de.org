---
title: Terrain Layer Spawner Component
linktitle: Terrain Layer Spawner
description: Open 3D Engine (O3DE) Terrain Layer Spawner reference.
weight: 100
---

The **Terrain Layer Spawner** component spawns a terrain layer within the given bounds and controls the priority of its data relative to other overlapping terrain layers.  

## Usage

The [Terrain World](/docs/user-guide/components/reference/terrain/world) component enables the terrain system for the level, but the level will not contain any terrain until you add a Terrain Layer Spawner. The Terrain Layer Spawner spawns a terrain region into the level within a given set of world bounds. Other components can then optionally provide a combination of height, color, and surface data to the terrain region.

You can configure the world dimensions of the terrain region by modifying the [Axis Aligned Box Shape](/docs/user-guide/components/reference/shape/axis-aligned-box-shape) component that exists on the same entity. The XY dimensions of the box are the XY dimensions of the terrain region, and the Z dimension represents the minimum and maximum heights of the terrain for that region. Modify the range of heights for the terrain by adjusting the height of the box. If the height range falls outside the minimum or maximum terrain world heights defined on the [Terrain World](/docs/user-guide/components/reference/terrain/world) component, the heights will be clamped to stay within the terrain system limits.

By default, the terrain region will spawn with a flat ground surface that fills the XY dimensions at the minimum Z height of the box. You can enable or disable this with the **Use Ground Plane** setting. If the entity with the Terrain Layer Spawner contains a component that provides terrain heights, such as the [Terrain Height Gradient List](/docs/user-guide/components/reference/terrain/height_gradient_list), then the setting will be ignored, and the provided heights will be used instead.

The Terrain Layer Spawner's layer settings control which spawner's data takes precedence wherever there are overlapping terrain regions. The priority is controlled by first assigning a layer, either **Foregound** (higher priority) or **Background** (lower priority), and then by using the **Priority** setting, with a higher number representing a higher priority within that layer. A high-priority Terrain Layer Spawner will completely override all of the terrain data provided by a lower-priority Terrain Layer Spawner in the overlapping area, whether or not the higher-priority terrain has any valid terrain data. For example, a high-priority Terrain Layer Spawner can create holes in other lower-priority terrain regions by disabling the **Use Ground Plane** setting.

## Provider

[Terrain Gem](/docs/user-guide/gems/reference/environment/terrain)

## Dependencies

The [Axis-Aligned Box Shape](/docs/user-guide/components/reference/shape/axis-aligned-box-shape) component is required on the entity to define the world bounds of the terrain layer.

The [Terrain World](/docs/user-guide/components/reference/terrain/world) level component is required for the Terrain Layer Spawner to function. Without it, the terrain system will be disabled for the level, and the Terrain Layer Spawner will have no effect.

The [Terrain World Renderer](/docs/user-guide/components/reference/terrain/world-renderer) level component is optional, but it is necessary to exist for the Terrain Layer Spawner to be visible. Without it, the terrain layer data won't render, though the underlying data will still exist in the world and can be queried via the terrain APIs.

## Properties

![Terrain Layer Spawner component properties](/images/user-guide/components/reference/terrain/terrain-layer-spawner-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Layer Priority** | The priority of the spawner. Foreground has a higher priority than Background. | Foreground or Background | `Foreground` |
| **Sub Priority** | Sets the priority of this spawner within the layer. Higher numbers will override lower. | 0 - 10000 | 0 |
| **Use Ground Plane** | Enable this setting to provide a default ground plane where no terrain is defined. | Boolean | `True` |

## TerrainSpawnerRequestBus

The `TerrainSpawnerRequestBus` is an internal EBus used by the terrain system to query Terrain Layer Spawner settings. Other systems generally do not need to use this EBus since nothing outside the terrain system should need any information about individual Terrain Layer Spawners. However, if a use case arises, the following request functions on the `TerrainSpawnerRequestBus` EBus interface can be used to query the individual Terrain Layer Spawner components.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetPriority` | Returns the **Layer Priority** and **Sub Priority** of the Terrain Layer Spawner. | None | Layer Priority: Integer; Sub Priority: Integer | No |
| `GetUseGroundPlane` | Returns the value of **Use Ground Plane**. | None | Boolean | No |
