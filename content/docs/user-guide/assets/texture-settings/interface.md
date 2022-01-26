---
linkTitle: Interface
title: Texture Settings User Interface
description: Learn to navigate the Texture Settings interface to customize how image source assets are processed. 
weight: 200
toc: true
---

With **Texture Settings**, you can specify how texture source assets are processed for **Open 3D Engine (O3DE)**. Texture Settings operates on one texture source asset at a time. The options you choose in Texture Settings are saved in a `.assetinfo` sidecar file for the source asset. **Asset Processor** reads the `.assetinfo` file and applies the options whenever the texture source asset is processed.

## Source and product assets

Texture product assets can be generated for multiple platforms for a single source asset. However, different target platforms might have different requirements and limitations. A mobile platform, for example, might have a lower maximum texture resolution than a desktop platform. You can use the following general guidelines when creating texture source assets to help ensure cross-platform compatibility:

* Texture resolutions should be a *power of two* such as 256, 512, or 2048.
* Textures can be rectangular (2048 x 1024, for example) but square resolutions (1024 x 1024) are preferred in most scenarios. Some source types, such as high dynamic range (HDR) environment textures, commonly have rectangular power of two resolutions.
* Use a texture resolution appropriate for the texture's use case. A texture for a small background asset, for example, doesn't require a resolution as high as a texture for an interactive object that appears close to the camera. A UI texture might not need to be larger than its screen dimensions.
* Create source textures in a format appropriate for their use case. Using source textures that have channel counts, bit depths, and color spaces that suit their intended use can minimize issues when processing textures.  

The number of product assets generated when a texture source asset is processed depends on the the selected texture settings. A texture source asset always generates at least one `.streamingimage` product asset. If **Mipmap Settings** is enabled, `.imagemipchain` product assets containing mipmap information are produced as well. You can view the product assets by expanding the asset list of a texture source asset in **Asset Browser**.

## Using texture settings

To open Texture settings, do the following:

1. In **O3DE Editor**, in Asset Browser, select the texture source asset to modify. You can use the search bar at the top of Asset Browser to filter the list.

1. **Right-click** the texture source asset and then choose **Edit Texture Settings...**.

![ Right click an asset to open Texture Settings. ]( /images/user-guide/assets/texture-settings/open-texture-settings.png )

## Interface sections

The Texture Settings interface has three sections: a texture preview, texture settings, and mipmap settings.

### Texture preview

The texture preview section displays the texture product asset. This section also provides information tools that you can use to examine the results of processing the source asset. 

{{< image-width "/images/user-guide/assets/texture-settings/texture-settings-ui-01.png" "600" "The Texture Settings user interface texture preview." >}}

| Section | Description |
| - | - |
| **A** | Selects the channel(s) to display in the texture preview. You can choose to display RGB, RGB with Alpha, or the individual Red, Green, Blue, or Alpha channels. |
| **B** | When enabled, a two by two tiled texture preview is displayed so that repeating textures can be checked for seams. |
| **C** | Hold one of this specified hotkeys to toggle the texture preview display.<br><br>**Shift** - Display the RGBA channels.<br>**Alt** - Display the Alpha channel.<br>**Space** - Display the full resolution texture. |
| **D** | A preview of the texture product asset. By default, the texture is automatically processed when any option is changed and the texture preview displays the result. |
| **E** | Selects whether the preview should update automatically or manually. When preview update is set to manual, the preview display does not update with changes to texture settings. To update the preview, **left-click** in this area.  |
| **F** | Displays information about the texture product asset including the current mipmap level, the texture resolution, and the product asset file size. |

### Texture settings

The texture settings section contains presets for different texture types as well options and information for various target platforms. 

{{< image-width "/images/user-guide/assets/texture-settings/texture-settings-ui-02.png" "600" "The Texture Settings user interface texture settings." >}}

**Active Preset** - Provides a list of presets for various texture use cases. The selected preset specifies how the texture source asset is processed. Some presets require specialized texture source assets.

Presets are define in JSON formatted `.preset` files that are located in `/o3de/Gems/Atom/Asset/ImageProcessingAtom/Assets/config/`. You can create your own presets based on the specifications of existing presets. 

**Active file conventions** - Texture source assets can use a postfix naming convention that identifies the texture type, automatically selecting an appropriate texture preset. The naming conventions associated with each preset type are listed beneath the selected preset in the **Active file conventions** property.

The postfix strings for each preset are specified in `/o3de/Gems/Atom/Asset/ImageProcessingAtom/Assets/config/ImageBuidler.settings`. You can edit this file modify existing postfix strings or add strings for your own presets.

The table below describes the available presets and their requirements.

| Preset | Description | Requirements | Naming Conventions |
| - | - | - | - |
| Albedo | An RGB color texture that contains surface color but doesn't contain lighting information. | Any RGB image with or without an alpha channel in a supported image format. The alpha channel is discarded when the image is processed. | `_alb`<br>`_albedo`<br>`_basecolor`<br>`_bc`<br>`_col`<br>`_color`<br>`_diff`<br>`_diffuse`<br> |
| AlbedoWithCoverage | An RGBA color texture with a 1-bit alpha channel that contains surface color but doesn't contain lighting information. | Any RGBA image in a supported image format. The alpha channel processed as 1-bit regardless of the source asset bit depth. | `_alb`<br>`_albedo`<br>`_basecolor`<br>`_bc`<br>`_col`<br>`_color`<br>`_diff`<br>`_diffuse`<br> |
| AlbedoWithGenericAlpha | An RGBA color texture with an 8-bit alpha channel that contains surface color but doesn't contain lighting information. |  | `_alb`<br>`_albedo`<br>`_basecolor`<br>`_bc`<br>`_col`<br>`_color`<br>`_diff`<br>`_diffuse`<br> |
| AmbientOcclusion | A linear grayscale texture that contains shading information for surface areas where ambient lighting is blocked, such as wrinkles and creases. |  | `_amb`<br>`_ambientocclusion`<br>`_ambocc`<br>`_ao`<br> |
| ConvolvedCubemap | An RGB color cube (environment) map texture used for quick lighting calculations. |  | `_ccm`<br>`_convolvedcubemap`<br> |
| Decal_AlbedoWithOpacity | An RGBA color texture with a high quality alpha channel that is projected onto a surface. |  | `_decal` |
| Displacement | A linear grayscale texture that contains surface displacement or height information. |  | `_d`<br>`_disp`<br>`_displ`<br>`_displacement`<br>`_dm`<br>`_dsp`<br>`_h`<br>`_height`<br>`_hm`<br>`_ht`<br> |
| Emissive | An RGB color texture that defines areas of a surface that emit light or glow. |  | `_e`<br>`_em`<br>`_emissive`<br>`_emit`<br>`_glow`<br> |
| Gradient | A linear RGB texture that contains gradual changes in value or tone. |  |  |
| Grayscale | A simple linear grayscale texture. |  | `_mask`<br> |
| IBLDiffuse | A 16-bit RGB cubemap containing the color component for image based lighting (IBL). |  | `_ibldiffusecm` |
| IBLGlobal | An HDR cubemap that can generate both specular and diffuse cubemaps for IBL. |  | `_cm`<br>`_cubemap`<br>`_iblglobalcm`<br> |
| IBLSkybox | An HDR RGB cubemap that generates a packed 32-bit RGB skybox cubemap as well as diffuse and specular IBL cubemaps. |  | `_iblskyboxcm` |
| IBLSpecular | A 16-bit RGB cubemap composed of six 256 pixel square images, that contains the specular component of an IBL cubemap. |  | `_iblspecularcm`<br>`_iblspecularcm256`<br> |
| IBLSpecularHigh | A 16-bit, 512 by 512 pixel, RGB cubemap containing the specular component of an IBL cubemap. |  | `_iblspecularcm512`<br> |
| IBLSpecularLow | A 16-bit, 128 by 128 pixel, RGB cubemap containing the specular component of an IBL cubemap. |  | `_iblspecularcm128`<br> |
| IBLSpecularVeryHigh | A 16-bit, 1024 by 1024 pixel, RGB cubemap containing the specular component of an IBL cubemap. |  | `_iblspecularcm1024`<br> |
| IBLSpecularVeryLow | A 16-bit, 64 by 64 pixel, RGB cubemap containing the specular component of an IBL cubemap. |  | `_iblspecularcm64`<br> |
| LUT_R32F |  |  | `_lutr32f` |
| LUT_RG16 |  |  | `_lutrg16` |
| LUT_RG32F |  |  | `_lutrg32f` |
| LUT_RG8 |  |  | `_lut` |
| LUT_RGBA16 |  |  | `_lutrgba16` |
| LUT_RGBA16F |  |  | `_lutrgba16f` |
| LUT_RGBA32F |  |  | `_lutrgba32f` |
| LUT_RGBA8 |  |  | `_lutrgba8` |
| LayerMask |  |  | `layers_rgbmask` |
| Normals |  |  | `_ddn`<br>`_n`<br>`_nm`<br>`_nor`<br>`_norm`<br>`_normal`<br>`_normalmap`<br>`_normals`<br>`_nrm`<br> |
| NormalsWithSmoothness |  |  | `_ddna`<br>`_na`<br>`_nma`<br>`_normala`<br>`_nrma`<br> |
| Opacity |  |  | `_blend`<br>`_mask`<br>`_msk`<br>`_o`<br>`_op`<br>`_opac`<br>`_opacity`<br>`_sss`<br>`_trans`<br> |
| ReferenceImage |  |  |  |
| ReferenceImage_HDRLinear |  |  |  |
| ReferenceImage_HDRLinearUncompressed |  |  |  |
| ReferenceImage_HDRLinear |  |  |  |
| Reflectance |  |  | `_f0`<br>`_g`<br>`_gloss`<br>`_m`<br>`_metal`<br>`_metallic`<br>`_metalness`<br>`_mt`<br>`_mtl`<br>`_ref`<br> |
| Skybox |  |  | `_skyboxcm` |
| UserInterface_Compressed |  |  | `_ui` |
| UserInterface_Lossless |  |  | `_ui` |

### Mipmap settings

{{< image-width "/images/user-guide/assets/texture-settings/texture-settings-ui-03.png" "600" "The Texture Settings user interface mipmap settings." >}}

## The `.assetinfo` sidecar file

The asset groups you create, the modifiers you add, and the options you set in Scene Settings are all saved to a `.assetinfo` sidecar file when you choose **Update** on the bottom right of the Scene Settings interface. Asset Processor recognizes the sidecar file as a source dependency for the source asset, and automatically processes the source asset when the `.assetinfo` file is created or updated.

You can create, for example, a 3D scene source asset that contains plants of different types and sizes, with skinned meshes and LODs, and then use Scene Settings to specify mesh groups, actors, motions, and PhysX colliders for each plant contained in the source asset. The information needed to process all the plants is contained in a single `.assetinfo` file. It's important to understand that if you choose to process many product assets from a single source asset, a change to any aspect of the source asset or its dependencies will automatically reprocess everything contained in the source asset.

The `.assetinfo` sidecar file is formatted with JSON, is human-readable, and can be easily generated and modified through automated processes such as a Python script.

