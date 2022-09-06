---
linkTitle: Creating a texture atlas
description: Creating a Texture Atlas
title: Creating a Texture Atlas
weight: 100
---

To create a texture atlas, you create a texture atlas \(`.texatlas`\) file. A texture atlas file is a text file that specifies the image files to be added to the texture atlas. Asset Processor automatically builds files that have the `.texatlas` extension.

## Texture Atlas File Format 

Each line of the `.texatlas` file represents a command that is executed sequentially. Empty lines are ignored.

### Comments
Any line that starts with `//` denotes a comment.

**Example**

```
// This is a comment that is ignored.
```

### Properties
A line that has an equals \(`=`\) sign is considered a property value assignment. Properties not specified use their default values.

The following table shows the list of configurable properties.

| Property | Default Value | Purpose |
| --- | --- | --- |
| maxdimension | 4096 | The maximum width and height of the output texture atlas. |
| padding | 1 | The minimum number of extra pixels around each texture in the texture atlas. For compression purposes, the edge pixels of each texture are duplicated. The amount of duplication is determined by the calculation `image_size + padding` rounded up to the nearest compression unit of four. |
| poweroftwo | false |  Whether the width and height of the output texture atlas is a power of two. If [PVRTC](https://en.wikipedia.org/wiki/PVRTC) compression is used for iOS, the output texture is a power of two regardless of this setting. |
| square | false |  Whether the width and height of the output texture atlas is the same. If PVRTC compression is used for iOS, the output texture is a square regardless of this setting.  |
| unusedcolor | \#3CB371FF | The color for the unused space in the output texture atlas. |
| whitetexture | true | Whether to include a white texture with a path name of WhiteTexture in the output texture atlas. |
| presetname | TextureAtlas |  The preset to use for image processing. If TextureAtlas is used as the **presetname**, either explicitly or by default, images will be compressed. This compression can lead to loss of image quality.  |

When you assign property values, note the following:
+ Whitespace is allowed.
+ Properties and values aren't case sensitive.
+ If a property value is assigned twice, only the last assignment is accepted.
+ The following entries report an error to the Asset Processor and fail the asset processing job:
  + Unrecognized properties
  + Properties with incorrect values
  + Lines with more than one equal (=) symbol

### File Paths
If a line specifies a path to an image file, the image is included in the texture atlas. Image file paths can be relative to any watch folder that the Asset Processor monitors for assets. If a line refers to a file that can't be loaded, an error is reported to the Asset Processor and the asset processing job fails. Lines that are neither comments nor properties are assumed to be image file paths.

**Example**

```
UI/Textures/LyShineExamples/button.tif
```

## Updating a Texture Atlas 

The Asset Processor automatically rebuilds the texture atlas if a texture in the atlas changes or if an existing source `.texatlas` file changes.

## Texture Atlas Output Files 

The Asset Processor outputs two files that represent a texture atlas: a `.dds` file and a `.texatlasidx` file. The `.dds` file is a texture that contains all the images specified in the `.texatlas` file. The `.texatlasidx` file stores coordinate and other image information.
