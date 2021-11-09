---
title: PostFX Radius Weight Modifier component
linktitle: PostFX Radius Weight Modifier
description: 'Open 3D Engine (O3DE) PostFx Radius Weight Modifier component reference.'
toc: true
---

The **PostFx Radius Weight Modifier** component weights post-processing effects (PostFX) along the radius of a sphere. The sphere is defined by the **Radius** property from the origin of the entity. The PostFX weight is `0.0` at the perimeter of the sphere and linearly interpolates (lerps) as the camera approaches the center, where the PostFX weight is `1.0`.


## Provider

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)


## Dependencies

[PostFX Layer component](/docs/user-guide/components/reference/atom/postfx-layer/)


## Base properties

![PostFX Radius Weight Modifier base properties](/images/user-guide/components/reference/atom/post-processing-volumes/postfx-radius-weight-modifier.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Radius** | Controls the radius of PostFX's volume's spherical bounds. | `0.0` to infinity |`0.0` |