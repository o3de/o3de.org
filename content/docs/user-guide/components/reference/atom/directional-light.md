---
title: Directional Light Component
linktitle: Directional Light
description: 'Open 3D Engine (O3DE) Directional Light component reference.'
toc: true
---

The **Directional Light** component casts light from an infinitely distant point towards a single direction, similar to sunlight. This component also supports shadow casting. 


## Provider ##

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)


## Directional Light Properties

![Directional Light component interface.](/images/user-guide/components/reference/atom/light-component-ui/directional-light.png)

| Property | Description | Values | Default |
| - | - | - | - |
| **Color** | The color of the light. The color acts as a mask or gel on a perfectly white light source. For instance, a 1000 lux light with a white color will actually be 1000 lux, but a 1000 lux light with an 18% gray color will only be 180 lux. | Color | `255, 255, 255` |
| **Intensity mode** | Allows specifying light values in lux or EV100. Lux is a linear light value while EV100 is logarithmic (similar to camera stops). | `Lux` or `Ev100` | `Ev100` |
| **Intensity** | Intensity of the light in the photometric unit set by **Intensity mode**. | Any number for `Ev100`, any positive number for `Lux` | `4.0` |
| **Angular diameter** | The angular diameter of the light source in degrees. This is used to make sure specular highlights from directional lights don't completely disappear on mirror-smooth surfaces. The angular diameter of the Sun as viewed from Earth is about 0.5°. | 0.0 - 5.0 | `0.5` |

| **Shadow** | Refer to [Shadow properties](#shadow-properties) below. | | |
| **Global Illumination** | Refer to [Global Illumination properties](#global-illumination-properties) below. | | |

### Shadow properties

| Property | Description | Values | Default |
| - | - | - | - |
| **Camera** | The entity of the camera the shadows will be visible from. Used to calculate the view frustums for shadow cascades. | EntityId | None |
| **Shadow far clip** | The distance to the far clip plane of the shadow. This is the maximum distance from the light source that shadows can cast. | 0 to Infinity | `100.0` |
| **Shadowmap size** | The texture width and height of each shadow map cascade. | `256`, `512`, `1024`, `2048` | `1024` |
| **Cascade count** | The number of shadow cascades. | 1 - 4 | `4` |
| **Automatic splitting** | If enabled, the **Split ratio** is used, otherwise the **Far depth cascade** values are used. | Boolean | Enabled |
| **Split Ratio** | Ratio between linear (0) and logarithmic (1) splitting schemes for the shadow cascades. | 0.0 - 1.0 | `0.9` |
| **Far depth cascade** | The far depth of each cascade with x/y/z/w being for cascade 1/2/3/4. Unused cascades are ignored when cascade count is less than 4. | 0.0 to **Shadow far clip** | X: 25.0, Y: 50.0, Z: 75.0, W: 100.0 |
| **Ground height** | The height of the ground relative to the camera used to correct position of cascades. | -Infinity to Infinity | `0.0` |
| **Cascade correction** | If enabled, shadow cascades will be adjusted to optimize the appearance for certain camera positions. | Boolean | Disabled |
| **Debug coloring** | If enabled, shadow cascades will be colored to see their placement. Red, green, blue, and yellow are used to show cascades 1 to 4. | Boolean | Disabled |
| **Shadow filter method** | Filtering method of edge-softening of shadows. <ul><li>None: No filtering</li><li>PCF: Percentage-closer filtering</li><li>ESM: Exponential shadow maps</li><li>ESM+PCF: ESM with a PCF fallback</li></ul> | `None`, `PCF`, `ESM`, `ESM+PCF` | `None` |
| **Filtering sample count** | The number of samples to use when filtering a shadow along an edge. Only applies to PCF and ESM+PCF. | 4 - 64 | `32` |
| **Shadow Receiver Plane Bias Enable** | If enabled, the plane of the shadow receiver is adjusted to reduce shadow acne on large PCF kernels. | Boolean | Enabled | 
| **Shadow Bias** | Reduces acne by applying a fixed bias along the z axis in shadow-space. | 0.0 - 0.2 | `0.0015` |
| **Normal Shadow Bias** | Reduces acne by biasing the shadow map lookup along the geometric normal. | 0.0 - 10.0 | `2.5` |
| **Blend between cascades** | If enabled, shadow cascades blend smoothly with each other. | Boolean | Disabled |
| **Fullscreen Blur** | If enabled, a full-screen blur is applied to the shadows. | Boolean | Enabled |
| **Fullscreen Blur Strength** | Sets the strength of the fullscreen shadow blur. | 0 - 0.95 | `0.67` |
| **Fullscreen Blur Sharpness** | Sets the sharpness of the fullscreen shadow blur around edges. | 0 - 400 | `50` |

### Global Illumination properties

| Property | Description | Values | Default |
| - | - | - | - |
| **Affects GI** | If enabled, this light affects diffuse global illumination. | Boolean | Enabled |
| **Factor** | Multiplies this light's contribution to diffuse global illumination. | 0.0 - 2.0 | `1.0` |