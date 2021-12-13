---
title: Vegetation Distance Between Filter Component
linktitle: Vegetation Distance Between Filter
description: Use the Vegetation Distance Between Filter component to control the distance between vegetation instances in your Open 3D Engine (O3DE) level.
weight: 200
---

Add the **Vegetation Distance Between Filter** component to control the distance between vegetation instances.

## Provider

[Vegetation Gem](/docs/user-guide/gems/reference/environment/vegetation/)

## Dependencies

Add one of the following required components when using the Vegetation Distance Between Filter component:
- [**Vegetation Layer Blender**](./../vegetation/vegetation-layer-blender)
- [**Vegetation Layer Blocker**](./../vegetation/vegetation-layer-blocker)
- [**Vegetation Layer Blocker (Mesh)**](./../vegetation/vegetation-layer-blocker-mesh)
- [**Vegetation Layer Spawner**](./../vegetation/layer-spawner)

## Vegetation Distance Between Filter properties

![Vegetation Distance Between Filter component properties](/images/user-guide/components/reference/vegetation-filters/vegetation-distance-between-filter-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Allow Per-Item Overrides** | If `Enabled`, vegetation descriptor parameters that are enabled can override this component's parameters. | Boolean | `Disabled` |
| **Bound Mode** | If set to `Radius`, **Radius Min** defines the minimum test radius between vegetation instances for the filter to allow placement of an instance.  If set to `Mesh Radius`, the radius of an attached **Mesh** component will define the test radius of the filter. | `Radius` or `Mesh Radius` | `Radius` |
| **Radius Min** | Sets the minimum radius between vegetation instances. | Float: 0.0 to Infinity | `0.0` |
