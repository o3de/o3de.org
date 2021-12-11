---
linkTitle: Vegetation Reference Shape
title: Vegetation Reference Shape Component
description: Use the Vegetation Reference Shape component to reference and reuse Shape components in Open 3D Engine (O3DE).
weight: 550
---

Use the **Vegetation Reference Shape** component to reference and reuse **Shape** components from other entities.

## Provider

[Vegetation Gem](/docs/user-guide/gems/reference/environment/vegetation/)

## Vegetation Reference Shape properties

![Vegetation Reference Shape component properties](/images/user-guide/components/reference/vegetation/vegetation-reference-shape-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Shape Entity Id** | Selects an entity with a valid Shape component, the bounds of the shape will be reused for this entity's components. | EntityId | None |
