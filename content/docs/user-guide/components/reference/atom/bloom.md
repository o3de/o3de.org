---
linkTitle: Bloom
title: Bloom Component
description: The Bloom component, which simulates real-world light bleeding (glow), is provided by the Atom Gem in Open 3D Engine (O3DE). 
toc: true
---

The **Bloom** component creates *bloom*, a post-processing effect that simulates real-world light bleeding, or glow.


## Provider

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom)


## Dependencies

[PostFX Layer component](./postfx-layer)


## Properties

![Bloom component interface](/images/user-guide/components/reference/atom/bloom-component-ui.png)


### Base properties

| Property | Description | Value | Default |
| - | - | - | - |
| **Enable Bloom** | If enabled, activates the bloom effect. | Boolean | The default value |
| **Threshold** | Bloom effect applies only to pixels with a brightness value greater than this threshold. | Float: 0.0 to Infinity  | `1.0` |
| **Knee** | Creates a gradual transition between the pixels below and above the threshold. This softens and spreads the bloom effect.  | Float: 0.0 to 1.0 | `0.5` |
| **Intensity** | Scales the intensity of the bloom effect. | Float: 0.0 to Infinity | `0.5` |
| **Enable Bicubic** | If enabled, applies bicubic filtering. This can help reduce undesired artifacts that may appear. | Boolean |  False |
| **Kernal Size Scale** | Scales the size of the kernal. | Float: 0.0 to 2.0 | `1.0` |
| **Kernal Size 0 to 4** | Smooths the kernal size by a percentage of the render target's width. For example, a kernal size of `0.04` translates to a 4-by-4 kernal on a 100-by-100 pixel image and a 40-by-40 kernal on a 1000-by-1000 pixel image. Larger values causes more scattering at a higher cost of computation. The maximum kernal size is 128. | Float: 0.0 to 1.0 | Kernal Size<br><ul><li>0: `0.04`</li><li>1: `0.08`</li><li>2: `0.16`</li><li>3: `0.32`</li><li>4: `0.64`</li></ul> |
| **Tint 0 to 4** | Adds a color tint to each bloom stage. Bloom stages are additively blended to produce the final result. | Vector3: 0 to 255 | X: `255`. Y: `255`, Z: `255` |

