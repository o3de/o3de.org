---
linktitle: Gradient Transform Modifier
title: Gradient Transform Modifier Component
description: Use the Gradient Transform Modifier component to transform gradient coordinates in Open 3D Engine (O3DE).
---

The **Gradient Transform Modifier** component transforms gradient coordinates into a space relative to a shape, with options to override that shape's transform, rotation, and scale.

## Provider

[Gradient Signal Gem](/docs/user-guide/gems/reference/utility/gradient-signal)

## Dependencies

When applying Gradient Transform Modifier to an entity, the entity is required to have one of the following components:

- [Axis Aligned Box Shape](../shape/axis-aligned-box-shape)
- [Box Shape](../shape/box-shape)
- [Capsule Shape](../shape/capsule-shape)
- [Compound Shape](../shape/compound-shape)
- [Cylinder Shape](../shape/cylinder-shape)
- [Disk Shape](../shape/disk-shape)
- [Polygon Prism Shape](../shape/polygon-prism-shape)
- [Quad Shape](../shape/quad-shape)
- [Shape Reference](../shape/shape-reference)
- [Sphere Shape](../shape/sphere-shape)
- [Tube Shape](../shape/tube-shape)

## Gradient Transform Modifier properties

![Gradient Transform Modifier component properties](/images/user-guide/components/reference/gradient-modifiers/gradient-transform-modifier-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Transform Type** | Sets how the space coordinates of shape transforms are interepreted. | `Origin`, `World Transform`, `Relative to Parent`, `World Transform (of Reference)`, or `Relative to Reference` | `World Transform` |
| **Wrapping Type** | Sets how values outside of the gradient's bounds are evaluated. | `None (unbounded)`, `Clamp To Edge`, `Clamp To Zero`, `Mirror`, or `Repeat`. | `None (unbounded)` |
| **Frequency Zoom** | Rescales gradient coordinates by a multiplication factor. | Float: 0.0001 to Infinity  | `1.0` |
| **Advanced Mode** | Enables advanced configuration options for the transform modifier. | Boolean | `Disabled` |

### Advanced properties

| Property | Description | Values | Default |
|-|-|-|-|
| **Sample in 3D** | If `Enabled`, UVW mapping will be based on three-dimensional world space. | Boolean | `Disabled` |
| **Allow Reference** | If `Enabled`, the bounds and transform provided by the attached **Shape** component are overridden by the entity selected in **Shape Reference**. | Boolean | `Disabled` |
| **Shape Reference** | Sets an entity with a valid shape component to override the attached Shape component. | EntityId | None |
| **Override Bounds** | If `Enabled`, the bounds of the gradient are set manually in **Bounds**. | Boolean | `Disabled` |
| **Bounds** | Sets the local (untransformed) bounds of a box used to remap, wrap, clamp, and scale gradient coordinates. | Vector3: -Infinity to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |
| **Override Translate** |  If `Enabled`, the translation of the gradient is set manually in **Translate**.  | Boolean | `Disabled` |
| **Translate** | Sets the translation of the shape used to remap, wrap, clamp, and scale gradient coordinates. | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Override Rotate** |  If `Enabled`, the rotation of the gradient is set manually in **Rotate**.  | Boolean | `Disabled` |
| **Rotate** | Sets the rotation of the shape used to remap, wrap, clamp, and scale gradient coordinates. | Vector3: -Infinity to Infinity | X:`0.0`, Y:`0.0`, Z:`0.0` |
| **Override Scale** |  If `Enabled`, the scale of the gradient is set manually in **Scale**.  | Boolean | `Disabled` |
| **Scale** | Sets the scale of the shape used to remap, wrap, clamp, and scale gradient coordinates. | Vector3: 0.0001 to Infinity | X:`1.0`, Y:`1.0`, Z:`1.0` |

## GradientTransformModifierRequestBus

Use the following request functions with the `GradientTransformModifierRequestBus` EBus interface to communicate with Gradient Transform Modifier components in your game.

| Method Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetAllowReference` | Returns the value of **Allow Reference**. | None | Boolean | Yes |
| `GetBounds` | Returns the value of **Bounds**. | None | Bounds: Vector3 | Yes |
| `GetFrequencyZoom` | Returns the value of **Frequency Zoom**. | None | Multiplication Factor: Float | Yes |
| `GetIs3D` | Returns the value of **Sample in 3D**. | None | Boolean | Yes |
| `GetOverrideBounds` | Returns the value of **Override Bounds**. | None | Boolean | Yes |
| `GetOverrideRotate` | Returns the value of **Override Rotate**. | None | Boolean | Yes |
| `GetOverrideScale` | Returns the value of **Override Scale**. | None | Boolean | Yes |
| `GetOverrideTranslate` | Returns the value of **Override Translate**. | None | Boolean | Yes |
| `GetRotate` | Returns the value of **Rotate**. | None | Rotation: Vector3 | Yes |
| `GetScale` | Returns the value of **Scale**. | None | Scale: Vector3 | Yes |
| `GetShapeReference` | Returns the value of **Shape Reference**. | None | Shape Entity: EntityId | Yes |
| `GetTransformType` | Returns the value of **Transform Type**. | None | Transform Type Index: Integer | Yes |
| `GetTranslate` | Returns the value of **Translate**. | None | Translation: Vector3 | Yes |
| `GetWrappingType` | Returns the value of **Wrapping Type**. | None | Wrapping Type Index: Integer | Yes |
| `SetAllowReference` | Sets the value of **Allow Reference**. | Boolean | None | Yes |
| `SetBounds` | Sets the value of **Bounds**. | Bounds: Vector3 | None | Yes |
| `SetFrequencyZoom` | Sets the value of **Frequency Zoom**. | Multiplication Factor: Float | None | Yes |
| `SetIs3D` | Sets the value of **Sample in 3D**. | Boolean | None | Yes |
| `SetOverrideBounds` | Sets the value of **Override Bounds**. | Boolean | None | Yes |
| `SetOverrideRotate` | Sets the value of **Override Rotate**. | Boolean | None | Yes |
| `SetOverrideScale` | Sets the value of **Override Scale**. | Boolean | None | Yes |
| `SetOverrideTranslate` | Sets the value of **Override Translate**. | Boolean | None | Yes |
| `SetRotate` | Sets the value of **Rotate**. | Rotation: Vector3 | None | Yes |
| `SetScale` | Sets the value of **Scale**. | Scale: Vector3 | None | Yes |
| `SetShapeReference` | Sets the value of **Shape Reference**. | Shape Entity: EntityId | None | Yes |
| `SetTransformType` | Sets the value of **Transform Type**. | Transform Type Index: Integer | None | Yes |
| `SetTranslate` | Sets the value of **Translate**. | Translation: Vector3 | None | Yes |
| `SetWrappingType` | Sets the value of **Wrapping Type**. | Wrapping Type Index: Integer | None | Yes |
