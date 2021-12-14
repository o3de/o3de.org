---
title: Vegetation Rotation Modifier Component
linktitle: Vegetation Rotation Modifier
description: Add variation to your vegetation instances with the Vegetation Rotation Modifier component in Open 3D Engine (O3DE). 
weight: 300
---

Add variation to the vegetation instances in your level with the **Vegetation Rotation Modifier** component.  Use gradients to control how vegetation or blocker instances are individually rotated on the X, Y, or Z-axis. By default, this component is configured to rotate a vegetation instance up to 180 degrees on the Z-axis, in either direction.  

## Provider

[Vegetation Gem](/docs/user-guide/gems/reference/environment/vegetation/)

## Dependencies

Add one of the following required components when using the Vegetation Rotation Modifier component:
- [**Vegetation Layer Blender**](./../vegetation/vegetation-layer-blender)
- [**Vegetation Layer Blocker**](./../vegetation/vegetation-layer-blocker)
- [**Vegetation Layer Blocker (Mesh)**](./../vegetation/vegetation-layer-blocker-mesh)
- [**Vegetation Layer Spawner**](./../vegetation/layer-spawner)

## Vegetation Rotation Modifier properties

![Vegetation Rotation Modifier component properties](/images/user-guide/components/reference/vegetation-modifiers/vegetation-rotation-modifier-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Allow Per-Item Overrides** | If `Enabled`, vegetation descriptor parameters that are enabled can override this component's parameters. | Boolean | `Disabled` |
| **Rotation X - Range Min** | Sets the minimum modified rotation of the vegetation instance on the X-axis. | Float: -Infinity to Infinity | `0.0` |
| **Rotation X - Range Max** | Sets the maximum modified rotation of the vegetation instance on the X-axis. | Float: -Infinity to Infinity | `0.0` |
| **Rotation X - Gradient** | Refer to [Gradient properties](#gradient-properties) below. |  |  |
| **Rotation Y - Range Min** | Sets the minimum modified rotation of the vegetation instance on the Y-axis. | Float: -Infinity to Infinity | `0.0` |
| **Rotation Y - Range Max** | Sets the maximum modified rotation of the vegetation instance on the Y-axis. | Float: -Infinity to Infinity | `0.0` |
| **Rotation Y - Gradient** | Refer to [Gradient properties](#gradient-properties) below. |  |  |
| **Rotation Z - Range Min** | Sets the minimum modified rotation of the vegetation instance on the Z-axis. | Float: -Infinity to Infinity | `-180.0` |
| **Rotation Z - Range Max** | Sets the maximum modified rotation of the vegetation instance on the Z-axis. | Float: -Infinity to Infinity | `180.0` |
| **Rotation Z - Gradient** | Refer to [Gradient properties](#gradient-properties) below. |  |  |

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

## RotationModifierRequestBus

Use the following request functions with the `RotationModifierRequestBus` EBus interface to communicate with Vegetation Rotation Modifier components in your game.

| Method Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetAllowOverrides` | Returns the configuration of the **Allow Per-Item Overrides** parameter. | None | Boolean | Yes |
| `GetGradientSamplerX` | Returns the gradient sampler object of the **Rotation X** group parameters. | None | Gradient Sampler | Yes |
| `GetGradientSamplerY` | Returns the gradient sampler object of the **Rotation Y** group parameters. | None | Gradient Sampler | Yes |
| `GetGradientSamplerZ` | Returns the gradient sampler object of the **Rotation Z** group parameters. | None | Gradient Sampler | Yes |
| `GetRangeMax` | Returns a Vector3 of **Range Max** parameters. | None | Vector3: (**Rotation X - Range Max**, **Rotation Y - Range Max**, **Rotation Z - Range Max**) | Yes |
| `GetRangeMin` | Returns a Vector3 of **Range Min** parameters. | None | Vector3: (**Rotation X - Range Min**, **Rotation Y - Range Min**, **Rotation Z - Range Min**) | Yes |
| `SetAllowOverrides` | Sets the configuration of the **Allow Per-Item Overrides** parameter. | Boolean | None | Yes |
| `SetRangeMax` | Sets the X, Y, and Z **Range Max** parameters. | Vector3: (**Rotation X - Range Max**, **Rotation Y - Range Max**, **Rotation Z - Range Max**) | None | Yes |
| `SetRangeMin` | Sets the X, Y, and Z **Range Min** parameters. | Vector3: (**Rotation X - Range Min**, **Rotation Y - Range Min**, **Rotation Z - Range Min**) | None | Yes |
