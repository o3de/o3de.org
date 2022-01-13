---
linktitle: Constant Gradient
title: Constant Gradient Component
description: Use the Constant Gradient component to generate a gradient with the same value in Open 3D Engine (O3DE).
---

Add the **Constant Gradient** component to create an output gradient with the same value.

## Provider

[Gradient Signal Gem](/docs/user-guide/gems/reference/utility/gradient-signal)

## Constant Gradient properties

![Constant Gradient component properties](/images/user-guide/components/reference/gradients/constant-gradient-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview** | Displays the output gradient of this component after all properties are applied. | | |
| **Pin Preview to Shape** | Sets an entity with a compatible Shape component to use as the bounds of the preview if **Constrain to Shape** is `Enabled`. | EntityId | Current Entity |
| **Preview Position** | Sets the world location of the preview.<br> <br>*This field is available only if there is no entity selected in **Pin Preview to Shape**.* | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Preview Size** | Sets the dimensions of the preview. | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Constrain to Shape** | If `Enabled`, the gradient preview will use the bounds of the entity selected in **Pin Preview to Shape**.<br> <br>*This field is available only if an entity is selected in **Pin Preview to Shape**.* | Boolean | `Disabled` |
| **Value** | Sets the single value that this gradient returns. | Float: 0.0 - 1.0 | `1.0` |

## ConstantGradientRequestBus

Use the following request functions with the `ConstantGradientRequestBus` EBus interface to communicate with Constant Gradient components in your game.

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetConstantValue` | Returns the value of the **Value** property. | None | Constant Value: Float | Yes |
| `SetConstantValue` | Sets the value of the **Value** property. | Constant Value: Float | None | Yes |
