---
linkTitle: Project Export for iOS
title: Project Export for iOS
description: (Experimental) Learn how to use the Project Export CLI to automate preparing your project for release on iOS.
toc: true
weight: 420
---
This guide covers how to use project export tooling to build and deploy games on iOS. We will use the iOS export script to generate an Xcode project and prepare assets and then build the project. The end result of export should be an IPA file that can be installed on your iOS device.

{{< note >}}
To learn more about the project export tooling, please consult the page [Project Export CLI Tool.](/docs/user-guide/packaging/project-export/project-export-cli)
{{< /note >}}
{{< important >}}
The iOS export functionality is only available on macOS, which is currently experimental for O3DE.
{{< /important >}}

## Prerequisites
1. Make sure that the [Project Export CLI Tool page](/docs/user-guide/packaging/project-export/project-export-cli) prerequisites are satisfied.
2. Make sure you have your project created and registered with your engine.
3. Have a valid copy of Xcode installed on your machine, and a valid Apple Developer ID associated with that IDE. To set up such an ID, go to [developer.apple.com](https://developer.apple.com). To use your desired Apple ID, in Xcode go to `Xcode -> Settings`. In the Settings window, go to the Accounts tab and click the '+' icon at the bottom of the left panel to add your account. Select Apple ID to proceed, and follow on-screen instructions.
4. You will also need to ensure that Xcode has the standard SDKs installed for macOS and iOS, and that your preferred iOS test device is compatible with Xcode. If you are not sure, you can consult [this page on installing Simulator Runtimes](https://developer.apple.com/documentation/xcode/installing-additional-simulator-runtimes).
5. Make sure the o3de engine bootstrap registry is enabled for ios. To do so, go to your O3DE engine installation and edit the file at `$O3DE_ENGINE_PATH/Registry/bootstrap.setreg` so that the `assets` field uses `ios`. Like so:
```
"assets": "ios",
```
6. Edit the `$O3DE_ENGINE_PATH/Registry/AssetProcessorPlatformConfig.setreg` file at line 67 by uncommenting the line:
```
//"ios": "enabled", -> "ios": "enabled",
```
This will tell the asset processor to make sure ios assets are cached when building the project.
7. Make sure you have a proper provisioning profile setup for Xcode to use when code signing your app. Alternatively, use automatic signing to let Xcode handle it for you. You can learn more about how set it up [here.](https://developer.apple.com/help/account/manage-profiles/create-a-development-provisioning-profile). 

## Quickstart
### Running the Export Script
For building in release mode with bundled PAK files for your IPA, you can use the following export command:
```
export O3DE_ENGINE_PATH=/path/to/o3de
export PROJECT_PATH=/path/to/project
cd $PROJECT_PATH
$O3DE_ENGINE_PATH/scripts/o3de.sh export-project -es export_source_ios_xcode.py -pp . -ibp build/game-ios -ll INFO --config release
```

To use profile mode instead, change the `--config` parameter in the above snippet to use `profile` instead. Please note though that this will automatically set assets to LOOSE mode, and will not use PAK files for your final IPA.

That invocation should be all that is needed to create an IPA file for your project. To install the IPA on your phone for testing, you can do so manually via Xcode. Please check [this page for more details.](https://developer.apple.com/documentation/xcode/distributing-your-app-to-registered-devices#Install-the-app-on-user-devices)

As a result of the export process, the resulting Xcode project file was also generated. You can find it in `$PROJECT_PATH/build/game-ios`. For regular iterative development with frequent deployments to the iOS device, it is recommended you work with Xcode directly using this project file. See the [manual export page for more details.](manual-export-atom-sampleviewer-ios#using-xcode)

## iOS Export Script
O3DE ships with an [iOS Export Script](https://github.com/o3de/o3de/blob/bb3eafe30d8291f50b69924e5b7a432c8c6f53ca/scripts/o3de/ExportScripts/export_source_ios_xcode.py#L24), capable of generating an Xcode project file to handle standard use cases of O3DE projects on iOS. This script is only designed to run from an O3DE source installation on a macOS machine.

The export script has two primary sections: the function [`export_ios_xcode_project`](https://github.com/o3de/o3de/blob/bb3eafe30d8291f50b69924e5b7a432c8c6f53ca/scripts/o3de/ExportScripts/export_source_ios_xcode.py#L24) and the [startup code that only runs if the script is invoked by the CLI](https://github.com/o3de/o3de/blob/bb3eafe30d8291f50b69924e5b7a432c8c6f53ca/scripts/o3de/ExportScripts/export_source_ios_xcode.py#L200). In-depth discussion on these two sections will be made in the [Developer Guide](https://docs.o3de.org/docs/engine-dev/) in the future.

### Usage
To use the export script, you can issue the arguments at the same time that you are running the `export-project` command. The arguments specific to the script will be deferred until it begins running.

The arguments are as follows:
| Argument Name | Description | Required? |
| - | - | - |
| [`--script-help`](https://github.com/o3de/o3de/blob/9b90a24479e2b191d2125d34c1984b013b2cb13f/scripts/o3de/ExportScripts/export_source_ios_xcode.py#L89) | Display the help information specifically for the export script. | no |
| [`--config`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L243) | Defines the CMake build configuration when building the project's binaries, such as GameLauncher. Options are either `profile` or `release`. | no |
| [`--tool-config`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L249) | The CMake build configuration to use when building tool binaries. Options are either `profile` or `release`. | no |
| [`--build-assets`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L262-L267) | Override the default behavior to include processing all assets and run the asset bundler for the project. This option is available when the export-project-configure defaults for `option.build.assets` is `False`. | no |
| [`--skip-build-assets`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L262-L267) | Override the default behavior to skip reprocessing and rebundling of all assets for the project. This option is available when the export-project-configure defaults for `option.build.assets` is `True`. | no |
| [`--fail-on-asset-errors`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L270-L275) | Override the default behavior to fail the export process on any errors that occur during asset processing.  This option is available when the export-project-configure defaults for `option.fail.on.asset.errors` is `False`. | no |
| [`--continue-on-asset-errors`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L270-L275) |  Override the default behavior to ignore any errors that occur during asset processing and continue with the project export.  This option is available when the export-project-configure defaults for `option.fail.on.asset.errors` is `True`. | no |
| [`--seedlist`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L277-L282) | Path to a seedlist file for asset bundling. You can specify this multiple times for multiple seed lists. This parameter also allows for wildcard matching for paths. | no |
| [`--seedfile`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L284-L289) | Path to a seed file for asset bundling. Example seed files are levels or prefabs. You can specify this multiple times for multiple seed files. This parameter also allows for wildcard matching for paths. | no |
| [`--level-name`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L291-L296) | The name of the level you want to export. This will look in `<o3de_project_path>/Cache/levels` to fetch the right level prefab. Specify multiple times for each level in your game. This is not necessary if the level is already defined inside of a seed list. | no |
| [`--build-tools`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L319-L326) | Builds the O3DE toolchain executables if the engine is not an SDK. This will build AssetBundlerBatch, AssetProcessorBatch. This option is available when the export-project-configure defaults for `option.build.tools` is `False`. | no |
| [`--skip-build-tools`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L319-L326) | Skips building the O3DE toolchain executables if the engine. This may be useful if you already have the tools available. This option is available when the export-project-configure defaults for `option.build.tools` if `True`.| no |
| [`--tools-build-path`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L330) | Designates where the build files for the O3DE toolchain are generated. If not specified, default is `<o3de_project_path>/build/tools`.  | no |
| [`--max-bundle-size`](https://github.com/o3de/o3de/blob/f0c150d75722b3302753972b28d73a8036b70b31/scripts/o3de/ExportScripts/export_source_built_project.py#L349) | Specify the maximum size of a given asset bundle.  | no |
| [`--ios-build-path`](https://github.com/o3de/o3de/blob/9b90a24479e2b191d2125d34c1984b013b2cb13f/scripts/o3de/ExportScripts/export_source_ios_xcode.py#L94) | Designates where the Xcode project file for the project is generated. If not specified, default is `<o3de_project_path>/build/game_ios`. | no |
| [`--quiet`](https://github.com/o3de/o3de/blob/9b90a24479e2b191d2125d34c1984b013b2cb13f/scripts/o3de/ExportScripts/export_source_ios_xcode.py#L98) | Suppresses logging information unless an error occurs. | no |

Here is an example usage of this script:
```
# On Mac
export IOS_OUTPUT_PATH=/path/to/ios/build/path
$O3DE_ENGINE_PATH/scripts/o3de.sh export-project --export-script $O3DE_ENGINE_PATH/scripts/o3de/ExportScripts/export_source_ios_xcode.py --project-path $PROJECT_PATH --ios-build-path $IOS_OUTPUT_PATH
```
`O3DE_ENGINE_PATH`, `O3DE_PROJECT_PATH` and `IOS_OUTPUT_PATH` are environment variables. The `O3DE_ENGINE_PATH` and `O3DE_PROJECT_PATH` variables point to the path locations for your o3de source engine and o3de project respectively. The `IOS_OUTPUT_PATH` variable corresponds to the folder path where you would like for the generated Xcode project file to appear.