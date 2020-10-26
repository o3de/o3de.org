# Troubleshooting for Android<a name="troubleshoot-android"></a>

This section shows common issues when building for Android, and steps to help resolve them\.

If you run your app and see a black screen, try to debug your app by doing the following\.

**To debug your app**

1. Inspect the device log by using `"adb logcat -s LMBR"`\. See if the runtime reports show any errors\.

1. Set the name of the level load for your game project in the `autoexec.cfg`\. This file is located in your game projects directory, such as the `lumberyard_version/dev/SamplesProject`\) directory\.

1. Check your computer to see if traffic over port 61453 is allowed\. The runtime needs to connect to the shader compiler to allow your game to display\.

1. If your shader compiler is already running, shut it down\. Then delete the directories that the compiler creates alongside the executable, and restart it\.

1. Delete the app from your device and use the build command to build and deploy it\.

The shaders for Lumberyard are written in HLSL\. At runtime, the engine selects different versions, or permutations, of the shaders to use based on materials and current rendering state\. The exact HLSL source code is known but needs to be translated to GLSL for the shader to work on Android devices\. The remote shader compiler translates HLSL to GLSL and returns the GLSL shader source to the engine, which then compiles it through OpenGL calls to create the final shader to use\. The GLSL source is also cached on the device\. This way, in the future, the engine can read the cached shader from the device instead of connecting to the remote shader compiler to get it\.

By default, the Lumberyard build tools strip debugging information from the release APK\. This makes it impossible to trace the code under a debugger\. If you need to debug this build, make the following changes\.

**To debug a release APK**

1. Navigate to the `lumberyard_version\dev\Tools\build\waf-1.7.13\lmbrwaflib` directory\.

1. In a text editor, open the `compile_settings_android.py`\.

1. Add the following line to the `load_release_android_settings` section\.

   ```
   env['ANDROID_DEBUG_MODE'] = '--debug-mode'
   ```

If you're using Visual Studio to debug, do the following\.

1. Navigate to the `lumberyard_version\dev\Tools\build\waf-1.7.13\lmbrwaflib` directory\.

1. In a text editor, open the `compile_settings_android_armv8.py` file\.

1. Add the following code to the `load_release_android_armv8_settings` section\.

   ```
   	// for armv8
       conf.env['EXT_LIBS'] += [
           conf.add_to_android_cache(os.path.join(conf.env['ANDROID_NDK_HOME'], 'prebuilt', 'android-arm64', 'gdbserver', 'gdbserver'))
       ]
   ```

1. Rebuild your app, and you should be able to debug afterward, as you would with any other build\. Be aware that the compiler optimizes your variables, so it might be difficult to see their values unless you disassemble the code and inspect CPU registers and memory\.

**To determine if a device supports ARMv8**
+ Open a command line prompt and enter the following\.

  ```
  adb [-s <deivce_id>] shell getprop ro.product.cpu.abi
  ```