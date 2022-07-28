---
linktitle: Image Gradient
title: Image Gradient Component
description: Use the Image Gradient component to generate a gradient from an image in Open 3D Engine (O3DE).
---

Add the **Image Gradient** component to generate a gradient from an image. The component also provides advanced
configuration options, such as tiling, scaling, and custom sampling types.

## Provider

[Gradient Signal Gem](/docs/user-guide/gems/reference/utility/gradient-signal)

## Dependencies ##

[Gradient Transform Modifier](/docs/user-guide/components/reference/gradient-modifiers/gradient-transform-modifier)

## Image Gradient properties

![Image Gradient component properties](/images/user-guide/components/reference/gradients/image-gradient-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview** | Displays the output gradient of this component after all properties are applied. | | |
| **Pin Preview to Shape** | Uses the bounding box of a compatible Shape component from the given entity to determine the world size of the preview. If **Constrain to Shape** is `Enabled`, the preview will constrain to the actual shape, not just the shape bounds. | EntityId | Current Entity |
| **Preview Position** | Sets the world location of the preview.<br> <br>*This field is available only if there is no entity selected in **Pin Preview to Shape**.* | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Preview Size** | Sets the dimensions of the preview.<br> <br>*This field is available only if there is no entity selected in **Pin Preview to Shape**.* | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Constrain to Shape** | If `Enabled`, the gradient preview uses the bounds of the entity selected in **Pin Preview to Shape**.<br> <br>*This field is available only if an entity is selected in **Pin Preview to Shape**.* | Boolean | `Disabled` |
| **Tiling** | Sets the number of times to tile the image horizontally (X) and vertically (Y). | Vector2: 0.01 to Infinity | X: `1.0`, Y: `1.0` |
| **Image Asset** | Sets the source image to generate this gradient's values.<br><br>**NOTE:** The **Image Gradient** currently only supports a subset of all available pixel formats. Most of the uncompressed formats are supported, as well as the `BC1` compressed format. For a full list of supported formats, see `AZ::RPI::IsImageDataPixelAPISupported` | `.streamingimage` | None |

### Advanced properties

The **Advanced** group of properties has an in-line toggle switch that enables/disables the entire group of advanced properties. By default, these are disabled.

| Property | Description | Values | Default |
|-|-|-|-|
| **Channel To Use** | The channel component of the image to sample from.<br><br>The `Terrarium` option is for an image-based terrain file format as defined by Mapzen [here](https://www.mapzen.com/blog/terrain-tile-service/) | `Red`, `Green`, `Blue`, `Alpha`, `Terrarium` | `Red` |
| **Custom Scale** | Choose a scaling operation to be applied to all image data.<br><br>The `Auto` option will automatically scale based on the min/max values in the image data. | `None`, `Auto`, `Manual` | `None` |
| **Range Minimum** | The minimum value used to scale image data into the `0`-`1` range for the gradient. All image values at or below the minimum will be scaled to `0`.<br> <br>*This field is available only if the **Custom Scale** field is set to `Manual`.* | Float: `0.0` to `1.0`  | `0.0` |
| **Range Maximum** | The maximum value used to scale image data into the `0`-`1` range for the gradient. All image values at or above the maximum will be scaled to `1`.<br> <br>*This field is available only if the **Custom Scale** field is set to `Manual`.* | Float: `0.0` to `1.0`  | `1.0` |
| **Mip Index** | Specify which mip level index to sample from.<br><br>If you specify a mip level higher than the number of mip levels available in your image, then the highest existing mip index will be used (see [`MipCountMax`](https://github.com/o3de/o3de/blob/development/Gems/Atom/RHI/Code/Include/Atom/RHI.Reflect/Limits.h)). | Int: `0` to `15` | `0` |
| **Sampling Type** | The sampling type to be used on the image data. | `Point`, `Bilinear` | `Point` |

### Sampling types

There are several sampling types to choose from. To illustrate, here are previews of the same source image using the different supported sampling types.

#### Point

`Point` sampling is the default and only samples a single point for each pixel of the source image.

![Image Gradient using point sampling](/images/user-guide/components/reference/gradients/image-gradient-component-point.png)

#### Bilinear

The `Bilinear` filter can be used to smooth out the image by requesting four points in a grid around a requested
pixel and then performing interpolation between the points.

![Image Gradient using bilinear interpolation](/images/user-guide/components/reference/gradients/image-gradient-component-bilinear.png)

## ImageGradientRequestBus

Use the following request functions with the `ImageGradientRequestBus` EBus interface to communicate with Image Gradient components in your game.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetImageAssetPath` | Returns the path of the `AZ::RPI::StreamingImageAsset` property. | None | String | Yes |
| `GetTilingX` | Returns the value of the **Tiling X** property. | None | Float | Yes |
| `GetTilingY` | Returns the value of the **Tiling Y** property. | None | Float | Yes |
| `SetImageAssetPath` | Sets the path of the `AZ::RPI::StreamingImageAsset` property using an absolute or relative path to the asset. | String | None | Yes |
| `SetTilingX` | Sets the value of the **Tiling X** property. | Float | None | Yes |
| `SetTilingY` | Sets the value of the **Tiling Y** property. | Float | None | Yes |
