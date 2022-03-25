---
linkTitle: Texture Settings
title: Customize Texture Processing with Texture Settings
description: With Texture Settings, you can set custom processing options for textures, skybox images, and image based lighting (IBL) assets.
weight: 400
toc: true
---

Texture source assets created in third-party applications must be processed to be used in **Open 3D Engine (O3DE)**. Many image formats are supported and texture processing presets are provided including some specialized use cases such as heightmaps, gradients, and image based lighting (IBL).

When texture source assets are placed in a scan directory, **Asset Processor** detects the new or modified files, determines the contents of the files, and then processes them using basic default settings. However, textures might require specialized processing depending on their use case. You can use naming conventions to automatically select a preset to process a texture, or customize how texture source files are processed with **Texture Settings**.

Texture Settings creates a `.assetinfo` sidecar file containing your custom processing options for a texture source asset. The source asset is not changed. When Asset Processor processes the source asset, it uses the options in the `.assetinfo` file to generate product assets.

## Texture Settings topics


The topics in this section provide information about the image file types supported by Texture Settings and the Texture Settings user interface.

| Topic | Description |
| - | - |
| [Texture Asset Guidelines](texture-assets) | Information on image formats supported by O3DE and guidelines for creating texture source assets. |
| [Texture Settings User Interface](interface) | An overview of the Texture Settings user interface. |
