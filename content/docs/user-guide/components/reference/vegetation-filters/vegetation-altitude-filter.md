---
title: Vegetation Altitude Filter Component
linktitle: Vegetation Altitude Filter
description: Use the Vegetation Altitude Filter component to limit vegetation to a range of heights in your Open 3D Engine (O3DE) level.
weight: 100
---

Add the **Vegetation Altitude Filter** component to limit vegetation or blocker instance placement to a specific height range.

## Provider

[Vegetation Gem](/docs/user-guide/gems/reference/environment/vegetation/)

## Dependencies

Add one of the following required components when using the Vegetation Altitude Filter component:
- [Vegetation Layer Blender](./../vegetation/vegetation-layer-blender)
- [Vegetation Layer Blocker](./../vegetation/vegetation-layer-blocker)
- [Vegetation Layer Blocker (Mesh)](./../vegetation/vegetation-layer-blocker-mesh)
- [Vegetation Layer Spawner](./../vegetation/layer-spawner)

## Vegetation Altitude Filter properties

![Vegetation Altitude Filter component properties](/images/user-guide/components/reference/vegetation-filters/vegetation-altitude-filter-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Filter Stage** | Defines if filters are applied before or after modifiers. | `PreProcess`, `PostProcess`, or `Default` | `Default` |
| **Allow Per-Item Overrides** | If `Enabled`, vegetation descriptor properties that are enabled can override this component's properties. | Boolean | `Disabled` |
| **Pin To Shape Entity Id** | If an entity with a **Shape** component is selected, the shape's bounds will override the **Altitude Min** and **Altitude Max** properties of this component. | EntityId | None |
| **Altitude Min** | Sets the minimum altitude for vegetation instance placement. | Float: -Infinity to Infinity | `0.0` |
| **Altitude Max** | Sets the maximum altitude for vegetation instance placement. | Float: -Infinity to Infinity | `128.0` |

## SurfaceAltitudeFilterRequestBus

Use the following request functions with the `SurfaceAltitudeFilterRequestBus` EBus interface to communicate with Vegetation Altitude Filter components in your game.

| Method Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetAllowOverrides` | Returns the configuration of the **Allow Per-Item Overrides** property. | None | Boolean | Yes |
| `GetAltitudeMax` | Returns the value of the **Altitude Max** property. | None | Float | Yes |
| `GetAltitudeMin` | Returns the value of the **Altitude Min** property. | None | Float | Yes |
| `GetShapeEntityId` | Returns the **Pin To Shape Entity Id** property of an altitude filter. | None | EntityId | Yes |
| `SetAllowOverrides` | Sets the configuration of the **Allow Per-Item Overrides** property. | Boolean | None | Yes |
| `SetAltitudeMax` | Sets the  **Altitude Max** property. | Float | None | Yes |
| `SetAltitudeMin` | Sets the **Altitude Min** property. | Float | None | Yes |
| `SetShapeEntityId` | Sets the **Pin To Shape Entity Id** property of an altitude filter.  | EntityId | None | Yes |
