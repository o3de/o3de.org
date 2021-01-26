---
description: ' Use Resource Compiler in Amazon Lumberyard to convert certain source files
  into game-ready assets. '
title: Using Resource Compiler
---
# Using Resource Compiler {#asset-pipeline-rc}

Resource Compiler converts certain assets into a format that Lumberyard can use\. Resource Compiler stores the converted, game\-ready assets in a cache that mirrors your project directory\. This cache is located in the `\lumberyard_version\dev\Cache` directory\. Resource Compiler can also create PAK files\.

Asset Processor calls Resource Compiler to automatically convert new or modified assets in your Lumberyard directory\. The Resource Compiler application, `rc.exe`, is located in the `\lumberyard_version\dev\Bin64vc141\rc` directory\.

Resource Compiler converts the following file types\.

**ABC**
Alembic files

**CGF**
Legacy geometry format

**I\_CAF**
Legacy animation format

**TIF, BMP, JPG, PNG**
[Image files](/docs/userguide/assets/configuring-image-processing.md)

**FBX**
Geometry \(static mesh\) only\. Doesn't convert new EMotion FX characters or animations\.

**Note**
 All other types, such as characters and animation, are converted by the BuilderSDK system\. For more information, see [Creating a Custom Asset Builder](/docs/userguide/asset-builder-custom.md)\.

You can customize how resources are converted by modifying the `AssetProcessorPlatformConfig.ini`\. For more information, see [Configuring the Asset Pipeline](/docs/userguide/assets/configuring.md)\.

You can access a full list of arguments available for use in `AssetProcessorPlatformConfig.ini`\.

**To access a full list of arguments available for the `rc.exe` command line tool**

1. Open a command line\.

1. Navigate to the `\lumberyard_version\dev\Bin64vc141\rc` directory\.

1. Enter the following command:

   ```
   rc /help
   ```

   To output the help text to a file, enter the following command:

   ```
   rc /help >file.txt
   ```