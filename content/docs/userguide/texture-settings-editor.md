# Texture Settings Editor<a name="texture-settings-editor"></a>

You can use the Texture Settings Editor to edit the texture settings for individual images\. This is useful if you are customizing your images for different platforms, such as PC and Android\. For example, you can specify compression scheme, mipmap generation parameters, alpha map combinations, and so on for images\. When you edit your texture settings for an image, the Texture Settings Editor generates a `.imagesettings` file to save your settings\. 

The Texture Settings Editor supports the following image formats:
+ `.bmp`
+ `.gif`
+ `.jpg`
+ `.jpeg`
+ `.png`
+ `.tga`
+ `.tif`
+ `.tiff`

**Note**  
The Texture Settings Editor requires the [Image Processing](gems-system-gem-image-processing.md) gem\. By default, this gem is enabled\.

The Texture Settings Editor can also load the previous Resource Compiler \(RC\) generated `.exportsettings` file\. If you make any changes to this file, the Texture Settings Editor deletes this file and generates a new `.imagesettings` file\. If you have Perforce enabled, Perforce tracks the new or modified files\. 

You can find the default settings for the Texture Settings Editor in the `ImageBuilderDefaultPresets.settings` file\. You can modify the default settings file as needed\.

**To modify the default settings**

1. Copy the `ImageBuilderDefaultPresets.settings` file\.

1. Navigate to the `lumberyard_version/dev/game_project/Config/ImageBuilder/` directory\.

1. Paste the copied file and rename it to `ImageBuilderPresets.settings`\.

1. In a text editor, make your changes and save\.

**Note**  
This file replaces the previous `rc.ini` file, which contains the predefined presets to generate textures for your game\. To migrate your settings from the `rc.ini` file, see [Migrate RC\.ini Settings to the Texture Settings Editor](#migrate-settings-from-rc-texture-settings-editor)\.

**Topics**
+ [Using the Texture Settings Editor](#using-the-texture-settings-editor)
+ [Preview](#texture-editor-preview)
+ [Texture Presets](#texture-presets)
+ [Platform](#texture-platform-resolution)
+ [Mipmap Settings](#texture-mipmap-settings)
+ [Migrate RC\.ini Settings to the Texture Settings Editor](#migrate-settings-from-rc-texture-settings-editor)

## Using the Texture Settings Editor<a name="using-the-texture-settings-editor"></a>

**To use the Texture Settings Editor**

1. In Lumberyard Editor, choose **Tools**, **Asset Browser**\.

1. In the **Asset Browser**, navigate and select a source file, such as a `.tif` file\.  
![\[Select and preview the source file in the Asset Browser.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/texture-pipeline-editor-1.png)

   You can preview the texture, its file size, dimensions, and select the drop\-down menu to preview the texture with the following channels:
   + **RGB**
   + **Alpha**
   + **RGBA**

1. To view more information, expand the arrow icon, and select the texture file that appears below the source file\.  
![\[Select and preview the texture file in the Asset Browser.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/texture-pipeline-editor-2.png)

   See the following information about the texture:
   + Compiled texture
   + File size
   + Resolution
   + Format
   + Mip count
   + Memory size
   + Color space
   + Image flag

1. To open the Texture Settings Editor, right\-click the source file, and choose **Edit Texture Settings**\.  
![\[Open the source file in the Texture Settings Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/texture-pipeline-editor-3.png)

1. In the Texture Settings Editor, you can view the following:

   1. **[Preview](#texture-editor-preview)** – Preview of the processed image with the current settings\.

   1. **[Texture Presets](#texture-presets)** – List of presets to choose\.

   1. **[Platform](#texture-platform-resolution)** – Specify the different resolution adjustments on different platforms\.

   1. **[Mipmap Settings](#texture-mipmap-settings)** – Allows the adjustment of mipmap generation\.

1. When finished, click **Apply** to save the current properties\. This exports a setting file named `imageName.imagesettings` next to the source file\.
**Note**  
If there is an existing legacy `.exportsettings` file associated with the texture file, the legacy file will be automatically deleted\.
Click the **?** icon to open the texture documentation\.

## Preview<a name="texture-editor-preview"></a>

In the preview panel, you can do the following:

![\[Open the texture file in the Texture Settings Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shared-texture-pipeline-editor-4.png)

1. Click the drop\-down menu to preview the texture in the following channels:
   + **RGB** – Displays the RGB color channels \(default\)\.
   + **R** – Previews the red channel in grayscale\.
   + **G** – Previews the green channel in grayscale\.
   + **Alpha** – Previews the alpha channel in grayscale\.
   + **RGBA** – Previews the alpha blended with the background\.

1. **Preview tiled** – Preview the texture in a 2x2 tiled layout\. By default, the texture appears in a fixed size\.

1. Press and hold the following shortcuts to change the preview for the texture:
   + **Shift** – Changes the preview to **RGBA** mode\.
   + **Alt** – Changes the preview to **Alpha** mode\.
   + **Space** – Opens a pop up window that previews the texture in its actual output size\.

1. Click the arrow icons to view the different mipmap previews\. Mip `0` is the original output image\.

1. Click the refresh icon to refresh the preview\. You can click the drop\-down menu to specify the following:
   + **Always refresh preview** – Refresh automatically when you make a change\.
   + **Press to refresh preview** – Manually refresh the preview\.

## Texture Presets<a name="texture-presets"></a>

 In the **Texture presets**, you can do the following:

![\[Set the texture presets for the file in the Texture Settings Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/texture-pipeline-editor-5.png)
+ **Active preset** – Click the drop\-down menu to view the presets that you can assign to a texture\. The texture using the preset values automatically appears in the preview panel\. Texture properties are also updated\.
**Note**  
The Texture Settings Editor supports different presets that specify the options that are applied when an image asset is compiled\. When you open the Texture Settings Editor, it loads the main settings and presets from the game project folder at the following file:  
`lumberyard_version\dev\game_project\Config\ImageBuilder\ImageBuilderPresets.settings`  
If this file doesn't exist, the Texture Settings Editor loads the default settings from the following file:  
`lumberyard_version\dev\Gems\ImageProcessing\Code\Source\ImageBuilderDefaultPresets.settings`
+ Click the reset icon to reset all texture properties to the default values of the current preset\.
+ Click the info icon to display a pop\-up window for the current settings\.  
![\[View the preset info for the texture in the Texture Settings Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/texture-pipeline-editor-6.png)
+ **Active file conventions** – Name convention that the current preset setting supports\. For more information, see [Texture Map Types](mat-texture-types.md)\.
+ **Suppress spec reduction** – By default, when Lumberyard Editor switches from high to low specification, textures are automatically scaled down so that they can load into the graphics card memory\. However, you can set this setting, which overwrites all resolution reduction settings, so that the texture keep its original size throughout the different quality settings\. It's recommended that you set this setting for textures that have text\.

  For more information, see [Editor Settings](lumberyard-editor-menus.md#lumberyard-editor-menus-config-spec)\.

## Platform<a name="texture-platform-resolution"></a>

 In the **Platform**, you can specify the following\. 

![\[Set the platform settings in the Texture Settings Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/texture-pipeline-editor-7.png)


****  

| Setting | Description | 
| --- | --- | 
|  **Platform**  |  Lumberyard supports the following platforms: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/texture-settings-editor.html)  | 
|  **DownRes**  |  Specify the resolution for each platform\.  You can specify the following values: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/texture-settings-editor.html)  | 
|  **Size**  |  Compiled texture resolution calculated according to the **DownRes** value\.  | 
| Format |  Compiled texture format on the platform\.  | 

## Mipmap Settings<a name="texture-mipmap-settings"></a>

 In the **Mipmap Settings**, you can specify the following\.

![\[Set the Mipmap Settings in the Texture Settings Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/texture-pipeline-editor-8.png)


****  

| Mipmap Settings | Description | 
| --- | --- | 
|  **Enable**  | Enable or disables mipmap generation for the current texture\. | 
|  **Maintain Alpha Coverage**  |  Specifies if the manual adjustment of alpha channel mipmaps is allowed or not\.  | 
|  **Alpha Test Bias**  | Mipmap's alpha will be multiplied with a scale based on alpha coverage\.This value will be applied to the final results as an offset\.You can only set this setting if Maintain Alpha Coverage is set\. Valid values: `0` to `100` | 
|  **Pixel Sampling Type**  |  Specifies how the pixel is generated when sampling mipmaps\. You can specify the following options: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/texture-settings-editor.html)  | 
|  **Filter Method**  |  Specifies the filter method used to process the mipmap\. You can specify the following options: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/texture-settings-editor.html)  | 

## Migrate RC\.ini Settings to the Texture Settings Editor<a name="migrate-settings-from-rc-texture-settings-editor"></a>

The Resource Compiler uses the `rc.ini` file to store your default texture presets\. In Lumberyard 1\.18, the Texture Settings Editor uses the `ImageBuilderDefaultPresets.settings` instead\. 

If you want to transfer your settings from the Resource Compiler to the Texture Settings Editor, you must do this manually\.

**Example**  
In `rc.ini`, settings are ordered by preset, which contains the format for all devices\. For example, the `Albedo` preset is stored\.  

```
[Albedo]
pixelformat=BC1
pixelformat:es3=ETC2
pixelformat:ios=PVRTC4
maxtexturesize:es3=512
rgbweights=ciexyz
powof2=1
mipmaps=1
colorspace=sRGB,auto
filemasks=*_diff*
```
The `ImageBuilderDefaultPresets.settings` file is in a format that Lumberyard can serialize\.  
The following example contains the `Albedo` preset for PC with only the relevant parts that match the settings used in `rc.ini`\. If you modify the PC `Albedo` preset, you should also make the change to other platforms\. This ensures that your changes take effect on all platforms\.  

```
<ObjectStream version="3">
...
    <Class name="AZStd::string" field="value1" value="pc" type="{03AAAB3F-5C47-5A66-9EBC-D5FA4DB353C9}"/>
    ...
        <Class name="PresetSettings" field="value2" version="1" type="{935BCE3F-9E76-494E-9408-47C5937D7288}">
            <Class name="AZ::Uuid" field="UUID" value="{08A95286-ADB2-41E4-96EB-DB48F4726D6A}" type="{E152C105-A133-4D03-BBF8-3D4B2FBA3E2A}"/>
            <Class name="AZStd::string" field="Name" value="Albedo" type="{03AAAB3F-5C47-5A66-9EBC-D5FA4DB353C9}"/>
            <Class name="unsigned int" field="RGB_Weight" value="2" type="{43DA906B-7DEF-4CA8-9790-854106D3F983}"/>
            <Class name="unsigned int" field="SourceColor" value="1" type="{43DA906B-7DEF-4CA8-9790-854106D3F983}"/>
            <Class name="unsigned int" field="DestColor" value="2" type="{43DA906B-7DEF-4CA8-9790-854106D3F983}"/>
            <Class name="AZStd::vector" field="FileMasks" type="{99DAD0BC-740E-5E82-826B-8FC7968CC02C}">
                <Class name="AZStd::string" field="element" value="_diff" type="{03AAAB3F-5C47-5A66-9EBC-D5FA4DB353C9}"/>
            </Class>
            <Class name="AZStd::string" field="PixelFormat" value="BC1" type="{03AAAB3F-5C47-5A66-9EBC-D5FA4DB353C9}"/>
            <Class name="bool" field="IsPowerOf2" value="true" type="{A0CA880C-AFE4-43CB-926C-59AC48496112}"/>
            <Class name="AZStd::unique_ptr" field="MipMapSetting" type="{2CB9DED6-5513-5BB1-A4EC-8E92A591BB81}">
            <Class name="MipmapSettings" field="element" version="1" type="{9239618E-23A6-43C8-9B87-50528CBFA6FF}">
                <Class name="unsigned int" field="MipGenType" value="5" type="{43DA906B-7DEF-4CA8-9790-854106D3F983}"/>
                <Class name="Color" field="BorderColor" value="0.0000000 0.0000000 0.0000000 0.0000000" type="{7894072A-9050-4F0F-901B-34B1A0D29417}"/>
                <Class name="unsigned int" field="StreamableMips" value="0" type="{43DA906B-7DEF-4CA8-9790-854106D3F983}"/>
            </Class>
        </Class>
...
```