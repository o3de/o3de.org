---
linktitle: FastNoise Gradient
title: FastNoise Gradient Component
description: Use the FastNoise Gradient component to generate a gradient with the FastNoise noise generation library in Open 3D Engine (O3DE).
---

Add the **FastNoise Gradient** component to use one of the noise generation algorithms from the [FastNoise](https://github.com/Auburn/FastNoiseLite) library to generate a gradient.  The noise generation algorithm is set in the component's **Noise Type** property.

## Provider

[Fast Noise Gem](/docs/user-guide/gems/reference/utility/fast-noise)

## Dependencies ##

[Gradient Transform Modifier](/docs/user-guide/components/reference/gradient-modifiers/gradient-transform-modifier)

## FastNoise Gradient properties

{{< tabs name="fastnoise-gradient-component-ui" >}}
{{% tab name="Value" %}}

![FastNoise value gradient properties](/images/user-guide/components/reference/gradients/fastnoise-gradient-component-value.png)

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
| **Random Seed** | Sets the seed value for the noise generation algorithm. | Integer: 1 to Infinity | `1` |
| **Frequency** | Sets the frequency of the generated noise. Larger values result in noise that is more coarse.  | Float: 0.0001 - Infinity | `1.0` |
| **FastNoise Advanced Settings - Interpolation** | Sets the function used to smooth between gradient values. | `Linear`, `Hermite`, or `Quintic` | `Quintic` |

{{% /tab %}}
{{% tab name="Value Fractal" %}}

![FastNoise value fractal gradient properties](/images/user-guide/components/reference/gradients/fastnoise-gradient-component-value-fractal.png)

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
| **Frequency** | Sets the frequency of the generated noise. Larger values result in noise that is more coarse.  | Float: 0.0001 - Infinity | `1.0` |
| **Octaves** | Sets the number of recursions of pattern generation. | Integer: 0 - 8 | `4` |
| **Lacunarity** | Sets a frequency multiplier to apply to successive **Octaves**. | Float 0.0 to Infinity | `2.0` |
| **Gain** | Sets a relative strength multiplier to apply to successive **Octaves**. | Float: 0.0 to Infinity | `0.5` |
| **FastNoise Advanced Settings - Interpolation** | Sets the function used to smooth between gradient values. | `Linear`, `Hermite`, or `Quintic` | `Quintic` |
| **FastNoise Advanced Settings - Fractal Type** | Sets the method of fractal combination. | `FBM`, `Billow`, or  `Rigid Multi` | `FBM` |

{{% /tab %}}
{{% tab name="Perlin" %}}

![FastNoise perlin gradient properties](/images/user-guide/components/reference/gradients/fastnoise-gradient-component-perlin.png)

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
| **Random Seed** | Sets the seed value for the noise generation algorithm. | Integer: 1 to Infinity | `1` |
| **Frequency** | Sets the frequency of the generated noise. Larger values result in noise that is more coarse.  | Float: 0.0001 - Infinity | `1.0` |
| **FastNoise Advanced Settings - Interpolation** | Sets the function used to smooth between gradient values. | `Linear`, `Hermite`, or `Quintic` | `Quintic` |

{{% /tab %}}
{{% tab name="Perlin Fractal" %}}

![FastNoise perlin fractal gradient properties](/images/user-guide/components/reference/gradients/fastnoise-gradient-component-perlin-fractal.png)

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
| **Frequency** | Sets the frequency of the generated noise. Larger values result in noise that is more coarse.  | Float: 0.0001 - Infinity | `1.0` |
| **Octaves** | Sets the number of recursions of pattern generation. | Integer: 0 - 8 | `4` |
| **Lacunarity** | Sets a frequency multiplier to apply to successive **Octaves**. | Float 0.0 to Infinity | `2.0` |
| **Gain** | Sets a relative strength multiplier to apply to successive **Octaves**. | Float: 0.0 to Infinity | `0.5` |
| **FastNoise Advanced Settings - Interpolation** | Sets the function used to smooth between gradient values. | `Linear`, `Hermite`, or `Quintic` | `Quintic` |
| **FastNoise Advanced Settings - Fractal Type** | Sets the method of fractal combination. | `FBM`, `Billow`, or  `Rigid Multi` | `FBM` |

{{% /tab %}}
{{% tab name="Simplex" %}}

![FastNoise simplex gradient properties](/images/user-guide/components/reference/gradients/fastnoise-gradient-component-simplex.png)

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
| **Random Seed** | Sets the seed value for the noise generation algorithm. | Integer: 1 to Infinity | `1` |
| **Frequency** | Sets the frequency of the generated noise. Larger values result in noise that is more coarse.  | Float: 0.0001 - Infinity | `1.0` |

{{% /tab %}}
{{% tab name="Simplex Fractal" %}}

![FastNoise simplex fractal gradient properties](/images/user-guide/components/reference/gradients/fastnoise-gradient-component-simplex-fractal.png)

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
| **Frequency** | Sets the frequency of the generated noise. Larger values result in noise that is more coarse.  | Float: 0.0001 - Infinity | `1.0` |
| **Octaves** | Sets the number of recursions of pattern generation. | Integer: 0 - 8 | `4` |
| **Lacunarity** | Sets a frequency multiplier to apply to successive **Octaves**. | Float 0.0 to Infinity | `2.0` |
| **Gain** | Sets a relative strength multiplier to apply to successive **Octaves**. | Float: 0.0 to Infinity | `0.5` |
| **FastNoise Advanced Settings - Fractal Type** | Sets the method of fractal combination. | `FBM`, `Billow`, or  `Rigid Multi` | `FBM` |

{{% /tab %}}
{{% tab name="Cellular" %}}

![FastNoise cellular gradient properties](/images/user-guide/components/reference/gradients/fastnoise-gradient-component-cellular.png)

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
| **Random Seed** | Sets the seed value for the noise generation algorithm. | Integer: 1 to Infinity | `1` |
| **Frequency** | Sets the frequency of the generated noise. Larger values result in noise that is more coarse.  | Float: 0.0001 - Infinity | `1.0` |
| **Distance Function** | Sets the distance function used to calculate the cell for a given point. | `Euclidean`, `Manhattan`, or `Natural` | `Euclidean` |
| **Return Type** | Sets the type of value that the cellular function returns. | `CellValue`, `Distance`, `Distance2`, `Distance2Add`, `Distance2Sub`, `Distance2Mul`, or `Distance2Div`  | `CellValue` |
| **Jitter** | Sets the maximum distance that a cellular point can move from its original position. | Float: 0.0 to Infinity | `0.45` |

{{% /tab %}}
{{% tab name="White Noise" %}}

![FastNoise white noise gradient properties](/images/user-guide/components/reference/gradients/fastnoise-gradient-component-white-noise.png)

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

{{% /tab %}}
{{% tab name="Cubic" %}}

![FastNoise cubic gradient properties](/images/user-guide/components/reference/gradients/fastnoise-gradient-component-cubic.png)

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
| **Random Seed** | Sets the seed value for the noise generation algorithm. | Integer: 1 to Infinity | `1` |
| **Frequency** | Sets the frequency of the generated noise. Larger values result in noise that is more coarse.  | Float: 0.0001 - Infinity | `1.0` |

{{% /tab %}}
{{% tab name="Cubic Fractal" %}}

![FastNoise cubic fractal gradient properties](/images/user-guide/components/reference/gradients/fastnoise-gradient-component-cubic-fractal.png)

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
| **Frequency** | Sets the frequency of the generated noise. Larger values result in noise that is more coarse.  | Float: 0.0001 - Infinity | `1.0` |
| **Octaves** | Sets the number of recursions of pattern generation. | Integer: 0 - 8 | `4` |
| **Lacunarity** | Sets a frequency multiplier to apply to successive **Octaves**. | Float 0.0 to Infinity | `2.0` |
| **Gain** | Sets a relative strength multiplier to apply to successive **Octaves**. | Float: 0.0 to Infinity | `0.5` |
| **FastNoise Advanced Settings - Fractal Type** | Sets the method of fractal combination. | `FBM`, `Billow`, or  `Rigid Multi` | `FBM` |

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
