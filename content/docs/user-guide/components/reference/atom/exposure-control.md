---
title: Exposure Control Component
linktitle: Exposure Control
description: 'Open 3D Engine (O3DE) Exposure Control component reference.'
toc: true
---

The **Exposure Control** component adjusts the amount of light from the scene that the camera receives, which controls how bright the scene appears. You can set the exposure manually, or use *Eye Adaptation* mode to automatically adjust camera exposure based on the scene's brightness. Eye Adaptation mode adjusts the scene to a neutral middle gray lightness. You can make further adjustments to the automatic exposure by increasing or decreasing the **Manual Compensation** property.


## Provider ##

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)


## Dependencies

[PostFX Layer](/docs/user-guide/components/reference/atom/postfx-layer)


## Properties

![Exposure Control interface](/images/user-guide/components/reference/atom/exposure-control/exposure-control-component-ui.png)

### Base properties

| Property | Description | Value | Default |
| - | - | - | - |
| **Enable** | Enables the exposure control properties. | Boolean | `Enabled`  |
| **Overrides - Enabled Override** | If enabled, you can override Exposure Control settings to have more control over how the PostFX behaves and looks. | Boolean | `Enabled` |
| **Control Type** | Specifies how to control the exposure value. <br><br>When **Control Type** is `Manual Only`, only the **Manual Compensation** value adjusts the exposure value of the scene by a constant amount. <br><br>When **Control Type** is `Eye Adaptation`, the scene's exposure automatically adjusts to a neutral middle gray lightness. Then, the exposure is further adjusted based on the **Manual Compensation**. | `Manual Only`, `Eye Adaptation` | `Manual Only` |
| **Manual Compensation** | Sets the exposure compensation value measured in exposure value stops. A lower value results in less exposure, rendering the scene darker. A higher value renders the scene brighter. | Float: -16.0 - 16.0 | `0.0` |
| **Eye Adaptation** | See [Eye Adaptation properties](#eye-adaptation-properties).  |   |   |


### Eye Adaptation properties

The following set of properties are active when **Control Type** is set to `Eye Adaptation`.

| Property | Description | Value | Default |
| - | - | - | - |
| **Minimum Exposure** | The minimum value that the exposure automatically adjusts to. | Float: -16.0 - 16.0 | `-16.0` |
| **Maximum Exposure** | The maximum value that the exposure automatically adjusts to. | Float: -16.0 - 16.0 | `16.0` |
| **Speed Up** |The speed at which automatic exposure adapts to brighter scenes. A higher value increases the speed. | Float: 0.01 - 10.0 | `3.0` |
| **Speed Down** | The speed at which automatic exposure adapts to darker scenes. A higher value increases the speed. | Float: 0.01 - 10.0 |  `1.0` |
| **Enable Heatmap** | Displays a histogram of the exposure values that the camera captures in the scene. It appears on top of the **Viewport**. You can move the camera to see the heatmap of other areas. Areas below the **Minimum Exposure** value are highlighted in blue, and areas above the **Maximum Exposure** value in red. The numbers on the heatmap represent exposure value stops. | None | `Disabled` |