---
description: ' Identify and fix common issues seen during Android development with
  &ALYlong;. '
slug: troubleshoot-android
title: Troubleshooting &ALY; issues on Android
---
# Troubleshooting Lumberyard issues on Android<a name="troubleshoot-android"></a>

 Things go wrong during development, and knowing which issues are the most commonly encountered and how to resolve them can be a big help\. This topic is a knowledge base of many of the issues that users experience when they're working with Amazon Lumberyard to develop a project for Android\. This section focuses on helping you quickly identify your issue and get it resolved, so that you can get back to work\. 

For information on how to design assets and configure renderer settings to improve performance, see [Lumberyard Performance Tuning Guidelines for Mobile Devices](ios-android-performance-guidelines.md)\. 

 All of the advice in this section is specific to issues you'll encounter when building with the Lumberyard tools, or when you're running a project on a device and see obvious errors caused by the engine itself\. For general advice and instructions on debugging your Lumberyard project for Android, see the [Android Studio Debugger documentation](https://developer.android.com/studio/debug)\. 

 If you have a question that isn't answered here, try checking in with the Lumberyard community using one of these resources: 
+ [The Lumberyard forums](https://forums.awsgametech.com/)
+ [The unofficial Lumberyard Discord server](https://discord.gg/tWrJ68)

**Topics**
+ [Black screen when launching on a device](#troubleshoot-android-black-screen)
+ [Maven repository warnings](#troubleshoot-maven-warnings)
+ [Debug release APKs](#troubleshoot-android-debug-release)

## Black screen when launching on a device<a name="troubleshoot-android-black-screen"></a>

 Oftentimes, launching a build and seeing a black screen means that either a map failed to load, or shaders are missing\. You can diagnose and resolve the problem by trying the following actions: 
+  Inspect logs from `adb`\. Log messages from the Lumberyard engine include the string `LMBR`, and you can filter the output from `adb logcat` to display only these messages\. Use the following command in a Windows command prompt to get the current device logs: 

  ```
  adb logcat -s LMBR
  ```

   For more information on `adb logcat` and how to improve filtering and which messages are displayed, see the [official Android logcat command\-line tool documentation](https://developer.android.com/studio/command-line/logcat)\. 
+ Make sure that a map is being loaded upon the application launch by following these steps:

  1. Open the file `lumberyard_install_dir/dev/project-name/autoexec.cfg` in a text editor\.

  1. Check the file for a `map` command\. If the map is missing, or references an incorrect map name, add the following line or change the `map` value:

     ```
     map level-to-load
     ```
+  Check to make sure that the device is allowed to connect to the shader compiler\. Run through the following steps to check your configuration and make sure that everything is correctly enabled: 

  1.  If the Shader Compiler is on a remote host, make sure that inbound traffic to the shader compiler's port on the host is allowed\. By default, this port is **61453**\. See also [Remote Shader Compiler](mat-shaders-custom-dev-remote-compiler.md) for full information on configuring to connect to a remote shader compiler\. 

  1.  If the Shader Compiler is running on the same machine with the Android device connected to it, make sure that port forwarding is set up to send traffic to the host from the Android device\. By default, the Shader Compiler's port is **61453**\. Configure device port forwarding by running the following command in a Windows command prompt\. 

     ```
     adb reverse tcp:shader-compiler-port tcp:shader-compiler-port
     ```

  1.  Close the Shader Compiler, delete any produced assets, and restart it\. Shader Compiler assets for Android are placed in `lumberyard_install_dir\dev\Cache\project-name\es3\user\cache\shaders`\. 

  1. Delete the application from your device, rebuild, and re\-deploy\.

   To run through the full process of setting up a connection from your device to the Shader Compiler, see [Connect to the Shader Compiler](android-build-deploy.md#running-the-shader-compiler-for-android) or [Serving assets over the Virtual File System \(VFS\)](android-configure-project.md#android-vfs)\. 

## Maven repository warnings<a name="troubleshoot-maven-warnings"></a>

 As part of a Lumberyard build or configure, you might see some warnings similar to the following\. 

```
[WARN] Failed to connect to https://maven.google.com/androidx/compose/ui/group-index.xml.  Access to Google's main Maven repository may be incomplete.
[WARN] Failed to connect to https://maven.google.com/androidx/core/group-index.xml.  Access to Google's main Maven repository may be incomplete.
```

 Behind the scenes, `lmbr_waf` is invoking the Android build tools, which use the Gradle build system\. Gradle pulls up\-to\-date libraries and does some versioning dependency checks by pulling information from Google's Maven repositories\. These warnings aren't fatal and shouldn't prevent you from producing a build, but you can remove them by updating the Gradle version for the Android Studio project generated by `lmbr_waf configure`\. 

**To remove Maven repository errors**

1.  Import the project located at `lumberyard_install_dir/dev/Solutions/LumberyardAndroidSDK` into Android Studio\. See [Import a Gradle project to Android Studio](https://developer.android.com/studio/intro/migrate#import_a_gradle-based_intellij_project)\. 

1.  Wait for the project to load and for the initial Gradle configure to complete\. 

1.  At a certain point during the configuration, Android Studio will report that the Gradle plugin is ready to update by displaying a popup notification\. Select **update** in this notification\.   
![\[A popup notification from Android Studio. The blue text at the far right, "update", is a call to action for the user to select.\]](/images/userguide/platforms/android/gradle-update.png)

1.  Another dialog box will appear, informing you of the version to update to and giving you the option to see release notes\. Select the **Update** button in this dialog to update the Gradle plugin and remove build warnings\. 

**Note**  
 If you ever regenerate your Android Studio project, you'll need to perform these steps again\. As long as the project isn't overwritten, you can safely run `lmbr_waf configure` without needing to make more changes\. 

## Debug release APKs<a name="troubleshoot-android-debug-release"></a>

 As part of building for release, debugging symbols are stripped from the final executable\. Whether you're trying to diagnose issues before release or working on something reported by a user in your Google Play Store release, the solution is the same\. Android uses special metadata associated with the APK to determine whether or not the Android debugger is allowed to connect to a release binary\. 

 This setting is controlled through the Gradle build system\. See the Android Studio documentation on [enabling debugging](https://developer.android.com/studio/debug#enable-debug) for build variants, and [debugging pre\-build APKs](https://developer.android.com/studio/debug/apk-debugger)\. This documentation has a full set of instructions on how to use debug symbols generated by earlier builds with release APKs\. 