---
title: Light component
linktitle: Light
description: ' Open 3D Engine (O3DE) Area Light component reference. '
weight: 100
toc: true
---

{{< preview-new >}}
The **Light** component simulates soft studio light by allowing creation of various types of punctual and area lights. The types of lights available are Point (sphere), Point (simple punctual), Spot (disk), Spot (simple punctual), Capsule, Quad, and Polygon. 
- Point (sphere), Spot (disk), Capsule, Quad, and Polygon are area lights. They most accurately simulate real world light sources.
- Point (simple punctual) and Spot (simple punctual) are punctual lights, which are infinitesimally small lights. They are slightly more performant than their area light counterparts, but produce simpler light effects.
- Point (sphere) and Spot (disk) light types support shadow effects.
- Quad and Polygon light types can emit light from one or both directions. 
- Quad light type optionally supports fast approximation, which produces a more efficient but lower quality light effect. 
- Polygon light type can be significantly more expensive as the points in the polygon shape increases.



## Provider

[Atom Gem](/docs/user-guide/gems/reference/atom)


## Dependencies

| Light Type | Dependency |
| - | - |
| Point (sphere) | [Sphere Shape component](\docs\user-guide\components\reference\shape\sphere-shape.md) | 
| Point (simple punctual) | - | 
| Spot (disk) | [Disk Shape component](\docs\user-guide\components\reference\shape\disk-shape.md) | 
| Spot (simple punctual) | - | 
| Capsule | [Capsule Shape component](\docs\user-guide\components\reference\shape\capsule-shape.md) | 
| Quad | [Quad Shape component](\docs\user-guide\components\reference\shape\quad-shape.md) | 
| Polygon | [Polygon Prism Shape component](\docs\user-guide\components\reference\shape\polygon-prism-shape.md) |



## Properties
{{< tabs name="light-component-ui" >}}
{{% tab name="Default" %}}

![light-component-default-light-type](/images/user-guide/components/reference/atom/light-component-ui/default.jpg)

{{% /tab %}}
{{% tab name="Point (sphere)" %}}

![light-component-point-sphere-light-type](/images/user-guide/components/reference/atom/light-component-ui/point-sphere.jpg)

{{% /tab %}}
{{% tab name="Point (simple punctual)" %}}

![light-component-point-simple-punctua-light-type](/images/user-guide/components/reference/atom/light-component-ui/point-simple-punctual.jpg)

{{% /tab %}}
{{% tab name="Spot (disk)" %}}

![light-component-spot-disk-light-type](/images/user-guide/components/reference/atom/light-component-ui/spot-disk.jpg)

{{% /tab %}}
{{% tab name="Spot (simple punctual)" %}}

![light-component-spot-simple-punctual-light-type](/images/user-guide/components/reference/atom/light-component-ui/spot-simple-punctual.jpg)

{{% /tab %}}
{{% tab name="Capsule" %}}

![light-component-capsule-light-type](/images/user-guide/components/reference/atom/light-component-ui/capsule.jpg)

{{% /tab %}}
{{% tab name="Quad" %}}

![light-component-quad-light-type](/images/user-guide/components/reference/atom/light-component-ui/quad.jpg)

{{% /tab %}}
{{% tab name="Polygon" %}}

![light-component-polygon-light-type](/images/user-guide/components/reference/atom/light-component-ui/polygon.jpg)

{{% /tab %}}
{{< /tabs >}}


### Base properties

| Property | Description | Values | Default |
|-|-|-|-|
|**Light Type** | Specify the type of light. The properties vary for each light type.  | `Point (Sphere)`, `Point (Simple)`, `Spot (Disk)`, `Spot (Simple)`, `Capsule`, `Quad`, `Polygon` | - |
| **Color** | The color of the light. Color acts as a gel on a pure white light and reduces the total energy output of the light for any color other than pure white. For example, a 100 `Lumens` area light with a color setting of medium grey (18%) will only output 18 lumens of light. | Eight bits per channel color: `0` to `255` | `255,255,255` |
| **Intensity Mode** | The photometric unit of the light. `Candela` and `Lumens` specify the total amount of light energy that is emitted from the entire surface area of the shape. If `Candela` or `Lumens` is selected as the Intensity Mode, and Intensity is specified as 100.0, the larger the provided shape component, the dimmer the light will appear because the total light energy is spread over a larger surface area. `Nit` represents light energy as Candelas per square meter. `Ev100` represents light energy as an exposure value over an area. `Ev100` values are exponential, so a value of 5.0 `Ev100` will be twice as bright as a value of 4.0 `Ev100`. With `Nit` and `Ev100`, the larger the shape, the brighter the light, because the total light energy increases with the shape's surface area. | `Candela`, `Lumens`, `Nit`, `Ev100` | `Lumens` |
| **Intensity** | The light energy output or brightness of the light in the selected photometric units that is provided by the Intensity Mode property. | `0` to `1e+06` | `100` |
| **Attenuation Radius** | Refer to [Attenuation Radius properties](#attenuation-radius-properties) below. | Boolean | `Disabled` |
| **Shadows** | Refer to [Shadows properties](#shadows-properties) below. | Boolean | `Disabled` |
| **Shutters** | Refer to [Shutters properties](#shutters-properties) below. | Boolean | `Disabled` |
| **Both Directions** | Enable this property to emit light from both sides of the shape. <br> <br>*This field is only available for Quad and Polygon light types.* | Boolean | `Disabled` |
| **Fast Approximation** | Enable this property to use a fast, but lower quality, approximation for the lighting calculation, rather than the default high quality linear transformed cosine technique. <br> <br>*This field is only available for the Quad light type.* | Boolean | `Disabled` |


### Attenuation Radius properties

| Property | Description | Values | Default |
|-|-|-|-|
| **Mode** | Specify whether attenuation is automatically calculated or explicitly set. Attenuation is the reduction of intensity of light energy as it travels, sometimes referred to as falloff.  | `Automatic`, `Explicit` | `Automatic` |
| **Radius** | Define the attenuation distance for the light in meters. This is the distance from a given point on the surface of an area light beyond which the light has no effect. If the radius value is set too small for a bright light, it might result in non-photorealisitc attenuation. <br> <br>*This field is only available is Mode is set to `Explicit`.* | `0` to infinity | `0.5` |


### Shadows properties
*Shadow properties are only available for Spot (disk) and Point (sphere) light types.* 

| Property | Description | Values | Default |
|-|-|-|-|
| **Enable shadow** | Enable shadow effects. | Boolean | `Disabled` |
| **Shadowmap size** | Set the width and height of the shadowmap. A higher size leads to a more detailed shadow effect.| `256`, `512`, `1024`, `2048` | `256` |
| **Shadow filter method** | Set the shadow filtering method to reduce aliasing in the shadow map. The supported methods are Percentage-Closer Filtering (PCF) or Exponential Shadow Maps (ESM). `ESM+PCF` uses ESM, but falls back to PCF in areas where ESM might fail. | `None`, `PCF`, `ESM`, `ESM+PCF` | `None` |
| **Softening boundary width** | Set the width in meters of the boundary between the shadowed and the lit area to adjust the softness of the shadow edges. If width is 0, the soft edge is disabled. <br> <br>*This field is only available if Pcf method is set to `BoundarySearch`.* | `0` to `1` meter | `0.25`|
| **Prediction sample count** | The sample count used to predict whether the pixel is on the boundary. <br> <br>*This field is only available if Pcf method is set to `BoundarySearch`.* | `0` to `16` | `4` |
| **Filtering sample count** | The sample count used to filter the shadow boundary. <br> <br>*This field is only available if Shadowmap filter method is set to PCF or `ESM+PCF`.* | `0` to `64` | `12` |
| **Pcf method** | Boundary Search is a technique that performs a variable number of taps: the first tap is to determine if we are on a shadow boundary, then the remaining taps are to find the occlusion amount. Bicubic is a technique that uses a fixed size PCF kernel with kernel weights set to approximate bicubic filtering. <br> <br>*This field is only available if Shadowmap filter method is set to PCF or `ESM+PCF`.* | `BoundarySearch`, `Bicubic` | `Bicubic` |

### Shutters properties
Shutter properties are only available for Spot (disk) and Spot (simple punctual). 

| Property | Description | Values | Default |
|-|-|-|-|
| **Enable Shutters** | Enable shutters to constrain the light to a cone-shape. <br> <br>*This field is only available for Spot (simple) light type.* | Boolean | `Disabled` |
| **Inner Angle** | Set the inner cone angles in degrees. | `0.0` to `180.0` degrees (angles) | `35.0` |
| **Outer Angle** | Set the outer cone angles in degrees. | `0.0` to `180.0` degrees (angles) | `45.0` |


## Notes
- For shadow effects, the properties and filter methods have varying impacts on performance and quality. The best compromise between performance and quality is to use PCF with the bicubic method.

- A shadowmap size of 512 produces a balanced result between quality and performance. 256 produces lower quality shadows. 1024 and 2048 produces excellent quality but is less efficient.
  
- When editing Light components, enable **Debug Helpers** in the **Viewport** to see the shape and direction of the light. 
