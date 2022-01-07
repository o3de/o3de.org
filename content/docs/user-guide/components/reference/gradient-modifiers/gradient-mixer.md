---
linktitle: Gradient Mixer
title: Gradient Mixer Component
description: Use the Gradient Mixer component to combine gradients with operations in Open 3D Engine (O3DE).
---

The **Gradient Mixer** component generates a new gradient from the combination of other gradients.  Operations define how a gradients will be combined.

## Provider

[Gradient Signal Gem](/docs/user-guide/gems/reference/utility/gradient-signal)

## Gradient Mixer properties

![Gradient Mixer component properties](/images/user-guide/components/reference/gradient-modifiers/gradient-mixer-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview** | Displays the outbound gradient of this component after all properties are applied. | | |
| **Preview Settings** |  |  |  |
| **Pin Preview to Shape** | Sets an entity with a compatible Shape component to use as the bounds of the preview if **Constrain to Shape** is `Enabled`. | EntityId | Current Entity |
| **Preview Position** | Sets the world location of the preview.<br> <br>*This field is available only if there is no entity selected in **Pin Preview to Shape**.* | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Preview Size** | Sets the dimensions of the preview. | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Constrain to Shape** | If `Enabled`, the gradient preview will use the bounds of the entity selected in **Pin Preview to Shape**.<br> <br>*This field is available only if an entity is selected in **Pin Preview to Shape**.* | Boolean | `Disabled` |
| **Layers** | An array of gradients and gradient operations to evaluate.  Gradient operations are applied in the same order as this array. |  |  |
| **Layers - Enabled** | Toggles the influnce of this gradient layer. | Boolean | `Enabled` |
| **Layers - Operation** | Sets the function that is used to mix this gradient layer with the previous result. | `Initialize`, `Multiply`, `Linear Dodge (Add)`, `Subtract`, `Darken (Min)`, `Lighten (Max)`, `Average`, `Normal`, or `Overlay`. | `Initialize` |
| **Layers - Gradient** | Refer to [Gradient properties](#gradient-properties) below. | | |

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

## MixedGradientRequestBus

Use the following request functions with the `MixedGradientRequestBus` EBus interface to communicate with Gradient Mixer components in your game.

| Method Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `AddLayer` | Adds a layer to the end of the **Layers** array. | Mixed Gradient Layer | None | Yes |
| `GetLayer` | Returns the mixed gradient layer at the specified index. | Layer Index: Integer | Mixed Gradient Layer | Yes |
| `GetNumLayers` | Returns the number of mixed gradient layers. | None | Count: Integer | Yes |
| `RemoveLayer` | Removes the mixed gradient layer at the specified index. | Layer Index: Integer | None | Yes |
