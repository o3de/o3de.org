---
linkTitle: HDRi Skybox
title: HDRi Skybox Component
description: Create a skybox using the HDRi Skybox component in your Open 3D Engine (O3DE) project. 
toc: true
---

The **HDRi Skybox** component creates a skybox in your scene by using a cubemap texture. A cubemap texture, or skybox, is an image source asset that's used to light the scene. The image is made of data per pixel per channel, which represents the number of exposure values (EV), or HDR *stops*. 

Both 8-bit low-dynamic range (LDR) and 32-bit high-dynamic range (HDR) images are compatible with the HDRi Skybox component. Image formats such as .jpg and .png are commonly 8-bit, while .exr formats are 32-bit. An HDR format results in higher-quality skybox values, while an LDR format produces flatter images with low contrast.

The HDRi Skybox component supports two image layouts for cubemaps: LatLong (Equirectangular) and Vertical Strip cubemap.

- LatLong (Equirectangular)

    {{< image-width "/images/user-guide/components/reference/atom/hdri-skybox/latlong-map.png" "400" "LatLong map (Equirectangular)" >}}

- Vertical Strip

    {{< image-width "/images/user-guide/components/reference/atom/hdri-skybox/vertical-strip-cubemap.png" "400" "Vertical strip cubemap" >}}


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


## How cubemaps are processed

In this process, O3DE uses two image naming conventions that informs **Asset Processor** and **Image Builder** to take the input image source asset and generate a corresponding cubemap `.streamingimage` product asset that's compatible with the HDRi Skybox component. 

- An image file with a `_skyboxcm` suffix generates the cubemap. 

- An image file with a `_iblskyboxcm` suffix generates three cubemaps for lighting: 
  
	- `<image>_iblskyboxcm.exr.streamingimage`: A high-resolution cubemap with no mip maps. 

	- `<image>_iblskyboxcm_ibldiffuse.exr.streamingimage`: A low-resolution cubemap with no mip maps that's used for diffuse indirect lighting. 

	- `<image>_iblskyboxcm_iblspecular.exr.streamingimage`: A medium-resolution mipmap chain that's used for physically based rendering (PBR) specular reflections. 

{{< note >}}
The diffuse and specular reflections PBR lighting cubemaps are used in conjunction with the [Global Skylight (IBL)](/docs/user-guide/components/reference/atom/global-skylight-ibl/) component.
{{</ note >}}


Available cubemap assets
------------------------
You can find examples of generated cubemaps at `<o3de>/Gems/Atom/Feature/Common/Assets/LightingPresets`. You can also check out Polyhaven's online collection of public domain HDRi images with CCO license. 

Converting cubemaps to work in O3DE
-----------------------------------
To use cubemaps from online resources:
1. Download the cubemap file as .exr format.
2. Rename the file with the `iblskyboxcm.exr` or `_skyboxcm` extension. 
3. Add the file to the `Assets` folder in your project. 

This generates a skybox compatible with the HDRi Skybox component. 