---
description: ' Develop Open 3D Engine projects for use on Android devices. '
title: 'O3DE Android support'
weight: 100
---

 In this section, you'll learn about the system requirements for Android\. You will also learn how to set up your Open 3D Engine installation for Android builds, configure your project for Android support, and build and deploy to devices\. When you finish your development cycle and are ready to release, that's covered here too\. Along the way, you'll want to use the troubleshooting guide and reference materials to help resolve any issues you might find\.

**Topics**
+ [Minimum device requirements](#android-minimum-requirements)
+ [Prerequisites](#android-prerequisites)
+ [Video tutorial](#android-setting-up-environment-video)
+ [Set up your environment to develop for Android with O3DE](/docs/user-guide/features/platforms/android/setting-up-environment.md)
+ [Configure O3DE projects for Android](/docs/user-guide/features/platforms/android/configure-project.md)
+ [Build and deploy your project for Android](/docs/user-guide/features/platforms/android/build-deploy.md)
+ [Releasing O3DE projects for Android](/docs/user-guide/features/platforms/android/deploy-release.md)
+ [Troubleshooting O3DE issues on Android](/docs/user-guide/features/platforms/android/troubleshooting.md)
+ [Reference for Android](/docs/user-guide/features/platforms/android/reference.md)

## Minimum device requirements {#android-minimum-requirements}

 O3DE has the following minimum requirements to deploy to Android\. These are only minimum device specs\. Newer devices offer better performance and require fewer optimizations\. Most devices released in 2017 or later meet these criteria\.


****

|  |  |
| --- |--- |
| CPU | ARMv8 quad\-core |
| GPU | OpenGL ES 3\.0 or 3\.1 support |
| OS | Android 5\.0 \(API level 21\) |

 If your O3DE project requires higher minimum specifications than these to achieve what you consider acceptable performance, you can set your own device and capability requirements through the Google Play Store\. See the [Android documentation](https://support.google.com/googleplay/android-developer/answer/7353455) for more information\.

## Prerequisites {#android-prerequisites}

 To get started with your O3DE project on Android, you need the following software installed, in addition to O3DE\. If you need to, [download O3DE now](/docs/userguide/setup/downloading-lumberyard.md)\. O3DE can be configured for Android development either when you install it, or after you set up your Android tools\. See [Set up your environment to develop for Android with O3DE](/docs/user-guide/features/platforms/android/setting-up-environment.md) for more information\.
+  An Android development environment\. This can be either Android Studio or the standalone command line tools\. For developers not already familiar with working with Android, we recommend Android Studio, which includes the command\-line tools\. [Download Android developer tools](https://developer.android.com/studio/#downloads)\.
+

  The required minimum development SDKs:
  +  Microsoft Visual Studio 2019 or 2017\. [Download Visual Studio from Microsoft](https://visualstudio.microsoft.com/downloads/)\.
  + Android NDK r21
  + Android SDK API level 28 \(Android 9\.0 - Pie\)\. The following libraries and tools are required as part of the SDK installation\.
    + Google Play APK Expansion Library
    + Google Play Licensing Library
    + Android SDK Tools
    + Android SDK Platform\-Tools
    + Build Tools 26\.x\.x or later
**Important**
 Google requires that new apps submitted to the Google Play Store are built against an SDK version that is no more than one year old\. To make sure that you meet this requirement, build against the latest available Android SDK and check for updated versions before any submission to the Google Play Store\.

   For instructions on installing the Android SDK and NDK, see the [Android Studio SDK Manager](https://developer.android.com/studio/intro/update#sdk-manager) or [Command\-line `sdkmanager`](https://developer.android.com/studio/command-line/sdkmanager) documentation on the Android developer site\. For information on the packages required as part of the Android SDK install, see [Set up your environment to develop for Android with O3DE](/docs/user-guide/features/platforms/android/setting-up-environment.md)\.

## Video tutorial {#android-setting-up-environment-video}

 To help you get up and running quickly with Android, we have a video tutorial \(10:10\) that walks through the process of getting Android Studio installed, configuring your O3DE project, and running the project on an Android device\.