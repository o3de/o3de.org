---
title: PostFX Radius Weight Modifier component
linktitle: PostFX Radius Weight Modifier
description: 'Open 3D Engine (O3DE) PostFx Radius Weight Modifier component reference.'
toc: true
---

The **PostFx Radius Weight Modifier** component is a sphere of area that modifies the weight of post-processing effects (PostFX) within the sphere based on the camera's distance to the center. The PostFX is least effective at the perimeter of the sphere, and lerps as the camera approaches the center, where the effect is most effective.


## Provider

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)


## Dependencies

[PostFX Layer component](/docs/user-guide/components/reference/atom/postfx-layer/)


## Base Properties

![PostFX Radius Weight Modifier base properties](/images/user-guide/components/reference/atom/post-processing-volumes/postfx-radius-weight-modifier.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Radius** | Controls the radius of PostFX's volume's spherical bounds. | `0.0` to `1.0` |`0.0` |