---
linktitle: Slope Gradient
title: Slope Gradient Component
description: Use the Slope Gradient component to generate a gradient from a range of surface slopes in Open 3D Engine (O3DE).
---

Add the **Slope Gradient** component to generate a normalized gradient from a slope range.  The output gradient may be optionally constrained by surface tags.

## Provider

[Gradient Signal Gem](/docs/user-guide/gems/reference/utility/gradient-signal)

## Slope Gradient properties

![Slope Gradient component properties](/images/user-guide/components/reference/gradients/slope-gradient-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview** | Displays the output gradient of this component after all properties are applied. | | |
| **Pin Preview to Shape** | Sets an entity with a compatible Shape component to use as the bounds of the preview if **Constrain to Shape** is `Enabled`. | EntityId | Current Entity |
| **Preview Position** | Sets the world location of the preview.<br> <br>*This field is available only if there is no entity selected in **Pin Preview to Shape**.* | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Preview Size** | Sets the dimensions of the preview. | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Constrain to Shape** | If `Enabled`, the gradient preview uses the bounds of the entity selected in **Pin Preview to Shape**.<br> <br>*This field is available only if an entity is selected in **Pin Preview to Shape**.* | Boolean | `Disabled` |
| **Surface Tags to track** | An optional array of [surface tags](/docs/user-guide/gems/reference/environment/surface-data).  This component will generate a gradient only where these surface tags exist. | Array: Surface Tags | None |
| **Slope Min** | Sets the minimum surface slope angle that generates a gradient value. | Float: 0.0 - 90.0 | `0.0` |
| **Slope Max** | Sets the maximum surface slope angle that generates a gradient value. | Float: 0.0 - 90.0 | `20.0` |
| **Ramp Type** | Sets the function used to interpolate between slope ranges. | `Linear Ramp Down`, `Linear Ramp Up`, or `Smooth Step` | `Linear Ramp Down` |
| **Smooth Step Settings** | Refer to [Smooth Step Settings properties](#smooth-step-settings-properties) below. 

### Smooth Step Settings properties
*Smooth Step Settings properties are available only for **Ramp Type** `Smooth Step`.*

| Property | Description | Values | Default |
|-|-|-|-|
| **Falloff Midpoint** | Sets the midpoint of falloff values. | Float: 0.0 - 1.0 | `0.5` |
| **Falloff Range** | Sets the range of falloff. | Float: 0.0 - 1.0 | `0.5` |
| **Falloff Softness** | Sets the amount of smoothing applied to falloff values. | Float: 0.0 - 1.0 | `0.25` |

## SurfaceSlopeGradientRequestBus

Use the following request functions with the `SurfaceSlopeGradientRequestBus` EBus interface to communicate with Slope Gradient components in your game.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `AddTag` | Adds a surface tag to the **Surface Tags to track** array. | Surface Tag: String | None | Yes |
| `GetNumTags` | Returns the number of tags in the **Surface Tags to track** array. | None | Count: Integer | Yes |
| `GetRampType` | Returns the value of the **Ramp Type** property. | None | Ramp Type Index: Integer | Yes |
| `GetSlopeMax` | Returns the value of the **Slope Max** property. | None | Float | Yes |
| `GetSlopeMin` | Returns the value of the **Slope Min** property. | None | Float | Yes |
| `GetTag` | Returns the surface tag at the specified index of the **Surface Tags to track** array. | Surface Tag Index: Integer | Surface Tag: String | Yes |
| `RemoveTag` | Removes the surface tag at the specified index of the **Surface Tags to track** array. | Surface Tag Index: Integer | None | Yes |
| `SetRampType` | Sets the value of the **Ramp Type** property. | Ramp Type Index: Integer | None | Yes |
| `SetSlopeMax` | Sets the value of the **Slope Max** property. | Float | None | Yes |
| `SetSlopeMin` | Sets the value of the **Slope Min** property. | Float | None | Yes |
