---
linkTitle: Project Export iOS
title: Project Export for iOS
description: (Experimental) Learn how to use the Project Export CLI to create an Xcode project to build and deploy for iOS.
toc: true
weight: 450
---
In this article, we will go over the process to use project export tooling as part of the process to building and deploying games to the iOS platform. First, we will use the iOS export script to generate the necessary Xcode project file and prepare assets. Afterwards we will walk through how to ensure Xcode is setup properly to build an app for iOS.

For this demonstration, we will use the O3DE Atom Sample Viewer project as our reference point for ensuring proper behavior. Results may vary for other projects.

{{< note >}}
To learn more about the project export tooling, please consult the page [Project Export CLI Tool.](project-export-cli)
{{< /note >}}
{{< important >}}
The iOS export functionality is only available on macOS, which is currently experimental for O3DE.
{{< /important >}}

## Prerequisites
First, make sure to follow the pre-requisites of the [Project Export CLI Tool page.](project-export-cli) Afterwards, ensure that the [O3DE Atom Sample Viewer project](https://github.com/o3de/o3de-atom-sampleviewer) is cloned onto your machine, and is properly registered with your copy of O3DE. You can register the project using:
```
<O3DE_ENGINE>\scripts\o3de register -pp C:\path\to\o3de-atom-sampleviewer
```

You must also have a valid copy of Xcode installed on your machine, and a valid Apple Developer ID associated with that IDE. To set up such an ID, go to [developer.apple.com](https://developer.apple.com).

To use your desired Apple ID, in Xcode go to `Xcode -> Settings`. In the Settings window, go to the Accounts tab and click the '+' icon at the bottom of the left panel to add your account. Select Apple ID to proceed, and follow on-screen instructions.

You will also need to ensure that Xcode has the necessary SDKs installed for macOS and iOS, and that your preferred iOS test device is compatible with Xcode.

## Quickstart
### Running the Export Script
Assuming you are just following along using the O3DE Atom Sampleviewer project, this single invocation should be all you need to generate the necessary Xcode project file in the project's build folder:
```
<O3DE_ENGINE>\scripts\o3de export-project -es <O3DE_ENGINE>\scripts\o3de\ExportScripts\export_source_ios_xcode.py -pp C:\path\to\o3de-atom-sampleviewer
```
Assuming the underlying CMake build system finds no issues with your engine or project installation, you should have the corresponding Xcode project file, which will be located at `<PROJECT>\build\game_ios`. For the Atom SampleViewer, it should be called `AtomSampleViewer.xcodeproj`.

### Using Xcode
First double click the file `AtomSampleViewer.xcodeproj` to open it in Xcode. This should load everything needed to build the app on an iOS device.

First, make sure that you have the provisioning profile setup correctly. This will handle all code-signing of the application when deploying to your iOS device (this applies even to test builds).

First click on the AtomSampleViewer project icon on the Explorer tree-view panel on the left hand side of the Xcode IDE to show the project configuration details. Then on the left column under the general tab, make sure to select the build configuration `AtomSampleViewer.GameLauncher`. The resulting configuration page should look like this:

{{< image-width "/images/user-guide/packaging/project-export-ios/atom-sampleviewer-configuration-page.png" "700">}}

Then go to the signing and capabilities tab, and setup the provisioning profile to link to your AppleID, slightly customize the bundle identifier (add any string you want, for example: 'test'), and check "Automatically manage signing."

{{< image-width "/images/user-guide/packaging/project-export-ios/signing-and-capabilities-page.png" "700">}}

Now click on the bar in the region labeled “AtomSampleViewer.GameLauncher”, and scroll through the drop down to click “Edit Scheme.”

{{< image-width "/images/user-guide/packaging/project-export-ios/edit-scheme.png" "700">}}

Set the desired build configuration, and in the arguments section, set the relevant CLI parameters. An example configuration is shown below:

{{< image-width "/images/user-guide/packaging/project-export-ios/scheme-configuration-debug-build.png" "700">}}
{{< image-width "/images/user-guide/packaging/project-export-ios/scheme-configuration-cli-params.png" "700">}}

Now make sure to connect your iOS device to the computer. Xcode should recognize your device, and it should be compatible with the project. If not, follow the XCode error prompts to trouble shoot the issue. Updating may be required. Once this is all correct, press the play button to build the project. This can take some time.

Once everything is done, assuming you used the sample configuration, you should get the following on your iOS device:

{{< image-width "/images/user-guide/packaging/project-export-ios/o3de-atom-sampleviewer-ios-device-result.png" "700">}}

## iOS Export Script
O3DE ships with an experimental [iOS Export Script](https://github.com/o3de/o3de/blob/9b90a24479e2b191d2125d34c1984b013b2cb13f/scripts/o3de/ExportScripts/export_source_ios_xcode.py), capable of generating an Xcode project file to handle standard use cases of O3DE projects on iOS. This script is only designed to run from an O3DE source installation on a macOS machine.

The export script has 2 primary sections: the function [`export_ios_xcode_project`](https://github.com/o3de/o3de/blob/9b90a24479e2b191d2125d34c1984b013b2cb13f/scripts/o3de/ExportScripts/export_source_ios_xcode.py#L16) and the [startup code that only runs if the script is invoked by the CLI](https://github.com/o3de/o3de/blob/9b90a24479e2b191d2125d34c1984b013b2cb13f/scripts/o3de/ExportScripts/export_source_ios_xcode.py#L73). In depth discussion on these two sections will be made in the [Developer Guide](https://docs.o3de.org/docs/engine-dev/) in the future.


### Usage
To use the export script, you can issue the arguments for this script at the same time that you are running the `export-project` command, so long as you are using this script as your designated export script. The arguments specific to the script will be deferred until the script begins running.

The arguments are as follows:
| Argument Name | Description | Required? |
| - | - | - |
| [`--script-help`](https://github.com/o3de/o3de/blob/9b90a24479e2b191d2125d34c1984b013b2cb13f/scripts/o3de/ExportScripts/export_source_ios_xcode.py#L89) | Display the help information specifically for the export script. | no |
| [`--build-tools`](https://github.com/o3de/o3de/blob/9b90a24479e2b191d2125d34c1984b013b2cb13f/scripts/o3de/ExportScripts/export_source_ios_xcode.py#L90) | Specifies whether to build O3DE toolchain executables. This will build AssetBundlerBatch, AssetProcessorBatch. If asset tools have not been built, then assets cannot be processed. | no |
| [`--tools-build-path`](https://github.com/o3de/o3de/blob/9b90a24479e2b191d2125d34c1984b013b2cb13f/scripts/o3de/ExportScripts/export_source_ios_xcode.py#L92) | Designates where the build files for the O3DE toolchain are generated. If not specified, default is `<o3de_project_path>/build/tools`. | no |
| [`--ios-build-path`](https://github.com/o3de/o3de/blob/9b90a24479e2b191d2125d34c1984b013b2cb13f/scripts/o3de/ExportScripts/export_source_ios_xcode.py#L94) | Designates where the Xcode project file for the project is generated. If not specified, default is `<o3de_project_path>/build/game_ios`. | no |
| [`--skip-asset-processing`](https://github.com/o3de/o3de/blob/9b90a24479e2b191d2125d34c1984b013b2cb13f/scripts/o3de/ExportScripts/export_source_ios_xcode.py#L96) | For iOS building and deployment, the export script assumes that assets should be processed and built. If this behavior is not desired, use this flag to disable it. | no |
| [`--quiet`](https://github.com/o3de/o3de/blob/9b90a24479e2b191d2125d34c1984b013b2cb13f/scripts/o3de/ExportScripts/export_source_ios_xcode.py#L98) | Suppresses logging information unless an error occurs. | no |