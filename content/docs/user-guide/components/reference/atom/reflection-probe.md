---
title: Reflection Probe component
linktitle: Reflection Probe
description: 'Open 3D Engine (O3DE) Reflection Probe component reference.'
toc: true
---

{{< preview-new >}}

The **Reflection Probe** creates specular reflections in the environment around a probe (capture point). A *probe* stores information about the surrounding environment as a cubemap. Then, it applies the cubemap to meshes that are located inside the probe's volume. This allows the mesh to display environment reflections based on its location in the environment.


## Provider ##

[Atom Gem](/docs/user-guide/gems/reference/atom)

## Dependencies
[Box Shape component](/docs/user-guide/components/reference/shape/box-shape.md)


## Properties

![Reflection Probe component properties](/images/user-guide/components/reference/atom/reflection-probe-component-ui.png)
 
### Cubemap Bake
| Property | Description | Values | Default |
|-|-|-|-|
| **Bake Reflection Probe** | Bakes the surrounding environment to a cubemap. | - | - |

### Inner Extents
| Property | Description | Values | Default |
|-|-|-|-|
| **Height** | The height of the reflection probe's inner volume. The height is dependent on the **Box Shape** component's dimension along the z-axis. | `0` to the Box Shape component's `Dimensions-Z` property | The value of the Box Shape component's `Dimensions-Z` property. |
| **Length** | The length of the reflection probe's inner volume. The length is dependent on the Box Shape component's dimension along the y-axis. | `0` to the Box Shape component's `Dimensions-Y` property| The value of the Box Shape component's `Dimensions-Y` property. |
| **Width** | The width of the reflection probe's inner volume. The width is dependent on the Box Shape component's dimension along the x-axis. | `0` to the Box Shape component's `Dimensions-X` property| The value of the Box Shape component's `Dimensions-X` property. |

### Settings

| Property | Description | Values | Default |
|-|-|-|-|
| **Parallax Correction** | Corrects the reflection by adjusting an offset from the capture position. | Boolean | `Enabled` |
| **Show Visualization** |  Shows a sphere to visualize the probe. |  Boolean | `Enabled` |

### Cubemap

| Property | Description | Values | Default |
|-|-|-|-|
| **Use Baked Cubemap** | If enabled, uses a baked cubemap to create reflections. | Boolean | `Enabled` |
| **Baked Cubemap Quality** | The resolution of the baked cubemap. | `Very Low`, `Low`, `Medium`, `High`, `Very High` | `Medium` |
| **Baked Cubemap path** |  The path to the baked cubemap file. When you bake a cubemap, this property automatically generates the path to the cubemap file. | - | - |
