---
description: ' Compile assets and build your Android project with &ALYlong;. '
title: Build and deploy your project for Android
---
# Build and deploy your project for Android<a name="android-build-deploy"></a>

 Once you've [set up your environment]() and [configured your project](), it's time to build your Amazon Lumberyard project for Android and get it running on a device\. In this section, you'll set up an attached device to use the [Shader Compiler](), build your project with `lmbr_waf` or Android Studio, and deploy to a device\. You'll also learn how to configure the Lumberyard build system to activate or deactivate automatically deploying to a device whenever you build\. 

**Topics**
+ [Connect to the Shader Compiler](#running-the-shader-compiler-for-android)
+ [Build your project](#android-build-project)
+ [Deployment prerequisites](#android-deploy-prerequisites)
+ [Deploy with Lumberyard Editor](#run-the-deployment-tool)
+ [Deploy from command line](#deploying-your-app-and-assets)
+ [Next steps](#android-build-next-steps)

## Connect to the Shader Compiler<a name="running-the-shader-compiler-for-android"></a>

 During development, your Lumberyard project connects to the Shader Compiler to generate the shaders for your device\. To do this, by set up a reverse proxy between the Android device and the host machine, in order to connect to the Asset Processor\. Note that through the VFS you can connect to a remote Asset Processor, which will handle shader compilation\. Follow the steps in [Serving assets over the Virtual File System \(VFS\)](android-configure-project.md#android-vfs) to configure VFS\. 

**Important**  
 The Shader Compiler only runs on Windows PCs\. If you're using another environment to develop your Android game, you'll need access to a server with the Shader Compiler running and accessible through a firewall\. One option is to run a [Windows GPU\-based EC2 instance](https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/accelerated-computing-instances.html#gpu-instances)\. For more information on running a dedicated Shader Compiler service, see [Remote Shader Compiler](mat-shaders-custom-dev-remote-compiler.md)\. 

**To connect to the Shader Compiler**

1. Open the `lumberyard_install_dir\dev\system_android_es3.cfg` file in a text editor\.

1. Change the value of `r_AssetProcessorShaderCompiler` to **1**\.

   ```
   r_AssetProcessorShaderCompiler=1
   ```

1.  Change the value of `r_ShaderCompilerServer` to the IPv4 address of the machine that's running the Shader Compiler\. Unless you're running the Shader Compiler in a dedicated environment, use **127\.0\.0\.1**\. 

   ```
   r_ShaderCompilerServer=server-ip
   ```
**Important**  
 Make sure that the IPv4 address of the **Android device** is in the allow list for your Shader Compiler\. Connections to the compiler are made from the device, not proxied through the host\. 

1.  Change the value of `r_ShaderCompilerPort` to the port that's used by the Shader Compiler\. By default, the port for the Shader Compiler is **61453**\. To see if you're using another port, examine the [Remote Shader Compiler Configuration](mat-shaders-custom-dev-remote-compiler.md#mat-shaders-custom-dev-remote-compiler-config) on the Shader Compiler host\. 

   ```
   r_ShaderCompilerPort=shader-port
   ```

1. Save the file\.

1.  **If running the Shader Compiler locally:** Open a command prompt and use `adb` to redirect traffic at the Shader Compiler port on the device to the Shader Compiler port on your development machine\. By default, the port for the Shader Compiler is **61453**\. 

   ```
   adb reverse tcp:shader-port tcp:shader-port
   ```
**Important**  
 This step relies on the `adb` command being in the `PATH` environment variable\. Follow the instructions in [Set up your environment to develop for Android with Lumberyard](android-setting-up-environment.md) to add Android tools to your `PATH`\. 

 Whether or not you need to manually start the Shader Compiler is dependent upon whether you use the deployment tool\. If you're using the Deployment Tool, the Asset Processor automatically starts a Shader Compiler in the background for you\. Otherwise, you need to start the Shader Compiler manually for a deployment\. See [Running the Remote Shader Compiler](mat-shaders-custom-dev-remote-compiler.md#mat-shaders-custom-dev-remote-compiler-launch) to learn more\. 

## Build your project<a name="android-build-project"></a>

 With asset loading and the shader compiler configured, you're ready to build your Lumberyard project for Android\! You can build from the command line, or load the projects created by `lmbr_waf configure` into Android Studio\. This section covers how to build your project from the command line, including information on the available Android targets and build system configuration options that are explicitly for use with Android\. 

**Important**  
 If you've [enabled Incredibuild](waf-extensions.md#waf-extensions-incredibuild), turn the feature off to be able to compile for Android\. Lumberyard doesn't take advantage of the Incredibuild hooks for Android\. 

### Build with `lmbr_waf`<a name="android-build-project-waf"></a>

 When using `lmbr_waf`, Android builds use the `android_armv8_clang` platform\. When building for Android, all of the usual tasks, options, build configurations, and specs are available with `lmbr_waf`\. For example, to build the game and engine for Android in profiling mode, use the command `lmbr_waf build_android_armv8_clang_profile -p game_and_engine`\. 

 For more information about the Lumberyard build system, see [Using the Waf Build System](waf-intro.md)\. For information on the Android\-specific build settings and `lmbr_waf` command\-line options, see the [Reference for Android](android-reference.md)\. 

### Build with Android Studio<a name="android-build-project-studio"></a>

 The Gradle project created by `lmbr_waf configure` can be directly imported into Android Studio without any changes\. Follow the instructions from [Android Studio \- Import Gradle project](https://developer.android.com/studio/intro/migrate#import_a_gradle-based_intellij_project) to import this project, located at `lumberyard_install_dir\dev\Solutions\LumberyardAndroidSDK`\. For further instructions, including how to select targets and configure for debugging, read the [Android Studio documentation](https://developer.android.com/studio/intro)\. 

 Targets in Android Studio are called *Build Variants* and are named `project-nameLauncher`\. Each build variant produces the bootstrap executable that loads the assets and code for the named project, and the Lumberyard engine\. 

 If you're comfortable using the Android build tools from the command line, you can also build any Lumberyard targets using the Android build tools or Gradle\. Keep in mind that this only builds your executable and doesn't recompile the assets\.

## Deployment prerequisites<a name="android-deploy-prerequisites"></a>

 In order to deploy to an Android device, you need the following: 
+  An Android device that meets the [minimum requirements](android-intro.md#android-minimum-requirements) for Lumberyard\. Lumberyard projects won't deploy to an Android emulator\. 
+  The device has developer mode and USB debugging enabled\. See [Configure developer options](https://developer.android.com/studio/debug/dev-options) in the official Android documentation for instructions on how to enable these features\. 
+  The device is accessible from an Android debug bridge \(*adb*\) server on the host running the deployment tools\. 

## Deploy with Lumberyard Editor<a name="run-the-deployment-tool"></a>

 The Lumberyard Editor offers a way to deploy to a mobile device: the **Lumberyard Deployment Tool**\. If you're a content creator who rapidly iterates on their work, this is an ideal way to get on\-device testing and validation\. Using the Deployment Tool requires that you have the Lumberyard Editor and Asset Processor, and an Android device connected to the machine that's running both\. 

**To use the Deployment Tool**

1.  From the Editor main menu, select **File** > **Project Settings** > **Deploy to device**\. 

1.  In the Deployment Tool UI, select **Android ARMv8** for the **Target platform** value\. 

1.  Select your build configuration, and set the option toggles for **Build game** and **Load current level**\. It's only necessary to rebuild your game if you're testing updates to the code itself, and not just asset changes\. 

1.  In the **Deploy** section, select the **Local Device** tab\. 

1.  Under **Deployment Settings**, select your target device\. Unless you have multiple Android devices connected, there's no need to change this value\. Make sure the value for **Device IP address** is **127\.0\.0\.1**\. For Android, the Deployment Tool automatically manages port forwarding and connections through the Android debug bridge\. 

1.  Check the **Clean device** box to remove any files for your project that are copied to the device, including any installed APKs\. This is recommended if you're doing a large asset update\. 

1.  Under **Asset Options**, select your [asset mode](android-configure-project.md#android-configure-asset-loading)\. Unless you're running the Asset Processor remotely, make sure that the value for **Asset Processor IP address** is **127\.0\.0\.1 \(localhost\)**\. If you'll be building shaders through the Shader Compiler, uncheck the **Use Asset Processor for shaders** checkbox\. 

1. Select the **Deploy to local device** button\.
**Note**  
 If you're using source control for your project, you might see a warning that some files are not writable when you try to deploy the project\. Either check these files out in your source control system, or select the **Continue** button to overwrite them\. 

## Deploy from command line<a name="deploying-your-app-and-assets"></a>

 If you need to deploy less frequently, or can't meet the requirements of the Deployment Tool, deploy\-on\-build is another option\. Deployments during build can be performed automatically, or controlled through a command\-line option passed to `lmbr_waf`\. You can also deploy directly from Android Studio if you're using it as your build environment\. For more information on using Android Studio for Lumberyard builds, see [Build with Android Studio](#android-build-project-studio) and the [Android Studio documentation](https://developer.android.com/studio/run)\. 

**Important**  
 As part of using deploy\-on\-build, you'll want to make sure that your assets are properly updated first\. This will always involve running the Asset Processor and the shader compiler before a build\. 

### Automatic deploy during build<a name="deploying-your-app-and-assets-config"></a>

 At the start of development, and for anyone working on the Lumberyard engine or gems that contain code, deploy to a device every time you rebuild\. This keeps the APK on the device up to date and ready to test, at a minimal cost of deployment time to the device\. As your project grows in size and assets are added, you might choose to turn this feature off – copying assets to the device is what takes the longest amount of time in a deployment\. 

**To modify the build configuration to automatically deploy**

1. Open the `lumberyard_install_dir\dev\_WAF_\user_settings.options` file in a text editor\.

1. Edit the `[Android Deploy]` section of the file to the following:

   ```
   [Android Deploy]
   deploy_android = True
   deploy_android_clean_device = True
   deploy_android_executable = True
   deploy_android_replace_apk = True
   ```

 Command\-line options still take precedence over anything in the configuration file\. When building for Android and you *don't* want to deploy, you can add the arguments shown in the next command to keep the current on\-device APK installed: 

```
lmbr_waf build_android_armv8_clang_profile -p all ^
    --deploy-android-executable=False ^
    --deploy-android-clean-device=False ^
    --deploy-android-replace-apk=False
```

 Using this feature with the `deploy_android_armv8_clang_profile` build command is useful when you don't want to replace the executable on the device, but do need to deploy changed assets\. 

 For a full description of all of the available Android deployment options and their effects, see the [Reference for Android](android-reference.md)\. 

### Manual deploy during build<a name="deploying-your-app-and-assets-flag"></a>

 When working from the command line with `lmbr_waf`, you can control deployments by adding arguments\. When you're ready to build for deployment, add the arguments `--deploy-android-executable=True --deploy-android-clean-device=True --deploy-android-replace-apk=True` to your invocation\. The following command is used to deploy during a build: 

```
lmbr_waf build_android_armv8_clang_profile -p game_and_engine ^
    --deploy-android-executable=True ^
    --deploy-android-clean-device=True ^
    --deploy-android-replace-apk=True
```

 During early testing and development, you'll want to always push to a device only when you've confirmed that all of your asset settings, device network configuration, and other build configurations are appropriate for your project\. You only need to push new APKs when updating configurations, making code changes, or adding gems\. 

 For a full description of all of the available Android deployment options and their effects, see the [Reference for Android](android-reference.md)\. 

### Deploy with `lmbr_waf`<a name="android-deploy-only"></a>

 If your game and engine are already built and up to date, you can run a deployment without doing a build\. By running a deploy\-only operation, you can update the assets on a device to test and preview them without the cost of a full rebuild\. You can even switch the asset deployment type before doing a manual deployment\. 

 Deployments are performed with the `deploy_android_armv8_clang_profile` command\. When you're running deployments in this way, make sure to use the `--deploy-android-*` arguments to specify exactly what should be cleaned and which assets or binaries will be deployed to the device\. In general, when you're only updating assets, make sure to avoid cleaning assets from the device and don't re\-deploy the binaries\. The following command shows how to do an asset\-only update: 

```
lmbr_waf deploy_android_armv8_clang_profile -p all ^
    --deploy-android-executable=False ^
    --deploy-android-clean-device=False ^
    --deploy-android-replace-apk=False
```

 For a full description of all of the available Android deployment options and their effects, see the [Reference for Android](android-reference.md)\. 

## Next steps<a name="android-build-next-steps"></a>

Now that you have your Lumberyard project building and running on an Android device, learn more about mobile\-specific design considerations and releasing to the Google Play Store\.
+ [Design Considerations for Creating Mobile Games Using Lumberyard](ios-android-design-considerations.md)
+ [Lumberyard Performance Tuning Guidelines for Mobile Devices](ios-android-performance-guidelines.md)
+ [Updating Graphics Settings for Android and iOS](ios-android-updating-graphics-settings.md)
+ [Releasing Lumberyard projects for Android](android-deploy-release.md)