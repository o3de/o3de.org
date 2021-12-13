---
title: Vegetation Altitude Filter Component
linktitle: Vegetation Altitude Filter
description: Use Vegetation Altitude Filter component to limit vegetation to a range of heights in your Open 3D Engine (O3DE) level.
weight: 100
---

Add the **Vegetation Altitude Filter** component to limit spawning vegetation or blocker instances to a specific range of heights.

## Provider

[Vegetation Gem](/docs/user-guide/gems/reference/environment/vegetation/)

## Dependencies

Add one of the following required components when using the Vegetation Altitude Filter component:
- [**Vegetation Layer Blender**](./../vegetation/vegetation-layer-blender)
- [**Vegetation Layer Blocker**](./../vegetation/vegetation-layer-blocker)
- [**Vegetation Layer Blocker (Mesh)**](./../vegetation/vegetation-layer-blocker-mesh)
- [**Vegetation Layer Spawner**](./../vegetation/layer-spawner)

## Vegetation Altitude Filter properties

![Vegetation Altitude Filter component properties](/images/user-guide/components/reference/vegetation-filters/vegetation-altitude-filter-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Filter Stage** | Defines if filters are applied before or after modifiers. | `PreProcess`, `PostProcess`, or `Default` | `Default` |
| **Allow Per-Item Overrides** | If `Enabled`, vegetation descriptor parameters that are enabled can override this component's parameters. | Boolean | `Disabled` |
| **Pin To Shape Entity Id** | If an entity with a **Shape** component is selected, the shape's bounds will override the **Altitude Min** and **Altitude Max** properties of this component. | EntityId | None |
| **Altitude Min** | Sets the minimum altitude that vegetation instances will spawn at. | Float: -Infinity to Infinity | `0.0` |
| **Altitude Max** | Sets the maximum altitude that vegetation instances will spawn at. | Float: -Infinity to Infinity | `128.0` |
