---
title: PostFX Gradient Weight Modifier component
linktitle: PostFX Gradient Weight Modifier
description: 'Open 3D Engine (O3DE) PostFX Gradient Weight Modifier component reference.'
toc: true
---

The **PostFX Gradient Weight Modifier** component modifies the weight of post-processing effects (PostFX) based on another entity's gradient signal. 


## Provider ##

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)


## Dependencies

[PostFX Layer component](/docs/user-guide/components/reference/atom/postfx-layer/)


## Gradient Sampler Properties

![PostFX Gradient Weight Modifier base properties](/images/user-guide/components/reference/atom/post-processing-volumes/postfx-gradient-weight-modifier.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Gradient Entity Id** | A reference to a separate entity that acts as a gradient signal provider. | Entity reference | Empty |
| **Opacity** | Controls the opacity of the gradient signal that's retreieved from the gradient signal provider. | `0.0` to `1.0` | `0.0` |

{{< todo issue="https://github.com/o3de/o3de.org/issues/925">}}  {{< /todo >}}


## Using the PostFX Gradient Weight Modifier component

This component depends on another entity that has a Gradient component to act as the gradient signal provider. 

In this example, there are two entities: ShaderBall and GradientSignalProvider.  The ShaderBall entity's PostFX Gradient Weight Modifier component references the GradientSignalProvider entity in its `Gradient Entity Id` property. The weight of the PostFX depends on the gradient that GradientSignalProvider inputs.

![Using PostFX Gradient Weight Modifier example](/images/user-guide/components/reference/atom/post-processing-volumes/postfx-gradient-weight-modifier-example-1.png)

![Using PostFX Gradient Weight Modifier example](/images/user-guide/components/reference/atom/post-processing-volumes/postfx-gradient-weight-modifier-example-2.png)