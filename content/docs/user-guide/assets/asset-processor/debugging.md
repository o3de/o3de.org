---
linkTitle: Debugging
title: Debugging Asset Processor Issues
description: Methods to debug Asset Processor issues in Open 3D Engine (O3DE).
weight: 500
toc: true
---

If you are having issues with **Asset Processor**, this page covers common problems, solutions, and debugging techniques.

Some of the most common problems we've seen with Asset Processor include:

* Asset processing takes too long after changes are made to a source asset.
* The product assets don't behave like expected. They may have incorrect information, be missing information, or be missing entirely.
* Unexpected warnings or errors.
* Asset packaging isn't working as expected. Content is missing or content is being included in bundles that was not expected to be there.
* Different members of a team getting different results from asset processing, impacting the ability for the team to cooperate.

## Non-deterministic product assets

With no changes to the code for a builder, and no changes to a source asset, when that job is run multiple times, the contents of product assets end up different than the previous run. This indicates that the builder is _non-deterministic_ based on the inputs used to process the asset.

### Effect

More assets than expected will show up when attempting to generate Delta Asset Bundles to create content patches for your game, causing your players to download more content than necessary.

### Common causes

* Extraneous information is included in the product asset, such as a timestamp. Information which would be guaranteed to vary for each build is a possible cause.
* Logic in the builder is non-deterministic. Make sure that asset building is as deterministic as possible, with no side effects.

### Solutions

In most cases this will require an engineer to make changes to the internal builder logic to stabilize the product output.

### Debugging

Your team will most likely encounter this issue when generating [Asset Bundles](/docs/user-guide/packaging/asset-bundler/), which is the primary system non-deterministic Product Assets impacts. If a Product Asset shows up in a bundle that you didn't expect to be there because the Source Asset and associated Asset Builder did not change, then debugging tends to start by working backward from there.

Non-deterministic behavior in Product Assets will be introduced by the asset builder that created this product asset, so to identify the cause you'll want to look for this product asset in the Asset Processor's asset tab, or directly in the Asset Database using an external database browsing tool. From there you can find the job that created that product asset. Once you identify the job that created this product asset, you can then find the builder that produces that job, and go to the Process Jobs function for that builder, to find where it outputs the product asset. Working backward from here, you should be able to find the cause of the Product Asset changing by exploring the code. You can also try [debugging the Asset Builder](#DebugAssetBuilders) processing that job, to step through.

To help identify the block of logic in the Product Asset that is changing each time it is processed, you may be able to use a standard file diffing tool using two generated product assets. You can quickly re-generate the product asset by right clicking it in the Asset Processor's asset tab and selecting reprocess source asset.

Another debugging option is setting up automation to catch this early. If you have an automated system that processes assets for your project, you can expand this automation to also compare iterative asset processing to a clean cache asset process and the previous day's assets. Doing this will let you compare the hashes of Product Assets, and find any where the hash has changed when it should not have.

## Same Product Asset generated with different Sub ID {#ProductAssetSubId}

### Situation

The Sub ID for a Product Asset changes when it is not expected to change. In the worst case, the Sub ID is changing when no changes have been made to the Source Asset or builder that created the Product Asset. In other cases, a change to the Source Asset results in a Product Asset that has a different Sub ID than it did previously.

### Effect

Assets are mostly referenced by asset ID, the UUID of the source asset with the Sub ID for that product asset. If this is not consistent and the Sub ID changes for a Product Asset when it should not change, then external references to this asset can end up incorrect, pointing at a different asset after a rebuild or pointing at no asset if no other products use that Sub ID.

### Example

Here is an example with scene files and prefabs:

1. Create a new FBX file named `shapes_1.fbx` with two meshes in it, a cube and a cylinder. Name the cube `Mesh_A` and the cylinder `Mesh_B`.
1. Swap the names of these two meshes, so the cube is now named `Mesh_B` and the cylinder is named `Mesh_A`. Save this to a second FBX named `shapes_2.fbx`.
1. Place `shapes_1.fbx` in your project, and rename it to `shapes.fbx`.
1. Create a new prefab with an entity in it with a mesh component.
1. Assign the cube `Mesh_A` from `shapes.fbx` to this component.
1. Save and quit the Editor.
1. Replace the `shapes.fbx` file in your project with the `shapes_2.fbx` file created earlier.
1. Load the Editor.
1. Load the prefab you saved earlier.
1. Notice that the mesh on the entity component is still `Mesh_A`, but now visually looks like the cylinder.

This happens because scene processing generates Sub IDs based on the node's name. The prefab was tracking the outgoing asset reference via this ID, so the node name is functionally what is used to track references to individual Product Assets generated from the source FBX.

Note that in this case, this behavior is 100% intentional. There is no code issue in this example. In this case, if this change was not intended by the FBX author, it is a content bug. The following sections will cover how to identify and correct issues like this.

### Common causes

#### Change to source asset causes Sub IDs to shift

The most common place Sub ID changes occurs is when the Sub ID generation is based on data within the source asset, and that data can change. For example, if a node name is hashed to generate the Sub ID for a product asset, then a content creator renaming that node in the source asset will cause the associated product asset to generate a new Sub ID.

#### Non-deterministic Sub ID generation from builder

Sometimes the logic for how a builder may not be fully deterministic. For example, if a builder just increments an integer to use as the Sub ID for each product it generates, then a source asset change that results in a change in the products to remove one, will result in the Sub IDs changing for all product assets after the removed product asset.

#### Change in builder logic changes Sub ID generation

There are times when a builder author needs to make a change to how the builder generates Sub IDs for product assets, resulting in all product assets output from that builder changing Sub IDs the next time they are processed.

### Solutions

#### Stabilize Sub IDs while authoring a builder

It is the responsibility of the person authoring a builder to define the rules for how Sub IDs are generated by that builder. When doing so, we recommend putting in effort to stabilize Sub ID generation as much as possible: Think about how the source asset can be modified, and how you can maintain continuity in product asset Sub ID generation based on those changes.

The Asset Pipeline supports a Legacy Sub ID that can be used to remap old sub IDs to new sub IDs, when a builder author needs to change them.

Tips for stabilizing Sub IDs for Product Assets authoring a builder:

* A randomly generated Sub ID is usually going to result in the Sub ID changing when not expected, even if the generation is semi-randomized. Randomly generated Sub IDs should be avoided.
* Sometimes builder authors will assign Sub ID for Product Assets based on the ordered index of that information in the Source Asset. This can result in unstable Sub IDs, because changes in the Source Asset can result in the ordered list shuffling.
   * For example if the content creator removes an entry and causes everything else to shuffle down an index.
* Hashing the name of an object to use as a reference can work as long as content creators don't expect to rename these objects to have the Sub ID remain stable.
   * Hashing the name of an object to use as the Sub ID can also be beneficial to content creators in that it allows them to replace content by creating new data with the same name to generate a Product Asset with the same ID.
* Sometimes there may be a stable internal ID you can use, that content creators do not get direct control over. For example, there may be an internal node structure that generates unique internal IDs for nodes that content creators cannot change. This may be more stable in some ways to use to generate Sub IDs, but consider your content creator's workflows before committing to using this for Sub ID generation. There may be times a content creator specifically wants to make a new thing to replace something, and have the new Product Asset seamlessly be used everywhere the old one was. See the previous point about using object names for an example.

#### Learning how Sub ID generation works for builders that process content you author

As a content creator, learning how Sub IDs are generated for Product Assets created from the Source Assets you work on can prevent these problems in the first place.

When a Sub ID changes for a Product Asset, it will cause all references to that Product Asset to break, because the Asset ID will no longer resolve to that asset.

During initial content creation, especially for scene files like FBX, thinking through how you want that content referenced elsewhere can help keep the Sub ID for the Product Assets stable.

If you need to make a change to the Source Asset, keep in mind how your changes will impact the Sub IDs of the Product Assets. If you do need to change the Product Assets, a good pattern to follow is:
1. Create a stub of the new Product Asset, or leave a stub for the old Product Asset.
1. Find all references to the old Product Asset.
1. Update those as necessary, working with other members on your team to do so.
1. Once you're sure nothing is left referencing the old Product Asset, then make the final change to remove it from the Source Asset.

#### Fix the broken references - update the source asset

Updating the source asset in a way that it will output a product asset with the same sub ID will fix any broken connections. This works best when the product asset was removed unintentionally, either the content creator was unaware the product asset was in use, or they made a change to the source asset not realizing it would cause this issue.

#### Fix the broken references - update the content referencing the missing product asset

If the removal of the product asset was intentional, or the source asset cannot safely be updated to restore the product asset, it may be necessary to instead update everything referencing the broken product asset. In this case you'll need to search for all broken references, and for each type or content or code referencing the missing product asset, update it within the relevant system to handle the removal of this product asset or change to the Sub ID.

For example, if an FBX file was updated to no longer generate a Product Asset, and an O3DE Prefab referenced this product asset via a mesh component on an entity, you can use the prefab editing workflow to fix this.

1. Load the prefab to be edited.
1. Find the component with the broken reference.
1. Either change it to reference alternate content, or remove the component/entity.

### Debugging

If content appears missing or broken, try opening the file that references broken content in a text editor or another editor that might show additional details. Search for the broken reference, it will either be an asset ID which is a combination UUID and Sub ID, or it will be a reference via relative path.

If you can find the missing reference and it is an Asset ID reference, then you can use the UUID to determine the Source Asset. From here, you can look at the history of this Source Asset in your source control to see what changes may have come in, as well as who authored those changes. You can experiment by rolling back the file locally to see if the missing product asset shows up again.

If you believe the issue is within the builder itself, and is not a content problem, then you can try [debugging the Asset Builder](#DebugAssetBuilders) to investigate how the product Sub IDs are generated and where the change in Sub IDs is coming from.

If the builder is an O3DE builder, and not one that your team has created, you can create a ticket [here](https://github.com/o3de/o3de/issues) to get this looked at.

## Logic Change in Builder with no Version Change {#NoVersionChange}

### Situation

An engineer makes changes to the logic of an asset builder, but the engineer does not change the fingerprint or version of the builder.

### Common issues

Source Assets processed by this builder will not be automatically reprocessed with the latest changes.

If an asset would fail to process due to the builder change, the engineer making the change might not notice until the builder change is pushed to the rest of the team, causing other people to be disrupted by the failing asset.

If other content or logic requires the changes from processing the asset, other team members may run into problems using the Product Assets output by the older version of the builder with the other updated logic.

### Immediate solution

Change the version number of the builder reported in that builder's `AssetBuilderSDK::AssetBuilderDesc`. After you do this and rebuild the Asset Processor, all assets using this builder will be reprocessed.

### Long term solutions

One configuration that would catch issues would be:

* Iterative Job - Processes assets after a code rebuild.
* Clean Job - Cleans and processes all assets after a code build.
* Compare the hashes of each Product Asset between builds and runs of these jobs. If any assets end up different in two back to back Clean Jobs but did not process in the Iterative Job, this usually means an asset builder was modified without changing its version.

### Debugging

Debugging this issue is usually focused around discovery of the issue in the first place. Once it's identified as a problem, identifying which builder needs a version change and making that change is usually trivial.

If some team members are experiencing issues with content, but not everyone on the team is having the problem, but that content has not changed recently, this is commonly the cause. Check if the builder for that content has been modified in source control recently, and if so, check if the version was changed. If not, then it's likely that the builder change without a version number change is causing a problem.

The Asset Processor UI lets you right click a Source Asset in the asset tab and re-run all jobs on that asset. If doing so causes a change in Product Asset, it likely means a builder was changed without having the version updated. If you want to debug this back and forth, it's recommended that you back up the old Product Asset(s) before reprocessing the Source Asset.

## Logic in Asset Builder persists between building assets

### Situation

In some cases, due to information persisting during asset processing, you may get different Product Asset output from jobs based on the order Source Assets are processed. This is usually due to a bug within the Asset Builder that processed this content.

The Asset Processor starts one or more Asset Builder executables based on configuration settings, and uses these to process assets, sending jobs to these Asset Builder executables to run with the individual Asset Builders. There is no system within the Asset Builder Executable to completely shut down and clear all Asset Builders, so it is possible for an Asset Builder to persist information across multiple sessions of processing jobs for a single Asset Builder Executable.

### Effect

Stale data or logic in the Asset Builder Executable can result in an Asset processing incorrectly.

### Cause

The cause for this issue is when information is cached during one step in processing to make it easier to access at a later step.

### Example

This example covers a situation where this problem was encountered:

* The Scene Builder processes scene files, such as FBX files, into a collection of product assets.
* Each scene file has a scene manifest that contains additional processing rules.
* Within the scene manifest, a Python script file can be marked to run during scene processing.
* On initial startup, the Scene Builder within each Asset Builder Executable would start with no set Python script.
* On encountering a scene file that had a scene manifest with a Python script to run, the Scene Builder was storing this Python script to use later.
* The Scene Builder unintentionally stored this data in a way that persisted across jobs.
* For this example, FBX file `NoPython.fbx` does not have a Python script set to run in its Scene Manifest, but FBX `WithPython.fbx` does have a Python script set to run in its Scene Manifest.
* If both jobs end up running on the same Asset Builder Executable, then if `WithPython.fbx` is processed by the Scene Builder on that Asset Builder before `NoPython.fbx`, the Python script to run was persisted in a way that it was run on `NoPython.fbx`.
* The end result was `NoPython.fbx` was producing different output if it ran after `WithPython.fbx` on the same Asset Builder Executable as `WithPython.fbx` ran on over any other situation: Running before `WithPython.fbx`, running on a different Asset Builder Executable.

### Solutions

The primary solution to this problem is to update the builder to not cache information in a way that it persists across jobs.

Automated tests can help prevent this from cropping up. You can see a test that covers the example case above [here](https://github.com/o3de/o3de/blob/development/AutomatedTesting/Gem/PythonTests/assetpipeline/fbx_tests/pythonassetbuildertests.py#L50). This test is annotated with how it's setup and why.

### Debugging

This issue is difficult to identify because it requires a very specific setup, as explained previously. This issue was found by working backward from intermittent issues on automated asset processing jobs on the O3DE Jenkins servers.

If your team is seeing situations where some people encounter different asset processing results than other team members, and you've already ruled out [a builder change without a version change](#NoVersionChange) as the source of the issue, then keep this in mind. Examine asset processing logs for the assets showing the issue, and check the asset processing order for cases where the issue occurs, compared against cases it does not occur. Specifically look for what other jobs ran on the same Asset Builder Executable, using the same Asset Builder on that executable.

Asset Processor, both the command line and graphical interfaces, support a command line flag that can help with investigating. The flag `--sortJobsByDBSourceName` will stabilize the order that jobs are run in. Using this while debugging will let you test different job processing orders by renaming assets to control the order they run. The Asset Processor also allows for regset values to be controlled via command line, using the `--regset` flag with the setting to set. Specifically, setting the regset value `/Amazon/AssetProcessor/Settings/Jobs/maxJobs` to `1` will restrict the Asset Processor to only launch a single Asset Builder executable. Note that if you have many assets to process, this will result in a long asset processing time, so it's recommended that you set this after you've processed all jobs in a previous Asset Processor run with more max jobs. Once you are running Asset Processor with one max job, all assets will process in that session on the same builder, letting you specifically process assets in the order of your choosing.

Attaching Visual Studio to a running Asset Builder can also help with debugging. Following [these instructions](#DebugAssetBuilders) will run Asset Processor with a single builder, so you can process multiple assets in order with Visual Studio connected to the Asset Builder Executable. At that point you can try manually re-processing assets using the right click menu of the Asset Tab, and track what data is persisting across multiple jobs on the same Asset Builder on the same Asset Builder Executable.

## Fixing warnings, errors, and failures

### Situation

After an asset finishes processing, if the job completed it may still have a number of warnings or errors you may wish to address. In other cases, the job may not finish and may instead fail.

You can see information about viewing Asset Job status in the Asset Processor [here](interface/#jobs).

### Effect

A warning or error in an Asset Job is the Asset Builder author's way of informing content authors that they encountered an issue processing your asset, and may not have generated the Product Asset the content author expected.

A failure is an Asset Builder author's way of informing content authors that they were unable to process the Source Asset at all and cannot put out product assets.

The builder author decides on a case by case basis what a warning, error, or failure is. There is guidance [here](/docs/user-guide/assets/asset-processor/interface/#jobs), with suggested patterns to follow.

### Example - Warning

```
>	The name of the node 'Material.003' was invalid or conflicting and was updated to 'Material_003'.
```

This warning occurred when an FBX file contained a material with the illegal character `.` in its name. This is a warning because the system was able to safely substitute the character for another, legal character. No action needs to be taken, but if the content creator wanted to clear this warning, they would rename the material in the FBX file. In this example, if you did decide to rename the material to clear the warning, be careful you don't introduce another problem by causing the [Sub ID of the Product Asset to change](#ProductAssetSubId).

### Example - Error

```
>	Element with class ID '{4C19E257-F929-524E-80E3-C910C5F3E2D9}' is not registered with the serializer!
```

This error occurred when a prefab file referenced a class that was no longer registered with the serializer. This is an error because this prefab will no longer behave the same way it behaved when it was authored, there is no longer a C++ class that matches this serialization information. This is an error and not a warning because the missing information could have side effects that effect the functionality of this prefab. The prefab can still be processed to some degree, so it is an error instead of a failure. In this case a broken Product Asset is usually desired over no Product Asset at all, because it gives more options for debugging and correcting the situation.

### Example - Failure

```
>	Failed to import Asset Importer Scene. Error returned: FBX-Parser unexpected end of file
```

This failure occurred because the file processed was a blank file with the FBX extension. There was no information for the Scene Builder to even attempt to create a Product Asset from, so it failed and output nothing.

### Solutions

Most Warning, Error, and Failure messages will include enough information to help guide the steps to take in addressing the problem. If this is not enough information, the next step would be to look at other log messages for that job, to see if they contain relevant information.

Usually clearing this will involve a change to the Source Asset. The asset processing logs for the specific asset you are investigating may contain additional details that can help you resolve the issue by changing the source asset.

In some cases it may make more sense to change the Asset Builder to handle this data more correctly. If you're a content creator and you don't see a path you like in addressing the issue, talk to someone on your engineering team to see if the Asset Builder can be updated to better handle the Source Asset.

### Debugging

The first step in debugging asset job warnings, errors, and failures is the [jobs tab](/docs/user-guide/assets/asset-processor/interface/#jobs) of the Asset Processor UI, or the log output of Asset Processor Batch. The logging from processing the job generally give guidance on why this situation is a problem and in many cases covers steps to take to correct it.

The next debugging option is checking the documentation for that specific builder, which may provide guidance on creating assets that process cleanly. For example, if you are encountering an issue with FBX files and aren't sure what steps to take, the [3D Scene Format Support documentation](/docs/user-guide/assets/scene-settings/scene-format-support/) may have some information to help address the issue.

Another option would be to examine the source code for the builder itself, especially around the locations generating those messages. Step through why the builder is having issue with the data, and see if this either leads to a way to change the Source Asset to clear the issue, or a path to changing the builder itself to better handle the Source Asset.

To help with that, it may be useful to [more directly debug the Asset Builder](#DebugAssetBuilders).

## Slow asset processing times

Long asset processing times can be disruptive to a team's ability to iterate quickly on a project.

### Common causes

* Source asset quantity - A project with a lot of content will take a longer time to process.
* Large or difficult to process source assets - In some cases, a single source asset may be an outlier, having a much longer processing time than most other content.
* Deep job dependency web - A large job dependency web can result in a change to one file causing many other files to need to reprocess. Read the topic on [asset dependencies and identifiers](/docs/user-guide/assets/pipeline/asset-dependencies-and-identifiers/) for more information.

### Solutions

* Removing unused content from your project can save on overall asset processing time.
* Targeted performance improvements at the Asset Builders that are taking the most overall time in asset processing can help.

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

A technical content creator (such as a Technical Artist) who is authoring or debugging a script might find some unexpected results for some source scene assets. Python scripts can add output commands in the asset's log files using `print()`, but this may not be enough to determine what the script is affecting. The debug output flag is another good way to determine what is happening in the affected scripted pipeline.

### Solutions

#### Enable the debug output feature

The "debug output" flag is a feature flag that can be used to see what the scene pipeline produced for the scene graph and scene manifest. The scene graph is considered immutable after the source scene is imported from the AssImp library. The scene manifest can be updated during the scene pipeline events.

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

## View Asset Processor logs 

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

1. Enter the command below to get a list of possible options. See [Asset Builder Settings](/docs/user-guide/assets/pipeline/asset-builders#Settings) for further information.

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

## Debug Asset Builders from Asset Processor {#DebugAssetBuilders}

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

## Clearing the cache


If you're a game artist and you're having issues running Asset Processor, the issues might be due to a corrupt cache. You might solve the issues by deleting your project's `Cache` directory. Restart Asset Processor to reprocess the source assets and rebuild the Asset Cache.

{{< note >}}
If you're an engineer making new BuilderSDK-based builders, we recommend that you don't delete your cache.
{{< /note >}}