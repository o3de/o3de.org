# Using Asset Processor<a name="asset-pipeline-processor"></a>

Asset Processor is a utility that runs in the background to detect changes to your asset files\. When Asset Processor detects new or updated asset files, it launches the Resource Compiler \(`Rc.exe` for FBX and ABC files, `AssetBuilder.exe` for all other types\), processes the assets, and then places them in the cache\. Asset Processor then notifies all running game or tool instances that the assets are updated\. The game can then reload the updated assets\.

As part of Asset Processing, the Asset Processor generates and stores product and source dependencies \. In this context, a dependency defines how a one product or source asset depends on another asset\. A given asset may have 0 or more dependencies, and these dependencies are used by features such as the [Asset Bundler](asset-bundler-intro.md) in order to determine which assets must be included when you bundle your game for release\.

**Topics**
+ [Modifying the Asset Processor Configuration File](#asset-pipeline-processor-config)
+ [Using the Asset Processor Batch Program](#asset-pipeline-processor-batch-processing)
+ [Asset Processor Interface](asset-pipeline-processor-ui.md)
+ [Enabling Asset Processor's Faster Scanning Mode](asset-processor-faster-scanning.md)
+ [Importing Assets into Lumberyard](asset-pipeline-importing.md)
+ [Working with the FBX Settings Tool](char-fbx-importer.md)
+ [Using Resource Compiler](asset-pipeline-rc.md)
+ [Debugging Asset Processor](asset-processor-debugging.md)

Asset Processor enables games to run on other platforms without deploying assets to that platform\. Instead, the assets are accessed from the asset cache on a connected Windows or macOS system\. With Asset Processor, you can also run games that use someone else's assets\.

By proxying requests through itself, Asset Processor communicates with an iOS or Android shader compiler server through a USB cable on iOS and Android\.

In Windows, Asset Processor starts automatically if you run Lumberyard Editor with automatically maintained connections\. Asset Processor also restarts automatically if you modify any of the data files that it needs to operate or if you retrieve a new version\.

In macOS, you must manually start Asset Processor from a command line window\. Asset Processor is located in the `lumberyard_version/dev/BinMac64` directory\.

**Note**  
Symbolic links are not supported when using Asset Processor in macOS\. To ensure that Asset Processor works properly in macOS, follow these guidelines:  
Do not use a symbolic link for your cache directory when you store compiled assets in a central location\.
Do not store your source project assets in a symbolic link directory\.
Use a unique cache directory\. Do not share the cache directory with a Windows system that is also running Asset Processor\.

 You can open the Asset Processor options from the notification area on the taskbar\.

![\[Right-click the Asset Processor icon in your notification area on the taskbar, and then choose Show.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/assets/pipeline/asset-pipeline-processor-options.png)

You don't need to close Asset Processor when you get the latest updates from source control\. You can start Lumberyard Editor while Asset Processor is still processing your assets\.

However, if you aren't using the game or Lumberyard Editor, you can exit Asset Processor by right\-clicking its icon in the notification area on the Windows taskbar or the macOS menu bar\.

Asset Processor can also serve files directly to running console games so that the assets aren't required to be present on the game device\. This is called virtual file system \(VFS\) and is required for live reloading to work on those platforms\. For more information, see [Live Reloading and VFS](asset-pipeline-live-reloading.md)\.

## Modifying the Asset Processor Configuration File<a name="asset-pipeline-processor-config"></a>

Use the `AssetProcessorPlatformConfig.ini` configuration file \(located in the `lumberyard_version/dev/` directory\) to perform the following tasks:
+ Add new file types for Asset Processor to feed to the Resource Compiler, copy into the cache, or update existing file type rules\.
+ Update the ignore list\.
+ Specify which platforms are currently enabled\. The default value is the host platform that Asset Processor runs on\. Asset Processor automatically builds assets for the host platform\. For example, if Asset Processor is running on Windows, Asset Processor builds Windows assets even if **pc** is not enabled in the `.ini` file\. If Asset Processor is running on macOS, Asset Processor builds macOS assets even if **osx\_gl** is not enabled in the `.ini` file\. To build assets for other platforms, update the `.ini` file and specify the platforms that you want\.
+ Add additional folders for Asset Processor to watch\. For example, you can specify folders such as shared particle libraries and associated textures between projects\.
+ Specify which files trigger related files to be rebuilt\. This is called metafile fingerprinting\.

To add game\-specific overrides, you can add a file named `AssetProcessorGamePlatformConfig.ini` to your game assets directory\. This file is read after the root configuration file and can have additional game\-specific settings for the ignore list, platforms, and file types\.

For more information about these configuration files, see [Configuring the Asset Pipeline](asset-pipeline-configuring.md)\.

## Using the Asset Processor Batch Program<a name="asset-pipeline-processor-batch-processing"></a>

The `AssetProcessorBatch.exe` application compiles all assets for the current project and enabled platforms\. If the process succeeds without errors, it exits with a `0` code\. You can use the Asset Processor Batch program as part of your build system for automation\.

The `AssetProcessorBatch.exe` file accepts the following command line parameters for overriding the default behavior:
+ `/platforms=comma separated list`
+ `/gamefolder=name of game folder`

Example:

`AssetProcessorBatch.exe /platforms=pc,ios /gamefolder=SamplesProject`