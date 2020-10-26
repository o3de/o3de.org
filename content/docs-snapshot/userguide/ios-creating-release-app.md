# Creating a Release App<a name="ios-creating-release-app"></a>

Once you have finished your Lumberyard iOS game, you can prepare it for the App Store by creating a release app and including the assets and shaders in `.pak` files\. You must do the following:

1. [Prepare your code](#ios-preparing-your-code)\.

1. [Modify your settings](#ios-modifying-your-settings)\.

1. [Create `.pak` files](#ios-creating-pak-files)\.

1. [Configure the App Store settings](#ios-configuring-app-store-settings)\.

1. [Generate a build](#ios-generating-app-build)\.

## Preparing Your Code<a name="ios-preparing-your-code"></a>

Modify the code in the `IConsole.h` file to enable the creation of mobile release builds\.

**To modify the IConsole\.h file**

1. On your macOS computer, navigate to the `lumberyard_version\dev\Code\CryEngine\CryCommon\` directory\.

1. Use your preferred text editor to open the `IConsole.h` file\.

1. Modify line 41 as follows:

   ```
   //Enable modification of CVARS for mobile release builds
   #if defined(AZ_PLATFORM_APPLE_IOS)
   #define ALLOW_CONST_CVAR_MODIFICATIONS 1
   #else
   #define ALLOW_CONST_CVAR_MODIFICATIONS 0
   #endif
   ```

1. Save the file\.

## Modifying Your Settings<a name="ios-modifying-your-settings"></a>

Modify the settings in your system configuration file to disable communication between the iOS device and the remote shader compiler\. For release builds, Lumberyard packages the shaders directly to the iOS device instead of compiling shaders on demand\.

**To modify the system configuration file**

1. On your macOS computer, navigate to the `lumberyard_version\dev\` directory\.

1. Use your preferred text editor to open the `system_ios_ios.cfg` file\.

1. Set the following console variables to **0**\.
   + `r_AssetProcessorShaderCompiler`
   + `r_ShadersRemoteCompiler`
   + `r_ShadersAllowCompilation`

1. Save the file\.

## Creating \.Pak Files<a name="ios-creating-pak-files"></a>

Lumberyard apps use `.pak` files to include assets and shaders for your app build\. The `.pak` files are required for release apps and must be created manually\.

**Topics**
+ [Building Shader \.Pak Files](#ios-shaders-build-pak-files)
+ [Deploying Shader \.Pak Files](#deploying-shader-pak-files-ios)

### Building Shader \.Pak Files<a name="ios-shaders-build-pak-files"></a>

Use the Remote Shader Compiler to generate the shaders that are packed into your app build\. You must run your app in profile or debug and view every surface in your game level to capture all shader permutations\. Lumberyard supports both GMEM 128 and GMEM 256 and generates shaders on the highest version that a device supports\. As a result, you must run your game on two devices, one that supports GMEM 128 and one that supports GMEM 256\.

**To generate shaders for your iOS app**

1. Build, deploy, and run your game in profile or debug mode\. For information, see [Building Your iOS App](ios-game-building.md)\.

1. In your game, explore every area in every level to ensure that all shader permutations required for the game are generated\. Exit the game when you are finished\.

**To build a shader \.pak file**

1. Run the **Remote Shader Compiler**\. For more information, see [Running the Remote Shader Compiler](mat-shaders-custom-dev-remote-compiler.md#mat-shaders-custom-dev-remote-compiler-launch)\. 

1. In a command line window, navigate to the `lumberyard_version\dev\` directory and locate the `lmbr_pak_shaders.sh` file\.

1. To use the `lmbr_pak_shaders.sh` file, enter a command that provides the name of the game project and the platform\.

   ```
   lmbr_pak_shaders.sh game_project_name METAL ios
   ```  
**Example**  

   To build the shaders for the Samples Project, enter the following command:

   ```
   lmbr_pak_shaders.sh SamplesProject METAL ios
   ```

### Deploying Shader \.Pak Files<a name="deploying-shader-pak-files-ios"></a>

When the batch file finishes building the shader `.pak` file for your game project, verify that the following files exist in the `lumberyard_version\dev\Build\ios\game_project_name\` directory:
+ `ShaderCache.pak` – Contains all compiled shaders that are used only when the shader cannot be found in the current level's shader cache\.
+ `ShaderCacheStartup.pak` – Contains a subset of compiled shaders that are used to accelerate the startup time of the engine\.

**To pack assets for your app**

1. Navigate to the `lumberyard_version\dev\` directory\.

1. Copy the `Build<game_project_name>_Paks_PC.bat` file and rename it to `Build<game_project_name>_Paks_iOS.bat`\.

1. Use your preferred text editor to open the `Build<game_project_name>_Paks_iOS.bat` file\.

1. Edit the file as follows:
   + Line 20: `.\%BINFOLDER%\AssetProcessorBatch.exe /gamefolder=game_project_name /platforms=ios`
   + Line 25: `.\%BINFOLDER%\rc\rc.exe /job=%BINFOLDER%\rc\RCJob_Generic_MakePaks.xml /p=ios /game=game_project_name`

1. Save the file\.

1. Run the `Build<game_project_name>_Paks_iOS.bat` file and wait for the `.pak` files to finish building\.

## Using Shader \.Pak Files<a name="ios-using-shader-pak-files"></a>

Add the shader \.pak files to your Xcode project\.

**To use shader \.pak files**

1. Navigate to the `lumberyard_version\dev\Cache\game_project_name\ios_paks\` directory\. The generated \.pak files are saved here\.

1. Do one of the following to add the \.pak files to your Xcode project:
   + If you're sharing the `Cache` directory between your Windows and macOS computers, reopen your Xcode project\. This will add the files to your `Resources` directory\.
   + Copy the `ios_paks` directory and save it in the `lumberyard_version\dev\Cache\game_project_name\` directory on your macOS computer\. Then reopen your Xcode project\.

## Configuring the App Store Settings<a name="ios-configuring-app-store-settings"></a>

Every Lumberyard project includes an `Info.plist` file that contains the default values for the following settings:
+ Display name
+ App icon
+ Splash screen
+ Screen orientation
+ Other related settings

You can access the `Info.plist` file in the `lumberyard_version\dev\Code\game_project_name\Resources\IOSLauncher\` directory\. The default app icons and splash screens are in the `Images.xcassets` directory\. For information about using the default app icons and splash screens, see the [Lumberyard Logos and Branding Guidelines](https://aws.amazon.com/lumberyard/support/)\.

Verify the `Info.plist` file is writeable and then use Xcode to modify the values for these settings\. For information about modifying these settings in Xcode, see [Configuring Your Xcode Project for Distribution](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/ConfiguringYourApp/ConfiguringYourApp.html)\.

## Generating a Build<a name="ios-generating-app-build"></a>

After generating all required asset and shader `.pak` files, you can use Xcode to build, deploy, run, and archive the release version of your iOS app\. Use the same method that you would use for any Xcode project\. For more information, see [Prepare for app distribution](http://help.apple.com/xcode/mac/current/#/dev91fe7130a) in the *XCode Help*\.

**To generate a build**

1. On your macOS computer, open Xcode\.

1. In Xcode, navigate to your project and then choose **Edit Scheme**\.

1. On the project page, for **Build Configuration**, select **release**\.

1. Build your project as you would any Xcode project\.

1. In the menu, choose **Product**, **Archive**\.

1. In the dialog box, on the **Archives** page, click **Export**\.

1. Generate your iOS app\.