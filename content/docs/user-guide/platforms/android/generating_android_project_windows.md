---
title: Generating Android Projects on Windows
linkTitle: Generating Android Project
description: Step-by-step guide to generating and deploying an Android project for Open 3D Engine (O3DE).
weight: 200
---


In this tutorial, you will learn how to build and deploy an Android project in **Open 3D Engine (O3DE)**.

The following workflow describes the steps to build and deploy the Atom Sample Viewer project to a device that runs Android 20. You can also follow these steps to build your own project on any supported Android version. 

## Prerequisites

The following instructions assume that you have:

1.  Steps are performed in a Windows host machine.
1.  The software [prerequisites for Android](/docs/user-guide/platforms/android#Prerequisite software and packages) are satisfied.
1.  Latest version of [Android Studio](https://developer.android.com/studio)

1.  [O3DE](https://github.com/o3de/o3de.git) has been cloned locally on the system. Python must be initialized (through the `python\get_python.cmd` script), and the path must be [registered](/docs/welcome-guide/setup/setup-from-github/building-windows/#register-the-engine) as the engine.
1.  [Atom Sample Viewer](https://github.com/o3de/o3de-atom-sampleviewer.git) has been cloned locally on the system, and registered as an O3DE project through the [O3DE Command Line](docs/user-guide/project-config/cli-reference#register).
1.  A [signing configuration keystore](/docs/user-guide/platforms/android#APK Signing) is created (Either from Android Studio or the keytool command line)
1.  The **android** platform must be enabled in the [AssetProcessorPlatformConfig.setreg](https://github.com/o3de/o3de/blob/324c0317e9cf61428d3bec492c7ba243a08718f9/Registry/AssetProcessorPlatformConfig.setreg#L64-L70) in the engine root:
    ```json
    "Platforms": {
    //"pc": "enabled",
    "android": "enabled"
    //"ios": "enabled",
    //"mac": "enabled",
    //"server": "enabled"
    },
    ```

{{< note >}}
This example workflow represents the 'Source Engine' workflow when setting up [O3DE from GitHub](/docs/welcome-guide/setup/setup-from-github)
{{< /note >}}


## Set up environment variables

This tutorial will use the following environment variables in the example steps

- `O3DE_ENGINE_PATH`

  The local path where the [O3DE](https://github.com/o3de/o3de.git) repository was cloned to and registered.

- `O3DE_PROJECT_PATH`

  The local path where [Atom Sample Viewer](https://github.com/o3de/o3de-atom-sampleviewer.git) repository was cloned to and registered.

- `O3DE_PROJECT_NAME`

  The name of the project (`AtomSampleViewer`).

- `TARGET_ANDROID_PROJECT_PATH`

  The path write the Android Project Gradle script to.

- `ANDROID_SDK_HOME`

  The path to where the Android SDK is set to. This path must have the following sub path to the sdk manager command line:
  ```
  %ANDROID_SDK_HOME%\cmdline-tools\latest\bin\sdkmanager.bat

- `ANDROID_SIGNING_CONFIG_KEYSTORE_FILE`

  The key store file location for the [signing configuration](/docs/user-guide/platforms/android#APK_Signing) to use for APK signing.

- `ANDROID_SIGNING_CONFIG_KEY_ALIAS`

  The alias of the signing key in the key store file that will be used for the APK signing.

## Step by step instructions


1. **Build the tools and assets for Android for the project.**

   Configure and build the asset processing tools and process the assets.

   ```
   cd %O3DE_PROJECT_PATH%

   cmake -S . -B build/windows -DLY_DISABLE_TEST_MODULES=ON

   cmake --build build/windows --config profile --target AssetProcessorBatch

   cd %O3DE_PROJECT_PATH%\build\windows

   AssetProcessorBatch.exe --platform android

   ```

1. **Make sure all the licenses are accepted for the Android SDK**

   ```
   %ANDROID_SDK_HOME%\cmdline-tools\latest\bin\sdkmanager.bat --licenses
   ```
   (Follow the commands to accept the licenses if necessary)

1. **Configure the android environment settings**

   ```
   %O3DE_ENGINE_PATH%\scripts\o3de.bat android-configure --set-value sdk.root="%ANDROID_SDK_HOME%" --global

   %O3DE_ENGINE_PATH%\scripts\o3de.bat android-configure --set-value platform.sdk.api=31 --global

   %O3DE_ENGINE_PATH%\scripts\o3de.bat android-configure --set-value ndk.version=25* --global

   %O3DE_ENGINE_PATH%\scripts\o3de.bat android-configure --set-value android.gradle.plugin=8.1.0 --global

   ```

1. **Validate the settings and environment and correct any issues that are reported**

   ```
   %O3DE_ENGINE_PATH%\scripts\o3de.bat android-configure --validate
   ```

1. **Configure the Signing Config key store and alias**

   ```
   %O3DE_ENGINE_PATH%\scripts\o3de.bat android-configure --set-value signconfig.store.file="%ANDROID_SIGNING_CONFIG_KEYSTORE_FILE%" --global

   %O3DE_ENGINE_PATH%\scripts\o3de.bat android-configure --set-value signconfig.key.alias=%ANDROID_SIGNING_CONFIG_KEY_ALIAS% --global
   ```

1. **Set the Signing Config key store password**

   ```
   %O3DE_ENGINE_PATH%\scripts\o3de.bat android-configure --set-password signconfig.store.password --global
   ```
   Enter + confirm the password for the key store when prompted

1. **Set the Signing Config signing key password**
   ```
   %O3DE_ENGINE_PATH%\scripts\o3de.bat android-configure --set-password signconfig.key.password --global
   ```
   Enter + confirm the password for the key when prompted

1. **Run the Android project generation script**

   ```
   %O3DE_ENGINE_PATH%\scripts\o3de.bat android-generate -p %O3DE_PROJECT_NAME% -B %TARGET_ANDROID_PROJECT_PATH%
   ```

1. **Build the Android APK**

   ```
   cd %TARGET_ANDROID_PROJECT_PATH%

   gradlew.bat assembleProfile

   ```

1. **Deploy the Android APK**

   Using the [ADB](https://developer.android.com/tools/adb) tool in the Android SDK, connect and list the attached device(s)

   ```
   %ANDROID_SDK_HOME%\platform-tools\adb.exe devices
   ```
   
   You should see a list of devices (if there are any attached) and their attach status. If you don't see any attached devices, then either check the USB connection to the device, and make sure it is authorized to connect to the device (on the device itself).

   If you see something like the following:
   
   ```
   List of devices attached
   XXXXXXXXXXX     unauthorized
   ```

   This means that you need to authorize debugging on the computer for the device.

   Once all the authorizations are complete, you should see something like:

   ```
   List of devices attached
   XXXXXXXXXXX     device
   ```

   Once the android device is identified, and the computer is authorized to connect to the device. you will be able to install the APK

   ```
   %ANDROID_SDK_HOME%\platform-tools\adb.exe install -t -r %TARGET_ANDROID_PROJECT_PATH%\app\build\outputs\apk\profile\app-profile.apk
   ```
   