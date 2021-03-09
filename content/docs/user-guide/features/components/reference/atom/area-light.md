---
description: ' Open 3D Engine (O3DE) Area Light component reference. '
title: Area Light component
date: 2021-03-05
---

{{< preview-migrated >}}

The **Area Light** component simulates a soft studio light by emitting light from a geometric shape that's provided by a Shape component. Light is emitted from the area of the surface of the shape in the direction of the shape's surface. Because the area of the shape is factored into the light calculation, the selected **Intensity Mode** can drastically affect the light's output. See the Intensity Mode property description in [Base properties](#base-properties) for more information.

## Provider ##

[Atom Gem](/docs/user-guide/features/gems/reference/atom)

## Dependencies ##

The Area Light component requires one of the following components:

* [Capsule Shape component](/docs/user-guide/features/components/reference/shape/capsule-shape)
* [Disk Shape component](/docs/user-guide/features/components/reference/shape/disk-shape)
* [Polygon Prism Shape component](/docs/user-guide/features/components/reference/shape/polygon-prism-shape)
* [Quad Shape component](/docs/user-guide/features/components/reference/shape/quad-shape)
* [Sphere Shape component](/docs/user-guide/features/components/reference/shape/sphere-shape)

> Note: Area Lights do not factor the height of Polygon Prism Shapes. With the Polygon Prism Shape, you can create a flat shape for the light with an arbitrary number of sides.

## Base properties ##

![Area Light component base properties](/images/user-guide/features/components/reference/atom/area-light-component-ui-01.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Color** | The color of the light. Color acts as a gel on a pure white light and reduces the total energy output of the light for any color other than pure white. For example, a 100 `Lumens` area light with a color setting of medium grey (18%) will only output 18 lumens of light. | Eight bits per channel color: 0-255 | `255,255,255` |
| **Intensity Mode** | The photometric unit of the light. `Candela` and `Lumens` specify the total amount of light energy that is emitted from the entire surface area of the shape. If `Candela` or `Lumens` is selected as the Intensity Mode, and Intensity is specified as 100.0, the larger the provided shape component, the dimmer the light will appear because the total light energy is spread over a larger surface area. `Nit` represents light energy as Candelas per square meter. `Ev100` represents light energy as an exposure value over an area. `Ev100` values are exponential, so a value of 5.0 `Ev100` will be twice as bright as a value of 4.0 `Ev100`. With `Nit` and `Ev100`, the larger the shape, the brighter the light, because the total light energy increases with the shape's surface area. | `Candela`, `Lumens`, `Nit`, `Ev100` | `Lumens` |
| **Intensity** | The light energy output or brightness of the light in the selected photometric units that is provided by the Intensity Mode property. | 0 - 1e+06 | `100` |
| **Attenuation Radius** | See [Attenuation Radius properties](#attenuation-radius-properties) |  |  |
| **Both Directions** | Both Directions is available when a [Disk](/docs/user-guide/features/components/reference/shape/disk-shape), [Polygon Prism](/docs/user-guide/features/components/reference/shape/polygon-prism-shape), or [Quad](/docs/user-guide/features/components/reference/shape/quad-shape) Shape component is provided for the area light. Enable the Both Directions property to emit light from both sides of the shape. | Boolean | `Disabled` |
| **Fast Approximation** | Fast Approximation is available when a [Quad](/docs/user-guide/features/components/reference/shape/quad-shape) Shape component is provided for the area light. Enable the Fast Approximation property to use a fast, but lower quality, approximation for the lighting calculation, rather than the default high quality linear transformed cosine technique for Quad Shape area lights. | Boolean | `Disabled` |

## Attenuation Radius properties ##

![Area Light Attenuation Radius properties](/images/user-guide/features/components/reference/atom/area-light-component-ui-02.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Mode** | Specify whether attenuation is automatically calculated or explicitly set. Attenuation is the reduction of intensity of light energy as it travels, sometimes referred to as falloff.  | Automatic, Explicit | `Automatic` |
| **Radius** | When Mode is set to Explicit, Radius defines the attenuation distance for the light in meters. This is the distance from a given point on the surface of an area light beyond which the light has no effect. If the radius value is set too small for a bright light, it might result in non-photorealisitc attenuation. | 0 - Infinity | `0.5` |
