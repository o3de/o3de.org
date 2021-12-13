---
title: Vegetation Surface Mask Depth Filter Component
linktitle: Vegetation Surface Mask Depth Filter
description: Limit the distribution of vegetation to the area surrounding surface tags with the Vegetation Surface Mask Depth Filter component in your Open 3D Engine (O3DE) level.
weight: 600
---

Add the **Vegetation Surface Mask Depth Filter** component to limit vegetation or blocker instances to the areas surrounding specific surface tags.

## Provider

[Vegetation Gem](/docs/user-guide/gems/reference/environment/vegetation/)

## Dependencies

Add one of the following required components when using the Vegetation Surface Mask Depth Filter component:
- [**Vegetation Layer Blender**](./../vegetation/vegetation-layer-blender)
- [**Vegetation Layer Blocker**](./../vegetation/vegetation-layer-blocker)
- [**Vegetation Layer Blocker (Mesh)**](./../vegetation/vegetation-layer-blocker-mesh)
- [**Vegetation Layer Spawner**](./../vegetation/layer-spawner)

## Vegetation Surface Mask Depth Filter properties

![Vegetation Surface Mask Depth Filter component properties](/images/user-guide/components/reference/vegetation-filters/vegetation-surface-mask-depth-filter-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Filter Stage** | Defines if filters are applied before or after modifiers. | `PreProcess`, `PostProcess`, or `Default` | `Default` |
| **Allow Per-Item Overrides** | If `Enabled`, vegetation descriptor parameters that are enabled can override this component's parameters. | Boolean | `Disabled` |
| **Upper Distance Range** | Sets the maximum altitude difference between the vegetation instance and the **Depth Comparison Tags**. Positive values correspond to altitudes above the surface tags, negative values correspond to altitudes below the surface tags.  | Float: -Infinity to Infinity | `1000.0` |
| **Lower Distance Range** | Sets the minimum altitude difference between the vegetation instance and the **Depth Comparison Tags**. Positive values correspond to altitudes above the surface tags, negative values correspond to altitudes below the surface tags. | Float: -Infinity to Infinity | `-1000.0` |
| **Depth Comparison Tags** | An array of surface tags that provide the elevation data to query altitude. | Array: Surface Tags | None |
