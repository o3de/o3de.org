---
linkTitle: Vegetation Layer Blocker
title: Vegetation Layer Blocker Component
description: Define areas where dynamic vegetation cannot spawn with the Vegetation Layer Blocker component in Open 3D Engine (O3DE).
weight: 350
---

Create an area where dynamic vegetation cannot spawn with the **Vegetation Layer Blocker** component.

## Provider

[Vegetation Gem](/docs/user-guide/gems/reference/environment/vegetation/)

## Dependencies

Add the following required components when using the Vegetation Layer Blocker component:
- A [**Vegetation Reference Shape**](vegetation-reference-shape) component or one the following [**Shape**](./../shape/) components, [**Axis Aligned Box**](./../shape/axis-aligned-box-shape), [**Box**](./../shape/box-shape), [**Capsule**](./../shape/capsule-shape), [**Compound**](./../shape/compound-shape), [**Cylinder**](./../shape/cylinder-shape), [**Disk**](./../shape/disk-shape), [**Polygon Prism**](./../shape/polygon-prism-shape), [**Quad**](./../shape/quad-shape), [**Sphere**](./../shape/sphere-shape), or [**Tube**](./../shape/tube-shape),  to define the blocker's area.

## Vegetation Layer Blocker properties

![Vegetation Layer Blocker component properties](/images/user-guide/components/reference/vegetation/vegetation-layer-blocker-mesh-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Override Preview Settings** | If `Enabled`, the **Preview Settings** properties determine the shape of the blocker.  If `Disabled`, the bounds of the blocker are set by the attached Shape or Vegetation Reference Shape component.  | Boolean | `Disabled` |
| **Pin Preview to Shape** | Sets an entity with a compatible shape component to use as the bounds of the blocker if **Constrain to Shape** is `Enabled`.<br> <br>*This field is available only if **Override Preview Settings** is `Enabled`.* | EntityId | Current Entity |
| **Preview Position** | Sets the world location of the blocker.<br> <br>*This field is available only if **Override Preview Settings** is `Enabled` and there is no entity selected in **Pin Preview to Shape**.* | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Preview Size** | Sets the dimensions of the blocker if **Constrain to Shape** is `Disabled`.<br> <br>*This field is available only if **Override Preview Settings** is `Enabled`.* | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Constrain to Shape** | If `Enabled`, the blocker will use the bounds of the entity selected in **Pin Preview to Shape**.<br> <br>*This field is available only if **Override Preview Settings** is `Enabled` and an entity is selected in **Pin Preview to Shape**.* | Boolean | `Disabled` |
| **Layer Priority** | Defines a high level order that vegetation areas and blockers are applied. | `Background` or `Foreground` | `Foreground` |
| **Sub Priority** | Defines the order that vegetation areas or blockers are applied within a layer. Larger numbers have a higher priority. | 0-10000 | `10000` |
| **Inherit Behavior** | Allow shapes, modifiers and filters of a parent entity to affect this vegetation layer. | Boolean | `Enabled` |

## BlockerRequestBus

Use the following request functions with the `BlockerRequestBus` EBus interface to communicate with Vegetation Layer Blocker components in your game.

| Method Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetAreaLayer` | Returns the **Layer Priority** of a blocker. Returns `0` for `Background` and `1` for `Foreground`. | None | Layer Priority: Integer | Yes |
| `GetAreaPriority` | Returns the **Sub Priority** of a blocker. | None | Sub Priority: Integer | Yes |
| `GetAreaProductCount` | Returns the number of vegetation instances spawned in a blocker's vegetation area. | None  | Count: Integer | Yes |
| `GetInheritBehavior` | Returns the configuration of a blocker's **Inherit Behavior** property. | None | Boolean | Yes |
| `SetAreaLayer` | Sets the **Layer Priority** of a blocker. Returns `0` for `Background` and `1` for `Foreground`. | Layer Priority: Integer | None | Yes |
| `SetAreaPriority` | Sets the **Sub Priority** of a blocker. | Sub Priority: Integer | None | Yes |
| `SetInheritBehavior` | Sets the configuration of a blocker's **Inherit Behavior** property. | Boolean | None | Yes |
