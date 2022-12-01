---
title: Vegetation Surface Mask Filter Component
linktitle: Vegetation Surface Mask Filter
description: Use the Vegetation Surface Mask Filter component to distribute vegetation based on surface tag weight in your Open 3D Engine (O3DE) level.
weight: 700
---

Add the **Vegetation Surface Mask Filter** component to define vegetation and blocker placement areas with surface tags and weight ranges.

## Provider

[Vegetation Gem](/docs/user-guide/gems/reference/environment/vegetation/)

## Dependencies

Add one of the following required components when using the Vegetation Surface Mask Filter component:
- [Vegetation Layer Blender](./../vegetation/vegetation-layer-blender)
- [Vegetation Layer Blocker](./../vegetation/vegetation-layer-blocker)
- [Vegetation Layer Blocker (Mesh)](./../vegetation/vegetation-layer-blocker-mesh)
- [Vegetation Layer Spawner](./../vegetation/layer-spawner)

## Vegetation Surface Mask Filter properties

![Vegetation Surface Mask Filter component properties](/images/user-guide/components/reference/vegetation-filters/vegetation-surface-mask-filter-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Filter Stage** | Defines if filters are applied before or after modifiers. | `PreProcess`, `PostProcess`, or `Default` | `Default` |
| **Allow Per-Item Overrides** | If `Enabled`, vegetation descriptor properties that are enabled can override this component's properties. | Boolean | `Disabled` |
| **Inclusion - Surface Tags** | An array of [surface tags](/docs/user-guide/gems/reference/environment/surface-data) that allow vegetation or blocker instance placement if the surface tag weight of the location is within the **Inclusion - Weight** properties. | Array: Surface Tags | None |
| **Inclusion - Weight Min** | Sets the minimum weight of an **Inclusion - Surface Tag** that allows vegetation placement. | Float: 0.0 - 1.0 | `0.1` |
| **Inclusion - Weight Max** | Sets the maximum weight of an **Inclusion - Surface Tag** that allows vegetation placement. | Float: 0.0 - 1.0 | `1.0` |
| **Exclusion - Surface Tags** | An array of [surface tags](/docs/user-guide/gems/reference/environment/surface-data) that don't allow vegetation or blocker instance placement if the surface tag weight of the location is within the **Exclusion - Weight** properties. | Array: Surface Tags | None |
| **Exclusion - Weight Min** | Sets the minimum weight of an **Exclusion - Surface Tag** that blocks vegetation. | Float: 0.0 - 1.0 | `0.1` |
| **Exclusion - Weight Max** | Sets the maximum weight of an **Exclusion - Surface Tag** that blocks vegetation. | Float: 0.0 - 1.0 | `1.0` |

## SurfaceMaskFilterRequestBus

Use the following request functions with the `SurfaceMaskFilterRequestBus` EBus interface to communicate with Vegetation Surface Mask Filter components in your game.

| Method Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `AddExclusiveTag` | Adds a surface tag to the **Exclusion - Surface Tags** array. | Surface Tag: String | None | Yes |
| `AddInclusiveTag` | Adds a surface tag to the **Inclusion - Surface Tags** array. | Surface Tag: String | None | Yes |
| `GetAllowOverrides` | Returns the configuration of the **Allow Per-Item Overrides** property. | None | Boolean | Yes |
| `GetNumExclusiveTags` | Returns the number of surface tags in the **Exclusion - Surface Tags** array. | None | Count: Integer | Yes |
| `GetNumInclusiveTags` | Returns the number of surface tags in the **Inclusion - Surface Tags** array. | None | Count: Integer | Yes |
| `GetExclusiveTag` | Returns the surface tag at the specified index of the **Exclusion - Surface Tags** array. | Surface Tag Index: Integer | Surface Tag: String | Yes |
| `GetInclusiveTag` | Returns the surface tag at the specified index of the **Inclusion - Surface Tags** array. | Surface Tag Index: Integer | Surface Tag: String | Yes |
| `RemoveExclusiveTag` | Removes the surface tag at the specified index of the **Exclusion - Surface Tags** array. | Surface Tag Index: Integer | None | Yes |
| `RemoveInclusiveTag` | Removes the surface tag at the specified index of the **Inclusion - Surface Tags** array. | Surface Tag Index: Integer | None | Yes |
| `SetAllowOverrides` | Sets the configuration of the **Allow Per-Item Overrides** property. | Boolean | None | Yes |
