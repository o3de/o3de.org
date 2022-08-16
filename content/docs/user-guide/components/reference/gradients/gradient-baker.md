---
linktitle: Gradient Baker
title: Gradient Baker Component
description: Use the Gradient Baker component to bake a complex node graph of gradients down to a single static image in Open 3D Engine (O3DE).
---

Use the **Gradient Baker** component to bake a complex node graph of gradients down to a single static image. You can then use a single [Image Gradient](/docs/user-guide/components/reference/gradients/image-gradient/) at runtime, instead of having the entire node graph computed every time, to optimize performance.

For example, suppose you have a complex gradient chain with a generator and multiple gradient modifiers.

You can create a **Gradient Baker** and connect its input gradient to the output of the gradient chain you'd like to bake. The **Gradient Baker** also needs an input bounds for where to sample the data. With both of those connected, the graph would look like this.

![Complex chain with gradient baker](/images/user-guide/components/reference/gradients/gradient-baker-chain-with-baker.png)

Clicking the **Bake image** button on the **Gradient Baker** component will then bake out a single static image that can be used in a single [Image Gradient](/docs/user-guide/components/reference/gradients/image-gradient/), which reduces the entire complex graph to only a single component.

![Complex chain with gradient baker](/images/user-guide/components/reference/gradients/gradient-baker-single-image-gradient.png)

The final optimization step is to select all of the gradients in your chain and mark them as **Editor only**. This will prevent them from being loaded/computed at runtime. You can optionally mark the **Gradient Baker** as **Editor only** as well, but it will have no effect because there is no runtime component for it.

![Mark gradient/gradient generators Editor only to disable at runtime](/images/user-guide/components/reference/gradients/gradient-baker-editor-only.png)

## Provider

[Gradient Signal Gem](/docs/user-guide/gems/reference/utility/gradient-signal)

## Gradient Baker properties

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview** | Displays the gradient image that will be baked out of this component after all properties are applied. | | |
| **Input Bounds** | An entity with a shape component for where to sample the data from. | EntityId | None |
| **Resolution** | The resolution of the output baked image. | Vector2: 1 to Infinity | X:`512`, Y:`512` |
| **Output Format** | The output format of the output baked image. | `R8`, `R16`, `R32` | `R32` |
| **Output Path** | File path where the output image will be baked.<br><br>**NOTE:** By default, the initial output path will have a `_gsi` suffix. This is because the **Image Gradient** that will consume the output image only supports a subset of available pixel formats. The `_gsi` suffix will make sure the Asset Processor uses a supported format. You can omit the `_gsi` suffix if your output image is configured to use a supported format. For more information about this limitation, please refer to the [Image Gradient documentation](/docs/user-guide/components/reference/gradients/image-gradient/#image-gradient-properties) | AZ::IO::Path | None |

### Gradient properties

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

## GradientBakerRequestBus

Use the following request functions with the `GradientBakerRequestBus` EBus interface to communicate with the **Gradient Baker** component.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `BakeImage` | Bake the image to the output path. | None | None | Yes |
| `GetInputBounds` | Returns AZ::EntityId of the input bounds to sample from. | None | AZ::EntityId | Yes |
| `SetInputBounds` | Sets the AZ::EntityId for the input bounds to sample from. | AZ::EntityId | None | Yes |
| `GetOutputResolution` | Returns the output resolution for the baked image. | None | AZ::Vector2 | Yes |
| `SetOutputResolution` | Sets the output resolution for the baked image. | AZ::Vector2 | None | Yes |
| `GetOutputFormat` | Returns the output format for the baked image. | None | GradientSignal::OutputFormat | Yes |
| `SetOutputFormat` | Sets the output format for the baked image. | GradientSignal::OutputFormat | None | Yes |
| `GetOutputImagePath` | Returns the path that the output image will be baked to. | None | AZ::IO::Path | Yes |
| `SetOutputImagePath` | Sets the path that the output image will be baked to. | AZ::IO::Path | None | Yes |
