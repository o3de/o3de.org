---
linktitle: Slope Gradient
title: Slope Gradient Component
description: ' Using Gradients components in Open 3D Engine (O3DE). '
---

## Provider

[Gradient Signal Gem](/docs/user-guide/gems/reference/utility/gradient-signal)

## Slope Gradient properties

![Slope Gradient component properties](/images/user-guide/components/reference/gradients/slope-gradient-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview** | Displays the outbound gradient of this component after all properties are applied. | | |
| **Preview Settings** |  |  |  |
| **Pin Preview to Shape** | Sets an entity with a compatible Shape component to use as the bounds of the preview if **Constrain to Shape** is `Enabled`. | EntityId | Current Entity |
| **Preview Position** | Sets the world location of the preview.<br> <br>*This field is available only if there is no entity selected in **Pin Preview to Shape**.* | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Preview Size** | Sets the dimensions of the preview. | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Constrain to Shape** | If `Enabled`, the gradient preview will use the bounds of the entity selected in **Pin Preview to Shape**.<br> <br>*This field is available only if an entity is selected in **Pin Preview to Shape**.* | Boolean | `Disabled` |
| **Surface Tags to track** | An optional array of surface tags.  This component will generate a gradient only where these surface tags exist. | Array: Surface Tags | None |
| **Slope Min** |  | Float: 0.0 - 90.0 | `0.0` |
| **Slope Max** |  | Float: 0.0 - 90.0 | `20.0` |
| **Ramp Type** |  | `Linear Ramp Down`, `Linear Ramp Up`, or `Smooth Step` | `Linear Ramp Down` |
| **Smooth Step Settings** | Refer to [Smooth Step Settings properties](#smooth-step-settings-properties) below. 

### Smooth Step Settings Properties
*Smooth Step Settings Properties are available only for **Ramp Type** `Smooth Step`.*

| Property | Description | Values | Default |
|-|-|-|-|
| **Falloff Midpoint** |  | Float: 0.0 - 1.0 | `0.5` |
| **Falloff Range** |  | Float: 0.0 - 1.0 | `0.5` |
| **Falloff Softness** |  | Float: 0.0 - 1.0 | `0.25` |
