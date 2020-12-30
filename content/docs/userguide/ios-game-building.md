---
description: ' Configure and build an iOS game application using the &ALY; build tools. '
slug: ios-game-building
title: Building Your iOS App
---
# Building Your iOS App<a name="ios-game-building"></a>

Set up your build environment and build an app that can run on an iOS device\.

You must do the following:

1. [Configure a game project](#ios-configure-your-game-project)\.

1. [Prepare your assets](#ios-prepare-your-assets)\.

1. [Configure the build system](#ios-configure-the-build-system)\.

1. [Modify your user settings](#ios-modify-your-user-settings)\.

1. [Run the Remote Shader Compiler](#ios-run-the-remote-shader-compiler)\.

1. [Build code from the command line](#ios-build-code-from-command-line)\.

## Step 1: Configure a Game Project<a name="ios-configure-your-game-project"></a>

You have two options for configuring a game project:
+ Use the [Samples Project](sample-projects-levels-intro.md) in the `lumberyard_version\dev\` directory as a foundation for your own game project\.
+ Create a new game project\. For more information, see [Creating and Switching Game Projects](configurator-projects.md)\.

**To configure a game project**

1. On your Windows computer, navigate to the `lumberyard_version\dev\Tools\LmbrSetup\Mac\` directory and open the Project Configurator\.

1. In the Project Configurator, do one of the following:
   + Select **SamplesProject** and then click **Set as default**\. Follow the instructions for [switching game projects](configurator-projects.md#project-configurator-different-project)\.
   + Click **Create new**\. Follow the instructions for [creating a game project](configurator-projects.md)\.

1. If you created a new game project, do the following:

   1. In the Project Configurator, select your game project name and then click **Set as default**\.

   1. In Lumberyard Editor, open your level and then press **Ctrl\+E**\. This will export the levels you have created\.

1. \(Optional\) Configure system components and memory settings for your game project\. For more information, see [Configuring Advanced Settings](configurator-advanced.md)\.

## Step 2: Prepare Your Assets<a name="ios-prepare-your-assets"></a>

You can generate the data for your app on a computer running either Windows or macOS\. If you choose to use a Windows computer, you must configure your Windows computer and iOS device to share the same network\. For more information, see the [Run the Remote Shader Compiler](#ios-run-the-remote-shader-compiler) page\.

**To prepare your assets**

1. Do the following to configure Asset Processor for iOS:

   1. Navigate to the `lumberyard_version\dev\` directory\.

   1. Use your preferred text editor to open the `AssetProcessorPlatformConfig.ini` file\.

   1. Remove the preceding semicolon to uncomment `ios=enabled`\.

      ```
      [[Platforms]
      ;pc=enabled
      ;es3=enabled
      ios=enabled
      ;osx_gl=enabled
      ```

   1. Save the file\.

1. Do the following to launch Asset Processor:

   1. Navigate to the following directory:
      + On a Windows computer: `lumberyard_version\dev\Bin64vc141`
      + On a macOS computer: `lumberyard_version/dev/Bin64Mac/`

   1. Double\-click `AssetProcessor.exe`\.

   1. In Asset Processor, verify that the **Status** is **Idle**\.

## Step 3: Configure the Build System<a name="ios-configure-the-build-system"></a>

When you build the engine and tools code for macOS or Windows, you initialize the build system and generate project files for Xcode\.

**To configure the build system**

1. In a command line window, type `sh lmbr_waf.sh configure`

1. Verify that you see the following in the comments from the build system:

   ```
   mac config 
   [WAF] 'xcode_ios' finished successfully (3.610s)
   [WAF] 'xcode_mac' finished successfully (3.507s)
   ```

## Step 4: Modify Your User Settings<a name="ios-modify-your-user-settings"></a>

Update your configuration file to help increase the compilation speed and deployment when you build your game project\.

**To modify your user settings**

1. Use your preferred text editor to open the `user_settings.options` file\. You can find this file in the `lumberyard_version\dev\_WAF_\` directory\.

1. Under `[Build Options]`, set `use_uber_files` to **True**\.

1. Save the file\.

## Step 5: Run the Remote Shader Compiler<a name="ios-run-the-remote-shader-compiler"></a>

Lumberyard uses a versatile shader system to achieve high quality, realistic graphics\. When you run a game on an iOS device during development, you must connect to a remote shader compiler on your Windows or macOS computer\. This compiles the subset of shaders required by your game, on demand\.

When a new shader is compiled, the game waits for the remote shader compiler to compile the binary shader permutation and then send it back to your device\. Once this occurs, the shader is cached on your device until you delete the app\. When you are ready to release your game, you must pack up and include all cached binary shaders\.

**Note**  
You can also run the remote shader compiler on an Amazon EC2 instance\. For information, see [Running the Shader Compiler on Amazon EC2](ios-android-running-shader-compiler-amazon-EC2.md)\.

### Prerequisites<a name="ios-remote-shader-compiler-prerequisites"></a>

To use the remote shader compiler, you must do the following:
+ \(First time only\) Create a `config.ini` file that tells the remote shader compiler the addresses from which to accept connections\. For instructions, see the procedure below\.
+ Connect the remote shader compiler host computer and iOS device to the same network and configure any firewalls to allow traffic through port 61453\.
+ Set up the system configuration file \(`system_ios_ios.cfg`\) for the mobile device to connect to the remote shader compiler on your computer\.

You can use an allow list to specify the IP addresses that are allowed to connect to your remote shader compiler\. For information, see [Creating an allow list for the Remote Shader Compiler](mat-shaders-custom-dev-remote-compiler.md#mat-shaders-custom-dev-remote-compiler-allow)\.

### Enabling a Connection Between the iOS App and the Remote Shader Compiler<a name="ios-enable-connection-between-app-and-shader-compiler"></a>

You must modify certain configuration files to allow your iOS app to connect to the shader compiler\.

**To allow your iOS app to connect to the shader compiler**

1. Do the following on your macOS computer:

   1. Use your preferred text editor to open the `system_ios_ios.cfg` file\. You can find this file in the `lumberyard_version/dev/` directory\.

   1. Set the `r_ShaderCompilerServer` console variable to the IP address of the host computer on which you are running the shader compiler\.

   1. Save the file\.

1. Do the following on your computer that runs the shader compiler:

   1. If one doesn't yet exist, create a `config.ini` file in one of the following directories:
      + On Windows: `lumberyard_version\dev\Tools\CrySCompileServer\x64\profile\`
      + On macOS: `lumberyard_version/dev/Tools/CrySCompileServer/osx/profile/`

   1. Use your preferred text editor to open the `config.ini` file\.

   1. For `whitelist=<device ip address>`, replace `<device ip address>` with the IP address, in CIDR format, of your iOS device\.

   1. Save the file\.

1. On your shader compiler host computer, launch `CrySCompileServer` from one of the following directories:
   + On Windows: `lumberyard_version\dev\Tools\CrySCompileServer\x64\profile\`
   + On macOS: `lumberyard_version/dev/Tools/CrySCompileServer/osx/profile/`

## Step 6: Build Code from a Command Line<a name="ios-build-code-from-command-line"></a>

Configure and build various targets of your app, depending on your mode of development\. You can create a debug, profile, or release build\.
+ Debug – Allows you to see your code running under a debugger\. This build is slowest to run\.
+ Profile – Allows you to debug your code, though some code may be optimized and difficult to trace\. This build runs faster on your iOS device\.
+ Release – Includes all required asset and shader `.pak` files for a release version of your iOS game\. This build runs the fastest; however, special steps are required to generate the build\. For more information, see [Creating a Release App](ios-creating-release-app.md)\.

When you build code from a command line, you must take an additional step to run your app on an iOS device\. You use Xcode to open the `LumberyardiOSSDK.xcodeproj` project that is generated in the `lumberyard_version/dev/Solutions/` directory\. Then you select your device, follow the standard procedure to build and run on the device, set breakpoints, and inspect variables\.

**To build code from a command line**

1. On your macOS computer, in a Terminal window, navigate to the `lumberyard_version/dev/` directory\.

1. Build various targets of your game:
   + To build debug, type: `sh lmbr_waf.sh build_ios_debug -p all`
   + To build profile, type: `sh lmbr_waf.sh build_ios_profile -p all`
   + To build release, type: `sh lmbr_waf.sh build_ios_release -p all`