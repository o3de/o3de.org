---
linkTitle: User Interface
title: Texture Settings User Interface
description: Learn to navigate the Texture Settings interface to customize how image source assets are processed. 
weight: 300
toc: true
---

With **Texture Settings**, you can specify how texture source assets are processed for **Open 3D Engine (O3DE)**. Texture Settings operates on one texture source asset at a time. The options you choose in Texture Settings are saved in a JSON formatted `.assetinfo` sidecar file. **Asset Processor** reads the `.assetinfo` file and applies the options whenever the texture source asset is processed.

## Using Texture Settings

To open Texture Settings, do the following:

1. In **O3DE Editor**, in **Asset Browser**, select the texture source asset to modify. You can use the search bar at the top of Asset Browser to filter the asset list.

1. **Right-click** the texture source asset and then choose **Edit Texture Settings...**.

![ Right click an asset to open Texture Settings. ]( /images/user-guide/assets/texture-settings/open-texture-settings.png )

## Interface sections

The Texture Settings interface has three sections:

* [Texture preview](#texture-preview) - On the left of the Texture Settings window is a large texture preview, information about the texture resolution and file size, and various preview tools.
* [Texture settings](#texture-settings) - Texture processing presets and resolution settings for various platforms are on the upper right side of the Texture Settings window.
* [Mipmap settings](#mipmap-settings) - A toggle to enable mipmap generation and settings for mipmap processing are available on the lower right side of the Texture Settings window.

{{< image-width "/images/user-guide/assets/texture-settings/texture-settings-ui-01.png" "800" "The Texture Settings user interface texture preview." >}}

### Texture preview

The texture preview section displays the processed texture product asset. This section also provides information and tools that you can use to examine the results of processing the source asset.

| Section | Description |
| - | - |
| **Channel Selector** | The dropdown list in the upper left corner allows you to select the channel(s) to display in the texture preview. You can choose to display RGB, RGB with Alpha, or the individual Red, Green, Blue, or Alpha channels. |
| **Tiled Preview** | When enabled, a two by two tiled texture preview is displayed so that repeating textures can be checked for visible seams. |
| **Preview Update** | The dropdown list {{< icon "caret-open.svg" >}} on the right, above the preview window, selects whether the preview should update automatically when a texture setting is changed or update manually. The texture preview updates automatically by default. When preview update is set to manual, **click** the {{< icon "refresh-active.svg" >}} refresh button to update the texture preview. |
| **Preview Window** | The preview window displays the processed texture. Hold one of the following hotkeys to toggle the texture preview display.<br><br>**Shift** - Display the RGBA channels.<br>**Alt** - Display the Alpha channel.<br>**Space** - Display the full resolution texture. |
| **Mipmap Level** | Centered below the Preview Window is the Mimap Level. The number of the currently displayed mipmap is shown. You can **click** the {{< icon "arrow_left-default.svg" >}} previous and {{< icon "arrow_right-default.svg" >}} next buttons to cycle through the available mipmaps. |
| **Resolution** | Displays the resolution of the selected mipmap level.  |
| **Size** | Displays the file size of the selected mipmap level. |


### Texture settings

The texture settings section contains presets for different texture types as well as options and information for various target platforms.

![Texture Settings preset and resolution options.](/images/user-guide/assets/texture-settings/texture-settings-ui-02.png)

| Setting | Description |
| - | - |
| **Preset** | Provides a list of presets for various texture use cases. The selected preset specifies how the texture source asset is processed. Some presets require specialized texture source assets. Presets are defined in JSON formatted `.preset` files that are located in `/o3de/Gems/Atom/Asset/ImageProcessingAtom/Assets/config/`. You can create your own presets based on the specifications of existing presets.<br><br>Refer to the [Texture presets](texture-presets) table for more information. |
| **Information** | The {{< icon "info.svg" >}} information icon, to the right of the **Presets** list, displays information about the selected preset, including the list of file masks that you can append to a texture file name to automatically select the preset. The file masks for each preset are specified in `/o3de/Gems/Atom/Asset/ImageProcessingAtom/Assets/config/ImageBuilder.settings`. You can edit this file to modify existing file masks or add strings for your own presets.<br><br>The automated preset selection can be overridden by choosing a different preset and saving the selection to a `.assetinfo` sidecar file. |
| **Reset** | The {{< icon "refresh-active.svg" >}} reset icon resets changes that have been made in Texture Settings to the default preset values. |
| **Use Max Res** | When enabled, the best quality version of the texture is used even on platforms with lower performance specs. It's recommended to enable **Use Max Res** for textures that contain text or other details that must be legible when the texture is close to the camera. |
| **Platform** | In the **Platform** section, you can set the maximum resolution for the texture for various target platforms. The columns display the maximum resolution and the pixel format of the texture product asset on various target platforms.<br><br>The maximum resolution of the product assets for each target platform is displayed in the **Max Res** column. For some presets, a default maximum resolution for particular platforms might be specified in the `.preset` file. If no maximum resolution is specified for a platform, the default maximum resolution is the resolution of the texture source asset.<br><br>You can reduce the maximum resolution for a platform by editing the values in the **Res Limit** column. **Res Limit** values range from 0 - 5 with the following results:<br><br>**0** - Default maximum texture resolution is used. The default resolution is the resolution of the texture source asset, or the maximum resolution for the platform specified in the `.preset` file.<br>**1** - Texture resolution is reduced by 1/2. Memory consumption is reduced to 1/4 of full resolution.<br>**2** - Texture resolution is reduced by 1/4. Memory consumption is reduced to 1/16 of full resolution.<br>**3** - Texture resolution is reduced by 1/8. Memory consumption is reduced to 1/64 of full resolution.<br>**4** - Texture resolution is reduced by 1/16. Memory consumption is reduced to 1/256 of full resolution.<br>**5** - Texture resolution is reduced by 1/32. Memory consumption is reduced to 1/1024 of full resolution.<br><br>The **Format** column displays the pixel format of the texture product assets for each target platform. |

### Mipmap settings

![Texture Settings mipmap options.](/images/user-guide/assets/texture-settings/texture-settings-ui-03.png)

The mipmap settings section provides options for generating texture *mipmaps*. Mipmaps are reduced versions of a texture that are used when a full resolution texture is not required, such as when an object is far from the camera, or on target platforms that have lower performance specs.

 Level **[0]** is the full resolution texture. Levels **[1]** through **[5]** are successively smaller versions of the texture. Level **[1]** is the largest mipmap and level **[5]** is the smallest. At each mipmap level, the texture resolution is halved so that the mipmap level is one quarter the size of the preceding level.

| Setting | Description |
| - | - |
| **Create Mipmaps** | When enabled, the mipmap settings are available, and `.imagemipchain` product assets are generated for the texture. |
| **Pixel Sampler** | Sets the pixel sample type for mipmap generation.<br>**Min** - Use the minimum pixel value.<br>**Max** - Use the maximum pixel value.<br>**Sum** - Sum the pixel values and use the result. |
| **Filter Type** | Select the filter type for mipmap generation. Filter types use different sample sizes and algorithms to calculate the value of each pixel when the resolution is decreased for each mipmap.<br><br>The filter types are arranged from basic (**Point**, **Average**, **Linear**, and **Bilinear**) at the top of the list, to advanced (**Gaussian**, **BlackmanHarris**, and **KaiserSinc**) are at the bottom. The various filters all have their strengths and using the most advanced filter might not always yield the best results. Advanced filter types might require more processing time, which might be a consideration if you have large texture source assets or many texture source assets to process. |
| **Adjust Alpha** | When enabled, the mipmap alpha channel can be manually adjusted at each mipmap level with **Alpha Test Bias** to ensure proper alpha coverage at each mipmap level.  |
| **Alpha Test Bias** | Multiplies the mipmap's alpha channel value by a scale value that is based on the alpha coverage. A value from **0** - **100** can be specified for each mipmap level. |
| **Apply** | The **Apply** button saves the texture settings to a `.assetinfo` sidecar file. When the `.assetinfo` file is created or updated, the texture source asset is automatically processed. |
| **Close** | The **Close** button closes the Texture Settings window. |

## The `.assetinfo` sidecar file

The options you set in Texture Settings are saved to a `.assetinfo` sidecar file when you choose **Apply** on the bottom right of the Texture Settings interface. Asset Processor recognizes the sidecar file as a source dependency for the texture source asset, and automatically processes the texture source asset when the `.assetinfo` file is created or updated.

The `.assetinfo` sidecar file is formatted with JSON, is human-readable, and can be easily generated and modified through automated processes such as a Python script.
