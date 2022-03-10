---
title: Exposure Control Component
linktitle: Exposure Control
description: 'Open 3D Engine (O3DE) Exposure Control component reference.'
toc: true
---

The **Exposure Control** component adjusts the amount of light the camera exposes in the scene, which controls how bright the scene appears. You can set the exposure manually or automatically using **Eye Adaptation** mode.


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
| **Control Type** | Specifies how to control the exposure value. When **Control Type** is `Manual Only`, only the **Manual Compensation** value defines the exposure value in the scene. The exposure value remains constant, despite changes in brightness in the scene that's captured by the camera. When **Control Type** is `Eye Adaptation`, The exposure of the scene is both defined by the **Manual Compensation** and automatically adjusted based on the brightness of the scene captured by the camera. | `Manual Only`, `Eye Adaptation` | `Manual Only` |
| **Overrides - Enabled Override** | If enabled, all Exposure Control component properties will be set to the values specified in the Overrides property group. | Boolean | `Enabled` |
| **Manual Compensation** | Sets the exposure compensation value. The exposure value unit is EV100 (an EV with 100 international standards organization (ISO)). When the manual compensation is lower, the exposure of the scene decreases, rendering the scene darker. A higher manual compensation renders the scene brighter. Manual Compensation is active in Manual Only and Eye Adaptation mode. | Float: -16.0 - 16.0 | `0.0` |
| **Eye Adaptation** | See [Eye Adaptation properties](#eye-adaptation-properties).  |   |   |


### Eye Adaptation properties

The following set of properties are active when **Control Type** is set to `Eye Adaptation`.

| Property | Description | Value | Default |
| - | - | - | - |
| **Minimum Exposure** | Minimum exposure value for the auto exposure. | Float: -16.0 - 16.0 | `-16.0` |
| **Maximum Exposure** | Maximum exposure value for the auto exposure. | Float: -16.0 - 16.0 | `16.0` |
| **Speed Up** |The speed at which auto exposure adapts to bright scenes. A higher value increases the speed. | Float: 0.01 - 10.0 | `3.0` |
| **Speed Down** | The speed at which auto exposure adapts to dark scenes. A higher value increases the speed. | Float: 0.01 - 10.0 |  `1.0` |
| **Enable Heatmap** | Provides information regarding the exposure values that the camera captures in the scene. It appears on top of the **Viewport**. You can move the camera to see the heatmap of other areas. Areas below the **Minimum Exposure** value are highlighted in blue, and areas above the **Maximum Exposure** value in red. | None | None |