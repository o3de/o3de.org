---
linkTitle: Debugging
title: Debugging Asset Processor Issues
description: Methods to debug Asset Processor issues in Open 3D Engine (O3DE).
weight: 500
toc: true
---

If you are having issues with **Asset Processor** use the methods below to debug the issues.

## View Asset Processor Logs 

If Asset Processor isn't working as expected, use the information in the **Logs** tab to debug the issue. The Logs tab contains log information for Asset Processor and not for individual process jobs.

1. In Asset Processor, choose **Logs**.

1. In the **Logs** section, you can view the following:

    * **Status** - The date and time stamp of the log.
    * **Source** - What produced the log (for example, Asset Processor).
    * **Message** - The description of the log.

    ![Asset Processor UI logs tab](/images/user-guide/assets/asset-processor/interface-logs.png)

1. To create another log report, choose **Add**.

1. In the **Create New Logging Tab**, you can specify the settings below:

    * **Filter name** - The name of your filter (for example, `All logs`).
    * **Text filter (optional)** - Text to filter the log results.
    * **Show messages** - Display messages about each log.
    * **Show warnings** - Display logs that have warnings.
    * **Show errors** - Display logs that have errors.
    * **Show debug** - Display logs that have debug issues.

    ![Create a log tab in Asset Processor.](/images/user-guide/asset_processor/create-logging-tab.png)

1. Choose **OK**. Your log report appears as another tab in Asset Processor.

1. You can choose **Copy all** and paste the raw logs into a text file. You can also choose **Open log files** to open the directory containing the log files in your operating system.

## Restart Asset Processor 

You can restart **Open 3D Engine (O3DE) Editor** and Asset Processor. Verify that only one instance of Asset Processor runs at the same time.

1. Close O3DE Editor.

1. In the Windows taskbar, **right-click** Asset Processor, and choose **Quit** or press **Ctrl+Q**.

1. Restart O3DE Editor. Asset Processor automatically starts.

## Use Asset Builder to debug 

You can debug Asset Processor using **AssetBuilder**. This is a standalone `AzToolsFramework` application that lets you run BuilderSDK modules in isolation. You can run AssetBuilder in debug mode to develop new features for an Asset Builder. In debug mode, AssetBuilder creates a test job or processes jobs for specified files.

{{< note >}}
You must start Asset Processor before you can enter a `-debug` command.
{{< /note >}}

1. In a terminal, navigate to `<build>/bin/<config>/`.

1. Enter the command below to get a list of possible options.

   ```cmd
   AssetBuilder.exe -help
   ```

1. You can use the debug options below:

    * To debug a specified file, run the command below.

        ```cmd
        AssetBuilder.exe -debug <path_to_scan_directory>\<source_asset.ext>
        ```

    * To create a job without processing a specified file, run the command below.

        ```cmd
        AssetBuilder.exe -debug_create "<path_to_scan_directory>\<source_asset.ext>" -module "<path_to_debug_build_directory>\Builders\ExampleBuilder.dll" -output "<path_to_log_directory>"
        ```

    * To process without creating a job for a specified file, run the command below.

        ```cmd
        AssetBuilder.exe -debug_process "<path_to_scan_directory>\<source_asset.ext>"
        ```

## Use the Microsoft Child Process Debugging Power Tool 

Use this tool to automatically attach the debugger to spawned child processes.

1. Go to the [download](https://marketplace.visualstudio.com/items?itemName=vsdbgplat.MicrosoftChildProcessDebuggingPowerTool) page, and choose **Download**.

1. Install the tool for Visual Studio.

1. In Visual Studio, start `AssetProcessor.exe`. Breakpoints in Asset Builders work as normal.

## Debug Asset Builders from Asset Processor 

Use the procedure below to debug in either of the following scenarios:

* Intermittent failures that are difficult to reproduce in a single run of Asset Builder using the `-debug` option.
* Failures that only occur in multiple process job requests.

1. In a text editor, open the `Registry/AssetProcessorPlatformConfig.setreg` file and set `maxjobs=1`. This limits Asset Processor to run one job at a time.

1. Run Asset Processor so that it spawns the Asset Builder process.

1. To debug, attach the `AssetBuilder.exe` in Visual Studio. There is only one Asset Builder.

The next time that you modify your source file, `AssetBuilder.exe` builds that asset.

{{< note >}}
You can spawn multiple instances of `AssetBuilder.exe` and attach them to Visual Studio.
{{< /note >}}

## Clearing the Cache

If you're a game artist and you're having issues running Asset Processor, the issues might be due to a corrupt cache. You might solve the issues by deleting your project's `Cache` directory. Restart Asset Processor to reprocess the source assets and rebuild the Asset Cache.

{{< note >}}
If you're an engineer making new BuilderSDK-based builders, we recommend that you don't delete your cache.
{{< /note >}}
