---
linkTitle: Vegetation Layer Spawner
title: Vegetation Layer Spawner Component
description: Use the Vegetation Layer Spawner component to define areas and rules for procedurally placing dynamic vegetation or other static meshes in Open 3D Engine (O3DE).
weight: 500
---

Use the **Vegetation Layer Spawner** component to define areas and rules for procedurally placing dynamic vegetation or other static meshes in your **Open 3D Engine (O3DE)** level.

With the Vegetation Layer Spawner component, you can do the following:
- Create vegetation within a user-defined area at runtime.
- Configure layer settings to determine the depth or relative ordering in which to apply vegetation layers.
- (Optional) Add [Vegetation Modifiers](./../vegetation-modifiers/) and [Vegetation Filters](./../vegetation-filters/) components to add variation to placed vegetation.
- (Optional) Use the [**Vegetation Asset Weight Selector**](vegetation-asset-weight-selector) component to determine which vegetation assets to place at a given location.
- Control the preview settings for attached components.
- Inherit behavior from a parent [**Vegetation Layer Blenders**](vegetation-layer-blenders) component.

For information on how to use the Vegetation Layer Spawner, see [Dynamic vegetation](/docs/user-guide/gems/reference/environment/vegetation/).

## Provider

[Vegetation Gem](/docs/user-guide/gems/reference/environment/vegetation/)

## Dependencies

Add the following required components when using the Vegetation Layer Spawner component:
- A [**Vegetation Reference Shape**](vegetation-reference-shape) component or one the following [**Shape**](./../shape/) components, [**Axis Aligned Box**](./../shape/axis-aligned-box-shape), [**Box**](./../shape/box-shape), [**Capsule**](./../shape/capsule-shape), [**Compound**](./../shape/compound-shape), [**Cylinder**](./../shape/cylinder-shape), [**Disk**](./../shape/disk-shape), [**Polygon Prism**](./../shape/polygon-prism-shape), [**Quad**](./../shape/quad-shape), [**Sphere**](./../shape/sphere-shape), or [**Tube**](./../shape/tube-shape),  to define the vegetation's spawn area.
- A [**Vegetation Asset List**](vegetation-asset-list)  or [**Vegetation Asset List Combiner**](vegetation-asset-list-combiner) component to list mesh assets, material assets, and other settings for the vegetation.

## Vegetation Layer Spawner properties

![Vegetation Layer Spawner component properties](/images/user-guide/components/reference/vegetation/vegetation-layer-spawner-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Preview Settings** |  |  |  |
| **Override Preview Settings** | If `Enabled`, the **Preview Settings** properties determine the shape of the vegetation layer preview.  If `Disabled`, the bounds of the vegetation layer preview are set by the attached Shape or Vegetation Reference Shape component.  | Boolean | `Disabled` |
| **Pin Preview to Shape** | Sets an entity with a compatible shape component to use as the bounds of the vegetation layer preview if **Constrain to Shape** is `Enabled`.<br> <br>*This field is available only if **Override Preview Settings** is `Enabled`.* | EntityId | Current Entity |
| **Preview Position** | Sets the world location of the vegetation layer preview.<br> <br>*This field is available only if **Override Preview Settings** is `Enabled` and there is no entity selected in **Pin Preview to Shape**.* | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Preview Size** | Sets the dimensions of the vegetation layer preview if **Constrain to Shape** is `Disabled`.<br> <br>*This field is available only if **Override Preview Settings** is `Enabled`.* | Vector3: 0.0 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Constrain to Shape** | If `Enabled`, the vegetation layer preview will use the bounds of the entity selected in **Pin Preview to Shape**.<br> <br>*This field is available only if **Override Preview Settings** is `Enabled` and an entity is selected in **Pin Preview to Shape**.* | Boolean | `Disabled` |
| **Layer Priority** | Defines a high level order that vegetation areas are applied. | `Background` or `Foreground` | `Foreground` |
| **Sub Priority** | Defines the order that vegetation areas are applied within a layer. Larger numbers have a higher priority. | 0-10000 | `0` |
| **Inherit Behavior** | Allow shapes, modifiers and filters of a parent entity to affect this vegetation layer. | Boolean | `Enabled` |
| **Allow Empty Assets** | Allow unspecified assets to claim space and block other vegetation. | Boolean | `Enabled` |
| **Filter Stage** | Defines if filters are applied before or after modifiers. | `PreProcess` or `PostProcess` | `PreProcess` |

## VegetationSpawnerRequestBus

Use the following request functions with the `VegetationSpawnerRequestBus` EBus interface to communicate with Vegetation Layer Spawner components in your game.

| Method Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetAllowEmptyMeshes` | Returns `True` if **Allow Empty Assets** is `Enabled`. | None | Boolean | Yes |
| `GetAreaLayer` | Returns the **Layer Priority** of the vegetation layer. | None | Layer Priority: String | Yes |
| `GetAreaPriority` | Returns the **Sub Priority** of the vegetation layer. | None | Sub Priority: Integer | Yes |
| `GetAreaProductCount` | Returns the number of vegetation instances spawned in a vegetation layer. | None | Count: Integer | Yes |
| `GetFilterStage` | Returns the **Filter Stage** of the vegetation layer. | None | Filter Stage: String | Yes |
| `GetInheritBehavior` | Returns `True` if **Inherit Behavior** is `Enabled`. | None | Boolean | Yes |
| `SetAllowEmptyMeshes` | Sets the value of the **Allow Empty Assets** property. | Boolean | None | Yes |
| `SetAreaLayer` | Sets the value of the **Layer Priority** property. | Layer Priority: String | None | Yes |
| `SetAreaPriority` | Sets the value of the **Sub Priority** property. | Sub Priority: Integer | None | Yes |
| `SetFilterStage` | Sets the value of the **Filter** property. | Filter Stage: String | None | Yes |
| `SetInheritBehavior` | Sets the value of the **Inherit Behavior** property. | Boolean | None | Yes |
