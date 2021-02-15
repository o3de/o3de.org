# Installing Atom

Atom is integrated into the built-in **BaseViewer** application and the **Open 3D Engine (O3DE)**. Atom's source code is also available to build from source. You can build Atom from source and explore BaseViewer on all supported platforms: PC, Android, Mac, and iOS. The O3DE game engine is only supported on PC. 

BaseViewer showcases a collection of interactive rendering samples. 
<!-- [WRITER NOTE: TODO. Add links]
For more information on using BaseViewer and the rendering samples, see the BaseViewer section. --> 
O3DE uses the Atom renderer. You can test out Atom features in the provided AtomTest project or in your own project. 
<!-- 
[WRITER NOTE: TODO. Add links]
For more information on using Atom in O3DE, see the AtomTest project in the O3DE section, and _Working with Atom in O3DE_. -->

## Download Atom
Download the Atom package from the ___ . *[WRITER NOTE: Atom is only released internally for now]* This package is for all supported platforms: PC, Android, Mac, and iOS. 

The Atom package includes the following files: 
* *Spectra_Atom_Staging-lumberyard-0.0-XXXXXXX-cmake_atom_all-XX.zip*
* *Spectra_Atom_Staging-lumberyard-0.0-XXXXXXX-cmake_atom_prebuilt-XX.zip*


When extracting *Spectra_Atom_Staging-lumberyard-0.0-XXXXXXX-cmake_atom_all-XX.zip*, it's recommended to rename the extracted root folder to something short to avoid path length limitations. For example, "C:\AtomBuild" as the root folder name and location is common practice. 

*Spectra_Atom_Staging-lumberyard-0.0-XXXXXXX-cmake_atom_all-XX.zip* contains everything required to build Lumberyard and Atom from source, but it does not include pre-built binaries. The supplemental zip file *Spectra_Atom_Staging-lumberyard-0.0-XXXXXXX-cmake_atom_prebuilt-XX.zip* includes pre-built binaries for Windows that can be used to run BaseViewer and the Lumberyard Editor without building from source. All other platforms (Mac, iOS, and Android) require being built from source.

## Required Software
Download the required software for your platform before installing Atom.

**PC and Android**
* You have installed the latest version of **Visual Studio 2019** and set it up to build CMake solutions.
* You have installed **CMake** and added it to your system "Path" environment variable. 

**Mac and iOS**
* You have installed the latest version of **Xcode**.
* You have installed **CMake** and synced to all required 3rd party libraries.

For installing VS 2019, see [Visual Studio 2019 for Atom](../setup/installing-vs2019.md).
For installing CMake, see [CMake for Atom](../setup/installing-cmake.md).

## PC
### Running Baseviewer

1. Unzip *Spectra_Atom_Staging-lumberyard-0.0-XXXXXXX-cmake_atom_all-XX.zip* and navigate to the folder *../dev/*.
   
2. Unzip *Spectra_Atom_Staging-lumberyard-0.0-XXXXXXX-cmake_atom_prebuilt-XX.zip* and copy the folder *windows_vs2019* to the folder *../dev/*.
   
3. Open the *bootstrap.cfg* file in a text editor and ensure that the `sys_game_folder` variable is set exactly as follows: `sys_game_folder=BaseViewer`
   
4. Launch BaseViewer by running *BaseViewerStandalone.exe* from the folder *../dev/windows_vs2019/bin/profile/*.  

    If this is your first time launching *BaseViewerStandalone.exe*, the Asset Processor application will open and begin processing assets for BaseViewer. Verify that the Asset Processor is building the required assets by checking that its status reads "Status: Working".
    
    If not, all assets have already been processed and BaseViewer will open as usual. 

    *Note: If you encounter the "Negotiation Failed" dialog, click OK and the Asset Processor should work normally.*

5. Allow the Asset Processor to finish building any required assets. You can open the Asset Processor from the system tray to check the build progress. Verify that the Asset Processor is done building by checking that its status reads “Status: Idle”. 
   
    The Asset Processor will take a few minutes the first time you launch BaseViewer. Subsequent launches will take less time because they use the cached built data.
    
    *Note: Avoid running a sample in BaseViewer while the Asset Processor is still building because it might crash the application.*

6. Verify that the Asset Processor is done building by checking that its status reads “Status: Idle”. 
   
7. If BaseViewer isn’t open, run *BaseViewerStandalone.exe* again to open the BaseViewer window. 
   

### Running O3DE

1. Unzip *Spectra_Atom_Staging-lumberyard-0.0-XXXXXXX-cmake_atom_all-XX.zip* and navigate to the folder *../dev/*.
   
2. Unzip *Spectra_Atom_Staging-lumberyard-0.0-XXXXXXX-cmake_atom_prebuilt-XX.zip* and copy the folder *windows_vs2019* to the folder *../dev/*.

3. Open the file *bootstrap.cfg* in a text editor and ensure that the `sys_game_folder` variable is set exactly as follows: `sys_game_folder=AtomTest`

4. Launch the Lumberyard Editor application by running *Editor.exe* from the folder *../dev/windows_vs2019/bin/profile/*. 
   
   If this is your first time in the Editor, the Asset Processor application will open and begin processing assets for the Editor. (You can verify that the Asset Processor is building the required assets by checking that its status reads "Status: Working".) 
   
   If not, all assets have already been processed and the Editor will open as usual. 

5. Allow the Asset Processor to finish building any required assets. You can open the Asset Processor from the system tray to check the build progress. Verify that the Asset Processor is done building by checking that its status reads “Status: Idle”. 
   
    The Asset Processor will take a few minutes the first time you launch the Editor. Subsequent launches will take less time because they use the cached built data.

    *Note: Avoid opening a level in the Editor while the Asset Processor is still building because it might crash the application.*

<!-- 6. The login to O3DE window should open automatically and you can log into your Amazon account. (An Amazon account is required to use O3DE.)  

7. After logging in to your Amazon account, the Lumberyard Editor will open. 
   
[WRITER NOTE: Is this true for O3DE?]-->

6. Open an existing level or create a new level. 

### Building From Source (VS 2019)

1. Unzip *Spectra_Atom_Staging-lumberyard-0.0-XXXXXXX-cmake_atom_all-XX.zip*.
   
2. Open a command prompt and navigate to the folder *../dev/*.
   
3. Create a folder named “windows_vs2019” in the folder *../dev/* if it does not already exist.
   
4. Prepare Atom’s build system using CMake. Navigate to the *windows_vs2019* directory and run the following command:  
    `cmake .. -G "Visual Studio 16 2019" -A x64 -T host=x64 -DLY_3RDPARTY_PATH=<extracted zip location>\3rdParty\ -DLY_PROJECTS="AtomTest;BaseViewer"`

5. Once CMake finishes, open *Lumberyard.sln*. If it’s your first time to open the Lumberyard solution, it will default to the Debug configuration. It is highly recommended you use the Profile configuration instead.
   
6. In the _Lumberyard.sln_ file, you can build the *BaseViewer* or the *Editor* application. 
   
    1. To build *BaseViewer*, right click on BaseViewerStandalone project and select "Build". Set this project as your startup project and run. 
    
        Note: Make sure that the `sys_game_folder` variable is set exactly as follows: `sys_game_folder=AtomTest`. This variable can be found in the *bootstrap.cfg* file in the folder *../dev/*. 

    2.  To build the *Editor*, right click on the Editor (Sandbox/Editor) project and select "Build". Set this project your startup project and run.
   
        Note: Make sure that the `sys_game_folder` variable is set exactly as follows: `sys_game_folder=AtomTest`. This variable can be found in the *bootstrap.cfg* file in the *../dev/* folder. 

## Android
### Building and Running Baseviewer
1. First, follow the steps outlined in the *PC* instructions for *Running Baseviewer*.
   
2. Open the *BaseViewer\project.json* file and rename "executable_name" from "BaseViewerLauncher" to "BaseViewer.GameLauncher".
   
3. Open AssetProcessorPlatformConfig.ini in a text editor and set the ios variable: `es3 = enabled`
   
4. Navigate to the *../dev/windows_vs2019/bin/profile/ *folder and run *AssetProcessor.exe*. This opens the Asset Processor application and builds the required Android assets. 
   
5. The following command can be used to build the project. It's recommended to keep the project and builder folder name short (for example, "AtomBuild"). For NDK, SDK, KeyStore, Gradle, Ninja, and CMake, you can use the ones located in the folder *../3rdParty* or download from the internet (vendor source) to your local machine. See below for an example:
    
    `python.exe "AtomBuild\\dev\\cmake\\Tools\\generate_android_project.py" --dev-root "AtomBuild\\dev" --build-dir "arm" --third-party-path "AtomBuild\\3rdParty" --android-ndk-path "C:\\android-ndk-r21d" --android-sdk-path "C:\\Android\\Sdk" --android-ndk-version "21" --android-sdk-version 29 -g "BaseViewer" --include-apk-assets --asset-mode "LOOSE" --asset-type "es3" --signconfig-store-file "C:\\ly-android.keystore" --signconfig-store-password "android" --signconfig-key-alias android_key --signconfig-key-password android --gradle-install-path "C:\\gradle-5.6.4\\bin" --ninja-install-path "C:\\ninja-win" --cmake-install-path "C:\\CMake3-17-0\\bin"`  
        
    *Note: The Android build directory (--build_dir) value is "arm" to stay within the file path limit.*

6. Navigate to the Android build folder and run *gradlew.bat assembleProfile* to build the profile target.
   
7. Deploy to your device by running the deploy script. Use the following command: 
    `python.exe cmake/Tools/Platform/Android/deploy_android.py -b "arm" -c profile -t APK --clean`   
      
    *Note: Make sure `-t` is `APK` to load the asset from the APK instead of user folder.*

**Manual Validation (Recommended)**

1. Make sure that the Registry folder is in the asset folder: *\<root folder>/\<android build directory>/app/src/main/assets/Registry*.
   
2. Check that all the shared library files are in the intermediate folder: *\<root folder>/\<android build directory>/app/build/intermediates/cmake/profile/obj/arm64-v8a/profile*.
   
3. Check the APK manually. Navigate to the *\<root folder>/\<android build directory>/app/build/outputs/apk/profile/* directory. Rename “app-profile.apk” to “app-profile.zip” to unzip it and check that all the files are inside. 




## Mac
### Building and Running Baseviewer
1. Unzip *Spectra_Atom_Staging-lumberyard-0.0-XXXXXXX-cmake_atom_all-XX.zip* and navigate to the folder *../dev/*.
   
2. Open the file *bootstrap.cfg* in a text editor and ensure that the `sys_game_folder` variable is set exactly as follows: `sys_game_folder=BaseViewer`

3. Open Terminal and navigate to the folder *../dev/*.
   
4. Make sure that you have proper permissions by running the following command in the Terminal: `chmod +x Tools/Python/python3.sh`
   
5. Create a folder named “mac_xcode” in the folder *../dev/* if it does not already exist.
   
6. Set Atom’s build folder using CMake by running the following command: 
    `cmake . -B <extracted zip location>/dev/mac_xcode -G "Xcode" -DLY_3RDPARTY_PATH=<extracted zip location>/3rdParty/ -DLY_PROJECTS="BaseViewer" -DLY_UNITY_BUILD=ON`

7. Build Atom using CMake by running the following command: `cmake --build <extracted zip location>/dev/mac_xcode --target BaseViewerStandalone --config profile`

8. Launch the Asset Processor to build required assets. Run *AssetProcessor* in the *../dev/mac_xcode/bin/profile/* directory.  
    
    *Note: You are prompted to allow multiple files without a known publisher through the Mac OS "Security and Privacy" control panel. This is due to code signing issues on Mac that will be addressed in future versions.*

9.  Allow the Asset Processor to finish building any required assets. It might take a few minutes to build.   
    
    *Note: You might encounter a few shader errors — this is a known issue and can be safely ignored.*  

    *Note: You might encounter a crash when attempting to run a sample in BaseViewer while the Asset Processor is still building.* 

10. Run *BaseViewerStandalone* from the *../dev/mac_xcode/bin/profile/* folder. 
    
11. Test out the various RHI, RPI, and Feature samples.  
    
    *Note: There are some known issues on the Mac platform with certain samples.*



## iOS

### Building and Running Baseviewer

1. First, follow the steps outlined in the *Mac* instructions for *Running Baseviewer*.
2. Open *AssetProcessorPlatformConfig.ini* in a text editor and set the ios variable: `ios = enabled`
3. Navigate to the *../dev/mac_xcode/bin/profile/* folder and run *AssetProcessor*. This opens the Asset Processor application and builds the required iOS assets.
4. Create a new folder named "gems" in the folder `../dev/Cache/BaseViewer/ios/`. 
5. Create a new folder named “ios_xcode” in the folder `../dev/`, if it does not already exist.
6. Set Atom’s build folder using CMake by running the following command:
     `cmake -B <extracted zip location>/dev/ios_xcode -G "Xcode" -DCMAKE_TOOLCHAIN_FILE=cmake/Platform/iOS/Toolchain_ios.cmake -DLY_MONOLITHIC_GAME=1 -DLY_3RDPARTY_PATH=<extracted zip location>/3rdParty/ -DLY_PROJECTS="BaseViewer" -DLY_UNITY_BUILD=ON`
7. Open the generated Xcode solution located at `../dev/mac_xcode`, which you can use to build and deploy to your device.
8. Test out the various RHI, RPI, and Feature samples.  
    *Note: There are some known issues on the iOS platform with certain samples.*

