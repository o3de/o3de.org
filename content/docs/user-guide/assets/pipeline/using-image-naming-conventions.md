---
description: ' Learn how to rename your image files to make use of existing or customized
  image processing presets in Open 3D Engine. '
title: Using Image Naming Conventions
draft: true
---

You can use any existing or created image processing presets. To do this, append the suffix to the end of the file name before you add it to your O3DE directory.

**Example**
If you create an image that you want to use as a decal, add the `_decal` suffix to the file name before the extension. For example, to convert `scorchmark.tif` as a decal, rename it to `scorchmark_decal.tif`. You then add it to your O3DE directory, so that Asset Processor automatically processes the file.

Some of the existing presets used by the Asset Processor include the following:
+ `_diff` - Albedo
+ `_spec`, `_refl` - Specular textures
+ `_ddn` - Normal map texture
+ `_ddna` - Normal map texture with smoothness in alpha
+ `_bump` - Converts grayscale texture to normal map
+ `_displ` - Displacement map
+ `_decal` - Decal
+ `_detail` - Merged detail maps
+ `_cm`, `_cubemap` - HDR reflection textures
+ `_cch` - Color chart
+ `_mask` - Grayscale mask
+ `_sss`, `_trans`, `_opac` - Opacity
