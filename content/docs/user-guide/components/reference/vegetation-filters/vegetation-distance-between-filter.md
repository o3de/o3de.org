---
title: Vegetation Distance Between Filter Component
linktitle: Vegetation Distance Between Filter
description: Use the Vegetation Distance Between Filter component to control the distance between vegetation instances in your Open 3D Engine (O3DE) level.
weight: 200
---

Add the **Vegetation Distance Between Filter** component to set a minimum distance between vegetation instances.

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
| **Allow Per-Item Overrides** | If `Enabled`, vegetation descriptor properties that are enabled can override this component's properties. | Boolean | `Disabled` |
| **Bound Mode** | If set to `Radius`, **Radius Min** defines the minimum radius between vegetation instances. If set to `Mesh Radius`, the radius of an attached **Mesh** component defines the radius of the filter. | `Radius` or `Mesh Radius` | `Radius` |
| **Radius Min** | Sets the minimum radius between vegetation instances. | Float: 0.0 to Infinity | `0.0` |

## DistanceBetweenFilterRequestBus

Use the following request functions with the `DistanceBetweenFilterRequestBus` EBus interface to communicate with Vegetation Distance Between Filter components in your game.

| Method Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetAllowOverrides` | Returns the configuration of the **Allow Per-Item Overrides** property. | None | Boolean | Yes |
| `GetBoundMode` | Returns the value of the **Bound Mode** property. Returns `0` for `Radius` and `1` for `Radius`. | None | Integer | Yes |
| `GetRadiusMin` | Returns the value of the **Radius Min** property. | None | Float | Yes |
| `GetShapeEntityId` | Returns the **Pin To Shape Entity Id** property of a distance between filter. | None | EntityId | Yes |
| `SetAllowOverrides` | Sets the configuration of the **Allow Per-Item Overrides** property. | Boolean | None | Yes |
| `SetBoundMode` | Sets the value of the **Bound Mode** property. `0` for `Radius` and `1` for `Radius`. | Integer | None | Yes |
| `SetRadiusMin` | Sets the value of the **Radius Min** property. | Float | None | Yes |
| `SetShapeEntityId` | Sets the **Pin To Shape Entity Id** property of a distance between filter.  | EntityId | None | Yes |
