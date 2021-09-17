---
title: PostFX Shape Weight Modifier component
linktitle: PostFX Shape Weight Modifier
description: 'Open 3D Engine (O3DE) PostFX Shape Weight Modifier component reference.'
toc: true
---

The **PostFX Shape Weight Modifier** component limits post-processing effects (PostFX) to a volume of space that is defined by a Shape component. The weight of the PostFX remains constant within the shape component's bounds and begins to fade outside of the bounds. The weight multiplier is `0.0` outside of the volume or outside of the fall-off distance.


## Provider ##

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)


## Dependencies

[PostFX Layer component](/docs/user-guide/components/reference/atom/postfx-layer/)

[Shape component](/docs/user-guide/components/reference/#shape)

## Base Properties

![PostFX Shape Weight Modifier base properties](/images/user-guide/components/reference/atom/post-processing-volumes/postfx-shape-weight-modifier.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Fall-off Distance** | Distance from outer bounds of Shape component to start lerping. While approaching the outer bounds of the Shape component from the fall-off distance, the weight modifier smoothly transitions from `0.0` to `1.0` | `0.0` to `100.0` | `1.0` |