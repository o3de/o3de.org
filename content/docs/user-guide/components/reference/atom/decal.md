---
title: Decal Component
linktitle: Decal
description: "Open 3D Engine (O3DE) Decal component reference."
toc: true
---

The **Decal** component enables an entity to project a material onto a mesh. A large number of overlapping decals can be applied to a single mesh.

## Provider ##

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)

## Limitations ##

There are currently a few limitations with the decal component:
- Only 5 total different decal sizes are currently supported. All decals used should be one of 5 arbitrary sizes.
- All decal materials should specify both a base color and normal map. If any decal material is missing a normal map, then no decals will use a normal map.
- The base color and normal textures must be the same size.

## Properties

![Decal component UI](/images/user-guide/components/reference/atom/decal-component-ui/decal-component-ui-01.png)
 
| Property | Description | Values | Default |
|-|-|-|-|
| **Attenuation Angle** | Controls how much the angle between surface and the decal projection affects the decal opacity. Higher values make the decal more transparent as the angle increases so that the decal doesn't appear to wrap around the surface.  | `0.0` to `1.0` | `1.0` |
| **Opacity** | Determines how transparent the decal is. | `0.0` to `1.0` | `1.0` |
| **Sort Key** | Sets the sort order for the decal. When multiple decals are projected onto a surface, decals with higher values display on top. | `0` to `255` | `16` |
| **Material** | The material that the decal will use. |  |  |

## Examples

Example of a decal with attenuation angle set to 0. Less attenuation means more wrapping around objects.

![Decal component attenuation angle 0 example](/images/user-guide/components/reference/atom/decal-component-ui/decal-component-attenuation-angle-0.png)

Example of a decal with attenuation angle set to 1. More attenuation means less wrapping around objects.

![Decal component attenuation angle 1 example](/images/user-guide/components/reference/atom/decal-component-ui/decal-component-attenuation-angle-1.png)

The black scorch mark decal has a larger sort key than the orange dirt decal and thus is on top.

![Decal component sorting order example](/images/user-guide/components/reference/atom/decal-component-ui/decal-component-sorting-example.png)
