---
linkTitle: Asset Builders 
title: Asset Builders
description: Asset Builders use configurable rules to generate product assets from jobs that are dispatched by Asset Processor in Open 3D Engine (O3DE).
weight: 400
toc: true
---

An **Asset Builder** is a bundle of code that **Asset Processor** runs to generate product assets. Asset Builders can be distributed as Gems and might use third-party libraries to process assets. The **Scene Processing** Gem, for example, contains the Asset Builders that process `.fbx` files, and uses the [Open Asset Import Library](https://github.com/assimp/assimp) to parse `.fbx` files.

{{< note >}}
The Open Asset Import Library supports [many scene formats](https://github.com/assimp/assimp/blob/master/doc/Fileformats.md). You can experiment with additional formats by editing `o3de/Registry/sceneassetimporter.setreg` and adding format extensions to the `"SupportedFileTypeExtensions"` list.
{{< /note >}}

## Anatomy of an Asset Builder

Asset Builders have three core components: a **Descriptor** for the builder, and handlers for **Create Jobs** and **Process Job** requests.

![Simple Job](/images/user-guide/assets/pipeline/asset_builders/asset_builder_basics.png)

### Descriptor

The Descriptor provides Asset Processor the information required to identify the Asset Builder and also declares which source file types the Asset Builder can process. The Descriptor contains the file patterns of the supported source assets, a Universally Unique Identifier (UUID), and a version number. Asset Processor uses the Descriptor to filter source assets to the appropriate Asset Builder.

The Asset Builder UUID is also used to create the sub ID for product assets it generates. The sub ID of the product asset must match the current UUID of its Asset Builder. Changing the UUID of an Asset Builder triggers all source assets that have been previously processed by the Asset Builder to be reprocessed.

### Create Jobs

Create Jobs generates asset processing jobs for Asset Processor. When Asset Processor detects a new or updated source asset and determines the appropriate Asset Builder to process the source asset, it sends a `CreateJobsRequest` that contains information about the source asset, including its path, to the Asset Builder. The Asset Builder responds with a `CreateJobsResponse` that contains `JobDescriptor` structures, and source and job dependencies. For example, if the `CreateJobsRequest` is for a material to be processed, the Asset Builder includes a dependency on the referenced shader source asset in the `CreateJobsResponse`, ensuring the shader is processed before the material.

{{< note >}}
Create Jobs is a single threaded process. There might be instances where you implement an Asset Builder that does specialized processing for a source asset type that is also supported by other Asset Builders. You might need to examine the source asset to determine if the specialized Asset Builder should process the source asset. In these instances, examining the asset as part of Process Job, and exiting the process early depending on the result, can offer better performance because Process Job is multithreaded. 
{{< /note >}}

### Process Job

Process Job generates the product asset and product dependencies. The Asset Builder receives a `ProcessJobRequest` from Asset Processor containing info on the source asset to process. The Asset Builder responds with a `ProcessJobResponse`. The function of `ProcessJobResponse` is to process the source asset and return information about the product assets it creates, including sub IDs and product dependencies.

`ProcessJobResponse` places the product assets in a temp directory. Asset Processor moves the product assets to the **Asset Cache** and populates the **Asset Database** and **Asset Catalog** with information it uses to track the product assets, product dependencies, and the jobs that produced them.

Process Job is multithreaded. Several Asset Builders can run multiple process jobs simultaneously.


### Settings
You can run Asset Builder in debug mode when develop new features for a builder or to debug issues in the asset pipeline. In debug mode, Asset Builder creates a test job or processes jobs for specified files.

{{< note >}}
You must start Asset Processor before you can enter a -debug command for AssetBuilder.
{{< /note >}}

To debug with Asset Builder:
* Use the instructions for setting Asset Processor to just use a single Asset Builder processor: 
* Navigate to the build folder directory, for example `build\windows\bin\profile`
* In a command line prompt, enter the following command to get a list of possible options: `AssetBuilder -help`
* Or use the settings below to aid with debugging the AssetBuilder, for example `AssetBuilder.exe --debug C:\o3de\o3de\Assets\Editor\Materials\ShaderList.xml --platform pc --tags dx12 --project-name AutomatedTesting --project-cache-path C:\o3de\o3de\AutomatedTesting\Cache`

| Setting            | Description                                                                                                                                                                                                   |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| help               | Print this help information.                                                                                                                                                                                  |   
| task               | The task to run.                                                                                                                                                                                              |
| project-name       | Name of the current project.                                                                                                                                                                                  |
| project-cache-path | Full path to the project cache folder.                                                                                                                                                                        |
| module             | For resident mode, the path to the builder dll folder, otherwise the full path to a single builder dll to use.                                                                                                |
| port               | Optional, port number to use to connect to the Asset Processor.                                                                                                                                               |
| id                 | UUID string that identifies the builder.  Only used for resident mode when the Asset Processor directly starts up the AssetBuilder.                                                                           |
| input              | For non-resident mode, full path to the file containing the serialized job request.                                                                                                                           |
| output             | For non-resident mode, full path to the file to write the job response to.                                                                                                                                    |
| debug              | Debug mode for the create and process job of the specified file. <br/>Debug mode optionally uses `-input`, `-output`, `-module`, `-port` and `-gameroot`. For example: `-debug Objects\Tutorials\shapes.fbx`. |                                                                                                                                  
| debug_create       | Debug mode for the create job of the specified file.                                                                                                                                                          |
| debug_process      | Debug mode for the process job of the specified file.                                                                                                                                                         |
| tags               | Additional tags to add to the debug platform for job processing. One tag can be supplied per option.                                                                                                          |
| platform           | Platform to use for debugging, for example, `pc` |

## Loading other files

Sometimes, when authoring a builder, it may be necessary to load other files besides the primary source file to finish a given process.

### Understanding file locations

![File Locations](/images/user-guide/assets/pipeline/asset_builders/asset_builder_file_locations.png)

Files relevant to asset processing can exist in these locations:
1. The Asset Cache is where all product assets exist.
1. Scan directories are the only place source assets can exist.
1. Source files (not assets) can be on any drive in any location.

[Scan directories](/docs/user-guide/assets/pipeline/scan-directories/) are monitored by Asset Processor for new and updated source assets. Scan directories can be user defined, however, the primary scan directories are in the following locations:
1. The current project's directory.
1. The `Assets` folder for each Gem enabled for the project.

Individual Gems, the active O3DE project, and the engine itself can all be installed to different drives.

#### Types of files in asset processing

![All files in asset processing](/images/user-guide/assets/pipeline/asset_builders/asset_builder_all_dependencies.png)

* Source assets
   * Source assets are files that exist in scan directories for an O3DE project, that match an Asset Builder's registered pattern, and result in a job being created when Create Jobs is called with the source asset for the Asset Builder.
   * Read more about [source assets here.](/docs/user-guide/assets/pipeline/source-assets/)
* Non-asset source files
   * Non-asset source files are files that may or may not be in a scan directory, that are loaded and referenced when processing a source asset.
   * The difference between a source asset and a non-asset source file is either:
      * The file is not in a scan directory,
      * The file does not match a file pattern for any asset builder descriptor, or
      * The file does not generate a job when create jobs is called for the file for matching asset builders
* Intermediate assets
   * Intermediate assets are source assets that are generated as a product of an asset processing job.
   * Read more about [intermediate assets here.](/docs/user-guide/assets/pipeline/intermediate-assets/)
* Product assets
   * Product assets are the runtime ready output of an asset processing job.

### References from source assets and non-asset source files to other files

![Source asset references](/images/user-guide/assets/pipeline/asset_builders/source_asset_references.png)

Source assets and non-asset source files can reference each other in many different ways, and each case might require unique handling at the time of authoring an asset builder.

Source assets and non-asset source files may have these references:
* source assets by UUID
* source assets by a path
* non-asset source files in a scan directory by a path
* non-asset source files outside a scan directory by a path
* product assets by asset ID
* product assets by a path

Path references from source asset and non-asset source files may be defined in these ways:
* Relative to a scan directory
* Relative to the asset with the reference
* Absolute
* Relative to a directory that may be difficult to infer from the contents or location of the source asset

Source assets come in two forms, relative to how these references work:
* A format that the builder author can modify and control.
  * Example: A custom format defined for O3DE, like prefab files.
* A format that the builder author has no control over.
  * Example: A format defined outside of O3DE, like FBX files.

When authoring a builder, if the format of the source asset is something the author has control over, then it's useful to manage how the source asset references other files.
* When referencing a source asset or product asset, it's preferred to reference by UUID or Asset ID, because these will be more stable than a path. Read more about [asset identifiers here.](/docs/user-guide/assets/pipeline/asset-dependencies-and-identifiers/#asset-identifiers)

Resolving paths to find the file on disk is often done within the asset builder. When dealing with path references from the source asset to other files, keep these things in mind:
* The referenced asset may not be on the same drive as the asset with the reference. This includes scan directories, which can be on different drives. This means relative paths may not be resolvable.
* Some operating systems have case sensitive paths, some do not. When resolving paths in an asset builder, it's important to do so in a way that will be stable across operating systems.
* File locations relative to scan directories, and in the asset cache will be stable for all members of a team, but scan directories themselves, and files outside scan directories may not have the same paths for all team members.
* Path resolving logic should be consistent, and predictable. Content creators will want to understand how paths are resolved when processing assets, so they can better manage their content.

### References from product assets to other files

![Product asset references](/images/user-guide/assets/pipeline/asset_builders/product_asset_references.png)

Product assets should only have these references:
* Product assets by asset ID
  * This is the prefered way to reference other product assets, references by path should be avoided when possible
* Product assets by a relative path from the asset with the reference
* Product assets by a relative path, to a specific root in the asset cache, usually the cache root for the platform
* Non-product file in the project directory, expected at a specific location
  * This kind of reference is not common, but there are cases where it may be necessary to reference a file outside the asset folder that will be in the shipped final product.

While it's technically possible to reference files in other ways in product assets, it may end up causing problems later. The development version of a project, running the Editor or game launcher connected to the Asset Processor is what a team will be most used to interacting with. However, when preparing to deliver a project to end customers, with packaged and bundled content, the layout of the project and placement of assets will be different. References from product assets to other files that worked during development may not work in release builds of projects. For example, if a product asset references a source asset, that source asset likely won't be on the end user's machine in the packaged release build.

Product assets should never reference other product assets with absolute path because this will result in the hash of the contents of product assets being unique per machine that generates product assets. When authoring a builder, the complete lifecycle of asset management for a project should be kept in mind. Keeping product assets stable across machines will ensure that the gathering modified assets step of generating a patch for a live game is accurate. You can read more about [asset bundling here.](/docs/user-guide/packaging/asset-bundler/overview/)

### Load product assets in process job

If the processing of one job requires loading the output product asset of another job, then a job dependency should be declared against that job, and when possible the specific product should be defined in this dependency.

When setting up asset references, the source asset with the outgoing reference and the product asset it references maybe be on two different drive roots, so relative paths may not be possible between the source asset and the referenced product asset.

Read more about [job dependencies here.](/docs/user-guide/assets/pipeline/asset-dependencies-and-identifiers/#job-dependencies)

### Load product assets in create jobs

It's not recommended to load the product asset of one job during the create jobs step of another job. This is because there aren't straightforward workflows to accomplish this.

If possible, it's recommended that the information needed is instead loaded from the source asset of the other job instead of the product asset. Then, source dependencies can be used to make sure jobs run in the correct order.

If that isn't possible, then intermediate assets can provide a path to manage this processing order. To do this, the initial job should be updated to output an intermediate asset to be used as the source asset for the job to do the real work. The new job creating this intermediate asset should emit the product asset to be loaded in the middle job's create jobs function as a product specific job dependency.

Read more about [intermediate assets here.](/docs/user-guide/assets/pipeline/intermediate-assets/) Read more about [job dependencies here.](/docs/user-guide/assets/pipeline/asset-dependencies-and-identifiers/#job-dependencies)

If you have a need to load a product asset during the create jobs step of asset processing, its recommended you discuss your use case with the O3DE community. Please create [a ticket](https://github.com/o3de/o3de/issues) or reach out in the [O3DE Discord](https://{{< links/o3de-discord >}})

### Load other source assets or non-asset files

Sometimes processing a source asset, either the create jobs or process job steps, requires loading a second source asset or source file. In this situation, a source dependency should be used.

A source dependency is declared during the CreateJob step, and when the file in this dependency changes, the job will be re-run.

Read more about [source dependencies here.](/docs/user-guide/assets/pipeline/asset-dependencies-and-identifiers/#source-dependencies)
