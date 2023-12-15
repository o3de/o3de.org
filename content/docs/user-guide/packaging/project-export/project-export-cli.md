---
linkTitle: Project Export CLI
title: Project Export CLI Tool
description: Learn how to use the Project Export CLI to automate preparing your project for release.
toc: true
weight: 400
---
The export-project CLI command is used to automatically package game code and assets for a release.

{{< note >}}
If you wish to learn how to prepare projects manually for Windows, please consult the page [Creating a Project Game Release Layout for Windows.](/docs/user-guide/packaging/windows-release-builds)
{{< /note >}}

## Prerequisites
To make best use of the `export-project` command, it is recommended to have a project with at least one starting scene, and all necessary seedlist files prepared. AssetProcessor Registry file settings may need to be tweaked. To learn how to set this up, please consult the following page: [Creating a Project Game Release Layout for Windows, section: Set the Starting Level](../windows-release-builds/#set-the-starting-level).

To learn more about the AssetBundler and Seed Files, please visit the [overview page on the AssetBundler tool](https://docs.o3de.org/docs/user-guide/packaging/asset-bundler/overview/).

{{< important >}}
Before using *any* of the Project Export functionality for your project, make sure that you have built the project from the Project Manager, opened the project from the O3DE Editor and have allowed the Asset Processor to fully process the assets of your project at least once.
{{< /important >}}

## Getting Started

### Quick Project Export
For any project that you want to quickly export, you can do this by running the `export.bat` script (or running the `export.sh` script on Linux) in the root of your project folder.

New projects created from either the `DefaultProject` or `MinimalProject` templates will contain project export helper scripts that simplifies the process to export these projects. These scripts provide a simple base-line for the arguments and settings that are usually needed to export projects when using the O3DE `export-project` command line tool.

Run it from the command line:

{{< tabs name="Export Script" >}}


{{% tab name="Windows" %}}
Assuming `%PROJECT_HOME%` is set to the root of the newly created project.
```cmd
%PROJECT_HOME%/export.bat
```
{{% /tab %}}

{{% tab name="Linux" %}}
Assuming `$PROJECT_HOME` is set to the root of the newly created project.
```shell
$PROJECT_HOME/export.sh
```
{{% /tab %}}

{{< /tabs >}}

{{< note >}}
By default, the exporter packages assets required to run Levels/DefaultLevel. If your project uses more levels, sound banks, or assets custom loaded via code, you'll need to [add the asset to a seed file](https://docs.o3de.org/docs/user-guide/packaging/asset-bundler/bundle-assets-for-release/). The exporter looks for any .seed file living in the AssetBundling/SeedLists directory. Check the .command_settings file in the project root directory, and look at the `seedlist.paths` field in the `export_project` section.
{{< /note >}}

{{< note >}}
Be sure your project is registered with the engine.
{{< /note >}}

{{< note >}}
`export.bat` will only cover the most basic use cases for getting started. For more info on the export-command in general, keep reading below.
{{< /note >}}

### Export Project Command
To use the `export-project` command correctly, it is important to first understand how it works at a high level.

The command operates in 2 stages:
1. Script Loading
2. Script Running

### Script Loading
Before the export process can begin, the export-project command does the following pre-processing steps:
* Parse and validate initial set of arguments, and filters arguments to be processed by desired export script
* Load the export script as a python module
* Validate the expected project path
* Modify the system path with O3DE CLI Python API so that user scripts can easily import API code and modules
* Prepares the O3DE script context, which contains useful values like project path, engine path, project name, CMake args, etc.
* Runs the export script with the prepared context injected

### Script Running
The `export-project` command can run any python script that the user designates as the export script. As a result, the exact behavior entirely depends on the supplied script. O3DE includes a standard script, which is described [further below.](#standard-export-script)

Any script run by the command has access to the running context of the exporter, along with common APIs.

## Export CLI Command
The `export-project` command is accessed via the O3DE CLI that is shipped with the engine. This is found in `<engine>/scripts/o3de.bat`, or on Unix systems as `<engine>/scripts/o3de.sh`. The command has the following arguments:

| Argument Name | Description | Required? |
| - | - | - |
| `--export-script` | Choose an external python script to run. The path can be relative or absolute. | yes |
| `--project-path` | Project to export. The path can be relative or absolute. If not supplied, it will be inferred by the export script location. | no |
| `--log-level` | Sets the verbosity of the logs emitted from the exporter. INFO means all information will be emitted. ERROR means it will  be silent unless a failure occurs. Choices are `[DEBUG, INFO, WARNING, ERROR, CRITICAL]`, with `ERROR` as the default. | no |

You can inspect the code for parsing arguments [here.](https://github.com/o3de/o3de/blob/753480ec930e55f3431f92ed7b974ba7f9e73a13/scripts/o3de/o3de/export_project.py#L354)

An example invocation may look like this:
```cmd
<engine-folder>\scripts\o3de.bat export-project --export-script C:\..\path\to\export-script --project-path C:\..\path\to\project-folder --log-level INFO
```

or in condensed form:
```cmd
<engine-folder>\scripts\o3de.bat export-project -es C:\..\path\to\export-script -pp C:\..\path\to\project-folder -ll INFO
```

## Standard Export Script
O3DE now ships with a [standard project export script](https://github.com/o3de/o3de/blob/753480ec930e55f3431f92ed7b974ba7f9e73a13/scripts/o3de/ExportScripts/export_source_built_project.py), capable of automating most typical use cases of projects. The code and API are provided so that users with more particular needs can investigate, expand or modify the code as necessary. Currently this script only supports Windows and Linux platforms, and does not handle deployment to external services.

The export script has 2 primary sections: the function [`export_standalone_project`](https://github.com/o3de/o3de/blob/753480ec930e55f3431f92ed7b974ba7f9e73a13/scripts/o3de/ExportScripts/export_source_built_project.py#L19) and the [startup code that only runs if the script is invoked by the CLI](https://github.com/o3de/o3de/blob/753480ec930e55f3431f92ed7b974ba7f9e73a13/scripts/o3de/ExportScripts/export_source_built_project.py#L187). In depth discussion on these two sections will be made in the [Developer Guide](https://docs.o3de.org/docs/engine-dev/) in the future.


### Usage
To use the export script, first ensure you have the necessary seedlist files for your project (as mentioned in the pre-requisites).

You can issue the arguments for this script at the same time that you are running the `export-project` command, so long as you are using the script as your designated export script. The arguments specific to the script will be deferred until the script begins running.

Please note that these arguments are defined in tandem with the [Project Export Configuration](#export-script-configurations) system, which chooses which parameters are exposed to the user in the CLI based on project defaults.

The arguments are as follows:
| Argument Name | Description | Required? |
| - | - | - |
| [`--script-help`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L238) | Display the help information specifically for the export script. | no |
| [`--output-path`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L239) | Defines the location on the system where the release layout directory for the project should be located. For each desired launcher, a separate sub folder will be prepared under the release layout folder. | yes |
| [`--config`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L243) | Defines the CMake build configuration when building the project's binaries, such as GameLauncher. Options are either `profile` or `release`. | no |
| [`--tool-config`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L249) | The CMake build configuration to use when building tool binaries. Options are either `profile` or `release`. | no |
| [`--archive-output`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L255) | Specify the format to use to archive the package. Options are | `none`, `zip`, `gzip`, `bz2`, and `xz`. |
| [`--build-assets`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L262-L267) | Override the default behavior to include processing all assets and run the asset bundler for the project. This option is available when the export-project-configure defaults for `option.build.assets` is `False`. | no |
| [`--skip-build-assets`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L262-L267) | Override the default behavior to skip reprocessing and rebundling of all assets for the project. This option is available when the export-project-configure defaults for `option.build.assets` is `True`. | no |
| [`--fail-on-asset-errors`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L270-L275) | Override the default behavior to fail the export process on any errors that occur during asset processing.  This option is available when the export-project-configure defaults for `option.fail.on.asset.errors` is `False`. | no |
| [`--continue-on-asset-errors`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L270-L275) |  Override the default behavior to ignore any errors that occur during asset processing and continue with the project export.  This option is available when the export-project-configure defaults for `option.fail.on.asset.errors` is `True`. | no |
| [`--seedlist`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L277-L282) | Path to a seedlist file for asset bundling. You can specify this multiple times for multiple seed lists. This parameter also allows for wildcard matching for paths. | no |
| [`--seedfile`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L284-L289) | Path to a seed file for asset bundling. Example seed files are levels or prefabs. You can specify this multiple times for multiple seed files. This parameter also allows for wildcard matching for paths. | no |
| [`--level-name`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L291-L296) | The name of the level you want to export. This will look in `<o3de_project_path>/Cache/levels` to fetch the right level prefab. Specify multiple times for each level in your game. This is not necessary if the level is already defined inside of a seed list. | no |
| [`--project-file-pattern-to-copy`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L312-L317) | File patterns to locate additional files to include in the exported projects. File patterns will be relative to the project path. Use this for any file not traditionally associated with O3DE projects, such as custom config files, metadata, or license files. | no |
| [`--game-project-file-pattern-to-copy`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L298-L303) | Like `--project-file-pattern-to-copy`, but for files exclusive to Game Launchers.  | no |
| [`--server-project-file-pattern-to-copy`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L305-L310) | Like `--project-file-pattern-to-copy`, but for files exclusive to Server Launchers.  | no |
| [`--build-tools`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L319-L326) | Builds the O3DE toolchain executables if the engine is not an SDK. This will build AssetBundlerBatch, AssetProcessorBatch. This option is available when the export-project-configure defaults for `option.build.tools` is `False`. | no |
| [`--skip-build-tools`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L319-L326) | Skips building the O3DE toolchain executables if the engine. This may be useful if you already have the tools available. This option is available when the export-project-configure defaults for `option.build.tools` if `True`.| no |
| [`--tools-build-path`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L330) | Designates where the build files for the O3DE toolchain are generated. If not specified, default is `<o3de_project_path>/build/tools`.  | no |
| [`--launcher-build-path`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L334) | Designates where the launcher build files (Game/Server/Unified) are generated. If not specified, default is `<o3de_project_path>/build/launcher`.  | no |
| [`--allow-registry-overrides`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L337-L342) | When configuring cmake builds, this option allows the script to override registry settings from external sources. These overrides are used when building the game binaries, specifically for enabling the CMake build flag `DALLOW_SETTINGS_REGISTRY_DEVELOPMENT_OVERRIDES`. For more information, consult the [Settings Registry overview](https://www.docs.o3de.org/docs/user-guide/settings/developer-documentation/). This option is available when export-project-configure defaults for `option.allow.registry.overrides` is `False`. | no |
| [`--disallow-registry-overrides`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L337-L342) | This disallows for overriding registry settings from external sources.  This option is available when export-project-configure defaults for `option.allow.registry.overrides` is `True`. | no |
| [`--asset-bundling-path`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L345) | Designates where the artifacts from the asset bundling process will be written to before creation of the package. If not specified, default is `<o3de_project_path>/build/asset_bundling`.  | no |
| [`--max-bundle-size`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L349) | Specify the maximum size of a given asset bundle.  | no |
| [`--game-launcher`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L352-L357) | Option to build and package the game launcher. This option is available when the export-project-configure defaults for `option.build.game.launcher` is `False`. | no |
| [`--no-game-launcher`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L352-L357) | This prevents building the Game Launcher. This option is available when export-project-configure defaults for `option.build.game.launcher` is `True`. | no |
| [`--server-launcher`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L359-L364) | Option to build and package the server launcher. This option is available when the export-project-configure default for `option.build.server.launcher` is `False`. | no |
| [`--no-server-launcher`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L359-L364) | This prevents building the Server Launcher on a platform. This option is available when export-project-configure defaults for `option.build.server.launcher` is `True`. | no |
| [`--unified-launcher`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L367-L372) | Option to build and package the unified launcher. This option is available when export-project-configure defaults for `option.build.unified.launcher` is `False`. | no |
| [`--no-unified-launcher`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L367-L372) | This prevents building the Unified Launcher. This option is available when  export-project-configure defaults for `option.build.unified.launcher` is `True`. | no |
| [`--platform`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L389) | The expected target platform that assets will be processed and built for. If not specified, the user's host platform will be used. | no |
| [`--engine-centric`](https://github.com/o3de/o3de/blob/753480ec930e55f3431f92ed7b974ba7f9e73a13/scripts/o3de/ExportScripts/export_source_built_project.py#L238) | Uses the engine-centric work flow to export the project. This option is available when export-project-configure defaults for `option.engine.centric` is `False`. | no |
| [`--project-centric`](https://github.com/o3de/o3de/blob/753480ec930e55f3431f92ed7b974ba7f9e73a13/scripts/o3de/ExportScripts/export_source_built_project.py#L238) | Uses the project-centric work flow to export the project. This option is available when export-project-configure defaults for `option.engine.centric` is `True`. | no |
| [`--monolithic`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L381-L386) | Uses the monolithic builds when exporting the project. This option is available when export-project-configure defaults for `option.build.monolithic` is `False`. | no |
| [`--non-monolithic`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L381-L386) | Does not use monolithic builds when exporting the project. This option is available when export-project-configure defaults for `option.build.monolithic` is `True`. | no |
| [`--quiet`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L391) | Suppresses logging information unless an error occurs. | no |


An example usage of the entire `export-project` command, including this script, can be seen for the O3DE MultiplayerSample project, with the following example for windows:

```
# On Windows
%O3DE_ENGINE_PATH%\scripts\o3de.bat export-project \
    --export-script %O3DE_ENGINE_PATH%\scripts\o3de\ExportScripts\export_source_built_project.py \
    --project-path %O3DE_PROJECT_PATH% -out %OUTPUT_PATH% \
    --config release \
    --archive-output zip -nounified \
    --game-project-file-pattern-to-copy launch_client.cfg \
    --server-project-file-pattern-to-copy launch_client.cfg \
    --should-build-assets \
    --log-level INFO \
    --seedlist \path\to\o3de-multiplayersample\AssetBundling\SeedLists\BasePopcornFxSeedList.seed \
    --seedlist %O3DE_PROJECT_PATH%\AssetBundling\SeedLists\GameSeedList.seed \
    --seedlist %O3DE_PROJECT_PATH%\AssetBundling\SeedLists\VFXSeedList.seed 
```
Where `O3DE_ENGINE_PATH`, `O3DE_PROJECT_PATH` and `OUTPUT_PATH` are environment variables. This single invocation should be all that is needed to fully export MultiplayerSample into a release directory ready for distribution.

For more information on how to export the MultiplayerSample project using the CLI, please see [these instructions](https://github.com/o3de/o3de-multiplayersample/blob/f00b3035285b695b2dbd1b1e59912973f4e1a32f/Documentation/O3DEMPSProjectExportTesting.md).

## Export Script Configurations

The standard export script provides functionality for managing your export configurations. Configuration is set either globally (for all projects), or on a per-project basis. See the help section of the `export-project-configure` command for more details:
```cmd
<O3DE_ENGINE_PATH>\scripts\o3de.bat export-project-configure -h
```

You can see the current list of configured settings using:
```cmd
<O3DE_ENGINE_PATH>\scripts\o3de.bat export-project-configure -l
```

To see the configured values globally across O3DE
```
<O3DE_ENGINE_PATH>\scripts\o3de.bat export-project-configure --global -l
```
To see the configured values for a specific project (using the Project name registered with O3DE)
```
<O3DE_ENGINE_PATH>\scripts\o3de.bat export-project-configure -p ProjectName -l
```

When the `-l` option is used, you will get output like this:
```
O3DE Project Export settings:

  project.build.config = profile
  tool.build.config = profile
  archive.output.format = none
  option.build.assets = False
  option.fail.on.asset.errors = False
  option.build.tools = False
  default.build.tools.path = build/tools
  default.launcher.build.path = build/launcher
  default.android.build.path = build/game_android
  default.ios.build.path = build/game_ios
  option.allow.registry.overrides = False
  asset.bundling.path = build/asset_bundling
  max.size = 2048
  option.build.game.launcher = True
  option.build.server.launcher = True
  option.build.headless.server.launcher = False
  option.build.unified.launcher = True
  option.engine.centric = False
  option.build.monolithic = False
```

To update configuration values globally:
```cmd
<O3DE_ENGINE_PATH>\scripts\o3de.bat export-project-configure --global --set-value project.build.config=release
```
To update by project:
```
<O3DE_ENGINE_PATH>\scripts\o3de.bat export-project-configure -p ProjectName --set-value option.build.assets=True
```

## Custom Scripts

You can study the standard export script to understand how the `export-project` API works, but this section will help provide a high level overview of what's available.

### O3DE Context and Logger
All export scripts are automatically injected with 2 global variables when the `export-project` command is run: `o3de_context`, and `o3de_logger`.

`o3de_context` is an instance of the [export_project.O3DEScriptExportContext](https://github.com/o3de/o3de/blob/753480ec930e55f3431f92ed7b974ba7f9e73a13/scripts/o3de/o3de/export_project.py#L104) class. This context object is used to store parameter values and variables throughout the lifetime of an export script's execution. It also stores convenient properties such as the export script's path, project path, engine path, unprocessed arguments, cmake specific arguments, and the project name from the project.json file.

For any APIs of `export-project` that expect a parameter of type `O3DEScriptExportContext`, you can pass in the `o3de_context` of your running export script.


`o3de_logger` is an instance of the `logging.Logger` class from the Python standard library, which can be used to track and emit logs over the course of the script's lifetime.

### API
For users wishing to create custom export scripts, the `export-project` command exposes the following APIs (please click the links in the function name to view details on parameters):

| Function Name | Description |
| - | - | 
| [get_default_asset_platform](https://github.com/o3de/o3de/blob/753480ec930e55f3431f92ed7b974ba7f9e73a13/scripts/o3de/o3de/export_project.py#L192) | Fetches the user's host platform based on O3DE convention. |
| [process_command](https://github.com/o3de/o3de/blob/753480ec930e55f3431f92ed7b974ba7f9e73a13/scripts/o3de/o3de/export_project.py#L198) | Allows the user to run terminal commands as a subprocess, either by supplying the full command as a string, or as a string list. |
| [execute_python_script](https://github.com/o3de/o3de/blob/753480ec930e55f3431f92ed7b974ba7f9e73a13/scripts/o3de/o3de/export_project.py#L214) | Execute a new python script, using new or existing O3DEScriptExportContexts to streamline communication between multiple scripts. |
| [get_asset_processor_batch_path](https://github.com/o3de/o3de/blob/753480ec930e55f3431f92ed7b974ba7f9e73a13/scripts/o3de/o3de/export_project.py#L371) | Get the expected path to the asset processor tool. |
| [get_asset_bundler_batch_path](https://github.com/o3de/o3de/blob/753480ec930e55f3431f92ed7b974ba7f9e73a13/scripts/o3de/o3de/export_project.py#L386) | Get the expected path to the asset bundler tool. |
| [build_assets](https://github.com/o3de/o3de/blob/753480ec930e55f3431f92ed7b974ba7f9e73a13/scripts/o3de/o3de/export_project.py#L402) | Build the assets for the project. |
| [build_export_toolchain](https://github.com/o3de/o3de/blob/753480ec930e55f3431f92ed7b974ba7f9e73a13/scripts/o3de/o3de/export_project.py#L439) | Build (or rebuild) the export tool chain (AssetProcessorBatch and AssetBundlerBatch). |
| [validate_export_toolchain](https://github.com/o3de/o3de/blob/753480ec930e55f3431f92ed7b974ba7f9e73a13/scripts/o3de/o3de/export_project.py#L497) | Validate that the required command line tools are available for the export process. |
| [build_game_targets](https://github.com/o3de/o3de/blob/753480ec930e55f3431f92ed7b974ba7f9e73a13/scripts/o3de/o3de/export_project.py#L512) | Build the launchers for the project (game, server, unified, headless). |
| [bundle_assets](https://github.com/o3de/o3de/blob/753480ec930e55f3431f92ed7b974ba7f9e73a13/scripts/o3de/o3de/export_project.py#L598) | Execute the 'bundle assets' phase of the export. |
| [setup_launcher_layout_directory](https://github.com/o3de/o3de/blob/753480ec930e55f3431f92ed7b974ba7f9e73a13/scripts/o3de/o3de/export_project.py#L699) | Setup the launcher layout directory for a path. |
| [validate_project_artifact_paths](https://github.com/o3de/o3de/blob/753480ec930e55f3431f92ed7b974ba7f9e73a13/scripts/o3de/o3de/export_project.py#L759) | Validate and adjust project artifact paths as necessary. If paths are provide as relative, then check it against the project path for existence. |

For the full list of defined APIs, please consult the [export_project.py script in source](https://github.com/o3de/o3de/blob/point-release/23101/scripts/o3de/o3de/export_project.py).

### Example Custom Scripts

To demonstrate the basic functionality of the API, we will look at an example script using 2 functions: `execute_python_script` and `process_command`, which are the building blocks for the rest of the functionality.

#### test_export.py
Here is an example test export script:
```python
#test_export.py
import os
import o3de.export_project as exp

from o3de.export_project import process_command, execute_python_script


o3de_context.message1 = "This is a message!"
o3de_context.message2 = "___"
o3de_context.hi_there = "hi there!"
o3de_context.hi_there_2 = 22


process_command(["cmake", "--version"])


execute_python_script("C:\\Users\\O3DE_User\\Desktop\\hello.py", o3de_context)

o3de_logger.info(f"Now running the export code {o3de_context.project_path}")
o3de_logger.info(f"Engine path: {o3de_context.engine_path}")

o3de_logger.info(o3de_context.hello_back)

o3de_logger.info(o3de_context.message2)
```

First thing to notice is that at the top, users can import existing O3DE Python modules such as `export_project`, `manifest`, `utils`, `validation`, etc., just like they normally import other python modules in the standard library. All such modules can be found [here on Github](https://github.com/o3de/o3de/tree/development/scripts/o3de/o3de). This is because the `export-project` tool handles system paths behind the scenes to make the O3DE CLI folder and the export script's folder accessible from the import system.

The next thing to notice is that `o3de_context` is available as a global context. Along with the standard properties, users can add their own custom values to retain over the lifetime of the script.

With `process_command`, users can run any terminal command that they wish. This makes it very easy to convert manual processes into a usable script  (and most of the time, you can use `process_command` alone if you so desire). All you would need is to ensure that the process has an equivalent command to run on the terminal. 

The function `export_python_script` does something special here. It's able to run another python script anywhere on the machine, while supplying it the same `o3de_context` the current export script is using. This can allow for very modular scripting abilities. Let us take a closer look at `hello.py` to see what it does.

#### hello.py
```python
#hello.py
import o3de.export_project as exp


i = 0

while i < 10:
    print(f"hi {i}:: {o3de_context.hi_there_2}")
    i+=1

o3de_logger.info(o3de_context.hi_there)
o3de_logger.info(o3de_context.message1)
o3de_logger.info(o3de_context.project_path)


o3de_context.hello_back = "Hello to you too!"

o3de_context.message2 = "hiya!"
```

`hello.py` readily takes on the context of the original export script, and is even able to access previously defined variables, such as `hi_there_2`, `hi_there`, `message1`, and `message2`.

Not only can it read them, but it can also overwrite an existing variable, such as with `message2`, changing it from `'____'` to `'hiya!'`, or even introduce new variables like `hello_back`, which upon completion of `hello.py` will be visible to the `test_export.py` script.

#### The Results
If you were to run the `test_export.py` script on Windows, this is what the logs would show:
```
<engine-path>\scripts\o3de.bat export-project -es C:\workspace\projects\NewspaperDeliveryGame\export_rules\test_export.py -ll INFO

[INFO] root: Begin loading script 'C:\workspace\projects\NewspaperDeliveryGame\export_rules\test_export.py'...
[INFO] root: Running process 'cmake' with PID(28996): ['cmake', '--version']
[INFO] root: cmake version 3.24.1

[INFO] root:

[INFO] root: CMake suite maintained and supported by Kitware (kitware.com/cmake).

[INFO] root:
[INFO] root: Terminating process 'cmake' with PID(28996)
[INFO] root: process 'cmake' with PID(28996) terminated with exit code 0
[INFO] root: Begin loading script 'C:\Users\O3DE_User\Desktop\hello.py'...
hi 0:: 22
hi 1:: 22
hi 2:: 22
hi 3:: 22
hi 4:: 22
hi 5:: 22
hi 6:: 22
hi 7:: 22
hi 8:: 22
hi 9:: 22
[INFO] root: hi there!
[INFO] root: This is a message!
[INFO] root: C:\workspace\projects\NewspaperDeliveryGame
[INFO] root: Now running the export code C:\workspace\projects\NewspaperDeliveryGame
[INFO] root: Engine path: C:\workspace\o3de
[INFO] root: Hello to you too!
[INFO] root: hiya!
[INFO] o3de: Success!
```

This example is based on the [original PR for the Project Export tool](https://github.com/o3de/o3de/pull/15463).