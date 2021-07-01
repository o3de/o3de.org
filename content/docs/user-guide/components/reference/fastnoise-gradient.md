---
title: Open 3D Engine FastNoise Gradient Component
linkTitle: FastNoise Gradient
description: Complete reference for the pseduo-random noise generation component of the Open 3D Engine FastNoise Gem.
toc: true
---

Use the **FastNoise Gradient** Component to define a gradient signal that provides pseudo-random noise values across the world. The FastNoise Gradient uses the third-party open source [FastNoise](https://github.com/Auburns/FastNoise) library for noise generation and creates an output Gradient signal that can be used with other Gradient, Surface, and Vegetation components.

## Platform support

All platforms support this feature.

## Requirements

To add a FastNoise Gradient component, you need to meet the following requirements.

### Gems

* [FastNoise](/docs/user-guide/gems/reference/utility/fast-noise)

### Other components

When applying FastNoise Gradient to an entity, the entity is required to also have components which:

* Offer the functionality of a [Shape component](./shape), used to define the preview area in the **O3DE Editor**. This shape is *not* used for any runtime rendering.
* Offer the functionality of a Gradient Transform, used to map the noise signal onto the world at runtime.

{{< note >}}
When using the "None (unbounded)" wrapping type with the Gradient Transform, the FastNoise Gradient will produce a non-repeating noise signal across the entire world.
{{< /note >}}

## Use with Dynamic Vegetation

FastNoise can be used to drive any aspect of the vegetation system. Some of the more common uses:

* Perlin Noise works well with the Vegetation Asset Weight Selector for creating patches of different types of vegetation.
* Perlin Noise mixed with White Noise and/or modified by the Dither Gradient Modifier works well with the Vegetation Distribution Filter.
* White Noise works well with the Vegetation Modifiers (Position / Rotation / Scale) to make each piece of vegetation look unique.
* Cellular Noise can produce interesting effects with mixed with the Gradient Surface Tag Emitter.

To use a FastNoise Gradient component to power dynamic vegetation:

1. Meet the prerequisites for using both Dynamic Vegetation and the FastNoise Gradient components.
2. Create an entity and add a FastNoise Gradient component. It's recommended to use an entity *other* than the entity with the vegetation spawner, so that multiple vegetation sets can share the same controller.
3. On your entity used to spawn vegetation:
   * Add a Vegetation Asset Weight Selector component. For the **Gradient Entity Id** property value, use the Entity ID of the entity with the FastNoise Gradient component you want to drive the dynamic vegetation system.
   
## Parameters

Parameters are listed in the order that they appear in the Editor Entity Inspector.

| Group Name | Parameter Name | Description | Used with | Type | Default | Min ... Max |
| --- | --- | --- | --- | --- | --- | --- |
|     | Generate Random Seed | Sets the value of 'Random Seed' to a randomly selected value. | All |     |     |
| Preview Settings |     | Settings used for the preview image of a noise sample in the Entity Inspector and Editor. |     |     |
|     | Noise Type | The pseudo-random noise algorithm to use. Different settings are available for different types of noise. See [Noise Types](#noise-types). | All | `NoiseType` | `Perlin` |
|     | Random Seed | Seed the random number generator with an initialized value. Different sequences of random numbers are generated for different seeds. | All | `int` | `1` | `1` ... `2147483647` |
|     | Frequency | The scale multiplier to use with coordinates. Smaller values "zoom in", and larger values "zoom out". | All except **White Noise** |     |     |
|     | Octaves | The number of recursions in the pattern generation. Higher numbers cause finer details; Octaves higher than 4 can be nearly imperceptible. | **Fractal** noise types |     |     |
|     | Lacunarity | The frequency multiplier to use for each successive octave. Smaller values "zoom in", and larger values "zoom out". | **Fractal** noise types |    |     | 
|     | Gain | The blend multiplier to use for each successive octave. Smaller values blend towards the lower octaves, and higher values blend towards the higher octaves. | **Fractal** noise types |    |     |
|     | Distance Function | The distance function to use to calculate which cell value to use for a given point in the world. This effectively determines what method of cellular shape distortion to apply. See [Distance functions](#distance-functions) | **Cellular** |     |     |
|     | Return Type | Determines which cellular noise calculation result to use for the gradient signal. See [Cellular noise results](#cellular-noise-results). | **Cellular** |     |     |
|     | Jitter | The scale factor to apply to the location of the "feature points" to adjust the overall shape of the results. A value of 0.0 provides no jitter, and values above 1.0 can produce artifacts from clamped multiplications that may not be desirable. | **Cellular** |     |     |
| Advanced Settings |     |     |     |     |
|     | Interpolation | The type of interpolation to apply to calculated noise values. Linear interpolation provides angular artifacts, Hermite provides smooth blurred values, and Quintic provides more defined edges than Hermite without the angular artifacts of Linear. See [Interpolation functions](#interpolation-functions) | **Value**<br/>**Value Fractal**<br/>**Perlin**<br/>**Perlin Fractal** |    |     |
|     | Fractal Type | The type of fractal calculation to apply to calculated noise values. See [Fractal types](#fractal-types) | **Fractal** noise types |     |     |

### Noise types

| Noise Type | Description | Example |
| --- | --- | --- |
| Value | Interpolated values are generated directly from XYZ coordinates, effectively producing a zoomed-out version of "White Noise". | ![Sample image displaying value noise.](/images/user-guide/component/fastnoise/value.png) |
| Value Fractal | Results from the Value algorithm are run through a fractal function. | ![Sample image displaying value fractal noise.](/images/user-guide/component/fastnoise/value-fractal.png) |
| Perlin | Values are generated from the Perlin noise algorithm, which is a noise algorithm designed to have visual features that are all of similar size. | ![Sample image displaying Perlin noise.](/images/user-guide/component/fastnoise/perlin.png) |
| Perlin Fractal | Results from the Perlin noise algorithm are then run through a fractal function. | ![Sample image displaying Perlin fractal noise.](/images/user-guide/component/fastnoise/perlin-fractal.png) |
| Simplex | Values are generated from the Simplex noise algorithm, which is a variation of Perlin noise designed to have less directional artifacts. | ![Example image displaying Simplex noise.](/images/user-guide/component/fastnoise/simplex.png) |
| Simplex Fractal | Results from the Simplex noise algorithm are then run through a fractal function. | ![Sample image displaying Simplex fractal noise.](/images/user-guide/component/fastnoise/simplex-fractal.png) |
| Cellular | Values are generated from a cellular noise algorithm, in which values are assigned based on "feature points" that have been randomly distributed; each world position is assigned the value of the closest feature point. | ![Sample image displaying cellular noise.](/images/user-guide/component/fastnoise/cellular.png) |
| White Noise | Pseudo-random values are generated from the XYZ coordinates, producing extremely different values for adjacent samples. | ![Sample image displaying white noise.](/images/user-guide/component/fastnoise/white-noise.png) |
| Cubic | Values are generated directly from XYZ coordinates and run through cubic interpolation with neighboring values. This is effectively a zoomed-out version of "White Noise" run through cubic interpolation. The results are similar to Perlin noise, but with less directional artifacts and with a higher occurrence of extreme values. | ![Sample image displaying cubic noise.](/images/user-guide/component/fastnoise/cubic.png) |
| Cubic Fractal | Results from the Cubic noise algorithm are then run through a fractal function. | ![Sample image displaying cubic fractal noise.](/images/user-guide/component/fastnoise/cubic-fractal.png) |

### Distance functions

| Distance function | Example |
| --- | --- |
| Euclidean  | ![Example of output using Euclidean distance with cellular noise.](/images/user-guide/component/fastnoise/cubic-euclidean.png) |
| Manhattan | ![Example of output using Manhattan distance with cellular noise.](/images/user-guide/component/fastnoise/cubic-manhattan.png) |
| Natural | ![Example of output using Natural distance with cellular noise.](/images/user-guide/component/fastnoise/cubic-natural.png) |

### Cellular noise results

| Return Type | Description | Example |
| --- | --- | --- |
| CellValue | Returns the value of the nearest "feature point" at any given world position. | ![Example of cellular noise which returns CellValue.](/images/user-guide/component/fastnoise/cell-value.png) |
| Distance | Returns the distance to the nearest "feature point" at any given world position. | ![Example of cellular noise which returns Distance.](/images/user-guide/component/fastnoise/cell-distance.png) |
| Distance2 | Returns the distance to the second-nearest "feature point" at any given world position. | ![Example of cellular noise which returns Distance2.](/images/user-guide/component/fastnoise/cell-distance2.png) |
| Distance2Add | Returns the distances of the two closest feature points added together. | ![Example of cellular noise which returns Distance2Add.](/images/user-guide/component/fastnoise/cell-distance-add.png) |
| Distance2Sub | Returns the distances of the two closest feature points subtracted from each other. | ![Example of cellular noise which returns Distance2Sub.](/images/user-guide/component/fastnoise/cell-distance-sub.png) |
| Distance2Mul | Returns the distances of the two closest feature points multiplied together. | ![Example of cellular noise which returns Distance2Mul.](/images/user-guide/component/fastnoise/cell-distance-mul.png) |
| Distance2Div | Returns the distance of the closest feature point divided by the distance of the second-closest feature point. | ![Example of cellular noise which returns Distance2Div.](/images/user-guide/component/fastnoise/cell-distance-div.png) |

### Interpolation functions

| Name | Function | Example output |
|---|---|---|
| Linear | `(b - a)` | ![Example of noise filtered through linear interpolation.](/images/user-guide/component/fastnoise/linear-interp.png) |
| Hermite | `3*(b-a)^2 - 2*(b-a)^3` | ![Example of noise filtered through hermite interpolation.](/images/user-guide/component/fastnoise/hermite-interp.png) |
| Quintic | `6*(b - a)^5 - 15*(b - a)^4 + 10*(b-a)^3` | ![Example of noise filtered through quintic interpolation.](/images/user-guide/component/fastnoise/quintic-interp.png) |

### Fractal types

| Name | Description | Example |
| --- | --- | --- |
| FBM (Fractional Brownian Motion) | Multiple frequencies and amplitudes of the noise signal are added together. | ![Example of applying an FBM fractal.](/images/user-guide/component/fastnoise/fractal-fbm.png) |
| Billow   | The absolute value of multiple frequences and amplitudes of the noise signal are added together, producing extreme dips in the signal values. | ![Example of applying a Billow fractal.](/images/user-guide/component/fastnoise/fractal-billow.png) |
| Rigid Multi | The inverse of the absolute value of multiple frequencies and values of the noise signal are subtracted from each other, producing extreme elevations in the signal values. | ![Example of applying a rigid multi fractal.](/images/user-guide/component/fastnoise/fractal-rigid.png) |


## EBus interfaces

The FastNoise Gradient component uses the `FastNoiseGradientRequestBus` and `GradientSignalGradientRequestBus` interfaces.

### FastNoiseGradientRequestBus interface

| Request Name | Description | Parameters | Return | Scriptable |
| --- | --- | --- | --- | --- |  
| GetRandomSeed | Get the random seed | | Int | Yes |
| SetRandomSeed | Set the random seed | Int | None | Yes |
| GetFrequency | Get the noise frequency | | Float | Yes |
| SetFrequency | Set the noise frequency | Float | None | Yes |
| GetInterpolation | Get the interpolation type | | FastNoise::Interp | Yes |
| SetInterpolation | Set the interpolation type | FastNoise::Interp | None | Yes |
| GetNoiseType | Get the noise type | | FastNoise::NoiseType | Yes |
| SetNoiseType | Set the noise type | FastNoise::NoiseType | None | Yes |
| GetOctaves | Get the number of octaves | | Int | Yes |
| SetOctaves | Set the number of octaves | Int | | Yes |
| GetLacunarity | Get the lacunarity value to use | | Float | Yes |
| SetLacunarity | Set the lacunarity value to use | Float | | Yes |
| GetGain | Get the gain | | Float | Yes |
| SetGain | Set the gain | Float | None | Yes |
| GetFractalType | Get the fractal type | None | FastNoise::FractalType | Yes |
| SetFractalType | Set the fractal type | FastNoise::FractalType | None | Yes |
