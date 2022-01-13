---
linktitle: Threshold Gradient Modifier
title: Threshold Gradient Modifier Component
description: Use the Threshold Gradient Modifier component to convert a gradient's values to either `0` or `1` based on a threshold in Open 3D Engine (O3DE).
---

The **Threshold Gradient Modifier** component applies a threshold value to an input gradient to generate an output gradient that has only two values. Input gradient values above the threshold are set to 1 and input values at or below the threshold are set to 0.

## Provider

[Gradient Signal Gem](/docs/user-guide/gems/reference/utility/gradient-signal)

## Threshold Gradient Modifier properties

![Threshold Gradient Modifier component properties](/images/user-guide/components/reference/gradient-modifiers/threshold-gradient-modifier-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview** | Displays the output gradient of this component after all properties are applied. | | |
| **Pin Preview to Shape** | Sets an entity with a compatible Shape component to use as the bounds of the preview if **Constrain to Shape** is `Enabled`. | EntityId | Current Entity |
| **Preview Position** | Sets the world location of the preview.<br> <br>*This field is available only if there is no entity selected in **Pin Preview to Shape**.* | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Preview Size** | Sets the dimensions of the preview. | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Constrain to Shape** | If `Enabled`, the gradient preview uses the bounds of the entity selected in **Pin Preview to Shape**.<br> <br>*This field is available only if an entity is selected in **Pin Preview to Shape**.* | Boolean | `Disabled` |
| **Threshold** | Sets the value of the threshold. If an input gradient's value is less than or equal to the threshold value, it is set to `0.0`.  Input gradient values above the threshold are evaluated as `1.0`. | Float: 0.0 - 1.0 | `0.5` |
| **Gradient** | Refer to [Gradient properties](#gradient-properties) below. | | |

### Gradient properties

![Gradient properties](/images/user-guide/components/reference/vegetation-modifiers/gradient-properties.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Gradient Entity Id** | Sets an entity with an active **Gradient** component. | EntityId | None |
| **Opacity** | Sets the opacity of the input gradient. | Float: 0.0 - 1.0 | `1.0` |
| **Invert Input** | Inverts the values of the input gradient. | Boolean | `Disabled` |
| **Preview (Input)** | Displays the gradient provided by the entity set in **Gradient Entity Id**. |  |  |
| **Enable Transform** | If `Enabled`, the translation, scale, and rotation of the input gradient may be modified. | Boolean | `Disabled` |
| **Translate** | Sets the translation of the input gradient. | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Scale** | Sets the scale of the input gradient. | Vector3: 0.0001 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Rotate** | Sets the rotation of the input gradient. | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Enable Levels** | If `Enabled`, the input and output values of the input gradient may be modified. | Boolean | `Disabled` |
| **Input Mid** | Sets the median value of the input gradient. | Float: 0.0 - 1.0 | `1.0` |
| **Input Min** | Sets a minimum value for the input gradient. | Float: 0.0 - 1.0 | `0.0` |
| **Input Max** | Sets a maximum value for the input gradient. | Float: 0.0 - 1.0 | `1.0` |
| **Output Min** | Sets a minimum value for the output gradient. | Float: 0.0 - 1.0 | `0.0` |
| **Output Max** | Sets a maximum value for the output gradient. | Float: 0.0 - 1.0 | `1.0` |

## ThresholdGradientRequestBus

Use the following request functions with the `ThresholdGradientRequestBus` EBus interface to communicate with Threshold Gradient Modifier components in your game.

| Method Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetGradientSampler` | Returns the gradient sampler object of the threshold gradient. | None | Gradient Sampler | Yes |
| `GetThreshold` | Returns the value of **Threshold**. | None | Threshold: Float | Yes |
| `SetThreshold` | Sets the value of **Threshold**. | Threshold: Float | None | Yes |
