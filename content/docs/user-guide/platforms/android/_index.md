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
The Android SDK will contain the android libraries, packages, ndk, tools, etc that are needed to build the Android App for an O3DE project. 

### CMake
[CMake](https://cmake.org/download/) project generator (version 3.21 or newer) is needed for O3DE for all native C++ builds, regardless of the platform. 

### Ninja Build System
The [ninja](https://ninja-build.org/) build system is used by CMake to build the underlying native C++ code for the O3DE project.

## **Optional Software**

### **Android Studio**
Android Studio is the IDE commonly used in conjunction with Gradle to develop and build Android Apps. Android Studio provides the mechanism to setup and download the required Android SDK for the build process. Download the latest version from [https://developer.android.com/studio](https://developer.android.com/studio) and run through the installation process.


## Setup Requirements

### Android SDK setup
You can set up and configure the Android SDK as part of the initial Android Studio experience. When you set up Android Studio for the first time, it will guide you through the steps to download and install at least one SDK platform. You can also set up and configure SDKs from within Android Studio, if it's already set up. 

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
Before you can generate an O3DE Android project, you must have assets for the Android project processed and available. This is done by the Editor and Tools project for the host platform (i.e. Windows), and running AssetProcessor (or AssetProcessorBatch) on the desired project.

Specifically for android, you must configure the registry settings value for AssetProcessor to process 'android' platform assets. This is done by updating the 'AssetProcessorPlatformConfig.setreg' file located under the 'Registry' folder of the engine root.

Under the `Amazon/AssetProcessor/Platforms` section of the file, enable the "android" flag. For example:

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

Optionally, `--platforms=android` can be passed in during the launch the **Asset Processor (Batch)**

After the android assets are processed, you can proceed with the Android project generation.

## **Android Project Generation Script**

The script to generate android projects is located in the engine root under `cmake/Tools/Platform/Android/generate_android_project.py`

The list of arguments for this script is described below:
| Argument&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Description | Default | Notes |
| --- | --- | --- | --- |
| \--engine-root | The path to the root of the engine folder. | <required> |     |
| \--build-dir | The path to the build folder that will be created for the project. | <required> | This path can be relative (to the engine root path), or an absolute path |
| \--third-party-path | The path to O3DE's designated 3rd Party folder | <required> | This correlates to O3DE's LY\_3RDPARTY\_PATH cmake variable |
| \--android-sdk-path | The path to the location of the android sdk root | <required> | This path is normally set during configuration of Android Studio |
| \-g / --project-path | The path to the O3DE project to generate the Android project for | <required> |     |
| \--android-sdk-platform | The android API level to base the build on | The latest installed API level in the --android-sdk-path value | The API level needs to match the version of the target android device. (For a description of API levels, refer to [https://source.android.com/setup/start/build-numbers](https://source.android.com/setup/start/build-numbers) ).<br><br>Current the minimum API level supported is 28. |
| \--android-sdk-build-tool-version | Override the android build tools version | The latest android build tools installed in the --android-sdk-path value |     |
| \--gradle-plugin-version | The version of the Android Gradle Plugin to specify for the build | 4.2.0 | *   The minimum supported Android Gradle plugin is version 4.2.0 (the default). Refer to [https://developer.android.com/studio/releases/gradle-plugin?buildsystem=ndk-build](https://developer.android.com/studio/releases/gradle-plugin?buildsystem=ndk-build) for details.<br>*   Currently, only 4.2.0 is supported. As future versions are added, this script will need to be updated to support it. |
| \--android-ndk-version | The specific NDK value to base the build on | 21.4.7075529 | The values are based on the full revision number of the NDK:<br><br>*   16.1.4479499    <br>*   17.2.4988734    <br>*   18.1.5063045    <br>*   19.2.5345600    <br>*   20.0.5594570    <br>*   20.1.5948944    <br>*   21.0.6113669    <br>*   21.1.6352462    <br>*   21.2.6472646    <br>*   21.3.6528147    <br>*   21.4.7075529    <br>*   22.0.7026061    <br>*   22.1.7171670    <br>This argument also accepts the '\*' wildcard, so you can specify 21.\* and it will select the most recent version of the NDK21 (21.4.7075529) |
| \--android-native-api-level | For the native cmake android support, the API level that the NDK will be supporting | The same API Level set by the --android-sdk-platform parameter | *   The minimum API Level for the NDK is 24 |
| \--include-apk-assets | Option to include the game assets for the APK. | False | If this option is set, you must have the android assets built (refer to the Android Assets section above) |
| \--asset-mode | Asset Mode (VFS \| PAK \| LOOSE) to use when including assets into the APK | LOOSE | Accepted values are<br><br>*   LOOSE (default)  <br>    The assets are unpacked and is stored as individual files contained within the asset cache<br>*   PAK  <br>    The assets are packed into pak files<br>*   VFS  <br>    The assets are referenced remotely from the target device through the Virtual File System |
| \--asset-type | Asset Type to use when including assets into the APK | android | This argument will be deprecated in the future and we will only be supported 'android' assets |
| \--gradle-install-path | If gradle command is not in the PATH environment, or you want to specify an alternate gradle folder, this argument allows you to override the installed version of gradle to use for the project generation. | The gradle that is installed and part of the PATH environment will be specified. | *   The minimum version of gradle is currently 6.7.1 (in order to support the minimum version of the Android Gradle plugin, 4.2.0 )<br>*   If this argument is not specified, and there is no gradle installed in the PATH environment, this will be treated as an error |
| `--cmake-install-path` | If the CMake command is not in the PATH environment, or you want to specify an alternate CMake installation, this argument allows you to override the installed version of CMake to use for the project generation. | The CMake installation that's part of the PATH environment. | - The minimum version of CMake is `3.21`, which supports Android Gradle plugin version `4.2.0.`. <br>- If you don't specify this argument and CMake is not installed in the PATH environment, an error will occur. |
| `--ninja-install-path` | If the Ninja command is not in the PATH environment, or you want to specify an alternate Ninja installation, this argument allows you to override the installed version of Ninja to use for the project generation. | The Ninja build tool installation that's part of the PATH environment. | - If you don't specify this argument and Ninja is not installed in the PATH environment, an error will occur. |
| `--signconfig-store-file` | (Optional) An Android JKS KeyStore that is used for APK signing when the project needs to be built and deployed to an Android device. If this option is omitted, then it must be set up later in Android Studio in order to deploy to Android. Otherwise, the project can only generate unsigned APKs. (Refer to the [Android Key Store](#android-key-store) section for more information.) | None | - If not specified, the generated Android project will not include any signing information. You can still build the Android project, but you cannot deploy to any device.<br>- You can add the signing key information after project generation through Android Studio. |
| `--signconfig-store-password` | A required password for the Android JKS KeyStore file, if specified by `--signconfig-store-file`.| None | - Required if you specify a JKS using `--signconfig-store-file`. |
| `--signconfig-key-alias` | A required alias of the signing key in an Android JKS KeyStore file, if specified by `--signconfig-store-file`. | None | - Required if you specify a JKS using `--signconfig-store-file`. |
| `--signconfig-key-password` | A required password to use the signing key in an Android JKS KeyStore file, if specified by `--signconfig-store-file`. | None | - Required if you specify a JKS using `--signconfig-store-file`. |
| `--overwrite-existing` | (Optional) Overwrites existing scripts in the target build folder if they already exist. | `False` |     |


## **Android Deployment Script**
The script to deploy the android project is located under `cmake/Tools/Platform/Android/deploy_android.py` 

The list of arguments for this script is described below:
| Argument&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Description | Default | Notes |
| --- | --- | --- | --- |
| \-h, --help | Show the help message and exit |     |     |
| \-b, --build-dir | The build directory of the project to deploy from |     |     |
| \-c, --configuration | The build configuration of the built binaries to deploy from |     |     |
| \--device-id-filter | Comma separated list of connected android device IDs to filter the deployment to | All connected android devices | Only used when multiple devices are connected and you want to filter which devices will be the target for the deployment.|
| \-t , --deployment-type | The deployment type (APK\|ASSETS\|BOTH) to execute:<br/><br/>**APK**<br/>Only deploy the APK, not any external assets (see --include-apk-assets options in the project configuration). If the assets are included in the APK, then it will be included as well.<br/><br/>**ASSETS**<br/>Only deploy the assets for the APK. This option is only valid if --include-apk-assets was not set during the project generation<br/><br/>**BOTH**<br/>Both the APK and assets will be deployed, regardless of the --include-apk-assets option. | BOTH | Separating the options to deploying assets separately from the APK optimizes different workflows. For developers making changes to the code, and not the assets, then 'APK' only deployments are more efficient (provided that the assets are deployed at least initially). For workflows where the assets are the only updates, then 'ASSETS' would be the more efficient workflow (provided that --include-apk-assets were not set during project generation)<br/>|
| \--clean | Option to clean the target android device (uninstall) of any pre-existing projects before deploying. |     |     |




## **Additional Topics**

+ [Generating Android Projects on Windows](/docs/user-guide/platforms/android/generating_android_project_windows)

