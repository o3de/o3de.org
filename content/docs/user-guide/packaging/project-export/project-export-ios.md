---
linkTitle: Project Export iOS
title: Project Export for iOS
description: (Experimental) Learn how to use the Project Export CLI to create an Xcode project to build and deploy for iOS.
toc: true
weight: 450
---
This guide covers how to use project export tooling to build and deploy games on iOS. First, we will use the iOS export script to generate an Xcode project and prepare assets. Afterwards we will walk through how to ensure Xcode is properly setup to build an iOS app.

For this demonstration, we will use the O3DE Atom Sample Viewer project as our reference point for ensuring proper behavior. Results may vary for other projects.

{{< note >}}
To learn more about the project export tooling, please consult the page [Project Export CLI Tool.](/docs/user-guide/packaging/project-export/project-export-cli)
{{< /note >}}
{{< important >}}
The iOS export functionality is only available on macOS, which is currently experimental for O3DE.
{{< /important >}}

## Prerequisites
1. Make sure that the [Project Export CLI Tool page](/docs/user-guide/packaging/project-export/project-export-cli) prerequisites are satisfied. 
2. Git clone [O3DE Atom Sample Viewer project](https://github.com/o3de/o3de-atom-sampleviewer) onto your machine.
3. Register [O3DE Atom Sample Viewer project](https://github.com/o3de/o3de-atom-sampleviewer) with O3DE. You can register the project using:
```
<O3DE_ENGINE>/scripts/o3de.sh register -pp /path/to/o3de-atom-sampleviewer
```
4. Have a valid copy of Xcode installed on your machine, and a valid Apple Developer ID associated with that IDE. To set up such an ID, go to [developer.apple.com](https://developer.apple.com). To use your desired Apple ID, in Xcode go to `Xcode -> Settings`. In the Settings window, go to the Accounts tab and click the '+' icon at the bottom of the left panel to add your account. Select Apple ID to proceed, and follow on-screen instructions.
5. You will also need to ensure that Xcode has the standard SDKs installed for macOS and iOS, and that your preferred iOS test device is compatible with Xcode. If you are not sure, you can consult [this page on installing Simulator Runtimes](https://developer.apple.com/documentation/xcode/installing-additional-simulator-runtimes).

## Quickstart
### Running the Export Script
Assuming you are just following along using the O3DE Atom Sampleviewer project, this single invocation should be all you need to generate the necessary Xcode project file in the project's build folder:
```
export PROJECT_PATH=/path/to/project
$O3DE_ENGINE_PATH/scripts/o3de.sh export-project -es $O3DE_ENGINE_PATH/scripts/o3de/ExportScripts/export_source_ios_xcode.py -pp $PROJECT_PATH
```
{{< note >}}
Make sure the `$O3DE_ENGINE_PATH` variable is set to the absolute path to the location of the O3DE source and `$PROJECT_PATH` is set to the absolute path to the location of your project folder.
{{< /note >}}

Assuming the underlying CMake build system finds no issues with your engine or project installation, you should have the corresponding Xcode project file, which will be located at `$PROJECT_PATH/build/game_ios`. For the Atom SampleViewer, it should be called `AtomSampleViewer.xcodeproj`.

### Using Xcode
Double click the file `AtomSampleViewer.xcodeproj` to open it in Xcode. This should load everything needed to build the app on an iOS device.

Deploying to an iOS device requires code-signing. Make sure that you have a provisioning profile setup for code-signing.

Next, we'll open the project configuration details. Click on the `AtomSampleViewer` project icon in the Explorer tree-view (left hand side of the Xcode IDE). On the left column under "General", select the build configuration `AtomSampleViewer.GameLauncher`. The resulting configuration page should look like this:

{{< image-width "/images/user-guide/packaging/project-export-ios/atom-sampleviewer-configuration-page.png" "700">}}

Go to the "signing and capabilities" tab and setup the provisioning profile to link to your Apple ID. Customize the bundle identifier (add any string you want, for example: append the phrase 'test'). Enable "Automatically manage signing."

{{< image-width "/images/user-guide/packaging/project-export-ios/signing-and-capabilities-page.png" "700">}}

Click on the bar in the region labeled “AtomSampleViewer.GameLauncher” and scroll through the drop down to click “Edit Scheme.”

{{< image-width "/images/user-guide/packaging/project-export-ios/edit-scheme.png" "700">}}

Set the desired build configuration and set the relevant CLI parameters in the arguments section. An example configuration is shown below:

{{< image-width "/images/user-guide/packaging/project-export-ios/scheme-configuration-debug-build.png" "700">}}
{{< image-width "/images/user-guide/packaging/project-export-ios/scheme-configuration-cli-params.png" "700">}}

{{< note >}}
 For CLI paramter settings that you would like to persist over multiple exports, you can specify the commands to run on launch for a release build via code or by using the `autoexec.client.setreg`. You can find an example of this in [Set the starting level](/docs/user-guide/packaging/windows-release-builds/#set-the-starting-level).
{{< /note >}}

Make sure to connect your iOS device to the computer. Xcode should recognize your device, and it should be compatible with the project. If not, follow the Xcode error prompts to trouble shoot the issue and updating may be required. Once this is all correct, press the play button to build and deploy the project.

If the build and deployment successfully completes (assuming you used the sample configuration), you should get the following on your iOS device:

{{< image-width "/images/user-guide/packaging/project-export-ios/o3de-atom-sampleviewer-ios-device-result.png" "700">}}

## iOS Export Script
O3DE ships with an experimental [iOS Export Script](https://github.com/o3de/o3de/blob/9b90a24479e2b191d2125d34c1984b013b2cb13f/scripts/o3de/ExportScripts/export_source_ios_xcode.py), capable of generating an Xcode project file to handle standard use cases of O3DE projects on iOS. This script is only designed to run from an O3DE source installation on a macOS machine.

The export script has two primary sections: the function [`export_ios_xcode_project`](https://github.com/o3de/o3de/blob/9b90a24479e2b191d2125d34c1984b013b2cb13f/scripts/o3de/ExportScripts/export_source_ios_xcode.py#L16) and the [startup code that only runs if the script is invoked by the CLI](https://github.com/o3de/o3de/blob/9b90a24479e2b191d2125d34c1984b013b2cb13f/scripts/o3de/ExportScripts/export_source_ios_xcode.py#L73). In-depth discussion on these two sections will be made in the [Developer Guide](https://docs.o3de.org/docs/engine-dev/) in the future.


### Usage
To use the export script, you can issue the arguments at the same time that you are running the `export-project` command. The arguments specific to the script will be deferred until it begins running.

The arguments are as follows:
| Argument Name | Description | Required? |
| - | - | - |
| [`--script-help`](https://github.com/o3de/o3de/blob/9b90a24479e2b191d2125d34c1984b013b2cb13f/scripts/o3de/ExportScripts/export_source_ios_xcode.py#L89) | Display the help information specifically for the export script. | no |
| [`--build-tools`](https://github.com/o3de/o3de/blob/9b90a24479e2b191d2125d34c1984b013b2cb13f/scripts/o3de/ExportScripts/export_source_ios_xcode.py#L90) | Specifies whether to build O3DE toolchain executables. This will build AssetBundlerBatch and AssetProcessorBatch. If asset tools have not been built, then assets cannot be processed. | no |
| [`--tools-build-path`](https://github.com/o3de/o3de/blob/9b90a24479e2b191d2125d34c1984b013b2cb13f/scripts/o3de/ExportScripts/export_source_ios_xcode.py#L92) | Designates where the build files for the O3DE toolchain are generated. If not specified, default is `<o3de_project_path>/build/tools`. | no |
| [`--ios-build-path`](https://github.com/o3de/o3de/blob/9b90a24479e2b191d2125d34c1984b013b2cb13f/scripts/o3de/ExportScripts/export_source_ios_xcode.py#L94) | Designates where the Xcode project file for the project is generated. If not specified, default is `<o3de_project_path>/build/game_ios`. | no |
| [`--skip-asset-processing`](https://github.com/o3de/o3de/blob/9b90a24479e2b191d2125d34c1984b013b2cb13f/scripts/o3de/ExportScripts/export_source_ios_xcode.py#L96) | For iOS building and deployment, the export script assumes that assets should be processed and built. If this behavior is not desired, use this flag to disable it. | no |
| [`--quiet`](https://github.com/o3de/o3de/blob/9b90a24479e2b191d2125d34c1984b013b2cb13f/scripts/o3de/ExportScripts/export_source_ios_xcode.py#L98) | Suppresses logging information unless an error occurs. | no |

Here is an example usage of this script:
```
# On Mac
export IOS_OUTPUT_PATH=/path/to/ios/build/path
$O3DE_ENGINE_PATH/scripts/o3de.sh export-project --export-script $O3DE_ENGINE_PATH/scripts/o3de/ExportScripts/export_source_ios_xcode.py --project-path $PROJECT_PATH --ios-build-path $IOS_OUTPUT_PATH
```
`O3DE_ENGINE_PATH`, `O3DE_PROJECT_PATH` and `IOS_OUTPUT_PATH` are environment variables. The `O3DE_ENGINE_PATH` and `O3DE_PROJECT_PATH` variables point to the path locations for your o3de source engine and o3de project respectively. The `IOS_OUTPUT_PATH` variable corresponds to the folder path where you would like for the generated Xcode project file to appear.
