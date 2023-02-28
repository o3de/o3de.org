---
linkTitle: Understanding Frequency Separation
title: Understanding Frequency Separation
description: Learn various frequency separation techniques and how they apply to detail materials.
weight: 300
toc: true
---

This tutorial helps us understand the importance of Frequency Separation (FS), which is a technique used in image editing to separate the high-frequency details, such as texture and blemishes, from the low-frequency information, such as color and tone. This allows the editor to make adjustments to these different elements separately, allowing for more precise and targeted edits. For example, the Image Author could use frequency separation to smooth out the skin tone of a portrait without losing the texture of the skin, or to remove blemishes without affecting the overall skin tone. The technique involves creating two layers in the image, one for the high frequencies and one for the low frequencies, and then using blurring and other techniques to separate the two layers. Frequency separation can be a useful tool in a variety of editing situations, including portrait retouching, product photography, and landscape editing.

## Generating low and high pass

Terrain detail maps can be derived from running a high pass filter on an image. Starting from an image with lots of color and detail, we are going to separate out the low frequency and high frequency data.
Separating low/high frequency data from an image is a manual process in an image editor, such as Photoshop.

You can generate a basic high-pass texture a number of ways:
1. Use a High-Pass Filter in your Image Editor:
    * Adobe® Photoshop® software: menubar > filter > other > High Pass
    * Gimp: by using Filters->Enhance->High Pass, with Std Dev=10, Contrast=1.0.
    * Krita: you can use the method outlined in this document
1. Or a similar High-Pass filter in your material authoring app, such as “Adobe®  Substance3D Designer® software:
    * Google searching "substance high-pass" or "substance luminance highpass" will get you to those help pages

This document describes a non-filter approach that has more flexibility, which can be used to separate an image into two textures:
1. A high-frequency variation texture that is suitable for use in a Terrain Detail Material.
1. A low-frequency color map that can be used in Terrain Macro Color workflows.

The following section explains how to generate layers in Photoshop that contain low and high pass filters of a base image:
| <div style="width:250px">Original (Layer 1)</div> | <div style="width:250px">Low pass filter (Layer 2)</div> | <div style="width:250px">High pass filter (Layer 3)</div> |
| :-- | :-- | :-- |
|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/original_image.png" width="250" alt="Original (Layer 1)" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/original_low_pass.png" width="250" alt="Low pass filter (Layer 2)" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/original_high_pass.png" width="250" alt="High pass filter (Layer 3)" >}}|
|<ul><li>Base layer only</li></ul>|<ul><li>Duplicate the original image into Layer 2</li><li>Gaussian blur (I used 16)</li><li><b>NOTE:</b>The higher the blur, the less information<br>in the low pass/more information in the high pass.</li><li><b>Alternatively:</b> You can find the average single color<br>value of the entire image, and then use this solid<br>color as the low pass. This will maximize the<br>amount of detail and color variance that remains<br>in the high pass detail.</li></ul>|<ul><li>Duplicate the original image again into Layer 3</li><li>Now we are going to generate the high pass</li><li>In photoshop, with Layer 3 selected</li><li>Use the menu option: Image > Apply Image</li><li>In the dialog use the following settings<ul><li>Layer: (Use Layer 2)</li><li>Blending: (Use subtract)</li><li>Scale: (Use 2)</li><li>Offset: (Use 128)</li></ul></li></ul>This will get you a high pass image like above ^<br>{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/ps_blur_dialog.png" alt="Photoshop gaussian blur for 8-bit image" >}}<br>Note: The settings above are the settings for an 8-bit image.<br>The scale and offset settings for a 16-bit image are as follows:<ul><li>Check invert</li><li>Blending: (Use add)</li><li>Scale: (Use 2)</li><li>Offset: (Use 0)</li></ul></li></ul>{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/ps_blur_dialog_16.png" alt="Photoshop gaussian blur for 16-bit image" >}}|

### Tiling images

For tiling images, use the following steps before separating low and high frequencies to ensure that both the low pass and high pass tile properly:

1. Select the base image
1. Choose  **Edit** > **Define Pattern...**
1. Save the selected base image as a pattern
1. Choose  **Image** > **Canvas Size...**
1. In the Canvas Size dialog, set **Width** and  **Height** to 300%
1. Create a 3x3 tiled image. Choose **Edit** > **Fill...** In the Fill dialog do the following:
    * Set **Contents** to Patterns
    * Choose **Custom Pattern** and select the pattern you made from the base image in step 3.
1. Perform the previous steps for [Generating low and high pass](#generating-low-and-high-pass) layers
1. Choose **Image** > **Canvas Size...**
1. In the Canvas Size dialog set **Width** and **Height** to 33.33%, or the original image size in pixels to crop the image to the center tile.

The preceding steps allow the Gaussian blur to take into account the wrapped tiling along the adjacent borders. When the low pass (blur) is calculated, the pixel information wraps. When it's subtracted and cropped, both the low pass and the high pass tile properly.

## Blending

Next, you'll combine (blend) the low pass (Layer 2) and the high pass (Layer 3).

In Photoshop, set the layer blend mode of the high pass to Linear light.

![Photoshop: Set blend mode of high pass to Linear light](/images/learning-guide/tutorials/environments/detail_macro_materials/ps_linear_light.png)

In the preceding screenshot, the original image fidelity is restored by properly blending the low and high pass frequencies together.

## Downsampled low pass

With the blending of low pass and high pass, you can downsample the low pass image and still achieve a final blended image with little perceptible loss in quality. The following example downsamples the low pass to a much smaller image, then reconstructs the image from two maps of different resolutions. Some information is lost, which might decrease aspects such as fidelity, quality, and overall data integrity of the image, but you can experiment with the levels to find an acceptable result.

| <div style="width:160px">Original Low Pass<br>(1024 x 1024 pixels)</div> | <div style="width:160px">Downsampled<br>(64 x 64 pixels)</div> | <div style="width:160px">Interpolated<br>(Bilinear)</div> | <div style="width:160px">Reconstructed<br>(Interpolated + Original High Pass)</div> |<div style="width:160px">Difference<br>(Original - Reconstructed)</div> |
|-|-|-|-|-|
|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/original_low_pass.png" width="150" alt="Original Low Pass (1024 x 1024 pixels)" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/downsampled_64.png" width="150" alt="Downsampled (64 x 64 pixels)" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/interpolated_64.png" width="150" alt="Interpolated (Bilinear)" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/blended_64.png" width="150" alt="Interpolated + Original High Pass (Reconstructed blend)" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/difference_64.png" width="150" alt="Difference (Original minus Reconstructed blend)" >}}|

As you can see in the final reconstructed image, there is almost no perceptible loss in quality. This is further highlighted by how closely you need to zoom into the difference image to observe how minor the differences are.

Let's try another downsampled even further.

| <div style="width:160px">Original Low Pass<br>(1024 x 1024 pixels)</div> | <div style="width:160px">Downsampled<br>(16 x 16 pixels)</div> | <div style="width:160px">Interpolated<br>(Bilinear)</div> | <div style="width:160px">Reconstructed<br>(Interpolated + Original High Pass)</div> |<div style="width:160px">Difference<br>(Original - Reconstructed)</div> |
|-|-|-|-|-|
|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/original_low_pass.png" width="150" alt="Original Low Pass (1024 x 1024 pixels)" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/downsampled_16.png" width="150" alt="Downsampled (16 x 16 pixels)" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/interpolated_16.png" width="150" alt="Interpolated (Bilinear)" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/blended_16.png" width="150" alt="Interpolated + Original High Pass (Reconstructed blend)" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/difference_16.png" width="150" alt="Difference (Original minus Reconstructed blend)" >}}|

At this level of downsampling, there is a perceptible difference in integrity, and the quality is arguably diminished. However, the fidelity is still good enough to be useful for terrain detail mapping use cases.

## Results

Here are all three reconstructions again side-by-side, each is the final reconstructed resolution of 1024 pixels, only the low-frequency low-pass was altered. It's quite hard to visually pick out the difference, but if you look closely at the far-right version that had the most manipulation has some reduced contrast that was lost in some areas.

| Low Pass: 1024<br>High Pass: 1024</div> | Low Pass: 64 (Bilinear upsample)<br>High Pass: 1024</div> | Low Pass: 16 (Bilinear upsample)<br>High Pass: 1024</div> |
|-|-|-|
|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/results_0.png" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/results_1.png" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/results_2.png" >}}|

## Color Alteration

This is a pretty flexible technique, as the high pass frequency can be applied across a wide range of shifts in the low pass base colors and still arrive at decent looking results. Here are a few extreme examples:

| <div style="width:160px">Original Low Pass<br>(1024 x 1024 pixels)</div> | <div style="width:160px">Downsampled<br>(32 x 32 pixels)</div> | <div style="width:160px">Interpolated<br>(Bilinear)</div> | <div style="width:160px">Reconstructed<br>(Interpolated + Original High Pass)</div> |
|-|-|-|-|
|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/color_shift_0.png" width="150" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/color_shift_1.png" width="150" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/color_shift_2.png" width="150" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/color_shift_3.png" width="150" >}}|

And in this next version, you are simple going to hue shift our original low pass colors.

| <div style="width:160px">Original Low Pass<br>(1024 x 1024 pixels)</div> | <div style="width:160px">Downsampled<br>(32 x 32 pixels)</div> | <div style="width:160px">Interpolated<br>(Bilinear)</div> | <div style="width:160px">Reconstructed<br>(Interpolated + Original High Pass)</div> |
|-|-|-|-|
|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/hue_shift_0.png" width="150" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/hue_shift_1.png" width="150" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/hue_shift_2.png" width="150" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/hue_shift_3.png" width="150" >}}|

As you can see, you can make pretty abrupt and wild changes to the base color, and still arrive at visually interesting results!

## Macro material low pass

You can use the small downsampled low pass image in texturing for our Macro material. There are a several options for this use case:
* Use the downsampled low pass image as a texture input for texturing
* Use the downsampled low pass to generate a color ramp (and a matching height map), which can be used as input in programs like World Machine to use in colorization
* Use the downsampled low pass as a color swatch for painting terrain

Then with the proper blending and syncing the repeat, you can augment this with the high pass detail texture and result in something similar to the original image up close.

## High pass detail map

You can use Photoshop's built-in high pass filter to generate a high pass detail map, and then apply that back to the original image to generate the matching low pass macro material texture with the following process:

| <div style="width:160px">Generate the High Pass</div> | <div style="width:160px">Linear Burn</div> | <div style="width:160px">Linear Add</div> | <div style="width:160px">Low Pass</div> | <div style="width:160px">Low Pass<br>(Swapped ordering)</div> |
|-|-|-|-|-|
|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/generated_high_pass.png" width="150" alt="Generate the High Pass" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/linear_burn.png" width="150" alt="Linear Burn" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/linear_add.png" width="150" alt="Linear Add" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/low_pass_errors.png" width="150" alt="Low Pass" >}}|{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/low_pass_order_swap.png" width="150" alt="Low Pass (Swapped ordering)" >}}|
|Leave the original unaltered image in the default Photoshop layer "background".<br><br>Duplicate the original image into "Layer 1", we will use this layer to generate the high-pass.<br><br>Use "Layer 1" to generate the high-pass using the filter method.<br><br>Filter > Other > High Pass<ul><li>Use a radius of 16</li></ul>|<ul><li>Duplicate the High Pass (Layer 2)</li><li>Level the Image, Output Levels: 0 ... 128</li><li>Invert the Image</li><li>Set the Layer to "Linear Burn"</li></ul>{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/ps_linear_burn.png" alt="Photoshop linear burn" >}}|<ul><li>Duplicate the High Pass (Layer 3)</li><li>Level the Image, Output Levels: 128 ... 255</li><li>Invert the Image</li><li>Set the Layer to "Linear Dodge (Add)"</li></ul>{{< image-width src="/images/learning-guide/tutorials/environments/detail_macro_materials/ps_linear_add.png" alt="Photoshop linear add" >}}|As you can see, we are pretty close to the simple Gaussian Blurred Low Pass Method.<br>Close enough that after downsampling and interpolation the errors might be removed.<br><br>But as you can see in the image to the right, the errors are a result of the order of operation.|If we swap the ordering of<br>Layer 2 / 3, the errors show up<br>in the upper ranges instead.<br><br>The other method is preferred<br>since it gives you full control<br>over the low pass, separates<br>the high pass into less steps, and can be done in a single operation without errors.|
