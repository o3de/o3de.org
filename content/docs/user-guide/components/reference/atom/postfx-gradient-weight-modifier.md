---
title: PostFX Gradient Weight Modifier component
linktitle: PostFX Gradient Weight Modifier
description: 'Open 3D Engine (O3DE) PostFX Gradient Weight Modifier component reference.'
toc: true
---

The **PostFX Gradient Weight Modifier** component modifies the weight of post-processing effects (PostFX) based on a gradient provided by another entity.


## Provider

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)


## Dependencies

[PostFX Layer component](/docs/user-guide/components/reference/atom/postfx-layer/)


## Gradient Sampler properties

![PostFX Gradient Weight Modifier base properties](/images/user-guide/components/reference/atom/post-processing-volumes/postfx-gradient-weight-modifier.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Gradient Entity Id** | A reference to a separate entity that provides a gradient. | Entity reference | Empty |
| **Opacity** | Controls the opacity of the provided gradient. | `0.0` to `1.0` | `0.0` |

{{< todo issue="https://github.com/o3de/o3de.org/issues/925">}}  {{< /todo >}}


## Usage

In this example, there are two entities: ShaderBall and GradientSignalProvider. The ShaderBall entity's PostFX Gradient Weight Modifier component references the GradientSignalProvider entity in its `Gradient Entity Id` property. The weight of the PostFX depends on the gradient that GradientSignalProvider inputs.

For more information on gradient signal providers, refer to the list of [Gradient components](/docs/user-guide/components/reference/#gradients) and [Gradient Signal Gem](/docs/user-guide/gems/reference/utility/gradient-signal/).

![Using PostFX Gradient Weight Modifier example](/images/user-guide/components/reference/atom/post-processing-volumes/postfx-gradient-weight-modifier-example-1.png)

![Using PostFX Gradient Weight Modifier example](/images/user-guide/components/reference/atom/post-processing-volumes/postfx-gradient-weight-modifier-example-2.png)