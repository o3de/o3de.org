---
title: Vegetation Slope Alignment Modifier Component
linktitle: Vegetation Slope Alignment Modifier
description: Use the Slope Alignment Modifier component to align the orientation of vegetation instances with the underlying terrain in Open 3D Engine (O3DE).
weight: 500
---

Use the **Slope Alignment Modifier** component to align the orientation of vegetation or blocker instances with the underlying terrain.  Use gradients to control and vary vegetation alignment. By default, this component is configured to always completely align a vegetation instance to the slope of the terrain.  By setting the alignment coefficients to values less than `1`, instances will only partially align with terrain.

## Provider

[Vegetation Gem](/docs/user-guide/gems/reference/environment/vegetation/)

## Dependencies

Add one of the following required components when using the Vegetation Slope Alignment Modifier component:
- [**Vegetation Layer Blender**](./../vegetation/vegetation-layer-blender)
- [**Vegetation Layer Blocker**](./../vegetation/vegetation-layer-blocker)
- [**Vegetation Layer Blocker (Mesh)**](./../vegetation/vegetation-layer-blocker-mesh)
- [**Vegetation Layer Spawner**](./../vegetation/layer-spawner)

## Vegetation Slope Alignment Modifier properties

![Vegetation Slope Alignment Modifier component properties](/images/user-guide/components/reference/vegetation-modifiers/vegetation-slope-alignment-modifier-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Allow Per-Item Overrides** | If `Enabled`, vegetation descriptor properties that are enabled can override this component's properties. | Boolean | `Disabled` |
| **Alignment Coefficient Min** | Sets the minimum slope alignment coefficient. | Float: 0.0 - 1 | `1.0` |
| **Alignment Coefficient Max** | Sets the maximum slope alignment coefficient. | Float: 0.0 - 1 | `1.0` |
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

## SlopeAlignmentModifierRequestBus

Use the following request functions with the `SlopeAlignmentModifierRequestBus` EBus interface to communicate with Vegetation Slope Alignment Modifier components in your game.

| Method Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetAllowOverrides` | Returns the configuration of the **Allow Per-Item Overrides** property. | None | Boolean | Yes |
| `GetGradientSampler` | Returns the gradient sampler object of the slope alignment modifier. | None | Gradient Sampler | Yes |
| `GetRangeMax` | Returns the value of the **Alignment Coefficient Max** property. | None | Float | Yes |
| `GetRangeMin` | Returns the value of the **Alignment Coefficient Min** property. | None | Float | Yes |
| `SetAllowOverrides` | Sets the configuration of the **Allow Per-Item Overrides** property. | Boolean | None | Yes |
| `SetRangeMax` | Sets the  **Alignment Coefficient Max** property. | Float | None | Yes |
| `SetRangeMin` | Sets the **Alignment Coefficient Min** property. | Float | None | Yes |
