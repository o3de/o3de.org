---
title: Generating an Android project on Windows
linkTitle: Android Project Generation
description: Step by step guide to generating and deploying an Android project
weight: 200
---

# **Example Workflow**

The following workflow will describe the steps to build and deploy a specific project (Atom Sample Viewer) to an Android device running Android version 10. The steps will use the `D:\` drive on windows as a basis. The following prerequisites must also be satisfied in order for the steps to work:

1.  Steps are performed in a Windows host machine.
2.  Android Studio and Android SDK are installed
3.  JDK development kit is installed and on the system path
4.  Gradle is installed and on the system path
5.  CMake 3.21 or newer is installed and on the system path
6.  Ninja build system is installed and on the system path
7.  Git is installed
8.  [O3DE](https://github.com/o3de/o3de.git) has been cloned locally on the system (to D:\\github\\o3de)
9.  [Atom Sample Viewer](https://github.com/o3de/o3de-atom-sampleviewer.git) has been cloned locally on the system (to D:\\github\\o3de-atom-sampleviewer)

## **Sample Environment and Settings**

To simplify the different paths and values that are fed through out the process, we will use environment variables to control the settings.

**Source and Build directories**

```
SET O3DE_ENGINE_PATH=D:\github\o3de
SET O3DE_PROJECT_PATH=D:\github\o3de-atom-sampleviewer
SET O3DE_BUILD_ROOT=D:\build_asv
```

{{< note >}}
Note that the `O3DE_PROJECT_PATH` can be changed to different projects
{{< /note >}}

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

**Step 1. Register the engine and project paths**

```

cd %O3DE_ENGINE_PATH%

%O3DE_ENGINE_PATH%\scripts\o3de.bat register -ep %O3DE_ENGINE_PATH%

%O3DE_ENGINE_PATH%\scripts\o3de.bat register -pp %O3DE_PROJECT_PATH%

```

**Step 2. Generate the cmake build directory for windows / vs2019 (for the android assets)**

```
cmake -B %O3DE_BUILD_ROOT%\windows -S %O3DE_ENGINE_PATH% -G"Visual Studio 16 2019" -DLY_PROJECTS=%O3DE_PROJECT_PATH% -DLY_UNITY_BUILD=ON
```

**Step 3. Build the Asset Processor Batch project in profile mode to process the assets**

```
cmake --build %O3DE_BUILD_ROOT%\windows --config profile --target AssetProcessorBatch -- /m /nologo
```

**Step 4. Run Asset Processor Batch for android and Atom Sample Viewer**

```
%O3DE_BUILD_ROOT%\windows\bin\profile\AssetProcessorBatch.exe  --platforms=android --project-path %O3DE_PROJECT_PATH%
```

**Step 5. Generate a key store to be able to self-sign an APK**

```
keytool -genkey -keystore %O3DE_ANDROID_SIGNCONFIG_FILE% -storepass %O3DE_ANDROID_SIGNCONFIG_STORE_PASSWORD% -alias %O3DE_ANDROID_SIGNCONFIG_KEY_ALIAS% -keypass %O3DE_ANDROID_SIGNCONFIG_KEY_PASSWORD% -keyalg RSA -keysize %O3DE_ANDROID_SIGNCONFIG_KEY_SIZE% -validity %O3DE_ANDROID_SIGNCONFIG_VALIDITY_DAYS% -dname %O3DE_ANDROID_DN%
```

**Step 6. Generate the android project**

```
%O3DE_ENGINE_PATH%\python\python.cmd %O3DE_ENGINE_PATH%\cmake\Tools\Platform\Android\generate_android_project.py --engine-root %O3DE_ENGINE_PATH% --project-path %O3DE_PROJECT_PATH% --build-dir %O3DE_BUILD_ROOT%\android --third-party-path %USERPROFILE%\.o3de\3rdParty --android-sdk-path %O3DE_ANDROID_SDK_PATH% --android-ndk-version %O3DE_ANDROID_NDK_VERSION%  --android-sdk-platform %O3DE_ANDROID_SDK_API_LEVEL% --include-apk-assets --asset-mode %O3DE_ANDROID_ASSET_MODE% --signconfig-store-file %O3DE_ANDROID_SIGNCONFIG_FILE% --signconfig-store-password %O3DE_ANDROID_SIGNCONFIG_STORE_PASSWORD% --signconfig-key-alias %O3DE_ANDROID_SIGNCONFIG_KEY_ALIAS% --signconfig-key-password %O3DE_ANDROID_SIGNCONFIG_KEY_PASSWORD% --overwrite-existing
```

{{< note >}}
At this point, you can alternatively open the folder %O3DE_BUILD_ROOT%\android directly in Android Studio and build the APK from there instead of using command line in the next step.
{{< /note >}}

**Step 7. Build the android project**

```
cd %O3DE_BUILD_ROOT%\android

gradlew assembleProfile
```


**Step 8. Deploy to the android device**

```
%O3DE_ENGINE_PATH%\python\python.cmd %O3DE_ENGINE_PATH%\cmake\Tools\Platform\Android\deploy_android.py --build-dir %O3DE_BUILD_ROOT%\android --configuration profile --clean -t %O3DE_ANDROID_DEPLOY_TYPE%
```

