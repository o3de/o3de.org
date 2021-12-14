---
linkTitle: Vegetation Asset Weight Selector
title: Vegetation Asset Weight Selector Component
description: Create weight-based asset selection using gradients with the Vegetation Asset Weight Selector component in Open 3D Engine (O3DE).
weight: 250
---

The **Vegetation Asset Weight Selector** component uses the values of a gradient to select assets from a vegetation asset list.  The assets can be sorted by weight prior to selection and the inbound gradient can be modified to affect the count and distribution of vegetation assets.

## Provider

[Vegetation Gem](/docs/user-guide/gems/reference/environment/vegetation/)

## Vegetation Asset Weight Selector properties

![Vegetation Asset Weight Selector component properties](/images/user-guide/components/reference/vegetation/vegetation-asset-weight-selector-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Sort By Weight** | Determines if asset descriptors are sorted by weight before the gradient is used to select assets. | `Unsorted`, `Ascending`, or `Descending` | `Unsorted` |
| **Gradient** | Refer to [Gradient properties](#gradient-properties) below. |  |  |

### Gradient properties

![Gradient properties](/images/user-guide/components/reference/vegetation-modifiers/gradient-properties.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Gradient Entity Id** | Sets an entity with an active **Gradient** component. | Entity | None |
| **Opacity** | Sets the opacity of the inbound gradient. | Float: 0.0 - 1.0 | `1.0` |
| **Invert Input** | Inverts the values of the inbound gradient. | Boolean | `Disabled` |
| **Preview (Inbound)** | Displays the gradient provided by the entity set in **Gradient Entity Id**. |  |  |
| **Enable Transform** | If `Enabled`, the translation, scale, and rotation of the inbound gradient may be modified. | Boolean | `Disabled` |
| **Translate** | Sets the translation of the inbound gradient. | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Scale** | Sets the scale of the inbound gradient. | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Rotate** | Sets the rotation of the inbound gradient. | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Enable Levels** | If `Enabled`, the input and output values of the inbound gradient may be modified. | Boolean | `Disabled` |
| **Input Mid** | Sets the median value of the inbound gradient. | Float: 0.0 - 1.0 | `1.0` |
| **Input Min** | Sets a minimum value for the inbound gradient. | Float: 0.0 - 1.0 | `0.0` |
| **Input Max** | Sets a maximum value for the inbound gradient. | Float: 0.0 - 1.0 | `1.0` |
| **Output Min** | Sets a minimum value for the outbound gradient. | Float: 0.0 - 1.0 | `0.0` |
| **Output Max** | Sets a maximum value for the outbound gradient. | Float: 0.0 - 1.0 | `1.0` |

## DescriptorWeightSelectorRequestBus

Use the following request functions with the `DescriptorWeightSelectorRequestBus` EBus interface to communicate with Vegetation Asset Weight Selector components in your game.

| Method Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetGradientSampler` | Returns the gradient sampler object of a weight selector. | None | Gradient Sampler | Yes |
| `GetSortBehavior` | Sets the configuration of a **Sort By Weight** property. Returns `0` for `Unsorted`, `1` for `Ascending`, and `2` for `Descending`. | None | Sort Behavior: Integer | Yes |
| `SetSortBehavior` | Sets the configuration of a **Sort By Weight** property. `0` for `Unsorted`, `1` for `Ascending`, and `2` for `Descending`. | Sort Behavior: Integer | None | Yes |
