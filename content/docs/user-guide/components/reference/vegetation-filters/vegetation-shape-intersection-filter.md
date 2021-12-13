---
title: Vegetation Shape Intersection Filter Component
linktitle: Vegetation Shape Intersection Filter
description: Use Vegetation Shape Intersection Filter component to spawn vegetation within the bounds of a Shape in your Open 3D Engine (O3DE) level.
weight: 400
---

Add the **Vegetation Shape Intersection Filter** component to spawn vegetation or blocker instances within the bounds of a **Shape** component.

## Provider

[Vegetation Gem](/docs/user-guide/gems/reference/environment/vegetation/)

## Dependencies

Add one of the following required components when using the Vegetation Shape Intersection Filter component:
- [**Vegetation Layer Blender**](./../vegetation/vegetation-layer-blender)
- [**Vegetation Layer Blocker**](./../vegetation/vegetation-layer-blocker)
- [**Vegetation Layer Blocker (Mesh)**](./../vegetation/vegetation-layer-blocker-mesh)
- [**Vegetation Layer Spawner**](./../vegetation/layer-spawner)

## Vegetation Shape Intersection Filter properties

![Vegetation Shape Intersection Filter component properties](/images/user-guide/components/reference/vegetation-filters/vegetation-shape-intersection-filter-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Filter Stage** | Defines if filters are applied before or after modifiers. | `PreProcess`, `PostProcess`, or `Default` | `Default` |
| **Shape Entity Id** | Selects an entity with a shape component. Only instances within the shape will spawn. | EntityId | None |
