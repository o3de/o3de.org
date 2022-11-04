---
linktitle: Gradient Surface Tag Emitter
title: Gradient Surface Tag Emitter Component
description: Use the Gradient Surface Tag Emitter component to enable a gradient to emit surface tags in your Open 3D Engine (O3DE) level.
---

Add the **Gradient Surface Tag Emitter** component to an entity to enable a gradient to emit surface tags.

## Provider

[Surface Data Gem](/docs/user-guide/gems/reference/environment/surface-data)

## Dependencies

When applying Gradient Surface Tag Emitter to an entity, the entity is required to have one of the following components:

- [Dither Gradient Modifier](../gradient-modifiers/dither-gradient-modifier)
- [Gradient Mixer](../gradient-modifiers/gradient-mixer)
- [Invert Gradient Modifier](../gradient-modifiers/invert-gradient-modifier)
- [Levels Gradient Modifier](../gradient-modifiers/levels-gradient-modifier)
- [Posterize Gradient Modifier](../gradient-modifiers/posterize-gradient-modifier)
- [Smooth-Step Gradient Modifier](../gradient-modifiers/smooth-step-gradient-modifier)
- [Threshold Gradient Modifier](../gradient-modifiers/threshold-gradient-modifier)
- [Altitude Gradient](../gradients/altitude-gradient)
- [Constant Gradient](../gradients/constant-gradient)
- [FastNoise Gradient](../gradients/fastnoise-gradient)
- [Image Gradient](../gradients/image-gradient)
- [Perlin Noise Gradient](../gradients/perlin-noise-gradient)
- [Random Noise Gradient](../gradients/random-noise-gradient)
- [Reference Gradient](../gradients/reference-gradient)
- [Shape Falloff Gradient](../gradients/shape-falloff-gradient)
- [Slope Gradient](../gradients/slope-gradient)
- [Surface Mask Gradient](../gradients/surface-mask-gradient)

## Gradient Surface Tag Emitter properties

![Gradient Surface Tag Emitter component properties](/images/user-guide/components/reference/surface-data/gradient-surface-tag-emitter-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview** | Displays a visual preview of the input gradient with **Surface Bounds** and **Threshold** properties applied. |  |  |
| **Surface Bounds** | Optionally constrains the gradient to the bounds of an entity with a Shape component. | Shape Entity: EntityId | None |
| **Threshold Min** | Sets the minimum value from the input gradient that allows tags to be applied. | 0.0 - 1.0 | `0.1` |
| **Threshold Max** | Sets the maximum value from the input gradient that allows tags to be applied. | 0.0 - 1.0 | `1.0` |
| **Extended Tags** | An array of [surface tags](/docs/user-guide/gems/reference/environment/surface-data) that the gradient will emit.| Array: Surface Tags | None |
