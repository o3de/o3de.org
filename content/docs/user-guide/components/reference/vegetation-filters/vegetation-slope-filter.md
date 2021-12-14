---
title: Vegetation Slope Filter Component
linktitle: Vegetation Slope Filter
description: Use to distribute vegetation within terrain slope limits in your Open 3D Engine (O3DE) level.
weight: 500
---

Add the **Vegetation Slope Filter** component to restrict vegetation or blocker instances to a range of terrain slope values.

## Provider

[Vegetation Gem](/docs/user-guide/gems/reference/environment/vegetation/)

## Dependencies

Add one of the following required components when using the Vegetation Slope Filter component:
- [**Vegetation Layer Blender**](./../vegetation/vegetation-layer-blender)
- [**Vegetation Layer Blocker**](./../vegetation/vegetation-layer-blocker)
- [**Vegetation Layer Blocker (Mesh)**](./../vegetation/vegetation-layer-blocker-mesh)
- [**Vegetation Layer Spawner**](./../vegetation/layer-spawner)

## Vegetation Slope Filter properties

![Vegetation Slope Filter component properties](/images/user-guide/components/reference/vegetation-filters/vegetation-slope-filter-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Filter Stage** | Defines if filters are applied before or after modifiers. | `PreProcess`, `PostProcess`, or `Default` | `Default` |
| **Allow Per-Item Overrides** | If `Enabled`, vegetation descriptor properties that are enabled can override this component's properties. | Boolean | `Disabled` |
| **Slope Min** | Sets the minimum terrain slope value for vegetation instances to spawn. | Float: 0.0 - 180.0 | `0.0` |
| **Slope Max** | Sets the maximum terrain slope value for vegetation instances to spawn. | Float: 0.0 - 180.0 | `180.0` |

## SurfaceSlopeFilterRequestBus

Use the following request functions with the `SurfaceSlopeFilterRequestBus` EBus interface to communicate with Vegetation Slope Filter components in your game.

| Method Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetAllowOverrides` | Returns the configuration of the **Allow Per-Item Overrides** property. | None | Boolean | Yes |
| `GetAltitudeMax` | Returns the value of the **Slope Max** property. | None | Float | Yes |
| `GetAltitudeMin` | Returns the value of the **Slope Min** property. | None | Float | Yes |
| `SetAllowOverrides` | Sets the configuration of the **Allow Per-Item Overrides** property. | Boolean | None | Yes |
| `SetAltitudeMax` | Sets the  **Slope Max** property. | Float | None | Yes |
| `SetAltitudeMin` | Sets the **Slope Min** property. | Float | None | Yes |
