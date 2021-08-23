---
title: Diffuse Probe Grid Component
linktitle: Diffuse Probe Grid
description: "Open 3D Engine (O3DE) Diffuse Probe Grid component reference."
toc: true
---

The **Diffuse Probe Grid** component creates a volume of light probes that provide diffuse global illumination (GI) within the specified area. Each probe in the volume uses real-time ray tracing to capture the *irradiance*, or surrounding diffuse light environment. Real-time ray tracing casts several hundred rays in different directions around each probe. Each ray has a maximum length of 20 meters. At each point of intersection between the ray and the surrounding geometry, the probe stores lighting information. Then, it creates an irradiance texture out of the ray traced data and applies the texture to each mesh.

## Provider

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)

## Dependencies

[Box Shape component](/docs/user-guide/components/reference/shape/box-shape/)

## Properties

![Diffuse Probe Grid component properties](/images/user-guide/components/reference/atom/diffuse-probe-grid-component-ui.png)

### Bake Textures

| Property | Description | Values | Default |
|-|-|-|-|
| **Bake Textures** | Bakes the surrounding diffuse light environment to a texture that'll be used when **Editor Mode** or **Runtime Mode** is set to `Baked`. You can only bake textures when Editor Mode or Runtime Mode is set to `Real Time (Ray-Traced)`. | - | - |

### Probe Spacing

Probe spacing is the distance between probes (in meters) along each axis within the volume. Less spacing results in more probes, which increases the fidelity of the GI at the expense of performance and memory. The maximum extents of the space depends on the **Box Shape** component's dimension.

| Property | Description | Values | Default |
|-|-|-|-|
| **X-Axis** | The amount of space between probes along the x-axis. The space must be within the Box Shape component's dimension along the x-axis. | `0.0` to the Box Shape component's `Dimensions`-`X` property. | `2.0` |
| **Y-Axis** | The amount of space between probes along the y-axis. The space must be within the Box Shape component's dimension along the y-axis. | `0.0` to the Box Shape component's `Dimensions`-`Y` property. | `2.0` |
| **Z-Axis** | The amount of space between probes along the z-axis. The space must be within the Box Shape component's dimension along the z-axis. | `0.0` to the Box Shape component's `Dimensions`-`Z` property. | `2.0` |

### Grid Settings

| Property | Description | Values | Default |
|-|-|-|-|
| **Ambient Multiplier** | Increases the strength of GI within the volume. It can be used to fine-tune the scene's lighting or make the GI more visible to debug. | `0.0` to `10.0` | `1.0` |
| **View Bias** | Fine-tuned adjustment for eliminating visual artifacts that may appear due to the probes' positions. | `0.0` to `1.0` | `0.2` |
| **Normal Bias** | Fine-tuned adjustment for the surface-to-light secondary raycast, which is used to determine if the surface point is affected by a direct light. Increasing the normal bias moves the start point of the raycast farther away from the surface, which makes it more likely to be affected by direct light. | `0.0` to `1.0` | `0.1` |
| **Editor Mode** | Controls whether the **Editor** uses real-time or baked diffuse GI. `Real Time (Ray-Traced)` requires a GPU capable of ray tracing. `Auto Select` uses `Baked` as a fallback, if ray tracing is not available. Refer to [Global illumination modes](#global-illumination-modes). | `Real Time (Ray-Traced)`, `Baked`, `Auto Select` |`Real Time (Ray-Traced)` |
| **Runtime Mode** | Controls whether the standalone runtime uses real-time or baked diffuse GI. `Real Time (Ray-Traced)` requires a GPU capable of ray tracing. `Auto Select` uses `Baked` as a fallback, if ray tracing is not available. Refer to [Global illumination modes](#global-illumination-modes). | `Real Time (Ray-Traced)`, `Baked`, `Auto Select` |`Real Time (Ray-Traced)` |

## Global illumination modes

You can adjust how GI is processed in the Editor and the standalone runtime by adjusting the `Editor Mode` and `Runtime Mode` properties. There are three modes:

- **Real Time (Ray-Traced)**: Constantly updates in response to changes in the surrounding geometry and lights. It requires a GPU that is capable of real-time ray tracing using DXR or Vulkan-RT. This mode is best for editing your scene, but it can reduce performance depending on your GPU and the complexity of the meshes in your scene. 

- **Baked**: Uses lighting information that was previously captured and stored in textures using the `Bake Textures` button. It can significantly improve performance and allow diffuse GI on machines that don't have a GPU capable of real-time ray tracing. 

- **Auto Select**: Determines which mode to use based on the capability of the GPU in your machine. This allows you to provide real-time ray traced diffuse GI on machines that support it, but also allows baked diffuse GI as a fallback.

There are a variety of configuration setups for Editor and runtime:

- **Editor Real-Time and Runtime Baked**: The Editor updates with real-time diffuse GI, while the runtime uses baked diffuse GI for best performance. Note that the textures must be explicitly baked to allow the runtime to operate in `Baked` mode.
  
- **Editor Real-Time and Runtime Auto Select**: The Editor uses real-time ray tracing for the best editing experience, while the runtime chooses between real-time ray tracing or baked, depending on the GPU's capability.

- **Editor Baked and Runtime Baked**: Both the Editor and the runtime use baked diffuse GI for maximum performance. The textures can be explicitly baked at the appropriate time by temporarily switching the Editor Mode to `Real Time (Ray-Traced)` and baking the textures.
  