# Building Your Android Game<a name="building-your-android-game"></a>

Set up your build environment and build an APK that can run on a device\.

**Topics**
+ [Selecting a Game Project for Android](#selecting-a-game-project-for-android)
+ [Preparing Your Assets for Android](#preparing-your-assets-for-android)
+ [Configuring the Build System](#configuring-the-build-system-for-android)
+ [Modifying the User Settings](#modifying-the-user-settings)
+ [Running the Remote Shader Compiler](#running-the-shader-compiler-for-android)
+ [Building Your Code with Android Studio](#building-your-code-with-android-studio)
+ [Debugging Your App Using Android Studio](#debug-your-app-with-android-studio)
+ [Using Android Studio as a Standalone Debugger](#using-android-studio-as-standalone-debugger)
+ [Building Code From the Command Line](#building-code-from-the-command-line)
+ [Deploying Your App and Assets](#deploying-your-app-and-assets)
+ [Creating a Packed APK](#creating-a-packed-APK)
+ [Creating a Release APK](#creating-a-release-APK)
+ [Using Your Signing Key](#using-your-signing-key)
+ [Building the Release APK](#building-the-release-APK)
+ [Creating Android Expansion Files](#creating-android-expansion-files-obb)

## Selecting a Game Project for Android<a name="selecting-a-game-project-for-android"></a>

By default Lumberyard ships with a game project called [Samples Project](sample-project-samples.md)\. You can use Samples Project for the rest of this guide or create your own game project\. 

**To select a game project**

1. Open the Project Configurator with your preferred method:
   + From the desktop, double\-click the Project Configurator icon\.
   + Open the Lumberyard Project Configurator, located at `lumberyard-version\dev\Bin64BuildPlatform\ProjectConfigurator.exe`\. For example, when using Visual Studio 2017 as your build platform, the Project Configurator is located at `lumberyard-version\dev\Bin64vc141\ProjectConfigurator.exe`\.

1. On the **Summary** page, select the project, and click **Set as default**\.
**Note**  
If you're an advanced user and want to learn more about the project settings that Project Configurator modifies, see [Game Project File](additional-details-for-android.md#game-project-file)\.

If you chose your own game project, see [Running Your Own Project](pak-files-for-android.md#running-your-own-android-project)\.

## Preparing Your Assets for Android<a name="preparing-your-assets-for-android"></a>

Next, you must configure Asset Processor to process your game assets for Android\.

1. Navigate to the `lumberyard_version\dev\` directory\.

1. In a text editor, open the `AssetProcessorPlatformConfig.ini` file\.

1. Remove the semicolon to uncomment `es3=enabled`, as shown in the following example\.

   ```
   [Platforms]
   ;pc=enabled
   es3=enabled
   ;ios=enabled
   ;osx_gl=enabled
   ```

1. Save the file\.

1. Open Asset Processor\.

   1. For PC, navigate to the `dev/Bin64vc141` directory\.

   1. For macOS, navigate to `dev/Bin64Mac` directory\.

   If Asset Processor is running, it automatically detects the change to the config file and restarts\. When Asset Processor finishes, the **Idle** status appears,  
![\[Wait for Asset Processor to process your changes.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/android/android-asset-processsor-idle-status.png)

## Configuring the Build System<a name="configuring-the-build-system-for-android"></a>

Next, configure the build system to generate your project files for Visual Studio/Xcode and for Android Studio\. These project files are also known as *solutions*\. If you already built the PC or macOS code, the following step should be familiar\.

**To configure the build system**

1. Navigate to the `lumberyard_version\dev` directory\.

1. In a command line prompt, enter the following command\.
   + For PC

     ```
     lmbr_waf.bat configure
     ```
   + For macOS

     ```
     sh lmbr_waf.sh configure
     ```

   The build system displays text like the following\.  
**Example Configure Output**  

   ```
   [WAF] 'Initialize Build Variants' starting...
   
   [WAF] Configure "android_armv8_clang - [debug,profile,release,performance]"
   [INFO] Using Visual Studio version 15 installed at: C:\Program Files (x86)\Microsoft Visual Studio\2017\Professional
   [WAF] Configure "win_x64_vs2017 - [profile,performance_dedicated,profile_test_dedicated,debug_dedicated,debug_test_dedicated,release,release_dedicated,debug_test,debug,performance,profile_dedicated,profile_test]"
   [WAF] 'Initialize Build Variants' successful (2.140s)
   [WAF] 'Configure Projects' starting...
   [WAF] 'Configure Projects' successful (2.983s)
   [WAF] 'configure' finished successfully (7.957s)
   [WAF] Executing 'msvs' in 'e:\lyengine\dev\BinTemp'
   [INFO] Using Visual Studio version installed at: C:\Program Files (x86)\Microsoft Visual Studio\2017\Professional
   [INFO] Generating Visual Studio 2017 solution.
   Creating e:\lyengine\dev\Solutions\LumberyardSDK_vs2017.sln
   [WAF] 'msvs' finished successfully (32.833s)
   [WAF] Executing 'generate_uber_files' in 'e:\lyengine\dev\BinTemp'
   [WAF] 'generate_uber_files' finished successfully (4.552s)
   [WAF] Executing 'android_studio' in 'e:\lyengine\dev\BinTemp'
   [INFO] Created at e:\lyengine\dev\Solutions\LumberyardAndroidSDK
   [WAF] 'android_studio' finished successfully (3.602s)
   If there are any problems the build system will dump out errors with potential
   ```

**Tip**  
If error messages appear, follow the steps in the message to resolve them\.

## Modifying the User Settings<a name="modifying-the-user-settings"></a>

Before building the game project, you must change a configuration file to speed up the compiling process and help with deployment\.

**To modify your user settings**

1. Navigate to the `lumberyard_version/dev/_WAF_/` directory\.

1. In a text editor, open the `user_settings.options` file\.

1. Under `[Build Options]`, set the `use_uber_files` to `True`\.  
**Example**  

   ```
   [Build Options]
   ....
   use_uber_files = True
   ....
   ```

1. Under `[Android Deploy]`, you can change the way the build system behaves after an APK is generated\. By default, the build system tries to install the APK to a device if one is connected to your PC\. For now, keep the default value of `True`\.  
**Example**  

   ```
   [Android Deploy]
   deploy_android = True
   ....
   ```

For information about additional build options, see [Deploying Your App and Assets](#deploying-your-app-and-assets)\.

## Running the Remote Shader Compiler<a name="running-the-shader-compiler-for-android"></a>

During development, your Lumberyard app attempts to connect to the [Remote Shader Compiler](mat-shaders-custom-dev-remote-compiler.md) to generate the shaders for your device\. 

There are three ways to connect to the shader compiler:

1. Use a reverse connection from your device to your PC\.

1. Specify an IP address of a PC running the shader compiler in a config file\.

1. Use Asset Processor\. For more information, see [Using the Virtual File System](using-the-virtual-filing-system-vfs.md)\.

**Note**  
The Remote Shader Compiler runs only on PCs\.

Use the reverse connection method if you're using Android 5\.0 \(API\-21\) with a device that runs the current and later versions of the operating system\.

**To use a reverse connection**

1. Navigate to the `lumberyard_version\dev` directory\.

1. In a text editor, open the `system_android_es3.cfg` file\.

1. For `r_ShaderCompilerServer`, enter the IP address to the local host \(for example, `127.0.0.1`\)\.

1. Save the file\.

1. At a command line prompt, enter the following\.

   ```
   adb reverse tcp:61453 tcp:61453
   ```

When you run your game, your app sends traffic through your USB connection to the shader compiler\.

**To specify the IP address**

If you're running the Remote Shader Compiler for the first time, create a file called `config.ini` next to the Remote Shader Compiler executable\. This config file tells the shader compiler which IP addresses that it can accept connections from\.

1. Navigate to the `lumberyard_version\dev directory`\.

1. In a text editor, open the `system_android_es3.cfg` file\.

1. For`r_ShaderCompilerServer`, enter the IP address of your computer\.

1. Save the file\.

1. Navigate to the `lumberyard_version/dev/Tools/CrySCompileServer/x64/profile` directory and create a file named `config.ini`, if it doesn't already exist\.

1. In a text editor, open the file and enter the following text\. Replace `<device ip address>` with the IP address, in CIDR format, of your Android device\.  
**Example**  

   ```
   whitelist=<device ip address>
   ```

1. Save the file\.

1. Launch the Remote Shader Compiler executable\.

**Note**  
If you're using a PC, you might need to change the settings on the Windows Firewall to allow traffic for the shader compiler\.

If you frequently distribute your application, it might be convenient to run the Remote Shader Compiler on an Amazon ECS GPU instance\. For more information, see [Running the Shader Compiler on Amazon EC2](ios-android-running-shader-compiler-amazon-EC2.md)\.

## Building Your Code with Android Studio<a name="building-your-code-with-android-studio"></a>

When you use Android Studio, you can use the project file to edit and build your code\. The Lumberyard build tools automatically create this project file for you\.

**To build your code with Android Studio**

1. Open Android Studio and select the **Import project \(Eclipse ADT, Gradle, etc\)**\.  
**Example**    
![\[Import your project into Android Studio.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/android/android-studio-build-code-1.png)

1. Navigate to the Android Studio project that you created using the configure command\. The default location is `lumberyard_version/dev/Solutions/LumberyardAndroidSDK`\.  
![\[Select your game project in Android Studio.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/android/android-studio-build-code-2.png)

1. Wait for the project to finish loading\. On the top left side of the window, click **Project** to view your files\.  
![\[Import your project into Android Studio.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/android/android-studio-build-code-3.png)

1. To change your build variants, open the **Build Variants** pane in the bottom left of the window\.  
![\[Change your build variants in Android Studio.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/android/android-studio-build-code-4.png)
**Note**  
This affects only the launcher target\. In the example, this is **SamplesProjectLauncher**\. The build configuration for other targets during the build process are ignored\.

## Debugging Your App Using Android Studio<a name="debug-your-app-with-android-studio"></a>

Use the following procedure to debug your app in Android Studio\.

**To debug your app**

1. In Android Studio, at the top middle of the window, in the **Run/Debug Configuration** drop\-down menu, select **Edit Configurations**\.

1. Select the launcher for your project, such as **SamplesProjectLauncher**\.  
![\[Select your game project in Android Studio.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/android/android-studio-build-code-5.png)

1. Click the project's **Run/Debug** configuration drop\-down menu and choose **Edit Configuration**\.  
![\[Edit the configurations for your game project in Android Studio.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/android/android-studio-build-code-6.png)

1. In the **Run/Debug Configuration** dialog box, click the **Debugger** tab, and expand the **\+** icon\.  
![\[Use the Run/Debug Configuration dialog box in Android Studio.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/android/android-studio-build-code-7.png)

1. Navigate to the location of the APK so that the debugger finds the symbols for your app\.  
![\[Set the path for the Symbol Directories in Android Studio.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/android/android-studio-build-code-8.png)

1. \(Optional\) Set the **Debug type** field to **Native** if you're not going to debug Java code\.

1. Place breakpoints in your code, if required\.

1. Click the **Play** button to start your app\.

## Using Android Studio as a Standalone Debugger<a name="using-android-studio-as-standalone-debugger"></a>

If you're not using Android Studio as your main IDE \(for example, you're using the command line to generate builds\), you can use Android Studio as a standalone debugger for your app\. You can do this in versions 3\.0 and later\.

**To use Android Studio as a standalone debugger**

1. In Android Studio, click **File**, **Profile or Debug APK**  
![\[Use Android Studio as a standalone debugger.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/android/android-studio-build-code-9.png)

1. Select your APK, click the **Run/Debug Configuration** drop\-down menu, and choose **Edit Configuration**\.  
![\[Edit Configurations in the Android Studio.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/android/android-studio-build-code-10.png)

1. In the dialog box, the **General** tab should be selected\. If you're using WAF to deploy your builds to your device, for **Installation Options**, for **Deploy**, select **Nothing**\.

1. For **Deployment Target Options**, for **Target**, select **USB Device**\.

1.   
![\[Make the general settings for your game project in Android Studio.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/android/android-studio-build-code-11.png)

1. Click the **Debugger** tab, and click the **\+** icon\.  
![\[Enter debugging for your game project in Android Studio.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/android/android-studio-build-code-12.png)

1. Navigate to the location of the APK so that the debugger finds the symbols for your app\.  
![\[Set the path for the Symbol Directories in Android Studio.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/android/android-studio-build-code-8.png)

1. Click the **Debug** icon to start the debugging session\.  
![\[Debug your game project in Android Studio.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/android/android-studio-build-code-13.png)

1. After the debugger session starts, open any C\+\+ files in the `lumberyard_version/dev` directory, place your breakpoints, and step through the code\.

**Note**  
If you see the error message `Please select Android SDK`, do the following:  
Choose **File**, **Project Structure**\.
On the left of the dialog box, click **Modules**\.
Click the **Dependencies** tab\.
Select the version of the SDK that you used to build your app\.
Repeat the steps to use the debugger in standalone mode\.

## Building Code From the Command Line<a name="building-code-from-the-command-line"></a>

Depending on your mode of development, you can build the following types\.
+ Debug – The slowest mode to run, but lets engineers see their code under a debugger\.
+ Profile – Runs much faster on your device and can also be debugged\. However, there's a restriction that some code will be optimized and hard to trace\.
+ Release – The fastest build that requires additional configurations\. For more information, see [Creating a Release APK](#creating-a-release-APK)\. 

**To build code from the command line**

The command line is similar whether you're building on PC or macOS\. The only difference is the way that you invoke the build system\.

1. Navigate to the `lumberyard_version/dev` directory\.

1. At a command line prompt, enter the following\.

   For PC

   ```
   lmbr_waf.bat build_android_armv8_clang_profile -p all
   ```

   For macOS

   ```
   sh lmbr_waf.sh build_android_armv8_clang_profile -p all
   ```

You can change the `_profile` to `_debug` to create a debug build\. For more build commands, see [Build Commands](additional-details-for-android.md#build-commands-for-android)\.

## Deploying Your App and Assets<a name="deploying-your-app-and-assets"></a>

You can deploy your app and assets to a connected device using the build system or manually\. We recommend that you use the build system\.

**To deploy your app and assets using the build system**

The easiest way is to modify your `user_settings.options` file so that the build system deploys your app for you\.

1. In a text editor, open the `user_settings.options` file\. Your file should look similar to the following example\.

   ```
   user_settings 
   [Android Deploy]
   deploy_android = True
   deploy_android_clean_device = True
   deploy_android_executable = True
   deploy_android_replace_apk = True
   deploy_android_install_options = 
   
   ...
   
   [Android Options]
   android_asset_mode = loose_files
   ```

1. Make the following changes to the file\.


****  

| Settings | Description | 
| --- | --- | 
|  `deploy_android`  | Specify True so that the build system deploys to your device\. | 
|  `deploy_android_clean_device`  |  Specify **True** so that the build system erases previous content and previously built and installed APK from the device before deploying\.  | 
|  `deploy_android_executable`  |  Specify **True** so that the build system deploys your APK\.  | 
|  `deploy_android_replace_apk`  |  Specify **True** so that the build system replaces the APK, if it's already on your device\.  | 
|  `deploy_android_install_options`  |  For advanced users, you can specify additional commands to the ADB\.  | 
|  `android_asset_mode`  |  This option determines how the build system handles assets\. See the following table for available options\.  | 


****  

| Options for Android Asset Mode | Description | 
| --- | --- | 
|  `configuration_default`  |  Uses the current build configuration to determine how to package the assets\. For example, debug or profile builds, assets are packaged as `loose_files`\. For release or performance builds, assets are packaged as `project_settings`\.  | 
|  `loose_files`  |  No additional processing is done on the compiled assets\. The assets are copied to your device's SD card after the executable deploys\. Use this option for your day\-to\-day development\.  | 
|  `loose_paks`  |  \(Legacy feature\) PAK files generate from the compiled assets and added to your device's SD card after the executable deploys\.  | 
|  `apk_files`  |  The compiled assets are packaged in the APK\.  Use this option to create an APK for other users to install and run\.  | 
|  `apk_paks`  |  \(Legacy feature\) PAK files generate and are packaged in the APK\.  | 
|  `project_settings`  |  Uses the use `_[main\|patch]_obb` settings in `project.json` to determine if PAK files in the APK or OBBs are used\.  | 

If your setup is correct, the APK and assets deploy to the device each time you build\.

If you edit assets and want to only deploy minor asset changes between runs, enter the following command\.

```
lmbr_waf.bat deploy_android_armv8_clang_profile -p all --deploy-android-executable=False --deploy-android-clean-device=False
```

**Tip**  
If you're a developer, you can add the previous command to a script file that can be executed repeatedly\.

## Creating a Packed APK<a name="creating-a-packed-APK"></a>

You must edit the `user_settings.options` to create an APK that contains your project assets\.

**To create a packed APK**

1. In a text editor, open the `user_settings.options`\.

1. Make the following change\. 

   ```
   android_asset_mode = apk_files
   ```

1. Run the build command\.

   The build system picks up the assets in your `Cache` directory and put them into your APK with `w_assets` appended to the name, for example `StarterGame_w_assets.apk`\. You can run this on your device or distribute it to your team for testing\. 
**Note**  
The build system attempts to connect to the Remote Shader Compiler\. Verify that the IP address of the PC running the build command is set in the `system_android_es3.cfg`, and that the PC can be reached over your network\.

## Creating a Release APK<a name="creating-a-release-APK"></a>

Create a release APK to deploy your app to the Google Play store\. If your APK is over 100 Mb, you must create an Android expansion file\. This is also known as an OBB file\.

**Example**  
By default, the release APK uses APK files\. If you use asset files with your release APK without placing them in PAK files, edit the build script `android.py` file \(line 2642\)\.   
In the `def get_android_asset_mode(self))` section, you can specify `ASSET_MODE.apk_files` as the asset mode for release builds\.   

```
config_to_mode = {
            'debug'         : ASSET_MODE.loose_files,
            'profile'       : ASSET_MODE.loose_files,
            'release'       : ASSET_MODE.apk_files,
            'performance'   : ASSET_MODE.project_settings,
            }
```
If you use OBB files, assets won't be placed into PAK files\. Engine assets, fonts, config files, and shaders are placed in the APK\. Other assets are placed in the `.obb` file\.
You must make changes to your code for a release APK\.  

**To prepare your code**

1. Navigate to the `lumberyard_version/dev/Code/CryEngine/CryCommon/` directory\.

1. In a text editor, open the `IConsole.h` file\.

1. For line 41, enter the following changes\.  
**Example**  

   ```
   //Enable modification of CVARS for mobile release builds
   #if defined(AZ_PLATFORM_ANDROID)
   #define ALLOW_CONST_CVAR_MODIFICATIONS 1
   #else
   #define ALLOW_CONST_CVAR_MODIFICATIONS 0
   #endif
   ```

1. In a text editor, open the`PakVars.h` file\.

1. For line 106 in the `PakVars() constructor)`, if PAK files aren't used for the release build, change `nPriority` from `ePakPriorityPakOnly` to **ePakPriorityFileFirst**\. This change lets the game know not to look for assets in PAK files\.   
**Example**  

   ```
   #if defined(_RELEASE)
           nPriority  = ePakPriorityFileFirst;
   #else
   ```

   PAK files aren't used for release builds if the asset mode for release builds is set to `apk_files`, or if OBB files are used\.

1. To modify your settings, open the `system_android_es3.cfg` file\.

1. Make the following changes\.

   ```
   r_AssetProcessorShaderCompiler =  0 
   r_ShadersRemoteCompiler= 0 
   r_ShadersAllowCompilation= 0
   ```

## Using Your Signing Key<a name="using-your-signing-key"></a>

**Prerequisite**  
We recommend that you read the official [Android documentation](https://developer.android.com/google/play/licensing/index.html) about licensing apps\.

Lumberyard provides a default development keystore for Android\. This is normally used to sign an app\. However, for apps that you want to release, you must specify a keystore that you create yourself\. 

Specify the paths to your keystores in the `lumberyard_version/dev/_WAF_/android/android_settings.json` file\. They keystore alias lets you specify whether you are building for development or distribution\.

**Example**  
Your `android_settings.json` file might look similar to the following example\.  

```
{
    "DEV_KEYSTORE_ALIAS" : "development_keystore",
    "DEV_KEYSTORE" : "_WAF_/android/dev.keystore",

    "DISTRO_KEYSTORE_ALIAS" : "distribution_keystore",
    "DISTRO_KEYSTORE" : "_WAF_/android/distro.keystore",

    "BUILD_TOOLS_VER" : "latest",

    "SDK_VERSION" : "android-21",

    "BUILD_ENVIRONMENT" : "Development"
}
```
If you're using an automated build system, you can use the following command line arguments to specify the keystore for specific builds\.  


****  

| Arguments | Description | 
| --- | --- | 
|  `--dev-store-pass <password>`  |  The store password for the development keystore\.  The default is `Lumberyard`\.  | 
|  `--dev-key-pass <password>`  |  The key password for the development keystore\. The default is `Lumberyard`\.  | 
|  `--distro-store-pass <password>`  |  The store password for the distribution keystore\.  | 
|  `--distro-key-pass <password>`  |  The key password for the distribution keystore\.  | 

**Note**  
The `--distro00` argument is required if you set the `BUILD_ENVIRONMENT` to `Distribution`\. After you generate your own keys, change the settings to point to their location on your computer\.   
For more information about signing Android apps and generating your own keys, see [Sign your app](https://developer.android.com/studio/publish/app-signing.html) in the Android documentation\.

## Building the Release APK<a name="building-the-release-APK"></a>

The release APK won't connect to Asset Processor or the Remote Shader Compiler\. Before shaders can be packed into your APK, run your app in profile or debug mode and ensure that you view every surface on every level\. This ensures that the Remote Shader Compiler generates the required data for extraction by the build tools\.

Lumberyard supports Open GL ES 3\.0 and 3\.1 and generates shaders on the latest version a given device can support\. You can also use the `r_EnableGMEMPath` console variable to enable on\-chip memory support\.

Before you try to generate a release APK, run your game on devices that can support only version 3\.0 and another that supports versions 3\.1 and later\. Leave both devices connected during the build process\. Run the console variable enabled on one device and disabled on the other to ensure that the complete set of required shaders generate\.

**To trigger the build process**

1. In a command line prompt, enter the following command\.  
**Example PC**  

   ```
   lmbr_waf.bat build_android_armv8_clang_release -p all
   ```  
**Example macOS**  

   ```
   sh lmbr_waf.sh build_android_armv8_clang_release -p all
   ```

1. After the build system finishes, navigate to the `BinAndroidClang_Release` directory\. Your APK is ready to upload to the Google Play store\.

## Creating Android Expansion Files<a name="creating-android-expansion-files-obb"></a>

If your APK is larger than 100 Mb, you must create an Android Expansion File\. This file is also known as an OBB\. You can create up to two OBB files, a main and a patch\. Each one can be up to 2 GB\.

If OBB files are insufficient for your needs, you can use the Lumberyard Dynamic Content System to host some of your files on a server\. Then you can download them to users when they run your app\.

For more information, see [Using Dynamic Content Manager](cloud-canvas-cloud-gem-dc-manager.md)\.

**To set up the OBB configuration files**

1. Navigate to the `lumberyard_version/dev/Vin64vc140/rc` directory\.

1. Copy the `RCJob_Generic_Android_MakeObb.xml` file and rename it for your application, such as `RCJob_MyGame_Android_MakeObb.xml`\.

1. In a text editor, open your new file\.

   Line 77 contains the section that controls the OBB creation\. It should look similar to the following example\.

   ```
   <!--
           Pack all the assets in the cache to the obb.
       -->
       &aPakAssets>
           <Job sourceroot="${src_game}" input="${assets_files}" zip="${obb_pak}" exclude="${assets_files_excludes}" />
       </PakAssets>
   ```

1. To create a patch OBB, add another section similar to the following example\.

   ```
   <PakAssets>
           <Job sourceroot="${src_game}" input="${assets_files}" zip="${obb_patch_pak}" exclude="${assets_files_excludes}" />
       </PakAssets>
   ```

   If you need file types that aren't included in your OBB files, view the `Properties` section to ensure they aren't included by the globbing paths\.

**To generate the OBB files**

1. Navigate to your game project directory\.

1. In a text editor, open the `project.json` file\.

   Under the `android_settings` section, there are three lines that control the OBB\.

   ```
   "android_settings": {
           
           "use_main_obb" : "false",
           "use_patch_obb" : "false",
           "rc_obb_job" : "RCJob_Generic_Android_MakeObb.xml"
       },
   ```

1. Set `use_main_obb` to `"true"`\. If needed, set `use_patch_obb` to `"false"`\.

1. Set `rc_obb_job` to the name of the file that you created, such as `RCJob_MyGame_Android_MakeObb.xml`\.

1. In a command line prompt, enter the following command to create the release build\.

   ```
   lmbr_waf.bat build_android_armv8_clang_release -p all
   ```

**Important**  
If you're generating a build to upload to the Google Play store, set the `app_public_key` and `app_obfuscator_salt` settings\. For more information, see [Game Project File](additional-details-for-android.md#game-project-file)\.