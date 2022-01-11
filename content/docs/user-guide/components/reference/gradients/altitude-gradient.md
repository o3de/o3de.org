---
linktitle: Altitude Gradient
title: Altitude Gradient Component
description: ' Using Gradients components in Open 3D Engine (O3DE). '
---

## Provider

[Gradient Signal Gem](/docs/user-guide/gems/reference/utility/gradient-signal)

## Altitude Gradient properties

![Altitude Gradient component properties](/images/user-guide/components/reference/gradients/altitude-gradient-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview** | Displays the outbound gradient of this component after all properties are applied. | | |
| **Preview Settings** |  |  |  |
| **Pin Preview to Shape** | Sets an entity with a compatible Shape component to use as the bounds of the preview if **Constrain to Shape** is `Enabled`. | EntityId | Current Entity |
| **Preview Position** | Sets the world location of the preview.<br> <br>*This field is available only if there is no entity selected in **Pin Preview to Shape**.* | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Preview Size** | Sets the dimensions of the preview. | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Constrain to Shape** | If `Enabled`, the gradient preview will use the bounds of the entity selected in **Pin Preview to Shape**.<br> <br>*This field is available only if an entity is selected in **Pin Preview to Shape**.* | Boolean | `Disabled` |
| **Altitude Min** | Sets the minimum altitude that will generate gradient values. | Float: -Infinity to Infinity | `0.0` |
| **Altitude Max** | Sets the maximum altitude that will generate gradient values. | Float: -Infinity to Infinity | `128.0` |
| **Surface Tags to track** | An optional array of surface tags.  This component will generate a gradient only where these surface tags exist. | Array: Surface Tags | None |
