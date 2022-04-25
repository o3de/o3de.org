---
linkTitle: Vegetation Layer Debugger
title: Vegetation Layer Debugger Component
description: View how vegetation layers are applied in your level with the Vegetation Layer Debugger component in Open 3D Engine (O3DE).
weight: 450
---

View how the vegetation layers are applied in your level with the **Vegetation Layer Debugger** component. Add a debugger to each vegetation layer to visualize the final composition of **Layer Priorities**, **Sub Priorities**, and vegetation layer blending.

## Provider

[Vegetation Gem](/docs/user-guide/gems/reference/environment/vegetation/)

## Vegetation Layer Debugger properties

![Vegetation Layer Debugger component properties](/images/user-guide/components/reference/vegetation/vegetation-layer-debugger-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Debug Visualization Color** | Sets the color for this layer's debug visualization. | Eight bits per channel color: 0-255 | Random Color |
| **Debug Visualization Cube Size** | Sets the size of the debug visualization as a percentage of the vegetation layers **Preview Size**. | Float: 0.0 to Infinity | `0.25` |
| **Hide created instance in the Debug Visualization** | If `Enabled`, hides vegetation instances within the debug visualization cube. | Boolean | `Disabled` |
