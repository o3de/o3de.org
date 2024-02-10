---
linkTitle: Project Export for Android
title: Project Export for Android
description: Learn how to use the Project Export CLI to automate preparing your project for release on Android.
toc: true
weight: 410
---
This guide covers how to use project export tooling to build and deploy games on Android. We will use the Android export script to generate a Gradle project, prepare assets, and then build the project. The end result of export should be an APK file that can be installed on your Android device, along with an additional step to auto-install on a connected phone.

{{< note >}}
To learn more about the project export tooling, please consult the page [Project Export CLI Tool.](/docs/user-guide/packaging/project-export/project-export-cli)
{{< /note >}}
{{< note >}}
To learn more about how to manually export an Android project, please consult the page [Generating an Android Project](https://development--o3deorg.netlify.app/docs/user-guide/platforms/android/generating_android_project_windows/#prerequisites).
{{< /note >}}

## Prerequisites
1. Make sure that the [Project Export CLI Tool page](/docs/user-guide/packaging/project-export/project-export-cli) prerequisites are satisfied.
2. Make sure you have your project created and registered with your engine. Check that you can successfully build and open your project with the Project Manager.
3. Ensure all pre-requisites for working with Android in O3DE are satsified. You can learn about software dependencies [here](https://development--o3deorg.netlify.app/docs/user-guide/platforms/android/#prerequisite-software-and-packages) and project setup pre-requisites [here](https://development--o3deorg.netlify.app/docs/user-guide/platforms/android/generating_android_project_windows/#prerequisites). For the Android SDK, make sure to record where the root folder path is located on your hard drive, as that will be needed for setting up configuration.
4. Ensure that you have a proper keystore file configured for signing. You can learn more [here](https://development--o3deorg.netlify.app/docs/user-guide/platforms/android/#apk-signing). Here is an example keystore file you can create to start with (you will need the JDK with `keytool`):
```
set KEYSTORE_FILE_PATH=C:\path\to\android-key.keystore
set STOREPASS=o3depass
set ALIAS=o3dekey
set KEYPASS=o3depass
set KEYSIZE=2048
set VALIDITY=10000
set DNAME="cn=o3de-android-project, ou=o3de, o=LF, c=US"
keytool -genkey -keystore %KEYSTORE_FILE_PATH% -storepass %STOREPASS%  -alias %ALIAS% -keypass %KEYPASS% -keyalg RSA -keysize %KEYSIZE% -validity %VALIDITY% -dname %DNAME%
```
5. Make sure the O3DE bootstrap registry is enabled for Android. To do so, go to your O3DE installation and edit the file at `%O3DE_ENGINE_PATH%\Registry\bootstrap.setreg` so that the `assets` field uses `android`. Like so:
```
"assets": "android",
```
6. Make sure your project has the right configuration settings for Android. You can use the `android-configure` CLI tool to ensure this is setup. To see what is currently configured, run:
```
$O3DE_ENGINE_PATH/scripts/o3de.bat android-configure -l
```
You can also validate your current configuration using:
```
$O3DE_ENGINE_PATH/scripts/o3de.bat android-configure --validate
```
If you do not already have Android configured, or encounter issues with the validate command, you can run the following:
```
$O3DE_ENGINE_PATH/scripts/o3de.bat android-configure --set-value platform.sdk.api=30
$O3DE_ENGINE_PATH/scripts/o3de.bat android-configure --set-value ndk.version=25.*
$O3DE_ENGINE_PATH/scripts/o3de.bat android-configure --set-value android.gradle.plugin=8.1.0
$O3DE_ENGINE_PATH/scripts/o3de.bat android-configure --set-value sdk.root=C:/path/to/android/sdk
$O3DE_ENGINE_PATH/scripts/o3de.bat android-configure --set-value signconfig.store.file=C:/path/to/android-key.keystore
$O3DE_ENGINE_PATH/scripts/o3de.bat android-configure --set-value signconfig.key.alias=o3dekey
$O3DE_ENGINE_PATH/scripts/o3de.bat android-configure --set-value asset.mode=PAK
```
Note: you must already know where sdk.root and signconfig.store.file exist on your hard drive, and use those paths accordingly. To setup the keypass and storepass, you must use the following commands
```
$O3DE_ENGINE_PATH/scripts/o3de.bat android-configure --set-password signconfig.store.password
$O3DE_ENGINE_PATH/scripts/o3de.bat android-configure --set-password signconfig.key.password
```
Make sure the passwords supplied here match what you used in the keystore file, and that you remember what they are.

## Quickstart
### Running the Export Script
For building in release mode with bundled PAK files for your APK, you can use the following export command:
```
set O3DE_ENGINE_PATH=C:\path\to\o3de
set PROJECT_PATH=C:\path\to\project
cd %PROJECT_PATH%
%O3DE_ENGINE_PATH%\scripts\o3de.bat export-project -es export_source_android.py -pp . -abp build\game-android -ll INFO --config release --asset-mode PAK
```

To use profile mode instead, change the `--config` parameter in the above snippet to use `profile` instead. If you wish to set the asset mode to LOOSE, use `--asset-mode LOOSE`.

That invocation should be all that is needed to create an APK file for your project. To install the APK on your phone for testing, this can be done by adding the `--deploy-to-android` flag in the export snippet above. Please note that to use this feature, you must ensure an android device is connected to your computer, and that ADB is able to properly access the device.

As a result of the export process, the resulting Android Gradle project folder was also generated. You can find it in `%PROJECT_PATH%\build\game-android`. You can use this project folder from inside Android Studio to tweak any specific settings, or run the Debugger.

## Android Export Script
O3DE ships with an [Android Export Script](https://github.com/o3de/o3de/blob/bb3eafe30d8291f50b69924e5b7a432c8c6f53ca/scripts/o3de/ExportScripts/export_source_android.py#L28), capable of generating an Android Gradle project folder to handle standard use cases of O3DE projects on Android.

The export script has two primary sections: the function [`export_source_android_project`](https://github.com/o3de/o3de/blob/bb3eafe30d8291f50b69924e5b7a432c8c6f53ca/scripts/o3de/ExportScripts/export_source_android.py#L28) and the [startup code that only runs if the script is invoked by the CLI](https://github.com/o3de/o3de/blob/bb3eafe30d8291f50b69924e5b7a432c8c6f53ca/scripts/o3de/ExportScripts/export_source_android.py#L222). In-depth discussion on these two sections will be made in the [Developer Guide](https://docs.o3de.org/docs/engine-dev/) in the future.

### Usage
To use the export script, you can issue the arguments at the same time that you are running the `export-project` command. The arguments specific to the script will be deferred until it begins running.

The arguments are as follows:
| Argument Name | Description | Required? |
| - | - | - |
| [`--script-help`](https://github.com/o3de/o3de/blob/bb3eafe30d8291f50b69924e5b7a432c8c6f53ca/scripts/o3de/ExportScripts/export_utility.py#L120) | Display the help information specifically for the export script. | no |
| [`--config`](https://github.com/o3de/o3de/blob/bb3eafe30d8291f50b69924e5b7a432c8c6f53ca/scripts/o3de/ExportScripts/export_utility.py#L124) | Defines the CMake build configuration when building the project's binaries, such as GameLauncher. Options are either `profile` or `release`. | no |
| [`--tool-config`](https://github.com/o3de/o3de/blob/bb3eafe30d8291f50b69924e5b7a432c8c6f53ca/scripts/o3de/ExportScripts/export_utility.py#L129) | The CMake build configuration to use when building tool binaries. Options are either `profile` or `release`. | no |
| [`--build-assets`](https://github.com/o3de/o3de/blob/bb3eafe30d8291f50b69924e5b7a432c8c6f53ca/scripts/o3de/ExportScripts/export_utility.py#L186) | Override the default behavior to include processing all assets and run the asset bundler for the project. This option is available when the export-project-configure defaults for `option.build.assets` is `False`. | no |
| [`--skip-build-assets`](https://github.com/o3de/o3de/blob/bb3eafe30d8291f50b69924e5b7a432c8c6f53ca/scripts/o3de/ExportScripts/export_utility.py#L188) | Override the default behavior to skip reprocessing and rebundling of all assets for the project. This option is available when the export-project-configure defaults for `option.build.assets` is `True`. | no |
| [`--fail-on-asset-errors`](https://github.com/o3de/o3de/blob/bb3eafe30d8291f50b69924e5b7a432c8c6f53ca/scripts/o3de/ExportScripts/export_utility.py#L151) | Override the default behavior to fail the export process on any errors that occur during asset processing.  This option is available when the export-project-configure defaults for `option.fail.on.asset.errors` is `False`. | no |
| [`--continue-on-asset-errors`](https://github.com/o3de/o3de/blob/bb3eafe30d8291f50b69924e5b7a432c8c6f53ca/scripts/o3de/ExportScripts/export_utility.py#L153) |  Override the default behavior to ignore any errors that occur during asset processing and continue with the project export.  This option is available when the export-project-configure defaults for `option.fail.on.asset.errors` is `True`. | no |
| [`--seedlist`](https://github.com/o3de/o3de/blob/bb3eafe30d8291f50b69924e5b7a432c8c6f53ca/scripts/o3de/ExportScripts/export_utility.py#L156) | Path to a seedlist file for asset bundling. You can specify this multiple times for multiple seed lists. This parameter also allows for wildcard matching for paths. | no |
| [`--seedfile`](https://github.com/o3de/o3de/blob/bb3eafe30d8291f50b69924e5b7a432c8c6f53ca/scripts/o3de/ExportScripts/export_utility.py#L163) | Path to a seed file for asset bundling. Example seed files are levels or prefabs. You can specify this multiple times for multiple seed files. This parameter also allows for wildcard matching for paths. | no |
| [`--level-name`](https://github.com/o3de/o3de/blob/bb3eafe30d8291f50b69924e5b7a432c8c6f53ca/scripts/o3de/ExportScripts/export_utility.py#L170) | The name of the level you want to export. This will look in `<o3de_project_path>/Cache/levels` to fetch the right level prefab. Specify multiple times for each level in your game. This is not necessary if the level is already defined inside of a seed list. | no |
| [`--build-tools`](https://github.com/o3de/o3de/blob/bb3eafe30d8291f50b69924e5b7a432c8c6f53ca/scripts/o3de/ExportScripts/export_utility.py#L142) | Builds the O3DE toolchain executables if the engine is not an SDK. This will build AssetBundlerBatch, AssetProcessorBatch. This option is available when the export-project-configure defaults for `option.build.tools` is `False`. | no |
| [`--skip-build-tools`](https://github.com/o3de/o3de/blob/bb3eafe30d8291f50b69924e5b7a432c8c6f53ca/scripts/o3de/ExportScripts/export_utility.py#L145) | Skips building the O3DE toolchain executables if the engine. This may be useful if you already have the tools available. This option is available when the export-project-configure defaults for `option.build.tools` if `True`.| no |
| [`--tools-build-path`](https://github.com/o3de/o3de/blob/bb3eafe30d8291f50b69924e5b7a432c8c6f53ca/scripts/o3de/ExportScripts/export_utility.py#L133) | Designates where the build files for the O3DE toolchain are generated. If not specified, default is `<o3de_project_path>/build/tools`.  | no |
| [`--max-bundle-size`](https://github.com/o3de/o3de/blob/bb3eafe30d8291f50b69924e5b7a432c8c6f53ca/scripts/o3de/ExportScripts/export_utility.py#L136) | Specify the maximum size of a given asset bundle.  | no |
| [`--android-build-path`](https://github.com/o3de/o3de/blob/bb3eafe30d8291f50b69924e5b7a432c8c6f53ca/scripts/o3de/ExportScripts/export_source_android.py#L144) | Designates where the Android Gradle project folder for the project is generated. If not specified, default is `<o3de_project_path>/build/android`. | no |
| [`--quiet`](https://github.com/o3de/o3de/blob/bb3eafe30d8291f50b69924e5b7a432c8c6f53ca/scripts/o3de/ExportScripts/export_utility.py#L190) | Suppresses logging information unless an error occurs. | no |

Here is an example usage of this script:
```
set ANDROID_OUTPUT_PATH=C:\path\to\android\build\path
%O3DE_ENGINE_PATH%\scripts\o3de.bat export-project --export-script %O3DE_ENGINE_PATH%\scripts\o3de\ExportScripts\export_source_android.py --project-path %PROJECT_PATH% --android-build-path %ANDROID_OUTPUT_PATH%
```
`O3DE_ENGINE_PATH`, `O3DE_PROJECT_PATH` and `ANDROID_OUTPUT_PATH` are environment variables. The `O3DE_ENGINE_PATH` and `O3DE_PROJECT_PATH` variables point to the path locations for your o3de source engine and o3de project respectively. The `ANDROID_OUTPUT_PATH` variable corresponds to the folder path where you would like for the generated Android Gradle project folder to appear.