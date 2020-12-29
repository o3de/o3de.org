# Using the Resource Compiler Image Tool<a name="asset-pipeline-images-using-resourcecompiler-image-tool"></a>

Before you can use the Resource Compiler image tool, you must install RC Shell Commands\.

**Note**  
You can also use the Texture Settings Editor to manage your texture settings for image files\. For more information, see [Texture Settings Editor](texture-settings-editor.md)\.

**To install RC Shell Commands**

1. Open [Lumberyard Setup Assistant](lumberyard-launcher-using.md)\.

1. On the **Install plugins** page, click **Install**\.  
![\[Click Install to install RC Shell Commands in Lumberyard Setup Assistant\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/assets/pipeline/asset-pipeline-images-resourcecompiler-1.png)

Once you install the RC Shell Commands, you can use the Resource Compiler image tool\.

**To open the Resource Compiler image tool**
+ Right\-click an image file from within a file explorer and choose **RC Open Image**\.

![\[Open image files with the Resource Compiler image tool\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/assets/pipeline/asset-pipeline-images-resourcecompiler-2.png)

The Resource Compiler image tool lists image processing presets defined in the `rc.ini` file, located in the `lumberyard_version\dev\Bin64vc141\rc` directory\. Select a preset to create the `imagefilename.exportsettings` file that you can check in to your source control\.

**To select an image processing preset and save it to an \.exportsettings file**

1. In the Resource Compiler image tool, under **Preset**, select a preset from the drop\-down menu\.

1. \(Optional\) To see more information about the preset settings, click **Show preset info**\.

1. Select other options you want to change, such as [MIP Control](asset-pipeline-generating-mipmaps.md)\.

1. Click **Generate Output**\.

   Your `imagefilename.exportsettings` file and the resulting `imagefilename.dds` output is saved in the same directory as your source image\.  
![\[In the Resource Compiler image tool, select a preset and then click Generate Output to generate the .exportsettings file to check in.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/assets/pipeline/asset-pipeline-images-resourcecompiler.jpg)