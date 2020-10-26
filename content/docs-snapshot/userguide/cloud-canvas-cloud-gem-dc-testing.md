# Testing the Dynamic Content System<a name="cloud-canvas-cloud-gem-dc-testing"></a>

Lumberyard contains a basic level called **DynamicContentTest** that you can use to verify that the dynamic content system is functioning properly\. The level is located in the `dev\CloudGemSamples\Levels\CloudGemTests\DynamicContentTest` directory\.

## Prerequisites<a name="cloud-canvas-cloud-gem-dc-testing-prerequisites"></a>

To test any cloud gem, you must have a deployment with the necessary resources\. These resources are created through the **Cloud Canvas Resource Manager**\. For detailed instructions on creating these resources, see [Initializing Cloud Canvas Resource Manager](cloud-canvas-ui-rm-initialize.md)\.

For the test, you are likely to play the role of both content creator and game client\. Because the editor prefers loose files to `.pak` files, you might want to run the engine in game client mode instead of editor mode\. When you run the engine in editor mode, updated data does not take precedence during run time\. If you do want to run the test in editor mode, you can change this setting by entering the console command `sys_PakPriority=1` before you start the test\. After testing, if you want the editor to return to preferring loose files \(the default\), enter the console command `sys_PakPriority=0`\.

To run the level as a game client, you must export the mappings from your deployment stack to your `\dev\project_name\Config` directory\. As of Lumberyard 1\.11, separate mappings are exported for the player game client and game server to differentiate the resources that are visible to each\. To export the mappings, select your deployment in **Cloud Canvas Resource Manager** and click **Export Mapping**\. The exported files have the format `<deployment_name>.player.awsLogicalMappings.json` and `<deployment_name>.server.awsLogicalMappings.json`\.

 After you have exported a mapping to the `Config` directory, you can use the mapping when you run a game launcher such as `dev\Bin64vcNNN\CloudGemSamplesLauncher.exe`\. If you have more than one mapping, use the `-cc_override_resource_map <mappings_file>` option to specify one when you run the launcher\. For more information, see [Selecting a Deployment with a PC Launcher](cloud-canvas-testing-different-mappings.md#cloud-canvas-testing-different-mappings-selecting-a-deployment-pc-launcher)\.

The test level contains a button that requests an update of a predefined dynamic content manifest that describes a single `.pak` file\. The `.pak` file references a `gameproperties.csv` file\. The static data system uses the properties file to reflect a property value to Lua and to a text control that displays the property value\.

When the level starts, the text box displays the current value of the property\. Pressing the button starts the update process\. During the update, the client checks the dynamic content system for new data\. When it detects new data, it downloads the data and reflects the new value\.

## Data Preparation<a name="cloud-canvas-cloud-gem-dc-testing-data-preparation"></a>

To create data that is considered "new" for the purposes of the test, perform the following steps\.

**To prepare data for the test**

1. Open the `gameproperties.csv` file in the `dev\CloudGemSamples\StaticData\CSV` directory\. The file contents are similar to the following:

   ```
   GameProperty,Value
   DynamicMessage,"LOCAL DATA"
   ```

1. Set the `"LOCAL DATA"` message to a string that you want to receive when the data is updated \(for example, `"UPDATED"`\)\.

1. Save the file\.

1. Do one of the following:
   + At a command line prompt, enter the following command:

   ```
   lmbr_aws dynamic-content upload-manifest-content --manifest-path DynamicContentTest.json --staging-status PUBLIC 
   ```
   + Use the packer tool to upload the manifest content\. The manifest file that packs up `gameproperties.csv` is `DynamicContentTest.json`\. Normally you should not have to alter `DynamicContentTest.json` for testing purposes\. However, if you want to use it to ensure that your test contains no old test data, configure it like this:

   ```
   {
       "Files": [
           {
               "bucketPrefix": "",
               "cacheRoot": "@assets@",
               "hash": "",
               "keyName": "gameproperties.csv",
               "localFolder": "StaticData/CSV",
               "outputRoot": "@user@",
               "pakFile": "",
               "platformType": ""
           }
       ],
       "Paks": [
       ]
   }
   ```

   At this point, you have created and uploaded a `.pak` file that contains the current version of your `gameproperties.csv` file and your manifest\. 

1. Stage the uploads as **PUBLIC**, which means that they are ready for download\. If you used the command line option in the previous step to upload your data, this was done for you with the `--staging-status PUBLIC` option\. If you used the packer tool to perform the upload, open the Cloud Gem Portal from your AWS menu, open your Dynamic Content Gem, and move the ***DynamicContentTest\.manifest\.pak*** file from the **Private **column to the **Public **column\.

1. Change your `gameproperties.csv` file message back to `"LOCAL DATA"` or its original message\. Do this so that you can be sure that your updated message comes from the downloaded content\.

## Running the Test<a name="cloud-canvas-cloud-gem-dc-testing-run-the-test"></a>

After you have saved the `gameproperties.csv` file to reflect local data, you can run the test\.

**To test the dynamic content system**

1. Start the **DynamicContentTest** level\. When you start the level, you should see the most recent message that you entered in the game properties file \("LOCAL DATA" in step 6 of [Data Preparation](#cloud-canvas-cloud-gem-dc-testing-data-preparation)\)\. 

1. Click **Update**\. You should see the update in 3 to 10 seconds, depending on Lambda function latency\.

## Diagnosing Failures<a name="cloud-canvas-cloud-gem-dc-testing-diagnosing-failures"></a>

When diagnosing a failure, you must determine how far your updated data went in the processing chain\.

### Check the \.pak File for Upload<a name="cloud-canvas-cloud-gem-dc-testing-check-the-pak-file-for-upload"></a>

First, open the `.pak` file that was to be uploaded with [7\-Zip](http://www.7-zip.org/) or a similar utility\. The file is in the location `CloudGemSamples\DynamicContent\Paks\DynamicContentTest.shared.pak`\. The `.pak` file contains the `.csv` file that the end client should have received\. If something is wrong with the `.pak` file, the packing process was faulty and should be repeated\. If so, delete the `.pak` file\. In your `gameproperties.csv` file, edit the message you want\. Configure the `DynamicContentManifest.json` as indicated in the [Data Preparation](#cloud-canvas-cloud-gem-dc-testing-data-preparation) section earlier in this document\. Run the upload command again\. Finally, recheck that your `.pak` file has the correct `.csv` file and data\.

### Check the Downloaded \.pak File<a name="cloud-canvas-cloud-gem-dc-testing-check-the-downloaded-pak-file"></a>

If your local `.pak` file for upload is free of errors, check the file that was downloaded\. The downloaded file is located in the directory for your game project \(for example, `CloudGemSamples\pc\user\dynamiccontent\paks\DynamicContentTest.shared.pak`\)\. Perform the same inspection on this file as you did for the file in the upload location\. If the data is what you expect, the client did not receive the new data\. This can occur because of a download failure, or because the data in the Amazon S3 bucket is incorrect\.You can use the AWS console to inspect the corresponding files in your Amazon S3 bucket\.

If the downloaded `.pak` file was updated correctly, then the problem might be one of the following:
+ The dynamic content system itself did not reload the file\.
+ The dynamic content system did not accept the new data\. Check whether `sys_PakPriority` is set to `0`\. In editor mode, you must set this to `1`\. For more information, see the [Prerequisites](#cloud-canvas-cloud-gem-dc-testing-prerequisites) section earlier in this document\.
+ The test is not reflecting the file correctly and requires further diagnosis\.

## Test Implementation Details<a name="cloud-canvas-cloud-gem-dc-testing-test-implementation-details"></a>

Because `DynamicContent` and `StaticData` are system components, they do not have to be added to the entity in the test level\. Since in most cases the dynamic content that Lumberyard loads would persist longer than any entity, the example here shows you how to use the `SystemComponent`\. The entity in this level contains only Lua script and test logic\.

![\[DynamicContentTest Lua script\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-testing-1.png)

1\. In the script, the example connects to the EBus, loads the canvas, and waits for the button event\.

![\[RequestManifest\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-testing-2.png)

When the button is pressed, the code requests the new manifest\. The content specified by the manifest is automatically retrieved\.

2\. After the content is retrieved, a `NewPakContentReady` event fires\.

![\[NewPakContentReady\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-testing-3.png)

In the test example, you already know that the `.pak` file contains game properties data\. In more complex implementations, you might need to query the contents of the file\.

3\. The `UpdateGameProperties()` function requests that the static data system load the `.csv` file\.

![\[UpdateGameProperties\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-testing-4.png)

4\. The file load triggers the `TypeReloaded` event, which calls the `UpdateText()` function\.

![\[UpdateText\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-testing-5.png)

At this point, the user interface text has been updated with the new game property value\.

5\. Because the example attached to the `SystemComponent`, and the sample might be running in the editor, the cleanup routine manually removes the dynamic content\.

![\[Cleanup routine\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/cloud_canvas/cloud-canvas-cloud-gem-dc-testing-6.png)