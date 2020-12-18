# Importing Assets into Lumberyard<a name="asset-pipeline-importing"></a>

You can import assets into your Lumberyard game project directory with one of the following\.

## Importing Assets Manually into Lumberyard<a name="import-assets-manually"></a>

You can import assets even if Lumberyard isn't running\. You can do this at any time\.

**To import assets manually**

1. Navigate to your game project directory, such as `lumberyard_version/dev/My_Game_Project/Objects`\.

1. Copy or move the assets to your game project directory\. For example, you can add your `.cgf` files to the specified directory\.
   + If Asset Processor is running, it detects the new files and converts them for use in Lumberyard Editor\.
   + If Asset Processor isn't running, Asset Processor automatically detects the new files the next time you start Lumberyard Editor\.

## Importing Assets from Lumberyard Editor<a name="import-assets-in-lumberyard-editor"></a>

**To import assets from Lumberyard Editor**

1. In Lumberyard Editor, choose **File** and then **Import**\. 

1. Navigate to your assets and select the files to add to your game project directory\. Then click **OK**\.

1. In the **Import Asset\(s\)** dialog box, the **Destination Folder** path automatically shows the root of your game project directory\. You can click **Browse** to specify a subdirectory in your game project directory\.
**Note**  
You can import assets to a directory only in the current game project\.

1. Select whether you want to **Copy Files** from their original location or **Move Files** and then click **Import**\. If you copy the files, Asset Processor doesn't monitor changes to the original files\.  
![\[In Lumberyard Editor, import assets directly to your game project directory.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/assets/pipeline/asset-pipeline-importing.png)

1. In the **Processing asset** dialog box, click **View status** to check the status of your assets\.  
![\[Track the progress of Asset Processor processing your assets.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/assets/pipeline/asset-pipeline-importing-processing-status.png)

## Tutorials: Importing Assets into Lumberyard<a name="impoting-assets-into-lumberyard-tutorials"></a>

To learn more about importing your assets, see the following video tutorials:
+ [Tutorials: Importing FBX Files as Actors and Motions](importing-fbx-files-as-actors-motions.md)
+ [Tutorial: Importing FBX Files as Static Meshes](importing-fbx-files-as-static-meshes.md)