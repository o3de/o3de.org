---
linkTitle: Texture Settings
title: Customize Texture Processing with Texture Settings
description: With Texture Settings, you can set custom processing options for textures, skybox images, and image based lighting (IBL) assets.
weight: 400
toc: true
---

Textures created in third-party applications must be processed as runtime optimized product assets to be used in **Open 3D Engine (O3DE)**. O3DE can process many image formats including some formats that have special use cases such as look up tables (LUT) and image based lighting (IBL).

When texture source assets are placed in a scan directory, **Asset Processor** detects the new or modified files, determines the contents of the files, and then processes them using basic default settings. However, textures might require specialized processing depending on their use case. With **Texture Settings**, you can customize how texture source files are processed.

Texture Settings creates a `.assetinfo` sidecar file containing your custom processing options for a texture source asset. The source asset is not changed. When Asset Processor processes the source asset, it uses the options in the `.assetinfo` file to generate product assets.

## Scene Settings topics

The topics in this section provide general information about the Texture Settings interface and information about the image file types supported by Texture Settings.

| Topic | Description |
| - | - |
| [Interface](interface) | An overview of the Texture Settings interface. |
| [Image format support](image-format-support) | In depth information on image types supported in O3DE. |