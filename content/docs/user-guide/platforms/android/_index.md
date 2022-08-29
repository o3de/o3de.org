---
title: Android Support for Open 3D Engine (O3DE)
linkTitle: Android
description: An overview of Open 3D Engine support for development for Android.
weight: 200
---

**Open 3D Engine (O3DE)** projects for Android rely on the Gradle build system to build the final APK that launches and runs O3DE projects. O3DE provides the **Android Project Generation script**, which generates the Gradle build scripts that you need to build your O3DE projects for Android. The Gradle build scripts use CMake to compile the native C++ code, compile and build the Android application (Java), and construct and package the final APK and project assets. 


## Prerequisite software and packages

### Java Development Kit (JDK)
The latest version of the Java Development Kit is needed to both compile the android java source for the project as well as to create a Java Key Storage (JKS) files used by the Android SDK to sign the APK.

### Gradle
[Gradle](https://gradle.org/install/) (version 6.7.1 or newer) is the build system designed to build and create Android applications.

### Android SDK
The [Android SDK](https://developer.android.com/studio) contains Android libraries, packages, NDK, and other tools that are needed to build the Android application for an O3DE project. Download the latest version of Android SDK through the Android Studio or the command line tools. 

### CMake
[CMake](https://cmake.org/download/#latest) (version {{< versions/cmake >}} or newer) is a project generator that O3DE uses for all native C++ builds, regardless of the platform. 

### Ninja Build System
The [Ninja](https://ninja-build.org/) build system is used by CMake to build the underlying native C++ code for an O3DE project.

## Setup Requirements

### Android SDK setup
You can set up and configure the Android SDK by using Android Studio, an IDE commonly used with Gradle to develop and build Android applications. When you launch Android Studio for the first time, follow the steps to download and install at least one SDK platform. You can also set up and configure SDKs from within Android Studio, if it's already set up.

Keep track of the location where you installed the Android SDK, as you will need it later to generate an Android project for O3DE. 

### Prerequisite packages installation

In order to simplify project generation steps, add the other prerequisites (Java, Gradle, CMake, and Ninja) to your PATH environment variable. Otherwise, you must configure the paths to each respective package by using the command line arguments for the Android Project Generation script.

### Android Keystore
The Android build process creates APKs that you must sign before you can deploy them. You can configure a signed APK for your generated project after creating the project through Android Studio, or you can sign the APK during the project generation step. Android uses the JKS format so you can use the `keytool` Java command to sign your APK. 

|Field Name|Keytool Argument|Description|
| --- | --- | --- |
| Distinguished Name ([DN](https://datatracker.ietf.org/doc/html/rfc2253)) | `dname` | Descriptive name of an entity to identify the owner of the key. |
| Alias Name | `alias` | The identifier for the key and certificate in the KeyStore file. A KeyStore file may contain multiple keys and certificates.|
| Key Password | `keypass` | The password to protect the individual signing key. |
| Keystore Password | `storepass` | The password to protect the entire KeyStore file. |
| Validity Period | `validity` | The length of time in days that the certificate is valid for, starting from the day the KeyStore was created.|

### Android assets
Before you can generate an O3DE Android project, you must process and prepare the assets for Android. You can do this by using the **O3DE Editor** and the **Asset Processor** (or **Asset Processor Batch**) on your project.

Specifically for Android, you must configure the registry settings value so that the Asset Processor can process Android platform assets. To do this, update the `<engine-root>\Registry\AssetProcessorPlatformConfig.setreg` file.

In the `Amazon/AssetProcessor/Platforms` section of the file, set the `"android"` flag to `"enabled"`. For example:

```
"Amazon": {
    "AssetProcessor": {
        ...
        "Platforms": {
            //"pc": "enabled",
            "android": "enabled"
            //"ios": "enabled",
            //"mac": "enabled",
            //"server": "enabled"
         }
    ...
}
```

Alternatively, you can use `--platforms=android` when launching the Asset Processor Batch. Refer to step 3 in [Generating Android Projects on Windows](/docs/user-guide/platforms/android/generating_android_project_windows/#steps).

After you've processed the assets for Android, you can proceed to generate the Android project.

## Android Project Generation Script

Find the script to generate an Android project at `<engine-root>/cmake/Tools/Platform/Android/generate_android_project.py`. 

The `generate_android_project.py` script contains the following arguments:
| Argument&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Description | Default | Notes |
| --- | --- | --- | --- |
| `--engine-root` | The path to the root of the engine folder. | \<required\> |     |
| `--build-dir` | The path to create the project's `build` folder at. | \<required\> | This path can be relative to the engine root or absolute.  |
| `--third-party-path` | The path to O3DE's designated third party folder. | \<required\> | This correlates to O3DE's `LY_3RDPARTY_PATH` CMake variable. |
| `--android-sdk-path` | The path to the Android SDK folder. | \<required\> | This path is normally set when you configure Android Studio. |
| `-g`, `--project-path` | The path to the O3DE project to generate an Android project for. | \<required\> |     |
| `--android-sdk-platform` | The Android API level to base the build on. | The latest installed API level in the `--android-sdk-path` value | The API level needs to match the version of the target Android device. (For a description of API levels, refer to [https://source.android.com/setup/start/build-numbers](https://source.android.com/setup/start/build-numbers) ).<br><br>Currently, the minimum API level that's supported is 28. |
| `--android-sdk-build-tool-version` | Override the Android build tools version. | The latest Android build tools installed in the `--android-sdk-path` value |     |
| `--gradle-plugin-version` | The version of the Android Gradle plugin to specify for the build. | `4.2.0` | The minimum supported version is `4.2.0` (default). For details, refer to [https://developer.android.com/studio/releases/gradle-plugin?buildsystem=ndk-build](https://developer.android.com/studio/releases/gradle-plugin?buildsystem=ndk-build). <br><br>Currently, only `4.2.0` is supported. This script can be updated to support future versions. |
| `--android-ndk-version` | The specific NDK value to base the build on`.` | `21.4.7075529` | The values are based on the NDK's full revision number:<br>-   `16.1.4479499`    <br>-   `17.2.4988734`    <br>-   `18.1.5063045`    <br>-   `19.2.5345600`    <br>-   `20.0.5594570`    <br>-   `20.1.5948944`    <br>-   `21.0.6113669`    <br>-   `21.1.6352462`    <br>-   `21.2.6472646`    <br>-   `21.3.6528147`    <br>-   `21.4.7075529`    <br>-   `22.0.7026061`    <br>-   `22.1.7171670`    <br><br>You can also use the `*` wildcard to select the most recent version. For example, `21.*` selects the most recent version of NDK21. |
| `--android-native-api-level` | The API level that the NDK supports, for native CMake Android support. | The API Level set by the `--android-sdk-platform` parameter | - The minimum API Level for the NDK is `24`. |
| `--enable-unity-build` | (Optional) Compiles source code with unity build. | Unity build disabled. |      |
| `--include-apk-assets` | (Optional) Includes the game assets in the APK. | Assets not included in the APK. |      |
| `--asset-mode` | Configures how to include assets in the APK. Asset Mode values can be `VFS`, `PAK`, or `LOOSE`. | `LOOSE` | - `LOOSE` (default): Unpacks and stores assets as individual files that are contained within the asset cache. <br>- `PAK`: Packs the assets into PAK files. <br>- `VFS`: References assets remotely from the target device through the Virtual File System. |
| `--asset-type` | The type of assets to include in the APK | `android` | In the future, this argument will be deprecated and will only support `android` type assets. |
| `--gradle-install-path` | If the Gradle command is not in the PATH environment, or if you want to specify an alternate Gradle folder, this argument allows you to override the installed version of Gradle to use for the project generation. | The path to Gradle that's installed in the PATH environment. | - The minimum version of Gradle is `6.7.1`, which is compatible with the minimum version of the Android Gradle plugin, `4.2.0`. <br>- If you don't specify this argument and Gradle is not installed in the PATH environment, an error will occur. |
| `--cmake-install-path` | If the CMake command is not in the PATH environment, or you want to specify an alternate CMake installation, this argument allows you to override the installed version of CMake to use for the project generation. | The CMake installation that's part of the PATH environment. | - The minimum version of CMake is `3.21`, which supports Android Gradle plugin version `4.2.0.`. <br>- If you don't specify this argument and CMake is not installed in the PATH environment, an error will occur. |
| `--ninja-install-path` | If the Ninja command is not in the PATH environment, or you want to specify an alternate Ninja installation, this argument allows you to override the installed version of Ninja to use for the project generation. | The Ninja build tool installation that's part of the PATH environment. | - If you don't specify this argument and Ninja is not installed in the PATH environment, an error will occur. |
| `--signconfig-store-file` | (Optional) An Android JKS KeyStore that is used for APK signing when the project needs to be built and deployed to an Android device. If this option is omitted, then it must be set up later in Android Studio in order to deploy to Android. Otherwise, the project can only generate unsigned APKs. (Refer to the [Android Key Store](#android-keystore) section for more information.) | None | - If not specified, the generated Android project will not include any signing information. You can still build the Android project, but you cannot deploy to any device.<br>- You can add the signing key information after project generation through Android Studio. |
| `--signconfig-store-password` | A required password for the Android JKS KeyStore file, if specified by `--signconfig-store-file`.| None | - Required if you specify a JKS using `--signconfig-store-file`. |
| `--signconfig-key-alias` | A required alias of the signing key in an Android JKS KeyStore file, if specified by `--signconfig-store-file`. | None | - Required if you specify a JKS using `--signconfig-store-file`. |
| `--signconfig-key-password` | A required password to use the signing key in an Android JKS KeyStore file, if specified by `--signconfig-store-file`. | None | - Required if you specify a JKS using `--signconfig-store-file`. |
| `--overwrite-existing` | (Optional) Overwrites existing scripts in the target build folder if they already exist. | Does not overwrite. |     |


## Android Deployment Script
Find the script to deploy the Android project at `<engine-root>/cmake/Tools/Platform/Android/deploy_android.py`.

The `deploy_android.py` script contains the following arguments:
| Argument&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Description | Default | Notes |
| --- | --- | --- | --- |
| `-h`, `--help` | Shows the help message and exits. |     |     |
| `-b`, `--build-dir` | The build directory of the project to deploy from. |     |     |
| `-c`, `--configuration` | The build configuration of the built binaries to deploy from. |     |     |
| `--device-id-filter` | A comma separated list of connected Android device IDs to filter the deployment to. | All connected Android devices. | Only used when multiple devices are connected and you want to filter which devices will be the target for the deployment. |
| `-t`, `--deployment-type` | The type (`APK`, `ASSETS`, or `BOTH`) to deploy:<br/><br/>**`APK`**<br/>Deploys only the APK without any external assets (refer to the `--include-apk-assets` option in `generate_android_project.py`). Any assets that're already included in the APK will be deployed as well. <br/><br/>**`ASSETS`**<br/>Deploys only the assets for the APK. This option is only valid if you didn't set `--include-apk-assets` during the project generation.<br><br>**`BOTH`**<br> Deploys both the APK and assets, regardless of the `--include-apk-assets` option. | `BOTH` | Deploying the APK and assets separately can optimize different workflows. For example, developers who update only the code should use `APK` to make their deployments more efficient (provided that the assets are deployed at least initially). In another example, technical artists who only update the assets should use `ASSETS` (provided that `--include-apk-assets` was not set during project generation).|
| `--clean` | Cleans the target Android device by uninstalling any pre-existing projects before deploying. |     | Uninstalling the project also deletes all the assets deployed as well. |
| `--kill-adb-server` |  Option to kill adb server at the end of deployment. |     |     |
| `--debug` | Option to enable debug messages. |     |     |




## Additional Topics

+ [Generating Android Projects on Windows](/docs/user-guide/platforms/android/generating_android_project_windows)

