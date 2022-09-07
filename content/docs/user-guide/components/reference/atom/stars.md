---
title: Stars Component
linktitle: Stars
description: 'Open 3D Engine (O3DE) Stars component reference.'
toc: true
---

The **Stars** component provides physically-based animated resolution-independant distant stars.

Stars are rendered as billboards that have a white center that fades out to the star color on the edges. The billboards are projected onto the far plane, and the brightness of each star changes over time to create a "twinkle" effect. The orientation of the entire star field is controlled by the **Transform** component of the entity that contains the **Stars** component so that you can rotate the star field to simulate the rotation of the earth.

![An example of the star field that this component generates](/images/user-guide/components/reference/atom/stars/stars.png)

## Provider

[Stars Gem](/docs/user-guide/gems/reference/rendering/stars/)

## Properties

![stars-component-base-properties](/images/user-guide/components/reference/atom/stars/stars-base-properties-ui.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Exposure** | Specifies the exposure to use when rendering the stars in the scene so you can control how bright the stars are. | `0.0` - `32.0` | `1.0` |
| **Radius Factor** | Specifies the factor to multiply every star width and height by so you can set the size of stars. | `0.0` - `64.0`  | `7.0`  |
| **Stars Asset** | The Stars binary data file to use for every star position, color and brightness. |  | `default.stars` |
| **Twinkle Rate** | Specifies how frequently stars twinkle. | `0.0` - `10.0` | `0.5` |

## .stars binary data file format

The engine includes a `default.stars` asset that you can use to create a star field.  To create your own custom star field asset, you need to generate a binary `.stars` file with the following data:

| Field | Description | Type | Value |
| - | - | - | - |
| File Type Tag | The first entry in the `.stars` file must be the "STAR" tag  | `uint32_t` | `0x52415453`|
| File Version | Currently only one version is supported | `uint32_t` | `0x00010001` |
| Number of stars | The number of stars in the file | `uint32_t` |  |
| Stars | Per-star data structures (see below) | `Star` |  |

The `Star` binary type is a structure in the following format:
| Field | Description | Type |
| - | - | - | 
| Ascension | Right Ascension in degrees (0.0 - 24.0) | `float` | 
| Declination | Declination in degrees (-90.0 - 90.0)| `float` | 
| Red | Red amount | `uint8_t` | 
| Green | Green amount | `uint8_t` | 
| Blue | Blue amount | `uint8_t` | 
| Magnitude | Star magnitude (brightness) amount | `uint8_t` | 
