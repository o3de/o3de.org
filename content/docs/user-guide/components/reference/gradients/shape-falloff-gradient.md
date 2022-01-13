---
linktitle: Shape Falloff Gradient
title: Shape Falloff Gradient Component
description: ' Using Gradients components in Open 3D Engine (O3DE). '
---

## Provider

[Gradient Signal Gem](/docs/user-guide/gems/reference/utility/gradient-signal)

## Shape Falloff Gradient properties

![Shape Falloff Gradient component properties](/images/user-guide/components/reference/gradients/shape-falloff-gradient-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview** | Displays the output gradient of this component after all properties are applied. | | |
| **Pin Preview to Shape** | Sets an entity with a compatible Shape component to use as the bounds of the preview if **Constrain to Shape** is `Enabled`. | EntityId | Current Entity |
| **Preview Position** | Sets the world location of the preview.<br> <br>*This field is available only if there is no entity selected in **Pin Preview to Shape**.* | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Preview Size** | Sets the dimensions of the preview. | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Constrain to Shape** | If `Enabled`, the gradient preview will use the bounds of the entity selected in **Pin Preview to Shape**.<br> <br>*This field is available only if an entity is selected in **Pin Preview to Shape**.* | Boolean | `Disabled` |
| **Shape Entity Id** | Sets the shape that this component will generate a falloff gradient around. | EntityId | None |
| **Falloff Width** | Sets the maximum distance (in meters) of the falloff. | Float: 0.0 - 100.0 | `1.0` |
