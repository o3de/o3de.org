---
title: HDR Color Grading Component
linktitle: HDR Color Grading
description: 'Open 3D Engine (O3DE) HDR Color Grading component reference.'
toc: true
---

The **HDR Color Grading** component is a post-process effect that enables users to color grades scenes matching a desired look and feel. 
To conserve on CPU performance, a LUT texture can be generated from the current color grading settings, then used within a **Look Modification** component

## Provider ##

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)

## Dependencies

[PostFX Layer component](/docs/user-guide/components/reference/atom/postfx-layer/)

## Base properties

![HDR Color Grading base properties](/images/user-guide/components/reference/atom/post-processing-modifiers/hdr-color-grading-component-ui.png)

| Property | Description | Recommended Values | Default |
|-|-|-|-|
| Color Adjustment |
| **Weight** | Strength of the color adjustment properties | `0.0` to `1.0` | `1.0` |
| **Exposure** | Controls the amount of light entering the camera | `-20.0` to `20.0` | `0.0` |
| **Contrast** | Controls the clarity of detail | `-100.0` to `100.0` | `0.0` |
| **Pre Saturation** | Controls the intensity of colors during color adjustment | `-100.0` to `100.0` | `0.0` |
| **Filter Swatch** | Applies a color filter | RGB (`0` to `255`) | (`255`, `128`, `128`) |
| **Filter Multiply** | Strength of the color filter effect | `0.0` to `1.0` | `0.0` |
| **Filter Intensity** | Controls the intensity of the color filter swatch | `-1.0` to `1.0` | `1.0` |
| White Balance |
| **Weight** | Strengh of the white balance | `0.0` to `1.0` | `0.0` |
| **Temperature** | Controls the warmness or coolness of the white balance | `1000.0` to `40000.0` | `6600.0` |
| **Tint** | Shifts the white balance from magenta to green | `-100.0` to `100.0` | `0.0` |
| **Luminance Preservation** | Preserves the apparent brightness when manipulating the white balance | `0.0` to `1.0` | `1.0` |
| Split Toning |
| **Weight** | Strength of the split toning properties | `0.0` to `1.0` | `0.0` |
| **Balance** | Controls how shadow and highlight colors are mixed | `-1.0` to `1.0` | `0.0` |
| **Shadows Color** | Controls the color of areas classified as shadows | RGB (`0` to `255`) | (`255`, `128`, `128`) |
| **Highlights Color** | Controls the color of areas classified as highlights | RGB (`0` to `255`) | (`26`, `255`, `26`) |
| Shadow Midtones Highlights |
| **Weight** | Strength of the shadow midtones highlights properties | `0.0` to `1.0` | `0.0` |
| **Shadows Start** | Controls the start of pixel brightness values that constitute as shadows | `0.0` to `2.0` | `0.0` |
| **Shadows End** | Controls the end of pixel brightness values that constitute as shadows | `0.0` to `2.0` | `0.3` |
| **Highlights Start** | Controls the start of pixel brightness values that constitute as highlights | `0.0` to `2.0` | `0.55` |
| **Highlights End** | Controls the end of pixel brightness values that constitute as highlights | `0.0` to `2.0` | `1.0` |
| **Shadows Color** | Color to apply to shadows | RGB (`0` to `255`) | (`255`, `64`, `64`) |
| **Midtones Color** | Color to apply to midtones, pixel brightness values inbetween shadows and higlights | RGB (`0` to `255`) | (`26`, `26`, `255`) |
| **Highlights Color** | Color to apply to highlights | RGB (`0` to `255`) | (`255`, `0`, `255`) |
| Channel Mixing |
| **Channel Mixing Red** | Transforms the red color channel into a different color | XYZ (`0.0` to infinity) | (`1`, `0`, `0`) |
| **Channel Mixing Green** | Transforms the red color channel into a different color | XYZ (`0.0` to infinity) | (`0`, `1`, `0`) |
| **CHannel Mixing Blue** | Transforms the red color channel into a different color | XYZ (`0.0` to infinity) | (`0`, `0`, `1`) |
| Final Adjustment |
| **Weight** | Strenght of the final adjustment properties | `0.0` to `1.0` | `1.0` |
| **Post Saturation** | Controls the intensity of colors applied at the end of the color-grading process | `-100.0` to `100.0` | `0.0` |
| **Hue Shift** | Transforms colors into a different hue  | `0.0` to `1.0` | `0.0` |
| LUT Generation |
| **LUT Resolution** | Sets the resolution of the generated LUT. The higher the resolution, the more accurate the results would be to the original color graded settings | `16x16x16`, `32x32x32`, or `64x64x64` | `16x16x16` |
| **Shaper Type** | Applies a shaper function during LUT generation to match a monitor's brightness | `Linear Custom Range`, `Log2 48 Nits`, `Log2 1000 Nits`, 'Log2 2000 Nits`, `log2 4000 Nits`, `Log2 Custom Range`, `PQ (SMPTE ST 2084)` | `None` |
