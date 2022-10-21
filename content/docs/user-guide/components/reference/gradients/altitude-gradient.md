---
linktitle: Altitude Gradient
title: Altitude Gradient Component
description: Use the Altitude Gradient component to generate a gradient from an altitude range in Open 3D Engine (O3DE).
---

Add the **Altitude Gradient** component to generate a normalized gradient from an altitude range.  The output gradient may be optionally constrained by surface tags.

## Provider

[Gradient Signal Gem](/docs/user-guide/gems/reference/utility/gradient-signal)

## Altitude Gradient properties

![Altitude Gradient component properties](/images/user-guide/components/reference/gradients/altitude-gradient-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview** | Displays the output gradient of this component after all properties are applied. | | |
| **Pin Preview to Shape** | Sets an entity with a compatible Shape component to use as the bounds of the preview if **Constrain to Shape** is `Enabled`. | EntityId | Current Entity |
| **Preview Position** | Sets the world location of the preview.<br> <br>*This field is available only if there is no entity selected in **Pin Preview to Shape**.* | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Preview Size** | Sets the dimensions of the preview. | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Constrain to Shape** | If `Enabled`, the gradient preview uses the bounds of the entity selected in **Pin Preview to Shape**.<br> <br>*This field is available only if an entity is selected in **Pin Preview to Shape**.* | Boolean | `Disabled` |
| **Altitude Min** | Sets the minimum altitude that generates gradient values. | Float: -Infinity to Infinity | `0.0` |
| **Altitude Max** | Sets the maximum altitude that generates gradient values. | Float: -Infinity to Infinity | `128.0` |
| **Surface Tags to track** | An optional array of [surface tags](/docs/user-guide/gems/reference/environment/surface-data).  This component generates a gradient only where these surface tags exist. | Array: Surface Tags | None |

## SurfaceAltitudeGradientRequestBus

Use the following request functions with the `SurfaceAltitudeGradientRequestBus` EBus interface to communicate with Altitude Gradient components in your game.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `AddTag` | Adds a surface tag to the **Surface Tags to track** array. | Surface Tag: String | None | Yes |
| `GetAltitudeMax` | Returns the value of the **Altitude Max** property. | None | Altitude: Float | Yes |
| `GetAltitudeMin` | Returns the value of the **Altitude Min** property. | None | Altitude: Float | Yes |
| `GetNumTags` | Returns the number of tags in the **Surface Tags to track** array. | None | Count: Integer | Yes |
| `GetShapeEntityId` | Returns the value of the **Pin Preview to Shape** property. | None | EntityId | Yes |
| `GetTag` | Returns the surface tag at the specified index of the **Surface Tags to track** array. | Surface Tag Index: Integer | Surface Tag: String | Yes |
| `RemoveTag` | Removes the surface tag at the specified index of the **Surface Tags to track** array. | Surface Tag Index: Integer | None | Yes |
| `SetAltitudeMax` | Sets the value of the **Altitude Max** property. | Altitude: Float | None | Yes |
| `SetAltitudeMin` | Sets the value of the **Altitude Min** property. | Altitude: Float | None | Yes |
| `SetShapeEntityId` | Sets the value of the **Pin Preview to Shape** property. | EntityId | None | Yes |
