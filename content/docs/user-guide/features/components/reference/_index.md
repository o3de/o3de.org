---
description: ' Open 3D Engine (O3DE) component reference index. '
title: Component reference
date: 2021-03-05
---

Components add functionality to entities. An entity cam contain any number or combination of components. Some components only allow one instance per entity. Some components depend on other components to function.

Components are provided by Gems. To make a component available in the O3DE editor, you must add the Gem that provides it, and configure and build your project. Though components might belong to the same type, they might not be provided by the same Gem. Each component lists the Gem that provides it on its reference page.

The components below are grouped by type as they appear in the O3DE editor.

## Component type groups ##

* [Atom](#atom)
* [Shape](#shape)

## Atom ##

* [Area Light](/docs/user-guide/features/components/reference/atom/area-light.md) - Creates a light with realistic attenuation, cast from a shape.
* [Decal](/docs/user-guide/features/components/reference/atom/decal.md) - Projects materials onto meshes.

## Shape ##

For information on using Shape components, see [Shape components](/docs/user-guide/features/components/reference/shape/intro.md).

* [Box Shape](/docs/user-guide/features/components/reference/shape/box-shape.md) - Generates box geometry for volumes and triggers.
* [Capsule Shape](/docs/user-guide/features/components/reference/shape/capsule-shape.md) - Generates capsule geometry for volumes and triggers.
* [Compound Shape](/docs/user-guide/features/components/reference/shape/compound-shape.md) - Builds complex geometry from simple shapes for volumes and triggers.
* [Cylinder Shape](/docs/user-guide/features/components/reference/shape/cylinder-shape.md) - Generates cylinder geometry for volumes and triggers.
* [Disk Shape](/docs/user-guide/features/components/reference/shape/disk-shape.md) - Generates disk geometry for areas and triggers.
* [Polygon Prism Shape](/docs/user-guide/features/components/reference/shape/polygon-prism-shape.md) - Generates n-sided prism geometry for volumes and triggers.
* [Quad Shape](/docs/user-guide/features/components/reference/shape/quad-shape.md) - Generates quad-plane geometry for areas and triggers.
* [Sphere Shape](/docs/user-guide/features/components/reference/shape/sphere-shape.md) - Generates sphere geometry for volumes and triggers.
* [Spline](/docs/user-guide/features/components/reference/shape/spline.md) - Generates lines and curves for paths.
* [Tube Shape](/docs/user-guide/features/components/reference/shape/tube-shape.md) - Generates tube geometry for volumes and triggers.
