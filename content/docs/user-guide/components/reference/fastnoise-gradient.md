---
linkTitle: FastNoise Gradient
title: Open 3D Engine FastNoise Gem Fast Noise Component Reference
description: Full reference for the pseudo-random noise generation component of the Open 3D Engine FastNoise Gem.
---

|     |     |
| --- | --- |
| Dynamic Vegetation | FastNoiseGradient Gem \|** FastNoise Gradient**<br>=================================================================== |     |
| Component Card Preview<br>---------------------- | Component Description<br>--------------------- |
| ![](/download/attachments/58203634/image2019-5-2_16-11-23.png?version=1&modificationDate=1556831483976&api=v2) | ### **Main Use Cases**<br><br>Use the **FastNoise Gradient** Component to define a gradient signal that provides pseudo-random noise values across the world. The FastNoise Gradient uses the third-party open source [FastNoise](https://github.com/Auburns/FastNoise) library for noise generation and creates an output Gradient signal that can be used with other Gradient, Surface, and Vegetation components.<br><br>### Platforms<br><br>All platforms support this feature. However, performance will vary based on platform capabilities. |

  

## Component Reference

### Basic Workflow Steps

To use the FastNoise Gradient:

*   Create and select an entity in your level.
*   Open the Entity Inspector and use the **Add Component** button.
*   Select 'FastNoise Gradient' from the list.

**FastNoise Gradient** requires a component that implements the [**Shape** API](/docs/user-guide/components/reference/shape/) and a component that implements the **Gradient Transform Modifier** API.

## Component Interface (Entity Inspector)

The following table outlines the group ordering and parameters pertaining to the component interface of the FastNoise Gradient component, as viewed in the Entity Inspector.

| Group Name | Parameter Name | Description | Type | Default | Min ... Max |
|------------|----------------|-------------|------|---------|-----------|
| | Generate Random Seed | Sets the value of 'Random Seed' to a pseudorandom number. | | | |
| Preview settings |  | | | | |
| | Noise Type | The type of pseudo-random noise algorithm to use. See [Available Noise Generators](#available-noise-generators) for the complete list and example images. | NoiseType | Perlin | N/A |
| | Random Seed | Defines the random seed used to initialize the noise algorithm. | Int | 1 | 1 ... 2147483647 |
| |
Frequency

(all noise types except White Noise)

Scale multiplier to use with coordinates. Smaller values "zoom in", and larger values "zoom out".

![](/download/attachments/58203634/8ednssklf2.gif?version=1&modificationDate=1556838481628&api=v2)

  

  
  
  
Octaves

(Fractal noise types only)

The number of recursions in the pattern generation. Higher numbers cause finer details; octaves higher than 4 can be nearly imperceptible.

![](/download/attachments/58203634/hqXfeB21Cl.gif?version=1&modificationDate=1556838731610&api=v2)

  
  
  
Lacunarity

(Fractal noise types only)  
The frequency multiplier to use for each successive octave. Smaller values "zoom in", and larger values "zoom out".

![](/download/attachments/58203634/TmCxMRA3ca.gif?version=1&modificationDate=1556839029500&api=v2)

  
  
  
Gain

(Fractal noise types only)

The blend multiplier to use for each successive octave. Smaller values blend towards the lower octaves, and higher values blend towards the higher octaves.

![](/download/attachments/58203634/4yHEvcDeGS.gif?version=1&modificationDate=1556839252994&api=v2)

  
  
  
Distance Function

(Cellular noise only)

The distance function to use to calculate which cell value to use for a given point in the world. This effectively determines what method of cellular shape distortion to apply.

|     |     |     |
| --- | --- | --- |
| ![](/download/thumbnails/58203634/image2019-5-2_18-23-35.png?version=1&modificationDate=1556839415784&api=v2)<br><br>Euclidean | ![](/download/thumbnails/58203634/image2019-5-2_18-24-10.png?version=1&modificationDate=1556839450756&api=v2)<br><br>Manhattan | ![](/download/thumbnails/58203634/image2019-5-2_18-24-38.png?version=1&modificationDate=1556839479004&api=v2)<br><br>Natural |
### Available Noise Generators

| Noise Type | Description | Example |
| --- | --- | --- |
| Value | Interpolated values are generated directly from XYZ coordinates, effectively producing a zoomed-out version of "White Noise". | ![Sample image of value noise.](/images/user-guide/components/reference/fastnoise/value-example.png) |
| Value Fractal | Results from the Value algorithm are run through a fractal function. | ![](/download/thumbnails/58203634/image2019-5-2_17-40-24.png?version=1&modificationDate=1556836824500&api=v2) |
| Perlin | Values are generated from the Perlin noise algorithm, which is a noise algorithm designed to have visual features that are all of similar size. | ![](/download/thumbnails/58203634/image2019-5-2_17-42-21.png?version=1&modificationDate=1556836941373&api=v2) |
| Perlin Fractal | Results from the Perlin noise algorithm are then run through a fractal function. | ![](/download/thumbnails/58203634/image2019-5-2_17-42-59.png?version=1&modificationDate=1556836980029&api=v2) |
| Simplex | Values are generated from the Simplex noise algorithm, which is a variation of Perlin noise designed to have less directional artifacts. | ![](/download/thumbnails/58203634/image2019-5-2_17-43-45.png?version=1&modificationDate=1556837025299&api=v2) |
| Simplex Fractal | Results from the Simplex noise algorithm are then run through a fractal function. | ![](/download/thumbnails/58203634/image2019-5-2_17-47-56.png?version=1&modificationDate=1556837277284&api=v2) |
| Cellular | Values are generated from a cellular noise algorithm, in which values are assigned based on "feature points" that have been randomly distributed; each world position is assigned the value of the closest feature point. | ![](/download/thumbnails/58203634/image2019-5-2_17-51-17.png?version=1&modificationDate=1556837477403&api=v2) |
| White Noise | Pseudo-random values are generated from the XYZ coordinates, producing extremely different values for adjacent samples. | ![](/download/thumbnails/58203634/image2019-5-2_17-53-2.png?version=1&modificationDate=1556837582597&api=v2) |
| Cubic | Values are generated directly from XYZ coordinates and run through cubic interpolation with neighboring values. This is effectively a zoomed-out version of "White Noise" run through cubic interpolation. The results are similar to Perlin noise, but with less directional artifacts and with a higher occurrence of extreme values. | ![](/download/thumbnails/58203634/image2019-5-2_17-54-28.png?version=1&modificationDate=1556837668808&api=v2) |
| Cubic Fractal | Results from the Cubic noise algorithm are then run through a fractal function. | ![](/download/thumbnails/58203634/image2019-5-2_17-55-4.png?version=1&modificationDate=1556837704199&api=v2) |

  


  
  
  
Return Type

(Cellular noise only)

Determines which cellular noise calculation result to use for the gradient signal.

| Return Type | Description | Example |
| --- | --- | --- |
| CellValue | Returns the value of the nearest "feature point" at any given world position. | ![](/download/thumbnails/58203634/image2019-5-2_18-28-4.png?version=1&modificationDate=1556839684371&api=v2) |
| Distance | Returns the distance to the nearest "feature point" at any given world position. | ![](/download/thumbnails/58203634/image2019-5-2_18-28-34.png?version=1&modificationDate=1556839714087&api=v2) |
| Distance2 | Returns the distance to the second-nearest "feature point" at any given world position. | ![](/download/thumbnails/58203634/image2019-5-2_18-28-58.png?version=1&modificationDate=1556839738473&api=v2) |
| Distance2Add | Returns the distances of the two closest feature points added together. | ![](/download/thumbnails/58203634/image2019-5-2_18-29-29.png?version=1&modificationDate=1556839769659&api=v2) |
| Distance2Sub | Returns the distances of the two closest feature points subtracted from each other. | ![](/download/thumbnails/58203634/image2019-5-2_18-29-49.png?version=1&modificationDate=1556839789304&api=v2) |
| Distance2Mul | Returns the distances of the two closest feature points multiplied together. | ![](/download/thumbnails/58203634/image2019-5-2_18-30-9.png?version=1&modificationDate=1556839809206&api=v2) |
| Distance2Div | Returns the distance of the closest feature point divided by the distance of the second-closest feature point. | ![](/download/thumbnails/58203634/image2019-5-2_18-30-37.png?version=1&modificationDate=1556839837858&api=v2) |

  
  
  
Jitter

(Cellular noise only)

The scale factor to apply to the location of the "feature points" to adjust the overall shape of the results. Values between 0.0 - 1.0 will generally provide the best results. A value of 0.0 provides no jitter, and values above 1.0 can produce artifacts from clamped multiplications that may or may not be desirable.

![](/download/attachments/58203634/iOiVtkuXSW.gif?version=1&modificationDate=1557161750275&api=v2)

  
  
Advanced Settings  
  
  
  
  
Interpolation

(Value, Value Fractal, Perlin, and Perlin Fractal noise only)

The type of interpolation to apply to calculated noise values. Linear interpolation provides angular artifacts, Hermite provides smooth blurred values, and Quintic provides more defined edges than Hermite without the angular artifacts of Linear.

|     |     |     |
| --- | --- | --- |
| ![](/download/thumbnails/58203634/image2019-5-6_11-58-27.png?version=1&modificationDate=1557161907711&api=v2)<br><br>Linear<br><br>(b - a) | ![](/download/thumbnails/58203634/image2019-5-6_11-58-48.png?version=1&modificationDate=1557161928606&api=v2)<br><br>Hermite<br><br>3\*(b-a)^2 - 2\*(b-a)^3 | ![](/download/thumbnails/58203634/image2019-5-6_11-59-10.png?version=1&modificationDate=1557161950083&api=v2)<br><br>Quintic<br><br>6\*(b - a)^5 - 15\*(b - a)^4 + 10\*(b-a)^3 |

  
  
  
Fractal Type

(Fractal noise types only)

The type of fractal calculation to apply to calculated noise values.

|     |     |     |
| --- | --- | --- |
| ![](/download/thumbnails/58203634/image2019-5-6_12-15-1.png?version=1&modificationDate=1557162901977&api=v2)<br><br>FBM (Fractional Brownian Motion)<br><br>Multiple frequencies and amplitudes of the noise signal are added together. | ![](/download/thumbnails/58203634/image2019-5-6_12-15-50.png?version=1&modificationDate=1557162950250&api=v2)<br><br>Billow<br><br>A variant of FBM. The absolute value of multiple frequences and amplitudes of the noise signal are added together, producing extreme dips in the signal values. | ![](/download/thumbnails/58203634/image2019-5-6_12-16-20.png?version=1&modificationDate=1557162980096&api=v2)<br><br>Rigid Multi<br><br>A variant of FBM. The inverse of the absolute value of multiple frequencies and values of the noise signal are subtracted from each other, producing extreme elevations in the signal values. |

  
  

**Additional Information**
--------------------------

### General Information

**Gradient Transform Modifier:**

When using the "None (unbounded)" wrapping type, the FastNoise Gradient will produce a non-repeating noise signal across the entire world.

**Dynamic Vegetation:**

To use this with Dynamic Vegetation, follow these steps:

  

### **Related Requirements and **Dependencies

#### Prerequisites

To use the **FastNoise Gradient **with Dynamic Vegetation for your Game Project, you will also need to enable the **Vegetation Gem**.

1.  Use the **Project Configurator** to find and enable the **Vegetation Gem** for your project:
    1.  [http://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-using-project-configurator.html](http://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-using-project-configurator.html)
2.  Once this gem is enabled, you will need to rebuild your project:
    1.  [http://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-rebuild-project-with-lmbr-command-line.html](http://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-rebuild-project-with-lmbr-command-line.html)

![](/download/attachments/58203634/image2019-5-6_13-35-58.png?version=1&modificationDate=1557167759882&api=v2)

Create an Entity with a FastNoise Gradient as documented above.

  

![](/download/attachments/58203634/image2019-5-6_13-36-42.png?version=1&modificationDate=1557167802584&api=v2)

Create a second Entity with the following:

*   Vegetation Layer Spawner
    *   The default settings are sufficient to get started.
*   Box Shape
    *   Make the box (16.0 m, 16.0 m, 1.0 m) in size.
*   Vegetation Asset List
    *   Add two assets. This example uses "am\_grass\_flower\_purple\_group" and "am\_grass\_01\_plain\_group" from StarterGame.
*   Vegetation Asset Weight Selector
    *   *   For the "Gradient Entity Id", select the FastNoise entity created above.

  

![](/download/attachments/58203634/image2019-5-6_13-37-17.png?version=1&modificationDate=1557167838190&api=v2)

At this point, the scene should look like the following. The dynamic vegetation system is selecting between flowers and grass based on the Vegetation Asset Weight Selector. For each location, the Asset Weight Selector is querying the value of the FastNoise Gradient. If the value falls within the range 0.0 - 0.5, it will place the flower asset. If the value falls within 0.5 - 1.0, it will place the grass asset.

As you can see from the preview, the large darker areas in the gradient correspond to the flower areas, and the large brighter areas correspond to the grassy areas.

  

![](/download/attachments/58203634/q5dxAxb2A2.gif?version=1&modificationDate=1557168143907&api=v2)

To tune the gradient, select the FastNoise Gradient and set the "Pin Preview to Shape" option in Preview Settings to the vegetation entity created above. This aligns the preview with the vegetation area. Try adjusting the frequency, octaves, lacunarity, and gain to get the desired look of the distribution.

  

  

FastNoise can be used to drive any aspect of the vegetation system.  Some of the more common uses:

*   Perlin Noise works well with the Vegetation Asset Weight Selector for creating patches of different types of vegetation.
*   Perlin Noise mixed with White Noise and/or modified by the Dither Gradient Modifier works well with the Vegetation Distribution Filter.
*   White Noise works well with the Vegetation Modifiers (Position / Rotation / Scale) to make each piece of vegetation look unique.
*   Cellular Noise can produce interesting effects with mixed with the Gradient Surface Tag Emitter

  

**Known Issues:**

*   Different choices of noise algorithms and settings can have different performance characteristics.

### Related CVARs

N/A 

### Sys\_Spec

N/A

**EBus Request Bus Interface**
------------------------------

FastNoise Gradient Request Bus Interface
========================================

The FastNoise Gradient component uses both the FastNoiseGradientRequestBus EBus interface and the [GradientSignal::GradientRequestBus](https://wiki.agscollab.com/display/lmbr/LW+%7C+EC+%7C+DV+%7C+TD+%7C+Gradient+Signal+Gem+-+Tech+Doc#LW|EC|DV|TD|GradientSignalGem-TechDoc-GradientRequestBusInterface).

For more information, see [Working with the Event Bus (EBus) System](https://docs.aws.amazon.com/lumberyard/latest/userguide/ebus-intro.html).

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Request Name | Description | Parameters | Return | Scriptable |
| **FastNoiseGradientRequestBus** |     |     |     |     |
| GetRandomSeed | Get the random seed | None | Int | Yes |
| SetRandomSeed | Set the random seed | Int | None | Yes |
| GetFrequency | Get the noise frequency | None | Float | Yes |
| SetFrequency | Set the noise frequency | Float | None | Yes |
| GetInterpolation | Get the interpolation type | None | FastNoise::Interp | Yes |
| SetInterpolation | Set the interpolation type | FastNoise::Interp | None | Yes |
| GetNoiseType | Get the noise type | None | FastNoise::NoiseType | Yes |
| SetNoiseType | Set the noise type | FastNoise::NoiseType | None | Yes |
| GetOctaves | Get the number of octaves | None | Int | Yes |
| SetOctaves | Set the number of octaves | Int | None | Yes |
| GetLacunarity | Get the lacunarity value to use | None | Float | Yes |
| SetLacunarity | Set the lacunarity value to use | Float | None | Yes |
| GetGain | Get the gain | None | Float | Yes |
| SetGain | Set the gain | Float | None | Yes |
| GetFractalType | Get the fractal type | None | FastNoise::FractalType | Yes |
| SetFractalType | Set the fractal type | FastNoise::FractalType | None | Yes |