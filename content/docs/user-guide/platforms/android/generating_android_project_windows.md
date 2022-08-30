---
title: Generating Android Projects on Windows
linkTitle: Generating Android Project
description: Step-by-step guide to generating and deploying an Android project for Open 3D Engine (O3DE).
weight: 200
---


In this tutorial, you will learn how to build and deploy an Android project in **Open 3D Engine (O3DE)**.

The following workflow describes the steps to build and deploy the Atom Sample Viewer project to a device that runs Android 10. You can also follow these steps to build your own project on any supported Android version. 

## Prerequisites

The following instructions assume that you have:

1.  Steps are performed in a Windows host machine.
2.  Android Studio and Android SDK are installed
3.  JDK development kit is installed and on the system path
4.  Gradle is installed and on the system path (maximum version supported: 7.0.2)
5.  CMake {{< versions/cmake >}} or newer is installed and on the system path
6.  Ninja build system is installed and on the system path
7.  Git is installed
8.  [O3DE](https://github.com/o3de/o3de.git) has been cloned locally on the system (to D:\\github\\o3de)
9.  [Atom Sample Viewer](https://github.com/o3de/o3de-atom-sampleviewer.git) has been cloned locally on the system (to D:\\github\\o3de-atom-sampleviewer)

{{< note >}}
This example workflow represents the 'Source Engine' workflow when setting up [O3DE from GitHub](/docs/welcome-guide/setup/setup-from-github)
{{< /note >}}


## (Optional) Set up environment variables

The project generation steps involve passing in different paths and values to the Android Project Generation script. To simplify the paths and values, set up the following environment variables. If you skip this step, pass in the literal paths and values to the commands instead. 

**Source and build directories**

Add the following source and build directories to your environment variables.

- `O3DE_ENGINE_PATH`: The path to the O3DE source engine.

- `O3DE_PROJECT_PATH`: The path to Atom Sample Viewer project.  

- `O3DE_BUILD_ROOT`: The path to build the Atom Sample Viewer project at.
  
```
SET O3DE_ENGINE_PATH=C:\o3de
SET O3DE_PROJECT_PATH=C:\o3de-projects\o3de-atom-sampleviewer
SET O3DE_BUILD_ROOT=C:\o3de-build
```

**KeyStore settings**

Add the following KeyStore settings to your environment variables.

```
SET O3DE_ANDROID_SIGNCONFIG_FILE=%O3DE_BUILD_ROOT%\o3de.keystore
SET O3DE_ANDROID_SIGNCONFIG_STORE_PASSWORD=o3de_android
SET O3DE_ANDROID_SIGNCONFIG_KEY_ALIAS=o3de_key
SET O3DE_ANDROID_SIGNCONFIG_KEY_PASSWORD=o3de_android
SET O3DE_ANDROID_SIGNCONFIG_KEY_SIZE=2048
SET O3DE_ANDROID_SIGNCONFIG_VALIDITY_DAYS=10000
SET O3DE_ANDROID_DN="cn=atom-sample-viewer, ou=o3de, o=LF, c=US"
```

{{< note >}}
While signing keys are required to deploy to an Android device, you don't need to configure KeyStore settings in your environment variables. Rather, you can use the values (such as store password, key password, alias, and so on) from your JKS file directly.
{{< /note >}}


**Android Project Generation Settings**

Add the following Android Project Generation settings to your environment variables.

```
set O3DE_ANDROID_SDK_PATH=C:\Android\android-sdk
set O3DE_ANDROID_NDK_VERSION=22.*
set O3DE_ANDROID_SDK_API_LEVEL=29
set O3DE_ANDROID_ASSET_MODE=LOOSE
set O3DE_ANDROID_DEPLOY_TYPE=BOTH
```

{{< note >}}
Set `O3DE_ANDROID_SDK_PATH` to the location where you set up your Android SDK package.
{{< /note >}}


## (Optional) Build O3DE and Asset Processor Batch

This tutorial assumes you've built O3DE as a source engine by following the instructions in [Set up Open 3D Engine](/docs/welcome-guide/setup/setup-from-github/) for "Source engine". These instructions build the full suite of O3DE tools, including **Asset Processor Batch**. However, if you haven't built O3DE, the following describes the minimal steps you need to set up O3DE and Asset Processor Batch to process assets and build your project for Android.

1. Register the project path with the O3DE engine.
   
    ```
    cd %O3DE_ENGINE_PATH%

    scripts\o3de.bat register --project-path %O3DE_PROJECT_PATH%

    ```

2. Generate the Visual Studio project for the O3DE engine.
   
    ```
    cd %O3DE_PROJECT_PATH%

    cmake -B %O3DE_BUILD_ROOT%\windows
    ```

3. Build the **Asset Processor Batch** project in profile mode to process the assets.
    ```
    cmake --build %O3DE_BUILD_ROOT%\windows --target AssetProcessorBatch --config profile -- -m /nologo
    ```
    {{< note >}}
This step only builds Asset Processor Batch and the necessary dependent modules.
    {{< /note >}}

## Generating Android projects on Windows  
The following instructions assume that you've completed the optional steps to set up environment variables and build O3DE and Asset Processor Batch.

1. Run Asset Processor Batch to process Android assets for the Atom Sample Viewer project.
   
    ```
    %O3DE_BUILD_ROOT%\windows\bin\profile\AssetProcessorBatch.exe --platforms=android --project-path %O3DE_PROJECT_PATH%
    ```

2. (Optional) Generate a KeyStore to allow APK signing. If you don't set up a signing key at this time, you can also set it up through Android Studio after generating the Android project.
   
    ```
    keytool -genkey -keystore %O3DE_ANDROID_SIGNCONFIG_FILE% -storepass %O3DE_ANDROID_SIGNCONFIG_STORE_PASSWORD% -alias %O3DE_ANDROID_SIGNCONFIG_KEY_ALIAS% -keypass %O3DE_ANDROID_SIGNCONFIG_KEY_PASSWORD% -keyalg RSA -keysize %O3DE_ANDROID_SIGNCONFIG_KEY_SIZE% -validity %O3DE_ANDROID_SIGNCONFIG_VALIDITY_DAYS% -dname %O3DE_ANDROID_DN%
    ```

3. Use Python to run `generate_android_project.py` and generate the Android project for Atom Sample Viewer. The following command by itself assumes you skipped step 2 and that you plan to create KeyStore settings through Android Studio after generating the project. Otherwise, if you did generate a KeyStore in step 2, then include the `--signconfig-*` options listed below and specify their values.
   
    ```
    %O3DE_ENGINE_PATH%\python\python.cmd %O3DE_ENGINE_PATH%\cmake\Tools\Platform\Android\generate_android_project.py --engine-root %O3DE_ENGINE_PATH% --project-path %O3DE_PROJECT_PATH% --build-dir %O3DE_BUILD_ROOT%\android --third-party-path %USERPROFILE%\.o3de\3rdParty --android-sdk-path %O3DE_ANDROID_SDK_PATH% --android-ndk-version %O3DE_ANDROID_NDK_VERSION% --android-sdk-platform %O3DE_ANDROID_SDK_API_LEVEL% --include-apk-assets --asset-mode %O3DE_ANDROID_ASSET_MODE%
    ```

4. Build the Android project.

    ```
    cd %O3DE_BUILD_ROOT%\android

    gradlew assembleProfile
    ```

    {{< note >}}
Alternatively, instead of using command line, you can open the folder `%O3DE_BUILD_ROOT%\android` directly in Android Studio and build the APK from there.
    {{< /note >}}


5. Deploy your project to an Android device.
   
    ```
    %O3DE_ENGINE_PATH%\python\python.cmd %O3DE_ENGINE_PATH%\cmake\Tools\Platform\Android\deploy_android.py --build-dir %O3DE_BUILD_ROOT%\android --configuration profile --clean -t %O3DE_ANDROID_DEPLOY_TYPE%
    ```
    {{< note >}}
The deployment tool relies on Android Debug Bridge (ADB), Android's command-line tool, to perform the deployment. You must set the target device to development mode and connect it to your machine using a USB. To set this up, follow the [Android instructions](https://developer.android.com/studio/debug/dev-options). Your target device may ask you to trust the host machine, which must enable to continue the deployment process.
    {{< /note >}}
