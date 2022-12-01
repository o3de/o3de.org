---
linktitle: Surface Mask Gradient
title: Surface Mask Gradient Component
description: Use the Surface Mask Gradient component to generate a gradient from surface mask weights in Open 3D Engine (O3DE).
---

Add the **Surface Mask Gradient** component to generate a normalized gradient from a list of surface tags.  The corresponding surface mask weights are used to generate the output gradient.

## Provider

[Gradient Signal Gem](/docs/user-guide/gems/reference/utility/gradient-signal)

## Surface Mask Gradient properties

![Surface Mask Gradient component properties](/images/user-guide/components/reference/gradients/surface-mask-gradient-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview** | Displays the output gradient of this component after all properties are applied. | | |
| **Pin Preview to Shape** | Sets an entity with a compatible Shape component to use as the bounds of the preview if **Constrain to Shape** is `Enabled`. | EntityId | Current Entity |
| **Preview Position** | Sets the world location of the preview.<br> <br>*This field is available only if there is no entity selected in **Pin Preview to Shape**.* | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Preview Size** | Sets the dimensions of the preview. | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Constrain to Shape** | If `Enabled`, the gradient preview uses the bounds of the entity selected in **Pin Preview to Shape**.<br> <br>*This field is available only if an entity is selected in **Pin Preview to Shape**.* | Boolean | `Disabled` |
| **Surface Tag List** | An array of [surface tags](/docs/user-guide/gems/reference/environment/surface-data) to generate a gradient for. | Array: Surface Tags | None |

## SurfaceMaskGradientRequestBus

Use the following request functions with the `SurfaceMaskGradientRequestBus` EBus interface to communicate with Surface Mask Gradient components in your game.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `AddTag` | Adds a surface tag to the **Surface Tag List** array. | Surface Tag: String | None | Yes |
| `GetNumTags` | Returns the number of tags in the **Surface Tag List** array. | None | Count: Integer | Yes |
| `GetTag` | Returns the surface tag at the specified index of the **Surface Tag List** array. | Surface Tag Index: Integer | Surface Tag: String | Yes |
| `RemoveTag` | Removes the surface tag at the specified index of the **Surface Tag List** array. | Surface Tag Index: Integer | None | Yes |
