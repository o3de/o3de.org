---
title: PostFX Shape Weight Modifier component
linktitle: PostFX Shape Weight Modifier
description: 'Open 3D Engine (O3DE) PostFX Shape Weight Modifier component reference.'
toc: true
---

The **PostFX Shape Weight Modifier** component limits post-processing effects (PostFX) modifications to a volume that's defined by a **Shape** component. The weight of the PostFX remains constant within the shape component's bounds and falls off to `0.0` outside of the bounds according to the **Fall-off Distance**.

## Provider ##

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)


## Dependencies

[PostFX Layer component](/docs/user-guide/components/reference/atom/postfx-layer/)

[Shape component](/docs/user-guide/components/reference/#shape)

## Base properties

![PostFX Shape Weight Modifier base properties](/images/user-guide/components/reference/atom/post-processing-volumes/postfx-shape-weight-modifier.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Fall-off Distance** | Distance from the outer bounds of the Shape component. Within this distance, the PostFX weight is linearly interpolated (lerped). While approaching the outer bounds of the Shape component from the fall-off distance, the weight modifier smoothly transitions from `0.0` to `1.0`. | `0.0` to infinity | `1.0` |