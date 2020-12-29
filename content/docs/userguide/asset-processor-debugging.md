# Debugging Asset Processor<a name="asset-processor-debugging"></a>

Use the following options to help debug Asset Processor issues\.

**Topics**
+ [Viewing Asset Processor Log Files](#asset-processor-log-files)
+ [Restarting Asset Processor](#restart-asset-processor)
+ [Using Asset Builder](#using-asset-builder)
+ [Using the Microsoft Child Process Debugging Power Tool](#debug-with-visual-studio-child-process-add-on)
+ [Debug Asset Builders from Asset Processor](#debug-asset-builders-running-from-asset-processor)
+ [Clearing the Cache](#clearing-asset-processor-cache)

## Viewing Asset Processor Log Files<a name="asset-processor-log-files"></a>

You can view logs for internal operations of Asset Processor\. If Asset Processor isn't processing or working as expected, use the information in the logs to debug the issue\. This doesn't include logs for the processing of individual assets\. 

**To view the Asset Processor log files**

1. In Asset Processor, choose **Logs**\.

1. In the **Logs** section, you can view the following:
   + **Status** – The date and time stamp of the log 
   + **Source** – Where the log came from \(for example, Asset Processor\)
   + **Message** – The description of the log  
**Example**    
![\[View logs in Asset Processor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset_processor/logs.png)

1. To create another log report, click **Add**\.

1. In the **Create New Logging Tab**, you can specify the following settings\.
   + **Filter name** – Enter the name of your filter \(for example, *All logs*\)\.
   + **Text filter \(optional\)** – Enter text to filter the log results\.
   + **Show messages** – Displays messages about each log\.
   + **Show warnings** – Displays logs that have warnings\.
   + **Show errors** – Displays logs that have errors\.
   + **Show debug** – Displays logs that have debug issues\.  
![\[Create a log tab in Asset Processor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/asset_processor/create-logging-tab.png)

1. Click **OK**\. Your log report appears as another tab in Asset Processor\.

1. You can click **Copy all** and paste the raw logs into a text file\. 

1. You can also click **Open log files** to open `lumberyard_version\dev\Bin64vc141\logs\JobLogs` directory\.

1. In a text editor, open the `example.log` file\.

## Restarting Asset Processor<a name="restart-asset-processor"></a>

You can restart Lumberyard Editor and Asset Processor\. Verify that only one instance of Asset Processor runs at the same time\.

**To restart Asset Processor**

1. Close Lumberyard Editor\.

1. In the Windows taskbar, right\-click Asset Processor, and choose **Quit** or press **Ctrl\+Q**\.

1. Restart the project or branch that you are working on\. Asset Processor automatically starts\.

## Using Asset Builder<a name="using-asset-builder"></a>

You can also debug Asset Processor using Asset Builder\. This is a standalone AzToolsFramework application that lets you run BuilderSDK modules in isolation\. You can run AssetBuilder in debug mode to develop new features for a builder\. In debug mode, Asset Builder creates a test job or processes jobs for specified files\.

**Note**  
You must start Asset Processor before you can enter a `-debug` command\.

**To debug Asset Processor using Asset Builder**

1. Navigate to the `lumberyard_version\dev\Bin64vc141` directory\.

1. In a command line prompt, enter the following command to get a list of possible options\.

   ```
   AssetBuilder.exe -help
   ```

1. You can use the following debug options\.  
****    
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/asset-processor-debugging.html)

**Example**  
To debug a specified file, run the following command\.  

```
AssetBuilder.exe -debug Objects\Tutorials\Fbx\shapes.fbx
```

**Example**  
To create a job without processing a specified file, run the following command\.  

```
AssetBuilder.exe -debug_create "Objects\Tutorials\Fbx\shapes.fbx" -module "C:\lumbeyard_version\dev\Bin64vc141.Debug\Builders\ExampleBuilder.dll" -output "C:\lumbeyard_version\dev\Logs\Shapes\"
```

**Example**  
To process without creating a job for a specified file, run the following command\.  

```
AssetBuilder.exe -debug_process "Objects\Tutorials\Fbx\shapes.fbx"
```

## Using the Microsoft Child Process Debugging Power Tool<a name="debug-with-visual-studio-child-process-add-on"></a>

Use this tool to automatically attach the debugger to spawned child processes\.

**To use the Microsoft Child Process Debugging Power Tool**

1. Go to the [download](https://marketplace.visualstudio.com/items?itemName=vsdbgplat.MicrosoftChildProcessDebuggingPowerTool) page, and click **Download**\.

1. Install the tool for Visual Studio\.

1. In Visual Studio, start `AssetProcessor.exe`\. Breakpoints in Asset Builders work as normal\.

## Debug Asset Builders from Asset Processor<a name="debug-asset-builders-running-from-asset-processor"></a>

Use the following procedure to debug in the following scenarios:
+ Debug intermittent failures that are difficult to reproduce in a single run of Asset Builder using the `-debug` option
+ Debug failures that only occur in multiple process job requests

**To debug Asset Builders from Asset Processor**

1. Navigate to the `lumberyard_version\dev` directory\.

1. In a text editor, open the `AssetProcessorPlatformConfig.ini` file and set `maxjobs=1`\. This limits Asset Processor to run one job at a time\.

1. Run Asset Processor so that it spawns the Asset Builder process\.

1. To debug, attach the `AssetBuilder.exe` in Visual Studio\. There is only one Asset Builder\.

   The next time that you modify your source file, `AssetBuilder.exe` builds that asset\.

**Tip**  
You can spawn multiple instances of `AssetBuilder.exe` and attach them to Visual Studio\.

## Clearing the Cache<a name="clearing-asset-processor-cache"></a>

If you're a game artist and you're having issues running Asset Processor, this might be the result of a corrupt cache\. In this case, you can delete your `Cache` directory\. When you delete your cache, you can restart Asset Processor to rebuild all of your assets\.

**Note**  
If you're an engineer making new BuilderSDK\-based builders, we recommend that you don't delete your cache\.

**To delete the Asset Processor cache**

1. Quit Asset Processor\.

1. Navigate to the `lumberyard_version/dev/Bin` directory\.

1. Delete the `Cache` directory\.

1. Restart Asset Processor to rebuild all assets\.