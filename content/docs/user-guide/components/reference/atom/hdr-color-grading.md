---
title: HDR Color Grading Component
linktitle: HDR Color Grading
description: 'Open 3D Engine (O3DE) HDR Color Grading component reference.'
toc: true
---

The **HDR Color Grading** component is a post-process effect that enables users to color grade scenes to match a desired look and feel. This component uses a shader behind the scenes to perform the color grading logic on each frame's pixel.

To reduce compute time:
1. Generate a look-up texture (LUT) from the current color grading settings by clicking the **Generate LUT** button on the component. 

    ![HDR Color Grading Generate LUT](/images/user-guide/components/reference/atom/post-processing-modifiers/hdr-color-grading/hdr-color-grading-generate-lut-ui.png)

2. Then, activate the generated LUT by clicking the **Activate LUT** button. 

    ![HDR Color Grading Activate LUT](/images/user-guide/components/reference/atom/post-processing-modifiers/hdr-color-grading/hdr-color-grading-activate-lut-ui.png)

Upon activation, a **Look Modification** component is added to the current entity and subsequently the **HDR Color Grading** component is disabled. 

## Provider ##

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)

## Dependencies

[PostFX Layer component](/docs/user-guide/components/reference/atom/postfx-layer/)

## Properties
### Color Adjustment ###

![HDR Color Grading Color Adjustment](/images/user-guide/components/reference/atom/post-processing-modifiers/hdr-color-grading/hdr-color-grading-component-color-adjustment-ui.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Weight** | Strength of the color adjustment properties. | Float: 0.0 - 1.0 | `1.0` |
| **Exposure** | Controls the amount of light entering the camera. | Float: -Infinity to Infinity | `0.0` |
| **Contrast** | Controls the clarity of detail. | Float: -100.0 - 100.0 | `0.0` |
| **Pre Saturation** | Controls the intensity of colors during color adjustment. | Float: -100.0 - 100.0 | `0.0` |
| **Filter Swatch** | Applies a color filter. | Eight bits per channel color: 0 - 255 | `255,128,128` |
| **Filter Multiply** | Strength of the color filter effect. | Float: 0.0 - 1.0 | `0.0` |
| **Filter Intensity** | Controls the intensity of the color filter swatch. | Float: -Infinity to Infinity | `1.0` |

### White Balance ###

![HDR Color Grading White Balance](/images/user-guide/components/reference/atom/post-processing-modifiers/hdr-color-grading/hdr-color-grading-component-white-balance-ui.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Weight** | Strengh of the white balance. | Float: 0.0 - 1.0 | `0.0` |
| **Temperature** | Controls the warmness or coolness of the white balance. | Float: 1000.0 - 40000.0 | `6600.0` |
| **Tint** | Shifts the white balance from magenta to green. | Float: -100.0 - 100.0 | `0.0` |
| **Luminance Preservation** | Preserves the apparent brightness when manipulating the white balance. | Float: 0.0 - 1.0 | `1.0` |

### Split Toning ###

![HDR Color Grading Split Toning](/images/user-guide/components/reference/atom/post-processing-modifiers/hdr-color-grading/hdr-color-grading-component-split-toning-ui.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Weight** | Strength of the split toning properties. | Float: 0.0 - 1.0 | `0.0` |
| **Balance** | Controls how shadow and highlight colors are mixed. | Float: -1.0 - 1.0 | `0.0` |
| **Shadows Color** | Controls the color of areas classified as shadows. | Eight bits per channel color: 0 - 255 | `255,128,128` |
| **Highlights Color** | Controls the color of areas classified as highlights. | Eight bits per channel color: 0 - 255 | `26,255,26` |

### Shadows Midtones Highlights ###

![HDR Color Grading Shadows Midtones Highlights](/images/user-guide/components/reference/atom/post-processing-modifiers/hdr-color-grading/hdr-color-grading-component-shadow-midtones-higlights-ui.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Weight** | Strength of the **Shadow Midtones Highlights** properties. | Float: 0.0 - 1.0 | `0.0` |
| **Shadows Start** | Controls the start of pixel brightness values that constitute as shadows. | Float: 0.0 - 16.0 | `0.0` |
| **Shadows End** | Controls the end of pixel brightness values that constitute as shadows. | Float: 0.0 - 16.0 | `0.3` |
| **Highlights Start** | Controls the start of pixel brightness values that constitute as highlights. | Float: 0.0 - 16.0 | `0.55` |
| **Highlights End** | Controls the end of pixel brightness values that constitute as highlights. | Float: 0.0 - 16.0 | `1.0` |
| **Shadows Color** | Color to apply to shadows. | Eight bits per channel color: 0 - 255 | `255,64,64` |
| **Midtones Color** | Color to apply to midtones, which are the pixel brightness values in between shadows and highlights. | Eight bits per channel color: 0 - 255 | `26`,`26`,`255` |
| **Highlights Color** | Color to apply to highlights. | Eight bits per channel color: 0 - 255 | `255,0,255` |

### Channel Mixing ###

![HDR Color Grading Channel Mixing](/images/user-guide/components/reference/atom/post-processing-modifiers/hdr-color-grading/hdr-color-grading-component-channel-mixing-ui.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Channel Mixing Red** | Transforms the red color channel into a different color. | Vector3: 0.0 to infinity | X:`1`,Y:`0`,Z:`0` |
| **Channel Mixing Green** | Transforms the green color channel into a different color. | Vector3: 0.0 to infinity | X:`0`,Y:`1`,Z:`0` |
| **CHannel Mixing Blue** | Transforms the blue color channel into a different color. | Vector3: 0.0 to infinity | X:`0`,Y:`0`,Z:`1` |

### Final Adjustment ###

![HDR Color Grading Final Adjustment](/images/user-guide/components/reference/atom/post-processing-modifiers/hdr-color-grading/hdr-color-grading-component-final-adjustment-ui.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Weight** | Strength of the **Final Adjustment** properties. | Float: 0.0 - 1.0 | `1.0` |
| **Post Saturation** | Controls the intensity of colors applied at the end of the color grading process. | Float: -100.0 - 100.0 | `0.0` |
| **Hue Shift** | Transforms colors into a different hue.  | Float: 0.0 - 1.0 | `0.0` |

### LUT Generation ###

![HDR Color Grading LUT Generation](/images/user-guide/components/reference/atom/post-processing-modifiers/hdr-color-grading/hdr-color-grading-component-lut-generation-ui.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **LUT Resolution** | Sets the resolution of the generated LUT. The higher the resolution, the more accurate the results are to the original color graded settings. | `16x16x16`, `32x32x32`, or `64x64x64` | `16x16x16` |
| **Shaper Type** | Applies a shaper function during LUT generation to match a monitor's brightness. | `Linear Custom Range`, `Log2 48 Nits`, `Log2 1000 Nits`, `Log2 2000 Nits`, `log2 4000 Nits`, `Log2 Custom Range`, `PQ (SMPTE ST 2084)` | `None` |
