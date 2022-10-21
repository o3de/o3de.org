---
title: Vegetation Position Modifier Component
linktitle: Vegetation Position Modifier
description: Add variation to the placement of your vegetation instances with the Vegetation Position Modifier component in Open 3D Engine (O3DE).
weight: 200
---

Add variation to the placement of the vegetation instances in your level with the **Vegetation Position Modifier** component.  Use gradients to control how vegetation or blocker instances are individually offset on the X, Y, or Z-axis.  By default, this component is configured to offset a vegetation instance's position by up to 0.3 meters on the positive or negative X and Y-axis.  

## Provider

[Vegetation Gem](/docs/user-guide/gems/reference/environment/vegetation/)

## Dependencies

Add one of the following required components when using the Vegetation Position Modifier component:
- [Vegetation Layer Blender](./../vegetation/vegetation-layer-blender)
- [Vegetation Layer Blocker](./../vegetation/vegetation-layer-blocker)
- [Vegetation Layer Blocker (Mesh)](./../vegetation/vegetation-layer-blocker-mesh)
- [Vegetation Layer Spawner](./../vegetation/layer-spawner)

## Vegetation Position Modifier properties

![Vegetation Position Modifier component properties](/images/user-guide/components/reference/vegetation-modifiers/vegetation-position-modifier-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Allow Per-Item Overrides** | If `Enabled`, vegetation descriptor properties that are enabled can override this component's properties. | Boolean | `Disabled` |
| **Auto Snap to Surface** | If `Enabled`, automatically snaps the modified vegetation instance position to the nearest valid surface tag.  Valid surface tags include those selected in the **Surface Tags To Snap To** property, as well as any surface tags already associated with the vegetation instance. | Boolean | `Enabled` |
| **Surface Tags To Snap To** | An array of [surface tags](/docs/user-guide/gems/reference/environment/surface-data) used to align the vegetation instance with the surface. | Array: Surface Tags | None |
| **Position X - Range Min** | Sets the minimum modified position offset of the vegetation instance on the X-axis. | Float: -Infinity to Infinity | `-0.3` |
| **Position X - Range Max** | Sets the maximum modified position offset of the vegetation instance on the X-axis. | Float: -Infinity to Infinity | `0.3` |
| **Position X - Gradient** | Refer to [Gradient properties](#gradient-properties) below. |  |  |
| **Position Y - Range Min** | Sets the minimum modified position offset of the vegetation instance on the Y-axis. | Float: -Infinity to Infinity | `-0.3` |
| **Position Y - Range Max** | Sets the maximum modified position offset of the vegetation instance on the Y-axis. | Float: -Infinity to Infinity | `0.3` |
| **Position Y - Gradient** | Refer to [Gradient properties](#gradient-properties) below. |  |  |
| **Position Z - Range Min** | Sets the minimum modified position offset of the vegetation instance on the Z-axis. | Float: -Infinity to Infinity | `0.0` |
| **Position Z - Range Max** | Sets the maximum modified position offset of the vegetation instance on the Z-axis. | Float: -Infinity to Infinity | `0.0` |
| **Position Z - Gradient** | Refer to [Gradient properties](#gradient-properties) below. |  |  |

### Gradient properties

![Gradient properties](/images/user-guide/components/reference/vegetation-modifiers/gradient-properties.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Gradient Entity Id** | Sets an entity with an active **Gradient** component. | Entity | None |
| **Opacity** | Sets the opacity of the input gradient. | Float: 0.0 - 1.0 | `1.0` |
| **Invert Input** | Inverts the values of the input gradient. | Boolean | `Disabled` |
| **Preview (Inbound)** | Displays the input gradient provided by the entity set in **Gradient Entity Id**. |  |  |
| **Enable Transform** | If `Enabled`, the translation, scale, and rotation of the input gradient may be modified. | Boolean | `Disabled` |
| **Translate** | Sets the translation of the input gradient. | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Scale** | Sets the scale of the input gradient. | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Rotate** | Sets the rotation of the input gradient. | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Enable Levels** | If `Enabled`, the input and output values of the gradient may be modified. | Boolean | `Disabled` |
| **Input Mid** | Sets the median value of the input gradient. | Float: 0.0 - 1.0 | `1.0` |
| **Input Min** | Sets a minimum value for the input gradient. | Float: 0.0 - 1.0 | `0.0` |
| **Input Max** | Sets a maximum value for the input gradient. | Float: 0.0 - 1.0 | `1.0` |
| **Output Min** | Sets a minimum value for the output gradient. | Float: 0.0 - 1.0 | `0.0` |
| **Output Max** | Sets a maximum value for the output gradient. | Float: 0.0 - 1.0 | `1.0` |

## PositionModifierRequestBus

Use the following request functions with the `PositionModifierRequestBus` EBus interface to communicate with Vegetation Position Modifier components in your game.

| Method Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `AddTag` | Adds a surface tag to the **Surface Tags To Snap To** array. | Surface Tag: String | None | Yes |
| `GetAllowOverrides` | Returns the configuration of the **Allow Per-Item Overrides** property. | None | Boolean | Yes |
| `GetGradientSamplerX` | Returns the gradient sampler object of the **Position X** group properties. | None | Gradient Sampler | Yes |
| `GetGradientSamplerY` | Returns the gradient sampler object of the **Position Y** group properties. | None | Gradient Sampler | Yes |
| `GetGradientSamplerZ` | Returns the gradient sampler object of the **Position Z** group properties. | None | Gradient Sampler | Yes |
| `GetNumTags` | Returns the number of surface tags in the **Surface Tags To Snap To** array. | None | Count: Integer | Yes |
| `GetRangeMax` | Returns a Vector3 of **Range Max** properties. | None | Vector3: (**Position X - Range Max**, **Position Y - Range Max**, **Position Z - Range Max**) | Yes |
| `GetRangeMin` | Returns a Vector3 of **Range Min** properties. | None | Vector3: (**Position X - Range Min**, **Position Y - Range Min**, **Position Z - Range Min**) | Yes |
| `GetTag` | Returns the surface tag at the specified index of the **Surface Tags To Snap To** array. | Surface Tag Index: Integer | Surface Tag: String | Yes |
| `RemoveTag` | Removes the surface tag at the specified index of the **Surface Tags To Snap To** array. | Surface Tag Index: Integer | None | Yes |
| `SetAllowOverrides` | Sets the configuration of the **Allow Per-Item Overrides** property. | Boolean | None | Yes |
| `SetRangeMax` | Sets the X, Y, and Z **Range Max** properties. | Vector3: (**Position X - Range Max**, **Position Y - Range Max**, **Position Z - Range Max**) | None | Yes |
| `SetRangeMin` | Sets the X, Y, and Z **Range Min** properties. | Vector3: (**Position X - Range Min**, **Position Y - Range Min**, **Position Z - Range Min**) | None | Yes |
