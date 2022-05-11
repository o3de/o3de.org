---
title: Deferred Fog Component
linktitle: Deferred Fog
description: Create a scene fog or layered/ground fog effect with the Deferred Fog component in Open 3D Engine (O3DE).
toc: true
---

The **Deferred Fog** component creates a screen space fog effect that can be used as scene fog or layered/ground fog. You can add optional *cloud turbulence* to the fog using a noise texture.

Cloud turbulence is implemented by ray marching along the fog layer and combining two moving noise octaves, creating a "cloudy" fog look. You can configure each octave by scaling the UV coordinates of the noise texture and defining the velocity of the texture's movement. You can also specify the amount of blend between the two octaves.

{{< note >}}
At this time, Deferred Fog does not interact with lighting.
{{< /note >}}


![Example of fog layer with turbulence](/images/user-guide/components/reference/atom/deferred-fog/basic-example.png)

## Provider ##

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)


## Dependencies

[PostFX Layer component](./postfx-layer)


## Properties


![Deferred Fog component interface](/images/user-guide/components/reference/atom/deferred-fog/deferred-fog-component-ui.png)

| Property | Description | Value | Default |
| - | - | - | - |
| **Fog Color** | The color of the fog that gradually blends with the scene. The color becomes more opaque as the fog blends towards the **Fog End Distance**.  | Color | R: `115`, G: `115`, B: `153` |
| **Fog Start Distance** | The distance from the viewer, measured in meters, at which the fog starts. At this distance, the fog begins to gradually blend with the scene until it completely masks the background scene at the **Fog End Distance**. | Float: 0.0 - 5000.0 | `1.0` |
| **Fog End Distance** | The distance from the viewer, measured in meters, at which the fog completely masks out the background scene. From the **Fog Start Distance** to the **Fog End Distance**, the fog blends with the scene, creating a gradual transition between the scene and the masked layer of fog. At and beyond this distance, the scene appears a solid color, completely masked by the fog layer.  | Float: 0.0 - 5000.0 | `5.0` |
| **Fog Bottom Height** | The height of the bottom of the fog layer, measured in meters, when **Enable Fog Layer** is activated. | Float: -5000.0 - 5000.0 | `0.01` |
| **Fog Max Height** | The height of the top of the fog layer, measured in meters, when **Enable Fog Layer** is activated. | Float: -5000.0 - 5000.0 | `1.0` |
| **Noise Texture** | A single-channel noise texture that defines the appearance of the fog turbulence, when **Enable Turbulence Properties** is activated. | A `.streamingimage` product asset.  | `textures/cloudnoise_01.jpg.streamingimage` |
| **Noise Texture First Octave** | Scales the UV coordinates of the **Noise Texture** for the first octave. | Vector2: -Infinity to Infinity | X: `0.01`, Y: `0.01` |
| **Noise Texture First Octave Velocity** | The velocity of the noise texture's movement for the first octave, measured in meters per second. | Vector2: -Infinity to Infinity | X: `0.002`, Y:`0.0032` |
| **Noise Texture Second Octave** | Scales the UV coordinates of the **Noise Texture** for the second octave. | Vector2: -Infinity to Infinity | X: `0.0239`, Y: `0.0239` |
| **Noise Texture Second Octave Velocity** | The velocity of the noise texture's movement for the second octave, measured in meters per second. | Vector2: -Infinity to Infinity | X: `0.00275`, Y: `-0.004` |
| **Octaves Blend Factor** |The amount of blend between the first and second octaves. A value of `1` displays only the first octave, while a value of `0` displays only the second octave. | Float: 0.0 - 1.0 | `0.4` |
| **Enable Fog Layer** | If enabled, the fog is constrained between two points along the Z-axis, from **Fog Bottom Height** to **Fog Max Height**. | Boolean | `False` |
| **Enable Deferred Fog** | If enabled, activates the fog effect in the scene. | Boolean | `False` |
| **Enable Turbulence Properties** | If enabled, creates cloud turbulence in the fog by using **Noise Texture**. Generate variations of cloud turbulence by configuring the first and second octaves.  | Boolean  | `False`  |
