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
4.  Gradle is installed and on the system path
5.  CMake 3.21 or newer is installed and on the system path
6.  Ninja build system is installed and on the system path
7.  Git is installed
8.  [O3DE](https://github.com/o3de/o3de.git) has been cloned locally on the system (to D:\\github\\o3de)
9.  [Atom Sample Viewer](https://github.com/o3de/o3de-atom-sampleviewer.git) has been cloned locally on the system (to D:\\github\\o3de-atom-sampleviewer)

{{< note >}}
This example workflow represents the 'Source Engine' workflow when setting up [O3DE from GitHub](docs/welcome-guide/setup/setup-from-github)
{{< /note >}}


## (Optional) Set up environment variables

To simplify the different paths and values that are fed through out the process, we will use environment variables to control the settings.

**Source and Build directories**

```
SET O3DE_ENGINE_PATH=D:\github\o3de
SET O3DE_PROJECT_PATH=D:\github\o3de-atom-sampleviewer
SET O3DE_BUILD_ROOT=D:\build_asv
```

**Key Store Settings**

```
set O3DE_ANDROID_SIGNCONFIG_FILE=%O3DE_BUILD_ROOT%\o3de.keystore
set O3DE_ANDROID_SIGNCONFIG_STORE_PASSWORD=o3de_android
set O3DE_ANDROID_SIGNCONFIG_KEY_ALIAS=o3de_key
set O3DE_ANDROID_SIGNCONFIG_KEY_PASSWORD=o3de_android
set O3DE_ANDROID_SIGNCONFIG_KEY_SIZE=2048
set O3DE_ANDROID_SIGNCONFIG_VALIDITY_DAYS=10000
set O3DE_ANDROID_DN="cn=atom-sample-viewer, ou=o3de, o=LF, c=US"
```

{{< note >}}
While have signing keys is required to deploy to an android device, this step is optional. If you already have an existing JKS file generated earlier, and know the values for the store password, key password, alias, etc, then they can be used in place of these values. 
{{< /note >}}


**Android Project Generation Settings**

```
set O3DE_ANDROID_SDK_PATH=C:\Android\android-sdk
set O3DE_ANDROID_NDK_VERSION=22.*
set O3DE_ANDROID_SDK_API_LEVEL=29
set O3DE_ANDROID_ASSET_MODE=LOOSE
set O3DE_ANDROID_DEPLOY_TYPE=BOTH
```

{{< note >}}
The `O3DE_ANDROID_SDK_PATH` represents a specific location based on where you specify it in Android Studio or where you download and unpack the Android SDK Tools package
{{< /note >}}

<br/>

## Steps

{{< note >}}
Steps 1-3 is only needed if the windows build of O3DE has not been completed yet. These steps describe the minimal build necessary in order to process assets for Android and the game project.
{{< /note >}}


**Step 1. Generate the cmake build directory for windows / vs2019 (for the android assets)**

```
cmake -B %O3DE_BUILD_ROOT%\windows -S %O3DE_ENGINE_PATH% -G"Visual Studio 16 2019" -DLY_PROJECTS=%O3DE_PROJECT_PATH% -DLY_UNITY_BUILD=ON
```

**Step 2. Build the Asset Processor Batch project in profile mode to process the assets**

```
cmake --build %O3DE_BUILD_ROOT%\windows --config profile --target AssetProcessorBatch -- /m /nologo
```

{{< note >}}
This step will only build 'AssetProcessorBatch' and the necessary dependent modules. You can alternatively build the entire suite of tools, libraries, etc for windows by replacing `AssetProcessorBatch` with `ALL_BUILD`, or alternatively build from Visual Studio directly.
{{< /note >}}

**Step 3. Run Asset Processor Batch for android and Atom Sample Viewer**

```
%O3DE_BUILD_ROOT%\windows\bin\profile\AssetProcessorBatch.exe  --platforms=android --project-path %O3DE_PROJECT_PATH%
```

**Step 4. Generate a key store to be able to self-sign an APK**

```
keytool -genkey -keystore %O3DE_ANDROID_SIGNCONFIG_FILE% -storepass %O3DE_ANDROID_SIGNCONFIG_STORE_PASSWORD% -alias %O3DE_ANDROID_SIGNCONFIG_KEY_ALIAS% -keypass %O3DE_ANDROID_SIGNCONFIG_KEY_PASSWORD% -keyalg RSA -keysize %O3DE_ANDROID_SIGNCONFIG_KEY_SIZE% -validity %O3DE_ANDROID_SIGNCONFIG_VALIDITY_DAYS% -dname %O3DE_ANDROID_DN%
```

{{< note >}}
Even though a signing key is required for the project in order to deploy, it does not necessary to provide this at project creation. This can also be achieved through Android Studio after project creation. If this is the case, then the generate android command in the following step can omit all of the --signconfig-* arguments, and the key store settings can be created through Android Studio after opening the generated android project.
{{< /note >}}


3. Use Python to run `generate_android_project.py` and generate the Android project for Atom Sample Viewer. The following command by itself assumes you skipped step 2 and that you plan to create KeyStore settings through Android Studio after generating the project. Otherwise, if you did generate a KeyStore in step 2, then include the `--signconfig-*` options listed below and specify their values.

    ```
    %O3DE_ENGINE_PATH%\python\python.cmd %O3DE_ENGINE_PATH%\cmake\Tools\Platform\Android\generate_android_project.py --engine-root %O3DE_ENGINE_PATH% --project-path %O3DE_PROJECT_PATH% --build-dir %O3DE_BUILD_ROOT%\android --third-party-path %USERPROFILE%\.o3de\3rdParty --android-sdk-path %O3DE_ANDROID_SDK_PATH% --android-ndk-version %O3DE_ANDROID_NDK_VERSION% --android-sdk-platform %O3DE_ANDROID_SDK_API_LEVEL% --include-apk-assets --asset-mode %O3DE_ANDROID_ASSET_MODE%
    ```


**Step 6. Build the android project**

```
cd %O3DE_BUILD_ROOT%\android

gradlew assembleProfile
```


**Step 7. Deploy to the android device**

```
%O3DE_ENGINE_PATH%\python\python.cmd %O3DE_ENGINE_PATH%\cmake\Tools\Platform\Android\deploy_android.py --build-dir %O3DE_BUILD_ROOT%\android --configuration profile --clean -t %O3DE_ANDROID_DEPLOY_TYPE%
```
{{< note >}}
The deployment tool will rely on android's adb tool to perform the deployment. The target device must be placed in development mode, and connected to USB. Follow the [Android instructions](https://developer.android.com/studio/debug/dev-options) on how to do this. You may be ask to trust the host machine when deploying, and the deployment process will be blocked until you enable the device to trust the host machine.
{{< /note >}}

