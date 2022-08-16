---
title: Reflection Probe Component
linktitle: Reflection Probe
description: 'Open 3D Engine (O3DE) Reflection Probe component reference.'
toc: true
---

A **Reflection Probe** applies specular reflections to meshes that are inside the volume of the probe.  The reflections are stored as a cubemap, using the entity position of the Reflection Probe as the capture point when it is baked.  

Each Reflection Probe consists of two volumes: an outer volume, specified using a Box shape component, and an inner volume.  The outer volume defines the total area affected by the probe and is subject to **blending** with other overlapping probe volumes and the [Global IBL](/docs/user-guide/components/reference/atom/global-skylight-ibl) specular cubemap.  The inner volume defines the area that renders exclusively with the probe cubemap, meaning there is no blending from other probes or Global IBL.  Note that the smallest volume is used if multiple probe inner volumes overlap.


## Provider

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom)


## Dependencies

[Box Shape component](/docs/user-guide/components/reference/shape/box-shape/)


## Properties

![Reflection Probe component properties](/images/user-guide/components/reference/atom/reflection-probe-component-ui.png)
 

### Inner Extents properties

| Property | Description | Values | Default |
|-|-|-|-|
| **Height** | The height of the reflection probe's inner volume. The height is dependent on the **Box Shape** component's dimension along the z-axis. | `0` to the Box Shape component's `Dimensions`-`Z` property | The value of the Box Shape component's `Dimensions`-`Z` property. |
| **Length** | The length of the reflection probe's inner volume. The length is dependent on the Box Shape component's dimension along the y-axis. | `0` to the Box Shape component's `Dimensions`-`Y` property| The value of the Box Shape component's `Dimensions`-`Y` property. |
| **Width** | The width of the reflection probe's inner volume. The width is dependent on the Box Shape component's dimension along the x-axis. | `0` to the Box Shape component's `Dimensions`-`X` property| The value of the Box Shape component's `Dimensions`-`X` property. |

### Settings properties

| Property | Description | Values | Default |
|-|-|-|-|
| **Parallax Correction** | Corrects the reflection by adjusting an offset from the capture position. | Boolean | `Enabled` |
| **Show Visualization** |  Shows a sphere to visualize the probe. |  Boolean | `Enabled` |
| **Exposure** |  The exposure to use when applying the reflection cubemap to the scene. | `-5.0` to `5.0` | `0.0` |

### Cubemap Bake properties

| Property | Description | Values | Default |
|-|-|-|-|
| **Bake Reflection Probe** | Bakes the surrounding environment to a cubemap. | - | - |
| **Bake Exposure** |  The exposure to use when baking the reflection cubemap. | `-16.0` to `16.0` | `0.0` |

### Cubemap properties

| Property | Description | Values | Default |
|-|-|-|-|
| **Use Baked Cubemap** | If enabled, uses a baked cubemap to create reflections. | Boolean | `Enabled` |
| **Baked Cubemap Quality** | The resolution of the baked cubemap. | `Very Low`, `Low`, `Medium`, `High`, `Very High` | `Medium` |
| **Baked Cubemap path** |  The path to the baked cubemap file. When you bake a cubemap, this property automatically generates the path to the cubemap file. | - | - |
