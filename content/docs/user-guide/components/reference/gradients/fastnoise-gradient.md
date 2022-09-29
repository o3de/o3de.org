---
linktitle: FastNoise Gradient
title: FastNoise Gradient Component
description: Use the FastNoise Gradient component to generate a gradient with the FastNoise noise generation library in Open 3D Engine (O3DE).
---

Add the **FastNoise Gradient** component to use one of the noise generation algorithms from the [FastNoise](https://github.com/Auburn/FastNoiseLite) library to generate a gradient.  The noise generation algorithm is set in the component's **Noise Type** property.

## Provider

[Fast Noise Gem](/docs/user-guide/gems/reference/utility/fast-noise)

## Dependencies ##

- [Gradient Transform Modifier](/docs/user-guide/components/reference/gradient-modifiers/gradient-transform-modifier)
- One of the following [Shape](./../shape/) components: [Axis Aligned Box](./../shape/axis-aligned-box-shape), [Box](./../shape/box-shape), [Capsule](./../shape/capsule-shape), [Compound](./../shape/compound-shape), [Cylinder](./../shape/cylinder-shape), [Disk](./../shape/disk-shape), [Polygon Prism](./../shape/polygon-prism-shape), [Quad](./../shape/quad-shape), [Shape Reference](./../shape/shape-reference), [Sphere](./../shape/sphere-shape), or [Tube](./../shape/tube-shape),  to define the **Gradient Transform Modifier's** area.

## Noise types

| Noise Type | Description | Example Gradient |
| - | - | - |
| `Value` | Generates a `White Noise` gradient  based on interpolated values from XYZ-coordinates. | ![FastNoise value noise type example](/images/user-guide/components/reference/gradients/fastnoise-value.png) |
| `Value Fractal` | Results from the `Value` algorithm are run through a fractal function. | ![FastNoise value fractal noise type example](/images/user-guide/components/reference/gradients/fastnoise-value-fractal.png) |
| `Perlin` | Generates values from the Perlin noise algorithm, a noise algorithm where visual features are all of similar size. | ![FastNoise Perlin noise type example](/images/user-guide/components/reference/gradients/fastnoise-perlin.png) |
| `Perlin Fractal` | Results from the `Perlin` noise algorithm are run through a fractal function. | ![FastNoise Perlin fractal noise type example](/images/user-guide/components/reference/gradients/fastnoise-perlin-fractal.png) |
| `Simplex` | Generates values from the Simplex noise algorithm, a variation of Perlin noise with fewer directional artifacts. | ![FastNoise simplex noise type example](/images/user-guide/components/reference/gradients/fastnoise-simplex.png) |
| `Simplex Fractal` | Results from the `Simplex` noise algorithm are run through a fractal function. | ![FastNoise simplex fractal noise type example](/images/user-guide/components/reference/gradients/fastnoise-simplex-fractal.png) |
| `Cellular` | Generates values from a cellular noise algorithm, which assigns values based on randomly distributed _feature points_; each world position is assigned the value of the closest feature point. | ![FastNoise cellular noise type example](/images/user-guide/components/reference/gradients/fastnoise-cellular.png) |
| `White Noise` |	Generates values from XYZ-coordinates, which produce extremely different values for adjacent samples. | ![FastNoise white noise noise type example](/images/user-guide/components/reference/gradients/fastnoise-white-noise.png) |
| `Cubic` | Generates values directly from XYZ-coordinates that are then run through cubic interpolation with neighboring values. The results are similar to `Perlin` noise, but with fewer directional artifacts and with a higher occurrence of extreme values. | ![FastNoise cubic noise type example](/images/user-guide/components/reference/gradients/fastnoise-cubic.png) |
| `Cubic Fractal` | Results from the `Cubic` noise algorithm are run through a fractal function. | ![FastNoise cubic fractal noise type example](/images/user-guide/components/reference/gradients/fastnoise-cubic-fractal.png) |

{{< note >}}
Not all combinations of **Noise Type** and noise property settings have the same performance characteristics.
{{< /note >}}

## FastNoise Gradient properties

{{< tabs name="fastnoise-gradient-component-ui" >}}
{{% tab name="Value" %}}

![FastNoise value gradient properties](/images/user-guide/components/reference/gradients/fastnoise-gradient-component-value.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview** | Displays the output gradient of this component after all properties are applied. Click the previewer icon in the top of the preview image to show a larger preview of the gradient in a dockable window. | | |
| **Pin Preview to Shape** | Sets an entity with a compatible Shape component to use as the bounds of the preview if **Constrain to Shape** is `Enabled`. | EntityId | Current Entity |
| **Preview Position** | Sets the world location of the preview.<br> <br>*This field is available only if there is no entity selected in **Pin Preview to Shape**.* | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Preview Size** | Sets the dimensions of the preview. | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Constrain to Shape** | If `Enabled`, the gradient preview uses the bounds of the entity selected in **Pin Preview to Shape**.<br> <br>*This field is available only if an entity is selected in **Pin Preview to Shape**.* | Boolean | `Disabled` |
| **Noise Type** | Sets the noise generation algorithm used to generate the gradient. | `Value`, `Value Fractal`, `Perlin`, `Perlin Fractal`, `Simplex`, `Simplex Fractal`, `Cellular`, `White Noise`, `Cubic`, or `Cubic Fractal` | `Perlin Fractal` |
| **Random Seed** | Sets the initialization value for the pseudorandom noise generation algorithm. Each value generates a different pattern of noise. | Integer: 1 to Infinity | `1` |
| **Frequency** | Sets the frequency of the generated noise. Smaller values result in noise that is dilated and larger values result in noise that is condensed.  | Float: 0.0001 - Infinity | `1.0` |
| **FastNoise Advanced Settings - Interpolation** | Sets the function used to smooth between gradient values. Refer to the following section for [Interpolation type descriptions and examples](#value-interpolation-type-examples). | `Linear`, `Hermite`, or `Quintic` | `Quintic` |
| **Generate Random Seed** | Sets the **Random Seed** property to a random value. | | |

### Value Interpolation type examples

| Interpolation Type | Description | Example Gradient |
|-|-|-|
| `Linear` | `Linear` interpolation produces angular artifacts. | ![Linear interpolation example gradient](/images/user-guide/components/reference/gradients/interpolation-linear.png) |
| `Hermite` | `Hermite` interpolation produces smooth blurred values. | ![Hermite interpolation example gradient](/images/user-guide/components/reference/gradients/interpolation-hermite.png) |
| `Quintic` | `Quintic` interpolation produces more defined edges than `Hermite` without the angular artifacts of `Linear`. | ![Quintic interpolation example gradient](/images/user-guide/components/reference/gradients/interpolation-quintic.png) |

{{% /tab %}}
{{% tab name="Value Fractal" %}}

![FastNoise value fractal gradient properties](/images/user-guide/components/reference/gradients/fastnoise-gradient-component-value-fractal.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview** | Displays the output gradient of this component after all properties are applied. Click the previewer icon in the top of the preview image to show a larger preview of the gradient in a dockable window. | | |
| **Pin Preview to Shape** | Sets an entity with a compatible Shape component to use as the bounds of the preview if **Constrain to Shape** is `Enabled`. | EntityId | Current Entity |
| **Preview Position** | Sets the world location of the preview.<br> <br>*This field is available only if there is no entity selected in **Pin Preview to Shape**.* | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Preview Size** | Sets the dimensions of the preview. | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Constrain to Shape** | If `Enabled`, the gradient preview uses the bounds of the entity selected in **Pin Preview to Shape**.<br> <br>*This field is available only if an entity is selected in **Pin Preview to Shape**.* | Boolean | `Disabled` |
| **Noise Type** | Sets the noise generation algorithm used to generate the gradient. | `Value`, `Value Fractal`, `Perlin`, `Perlin Fractal`, `Simplex`, `Simplex Fractal`, `Cellular`, `White Noise`, `Cubic`, or `Cubic Fractal` | `Perlin Fractal` |
| **Random Seed** | Sets the initialization value for the pseudorandom noise generation algorithm. Each value generates a different pattern of noise. | Integer: 1 to Infinity | `1` |
| **Frequency** | Sets the frequency of the generated noise. Smaller values result in noise that is dilated and larger values result in noise that is condensed.  | Float: 0.0001 - Infinity | `1.0` |
| **Octaves** | Sets the number of recursions of pattern generation. Higher values produce finer details. Values higher than `4` may not be perceptible. | Integer: 0 - 8 | `4` |
| **Lacunarity** | Sets a frequency multiplier to apply to successive **Octaves**. | Float 0.0 to Infinity | `2.0` |
| **Gain** | Sets a relative strength multiplier to apply to successive **Octaves**. | Float: 0.0 to Infinity | `0.5` |
| **FastNoise Advanced Settings - Interpolation** | Sets the function used to smooth between gradient values. Refer to the following section for [Interpolation type descriptions and examples](#value-fractal-interpolation-type-examples). | `Linear`, `Hermite`, or `Quintic` | `Quintic` |
| **FastNoise Advanced Settings - Fractal Type** | Sets the method of fractal combination. Refer to the following section for [Fractal Type descriptions and examples](#value-fractal-type-examples).| `FBM`, `Billow`, or  `Rigid Multi` | `FBM` |
| **Generate Random Seed** | Sets the **Random Seed** property to a random value. | | |

### Value Fractal Interpolation type examples

| Interpolation Type | Description | Example Gradient |
|-|-|-|
| `Linear` | `Linear` interpolation produces angular artifacts. | ![Linear interpolation example gradient](/images/user-guide/components/reference/gradients/interpolation-linear.png) |
| `Hermite` | `Hermite` interpolation produces smooth blurred values. | ![Hermite interpolation example gradient](/images/user-guide/components/reference/gradients/interpolation-hermite.png) |
| `Quintic` | `Quintic` interpolation produces more defined edges than `Hermite` without the angular artifacts of `Linear`. | ![Quintic interpolation example gradient](/images/user-guide/components/reference/gradients/interpolation-quintic.png) |

### Value Fractal Type examples

| Fractal Type | Description | Example Gradient |
|-|-|-|
| `FBM` | `FBM` or _fractional Brownian motion_ adds multiple frequencies and amplitudes of the noise signal together. | ![FBM fractal type example gradient](/images/user-guide/components/reference/gradients/fractal-type-fbm.png) |
| `Billow` | A variant of `FBM`. `Billow` adds the absolute value of multiple frequencies and amplitudes of the noise signal together. This produces extreme lows in the gradient's values. | ![Billow fractal type example gradient](/images/user-guide/components/reference/gradients/fractal-type-billow.png) |
| `Rigid Multi` | A variant of `FBM`. `Rigid Multi` subtracts the inverse of the absolute value of multiple frequencies and amplitudes of the noise signal from each other. This produces extreme highs in the gradient's values. | ![Rigid Multi fractal type example gradient](/images/user-guide/components/reference/gradients/fractal-type-rigid-multi.png) |
{{% /tab %}}
{{% tab name="Perlin" %}}

![FastNoise perlin gradient properties](/images/user-guide/components/reference/gradients/fastnoise-gradient-component-perlin.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview** | Displays the output gradient of this component after all properties are applied. Click the previewer icon in the top of the preview image to show a larger preview of the gradient in a dockable window. | | |
| **Pin Preview to Shape** | Sets an entity with a compatible Shape component to use as the bounds of the preview if **Constrain to Shape** is `Enabled`. | EntityId | Current Entity |
| **Preview Position** | Sets the world location of the preview.<br> <br>*This field is available only if there is no entity selected in **Pin Preview to Shape**.* | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Preview Size** | Sets the dimensions of the preview. | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Constrain to Shape** | If `Enabled`, the gradient preview uses the bounds of the entity selected in **Pin Preview to Shape**.<br> <br>*This field is available only if an entity is selected in **Pin Preview to Shape**.* | Boolean | `Disabled` |
| **Noise Type** | Sets the noise generation algorithm used to generate the gradient. | `Value`, `Value Fractal`, `Perlin`, `Perlin Fractal`, `Simplex`, `Simplex Fractal`, `Cellular`, `White Noise`, `Cubic`, or `Cubic Fractal` | `Perlin Fractal` |
| **Random Seed** | Sets the initialization value for the pseudorandom noise generation algorithm. Each value generates a different pattern of noise. | Integer: 1 to Infinity | `1` |
| **Frequency** | Sets the frequency of the generated noise. Smaller values result in noise that is dilated and larger values result in noise that is condensed.  | Float: 0.0001 - Infinity | `1.0` |
| **FastNoise Advanced Settings - Interpolation** | Sets the function used to smooth between gradient values. Refer to the following section for [Interpolation type descriptions and examples](#perlin-interpolation-type-examples). | `Linear`, `Hermite`, or `Quintic` | `Quintic` |
| **Generate Random Seed** | Sets the **Random Seed** property to a random value. | | |

### Perlin Interpolation type examples

| Interpolation Type | Description | Example Gradient |
|-|-|-|
| `Linear` | `Linear` interpolation produces angular artifacts. | ![Linear interpolation example gradient](/images/user-guide/components/reference/gradients/interpolation-linear.png) |
| `Hermite` | `Hermite` interpolation produces smooth blurred values. | ![Hermite interpolation example gradient](/images/user-guide/components/reference/gradients/interpolation-hermite.png) |
| `Quintic` | `Quintic` interpolation produces more defined edges than `Hermite` without the angular artifacts of `Linear`. | ![Quintic interpolation example gradient](/images/user-guide/components/reference/gradients/interpolation-quintic.png) |

{{% /tab %}}
{{% tab name="Perlin Fractal" %}}

![FastNoise perlin fractal gradient properties](/images/user-guide/components/reference/gradients/fastnoise-gradient-component-perlin-fractal.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview** | Displays the output gradient of this component after all properties are applied. Click the previewer icon in the top of the preview image to show a larger preview of the gradient in a dockable window. | | |
| **Pin Preview to Shape** | Sets an entity with a compatible Shape component to use as the bounds of the preview if **Constrain to Shape** is `Enabled`. | EntityId | Current Entity |
| **Preview Position** | Sets the world location of the preview.<br> <br>*This field is available only if there is no entity selected in **Pin Preview to Shape**.* | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Preview Size** | Sets the dimensions of the preview. | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Constrain to Shape** | If `Enabled`, the gradient preview uses the bounds of the entity selected in **Pin Preview to Shape**.<br> <br>*This field is available only if an entity is selected in **Pin Preview to Shape**.* | Boolean | `Disabled` |
| **Noise Type** | Sets the noise generation algorithm used to generate the gradient. | `Value`, `Value Fractal`, `Perlin`, `Perlin Fractal`, `Simplex`, `Simplex Fractal`, `Cellular`, `White Noise`, `Cubic`, or `Cubic Fractal` | `Perlin Fractal` |
| **Random Seed** | Sets the initialization value for the pseudorandom noise generation algorithm. Each value generates a different pattern of noise. | Integer: 1 to Infinity | `1` |
| **Frequency** | Sets the frequency of the generated noise. Smaller values result in noise that is dilated and larger values result in noise that is condensed.  | Float: 0.0001 - Infinity | `1.0` |
| **Octaves** | Sets the number of recursions of pattern generation. Higher values produce finer details. Values higher than `4` may not be perceptible. | Integer: 0 - 8 | `4` |
| **Lacunarity** | Sets a frequency multiplier to apply to successive **Octaves**. | Float 0.0 to Infinity | `2.0` |
| **Gain** | Sets a relative strength multiplier to apply to successive **Octaves**. | Float: 0.0 to Infinity | `0.5` |
| **FastNoise Advanced Settings - Interpolation** | Sets the function used to smooth between gradient values. Refer to the following section for [Interpolation type descriptions and examples](#perlin-fractal-interpolation-type-examples). | `Linear`, `Hermite`, or `Quintic` | `Quintic` |
| **FastNoise Advanced Settings - Fractal Type** | Sets the method of fractal combination. Refer to the following section for [Fractal Type descriptions and examples](#perlin-fractal-type-examples). | `FBM`, `Billow`, or  `Rigid Multi` | `FBM` |
| **Generate Random Seed** | Sets the **Random Seed** property to a random value. | | |

### Perlin Fractal Interpolation type examples

| Interpolation Type | Description | Example Gradient |
|-|-|-|
| `Linear` | `Linear` interpolation produces angular artifacts. | ![Linear interpolation example gradient](/images/user-guide/components/reference/gradients/interpolation-linear.png) |
| `Hermite` | `Hermite` interpolation produces smooth blurred values. | ![Hermite interpolation example gradient](/images/user-guide/components/reference/gradients/interpolation-hermite.png) |
| `Quintic` | `Quintic` interpolation produces more defined edges than `Hermite` without the angular artifacts of `Linear`. | ![Quintic interpolation example gradient](/images/user-guide/components/reference/gradients/interpolation-quintic.png) |

### Perlin Fractal Type examples

| Fractal Type | Description | Example Gradient |
|-|-|-|
| `FBM` | `FBM` or _fractional Brownian motion_ adds multiple frequencies and amplitudes of the noise signal together. | ![FBM fractal type example gradient](/images/user-guide/components/reference/gradients/fractal-type-fbm.png) |
| `Billow` | A variant of `FBM`. `Billow` adds the absolute value of multiple frequencies and amplitudes of the noise signal together. This produces extreme lows in the gradient's values. | ![Billow fractal type example gradient](/images/user-guide/components/reference/gradients/fractal-type-billow.png) |
| `Rigid Multi` | A variant of `FBM`. `Rigid Multi` subtracts the inverse of the absolute value of multiple frequencies and amplitudes of the noise signal from each other. This produces extreme highs in the gradient's values. | ![Rigid Multi fractal type example gradient](/images/user-guide/components/reference/gradients/fractal-type-rigid-multi.png) |

{{% /tab %}}
{{% tab name="Simplex" %}}

![FastNoise simplex gradient properties](/images/user-guide/components/reference/gradients/fastnoise-gradient-component-simplex.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview** | Displays the output gradient of this component after all properties are applied. Click the previewer icon in the top of the preview image to show a larger preview of the gradient in a dockable window. | | |
| **Pin Preview to Shape** | Sets an entity with a compatible Shape component to use as the bounds of the preview if **Constrain to Shape** is `Enabled`. | EntityId | Current Entity |
| **Preview Position** | Sets the world location of the preview.<br> <br>*This field is available only if there is no entity selected in **Pin Preview to Shape**.* | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Preview Size** | Sets the dimensions of the preview. | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Constrain to Shape** | If `Enabled`, the gradient preview uses the bounds of the entity selected in **Pin Preview to Shape**.<br> <br>*This field is available only if an entity is selected in **Pin Preview to Shape**.* | Boolean | `Disabled` |
| **Noise Type** | Sets the noise generation algorithm used to generate the gradient. | `Value`, `Value Fractal`, `Perlin`, `Perlin Fractal`, `Simplex`, `Simplex Fractal`, `Cellular`, `White Noise`, `Cubic`, or `Cubic Fractal` | `Perlin Fractal` |
| **Random Seed** | Sets the initialization value for the pseudorandom noise generation algorithm. Each value generates a different pattern of noise. | Integer: 1 to Infinity | `1` |
| **Frequency** | Sets the frequency of the generated noise. Smaller values result in noise that is dilated and larger values result in noise that is condensed.  | Float: 0.0001 - Infinity | `1.0` |
| **Generate Random Seed** | Sets the **Random Seed** property to a random value. | | |

{{% /tab %}}
{{% tab name="Simplex Fractal" %}}

![FastNoise simplex fractal gradient properties](/images/user-guide/components/reference/gradients/fastnoise-gradient-component-simplex-fractal.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview** | Displays the output gradient of this component after all properties are applied. Click the previewer icon in the top of the preview image to show a larger preview of the gradient in a dockable window. | | |
| **Pin Preview to Shape** | Sets an entity with a compatible Shape component to use as the bounds of the preview if **Constrain to Shape** is `Enabled`. | EntityId | Current Entity |
| **Preview Position** | Sets the world location of the preview.<br> <br>*This field is available only if there is no entity selected in **Pin Preview to Shape**.* | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Preview Size** | Sets the dimensions of the preview. | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Constrain to Shape** | If `Enabled`, the gradient preview uses the bounds of the entity selected in **Pin Preview to Shape**.<br> <br>*This field is available only if an entity is selected in **Pin Preview to Shape**.* | Boolean | `Disabled` |
| **Noise Type** | Sets the noise generation algorithm used to generate the gradient. | `Value`, `Value Fractal`, `Perlin`, `Perlin Fractal`, `Simplex`, `Simplex Fractal`, `Cellular`, `White Noise`, `Cubic`, or `Cubic Fractal` | `Perlin Fractal` |
| **Random Seed** | Sets the initialization value for the pseudorandom noise generation algorithm. Each value generates a different pattern of noise. | Integer: 1 to Infinity | `1` |
| **Frequency** | Sets the frequency of the generated noise. Smaller values result in noise that is dilated and larger values result in noise that is condensed.  | Float: 0.0001 - Infinity | `1.0` |
| **Octaves** | Sets the number of recursions of pattern generation. Higher values produce finer details. Values higher than `4` may not be perceptible. | Integer: 0 - 8 | `4` |
| **Lacunarity** | Sets a frequency multiplier to apply to successive **Octaves**. | Float 0.0 to Infinity | `2.0` |
| **Gain** | Sets a relative strength multiplier to apply to successive **Octaves**. | Float: 0.0 to Infinity | `0.5` |
| **FastNoise Advanced Settings - Fractal Type** | Sets the method of fractal combination. Refer to the following section for [Fractal Type descriptions and examples](#simplex-fractal-type-examples).| `FBM`, `Billow`, or  `Rigid Multi` | `FBM` |
| **Generate Random Seed** | Sets the **Random Seed** property to a random value. | | |

### Simplex Fractal Type examples

| Fractal Type | Description | Example Gradient |
|-|-|-|
| `FBM` | `FBM` or _fractional Brownian motion_ adds multiple frequencies and amplitudes of the noise signal together. | ![FBM fractal type example gradient](/images/user-guide/components/reference/gradients/fractal-type-fbm.png) |
| `Billow` | A variant of `FBM`. `Billow` adds the absolute value of multiple frequencies and amplitudes of the noise signal together. This produces extreme lows in the gradient's values. | ![Billow fractal type example gradient](/images/user-guide/components/reference/gradients/fractal-type-billow.png) |
| `Rigid Multi` | A variant of `FBM`. `Rigid Multi` subtracts the inverse of the absolute value of multiple frequencies and amplitudes of the noise signal from each other. This produces extreme highs in the gradient's values. | ![Rigid Multi fractal type example gradient](/images/user-guide/components/reference/gradients/fractal-type-rigid-multi.png) |

{{% /tab %}}
{{% tab name="Cellular" %}}

![FastNoise cellular gradient properties](/images/user-guide/components/reference/gradients/fastnoise-gradient-component-cellular.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview** | Displays the output gradient of this component after all properties are applied. Click the previewer icon in the top of the preview image to show a larger preview of the gradient in a dockable window. | | |
| **Pin Preview to Shape** | Sets an entity with a compatible Shape component to use as the bounds of the preview if **Constrain to Shape** is `Enabled`. | EntityId | Current Entity |
| **Preview Position** | Sets the world location of the preview.<br> <br>*This field is available only if there is no entity selected in **Pin Preview to Shape**.* | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Preview Size** | Sets the dimensions of the preview. | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Constrain to Shape** | If `Enabled`, the gradient preview uses the bounds of the entity selected in **Pin Preview to Shape**.<br> <br>*This field is available only if an entity is selected in **Pin Preview to Shape**.* | Boolean | `Disabled` |
| **Noise Type** | Sets the noise generation algorithm used to generate the gradient. | `Value`, `Value Fractal`, `Perlin`, `Perlin Fractal`, `Simplex`, `Simplex Fractal`, `Cellular`, `White Noise`, `Cubic`, or `Cubic Fractal` | `Perlin Fractal` |
| **Random Seed** | Sets the initialization value for the pseudorandom noise generation algorithm. Each value generates a different pattern of noise. | Integer: 1 to Infinity | `1` |
| **Frequency** | Sets the frequency of the generated noise. Smaller values result in noise that is dilated and larger values result in noise that is condensed.  | Float: 0.0001 - Infinity | `1.0` |
| **Distance Function** | Sets the distance function used to calculate the cell value for a given point. The distance functions produce different cell shapes. Refer to the following section for [Distance Function examples and descriptions](#distance-function-examples). | `Euclidean`, `Manhattan`, or `Natural` | `Euclidean` |
| **Return Type** | Sets the type of value that the cellular function returns. Refer to the following section for [Return Type examples](#return-type-examples). | `CellValue`, `Distance`, `Distance2`, `Distance2Add`, `Distance2Sub`, `Distance2Mul`, or `Distance2Div`  | `CellValue` |
| **Jitter** | Sets the maximum distance that a cellular point can move from its original position. Values above `1.0` may produce artifacts from clamped multiplications. | Float: 0.0 to Infinity | `0.45` |
| **Generate Random Seed** | Sets the **Random Seed** property to a random value. | | |

### Distance Function examples

| Distance Function | Example Gradient |
|-|-|
| `Euclidean` | ![Euclidean distance function example gradient](/images/user-guide/components/reference/gradients/distance-function-euclidean.png) |
| `Manhattan` | ![Manhattan distance function example gradient](/images/user-guide/components/reference/gradients/distance-function-manhattan.png) |
| `Natural` | ![Natural distance function example gradient](/images/user-guide/components/reference/gradients/distance-function-natural.png) |

### Return Type examples

| Return Type | Description | Example Gradient |
|-|-|-|
| `CellValue` | Returns the value of the nearest feature point at any given world position. | ![CellValue return type example gradient](/images/user-guide/components/reference/gradients/return-type-cellvalue.png) |
| `Distance` | 	Returns the distance to the nearest feature point at any given world position. | ![Distance return type example gradient](/images/user-guide/components/reference/gradients/return-type-distance.png) |
| `Distance2` | Returns the distance to the second-nearest feature point at any given world position. | ![Distance2 return type example gradient](/images/user-guide/components/reference/gradients/return-type-distance2.png) |
| `Distance2Add` | Returns the distances of the two closest feature points added together. | ![Distance2Add return type example gradient](/images/user-guide/components/reference/gradients/return-type-distance2add.png) |
| `Distance2Sub` | Returns the distances of the two closest feature points subtracted from each other. | ![Distance2Sub return type example gradient](/images/user-guide/components/reference/gradients/return-type-distance2sub.png) |
| `Distance2Mul` | Returns the distances of the two closest feature points multiplied together. | ![Distance2Mul return type example gradient](/images/user-guide/components/reference/gradients/return-type-distance2mul.png) |
| `Distance2Div` | Returns the distance of the closest feature point divided by the distance of the second-closest feature point. | ![Distance2Div return type example gradient](/images/user-guide/components/reference/gradients/return-type-distance2div.png) |

{{% /tab %}}
{{% tab name="White Noise" %}}

![FastNoise white noise gradient properties](/images/user-guide/components/reference/gradients/fastnoise-gradient-component-white-noise.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview** | Displays the output gradient of this component after all properties are applied. Click the previewer icon in the top of the preview image to show a larger preview of the gradient in a dockable window. | | |
| **Pin Preview to Shape** | Sets an entity with a compatible Shape component to use as the bounds of the preview if **Constrain to Shape** is `Enabled`. | EntityId | Current Entity |
| **Preview Position** | Sets the world location of the preview.<br> <br>*This field is available only if there is no entity selected in **Pin Preview to Shape**.* | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Preview Size** | Sets the dimensions of the preview. | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Constrain to Shape** | If `Enabled`, the gradient preview uses the bounds of the entity selected in **Pin Preview to Shape**.<br> <br>*This field is available only if an entity is selected in **Pin Preview to Shape**.* | Boolean | `Disabled` |
| **Noise Type** | Sets the noise generation algorithm used to generate the gradient. | `Value`, `Value Fractal`, `Perlin`, `Perlin Fractal`, `Simplex`, `Simplex Fractal`, `Cellular`, `White Noise`, `Cubic`, or `Cubic Fractal` | `Perlin Fractal` |
| **Random Seed** | Sets the initialization value for the pseudorandom noise generation algorithm. Each value generates a different pattern of noise. | Integer: 1 to Infinity | `1` |
| **Generate Random Seed** | Sets the **Random Seed** property to a random value. | | |

{{% /tab %}}
{{% tab name="Cubic" %}}

![FastNoise cubic gradient properties](/images/user-guide/components/reference/gradients/fastnoise-gradient-component-cubic.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview** | Displays the output gradient of this component after all properties are applied. Click the previewer icon in the top of the preview image to show a larger preview of the gradient in a dockable window. | | |
| **Pin Preview to Shape** | Sets an entity with a compatible Shape component to use as the bounds of the preview if **Constrain to Shape** is `Enabled`. | EntityId | Current Entity |
| **Preview Position** | Sets the world location of the preview.<br> <br>*This field is available only if there is no entity selected in **Pin Preview to Shape**.* | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Preview Size** | Sets the dimensions of the preview. | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Constrain to Shape** | If `Enabled`, the gradient preview uses the bounds of the entity selected in **Pin Preview to Shape**.<br> <br>*This field is available only if an entity is selected in **Pin Preview to Shape**.* | Boolean | `Disabled` |
| **Noise Type** | Sets the noise generation algorithm used to generate the gradient. | `Value`, `Value Fractal`, `Perlin`, `Perlin Fractal`, `Simplex`, `Simplex Fractal`, `Cellular`, `White Noise`, `Cubic`, or `Cubic Fractal` | `Perlin Fractal` |
| **Random Seed** | Sets the initialization value for the pseudorandom noise generation algorithm. Each value generates a different pattern of noise. | Integer: 1 to Infinity | `1` |
| **Frequency** | Sets the frequency of the generated noise. Smaller values result in noise that is dilated and larger values result in noise that is condensed.  | Float: 0.0001 - Infinity | `1.0` |
| **Generate Random Seed** | Sets the **Random Seed** property to a random value. | | |

{{% /tab %}}
{{% tab name="Cubic Fractal" %}}

![FastNoise cubic fractal gradient properties](/images/user-guide/components/reference/gradients/fastnoise-gradient-component-cubic-fractal.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview** | Displays the output gradient of this component after all properties are applied. Click the previewer icon in the top of the preview image to show a larger preview of the gradient in a dockable window. | | |
| **Pin Preview to Shape** | Sets an entity with a compatible Shape component to use as the bounds of the preview if **Constrain to Shape** is `Enabled`. | EntityId | Current Entity |
| **Preview Position** | Sets the world location of the preview.<br> <br>*This field is available only if there is no entity selected in **Pin Preview to Shape**.* | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Preview Size** | Sets the dimensions of the preview. | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Constrain to Shape** | If `Enabled`, the gradient preview uses the bounds of the entity selected in **Pin Preview to Shape**.<br> <br>*This field is available only if an entity is selected in **Pin Preview to Shape**.* | Boolean | `Disabled` |
| **Noise Type** | Sets the noise generation algorithm used to generate the gradient. | `Value`, `Value Fractal`, `Perlin`, `Perlin Fractal`, `Simplex`, `Simplex Fractal`, `Cellular`, `White Noise`, `Cubic`, or `Cubic Fractal` | `Perlin Fractal` |
| **Random Seed** | Sets the initialization value for the pseudorandom noise generation algorithm. Each value generates a different pattern of noise. | Integer: 1 to Infinity | `1` |
| **Frequency** | Sets the frequency of the generated noise. Smaller values result in noise that is dilated and larger values result in noise that is condensed.  | Float: 0.0001 - Infinity | `1.0` |
| **Octaves** | Sets the number of recursions of pattern generation. Higher values produce finer details. Values higher than `4` may not be perceptible. | Integer: 0 - 8 | `4` |
| **Lacunarity** | Sets a frequency multiplier to apply to successive **Octaves**. | Float 0.0 to Infinity | `2.0` |
| **Gain** | Sets a relative strength multiplier to apply to successive **Octaves**. | Float: 0.0 to Infinity | `0.5` |
| **FastNoise Advanced Settings - Fractal Type** | Sets the method of fractal combination. Refer to the following section for [Fractal Type descriptions and examples](#cubic-fractal-type-examples).| `FBM`, `Billow`, or  `Rigid Multi` | `FBM` |
| **Generate Random Seed** | Sets the **Random Seed** property to a random value. | | |

### Cubic Fractal Type examples

| Fractal Type | Description | Example Gradient |
|-|-|-|
| `FBM` | `FBM` or _fractional Brownian motion_ adds multiple frequencies and amplitudes of the noise signal together. | ![FBM fractal type example gradient](/images/user-guide/components/reference/gradients/fractal-type-fbm.png) |
| `Billow` | A variant of `FBM`. `Billow` adds the absolute value of multiple frequencies and amplitudes of the noise signal together. This produces extreme lows in the gradient's values. | ![Billow fractal type example gradient](/images/user-guide/components/reference/gradients/fractal-type-billow.png) |
| `Rigid Multi` | A variant of `FBM`. `Rigid Multi` subtracts the inverse of the absolute value of multiple frequencies and amplitudes of the noise signal from each other. This produces extreme highs in the gradient's values. | ![Rigid Multi fractal type example gradient](/images/user-guide/components/reference/gradients/fractal-type-rigid-multi.png) |

{{% /tab %}}
{{< /tabs >}}

## FastNoiseGradientRequestBus

Use the following request functions with the `FastNoiseGradientRequestBus` EBus interface to communicate with FastNoise Gradient components in your game.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetFractalType` | Returns the value of the **FastNoise Advanced Settings - Fractal Type** property. | None | Fractal Type Index: Integer | Yes |
| `GetFrequency` | Returns the value of the **Frequency** property. | None | Float | Yes |
| `GetGain` | Returns the value of the **Gain** property. | None | Float | Yes |
| `GetInterpolation` | Returns the value of the **FastNoise Advanced Settings - Interpolation** property. | None | Interpolation Index: Integer | Yes |
| `GetLacunarity` | Returns the value of the **Lacunarity** property. | None | Float | Yes |
| `GetNoiseType` | Returns the value of the **Noise Type** property. | None | Noise Type Index: Integer | Yes |
| `GetOctaves` | Returns the value of the **Octaves** property. | None | Octave Count: Integer | Yes |
| `GetRandomSeed` | Returns the value of the **Random Seed** property. | None | Seed: Integer | Yes |
| `SetFractalType` | Sets the value of the **FastNoise Advanced Settings - Fractal Type** property. | Fractal Type Index: Integer | None | Yes |
| `SetFrequency` | Sets the value of the **Frequency** property. | Float | None | Yes |
| `SetGain` | Sets the value of the **Gain** property. | Float | None | Yes |
| `SetInterpolation` | Sets the value of the **FastNoise Advanced Settings - Interpolation** property. | Interpolation Index: Integer | None | Yes |
| `SetLacunarity` | Sets the value of the **Lacunarity** property. | Float | None | Yes |
| `SetNoiseType` | Sets the value of the **Noise Type** property. | Noise Type Index: Integer | None | Yes |
| `SetOctaves` | Sets the value of the **Octaves** property. | Octave Count: Integer | None | Yes |
| `SetRandomSeed` | Sets the value of the **Random Seed** property. | Seed: Integer | None | Yes |
