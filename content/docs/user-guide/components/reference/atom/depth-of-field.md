---
title: Depth of Field Component
linktitle: Depth of Field
description: "Open 3D Engine (O3DE) Depth of Field component reference."
toc: true
---

The **Depth of Field** component simulates the lens effects of real world cameras that focus on a specific area and blurs the out-of-focus areas. 


## Provider

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)

## Dependencies

[Camera component](/docs/user-guide/components/reference/camera/camera/)

[PostFX Layer component](/docs/user-guide/components/reference/atom/postfx-layer/)


## Base properties

![Depth of Field component properties](/images/user-guide/components/reference/atom/depth-of-field.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Camera Entity** | A reference to an entity that contains a **Camera** component. It's required to enable depth of field and configure the properties below. | An entity reference | Empty |
| **Overrides** | A collection of properties that you can override to compute the depth of field effect. |  |  |
| **Enable Depth of Field** | If enabled, depth of field is in effect. | Boolean | Enabled |
| **Quality Level** | Controls the quality of blur in the out-of-focus regions. A greater value leads to a higher quality Bokeh, but more performance load. | `0` to `1` | `1` |
| **Aperture F** | Controls the shallowness of the depth of field effect, which corresponds to the range of depth in the scene that's in-focus. Aperture F is measured by 1/F-Number. When this property is `0`, the F-Number is `256`. When it's `1`, the F-Number is `0.12`. | `0.00` to `1.00` | `0.50` |
| **F Number** | (Read-only) The value that corresponds to Aperture F. | `256.00` to `0.12` |  |
| **Focus Distance** | The distance in meters from the camera to the focused subject. This requires that Enable Auto Focus property is disabled. | -Infinite to Infinite  | `100.0` |
| **Auto Focus** | Refer to [Auto Focus properties](#auto-focus-properties). |  |  |
| **Debugging** | Enables coloring to debug the depth of field effect in the scene.<br><ul><li>**Red**: Back, large blur</li><li>**Orange**: Back, middle blur</li><li>**Yellow**: Back, small blur</li><li>**Green**: Focused area</li><li>**Blue green**: Front, small blur</li><li>**Blue**: Front, middle blur</li><li>**Purple**: Front, large blur</li></ul> | Boolean | Disabled |

## Auto Focus properties

| Property | Description | Values | Default |
|-|-|-|-|
| **Enable Auto Focus** | Enables the camera to automatically focus on a specified region. | Boolean | Enabled |
| **Focus Screen Position** | Specifies the screen-space position of focus in XY coordinates. (`0`,`0`) corresponds to the top-left corner of the screen; (`1`,`1`) corresponds to the bottom-right corner of the screen. | XY: `0.00` to `1.00` | (`0.5`,`0.5`) |
| **Auto Focus Sensitivity** | Simulates a hysteresis in focus, such that when the focus changes, there is a lag before the depth of field changes. A higher value leads to more responsiveness. A lower value requires a greater difference in depth before it can refocus. When the value is `1.0`, there is no lag. | `0.00` to `1.00` | `1.00` |
| **Auto Focus Speed** | Specifies the distance that focus moves per second. It normalizes the distance from the view near to view far as 1.0.  | `0.00` to `2.00` | `2.00` |
| **Auto Focus Delay** | Specifies time in seconds to delay the focus when it starts to shift from one target to another. | `0.00` to `1.00` | `1.00` |


## Usage

1. Create an entity and add a **Camera** component. This will be referred to as *camera entity* in the following steps. If you already have a camera entity, use that instead.

2. Add a Depth of Field component to the camera entity. Depth of field depends on the properties of the Camera component. This will also prompt you to add the PostFX Layer component, as the Depth of Field component depends on it. 

3. In the Depth of Field component:

   - Set the Camera Entity property to this camera entity.
  
   - Activate the Enable Depth of Field property

4. Configure the depth of field effect. The blur depends on two properties: the Depth of Field component's Aperture F property and the Camera component's Field of view property. The greater the Aperture F and the less the Field of view, the more blur.

5. You can see the blur level by enabling the Enable Debug Color property. Refer to the Debugging property in the [Base Properties](#base-properties) section for the color levels.
