---
linktitle: Image Gradient
title: Image Gradient Component
description: ' Using Gradients components in Open 3D Engine (O3DE). '
---

## Provider

[Gradient Signal Gem](/docs/user-guide/gems/reference/utility/gradient-signal)

## Dependencies ##

[Gradient Transform Modifier](/docs/user-guide/components/reference/gradient-modifiers/gradient-transform-modifier)

## Image Gradient properties

![Image Gradient component properties](/images/user-guide/components/reference/gradients/image-gradient-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview** | Displays the outbound gradient of this component after all properties are applied. | | |
| **Preview Settings** |  |  |  |
| **Pin Preview to Shape** | Sets an entity with a compatible Shape component to use as the bounds of the preview if **Constrain to Shape** is `Enabled`. | EntityId | Current Entity |
| **Preview Position** | Sets the world location of the preview.<br> <br>*This field is available only if there is no entity selected in **Pin Preview to Shape**.* | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Preview Size** | Sets the dimensions of the preview. | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Constrain to Shape** | If `Enabled`, the gradient preview will use the bounds of the entity selected in **Pin Preview to Shape**.<br> <br>*This field is available only if an entity is selected in **Pin Preview to Shape**.* | Boolean | `Disabled` |
| **Image Asset** | Sets the source image to generate this gradient's values. | Gradient Image Asset | None |
| **Tiling X** | Sets the number of times to tile the image horizontally. | Float: 0.01 to Infinity | `1.0` |
| **Tiling Y** | Sets the number of times to tile the image vertically. | Float: 0.01 to Infinity | `1.0` |
