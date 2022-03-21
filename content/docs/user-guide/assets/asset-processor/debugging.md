---
linkTitle: Debugging
title: Debugging Asset Processor Issues
description: Methods to debug Asset Processor issues in Open 3D Engine (O3DE).
weight: 500
toc: true
---

If you are having issues with **Asset Processor**, use the methods below to debug the issues.

## What kinds of problems can be encountered within Asset Processing?

* After changing a source asset, it takes too long for assets to finish processing.
* The product assets don't behave like expected. They may be missing entirely, missing information, have incorrect information.
* Finding and attempting to fix a warning, error, or failure that occured during asset processing for a particular job.
* Asset packaging isn't working as expected, content is missing or content is being included in bundles that was not expected to be there.
* Assistant while working on a builder to add a new feature, fix a bug, or create a new builder.
* Different members of a team getting different results from asset processing, impacting the ability for the team to cooperate.

## What are common Asset Processor related problems, and paths to address those problems?

### Non Deterministic Product Assets - Different Product Assets with No Source Changes

#### Situation
With no changes to the code for a builder, and no changes to a source asset, when that job is run multiple times, the contents of product assets end up different than the previous run.

#### Effect
More assets than expected will show up when attempting to generate Delta Asset Bundles to create content patches for your game, causing your players to download more content than necessary.

#### Common Causes
Extraneous information is included in the product asset, such as a timestamp. Logic in the builder is non-deterministic.

#### Solutions
In most cases this will require an engineer to make changes to the internal builder logic to stabilize the product output.

#### Debugging
Your team most likely encounter this issue when generating [Asset Bundles](/packaging/asset-bundler/), which is the primary system non-deterministic Product Assets impacts. If a Product Asset shows up in a bundle that you didn't expect to be there because the Source Asset and associated Asset Builder did not change, then debugging tends to start by working backward from there.

Non-deterministic behavior in Product Assets will be introduced by the asset builder that created this product asset, so to identify the cause you'll want to look for this product asset in the Asset Processor's asset tab, or directly in the Asset Database using an external database browsing tool. From there you can find the job that created that product asset. Once you identify the job that created this product asset, you can then find the builder that produces that job, and go to the Process Jobs function for that builder, to find where it outputs the product asset. Working backward from here, you should be able to find the cause of the Product Asset changing by exploring the code. You can also try [debugging the Asset Builder](#DebugAssetBuilders) processing that job, to step through.

To help identify the block of logic in the Product Asset that is changing each time it is processed, you may be able to use a standard file diffing tool using two generated product assets. You can quickly re-generate the product asset by right clicking it in the Asset Processor's asset tab and selecting reprocess source asset.

Another debugging option is setting up automation to catch this early. If you have an automated system that processes assets for your project, you can expand this automation to also 

### Same Product Asset generated with different Sub ID

#### Situation
The Sub ID for a Product Asset changes when it is not expected to change.

In the worst case, the Sub ID is changing when no changes have been made to the Source Asset or builder that created the Product Asset. In other cases, a change to the Source Asset results in a Product Asset that has a different Sub ID than it did previously.

#### Effect
Assets are mostly referenced by asset ID, the UUID of the source asset with the Sub ID for that product asset. If this is not consistent and the Sub ID changes for a Product Asset when it should not change, then external references to this asset can end up incorrect, pointing at a different asset after a rebuild or pointing at no asset if no other products use that Sub ID.

#### Example
Here is an example with scene files and prefabs:
1. Create a new FBX file named shapes_1.fbx with two meshes in it, a cube and a cylinder. Name the cube Mesh_A and the cylinder Mesh_B.
1. Swap the names of these two meshes, so the cube is now named Mesh_B and the cylinder is named Mesh_A. Save this to a second FBX named shapes_2.fbx.
1. Place shapes_1.fbx in your project, and rename it to shapes.fbx.
1. Create a new prefab with an entity in it with a mesh component.
1. Assign the cube Mesh_A from shapes.fbx to this component.
1. Save and quit the Editor.
1. Replace the shapes.fbx file in your project with shapes_2.fbx.
1. Load the Editor.
1. Load the prefab you saved earlier.
1. Notice that the mesh on the entiyt component is still Mesh_A, but now visually looks like the cylinder.

This happens because scene processing tracks the meshes by name, and by swapping the names between the meshes you've replaced which product assets are which. The prefab tracks the outgoing product asset reference via asset ID. When I tested this locally, my Mesh_A azmodel had the Product Asset ID {00431C65-528C-570B-8A52-5D43679BBFAC}:270123712, and Mesh_B has the asset ID {00431C65-528C-570B-8A52-5D43679BBFAC}:285065766. When I swapped the FBX files, the node within the file named Mesh_A still had that same first ID, but the geometry was a cylinder now, changing what it looked like in the prefab.

Note that in this case, this behavior is 100% intentional. There is no code issue in this example. In this case, if this change was not intended by the FBX author, it is a content bug. The following sections will cover how to identify and correct issues like this.

#### Common Causes

##### Change to source asset causes Sub IDs to shift
The most common place Sub ID changes occurs is when the Sub ID generation is based on data within the source asset, and that data can change. For example, if a node name is hashed to generate the Sub ID for a product asset, then a content creator renaming that node in the source asset will cause the associated product asset to generate a new Sub ID.

##### Non-deterministic Sub ID generation from builder
Sometimes the logic for how a builder may not be fully deterministic. For example, if a builder just increments an integer to use as the Sub ID for each product it generates, then a source asset change that results in a change in the products to remove one, will result in the Sub IDs changing for all product assets after the removed product asset.

##### Change in builder logic changes Sub ID generation
There are times when a builder author needs to make a change to how the builder generates Sub IDs for product assets, resulting in all product assets output from that builder changing Sub IDs the next time they are processed.

#### Solutions

##### Stabilize Sub IDs while authoring a builder
It is the responsibility of the person authoring a builder to define the rules for how Sub IDs are generated by that builder. When doing so, we recommend putting in effort to stabilize Sub ID generation as much as possible: Think about how the source asset can be modified, and how you can maintain continuity in product asset Sub ID generation based on those changes.

Tips for stabilizing Sub IDs for Product Assets authoring a builder:
* A randomly generated Sub ID is usually going to result in the Sub ID changing when not expected, even if the generation is semi-randomized. Randomly generated Sub IDs should be avoided.
* Often times, the obvious first way to assign Sub ID for Product Assets is based on the ordered index of that information in the Source Asset. Often times this results in problems with Sub IDs changing, because changes in the Source Asset can result in the ordered list used to shuffle. For example if the content creator removes an entry and causes everything else to shuffle down an index.
* Hashing the name of an object to use as a reference can work as long as content creators don't expect to rename these objects have have the Sub ID remain stable.
   * Hashing the name of an object to use as the Sub ID can also be beneficial to content creators in that it allows them to replace content by creating new data with the same name to generate a Product Asset with the same ID.
* Sometimes there may be a stable internal ID you can use, that content creators do not get direct control over. For example, there may be an internal node structure that generates unique internal IDs for nodes that content creators cannot change. This may be more stable in some ways to use to generate Sub IDs, but consider your content creator's workflows before committing to using this for Sub ID generation. There may be times a content creator specifically wants to make a new thing to replace something, and have the new Product Asset seamlessly be used everywhere the old one was. See the previous point about using object names for an example.


##### Learning how Sub ID generation works for builders that process content you author
As a content creator, learning how Sub IDs are generated for Product Assets created from the Source Assets you work on can prevent these problems in the first place.

When a Sub ID changes for a Product Asset, it will cause all references to that Product Asset to break, because the Asset ID will no longer resolve to that asset.

During initial content creation, especially for scene files like FBX, thinking through how you want that content referenced elsewhere can help keep the Sub ID for the Product Assets stable.

If you need to make a change to the Source Asset, keep in mind how your changes will impact the Sub IDs of the Product Assets. If you do need to change the Product Assets, a good pattern to follow is
1. Create a stub of the new Product Asset, or leave a stub for the old Product Asset.
1. Find all references to the old Product Asset.
1. Update those as necessary, working with other members on your team to do so.
1. Once you're sure nothing is left referencing the old Product Asset, then make the final change to remove it from the Source Asset.

##### Fix the broken references - update the source asset
Updating the source asset in a way that it will output a product asset with the same sub ID will fix any broken connections. This works best when the product asset was removed unintentionally, either the content creator was unaware the product asset was in use, or they made a change to the source asset not realizing it would cause this issue.

##### Fix the broken references - update the content referencing the missing product asset
If the removal of the product asset was intentional, or the source asset cannot safely be updated to restore the product asset, it may be necessary to instead update everything referencing the broken product asset. In this case you'll need to search for all broken references, and for each type or content or code referencing the missing product asset, update it within the relevant system to handle the removal of this product asset or change to the Sub ID.

For example, if an FBX file was updated to no longer generate a Product Asset, and an O3DE Prefab referenced this product asset via a mesh component on an entity, you can use the prefab editing workflow to fix this.
1. Load the prefab to be edited.
1. Find the component with the broken reference.
1. Either change it to reference alternate content, or remove the component/entity.

#### Debugging
If content appears missing or broken, try opening the file that references broken content in a text editor or another editor that might show additional details. Search for the broken reference, it will either be an asset ID which is a combination UUID and Sub ID, or it will be a reference via relative path.

If you can find the missing reference and it is an Asset ID reference, then you can use the UUID to determine the Source Asset. From here, you can look at the history of this Source Asset in your source control to see what changes may have come in, as well as who authored those changes. You can experiment by rolling back the file locally to see if the missing product asset shows up again.

If you believe the issue is within the builder itself, and is not a content problem, then you can try [debugging the Asset Builder](#DebugAssetBuilders) to investigate how the product Sub IDs are generated and where the change in Sub IDs is coming from.

If the builder is an O3DE builder, and not one that your team has created, you can create a ticket [here](https://github.com/o3de/o3de/issues) to get this looked at.

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
<a name="DebugAssetBuilders"></a>

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
