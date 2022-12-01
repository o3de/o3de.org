---
linktitle: Shape Surface Tag Emitter
title: Shape Surface Tag Emitter Component
description: Use the Shape Surface Tag Emitter component to enable a shape to emit surface tags in your Open 3D Engine (O3DE) level.
---

Add the **Shape Surface Tag Emitter** component to an entity to enable a shape to emit surface tags.

## Provider

[Surface Data Gem](/docs/user-guide/gems/reference/environment/surface-data)

## Dependencies

When applying Shape Surface Tag Emitter to an entity, the entity is required to have one of the following components:

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

## Shape Surface Tag Emitter properties

![Shape Surface Tag Emitter component properties](/images/user-guide/components/reference/surface-data/shape-surface-tag-emitter-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Generated Tags** | An array of [surface tags](/docs/user-guide/gems/reference/environment/surface-data) that the exterior surface of the shape will emit. | Array: Surface Tags | None |
| **Extended Tags** | An array of [surface tags](/docs/user-guide/gems/reference/environment/surface-data) that the interior of the shape will emit. | Array: Surface Tags | None |
