---
linktitle: Dither Gradient Modifier
title: Dither Gradient Modifier Component
description: Use the Dither Gradient Modifier component to apply a dither effect to a gradient in Open 3D Engine (O3DE).
---

The **Dither Gradient Modifier** component applies an [ordered dithering](https://en.wikipedia.org/wiki/Ordered_dithering) algorithm to a gradient.

## Provider

[Gradient Signal Gem](/docs/user-guide/gems/reference/utility/gradient-signal)

## Dither Gradient Modifier properties

![Dither Gradient Modifier component properties](/images/user-guide/components/reference/gradient-modifiers/dither-gradient-modifier-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview** | Displays the outbound gradient of this component after all properties are applied. | | |
| **Preview Settings** |  |  |  |
| **Pin Preview to Shape** | Sets an entity with a compatible Shape component to use as the bounds of the preview if **Constrain to Shape** is `Enabled`. | EntityId | Current Entity |
| **Preview Position** | Sets the world location of the preview.<br> <br>*This field is available only if there is no entity selected in **Pin Preview to Shape**.* | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Preview Size** | Sets the dimensions of the preview. | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Constrain to Shape** | If `Enabled`, the gradient preview will use the bounds of the entity selected in **Pin Preview to Shape**.<br> <br>*This field is available only if an entity is selected in **Pin Preview to Shape**.* | Boolean | `Disabled` |
| **Pattern Offset** | Shifts the pattern's lookup indexes. | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Pattern Type** | Sets the pattern of the dithering effect. | `4x4` or `8x8` | `4x4` |
| **Sample Settings - Use System Points Per Unit** | If `Enabled`, **Points Per Unit** is set automatically to the sector's density divided by the sector's size. | Booelan | `Enabled` |
| **Sample Settings - Points Per Unit** | Sets the value to scale the input position by before the gradient is sampled. | 0.001 to Infinity | `1.0` |
| **Gradient** | Refer to [Gradient properties](#gradient-properties) below. | | |

### Gradient properties

![Gradient properties](/images/user-guide/components/reference/vegetation-modifiers/gradient-properties.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Gradient Entity Id** | Sets an entity with an active **Gradient** component. | EntityId | None |
| **Opacity** | Sets the opacity of the inbound gradient. | Float: 0.0 - 1.0 | `1.0` |
| **Invert Input** | Inverts the values of the inbound gradient. | Boolean | `Disabled` |
| **Preview (Inbound)** | Displays the gradient provided by the entity set in **Gradient Entity Id**. |  |  |
| **Enable Transform** | If `Enabled`, the translation, scale, and rotation of the inbound gradient may be modified. | Boolean | `Disabled` |
| **Translate** | Sets the translation of the inbound gradient. | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Scale** | Sets the scale of the inbound gradient. | Vector3: 0.0001 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Rotate** | Sets the rotation of the inbound gradient. | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Enable Levels** | If `Enabled`, the input and output values of the inbound gradient may be modified. | Boolean | `Disabled` |
| **Input Mid** | Sets the median value of the inbound gradient. | Float: 0.0 - 1.0 | `1.0` |
| **Input Min** | Sets a minimum value for the inbound gradient. | Float: 0.0 - 1.0 | `0.0` |
| **Input Max** | Sets a maximum value for the inbound gradient. | Float: 0.0 - 1.0 | `1.0` |
| **Output Min** | Sets a minimum value for the outbound gradient. | Float: 0.0 - 1.0 | `0.0` |
| **Output Max** | Sets a maximum value for the outbound gradient. | Float: 0.0 - 1.0 | `1.0` |

## DitherGradientRequestBus

Use the following request functions with the `DitherGradientRequestBus` EBus interface to communicate with Dither Gradient Modifier components in your game.

| Method Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetGradientSampler` | Returns the gradient sampler object of the dither gradient. | None | Gradient Sampler | Yes |
| `GetPatternOffset` | Returns the value of **Pattern Offset**. | None | Offset: Vector3 | Yes |
| `GetPatternType` | Returns the value of **Pattern Type**. | None | Pattern Type Index: Integer | Yes |
| `GetPointsPerUnit` | Returns the value of **Points Per Unit**. | None | Points: Float | Yes |
| `GetUseSystemPointsPerUnit` | Returns the value of **Use System Points Per Unit**. | None | Boolean | Yes |
| `SetPatternOffset` | Sets the value of **Pattern Offset**. | Offset: Vector3 | None | Yes |
| `SetPatternType` | Sets the value of **Pattern Type**. | Pattern Type Index: Integer | None | Yes |
| `SetPointsPerUnit` | Sets the value of **Points Per Unit**. | Points: Float | None | Yes |
| `SetUseSystemPointsPerUnit` | Sets the value of **Use System Points Per Unit**. | Boolean | None | Yes |
