---
linkTitle: Create Terrain Detail and Macro Materials
title: Create Terrain Detail and Macro Materials
description: Learn to blend terrain detail and macro materials to create realistic terrain environments.
weight: 300
toc: true
---

This tutorial explains how to use frequency separation to create textures for terrain in **Open 3D Engine (O3DE)**. This is an image technique which is often used in retouching photos. However, it can also be a useful technique to understand and apply technically to the creation of textures and/or shading techniques.

## Generating low and high pass

Terrain detail maps can be derived from running a high pass filter on an image. Starting from an image with lots of color and detail, we are going to separate out the low frequency and high frequency data.
Separating low/high frequency data from an image is a manual process in an image editor, such as Photoshop.

Here is the original image:
| Original (Layer 1) | Low pass filter (Layer 2) | High pass filter (Layer 3) |
|-|-|-|
|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/original_image.png" width="250" alt="Original (Layer 1)" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/original_low_pass.png" width="250" alt="Low pass filter (Layer 2)" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/original_high_pass.png" width="250" alt="High pass filter (Layer 3)" >}}|
|<ul><li>Base layer only</li></ul>|<ul><li>Duplicate the original image into Layer 2</li><li>Gaussian blur (I used 16)</li><li><b>NOTE:</b>The higher the blur, the less information<br>in the low pass/more information in the high pass.</li><li><b>Alternatively:</b> You can find the average single color<br>value of the entire image, and then use this solid<br>color as the low pass. This will maximize the<br>amount of detail and color variance that remains<br>in the high pass detail.</li></ul>|<ul><li>Duplicate the original image again into Layer 3</li><li>Now we are going to generate the high pass</li><li>In photoshop, with Layer 3 selected</li><li>Use the menu option: Image > Apply Image</li><li>In the dialog use the following settings<ul><li>Layer: (Use Layer 2)</li><li>Blending: (Use subtract)</li><li>Scale: (Use 2)</li><li>Offset: (Use 128)</li></ul></li></ul>This will get you a high pass image like above ^<br>{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/ps_blur_dialog.png" alt="Photoshop gaussian blur for 8-bit image" >}}<br>Note: The settings above are the settings for an 8-bit image.<br>The scale and offset settings for a 16-bit image are as follows:<ul><li>Check invert</li><li>Blending: (Use add)</li><li>Scale: (Use 2)</li><li>Offset: (Use 0)</li></ul></li></ul>{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/ps_blur_dialog_16.png" alt="Photoshop gaussian blur for 16-bit image" >}}|

### Tiling images

If you are working with tiling images, you will want to use the following steps in order to make sure that both the low pass and high pass will continue to properly tile after the frequency splitting happens:

* Select All
* Edit > Define Pattern ...
  * Save the base image as a pattern
* Image > Canvas Size
  * Width/Height 300%
* Edit > Fill ...
  * Contents: Patterns
  * Custom Pattern: (select the pattern you made previously from the base image)
  * Note: This fills the image with the pattern. Consider it a 3x3 tiled version of your image, so we can work on the center tile.
* Now repeat the steps above for splitting the image frequencies
* Image > Canvas Size
  * Width/Height: 33.33%, or the <original image size> in pixels

These steps allow the gaussian blur to take into account the wrapped tiling along the adjacent borders.
Now, when the low pass (blur) is calculated, the pixel information wraps. Then, when it's subtracted and cropped both the low pass and the high pass will still tile properly.

## Blending

Next, we will combine (blend) the low pass (Layer 2) and the high pass (Layer 3).
* In Photoshop, set the layer blend mode of the high pass to Linear light

![Photoshop: Set blend mode of high pass to Linear light](/images/learning-guide/tutorials/environments/detail_macro_materials/ps_linear_light.png)

As you can see in the screenshot, we've restored the original image fidelity by properly blending the low + high pass frequencies back together.

## Downsampled low pass

With the blending of low pass + high pass, we can actually downsample the low pass image and still achieve a final blended image with little perceptible loss in quality.
We will downsample the low pass to a much smaller image, then reconstruct the image from two maps of different resolutions. Theoretically, we will loose some information which may decrease aspects like the fidelity, quality and overall data integrity of the image, but we can experiment with the levels to see where the quality of the final image starts to breakdown.

| Original Low Pass (1024 x 1024 pixels) | Downsampled (64 x 64 pixels) | Interpolated (Bilinear) | Interpolated + Original High Pass (Reconstructed blend) | Difference (Original minus Reconstructed blend) |
|-|-|-|-|-|
|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/original_low_pass.png" width="150" alt="Original Low Pass (1024 x 1024 pixels)" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/downsampled_64.png" width="150" alt="Downsampled (64 x 64 pixels)" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/interpolated_64.png" width="150" alt="Interpolated (Bilinear)" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/blended_64.png" width="150" alt="Interpolated + Original High Pass (Reconstructed blend)" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/difference_64.png" width="150" alt="Difference (Original minus Reconstructed blend)" >}}|

As you can see in the final reconstructed image, there is almost no perceptible loss in quality. This is further highlighted by how closely you need to zoom into the difference image to observe how minor the differences are.

Let's try another downsampled even further.

| Original Low Pass (1024 x 1024 pixels) | Downsampled (16 x 16 pixels) | Interpolated (Bilinear) | Interpolated + Original High Pass (Reconstructed blend) | Difference (Original minus Reconstructed blend) |
|-|-|-|-|-|
|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/original_low_pass.png" width="150" alt="Original Low Pass (1024 x 1024 pixels)" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/downsampled_16.png" width="150" alt="Downsampled (16 x 16 pixels)" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/interpolated_16.png" width="150" alt="Interpolated (Bilinear)" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/blended_16.png" width="150" alt="Interpolated + Original High Pass (Reconstructed blend)" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/difference_16.png" width="150" alt="Difference (Original minus Reconstructed blend)" >}}|

At this level of downsampling, we are starting to see a perceptible difference in integrity, and the quality is arguably diminished. However, the fidelity is still good enough to be useful for our terrain detail mapping use case.

## Macro material low pass

We can use the small downsampled low pass image in texturing for our Macro material. There are a several options for this use case:
* Use the downsampled low pass image as a texture input for texturing
* Use the downsampled low pass to generate a color ramp (and a matching height map), which can be used as input in programs like World Machine to use in colorization
* Use the downsampled low pass as a color swatch for painting terrain

Then with the proper blending and syncing the repeat, we can augment this with the the high pass detail texture and result in something similar to our original image up close.

## High pass detail map

Now let's briefly explore how we can use Photoshop's built-in high pass filter to generate our high pass detail map, and then apply that back to the original image to generate the matching low pass macro material texture.

| Generate the High Pass | Linear Burn | Linear Add | Low Pass | Low Pass (Swapped ordering) |
|-|-|-|-|-|
|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/generated_high_pass.png" width="150" alt="Generate the High Pass" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/linear_burn.png" width="150" alt="Linear Burn" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/linear_add.png" width="150" alt="Linear Add" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/low_pass_errors.png" width="150" alt="Low Pass" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/low_pass_order_swap.png" width="150" alt="Low Pass (Swapped ordering)" >}}|
|Filter > Other > High Pass<ul><li>Use a radius of 16</li></ul>|<ul><li>Duplicate the High Pass (Layer 2)</li><li>Level the Image, Output Levels: 0 ... 128</li><li>Invert the Image</li><li>Set the Layer to "Linear Burn"</li></ul>{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/ps_linear_burn.png" alt="Photoshop linear burn" >}}|<ul><li>Duplicate the High Pass (Layer 3)</li><li>Level the Image, Output Levels: 128 ... 255</li><li>Invert the Image</li><li>Set the Layer to "Linear Dodge (Add)"</li></ul>{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/ps_linear_add.png" alt="Photoshop linear add" >}}|As you can see, we are pretty close to the simple Gaussian Blurred Low Pass Method.<br>Close enough that after downsampling and interpolation the errors might be removed.<br><br>But as you can see in the image to the right, the errors are a result of the order of operation.|If we swap the ordering of<br>Layer 2 / 3, the errors show up<br>in the upper ranges instead.<br><br>The other method is preferred<br>since it gives you full control<br>over the low pass, separates<br>the high pass into less steps, and can be done in a single operation without errors.|
