---
title: Decal component
linktitle: Decal
description: "Open 3D Engine (O3DE) Decal component reference."
toc: true
---

The **Decal** component enables an entity to project a material onto a mesh. A large number of overlapping decals can be applied to a single mesh.


## Provider ##

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)


## Properties


![decal-component-ui](/images/user-guide/components/reference/atom/decal-component-ui/decal-component-ui-01)

| Property | Description | Values | Default |
|-|-|-|-|
| **Attenuation Angle** |  This determines how much the decal wraps around an object. Higher attenuation values means less wrapping around the objects it is projected onto.  | `0.0` to `1.0` | `1.0` |
| **Opacity** | Determines how transparent the decal is. | `0.0` to `1.0` | `1.0` |
| **Sort Key** |  This determines how decals sort with each other. Decals with higher values will be layered overtop of decals with lower values.  | `0` to `255` | `16` |
| **Material** | The material that the decal will use. |  |  |

## Example of a decal with attenuation angle set to 0. Less attenuation means more wrapping around objects.

![decal-component-attenuation-angle-0](/images/user-guide/components/reference/atom/decal-component-ui/decal-component-attenuation-angle-0)

## Example of a decal with attenuation angle set to 1. More attenuation means less wrapping around objects.

![decal-component-attenuation-angle-1](/images/user-guide/components/reference/atom/decal-component-ui/decal-component-attenuation-angle-1)

## The black scorch mark decal has a larger sort key than the orange dirt decal and thus is on top.

![decal-component-sorting-order](/images/user-guide/components/reference/atom/decal-component-ui/decal-component-sorting-example)

