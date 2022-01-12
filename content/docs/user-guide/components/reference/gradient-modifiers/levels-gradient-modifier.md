---
linktitle: Levels Gradient Modifier
title: Levels Gradient Modifier Component
description: Use the Levels Gradient Modifier component to modify input and output gradient values in Open 3D Engine (O3DE).
---

The **Levels Gradient Modifier** component modifies the high, mid, and low values of an input gradient.  It can also be used to clamp the minimum and maximum values of the output gradient.

## Provider

[Gradient Signal Gem](/docs/user-guide/gems/reference/utility/gradient-signal)

## Levels Gradient Modifier properties

![Levels Gradient Modifier component properties](/images/user-guide/components/reference/gradient-modifiers/levels-gradient-modifier-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview** | Displays the output gradient of this component after all properties are applied. | | |
| **Pin Preview to Shape** | Sets an entity with a compatible Shape component to use as the bounds of the preview if **Constrain to Shape** is `Enabled`. | EntityId | Current Entity |
| **Preview Position** | Sets the world location of the preview.<br> <br>*This field is available only if there is no entity selected in **Pin Preview to Shape**.* | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Preview Size** | Sets the dimensions of the preview. | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Constrain to Shape** | If `Enabled`, the gradient preview will use the bounds of the entity selected in **Pin Preview to Shape**.<br> <br>*This field is available only if an entity is selected in **Pin Preview to Shape**.* | Boolean | `Disabled` |
| **Input Mid** | Sets the median value of the input gradient. | Float: 0.0 - 1.0 | `1.0` |
| **Input Min** | Sets a minimum value for the input gradient. | Float: 0.0 - 1.0 | `0.0` |
| **Input Max** | Sets a maximum value for the input gradient. | Float: 0.0 - 1.0 | `1.0` |
| **Output Min** | Sets a minimum value for the output gradient. | Float: 0.0 - 1.0 | `0.0` |
| **Output Max** | Sets a maximum value for the output gradient. | Float: 0.0 - 1.0 | `1.0` |
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

## LevelsGradientRequestBus

Use the following request functions with the `LevelsGradientRequestBus` EBus interface to communicate with Levels Gradient Modifier components in your game.

| Method Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetGradientSampler` | Returns the gradient sampler object of the inverted gradient. | None | Gradient Sampler | Yes |
| `GetInputMax` | Returns the value of **Input Max**. | None | Max: Float | Yes |
| `GetInputMid` | Returns the value of **Input Mid**. | None | Mid: Float | Yes |
| `GetInputMin` | Returns the value of **Input Min**. | None | Min: Float | Yes |
| `GetOutputMax` | Returns the value of **Output Max**. | None | Max: Float | Yes |
| `GetOutputMin` | Returns the value of **Output Min**. | None | Min: Float | Yes |
| `SetInputMax` | Sets the value of **Input Max**. | Max: Float | None | Yes |
| `SetInputMid` | Sets the value of **Input Mid**. | Mid: Float | None | Yes |
| `SetInputMin` | Sets the value of **Input Min**. | Min: Float | None | Yes |
| `SetOutputMax` | Sets the value of **Output Max**. | Max: Float | None | Yes |
| `SetOutputMin` | Sets the value of **Output Min**. | Min: Float | None | Yes |
