# Using the Virtual File System<a name="using-the-virtual-filing-system-vfs"></a>

If you're a developer who frequently changes assets, the Virtual File System \(VFS\) might help your work flow\. In this environment, the Asset Processor serves all asset files to the running application\. If assets are modified, they reload without you restarting the application\.

**To set up VFS**

1. Navigate to the `lumberyard_version/dev` directory\.

   In a text editor, open the`bootstrap.cfg` and set `remote_filesystem` to `1`\. This causes the runtime to turn on VFS\.

1. Enter the following values\.

   ```
   remote_ip=127.0.0.1
   connect_to_remote=1
   wait_for_connect=0
   ```

1. \(Optional\) To send traffic to the shader compiler through VFS, edit the `dev/system_android_es3.cfg` file and set `r_AssetProcessorShaderCompiler` to `1`\.

1. Build the APK as you normally would\.

1. If you haven't already, enable asset building for Android\. See [Preparing Your Assets for Android](building-your-android-game.md#preparing-your-assets-for-android)\.

1. Start Asset Processor\.

1. To tell your Android device to send traffic to Asset Processor, enter the following command\.

   ```
   adb reverse tcp:45643 tcp:45643 
   ```

## Running the VFS<a name="running-the-vfs-build"></a>

After you set up VFS, run it for your game project\.

**To run the VFS build**
+ Launch your game by doing one of the following:
  + On your device's home screen, tap the app icon\.
  + Use the Android Studio Debugger\.

**Note**  
To verify a connection from PC\-GAME with the es3 platform, click the **Connections** tab in Asset Processor\. Server files from your PC can affect load time, so it might take a few moments for the game to appear\.