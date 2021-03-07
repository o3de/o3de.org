---
title: "Setting Up Atom"
description: "Setting up Atom Rendering Engine"
date: 2021-03-4
toc: true
weight: 200
---

Atom is integrated into the built-in **Atom Sample Viewer** (formerly *BaseViewer*) application and the **Open 3D Engine (O3DE)**. Atom's source code is also available to build from source. You can build Atom from source and explore Atom Sample Viewer on all supported platforms: PC, Android, Mac, and iOS. The O3DE game engine is only supported on PC. 

Atom Sample Viewer showcases a collection of interactive rendering samples. 
<!-- [WRITER NOTE: TODO. Add links]
For more information on using Atom Sample Viewer and the rendering samples, see the Atom Sample Viewer section. --> 
O3DE uses the Atom renderer. You can test out Atom features in the provided AtomTest project or in your own project. 
<!-- 
[WRITER NOTE: TODO. Add links]
For more information on using Atom in O3DE, see the AtomTest project in the O3DE section, and _Working with Atom in O3DE_. -->

## Required Software
Download the required software for your platform before setting up Atom.

**PC and Android**
* You have installed the latest version of **Visual Studio 2019** and set it up to build CMake solutions.
* You have installed **CMake** and added it to your system "Path" environment variable. 

**Mac and iOS**
* You have installed the latest version of **Xcode**.
* You have installed **CMake** and synced to all required 3rd party libraries.

To install Visual Studio 2019, [get it from Microsoft](https://visualstudio.microsoft.com/downloads/). For CMake, [download and install](https://cmake.org/download/) and then check out the [O3DE build documentation](/docs/user-guide/features/build).

## Setting Up Visual Studio 2019
The minimum required version of Visual Studio supported is 16.2.4. 

Launch the Visual Studio Installer and enable the following components for Visual Studio 2019: 
* Under **Workloads** tab, in the **Desktop & Mobile section**, ensure that the following dependencies are included:
    * Desktop development with C++
    * Universal Windows Platform development
    * Mobile development with C++
* Under **Individual** components, ensure the following dependencies are included:
    * Windows Universal CRT SDK
    * C++ ATL for v141 build tools (x86 & x64)

## For PC
### Running Atom Sample Viewer 
   
1. Open the file */dev/bootstrap.cfg* in a text editor and ensure that the `sys_game_folder` variable is set exactly as follows: `sys_game_folder=BaseViewer`
   
2. Launch Atom Sample Viewer by running *AtomSampleViewerStandalone.exe* from the folder `dev/windows_vs2019/bin/profile/`.  

    If this is your first time launching *AtomSampleViewerStandalone.exe*, the Asset Processor application will open and begin processing assets for Atom Sample Viewer. Verify that the Asset Processor is building the required assets by checking that its status reads "Status: Working".
    
    If not, all assets have already been processed and Atom Sample Viewer will open as usual. 

    {{< note >}}
 If you encounter the "Negotiation Failed" dialog, click OK and the Asset Processor should work normally.
    {{< /note >}}

3. Allow the Asset Processor to finish building any required assets. You can open the Asset Processor from the system tray to check the build progress. Verify that the Asset Processor is done building by checking that its status reads “Status: Idle”. 
   
    The Asset Processor will take a few minutes the first time you launch Atom Sample Viewer. Subsequent launches will take less time because they use the cached built data.
    
    {{< note >}}
 Avoid running a sample in Atom Sample Viewer while the Asset Processor is still building. The application might crash.    
    {{< /note >}}

4. Verify that the Asset Processor is done building by checking that its status reads “Status: Idle”. 
   
5. If Atom Sample Viewer isn’t open, run *AtomSampleViewerStandalone.exe* again to open the Atom Sample Viewer window. 
   

### Running Open 3D Engine (O3DE)

1. Open the file */dev/bootstrap.cfg* in a text editor and ensure that the `sys_game_folder` variable is set exactly as follows: `sys_game_folder=AtomTest`

2. Launch the O3DE Editor application by running *Editor.exe* from the folder `dev/windows_vs2019/bin/profile/`. 
   
   If this is your first time in the Editor, the Asset Processor application will open and begin processing assets for the Editor. (You can verify that the Asset Processor is building the required assets by checking that its status reads "Status: Working".) 
   
   If not, all assets have already been processed and the Editor will open as usual. 

3. Allow the Asset Processor to finish building any required assets. You can open the Asset Processor from the system tray to check the build progress. Verify that the Asset Processor is done building by checking that its status reads “Status: Idle”. 
   
    The Asset Processor will take a few minutes the first time you launch the Editor. Subsequent launches will take less time because they use the cached built data.

    {{< note >}}
 Avoid opening a level in the Editor while the Asset Processor is still building. The application might crash.
    {{< /note >}}

4. Open an existing level or create a new level. 

### Building From Source (VS 2019)

1. Open a command prompt and navigate to the folder `dev/`.
   
2. Create a folder named “windows_vs2019” in the folder `dev/` if it does not already exist.
   
3. Prepare Atom’s build system using CMake. Navigate to the folder `dev/windows_vs2019` and run the following command:  
    `cmake .. -G "Visual Studio 16 2019" -A x64 -T host=x64 -DLY_3RDPARTY_PATH=<3rdparty-libs-dir> -DLY_PROJECTS="AtomTest;BaseViewer"`

    {{< note >}}
 Replace `<3rdparty-libs-dir>` with the path to your 3rd party libraries directory.
    {{< /note >}}

4. When CMake finishes building, open the Open 3D Engine (O3DE) solution. If it’s your first time to open the O3DE solution, it will default to the Debug configuration. It is highly recommended you use the Profile configuration instead.
   
<!-- [todo] Provide path to the Solution file. --> 

5. In the O3DE solution, you can build the *Atom Sample Viewer* or the *Editor* targets. 
   
    1. To build *Atom Sample Viewer*, right-click on the AtomSampleViewerStandalone project and select "Build". Set this project as your startup project and run it. 
    
        Note: Make sure that the `sys_game_folder` variable is set exactly as follows: `sys_game_folder=BaseViewer`. This variable can be found in the file */dev/bootstrap.cfg*.

    2.  To build the *Editor*, right click on the Editor (Sandbox/Editor) project and select "Build". Set this project as your startup project and run it.
   
        Note: Make sure that the `sys_game_folder` variable is set exactly as follows: `sys_game_folder=AtomTest`. This variable can be found in the file */dev/bootstrap.cfg*.

## For Android
### Building and Running Atom Sample Viewer
1. First, follow the steps outlined in the [**Running Atom Sample Viewer**](#running-atom-sample-viewer) section under **For PC**.
   
2. Open the file */BaseViewer/project.json* and rename "executable_name" from "BaseViewerLauncher" to "BaseViewer.GameLauncher".
   
3. Open the file *AssetProcessorPlatformConfig.ini* in a text editor and enable the Android assets: `es3 = enabled`
   
4. Navigate to the folder *dev/windows_vs2019/bin/profile/* and run *AssetProcessor.exe*. This opens the Asset Processor application and builds the required Android assets. 
   
5. The following command can be used to build the project. It's recommended to keep the project and builder folder name short (for example, "AtomBuild"). The Atom build requires 3rd party packages. For NDK, SDK, KeyStore, Gradle, Ninja, and CMake, you can use the packages located in the folder *3rdParty/* or download from the internet (your vendor source) to your local machine. See below for an example:
    
    `python.exe "AtomBuild\\dev\\cmake\\Tools\\generate_android_project.py" --dev-root "AtomBuild\\dev" --build-dir "arm" --third-party-path "AtomBuild\\3rdParty" --android-ndk-path "C:\\android-ndk-r21d" --android-sdk-path "C:\\Android\\Sdk" --android-ndk-version "21" --android-sdk-version 29 -g "Atom Sample Viewer" --include-apk-assets --asset-mode "LOOSE" --asset-type "es3" --signconfig-store-file "C:\\ly-android.keystore" --signconfig-store-password "android" --signconfig-key-alias android_key --signconfig-key-password android --gradle-install-path "C:\\gradle-5.6.4\\bin" --ninja-install-path "C:\\ninja-win" --cmake-install-path "C:\\CMake3-17-0\\bin"`  
        
    {{< note >}}
 The Android build directory (--build_dir) value is "arm" to stay within the file path limit.        
    {{< /note >}}

6. Navigate to the Android build folder and run *gradlew.bat assembleProfile* to build the profile target.
   
7. Deploy to your device by running the deploy script. Use the following command: 
    `python.exe cmake/Tools/Platform/Android/deploy_android.py -b "arm" -c profile -t APK --clean`   
      
    {{< note >}}
 Make sure the `-t` value is `APK` to load the asset from the APK instead of the user folder.      
    {{< /note >}}

**Manual Validation (Recommended)**

1. Make sure that the Registry folder is in the asset folder */\<android-build-directory>/app/src/main/assets/Registry*.
   
2. Check that all the shared library files are in the intermediate folder */\<android-build-directory>/app/build/intermediates/cmake/profile/obj/arm64-v8a/profile*.
   
3. Check the APK manually. Navigate to the folder */\<android-build-directory>/app/build/outputs/apk/profile/* . Rename “app-profile.apk” to “app-profile.zip” to unzip it and check that all the files are inside. 

    {{< note >}}
 Replace `<android-build-directory>` with your path to the Android build folder.
    {{< /note >}} 




## For Mac
### Building and Running Atom Sample Viewer
   
1. Open the file */dev/bootstrap.cfg* in a text editor and ensure that the `sys_game_folder` variable is set exactly as follows: `sys_game_folder=BaseViewer`

2. Open Terminal and navigate to the folder `dev/`.
   
3. Make sure that you have proper permissions by running the following command in the Terminal: `chmod +x Tools/Python/python3.sh`
   
4. Create a folder named “mac_xcode” in the folder `dev/` if it does not already exist.
   
    {{< note >}}
For the commands in the steps below, replace `<atom-build>` with your path to the Atom build folder.   
    {{< /note >}}

5. Set Atom’s build folder using CMake by running the following command: 
    `cmake . -B <atom-build>/dev/mac_xcode -G "Xcode" -DLY_3RDPARTY_PATH=<atom-build>/3rdParty/ -DLY_PROJECTS="BaseViewer" -DLY_UNITY_BUILD=ON`

6. Build Atom using CMake by running the following command: `cmake --build <atom-build>/dev/mac_xcode --target AtomSampleViewerStandalone --config profile`

7. Launch the Asset Processor to build required assets by running *AssetProcessor* from the folder `dev/mac_xcode/bin/profile/`.
    
    {{< note >}}
 You are prompted to allow multiple files without a known publisher through the Mac OS "Security and Privacy" control panel. This is due to code signing issues on Mac that will be addressed in future Atom versions.    
    {{< /note >}}

8.  Allow the Asset Processor to finish building any required assets. It might take a few minutes to build.   
    
    {{< note >}}
 You might encounter a few shader errors — this is a known issue and can be safely ignored.    
    {{< /note >}}  

    {{< note >}}
 Avoid running a sample in Atom Sample Viewer while the Asset Processor is still building. The application might crash.
    {{< /note >}}

9.  Run *AtomSampleViewerStandalone* from the folder `dev/mac_xcode/bin/profile/`. 
    
10. Test out the various RHI, RPI, and Feature samples.  
    
    {{< note >}}
 There are some known issues on the Mac platform with certain samples. The latest issues can be viewed in the [Atom Release Notes](../release-notes/_index.md).    
    {{< /note >}}



## For iOS

### Building and Running Atom Sample Viewer

1. First, follow the steps outlined in the [**Running Atom Sample Viewer**](#building-and-running-atom-sample-viewer-1) section under **For Mac**.
   
2. Open the file *AssetProcessorPlatformConfig.ini* in a text editor and enable the iOS assets: `ios = enabled`
   
3. Navigate to the folder `dev/mac_xcode/bin/profile/` and run *AssetProcessor*. This opens the Asset Processor application and builds the required iOS assets.
   
4. Create a new folder named "gems" in the folder `dev/Cache/BaseViewer/ios/`. 
   
5. Create a new folder named “ios_xcode” in the folder `dev/` if it does not already exist.
   
6. Set Atom’s build folder using CMake by running the following command:
     `cmake -B <atom-build>/dev/ios_xcode -G "Xcode" -DCMAKE_TOOLCHAIN_FILE=cmake/Platform/iOS/Toolchain_ios.cmake -DLY_MONOLITHIC_GAME=1 -DLY_3RDPARTY_PATH=<atom-build>/3rdParty/ -DLY_PROJECTS="BaseViewer" -DLY_UNITY_BUILD=ON`

    {{< note >}}
 Replace `<atom-build>` with your path to the Atom build folder.
    {{< /note >}}


7. Open the generated Xcode solution located in the folder `dev/mac_xcode` and use it to build and deploy to your device.

   
8. Test out the various RHI, RPI, and Feature samples.  

    {{< note >}}
 There are some known issues on the iOS platform with certain samples. The latest issues can be viewed in the [Atom Release Notes](../release-notes/_index.md).
    {{< /note >}}

