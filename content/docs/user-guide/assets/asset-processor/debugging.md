---
linkTitle: Debugging
title: Debugging Asset Processor Issues
description: Methods to debug Asset Processor issues in Open 3D Engine (O3DE).
weight: 500
toc: true
---

If you are having issues with **Asset Processor**, use the methods below to debug the issues.


## View Asset Processor Logs

If Asset Processor isn't working as expected, use the information in the **Logs** tab to debug the issue. The Logs tab contains log information for Asset Processor and not for individual process jobs. To view logs for individual process jobs, refer to the **Event Log Details** pane in the **Jobs** tab of Asset Processor.

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

    ![Create a log tab in Asset Processor](/images/user-guide/assets/asset-processor/create-logging-tab.png)

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

{{< tip >}}
You can spawn multiple instances of `AssetBuilder.exe` and attach them to Visual Studio.
{{< /tip >}}

## Clearing the Cache

If you're a game artist and you're having issues running Asset Processor, the issues might be due to a corrupt cache. You might solve the issues by deleting your project's `Cache` directory. Restart Asset Processor to reprocess the source assets and rebuild the Asset Cache.

{{< note >}}
If you're an engineer making new BuilderSDK-based builders, we recommend that you don't delete your cache.
{{< /note >}}

## Debugging the scene pipeline

The scene pipeline imports source scene assets into a scene graph that contains the scene nodes like meshes and materials. The scene manifest adds processing rules that scene builders use to output scene product assets like models, collision meshes, and animations. The scene process is a complex framework that imports source asset scene files into a scene graph, updates the manifest, builds products from the scene rules in the manifest, and  generate product assets based on these rules. The frustration can lead to the scene author to tweak minor data in the original source scene (i.e. the Blender file) and re-exporting to attempt to resolve strange errors from the O3DE scene pipeline. The scene pipeline does many processing steps so it can be confusing to determine which of the scene node data (e.g. Transform Data, Mesh Data) were discovered and the rules used to import the scene nodes. Scene pipeline events can be overridden, by either Python scripts or C++ code modifying the scene manifest rules. This can lead to confusion of what rules were used to generate the product assets.

As source scene assets become more complex, developers will eventually need to debug the output from the scene pipeline to troubleshoot problems.

The team may encounter:

* Render models not aligning with collision meshes
* Materials end up with unexpected settings or textures
* Finding extra models in the scene
* User defined properties not showing up with the correct values
* Unexpected groupings of mesh nodes stored in a render model

### Common causes

#### AssImp issues

The scene pipeline uses the AssImp library to import source scene files into a scene graph. The scene graph is the in-memory representation of the source scene file in the pipeline. It is possible that the source scene file looks different in the scene graph due to how the AssImp library imports the file.

#### Missing user defined properties

User defined properties in the source scene file might be imported with unexpected results such as missing keys or changed values. There could be a mismatch in what the AssImp library will import, options to export custom properties might have been missed, or the scene pipeline might expect exact value types from the source scene file.

For more information, refer to [Scene API: User Defined Properties](/docs/user-guide/assets/pipeline/scene-api-udp/).

#### Wrong scene manifest rules used

A technical content creator (such as a Technical Artist) who is authoring or debugging a script might find some unexpected results for some source scene assets. Python scripts can add output commands in the asset’s log files using `print()`, but this may not be enough to determine what the script is affecting. The debug output flag is another good way to determine what is happening in the affected scripted pipeline.

### Solutions

#### Enable the debug output feature

The “debug output” flag is a feature flag that can be used to see what the scene pipeline produced for the scene graph and scene manifest. The scene graph is considered immutable after the source scene is imported from the AssImp library. The scene manifest can be updated during the scene pipeline events.

{{< note >}}
When enabled, AssetBuilders that support debug output will provide debug information as product assets. This is used primarily with scene files.
{{< /note >}}

The flag can be set on the command line or in the Asset Processor GUI application. To use the command line option:

```cmd
<path to asset processor>/AssetProcessor.exe --debugOutput
```

The command line flag can be applied to the batch version of the Asset Processor as well.

```cmd
<path to asset processor>/AssetProcessorBatch.exe --debugOutput
```

For example:

```cmd
D:\o3de\build\bin\profile\AssetProcessor.exe --debugOutput
```

The debug output flag can be set in the Asset Processor GUI using the Tools | Debug Output check box. When this check box is active, debug output files will be found in the cache folder for the scene files.

![Asset Processor UI Debug Output](/images/user-guide/assets/asset-processor/debug_output.png)

{{< note >}}
After turning on the debug output flag, the asset needs to be reprocessed to output the debug files.
{{< /note >}}

#### Debug output: scene graph

The scene graph debug output files are stored next to the default `.azmodel` file. For example, for a source file in `D:\o3de\my_project\assets\test.fbx` for the PC platform, the Cache folder should have (at least) these files:

```cmd
D:\o3de\my_project\Cache\pc\assets\test.azmodel
D:\o3de\my_project\Cache\pc\assets\test.dbgsg
D:\o3de\my_project\Cache\pc\assets\test.dbgsg.xml
```

The `.dbgsg` and `.dbgsg.xml` files are the debug scene graph files where the former is a flat list of debug information per node and the latter is an XML representation of the debug information of the nodes in the file.

The debug output lists the node name, the node path, and the node type. The name is the text label the author assigned to the node. The node path is the dotted notation that leads to the node from the root node. The node type stores specific data for that node such as mesh data, transform data, or custom property data. 

The Mesh Data stores information about the mesh such as the count of positions, normals, face list, and face material IDs. The Transform Data stores information about the matrix translation, scale, and rotation. The Material Data stores information such as its name and physical base rendering properties. The Custom Property Data stores the user defined properties in key-value pairs.

#### Debug output: scene manifest

The scene pipeline logic can be altered using Python scripts or C++ code to update the scene manifest. To determine how the logic affected the scene manifest rules a team can turn on the debug output flag and find the `.assetinfo.dbg` file in the Cache folder.

For example:

```cmd
D:\o3de\my_project\Cache\pc\assets\test.azmodel
D:\o3de\my_project\Cache\pc\assets\test.assetinfo.dbg
```

The `.assetinfo.dbg` file is a file representation of the scene manifest that was in memory when the scene builder processed the scene graph. Each rule starts with the `"$type"` key and lists the rule by both GUID and name such as `"{07B356B7-3635-40B5-878A-FAC4EFD5AD86} MeshGroup"`.

The MeshGroup is an example of a rule where it creates an `.azmodel` product file that is named using the `"name"` field, includes the mesh node paths in the `"selectedNodes"` array, and excludes the node paths in the `"unselectedNodes"` array.
