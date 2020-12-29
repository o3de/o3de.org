# Using Virtual File System with iOS<a name="ios-virtual-file-system"></a>

If you frequently change assets, you can configure Asset Processor on your macOS computer to use the virtual file system \(VFS\) to serve asset files to your iOS app\. When you modify an asset, it is automatically reloaded without restarting the app\. This method may result in slower load times because assets are sourced directly from your computer instead of the mobile device\.

## Prerequisites<a name="ios-virtual-file-system-prerequisites"></a>

Before you can use the VFS with iOS, you must [download the usbmuxconnect package](https://sourceforge.net/projects/appletools/) and save to a location on your macOS computer\.

## Setting up VFS<a name="ios-virtual-file-system-setting-up"></a>

On your macOS computer, set up VFS to enable asset processing for iOS\.

**To set up VFS on a macOS computer**

1. Do the following to configure Asset Processor for iOS:

   1. Navigate to the `lumberyard_version\dev\` directory\.

   1. Use your preferred text editor to open the `AssetProcessorPlatformConfig.ini` file\.

   1. Remove the preceding semicolon to uncomment `ios=enabled`\.

      ```
      [Platforms]
      pc=enabled
      ;es3=enabled
      ios=enabled
      ```

   1. Save the file\.

1. Do the following to update the bootstrap configuration settings:

   1. Navigate to the `lumberyard_version\dev\` directory\.

   1. Use your preferred text editor to open the `bootstrap.cfg` file\.

   1. Do the following:

      1. Set `remote_filesystem` to **1**\.

      1. Set `ios_connect_to_remote` to **0**\.

      1. Set `ios_wait_for_connect` to **1**\.

      1. Set `white_list` to the IP address of your macOS computer\.
**Note**  
Be sure to update the existing entries\. Do not duplicate the entries\.

1. Do the following to modify the system configuration file:

   1. Navigate to the `lumberyard_version\dev\` directory\.

   1. Use your preferred text editor to open the `system_ios_ios.cfg` file\.

   1. Set the `r_AssetProcessorShaderCompiler` console variable to **1**\.

   1. Save the file\.

1. Do the following to connect Asset Processor to the iOS device through the local host:

   1. Navigate to the `lumberyard_version\dev\BinMac64` directory and launch Asset Processor\.

   1. In Asset Processor, on the **Connections** tab, click **Add Connection**\.

   1. For the new connection, select the **Auto Connect** check box\. You can leave the default values for **IP** and **Port**\.

1. In a Terminal window, navigate to the location where you saved the usbmuxconnect package\.

1. Type the following: `./itnl --iport 22229 --lport 22229`

1. Verify that Asset Processor displays one entry on the **Connections** tab with a status of **Connected**\.
**Note**  
If you receive a bind error message, please restart your macOS computer and try again\.

## Running the VFS Build<a name="ios-virtual-file-system-running-vfs-build"></a>

Run the VFS build on your macOS computer\.

**To run the VFS build**

1. Do the following to update the bootstrap configuration settings:

   1. Navigate to the `lumberyard_version\dev\` directory\.

   1. Use your preferred text editor to open the `bootstrap.cfg` file\.

   1. Do the following:

      1. Set `remote_filesystem` to **1**\.

      1. Set `ios_connect_to_remote` to **0**\.

      1. Set `ios_wait_for_connect` to **1**\.

1. Build and launch your game for iOS with Xcode\. For instructions, see [Creating a Release App](ios-creating-release-app.md)\.

1. Verify that Asset Processor displays an iOS connection on the **Connections** tab, and that your game runs on the device\.
**Note**  
If the device cannot be reached or you don't see a connection in Asset Processor, stop the game, disconnect and then reconnect the device, and start again from step 1\. If remote shader compilation is interrupted, you may see malformed shaders cached to your Windows computer\. The malformed shaders can cause issues with subsequent runs using VFS\. To resolve this issue, delete the `lumberyard_version\dev\Cache\game_project_name\ios\user\` directory on your Windows computer\. Then, restart the shader compiler\.