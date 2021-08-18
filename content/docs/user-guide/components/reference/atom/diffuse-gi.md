---
title: Diffuse Global Illumination component
linktitle: Diffuse Global Illumination
description: Open 3D Engine (O3DE) Diffuse Global Illumination component reference.
toc: true
---

The **Diffuse Global Illumination** component is a Level component that controls the quality level of global illumination that **Diffuse Probe Grid** components provide. The diffuse global illumination technique calculates the effect of light bounce, reflection, scatter, and absorption throughout an environment. It simulates real-world lighting behavior, where objects are lit both from the light source and from the light reflected by other objects.

{{< note >}}
You must have a GPU with support for DirectX Shader Model 6.3 or later to use raytracing in the **Atom Renderer**.
{{< /note >}}

## Provider

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)

## Dependencies

None

## Properties

![Diffuse Global Illumination base properties](/images/user-guide/components/reference/atom/diffuse-gi-component-ui.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Quality Level** | Sets the quality level of all Diffuse Probe Grid components in the scene. A higher quality level produces less artifacts and more fidelity, but is more expensive in terms of performance and memory.  | `Low`, `Medium`, `High` | `Low` |
