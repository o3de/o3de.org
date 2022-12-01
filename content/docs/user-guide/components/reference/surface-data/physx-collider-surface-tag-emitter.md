---
linktitle: PhysX Collider Surface Tag Emitter
title: PhysX Collider Surface Tag Emitter Component
description: Use the PhysX Collider Surface Tag Emitter component to enable a PhysX collider to emit surface tags in your Open 3D Engine (O3DE) level.
---

Add the **PhysX Collider Surface Tag Emitter** component to an entity to enable a PhysX collider to emit surface tags.

## Provider

[Surface Data Gem](/docs/user-guide/gems/reference/environment/surface-data)

## Dependencies

When applying PhysX Collider Surface Tag Emitter to an entity, the entity is required to have one of the following components:

- [PhysX Collider](../physx/collider)
- [PhysX Heightfield Collider](../physx/heightfield-collider)
- [PhysX Shape Collider](../physx/shape-collider)

## PhysX Collider Surface Tag Emitter properties

![PhysX Collider Surface Tag Emitter component properties](/images/user-guide/components/reference/surface-data/physx-collider-surface-tag-emitter-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Generated Tags** | An array of [surface tags](/docs/user-guide/gems/reference/environment/surface-data) that the exterior surface of the PhysX collider will emit. | Array: Surface Tags | None |
| **Extended Tags** | An array of [surface tags](/docs/user-guide/gems/reference/environment/surface-data) that the interior of the PhysX collider will emit. | Array: Surface Tags | None |
