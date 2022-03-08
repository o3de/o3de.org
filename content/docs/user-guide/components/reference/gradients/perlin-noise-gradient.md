---
linktitle: Perlin Noise Gradient
title: Perlin Noise Gradient Component
description: Use the Perlin Noise Gradient component to generate a gradient from a perlin noise algorithm in Open 3D Engine (O3DE).
---

Add the **Perlin Noise Gradient** component to generate a gradient with perlin noise.

## Provider

[Gradient Signal Gem](/docs/user-guide/gems/reference/utility/gradient-signal)

## Dependencies ##

[Gradient Transform Modifier](/docs/user-guide/components/reference/gradient-modifiers/gradient-transform-modifier)

## Perlin Noise Gradient properties

![Perlin Noise Gradient properties](/images/user-guide/components/reference/gradients/perlin-noise-gradient-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Generate Random Seed** | Sets the **Random Seed** property below to a random value. | | |
| **Preview** | Displays the output gradient of this component after all properties are applied. | | |
| **Pin Preview to Shape** | Sets an entity with a compatible Shape component to use as the bounds of the preview if **Constrain to Shape** is `Enabled`. | EntityId | Current Entity |
| **Preview Position** | Sets the world location of the preview.<br> <br>*This field is available only if there is no entity selected in **Pin Preview to Shape**.* | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Preview Size** | Sets the dimensions of the preview. | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Constrain to Shape** | If `Enabled`, the gradient preview  uses the bounds of the entity selected in **Pin Preview to Shape**.<br> <br>*This field is available only if an entity is selected in **Pin Preview to Shape**.* | Boolean | `Disabled` |
| **Random Seed** | Sets the seed value for the noise generation algorithm. Each value generates a distinct pattern of noise. | Integer: 1 to Infinity | `1` |
| **Octaves** | Sets the number of recursions of pattern generation. | Integer: 0 - 16 | `1` |
| **Amplitude** | Increases contrast between high and low gradient values. | Float: 0.0 to Infinity | `1.0` |
| **Frequency** | Rescales the coordinates of the gradient. Larger values result in noise that is more coarse.  | Float: 0.0001 - Infinity | `1.0` |

## PerlinGradientRequestBus

Use the following request functions with the `PerlinGradientRequestBus` EBus interface to communicate with Perlin Noise Gradient components in your game.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetAmplitude` | Returns the value of the **Amplitude** property. | None | Float | Yes |
| `GetFrequency` | Returns the value of the **Frequency** property. | None | Float | Yes |
| `GetOctaves` | Returns the value of the **Octaves** property. | None | Octave Count: Integer | Yes |
| `GetRandomSeed` | Returns the value of the **Random Seed** property. | None | Seed: Integer | Yes |
| `SetAmplitude` | Sets the value of the **Amplitude** property. | Float | None | Yes |
| `SetFrequency` | Sets the value of the **Frequency** property. | Float | None | Yes |
| `SetOctaves` | Sets the value of the **Octaves** property. | Octave Count: Integer | None | Yes |
| `SetRandomSeed` | Sets the value of the **Random Seed** property. | Seed: Integer | None | Yes |
