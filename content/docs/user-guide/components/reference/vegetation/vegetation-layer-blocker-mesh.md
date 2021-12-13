---
linkTitle: Vegetation Layer Blocker (Mesh)
title: Vegetation Layer Blocker (Mesh) Component
description: Define areas around a mesh or actor where dynamic vegetation cannot spawn with the Vegetation Layer Blocker (Mesh) component in Open 3D Engine (O3DE).
weight: 400
---

Create an area around a mesh or actor where dynamic vegetation cannot spawn with the **Vegetation Layer Blocker (Mesh)** component.

## Provider

[Vegetation Gem](/docs/user-guide/gems/reference/environment/vegetation/)

## Dependencies

Add one of the following required components when using the Vegetation Layer Blocker (Mesh) component:
- A [**Mesh**](./../atom/mesh/) component or an [**Actor**](./../animation/actor/) component, to define the blocker's area.

## Vegetation Layer Blocker (Mesh) properties

![Vegetation Layer Blocker (Mesh) component properties](/images/user-guide/components/reference/vegetation/vegetation-layer-blocker-mesh-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview Settings** |  |  |  |
| **Override Preview Settings** | If `Enabled`, the **Preview Settings** properties determine the shape of the blocker.  If `Disabled`, the bounds of the blocker are set by the attached Mesh or Actor component.  | Boolean | `Disabled` |
| **Pin Preview to Shape** | Sets an entity with a compatible shape component to use as the bounds of the blocker if **Constrain to Shape** is `Enabled`.<br> <br>*This field is available only if **Override Preview Settings** is `Enabled`.* | EntityId | Current Entity |
| **Preview Position** | Sets the world location of the blocker.<br> <br>*This field is available only if **Override Preview Settings** is `Enabled` and there is no entity selected in **Pin Preview to Shape**.* | Vector3: -Infinity to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Preview Size** | Sets the dimensions of the blocker if **Constrain to Shape** is `Disabled`.<br> <br>*This field is available only if **Override Preview Settings** is `Enabled`.* | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Constrain to Shape** | If `Enabled`, the blocker will use the bounds of the entity selected in **Pin Preview to Shape**.<br> <br>*This field is available only if **Override Preview Settings** is `Enabled` and an entity is selected in **Pin Preview to Shape**.* | Boolean | `Disabled` |
| **Layer Priority** | Defines a high level order that vegetation areas and blockers are applied. | `Background` or `Foreground` | `Foreground` |
| **Sub Priority** | Defines the order that vegetation areas or blockers are applied within a layer. Larger numbers have a higher priority. | 0-10000 | `10000` |
| **Inherit Behavior** | Allow shapes, modifiers and filters of a parent entity to affect this vegetation layer. | Boolean | `Enabled` |
| **Mesh Height Percent Min** | Sets the percentage of the mesh height (from the bottom up) used to determine the lower bound for intersection tests. | Float: 0.0 - 1.0 | `0.0` |
| **Mesh Height Percent Max** | Sets the percentage of the mesh height (from the bottom up) used to determine the upper bound for intersection tests. | Float: 0.0 - 1.0 | `1.0` |
| **Block When Invisible** | If `Disabled`, the blocker will only block vegetation if the Mesh or Actor component is visible. | Boolean | `Enabled` |
| **Draw Debug Bounds** | Draw the mesh height bounds. | Boolean | `Disabled` |

## MeshBlockerRequestBus

Use the following request functions with the `MeshBlockerRequestBus` EBus interface to communicate with Vegetation Layer Blocker (Mesh) components in your game.

| Method Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetAreaLayer` | Returns the **Layer Priority** of a mesh blocker. Returns `0` for `Background` and `1` for `Foreground`. | None | Layer Priority: Integer | Yes |
| `GetAreaPriority` | Returns the **Sub Priority** of a mesh blocker. | None | Sub Priority: Integer | Yes |
| `GetAreaProductCount` | Returns the number of vegetation instances spawned in a mesh blocker's vegetation area. | None  | Count: Integer | Yes |
| `GetBlockWhenInvisible` | Returns the configuration of a mesh blocker's **Block When Invisible** property. | None | Boolean | Yes |
| `GetInheritBehavior` | Returns the configuration of a mesh blocker's **Inherit Behavior** property. | None | Boolean | Yes |
| `GetMeshHeightPercentMax` | Returns the **Mesh Height Percent Max** property of a mesh blocker. | None | Height Ratio: Float | Yes |
| `GetMeshHeightPercentMin` | Returns the **Mesh Height Percent Min** property of a mesh blocker. | None | Height Ratio: Float | Yes |
| `SetAreaLayer` | Sets the **Layer Priority** of a mesh blocker. Returns `0` for `Background` and `1` for `Foreground`. | Layer Priority: Integer | None | Yes |
| `SetAreaPriority` | Sets the **Sub Priority** of a mesh blocker. | Sub Priority: Integer | None | Yes |
| `SetBlockWhenInvisible` | Sets the configuration of a mesh blocker's **Block When Invisible** property. | Boolean | None | Yes |
| `SetInheritBehavior` | Sets the configuration of a mesh blocker's **Inherit Behavior** property. | Boolean | None | Yes |
| `SetMeshHeightPercentMax` | Sets the **Mesh Height Percent Max** property of a mesh blocker. | Height Ratio: Float | None | Yes |
| `SetMeshHeightPercentMin` | Sets the **Mesh Height Percent Min** property of a mesh blocker. | Height Ratio: Float | None | Yes |
