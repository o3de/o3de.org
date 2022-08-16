---
linkTitle: Texture Assets
title: Texture Asset Guidelines
description: Information about image formats and general guidelines for processing textures with Texture Settings in Open 3D Engine (O3DE).
weight: 200
toc: true
---

Textures are processed images that are most commonly mapped to meshes as part of a material to create a surface appearance. With physically based rendering (PBR) and image based lighting (IBL), they can also provide specific rendering data such as the diffuse and specular components of a high dynamic range cubemap, or the metallic component of a surface. Textures can be used to create UI elements. Gradient textures can provide distribution and falloff areas for instanced assets such as vegetation. Heightmap textures can be used to generate 3D terrain.

Although textures most often contain an image, they can provide a convenient method to get other data into **Open 3D Engine (O3DE)**. If you have data that can be represented in the color and alpha channels of an image, it can be processed as a texture.

This topic provides information about the various texture source and product assets, and general guidelines for creating textures for O3DE.

## Source assets

A _texture source asset_ can be any of the image formats supported by O3DE. Image formats provide varied support for color depths and channels, so it's important to use a format that satisfies the requirements of the texture's intended use.

The following table lists the image formats supported by O3DE:

| **Format** | **Description** | **Max color depth** | **Transparency** |
| - | - | - | - |
| `.bmp` | An uncompressed RGB image. | 8-bit gray<br>24-bit RGB | Not supported |
| `.gif` | An image with an indexed color table (256 colors maximum) and support for transparency.  | 8-bit table | 1-bit mask |
| `.jpg`, `.jpeg` | A compressed RGB image. | 8-bit gray<br>24-bit RGB | Not supported |
| `.png` | An RGBA image with lossless compression. | 16-bit gray<br>48-bit RGB | 16-bit Alpha |
| `.tga` | An RGBA image that can be uncompressed or use lossless compression. | 24-bit RGB | 8-bit Alpha |
| `.tif`, `tiff` | An RGBA image with support for layers that can be uncompressed or use lossless compression. | 16-bit gray<br>96-bit RGB | 32-bit Alpha |
| `.dds` | A texture container format most often used for normal maps. `.dds` supports a number of layouts and compression algorithms. You can learn more about `.dds` by visiting Microsoft's [Programming Guide for DDS](https://docs.microsoft.com/en-us/windows/win32/direct3ddds/dx-graphics-dds-pguide). | 16-bit luminance<br>96-bit RGB | 32-bit Alpha |
| `.exr` | A high dynamic range (HDR) image used to generate IBL and skybox cubemaps. `.exr` images can be uncompressed or use one of several lossy or lossless compression methods. | 96-bit RGB | 32-bit Alpha |

{{< note >}}
Texture source assets often use 8-bits per channel color depth (24-bit RGB or 32-bit RGBA) even when the image format supports 16-bits or 32-bits per channel. Using 8-bits per channel produces smaller source assets that can be processed faster. The texture is compressed when processed, and in most use cases, the product asset has less than 8-bits per channel.

The exceptions are scenarios where more than 8-bits per channel are required such as textures that are used for IBL cubemaps or terrain heightmaps. Texture source assets with 16-bits and 32-bits per channel should be used when more granular values are needed. An 8-bit heightmap, for example, only provides 256 values. This is insufficient for representing significant transitions in terrain height. A 16-bit heightmap, by contrast, provides 65,536 values which can represent a much larger range of terrain heights and smooth transitions across terrain. 
{{< /note >}}

## Product assets

A texture source asset always generates at least one `.streamingimage` product asset. Some of the available presets in **Texture Settings**, such as the **IBLSkybox** preset, generate multiple `.streamingimage` product assets.

If the **Create Mipmaps** toggle in **Texture Settings** is enabled, `.imagemipchain` product assets containing texture *mipmaps* are produced as well. Mipmaps are progressively smaller versions of the texture that are swapped in as the asset that uses the texture moves away from the camera. Lower resolution mipmips are also used on target platforms that have lower performance specifications.

You can view the texture product assets by expanding the asset list of a texture source asset in **Asset Browser**.

## General texture guidelines

Texture product assets can be generated for multiple platforms from a single texture source asset. However, various target platforms might have unique requirements or limitations. A mobile device, for example, might have a lower maximum texture resolution than a desktop computer. You can use the following general guidelines when creating texture source assets to get the best results and to ensure cross-platform compatibility:

* **Use power of two resolutions.** Texture source asset resolutions should be a power of two such as 256, 512, 1024, or 2048.
* **Use square aspect ratios.** Square aspect ratios (2048 by 2048) are preferred for most textures. Texture source assets with equirectangular resolutions (2048 by 1024) are required in some use cases such as when IBL cubemaps are generated.
    {{< important >}}
Though you can successfully process and use textures with arbitrary resolutions and aspect ratios, you should create textures with square aspect ratios and power of 2 resolutions to get the best performance from the available graphics hardware.   
    {{< /important >}}
* **Use a suitable resolution.** Use a resolution that suits the texture's use case. For example, a texture for a small background entity doesn't require a resolution as high as an interactive entity that appears close to the camera. Similarly, a UI texture might not need to have a higher resolution than its on-screen dimensions.
* **Use an appropriate image format.** Create texture source assets in a format appropriate for their use case. Using texture source assets that have channel counts and bit depths that closely match their intended use can minimize issues when processing textures.

## Cubemap texture guidelines

Cubemaps are composed of six textures representing the sides, top, and bottom of a cube. Cubemaps are used to create quick environment reflections, skyboxes, and diffuse and specular texture components for IBL.

Presets that generate environment cubemaps, such as the IBL presets, require specialized high dynamic range source assets that are commonly referred to as _HDRIs_. These source assets usually use the `.exr` file format and have the following attributes:

* Equirectangular resolution (2048 by 1024 pixels, for example).
* A 360-degree horizontal by 180-degree vertical projection of an environment.
* 16-bits or 32-bits per channel color depth. 

The following example image shows a typical environment cubemap texture with a 360-degree by 180-degree projection and an equirectangular resolution.

{{< image-width "/images/user-guide/assets/texture-settings/hdri-example.png" "800" "An equirectangular image with a 360 degree by 180 degree environment projection known as an HDRI." >}}

An HDRI like the preceding image can produce several texture product assets including a cubemap texture for the visual skybox and cubemap textures that provide the diffuse and specular lighting components for IBL.