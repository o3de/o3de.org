---
description: ' Configure how Open 3D Engine processes your images or textures to make them
  game-ready. '
title: Configuring Image Processing
---

{{< preview-migrated >}}

Images or textures are automatically processed by Asset Processor, which makes them ready for O3DE game creation\. When you place an image file anywhere within your O3DE directory, Asset Processor detects and converts the file to a game\-ready asset\. O3DE has several configuration files that specify settings for the conversion process, such as the colorspace to use, texture size, [whether to generate mip maps](/docs/userguide/assets/generating-mipmaps.md), and so on\.

You can [edit the configuration files](/docs/userguide/assets/creating-image-processing-presets#asset-pipeline-creating-presets-imagecompiler-rc) to create your own image processing presets\. To use these presets, you append existing or customized suffixes to your image file names\. Based on these file name suffixes, Asset Processor automatically uses the appropriate preset to convert the image\.

After Asset Processor successfully converts the image, the resulting `.dds` asset is placed in the appropriate `lumberyard_version\dev\Cache` directory\. The image source file remains in its original form and location\.

Asset Processor calls the Resource Compiler, `rc.exe` \(located in `lumberyard_version\dev\Bin64vc141\rc`\), to convert the image files\. Resource Compiler also has an [image tool](/docs/user-guide/assets/image-tool.md), which you can use to manually select image presets, mip maps, and so on\. The Resource Compiler image tool can also output an `imagefilename.exportsettings`, which you must check in if your project uses source control such as Perforce\. Checking in the `.exportsettings` file ensures that the texture renders similarly for each person working on the project\.

O3DE supports the following image file types:
+ TIFF - No grayscale
+ TGA - Indexed or true color only; no grayscale
+ PNG - RGB or RGBA only; no grayscale
+ BMP - Any format
+ GIF - Supported, but not an ideal texture format
+ JPG - Any format

The following diagram represents the general workflow for converting images\.

![\[General workflow for converting images in O3DE\]](/images/user-guide/assets/pipeline/asset-pipeline-images.png)

**Topics**
+ [Creating Image Processing Presets](/docs/user-guide/assets/creating-image-processing-presets.md)
+ [Using Image Naming Conventions](/docs/user-guide/assets/using-image-naming-conventions.md)
+ [Using the Resource Compiler Image Tool](/docs/user-guide/assets/image-tool.md)
+ [Generating Mip Maps](/docs/userguide/assets/generating-mipmaps.md)
