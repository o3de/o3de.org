---
linktitle: Random Noise Gradient
title: Random Noise Gradient Component
description: ' Using Gradients components in Open 3D Engine (O3DE). '
---

## Provider

[Gradient Signal Gem](/docs/user-guide/gems/reference/utility/gradient-signal)

## Dependencies ##

[Gradient Transform Modifier](/docs/user-guide/components/reference/gradient-modifiers/gradient-transform-modifier)

## Random Noise Gradient properties

![Random Noise Gradient properties](/images/user-guide/components/reference/gradients/random-noise-gradient-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Generate Random Seed** | Sets the **Random Seed** property below to a random value. | | |
| **Preview** | Displays the output gradient of this component after all properties are applied. | | |
| **Pin Preview to Shape** | Sets an entity with a compatible Shape component to use as the bounds of the preview if **Constrain to Shape** is `Enabled`. | EntityId | Current Entity |
| **Preview Position** | Sets the world location of the preview.<br> <br>*This field is available only if there is no entity selected in **Pin Preview to Shape**.* | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Preview Size** | Sets the dimensions of the preview. | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Constrain to Shape** | If `Enabled`, the gradient preview will use the bounds of the entity selected in **Pin Preview to Shape**.<br> <br>*This field is available only if an entity is selected in **Pin Preview to Shape**.* | Boolean | `Disabled` |
| **Noise Type** | Sets the noise generation algorithm used to generate the gradient. | `Value`, `Value Fractal`, `Perlin`, `Perlin Fractal`, `Simplex`, `Simplex Fractal`, `Cellular`, `White Noise`, `Cubic`, or `Cubic Fractal` |
`Perlin Fractal` |
| **Random Seed** | Sets the seed value for the noise generation algorithm. Each value generates a distinct pattern of noise. | Integer: 1 to Infinity | `1` |

## RandomGradientRequestBus

Use the following request functions with the `RandomGradientRequestBus` EBus interface to communicate with Random Noise Gradient components in your game.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetRandomSeed` | Returns the value of the **Random Seed** property. | None | Seed: Integer | Yes |
| `SetRandomSeed` | Sets the value of the **Random Seed** property. | Seed: Integer | None | Yes |
