---
title: Shape Components
linktitle: Shape
description: ' Using shape components in Open 3D Engine (O3DE). '
---



Shape components generate helper geometries that can be used to define shapes for area lights and shape gradients, as well as volumes and areas for AI, audio, fog, spawners, vegetation, PhysX and triggers. Components such as Area Light that require a shape to function will prompt you to select a shape component when they are added to an entity.

## Shape components available in O3DE ##

* [Box Shape](/docs/user-guide/components/reference/shape/box-shape/) - Generates box geometry for volumes and triggers.
* [Capsule Shape](/docs/user-guide/components/reference/shape/capsule-shape/) - Generates capsule geometry for volumes and triggers.
* [Compound Shape](/docs/user-guide/components/reference/shape/compound-shape/) - Builds complex geometry from simple shapes for volumes and triggers.
* [Cylinder Shape](/docs/user-guide/components/reference/shape/cylinder-shape/) - Generates cylinder geometry for volumes and triggers.
* [Disk Shape](/docs/user-guide/components/reference/shape/disk-shape/) - Generates disk geometry for areas and triggers.
* [Polygon Prism Shape](/docs/user-guide/components/reference/shape/polygon-prism-shape/) - Generates n-sided prism geometry for volumes and triggers.
* [Quad Shape](/docs/user-guide/components/reference/shape/quad-shape/) - Generates quad-plane geometry for areas and triggers.
* [Sphere Shape](/docs/user-guide/components/reference/shape/sphere-shape/) - Generates sphere geometry for volumes and triggers.
* [Spline](/docs/user-guide/components/reference/shape/spline/) - Generates lines and curves for paths.
* [Tube Shape](/docs/user-guide/components/reference/shape/tube-shape/) - Generates tube geometry for volumes and triggers.

## Using shape components ##

An entity can have only one Shape component.

{{< important >}}
Always use the Shape's component properties to scale the shape, such as the **Dimensions**, **Height**, and **Radius** properties. Do not use the entity's Transform component to scale a Shape component.
{{< /important >}}

An entity containing a shape component should have a uniform and normalized scale; that is, the **Scale** property of the Transform component should be **X:** `1.0`, **Y:** `1.0`, **Z:** `1.0`. If a shape component is scaled non-uniformly, rendering and intersection tests use the largest vector of the Transform component's **Scale** property, yielding undesirable results.


By default, shapes are always visible in the Open 3D Engine (O3DE) editor. You can hide shapes on non-selected entities by disabling the **Visible** property in the shape component.

To display a Shape component for debugging purposes while in game mode, enable the **Game View** property.

Each Shape component provides a generic `ShapeService` that exposes functionality common to all shapes. Each shape also provides a more specific service, such as `BoxShapeService` or `SphereShapeService`.

## Shape component EBus interface ##

All Shape components provide access to two separate request buses. The first bus is the `ShapeComponentRequestsBus` that returns general information about the shape component. The second bus is the `ShapeNameComponentRequestsBus` that returns property configurations for the specific shape. Information on the `ShapeNameComponentRequestsBus` can be found on the reference pages for each shape component.

All shapes share a single notification bus named `ShapeComponentNotificationBus`.

You can use the following functions with the event bus interface to communicate with other components in your game.

## ShapeComponentRequestsBus ##

| Request Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `DistanceFromPoint` | Returns the minimum distance between a specified point and the shape. | Point – Vector3 point to calculate distance from.  | Float - Distance from point to shape. | Yes |
| `DistanceSquaredFromPoint` | Returns the minimum squared distance between a specified point and the shape. | Point – Vector3 point to calculate squared distance from. | Float - Squared distance from point to shape. | Yes |
| `GetEncompassingAabb` | Returns an AABB (Axis Aligned Bounding Box) that encompasses the entire shape. | None | `AZ::Aabb` that encompasses the shape.  | Yes |
| `GetShapeType` | Returns the specified shape type for the component. | None | `AZ::Crc32(<shape_type_name>)` - for example, `AZ::Crc32("Sphere")` | Yes |
| `IsPointInside` | Checks if a specified point is inside the shape.  | Point – Vector3 point to check. | Boolean - Returns `True` if the specified point is inside the shape. Returns `False` if the point is not inside the shape. | Yes |

## ShapeNotificationBus ##

| Notification Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `OnShapeChanged` | Notifies listeners that the Shape component has been updated. | `ShapeChangeReasons` – Indicates whether the shape was updated by a transform change or a shape property change. | Void | Yes |
