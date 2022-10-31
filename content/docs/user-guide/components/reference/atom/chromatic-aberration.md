---
linkTitle: Chromatic Aberration
title: Chromatic Aberration Component
description: The Chromatic Aberration component, which simulates a lens effect that focuses wavelengths of light to different points, is provided by the Atom Gem in Open 3D Engine (O3DE). 
toc: true
---

The **Chromatic Aberration** component is a post-processing effect that simulates a lens that focuses different wavelengths of light at different points, creating fringes of color around edges in the image.

![Example of chromatic aberration effect](/images/user-guide/components/reference/atom/chromatic-aberration-example.png)

## Provider

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom)

## Dependencies

[PostFX Layer component](./postfx-layer)

## Properties

![Bloom component interface](/images/user-guide/components/reference/atom/chromatic-aberration-component.png)

| Property | Description | Value | Default |
| - | - | - | - |
| **Enable** | If enabled, activates the chromatic aberration effect. | Boolean | `Disabled` |
| **Overrides - Enabled Override** | If enabled, all component properties will be set to the values specified in the **Overrides** property group. | Boolean | `Enabled` |
| **Strength** | Controls the magnitude of the color displacement.  | Float: 0.0 - 1.0 | `0.01` |
| **Blend** | Scales the blending of the effect with the original image which reduces the sharpness of the effect. | Float: 0.0 - 1.0 | `0.5` |