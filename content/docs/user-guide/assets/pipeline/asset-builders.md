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

