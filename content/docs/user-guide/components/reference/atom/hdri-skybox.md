---
linkTitle: HDRi Skybox
title: HDRi Skybox Component
description: Create a skybox using the HDRi Skybox component in your Open 3D Engine (O3DE) project. 
toc: true
---

The **HDRi Skybox** component creates a skybox in your scene by using a cubemap texture. A cubemap texture, or skybox, is an image source asset that's used to light the scene. The image is made of data per pixel per channel, which represents the number of exposure values (EV), or HDR *stops*.


## Provider

[Atom Gem](/docs/user-guide/gems/reference/rendering/atom/atom/)


## Limitations

The HDRi Skybox and **Physical Sky** components are interchangeable skybox solutions. If you have both components or multiples of one component, only the first active skybox will render.


## Properties

![HDRi Skybox interface](/images/user-guide/components/reference/atom/hdri-skybox-component-ui.png)


### HDRi Skybox properties

| Property | Description | Value | Default |
| - | - | - | - |
| **Cubemap Texture** | A cubemap texture that HDRi Skybox supports.  | A `.streamingimage` product asset. |  |
| **Exposure** | Scales the intensity of the exposure. The exposure value unit is EV100 (an EV with 100 international standards organization (ISO)). | Float: -20.0 - 20.0 | `0.0` |


## Rotate skybox

To rotate the skybox in the **O3DE Editor**, adjust the **Rotation** property in the entity's transform.

![Rotate the skybox](/images/user-guide/components/reference/atom/hdri-skybox/hdri-skybox-rotate.png)
