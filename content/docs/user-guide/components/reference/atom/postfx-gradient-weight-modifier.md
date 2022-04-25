---
title: PostFX Gradient Weight Modifier Component
linktitle: PostFX Gradient Weight Modifier
description: 'Open 3D Engine (O3DE) PostFX Gradient Weight Modifier component reference.'
toc: true
---

The **PostFX Gradient Weight Modifier** component modifies the blending weight of post-processing effects (PostFX) by using another entity's gradient signal as a masking operation.


## Provider

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)


## Dependencies

[PostFX Layer component](/docs/user-guide/components/reference/atom/postfx-layer/)


## Gradient Sampler properties

![PostFX Gradient Weight Modifier base properties](/images/user-guide/components/reference/atom/post-processing-modifiers/postfx-gradient-weight-modifier.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Gradient Entity Id** | A reference to a separate entity that provides a gradient. | EntityId | None |
| **Opacity** | Sets the opacity of the input gradient. | Float: 0.0 - 1.0 | `1.0` |
| **Invert Input** | Inverts the values of the input gradient. | Boolean | `Disabled` |
| **Preview (Inbound)** | Displays the gradient provided by the entity set in **Gradient Entity Id**. |  |  |
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

## Usage

In this example, there are two entities: ShaderBall and GradientSignalProvider. The ShaderBall entity's PostFX Gradient Weight Modifier component references the GradientSignalProvider entity in its `Gradient Entity Id` property. The weight of the PostFX depends on the gradient that GradientSignalProvider inputs.

For more information on gradient signal providers, refer to the list of [Gradient components](/docs/user-guide/components/reference/#gradients) and [Gradient Signal Gem](/docs/user-guide/gems/reference/utility/gradient-signal/).

![Using PostFX Gradient Weight Modifier example](/images/user-guide/components/reference/atom/post-processing-modifiers/postfx-gradient-weight-modifier-example-1.png)

![Using PostFX Gradient Weight Modifier example](/images/user-guide/components/reference/atom/post-processing-modifiers/postfx-gradient-weight-modifier-example-2.png)
