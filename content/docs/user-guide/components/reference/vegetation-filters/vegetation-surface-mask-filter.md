---
title: Vegetation Surface Mask Filter Component
linktitle: Vegetation Surface Mask Filter
description: Use the Vegetation Surface Mask Filter component to distribute vegetation based on surface tag weight in your Open 3D Engine (O3DE) level.
weight: 700
---

Add the **Vegetation Surface Mask Filter** component to spawn or block vegetation from a location based on the weight of the location's surface tags.

## Provider

[Vegetation Gem](/docs/user-guide/gems/reference/environment/vegetation/)

## Dependencies

Add one of the following required components when using the Vegetation Surface Mask Filter component:
- [**Vegetation Layer Blender**](./../vegetation/vegetation-layer-blender)
- [**Vegetation Layer Blocker**](./../vegetation/vegetation-layer-blocker)
- [**Vegetation Layer Blocker (Mesh)**](./../vegetation/vegetation-layer-blocker-mesh)
- [**Vegetation Layer Spawner**](./../vegetation/layer-spawner)

## Vegetation Surface Mask Filter properties

![Vegetation Surface Mask Filter component properties](/images/user-guide/components/reference/vegetation-filters/vegetation-surface-mask-filter-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Filter Stage** | Defines if filters are applied before or after modifiers. | `PreProcess`, `PostProcess`, or `Default` | `Default` |
| **Allow Per-Item Overrides** | If `Enabled`, vegetation descriptor parameters that are enabled can override this component's parameters. | Boolean | `Disabled` |
| **Inclusion - Surface Tags** | An array of surface tags that will spawn vegetation or blocker instances if the surface tag weight of the location is within the **Inclusion - Weight** parameters. | Array: Surface Tags | None |
| **Inclusion - Weight Min** | Sets the minimum weight of an **Inclusion - Surface Tag** that allows vegetation to spawn. | Float: 0.0 - 1.0 | `0.1` |
| **Inclusion - Weight Max** | Sets the maximum weight of an **Inclusion - Surface Tag** that allows vegetation to spawn. | Float: 0.0 - 1.0 | `1.0` |
| **Exclusion - Surface Tags** | An array of surface tags that will not spawn vegetation or blocker instances if the surface tag weight of the location is within the **Exclusion - Weight** parameters. | Array: Surface Tags | None |
| **Exclusion - Weight Min** | Sets the minimum weight of an **Exclusion - Surface Tag** that blocks vegetation. | Float: 0.0 - 1.0 | `0.1` |
| **Exclusion - Weight Max** | Sets the maximum weight of an **Exclusion - Surface Tag** that blocks vegetation. | Float: 0.0 - 1.0 | `1.0` |
