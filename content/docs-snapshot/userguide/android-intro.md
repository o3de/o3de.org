# Android Support<a name="android-intro"></a>

Follow this guide to create Android applications \(apps\) using Lumberyard\. This guide shows you how to do the following:
+ Configure the build tools to generate assets that your app loads\.
+ Build and debug code\.
+ Generate different types of apps for development or release\.

Lumberyard has the following minimum requirements for Android:


****  

|  |  | 
| --- |--- |
| CPU | ARM quad\-core or newer\(for example, ARM Krait 400, Cortex\-A53\) | 
| GPU | Adreno 330, Mali\-T760 or newerSupports OpenGL 3\.0 | 
| OS | 10\.0 \(API level 29\) or later | 
| Example devices | Samsung Galaxy Note 4LG Nexus 5Kindle Fire HDX | 

For development requirements and how to set up your environment, see [Setting Up Your Environment](android-setting-up-environment.md)\.

**Topics**
+ [Prerequisites](#android-prerequisites)
+ [Quick Start: Running the Samples Project on Android Devices](android-quick-start.md)
+ [Anatomy of an Android Application](anatomy-of-apk.md)
+ [Setting Up Your Environment](android-setting-up-environment.md)
+ [Building Your Android Game](building-your-android-game.md)
+ [Using the Virtual File System](using-the-virtual-filing-system-vfs.md)
+ [Running the Deployment Tool](run-the-deployment-tool.md)
+ [Additional Details for Android](additional-details-for-android.md)
+ [PAK Files](pak-files-for-android.md)
+ [Troubleshooting for Android](troubleshoot-android.md)
+ [Using a Samsung Device with Lumberyard](android-samsung-lumberyard.md)
+ [Using the AWS Device Farm for Android Builds](android-builds-aws-device-farm.md)

## Prerequisites<a name="android-prerequisites"></a>

To build games for Android, meet the following requirements:
+ You've installed Lumberyard on your computer\. You should be familiar with Lumberyard Editor, the Shader Compiler, and Asset Processor\.
+ You're comfortable using a command line interface\.
+ You've built the PC code at least once\.
+ You've configured Visual Studio 2017 or Visual Studio 2019 \(PC only\) with the **Mobile development with C\+\+** workload for debugging\.
+ You've installed Android Studio and an Android SDK supporting API level 29 or later\. For help setting up Android Studio and the minimum versions of the SDK, see [Setting Up Your Environment](android-setting-up-environment.md)
+ You've [configured ](http://developer.android.com/tools/device.html) your Android device for development and connected it to your computer using a USB cable\.

**Topics**

**About Lumberyard Binaries**  
In this guide, you'll see references about the directory where the Lumberyard binaries are placed\. These binaries are placed either by the installer or as a result of you rebuilding them\. When you install Lumberyard, you'll see the following directories:

**For PC**
+ `dev/Bin64vc141` – Binaries generated with Visual Studio 2017
+ `dev/Bin64vc142` – Binaries generated with Visual Studio 2019

**For Mac**
+ `dev/BinMac64`

If you use binaries generated with Visual Studio, continue to use the mentioned executable from that directory, such as `Bin64vc141/AssetProcessor.exe`\.