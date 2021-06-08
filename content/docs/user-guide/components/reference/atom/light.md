---
title: Light component
linktitle: Light
description: ' Open 3D Engine (O3DE) Area Light component reference. '
weight: 100
toc: true
---

{{< preview-new >}}
The **Light** component simulates soft studio light by emitting light from a point in world space (point light) or geometric shape (area light) that's provided by a [Shape component](TBD). The Light component includes the following light types:
- **Point (Sphere), Point (Simple)**: Point lights cast light from an infinitely small point to all directions within a radius, similar to a lightbulb. Point lights are efficient and simple to compute. Point (Sphere) includes a Sphere shape component and enables shadows ... [todo]
- **Spot (Disk), Spot (Simple)**: Spot lights ... [todo]
- **Capsule**:
- **Quad**:
- **Polygon**:


## Provider

[Atom Gem](/docs/user-guide/gems/reference/atom)


## Dependencies

| Light Type | Dependency |
| - | - |
| **Point (Sphere)** | [Sphere Shape component](\docs\user-guide\components\reference\shape\sphere-shape.md) | 
| **Point (Simple)** | - | 
| **Spot (Disk)** | [Disk Shape component](\docs\user-guide\components\reference\shape\disk-shape.md) | 
| **Spot (Simple)** | - | 
| **Capsule** | [Capsule Shape component](\docs\user-guide\components\reference\shape\capsule-shape.md) | 
| **Quad** | [Quad Shape component](\docs\user-guide\components\reference\quad-shape.md) | 
| **Polygon** | [Polygon Prism Shape component](\docs\user-guide\components\reference\shape\polygon-prism-shape.md) |

## Properties
All light types have the properties listed below. Some light types have additional properties, which are listed in the [Light type additional properties](#light-type-additional-properties) section. 

### Base properties

| Property | Description | Values | Default |
|-|-|-|-|
|**Light Type** | The type of light can be a variation of a point light, a spot light, and an area light. Some of the light types depend on a Shape component. | `Point (Sphere)`, `Point (Simple)`, `Spot (Disk)`, `Spot (Simple)`, `Capsule`, `Quad`, `Polygon` | |
| **Color** | The color of the light. Color acts as a gel on a pure white light and reduces the total energy output of the light for any color other than pure white. For example, a 100 `Lumens` area light with a color setting of medium grey (18%) will only output 18 lumens of light. | Eight bits per channel color: 0-255 | `255,255,255` |
| **Intensity Mode** | The photometric unit of the light. `Candela` and `Lumens` specify the total amount of light energy that is emitted from the entire surface area of the shape. If `Candela` or `Lumens` is selected as the Intensity Mode, and Intensity is specified as 100.0, the larger the provided shape component, the dimmer the light will appear because the total light energy is spread over a larger surface area. `Nit` represents light energy as Candelas per square meter. `Ev100` represents light energy as an exposure value over an area. `Ev100` values are exponential, so a value of 5.0 `Ev100` will be twice as bright as a value of 4.0 `Ev100`. With `Nit` and `Ev100`, the larger the shape, the brighter the light, because the total light energy increases with the shape's surface area. | `Candela`, `Lumens`, `Nit`, `Ev100` | `Lumens` |
| **Intensity** | The light energy output or brightness of the light in the selected photometric units that is provided by the Intensity Mode property. | 0 - 1e+06 | `100` |
| **Attenuation Radius** | See [Attenuation Radius properties](#attenuation-radius-properties) for a specific light type. |  |  |
| **Shadows** | See [Shadows properties](#shadows-properties) for a specific light type. | |


### Attenuation Radius properties

![Area Light Attenuation Radius properties](/images/user-guide/components/reference/atom/area-light-component-ui-02.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Mode** | Specify whether attenuation is automatically calculated or explicitly set. Attenuation is the reduction of intensity of light energy as it travels, sometimes referred to as falloff.  | Automatic, Explicit | `Automatic` |
| **Radius** | When Mode is set to Explicit, Radius defines the attenuation distance for the light in meters. This is the distance from a given point on the surface of an area light beyond which the light has no effect. If the radius value is set too small for a bright light, it might result in non-photorealisitc attenuation. | 0 - Infinity | `0.5` |


### Shadows properties

| Property | Description | Values | Default |
|-|-|-|-|
| Pcf Method |  |  |  |


## Light type additional properties

Depending on the `Light Type` property, the Light component can have the additional following properties. 

{{< tabs name="light_types" >}}
{{% tab name="Point (Sphere)" %}}

No additional properties.

{{% /tab %}}
{{% tab name="Point (Simple)" %}}

No additional properties.

{{% /tab %}}
{{% tab name="Spot (Disk)" %}}


### Shutters properties

| Property | Description | Values | Default |
|-|-|-|-|
| Enable Shutters |  |  |  |
| Inner Angle |  |  |  |
| Outer Angle |  |  |  |

### Shadows properties

| Property | Description | Values | Default |
|-|-|-|-|
| Enable Shadow |  |  |  |
| Shadowmap Size |  |  |  |
| Shadow Filter Method |  |  |  |
| Softening Boundary Width |  |  |  |
| Prediction Sample Count |  |  |  |
| Filtering Sample Count |  |  |  |

{{% /tab %}}
{{% tab name="Spot (Simple)" %}}

### Shutters properties
| Property | Description | Values | Default |
|-|-|-|-|
| Enable Shutters |  |  |  |
| Inner Angle |  |  |  |
| Outer Angle |  |  |  |


{{% /tab %}}
{{% tab name="Capsule" %}}

No additional properties. 

{{% /tab %}}
{{% tab name="Quad" %}}

### Attenuation Radius properties

![Area Light Attenuation Radius properties](/images/user-guide/components/reference/atom/area-light-component-ui-02.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Both Directions** | Enable the Both Directions property to emit light from both sides of the shape. | Boolean | `Disabled` |
| **Fast Approximation** | Enable the Fast Approximation property to use a fast, but lower quality, approximation for the lighting calculation, rather than the default high quality linear transformed cosine technique for Quad Shape area lights. | Boolean | `Disabled` |


{{% /tab %}}
{{% tab name="Polygon" %}}

### Attenuation Radius properties

![Area Light Attenuation Radius properties](/images/user-guide/components/reference/atom/area-light-component-ui-02.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Fast Approximation** | Enable the Fast Approximation property to use a fast, but lower quality, approximation for the lighting calculation, rather than the default high quality linear transformed cosine technique for Quad Shape area lights. | Boolean | `Disabled` |

{{% /tab %}}
{{< /tabs >}}