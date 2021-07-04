---
description: ' Use the Resource Compiler image tool to manually select an image
  processing preset in Open 3D Engine and then save the settings to source control. '
title: Using the Resource Compiler Image Tool
---

{{< preview-migrated >}}

Before you can use the Resource Compiler image tool, you must install RC Shell Commands.

**Note**
You can also use the Texture Settings Editor to manage your texture settings for image files. For more information, see [Texture Settings Editor](/docs/userguide/texture-settings-editor.md).

**To open the Resource Compiler image tool**
+ Right\-click an image file from within a file explorer and choose **RC Open Image**.

![\[Open image files with the Resource Compiler image tool\]](/images/user-guide/assets/pipeline/asset-pipeline-images-resourcecompiler-2.png)

The Resource Compiler image tool lists image processing presets defined in the `rc.ini` file.

**To select an image processing preset and save it to an .exportsettings file**

1. In the Resource Compiler image tool, under **Preset**, select a preset from the drop\-down menu.

1. \(Optional\) To see more information about the preset settings, click **Show preset info**.

1. Select other options you want to change, such as [MIP Control](/docs/userguide/assets/generating-mipmaps.md).

1. Click **Generate Output**.

   Your `imagefilename.exportsettings` file and the resulting `imagefilename.dds` output is saved in the same directory as your source image.
![\[In the Resource Compiler image tool, select a preset and then click Generate Output to generate the .exportsettings file to check in.\]](/images/user-guide/assets/pipeline/asset-pipeline-images-resourcecompiler.jpg)
