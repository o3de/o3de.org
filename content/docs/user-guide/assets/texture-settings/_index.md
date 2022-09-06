---
linkTitle: Texture Settings
title: Customize Texture Processing with Texture Settings
description: With Texture Settings, you can set custom processing options for textures, skybox images, and image based lighting (IBL) assets.
weight: 400
toc: true
---

 Texture source assets must be processed as optimized streaming images for use in **Open 3D Engine (O3DE)**. With **Texture Settings** you can specify how the texture source assets you create in third-party applications are processed. Several source image formats are supported, and there are many texture processing presets provided for various use cases. You can use naming conventions to automatically select a texture processing preset, and use the options provided by Texture Settings to view, troubleshoot, and fine-tune the texture processing results.

Texture Settings creates a `.assetinfo` sidecar file containing your custom processing options for a texture source asset. The source asset is not changed. When Asset Processor processes the source asset, it uses the options in the `.assetinfo` file to generate product assets.

## Texture Settings topics

The topics in this section provide information about the image file types supported by Texture Settings and the Texture Settings user interface.

| Topic | Description |
| - | - |
| [Texture Asset Guidelines](texture-assets) | Information on image formats supported by O3DE and guidelines for creating texture source assets. |
| [Texture Settings User Interface](interface) | An overview of the Texture Settings user interface. |
| [Texture Presets](texture-presets) | Technical information including name conventions for texture settings presets. |
