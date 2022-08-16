---
title: Global Skylight (IBL) Component
linktitle: Global Skylight (IBL)
description: 'Open 3D Engine (O3DE) Global Skylight (IBL) component reference.'
toc: true
---

The **Global Skylight (IBL)** component provides Specular and Diffuse image-based lighting using cubemaps.  This is also known as **Global IBL**.


## Provider ##

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)


## Properties

![global-skylight-ibl-component-base-properties](/images/user-guide/components/reference/atom/global-skylight-ibl/global-skylight-ibl-base-properties-ui.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Diffuse Image** | Specifies the cubemap image to use for Diffuse IBL in the scene. |  |  |
| **Specular Image** | Specifies the cubemap image to use for Specular IBL in the scene. |  |  |
| **Exposure** | Specifies the exposure to use when applying the IBL cubemaps to the scene. | `-5.0` to `5.0` | `0.0` |