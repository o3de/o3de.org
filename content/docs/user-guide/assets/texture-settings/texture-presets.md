---
linkTitle: Texture Presets
title: Texture Settings Presets
description: Specify how a texture source asset is automatically processed for Open 3D Engine (O3DE) with texture presets. 
weight: 400
toc: true
---

The following table provides information on the available texture processing presets. You can append one of the strings in the **Name Conventions** column to the name of your texture source asset to automatically process the texture with the corresponding preset.

| Preset | Description | Source Requirements | Pixel Format | Name Conventions |
|-|-|-|-|-|
| Albedo | A color texture that contains unlit surface color. | An RGB image. If the image has an alpha channel, it is discarded when the image is processed. | Desktop: BC1<br>iOS: ASTC_6x6<br>Android: ASTC_4x4 | `_alb`<br>`_albedo`<br>`_basecolor`<br>`_bc`<br>`_col`<br>`_color`<br>`_diff`<br>`_diffuse`<br> |
| AlbedoWithCoverage | A color texture with a 1-bit alpha channel that contains unlit surface color. | An RGBA image. The alpha channel is processed as 1-bit regardless of the texture source asset bit depth. | Desktop: BC1a<br>iOS: ASTC_6x6<br>Android: ASTC_4x4 | `_albc`<br>`_albedoc`<br>`_basecolorc`<br>`_bcc`<br>`_colc`<br>`_colorc`<br>`_diffc`<br>`_diffusec`<br> |
| AlbedoWithGenericAlpha | A color texture with an 8-bit alpha channel that contains unlit surface color. | An RGBA image. | Desktop: BC3<br>iOS: ASTC_6x6<br>Android: ASTC_4x4 | `_alba`<br>`_albedoa`<br>`_basecolora`<br>`_bca`<br>`_cola`<br>`_colora`<br>`_diffa`<br>`_diffusea`<br> |
| AmbientOcclusion | A linear greyscale texture that contains shading values for surface areas where ambient lighting is blocked, such as wrinkles and creases. | A greyscale image with one channel. | Desktop: BC4<br>Mobile: ASTC_4x4 | `_amb`<br>`_ambientocclusion`<br>`_ambocc`<br>`_ao`<br> |
| ConvolvedCubemap | A cubemap texture used for quick lighting calculations. This preset has a resolution of 256 by 256. | An HDR spherical environment map or cubemap. | R9G9B9E5 | `_ccm`<br>`_convolvedcubemap`<br> |
| Decal_AlbedoWithOpacity | A high quality color texture with an alpha channel that is projected onto a surface. | An RGBA image. | Desktop: BC7t<br>Mobile: ASTC_4x4 | `_decal` |
| Displacement | A linear greyscale texture that contains surface displacement or height values. | A greyscale image with one channel. | Desktop: BC4<br>Mobile: ASTC_4x4 | `_d`<br>`_disp`<br>`_displ`<br>`_displacement`<br>`_dm`<br>`_dsp`<br>`_h`<br>`_height`<br>`_hm`<br>`_ht`<br> |
| Emissive | A high quality color texture that defines areas of a surface that emit light or glow. | An RGB image. | Desktop: BC7<br>iOS: ASTC_6x6<br>Android: ASTC_4x4 | `_e`<br>`_em`<br>`_emissive`<br>`_emit`<br>`_glow`<br> |
| GSI (Gradient Signal Image) | A color texture with alpha that contains a gradient of gradual changes in value. | An RGBA image. | Same as input pixel format. | `_gsi` |
| GSI8 | A texture with a single 8-bit channel (red) that contains a gradient of gradual changes in value. | An image with a single channel or an RGB image. | R8 | `_gsi8` |
| GSI16 | A texture with a single 16-bit channel (red) that contains a gradient of gradual changes in value. | An image with a single channel or an RGB image. | R16 | `_gsi16` |
| GSI32 | A texture with a single 32-bit channel (red) that contains a gradient of gradual changes in value. | An image with a single channel or an RGB image. | R32 | `_gsi32` |
| Gradient | A color texture with alpha that contains a gradient of gradual changes in value. | An RGBA image. | R8G8B8A8 | `_grad`<br>`_gradient` |
| Greyscale | A linear greyscale texture. | A greyscale image with one channel. | Desktop: BC4<br>Mobile: ASTC_4x4 | `_mask`<br> |
| IBLDiffuse | An HDR cubemap containing the color component for IBL. | An HDR spherical environment map or cubemap. | Windows: BC6UH<br>Linux: BC6UH<br>macOS: R9G9B9E5<br>iOS: R9G9B9E5<br>Android: R9G9B9E5 | `_ibldiffusecm` |
| IBLGlobal | HDR cubemaps that contain the specular and diffuse components for IBL. | An HDR spherical environment map or cubemap. | R8G8B8A8 | `_cm`<br>`_cubemap`<br>`_iblglobalcm`<br> |
| IBLSkybox | HDR cubemaps that contain the skybox texture, diffuse, and specular components for IBL. | An HDR spherical environment map or cubemap. | R9G9B9E5 | `_iblskyboxcm` |
| IBLSpecular | A 256 by 256 pixel HDR cubemap that contains the specular component for IBL. | An HDR spherical environment map or cubemap. | R9G9B9E5 | `_iblspecularcm`<br>`_iblspecularcm256`<br> |
| IBLSpecularHigh | A 512 by 512 pixel HDR cubemap that contains the specular component for IBL. | An HDR spherical environment map or cubemap. | R9G9B9E5 | `_iblspecularcm512`<br> |
| IBLSpecularLow | A 128 by 128 pixel HDR cubemap that contains the specular component for IBL. | An HDR spherical environment map or cubemap. | R9G9B9E5 | `_iblspecularcm128`<br> |
| IBLSpecularVeryHigh | A 1024 by 1024 pixel HDR cubemap that contains the specular component for IBL. | An HDR spherical environment map or cubemap. | R9G9B9E5 | `_iblspecularcm1024`<br> |
| IBLSpecularVeryLow | A 64 by 64 pixel HDR cubemap that contains the specular component for IBL. | An HDR spherical environment map or cubemap. | R9G9B9E5 | `_iblspecularcm64`<br> |
| LUT_R32F | A look up table (LUT) texture with a 32-bit floating point red channel. | An RGB image with a 32-bit floating point red channel. | R32F | `_lutr32f` |
| LUT_RG16 | A LUT texture with 16-bit red and green channels. | An RGB image with 16-bit red and green channels. | R16G16F | `_lutrg16` |
| LUT_RG32F | A LUT texture with 32-bit floating point red and green channels. | An RGB image with 32-bit floating point red and green channels. | R32G32F | `_lutrg32f` |
| LUT_RG8 | A LUT texture with 8-bit red and green channels. | An RGB image with 8-bit red and green channels. | R8G8 | `_lut` |
| LUT_RGBA16 | A LUT texture with 16-bit channels. | An RGBA image with 16-bit channels. | R16G16B16A16 | `_lutrgba16` |
| LUT_RGBA16F | A LUT texture with 16-bit floating point channels. | An RGBA image with 16-bit floating point channels. | R16G16B16A16F | `_lutrgba16f` |
| LUT_RGBA32F | A LUT texture with 32-bit floating point channels. | An RGBA image with 32-bit floating point channels. | R32G32B32A32F | `_lutrgba32f` |
| LUT_RGBA8 | A LUT texture with 8-bit channels. | An RGBA image with 8-bit channels. | R8G8B8A8 | `_lutrgba8` |
| LayerMask | A color mask texture with 8-bit color channels and an additional 8-bits reserved. | An RGB image. If the image has an alpha channel, it is discarded when the image is processed. | R8G8B8X8 | `layers_rgbmask` |
| Normals | A linear color texture that contains tangent space surface normals. | An RGB image with tangent space surface normals encoded in the RGB channels.  | Desktop: BC5s<br>Mobile: ASTC_4x4 | `_ddn`<br>`_n`<br>`_nm`<br>`_nor`<br>`_norm`<br>`_normal`<br>`_normalmap`<br>`_normals`<br>`_nrm`<br> |
| NormalsWithSmoothness | A linear color texture that contains tangent space surface normals in the color channels and a smoothing or gloss value in the alpha channel. | An RGBA image with tangent space surface normals encoded in the RGB channels and gloss or smoothing values encoded in the alpha channel. | Desktop: BC5s<br>Mobile: ASTC_4x4 | `_ddna`<br>`_na`<br>`_nma`<br>`_normala`<br>`_nrma`<br> |
| Opacity | A linear greyscale image containing opacity values. | A greyscale image with one channel. | Desktop: BC4<br>Mobile: ASTC_4x4 | `_blend`<br>`_mask`<br>`_msk`<br>`_o`<br>`_op`<br>`_opac`<br>`_opacity`<br>`_sss`<br>`_trans`<br> |
| ReferenceImage | An uncompressed color reference texture with alpha. | An RGBA image. | R8G8B8A8 | `_ref` |
| ReferenceImage HDRLinear | An HDR linear color reference texture. | An RGB image with 16-bit channels. | Windows, Linux: BC6UH<br>macOS, iOS, Android: R9G9B9E5 | `_refhdr`  |
| ReferenceImage HDRLinearUncompressed | An uncompressed HDR linear color reference texture. | An RGB image with 16-bit floating point channels. | R16G16B16A16F | `_refhdru` |
| ReferenceImage Linear | An uncompressed linear color reference texture with alpha. | An RGBA image. | R8G8B8A8 | `_reflinear` |
| Reflectance | A linear greyscale image containing reflectance values. | A greyscale image with one channel. | Desktop: BC4<br>iOS: ASTC_6x6<br>Android: ASTC_4x4 | `_f0`<br>`_g`<br>`_gloss`<br>`_m`<br>`_metal`<br>`_metallic`<br>`_metalness`<br>`_mt`<br>`_mtl`<br>`_ref`<br> |
| Skybox | An HDR skybox cubemap with a minimum size of 256 by 256 pixels. | An HDR spherical environment map or cubemap. If the image has an alpha channel, it is discarded when the image is processed. | R9G9B9E5 | `_skyboxcm` |
| UserInterface Compressed | A compressed color texture that contains a UI element with an 8-bit alpha channel. | An RGBA image. | Windows, Linux: R8G8B8A8<br>macOS: BC1<br>iOS: ASTC_6x6<br>Android: ASTC_4x4  | `_ui` |
| UserInterface Lossless | An uncompressed linear color texture that contains a UI element with an 8-bit alpha channel. | An RGBA image. | R8G8B8A8 | `_uil` |