---
linktitle: Mesh Surface Tag Emitter
title: Mesh Surface Tag Emitter Component
description: Use the Mesh Surface Tag Emitter component to enable a mesh to emit surface tags in your Open 3D Engine (O3DE) level.
---

Add the **Mesh Surface Tag Emitter** component to an entity to enable a mesh to emit surface tags.

## Provider

[Surface Data Gem](/docs/user-guide/gems/reference/environment/surface-data)

## Dependencies

When applying Mesh Surface Tag Emitter to an entity, the entity is required to have one of the following components:

- [Actor](../animation/actor)
- [Mesh](../atom/mesh)

## Mesh Surface Tag Emitter properties

![Mesh Surface Tag Emitter component properties](/images/user-guide/components/reference/surface-data/mesh-surface-tag-emitter-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Generated Tags** | An array of [surface tags](/docs/user-guide/gems/reference/environment/surface-data) that the static mesh will emit. | Array: Surface Tags | None |
