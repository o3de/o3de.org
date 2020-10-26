# Configuring Image Processing<a name="asset-pipeline-configuring-image-processing"></a>

Images or textures are automatically processed by Asset Processor, which makes them ready for Lumberyard game creation\. When you place an image file anywhere within your Lumberyard directory, Asset Processor detects and converts the file to a game\-ready asset\. Lumberyard has several configuration files that specify settings for the conversion process, such as the colorspace to use, texture size, [whether to generate mip maps](asset-pipeline-generating-mipmaps.md), and so on\. 

You can [edit the configuration files](asset-pipeline-creating-image-processing-presets.md#asset-pipeline-creating-presets-imagecompiler-rc) to create your own image processing presets\. To use these presets, you append existing or customized suffixes to your image file names\. Based on these file name suffixes, Asset Processor automatically uses the appropriate preset to convert the image\.

After Asset Processor successfully converts the image, the resulting `.dds` asset is placed in the appropriate `lumberyard_version\dev\Cache` directory\. The image source file remains in its original form and location\.

Asset Processor calls the Resource Compiler, `rc.exe` \(located in `lumberyard_version\dev\Bin64vc141\rc`\), to convert the image files\. Resource Compiler also has an [image tool](asset-pipeline-images-using-resourcecompiler-image-tool.md), which you can use to manually select image presets, mip maps, and so on\. The Resource Compiler image tool can also output an `imagefilename.exportsettings`, which you must check in if your project uses source control such as Perforce\. Checking in the `.exportsettings` file ensures that the texture renders similarly for each person working on the project\.

Lumberyard supports the following image file types:
+ TIFF – No grayscale
+ TGA – Indexed or true color only; no grayscale
+ PNG – RGB or RGBA only; no grayscale
+ BMP – Any format
+ GIF – Supported, but not an ideal texture format
+ JPG – Any format

The following diagram represents the general workflow for converting images\.

![\[General workflow for converting images in Lumberyard\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/assets/pipeline/asset-pipeline-images.png)

**Topics**
+ [Creating Image Processing Presets](asset-pipeline-creating-image-processing-presets.md)
+ [Using Image Naming Conventions](asset-pipeline-using-image-naming-conventions.md)
+ [Using the Resource Compiler Image Tool](asset-pipeline-images-using-resourcecompiler-image-tool.md)
+ [Generating Mip Maps](asset-pipeline-generating-mipmaps.md)