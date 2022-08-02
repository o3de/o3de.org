---
linktitle: Gradient Mixer
title: Gradient Mixer Component
description: Use the Gradient Mixer component to combine gradients with operations in Open 3D Engine (O3DE).
---

The **Gradient Mixer** component generates a new gradient by blending a number of input gradient layers with layer blending operations.

## Provider

[Gradient Signal Gem](/docs/user-guide/gems/reference/utility/gradient-signal)

## Gradient Mixer properties

![Gradient Mixer component properties](/images/user-guide/components/reference/gradient-modifiers/gradient-mixer-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview** | Displays the output gradient of this component, in world space, after all properties are applied. Select the **Show Larger Preview** button to view a separate dockable window with a larger preview gradient. | | |
| **Pin Preview to Shape** | Sets an entity with a compatible Shape component to use as the position and bounding box of the preview. | EntityId | Current Entity |
| **Preview Position** | Sets the world location of the preview.<br> <br>*This field is available only if there is no entity selected in **Pin Preview to Shape**.* | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Preview Size** | Sets the dimensions of the preview. | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Constrain to Shape** | If `Enabled`, the gradient preview only displays the gradient that lies within the shape of the entity selected in **Pin Preview to Shape**.<br> <br>*This field is available only if an entity is selected in **Pin Preview to Shape**.* | Boolean | `Disabled` |
| **Layers** | An array of gradients and gradient operations to evaluate.  Gradient operations are applied in the same order as this array. |  |  |
| **Layers - Enabled** | Toggles the influence of this gradient layer. | Boolean | `Enabled` |
| **Layers - Operation** | Sets the function that is used to mix this gradient layer with the result of all previous layers. Refer to the [Gradient mixing operations](#gradient-mixing-operations) section that follows for more information. | `Initialize`, `Multiply`, `Linear Dodge (Add)`, `Subtract`, `Darken (Min)`, `Lighten (Max)`, `Average`, `Normal`, or `Overlay`. | `Initialize` |
| **Layers - Gradient** | Refer to the [Gradient properties](#gradient-properties) section that follows. | | |

### Gradient properties

![Gradient properties](/images/user-guide/components/reference/vegetation-modifiers/gradient-properties.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Gradient Entity Id** | Sets an entity with an active **Gradient** or **Gradient Modifier** component. | EntityId | None |
| **Opacity** | Sets the opacity of the input gradient. | Float: 0.0 - 1.0 | `1.0` |
| **Invert Input** | Inverts the values of the input gradient. | Boolean | `Disabled` |
| **Preview (Input)** | Displays the gradient provided by the entity set in **Gradient Entity Id** with the following gradient properties applied. |  |  |
| **Enable Transform** | If `Enabled`, the translation, scale, and rotation of the input gradient may be modified. | Boolean | `Disabled` |
| **Translate** | Sets the translation of the input gradient. | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Scale** | Sets the scale of the input gradient. | Vector3: 0.0001 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Rotate** | Sets the rotation of the input gradient. | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Enable Levels** | If `Enabled`, the input and output values of the input gradient may be modified by the following properties. | Boolean | `Disabled` |
| **Input Mid** | Remaps the midpoint of values greater than `0` and less than `1` in the input gradient. An **Input Mid** value of `0.5` will result in a darker output gradient.  An **Input Mid** value of `2.0` will result in a lighter output gradient.| Float: 0.0 - 10.0 | `1.0` |
| **Input Min** | Remaps the input gradient so that it lies between **Input Min** and **Input Max**.  All output gradient values less than or equal to **Input Min** are set to `0`. | Float: 0.0 - 1.0 | `0.0` |
| **Input Max** | Remaps the input gradient so that it lies between **Input Min** and **Input Max**.  All output gradient values greater than or equal to **Input Max** are set to `1`. | Float: 0.0 - 1.0 | `1.0` |
| **Output Min** | Sets a minimum value for the output gradient. Remaps the input gradient so that it lies between **Output Min** and **Output Max**. | Float: 0.0 - 1.0 | `0.0` |
| **Output Max** | Sets a maximum value for the output gradient. Remaps the input gradient so that it lies between **Output Min** and **Output Max**. | Float: 0.0 - 1.0 | `1.0` |

## Gradient mixing operations

The following examples mix these gradients:

| First Gradient | Second Gradient |
| - | - |
| ![Linear ramp gradient](/images/user-guide/components/reference/gradient-modifiers/linear-ramp-gradient.png) | ![Noise gradient](/images/user-guide/components/reference/gradient-modifiers/noise-gradient.png) |

{{< note >}}
The **Opacity** property of a gradient applies after its **Operation**.
{{< /note >}}

| Mixing Operation | Description | Mixed Gradient |
| :- | :- | :- |
| `Initialize` | Initializes the values of the mixed gradient to the values of the current gradient layer. Unlike the `Normal` operation, when **Opacity** is less than `1`, the current gradient layer will not blend with the result of previous layers. | ![Example gradients mixed with the initialize operation](/images/user-guide/components/reference/gradient-modifiers/initialize-operation.png) |
| `Multiply` | Multiplies the values of the current gradient with the result of previous layers. | ![Example gradients mixed with the multiply operation](/images/user-guide/components/reference/gradient-modifiers/multiply-operation.png) |
| `Linear Dodge (Add)` | Adds the values of the current gradient with the result of previous layers. | ![Example gradients mixed with the linear dodge-add operation](/images/user-guide/components/reference/gradient-modifiers/linear-dodge-operation.png) |
| `Subtract` | Subtracts the values of the current gradient from the result of previous layers. | ![Example gradients mixed with the subtract operation](/images/user-guide/components/reference/gradient-modifiers/subtract-operation.png) |
| `Darken (Min)`  | Selects the minimum value from the current gradient and the result of previous layers. | ![Example gradients mixed with the darken-min operation](/images/user-guide/components/reference/gradient-modifiers/darken-operation.png) |
| `Lighten (Max)` | Selects the maximum value from the current gradient and the result of previous layers. | ![Example gradients mixed with the lighten-max operation](/images/user-guide/components/reference/gradient-modifiers/lighten-operation.png) |
| `Average` | Averages the values of the current gradient and the result of previous layers. | ![Example gradients mixed with the average operation](/images/user-guide/components/reference/gradient-modifiers/average-operation.png) |
| `Normal` | Uses the value of **Opacity** to average the values of the current gradient and the result of previous layers. Selects the value of the current gradient if **Opacity** equals `1`. | ![Example gradients mixed with the normal operation](/images/user-guide/components/reference/gradient-modifiers/normal-operation.png) |
| `Overlay` | Increases the contrast of high and low values in the mixed gradient.  If the result of previous layers has a value less than `.5`, the operation will darken the blend of gradients.  For values greater than `.5` the blend of gradients becomes lighter.  | ![Example gradients mixed with the overlay operation](/images/user-guide/components/reference/gradient-modifiers/overlay-operation.png) |

## MixedGradientRequestBus

Use the following request functions with the `MixedGradientRequestBus` EBus interface to communicate with Gradient Mixer components in your game.

| Method Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `AddLayer` | Adds a layer to the end of the **Layers** array. | Mixed Gradient Layer | None | Yes |
| `GetLayer` | Returns the mixed gradient layer at the specified index. | Layer Index: Integer | Mixed Gradient Layer | Yes |
| `GetNumLayers` | Returns the number of mixed gradient layers. | None | Count: Integer | Yes |
| `RemoveLayer` | Removes the mixed gradient layer at the specified index. | Layer Index: Integer | None | Yes |
