# Installing Atom

Atom is integrated into the built-in **BaseViewer** application and the **Open 3D Engine (O3DE)**, Atom's source code is also available to build from source. You can build Atom from source and explore BaseViewer on all supported platforms: PC, Android, Mac, and iOS. The O3DE game engine is only supported on PC. 

## Download Atom
Download the Atom package from the ___ . *[WRITER NOTE: Atom is only released internally for now]* This package is for all supported platforms: PC, Android, Mac, and iOS. 

The Atom package includes the following files: 
* *Spectra_Atom_Staging-lumberyard-0.0-XXXXXXX-cmake_atom_all-XX.zip*
* *Spectra_Atom_Staging-lumberyard-0.0-XXXXXXX-cmake_atom_prebuilt-XX.zip*


When extracting *Spectra_Atom_Staging-lumberyard-0.0-XXXXXXX-cmake_atom_all-XX.zip* you should rename the extracted root folder to something short to avoid path length limitations. For example "C:\LY" as the root folder name and location is common practice. 

*Spectra_Atom_Staging-lumberyard-0.0-XXXXXXX-cmake_atom_all-XX.zip* contains everything required to build Lumberyard and Atom from source, but it does not include pre-built binaries. The supplemental zip file *Spectra_Atom_Staging-lumberyard-0.0-XXXXXXX-cmake_atom_prebuilt-XX.zip* includes pre-built binaries for Windows that can be used to run BaseViewer and the Lumberyard Editor without needing to build from source. All other platforms (Mac, iOS, and Android require being built from source).

*Note: Do not use *SetupAssistant.bat*. Setup Assistant is deprecated in Lumberyard 2.0, please follow the instructions below instead to get started.*

## Required Software
Download the required software for your platform before installing Atom.

**PC and Android**
* You have installed **Visual Studio 2019** version __ or greater and it is set up to build CMake solutions.
* You have installed **CMake** and added it to your Systems Path Environment Variable. 

**Mac and iOS**
* You have the latest version of **Xcode** installed
* You have installed **CMake** and synced to all required 3rd party libraries

For installing VS 2019, see [Visual Studio 2019 for Atom](../setup/installing-vs2019.md).
 For installing Cmake, see [CMake for Atom](../setup/installing-cmake.md).

## PC
### Running Baseviewer

1. Unzip *Spectra_Atom_Staging-lumberyard-0.0-XXXXXXX-cmake_atom_all-XX.zip* and navigate to the *\<extracted zip location>/dev/* folder.
2. Unzip *Spectra_Atom_Staging-lumberyard-0.0-XXXXXXX-cmake_atom_prebuilt-XX.zip* and copy the *windows_vs2019* folder to the *<extracted zip location>/dev/* folder.
3. Open the *bootstrap.cfg* file in a text editor and ensure that the sys_game_folder variable is set exactly as follows: sys_game_folder=BaseViewer
4. Navigate to *\<extracted zip location>/dev/windows_vs2019/bin/profile/ *folder and run *BaseViewerStandalone**.exe. *This opens the BaseViewer and the Asset Processor applications. 
    If it’s your first time launching *BaseViewerStandalone.exe*, it may be that only the Asset Processor application opens. If you encounter the "Negotiation Failed" dialog, click OK and the Asset Processor should work normally.
5. Allow the Asset Processor to finish building any required assets. If it’s your first time launching *BaseViewerStandalone.exe*, the Asset Processor may take a few minutes to build. You can view the Asset Processor in the system tray to check its progress. 
    Note: It is possible to encounter a crash when attempting to run a sample in BaseViewer while the Asset Processor is still building. 
6. Verify that the Asset Processor is done building by checking that its status reads “Status: Idle”. 
7. If BaseViewer isn’t open, run BaseViewerStandalone.exe again to open the BaseViewer window. 

BaseViewer is up and running! Here you can explore a collection of rendering samples. For more information on using BaseViewer and the rendering samples, see BaseViewer section. 

### Running Lumberyard Editor

1. Unzip *Spectra_Atom_Staging-lumberyard-0.0-XXXXXXX-cmake_atom_all-XX.zip* and navigate to *\<extracted zip location>/dev/* folder.
2. Unzip *Spectra_Atom_Staging-lumberyard-0.0-XXXXXXX-cmake_atom_prebuilt-XX.zip* and copy the windows_vs2019 folder to *\<extracted zip location>/dev/* folder.
3. Open the *bootstrap.cfg* file in a text editor and ensure that the sys_game_folder variable is set *exactly* as follows: sys_game_folder=AtomTest
4. Navigate to *\<extracted zip location>/dev/windows_vs2019/bin/profile/* and run *Editor.exe*. This opens the Lumberyard Editor application. If it’s your first time Verify that the Asset Processor is building the required assets by checking that its status reads "Status: Working". 
5. 5. Allow the Asset Processor to finish building any required assets, you'll find the Asset Processor in the system tray which you can open to check it's progress. It is possible to encounter a crash if the Asset Processor has not finished and you try to open a level. This will take a few minutes the first time you launch the Editor (subsequent launches will use the cached built data).
6. The Login to Amazon Lumberyard window should open automatically and you can log into your Amazon account. (An Amazon account is required to use Lumberyard.) [WRITER NOTE: This will probably change with O3DE.]
7. After logging in to your Amazon account, the Lumberyard Editor will open automatically. 

Lumberyard is up and running! Here you can test out Atom features in the provided AtomTest project, or use the Atom renderer in your own project.  For more information on using Atom in O3DE, see AtomTest project in O3DE section and Working with Atom in O3DE.

### Building From Source (VS 2019)

1. Unzip *Spectra_Atom_Staging-lumberyard-0.0-XXXXXXX-cmake_atom_all-XX.zip*. 
2. Open a command prompt and navigate to the *\<extracted zip location>/dev/* folder.
3. Create a folder named “windows_vs2019” in the *<extracted zip location>/dev/* folder if it does not already exist.
4. Prepare Atom’s build system using CMake. Navigate to the *windows_vs2019* directory and run the following command: 
    `cmake .. -G "Visual Studio 16 2019" -A x64 -T host=x64 -DLY_3RDPARTY_PATH=<extracted zip location>\3rdParty\ -DLY_PROJECTS="AtomTest;BaseViewer"`
5. Once CMake finishes, open *Lumberyard.sln*. If it’s your first time to open the Lumberyard solution, it will default to the Debug configuration. It is highly recommended you use the Profile configuration instead.
6. In the Lumberyard.sln, you can build *BaseViewer* or the *Editor* applications. 
    1. To build *BaseViewer*, right click on BaseViewerStandalone project and select "Build". Set as your startup project and run. 
        Note: Make sure the sys_game_folder variable is set exactly as follows: sys_game_folder=BaseViewer. This variable can be found in the *bootstrap.cfg* file in the *\<extracted zip location>/dev/* folder. 
    2. To build the *Editor*, right click on Editor (Sandbox/Editor) project and select "Build". Set as your startup project and run.
        Note: Make sure the sys_game_folder variable is set exactly as follows: sys_game_folder=AtomTest. This variable can be found in the *bootstrap.cfg* file in the *\<extracted zip location>/dev/* folder. 

## Android
### Building and Running Baseviewer
1. First, follow the steps outlined in the *PC* instructions for *Running Baseviewer*.
2. Open the *BaseViewer\project.json* file and rename "executable_name" from "BaseViewerLauncher" to "BaseViewer.GameLauncher".
3. Open AssetProcessorPlatformConfig.ini in a text editor and set the ios variable: `es3 = enabled`
4. Navigate to the *\<extracted zip location>/dev/windows_vs2019/bin/profile/ *folder and run *AssetProcessor.exe*. This opens the Asset Processor application and builds the required Android assets. 
5. The following command can be used to build the project - be careful not to make the project and build folder too long (e.g. \<extracted zip location> as short as possible). For NDK, SDK, keystore, gradle, ninja, and CMake, you can use the ones located in 3rdParty or download from the internet (e.g. vendor website) to your local machine. See below for an example:
    
    `python.exe "<extracted zip location>\\dev\\cmake\\Tools\\generate_android_project.py" --dev-root "<extracted zip location>\\dev" --build-dir "arm" --third-party-path "<extracted zip location>\\3rdParty" --android-ndk-path "C:\\android-ndk-r21d" --android-sdk-path "C:\\Android\\Sdk" --android-ndk-version "21" --android-sdk-version 29 -g "BaseViewer" --include-apk-assets --asset-mode "LOOSE" --asset-type "es3" --signconfig-store-file "C:\\ly-android.keystore" --signconfig-store-password "android" --signconfig-key-alias android_key --signconfig-key-password android --gradle-install-path "C:\\gradle-5.6.4\\bin" --ninja-install-path "C:\\ninja-win" --cmake-install-path "C:\\CMake3-17-0\\bin"`  
        
    *Note: the android build directory (--build_dir) is "arm" to stay within the file path limit.*
6. Navigate to the android build folder and run *gradlew.bat assembleProfile* to build profile target.
7. Deploy to device by running the deploy script. Use the following command: 
    `python.exe cmake/Tools/Platform/Android/deploy_android.py -b "arm" -c profile -t APK --clean`   
      
    *Note: Make sure `-t` is `APK` to load the asset from the apk instead of user folder.*

**Manual Validation (Recommended)**

1. Make sure Registry folder is in the asset folder: *\<root folder>/\<android build directory>/app/src/main/assets/Registry*
2. Check that all the shared library files are in the intermediate folder: *\<root folder>/\<android build directory>/app/build/intermediates/cmake/profile/obj/arm64-v8a/profile*
3. Check the apk manually. Navigate to the *\<root folder>/\<android build directory>/app/build/outputs/apk/profile/* directory. Rename “app-profile.apk” to “app-profile.zip” to unzip it and check that all the files are inside. 




## Mac
### Building and Running Baseviewer
1. Unzip *Spectra_Atom_Staging-lumberyard-0.0-XXXXXXX-cmake_atom_all-XX.zip* and navigate to the *\<extracted zip location>/dev/* folder.
2. Open *bootstrap.cfg* in a text editor and ensure that the `sys_game_folder` variable is set exactly as follows: `sys_game_folder=BaseViewer`
3. Open Terminal and navigate to the *\<extracted zip location>/dev/* folder.
4. Make sure you have proper permissions by running the following command in the Terminal: `chmod +x Tools/Python/python3.sh`
5. Create a folder named “mac_xcode” in the *\<extracted zip location>/dev/* folder if it does not already exist.
6. Set Atom’s build folder using CMake by running the following command: 
    `cmake . -B <extracted zip location>/dev/mac_xcode -G "Xcode" -DLY_3RDPARTY_PATH=<extracted zip location>/3rdParty/ -DLY_PROJECTS="BaseViewer" -DLY_UNITY_BUILD=ON`
7. Build Atom using CMake by running the following command: `cmake --build <extracted zip location>/dev/mac_xcode --target BaseViewerStandalone --config profile`
8. Launch the Asset Processor to build required assets. Run *AssetProcessor* in the *\<extracted zip location>/dev/mac_xcode/bin/profile/* directory.  
    *Note: You will prompted allow multiple files without a known publisher through the Mac OS "Security and Privacy" control panel. This is due to code signing issues on Mac that will be addressed in future versions.*
9. Allow the Asset Processor to finish building any required assets. It may take a few minutes to build.   
    *Note: You may encounter a few shader errors — this is a known issue and can be safely ignored.*  
    *Note: It is possible to encounter a crash when attempting to run a sample in BaseViewer while the Asset Processor is still building.* 
10. Run *BaseViewerStandalone* from the *\<extracted zip location>/dev/mac_xcode/bin/profile/* folder. 
11. Test out the various RHI, RPI, and Feature samples.  
    *Note: There are some known issues on the Mac platform with certain samples.*



## iOS

### Building and Running Baseviewer

1. First, follow the steps outlined in the *Mac* instructions for *Running Baseviewer*.
2. Open *AssetProcessorPlatformConfig.ini* in a text editor and set the ios variable: `ios = enabled`
3. Navigate to the *\<extracted zip location>/dev/mac_xcode/bin/profile/* folder and run *AssetProcessor*. This opens the Asset Processor application and builds the required iOS assets.
4. Create a new folder named *gems* in the folder, *\<extracted zip location>/dev/Cache/BaseViewer/ios/*. 
5. Create a new folder named “ios_xcode” in the *\<extracted zip location>/dev/* folder if it does not already exist.
6. Set Atom’s build folder using CMake by running the following command:
     `cmake -B <extracted zip location>/dev/ios_xcode -G "Xcode" -DCMAKE_TOOLCHAIN_FILE=cmake/Platform/iOS/Toolchain_ios.cmake -DLY_MONOLITHIC_GAME=1 -DLY_3RDPARTY_PATH=<extracted zip location>/3rdParty/ -DLY_PROJECTS="BaseViewer" -DLY_UNITY_BUILD=ON`
7. Open the generated Xcode solution located at *\<extracted zip location>/dev/mac_xcode* which you can use to build and deploy to your device.
8. Test out the various RHI, RPI, and Feature samples.  
    *Note: There are some known issues on the iOS platform with certain samples.*

