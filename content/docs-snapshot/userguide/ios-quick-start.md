# Quick Start: Running the Samples Project on iOS Devices<a name="ios-quick-start"></a>

You can use this quick start to learn how to run the [Samples Project](sample-project-samples.md) on your iOS device from a macOS computer\.

This topic assumes that you have:
+ Xcode installed on your macOS computer
+ Lumberyard installed on your macOS computer
+ An iOS device connected to your computer with a USB cable
+ Lumberyard installed on a Windows computer
+ Remote Shader Compiler running on your Windows or macOS computer

For more information about creating iOS apps, see [iOS Support](ios-intro.md)\.

**To run the Samples Project on an iOS device**

1. Use Lumberyard Setup Assistant to install the required third\-party software and SDKs for iOS\.

   1. On your macOS computer, navigate to the `lumberyard_version\dev\Tools\LmbrSetup\Mac\` directory and double\-click `SetupAssistant.exe`\.

   1. If you see a **Custom Install** box, click **Customize** and then verify that the engine root path is correct\.

   1. On the **Get Started** page, select the following:
      + **Run your game project**
      + **Run the Lumberyard Editor and tools**
      + **Compile the game code**
      + **Compile the engine and asset pipeline**
      + **Compile the Lumberyard Editor and tools**
      + **Compile for iOS devices**

   1. Complete the Lumberyard Setup Assistant wizard\. For more information, see [Running Lumberyard Setup Assistant](lumberyard-launcher-using.md)\.

1. Configure Asset Processor for iOS\.

   1. Use your preferred text editor to open the `AssetProcessorPlatformConfig.ini` file\. You can find this file in the `lumberyard_version\dev\` directory\.

   1. Remove the preceding semicolon to uncomment `ios=enabled`\.

      ```
      [Platforms]
      ;pc=enabled
      ;es3=enabled
      ios=enabled
      ;osx_gl=enabled
      ```

   1. Save the file\.

1. Launch Asset Processor\.

   1. Navigate to the following directory and double\-click `AssetProcessor.exe`:
      + On Windows: `lumberyard_version\dev\Bin64vc141\`
      + On macOS: `lumberyard_version\dev\BinMac64\`

   1. In Asset Processor, verify that the **Status** is **Idle**\.  
![\[Idle status in Asset Processor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/ios/asset-processor-status-idle.png)

1. In a command line or Terminal window, do the following:

   1. Change directory to the `lumberyard_version\dev\` directory\.

   1. Type the following:
      + On Windows: `lmbr_waf.bat configure`
      + On macOS: `sh lmbr_waf.sh configure`

1. On your Windows or macOS computer, set the IP address for the remote shader compiler server\.

   1. Use your preferred text editor to open the `system_ios_ios.cfg` file\. You can find this file in the `lumberyard_version\dev\` directory\.

   1. Set `r_ShaderCompilerServer` to the IP address of your Windows computer that runs the shader compiler\.

   1. Save the file\.

1. Build and deploy the code\.

   1. Navigate to the `lumberyard_version\dev\Solutions\` directory and open the `LumberyardiOSSDK.xcodeproj` file\.

   1. Click **Run** to build and deploy the code to your iOS device\.