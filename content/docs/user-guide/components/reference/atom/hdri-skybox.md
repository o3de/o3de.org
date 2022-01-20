---
linkTitle: HDRi Skybox
title: HDRi Skybox Component
description: Create a skybox using the HDRi Skybox component in your Open 3D Engine (O3DE) project. 
toc: true
---

The **HDRi Skybox** component creates a skybox with a high dynamic range (HDR) image in your scene.


## Provider

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)


## Limitations

The HDRi Skybox and **Physical Sky** components are interchangeable skybox solutions. If you have both components or multiples of one component, only the first active skybox will render.


## Properties

![HDRi Skybox interface](/images/user-guide/components/reference/atom/hdri-skybox-component-ui.png)


### HDRi Skybox properties

| Property | Description | Value | Default |
| - | - | - | - |
| **Cubemap Texture** | A *cubemap texture* is a collection of six 2D images. Each image is a square of equal size and maps to a face of a cube. The cubemap represents the sky in your scene at every direction of the world axes. | A `.streamingimage` product asset. |  |
| **Exposure** | Exponentially scales the intensity of the exposure. | Float: -20.0 - 20.0 | `0.0` |


## Rotate skybox

To rotate the skybox, adjust the **Rotation** property in the entity's transform.

![Rotate the skybox](/images/user-guide/components/reference/atom/hdri-skybox/hdri-skybox-rotate.png)