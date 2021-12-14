---
title: Vegetation Distribution Filter Component
linktitle: Vegetation Distribution Filter
description: Control the distribution of vegetation instances using gradients with the Vegetation Distribution Filter component in your Open 3D Engine (O3DE) level.
weight: 300
---

Add the **Vegetation Distribution Filter** component to use gradients to control where vegetation or blocker instances are spawned in your vegetation area.

## Provider

[Vegetation Gem](/docs/user-guide/gems/reference/environment/vegetation/)

## Dependencies

Add one of the following required components when using the Vegetation Distribution Filter component:
- [**Vegetation Layer Blender**](./../vegetation/vegetation-layer-blender)
- [**Vegetation Layer Blocker**](./../vegetation/vegetation-layer-blocker)
- [**Vegetation Layer Blocker (Mesh)**](./../vegetation/vegetation-layer-blocker-mesh)
- [**Vegetation Layer Spawner**](./../vegetation/layer-spawner)

## Vegetation Distribution Filter properties

![Vegetation Distribution Filter component properties](/images/user-guide/components/reference/vegetation-filters/vegetation-distribution-filter-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview** | Displays the inbound gradient after **Threshold** properties are applied. | | |
| **Filter Stage** | Defines if filters are applied before or after modifiers. | `PreProcess`, `PostProcess`, or `Default` | `Default` |
| **Threshold Min** | Sets the minimum gradient value for a vegetation instance to be placed. | Float 0.0 - 1.0 | `0.1` |
| **Threshold Max** | Sets the maximum gradient value for a vegetation instance to be placed. | Float 0.0 - 1.0 | `1.0` |
| **Gradient** | Refer to [Gradient properties](#gradient-properties) below. |  |  |

### Gradient properties

![Gradient properties](/images/user-guide/components/reference/vegetation-modifiers/gradient-properties.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Gradient Entity Id** | Sets an entity with an active **Gradient** component. | Entity | None |
| **Opacity** | Sets the opacity of the inbound gradient. | Float: 0.0 - 1.0 | `1.0` |
| **Invert Input** | Inverts the values of the inbound gradient. | Boolean | `Disabled` |
| **Preview (Inbound)** | Displays the gradient provided by the entity set in **Gradient Entity Id**. |  |  |
| **Enable Transform** | If `Enabled`, the translation, scale, and rotation of the inbound gradient may be modified. | Boolean | `Disabled` |
| **Translate** | Sets the translation of the inbound gradient. | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Scale** | Sets the scale of the inbound gradient. | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Rotate** | Sets the rotation of the inbound gradient. | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Enable Levels** | If `Enabled`, the input and output values of the inbound gradient may be modified. | Boolean | `Disabled` |
| **Input Mid** | Sets the median value of the inbound gradient. | Float: 0.0 - 1.0 | `1.0` |
| **Input Min** | Sets a minimum value for the inbound gradient. | Float: 0.0 - 1.0 | `0.0` |
| **Input Max** | Sets a maximum value for the inbound gradient. | Float: 0.0 - 1.0 | `1.0` |
| **Output Min** | Sets a minimum value for the outbound gradient. | Float: 0.0 - 1.0 | `0.0` |
| **Output Max** | Sets a maximum value for the outbound gradient. | Float: 0.0 - 1.0 | `1.0` |

## DistributionFilterRequestBus

Use the following request functions with the `DistributionFilterRequestBus` EBus interface to communicate with Vegetation Distribution Filter components in your game.

| Method Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetGradientSampler` | Returns the gradient sampler object of the distribution filter. | None | Gradient Sampler | Yes |
| `GetThresholdMax` | Returns the value of the **Threshold Max** property. | None | Float | Yes |
| `GetThresholdMin` | Returns the value of the **Threshold Min** property. | None | Float | Yes |
| `SetThresholdMax` | Sets the value of the **Threshold Max** property. | Float | None | Yes |
| `SetThresholdMin` | Sets the value of the **Threshold Min** property. | Float | None | Yes |
