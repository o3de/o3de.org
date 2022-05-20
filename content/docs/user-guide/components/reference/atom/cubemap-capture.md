---
title: CubeMap Capture Component
linktitle: CubeMap Capture
description: Captures a Specular IBL or Diffuse IBL cubemap at the entity location.
toc: true
---

The **CubeMap Capture** component captures a Specular IBL or Diffuse IBL cubemap at a specific location in the scene. You can use the resulting cubemap with the **Global Skylight (IBL)** and **Reflection Probe** components.

## Provider

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)


## Properties

![cubemap-capture-component-base-properties](/images/user-guide/components/reference/atom/cubemap-capture/cubemap-capture-base-properties-ui.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Capture CubeMap** | Button to begin the capture process and generate the cubemap at the entity position. |  |  |
| **Capture Type** | Specifies the type of cubemap to be generated. | `Specular IBL`, `Diffuse IBL` | `Specular IBL` |
| **Specular IBL CubeMap Quality** | Specifies the quality level of the Specular IBL cubemap.  Only visible when **Capture Type** is set to `Specular IBL`. | `Very Low`, `Low`, `Medium`, `High`, `Very High` | `Medium` |
| **CubeMap Path** | Displays the output cubemap path and file name.  This is a read-only field for information purposes only.
| **Exposure** | Specifies the exposure to use when generating the cubemap. | `-16.0` to `16.0` | `0.0` |
