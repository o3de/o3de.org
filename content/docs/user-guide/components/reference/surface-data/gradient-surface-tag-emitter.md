---
linktitle: Gradient Surface Tag Emitter
title: Gradient Surface Tag Emitter Component
description: Use the Gradient Surface Tag Emitter component to enable a gradient to emit surface tags in your Open 3D Engine (O3DE) level.
---

## Provider

[Surface Data Gem](/docs/user-guide/gems/reference/environment/surface-data)

## Dependencies

When applying Gradient Surface Tag Emitter to an entity, the entity is required to have one of the following components:

- Dither Gradient Modifier
- Gradient Mixer
- Invert Gradient Modifier
- Levels Gradient Modifier
- Posterize Gradient Modifier
- Smooth-Step Gradient Modifier
- Threshold Gradient Modifier
- Altitude Gradient
- Constant Gradient
- FastNoise Gradient
- Image Gradient
- Perlin Noise Gradient
- Random Noise Gradient
- Reference Gradient
- Shape Falloff Gradient
- Slope Gradient
- Surface Mask Gradient

## Gradient Surface Tag Emitter properties

![Gradient Surface Tag Emitter component properties](/images/user-guide/components/reference/surface-data/gradient-surface-tag-emitter-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview** | Displays a visual preview of the inbound gradient with **Surface Bounds** and **Threshold** properties applied. |  |  |
| **Surface Bounds** | Optionally constrains the gradient to the bounds of an entity with a Shape component. | Shape Entity: EntityId | None |
| **Threshold Min** | Sets the minimum value from the input gradient that allows tags to be applied. | 0.0 - 1.0 | `0.1` |
| **Threshold Max** | Sets the maximum value from the input gradient that allows tags to be applied. | 0.0 - 1.0 | `1.0` |
| **Extended Tags** | An array of surface tags that the gradient will emit. | Array: Surface Tags | None |
