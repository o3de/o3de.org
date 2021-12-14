---
title: Vegetation Scale Modifier Component
linktitle: Vegetation Scale Modifier
description: Add variation to your vegetation instances with the Vegetation Scale Modifier component in Open 3D Engine (O3DE).
weight: 400
---

Add variation to the vegetation instances in your level with the **Vegetation Scale Modifier** component.  Use gradients to control how vegetation or blocker instances individually scale. By default, this component is configured to scale the vegetation instance by the same value, `1`.  Change the values of **Range Min** or **Range Max** to values that are appropriate for the mesh instances you are modifying.

## Provider

[Vegetation Gem](/docs/user-guide/gems/reference/environment/vegetation/)

## Dependencies

Add one of the following required components when using the Vegetation Scale Modifier component:
- [**Vegetation Layer Blender**](./../vegetation/vegetation-layer-blender)
- [**Vegetation Layer Blocker**](./../vegetation/vegetation-layer-blocker)
- [**Vegetation Layer Blocker (Mesh)**](./../vegetation/vegetation-layer-blocker-mesh)
- [**Vegetation Layer Spawner**](./../vegetation/layer-spawner)

## Vegetation Scale Modifier properties

![Vegetation Scale Modifier component properties](/images/user-guide/components/reference/vegetation-modifiers/vegetation-scale-modifier-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Allow Per-Item Overrides** | If `Enabled`, vegetation descriptor parameters that are enabled can override this component's parameters. | Boolean | `Disabled` |
| **Range Min** | Sets the minimum modified scale of the vegetation instance. | Float: 0.01 to Infinity | `1.0` |
| **Range Max** | Sets the maximum modified scale of the vegetation instance. | Float: 0.01 to Infinity | `1.0` |
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

## ScaleModifierRequestBus

Use the following request functions with the `ScaleModifierRequestBus` EBus interface to communicate with Vegetation Scale Modifier components in your game.

| Method Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetAllowOverrides` | Returns the configuration of the **Allow Per-Item Overrides** parameter. | None | Boolean | Yes |
| `GetGradientSampler` | Returns the gradient sampler object of the scale modifier. | None | Gradient Sampler | Yes |
| `GetRangeMax` | Returns the value of the **Range Max** parameter. | None | Float | Yes |
| `GetRangeMin` | Returns the value of the **Range Min** parameter. | None | Float | Yes |
| `SetAllowOverrides` | Sets the configuration of the **Allow Per-Item Overrides** parameter. | Boolean | None | Yes |
| `SetRangeMax` | Sets the  **Range Max** parameter. | Float | None | Yes |
| `SetRangeMin` | Sets the **Range Min** parameter. | Float | None | Yes |
