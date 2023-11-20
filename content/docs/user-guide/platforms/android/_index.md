---
title: Android Support for Open 3D Engine (O3DE)
linkTitle: Android
description: An overview of Open 3D Engine support for development for Android.
weight: 200
---

**Open 3D Engine (O3DE)** projects for Android rely on the Gradle build system to build the final APK that launches and runs O3DE projects. O3DE provides the **Android Project Generation script**, which generates the Gradle build scripts that you need to build your O3DE projects for Android. The Gradle build scripts use CMake to compile the native C++ code, Java to compile and build the Android application, and will construct and package the final APK and project assets.


## Prerequisite software and packages

### Android SDK
The [Android SDK](https://developer.android.com/studio) contains Android libraries, packages, NDK, and other tools that are needed to build the Android application for an O3DE project.

You can set up and configure the Android SDK by using [Android Studio](https://developer.android.com/studio), an IDE commonly used with Gradle to develop and build Android applications. When you launch Android Studio for the first time, follow the steps to download and install at least one SDK platform. You can also set up and configure SDKs from within Android Studio, if it's already set up. Once Android Studio studio is set up, you can locate the Android SDK Home by either click on **Tools > SDK Manager** or the **SDK Manager** icon in the toolbar. You will find the location under **Android SDK Location**.

Alternatively, you can download the the **Command line tools only** without the need to install the entire Android Studio. The location where the command line tools package is installed to will determine the location of the Android SDK Home. Refer to the [SDK Manager instructions](https://developer.android.com/tools/sdkmanager) for details on where to install the package.

Once the Android SDK location is determined, it needs to be set in the Android configuration setting 'sdk.root'

{{<note>}}
In order for the generation script to automatically download the required packages, you must accept the license agreements that represents those packages. This can be done either through Android Studio, or through the `sdkmanager` command line tool with the `--licenses` argument.
{{</note>}}

### Java Development Kit (JDK)
The [Java Development Kit](https://www.java.com/releases/) (JDK) is needed to run the Android SDK command line tool, compile the android java source for the project, and create a Java Key Storage (JKS) files used to sign the APK. The version of the JDK required for Android depends on the [requirements for the Android SDK](https://developer.android.com/build/jdks). The location of the JDK installation must be set in the **JAVA_HOME** environment variable, or the location of the JDK executable must be in the **PATH** environment.

{{<note>}}
The version of the [Java Development Kit](https://www.java.com/releases/) must be compatible with the [SDK Manager](https://developer.android.com/tools/sdkmanager). However, if you wish to specify older versions of the Android Gradle Plugin, the version of the JDK that is used to run the gradle build may be different, and may require setting the `JAVA_HOME` environment to match an older versions of SDK in order to build the APK successfully.
{{</note>}}


### Gradle and the Android Gradle Plugin
[Gradle](https://gradle.org/install/) is the build system designed to build and create Android applications. The [Android Gradle Plugin](https://developer.android.com/build/releases/gradle-plugin) adds features to the Gradle build system to support Android builds. The current **Android Project Generation script** supports version 8.0 or newer of the **Android Gradle Plugin**, which in turn requires **Gradle** version 8.0 or newer. The location of the Gradle installation must be set in at least one of the three ways in order for it to be discoverable:

1. Android configuration setting `gradle.home`
2. Set in the **GRADLE_HOME** environment variable.
3. The location of the gradle executable script is in the **PATH** environment.

### CMake
[CMake](https://cmake.org/download/#latest) (version {{< versions/cmake >}} or newer) is a project generator that O3DE uses for all native C++ builds, regardless of the platform. As with the discoverability requirements for Gradle, the location of the CMake installation must be set in at least one of the three ways:

1. Android configuration setting `cmake.home`
2. Set in the **CMAKE_HOME** environment variable.
3. The location of the cmake executable script is in the **PATH** environment.


### Ninja Build System
The [Ninja](https://ninja-build.org/) build system is used by CMake to build the underlying native C++ code for an O3DE project. **Ninja** must be set in the **PATH** environment.


## Configuring the environment
In order for the **Android Project Generation script** to generate O3DE Android Gradle scripts, it needs to be configured with the user specified settings and the locations of the prerequisite software. The android settings are managed with the `android-configure` command from the [O3DE Command Line](docs/user-guide/project-config/cli-reference#android-configure).

Below is the list of configurable android settings.


| Setting Key                         | Description|
| ----------------------------------- | ---------- |
| sdk.root | The root path of the android sdk on this system. |
| platform.sdk.api | The [Android Platform SDK API level](https://developer.android.com/tools/releases/platforms) |
| ndk.version | The version of the [Android NDK](https://developer.android.com/ndk/downloads). File matching patterns can be used (i.e. 25.* will search for the most update to date major version 25) |
| android.gradle.plugin | The version of the [Android Gradle Plugin]((https://developer.android.com/reference/tools/gradle-api) to use for Gradle. |
| gradle.home | The root path of the locally installed version of Gradle. If not set, the Gradle that is in the **PATH** environment will be used. |
| gradle.jvmargs | Customized [jvm arguments](https://docs.gradle.org/current/userguide/config_gradle.html#sec:configuring_jvm_memory) to set when invoking gradle. |
| cmake.home | The root path of the locally installed version of cmake. If not set, the Cmake that is in the PATH environment will be used |
| signconfig.store.file | The key store file to use for creating a signing config. (ref https://developer.android.com/studio/publish/app-signing) |
| signconfig.key.alias | The key alias withing the key store that idfentifies the signing key |
| asset.mode | The asset mode to determine how the assets are stored in the target APK. Valid values are LOOSE and PAK. |
| strip.debug | Option to strip the debug symbols of the built native libs before deployment to the APK |
| oculus.project | Option to set oculus-specific build options when building the APK |
| asset.bundle.subpath | The sub-path from the project root to specify where the bundle/pak files will be generated to. (ref https://www.docs.o3de.org/docs/user-guide/packaging/asset-bundler/) |
| extra.cmake.args | Optional string to set additional cmake arguments during the native project generation within the android gradle build process |

The following android settings are passwords that can only be set with the `--set-password` argument.

| Password Key                 | Description|
| --------------------------- | ---------- |
| signconfig.store.password | The password for the key store file |
| signconfig.key.password | The password for the key inside the key store referenced by the key alias |

{{<note>}}
Setting the password will present you with a password input and validation prompt so that the password will not be visible and not in the command history of the terminal. You can still view the password, however, with the `android-configure --list` command.
{{</note>}}

## APK Signing
All APKs must be [digitally signed](https://developer.android.com/studio/publish/app-signing) before they can be installed onto an Android device. This is done by providing a signing configuration in the Android Project Gradle script. This signing configuration is meant for a debug development environment and insecure by design. You can generate the signing configuration key store, signing key, and certificate through [Android Studio](https://developer.android.com/studio/publish/app-signing#generate-key). You can also create a key store from the command line using the JDK [keytool](https://docs.oracle.com/en/java/javase/17/docs/specs/man/keytool.html) command.

(More details of APK signing and how to create the keystore, keys, and certificates can be found [here](https://developer.android.com/studio/publish/app-signing). )

During the creation of the Android Project Gradle script, if any of the `signconfig.*` values are set, the generation process will attempt to embed the signing configuration information with the following values:

- **Key Store File**

  The key store file that contains the signing key and certificate. ( `--signconfig-store-file`/`signconfig.store.file`)

- **Signing Key Alias**

  The alias of the signing key inside the key store file.( `--signconfig-key-alias`/`signconfig.key.alias`)

- **Key Store Password**

  The password for the key store file.(`signconfig.store.password`)

- **Signing Key Password**

  The password for the signing key needed to perform the signing operation.(`signconfig.key.password`)

## Android assets
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

## Legacy Android Project Generation Script

The original android generation script can still be found at `<engine-root>/cmake/Tools/Platform/Android/generate_android_project.py`, but only supports the Android Gradle Plugn version 4.x.

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

