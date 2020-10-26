# Quick Start: Running the Samples Project on Android Devices<a name="android-quick-start"></a>

You can use this quick start to run the [Samples Project](sample-project-samples.md) on your Android device from a Windows computer\.

## Prerequisites<a name="android-quick-start-prerequisites"></a>

This topic assumes that you meet the following requirements:
+ Lumberyard installed on a Windows computer\.
+ An Android device [configured](https://developer.android.com/studio/run/device) and connected to your computer with a USB cable
+ Familiarity with Lumberyard Editor

**Topics**
+ [Prerequisites](#android-quick-start-prerequisites)
+ [Downloading Required Software](#android-quick-start-downloads)
+ [Configuring Android Studio](#configuring-android-studio)
+ [Configuring Lumberyard Setup Assistant](#set-up-samples-project-on-android)
+ [Configuring Asset Processor](#set-up-asset-processor-for-android)
+ [Running the Deployment Tool](#run-the-deployment-tool-for-android)

## Downloading Required Software<a name="android-quick-start-downloads"></a>

Download the following software:
+ [Android Studio 3\.3 or later](https://developer.android.com/studio/index.html)
+ [Android NDK r20 or later](https://developer.android.com/ndk/downloads/older_releases)
+ [Java SE Development Kit \(JDK\) 1\.8 or later](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

## Configuring Android Studio<a name="configuring-android-studio"></a>

After you install Android Studio, you must configure it\.

**To configure Android Studio**

1. Open **Android Studio**, choose **Tools**, **Android** and choose **SDK Manager**\.
**Note**  
You can also open the **SDK Manager** from the **Welcome to Android Studio** dialog\. 

1. Choose **SDK Tools** and select the following options:
   + **Google Play APK Expansion Library**
   + **Google Play Licensing Library**
   + **Android SDK Platform\-Tools**
   + **Android SDK Tools**

1. Choose **OK**\.

## Configuring Lumberyard Setup Assistant<a name="set-up-samples-project-on-android"></a>

Use Lumberyard Setup Assistant to install the required third\-party software and SDKs for Android\.

**To run the Samples Project on an Android device**

1. Navigate to the `lumberyard_version\dev\Tools\LmbrSetup\Win\` directory and double\-click `SetupAssistant.exe`\.

1. If you see a **Custom Install** box, click **Customize** and verify that the engine root path is correct\.

1. On the **Get Started** page, select the following:
   + **Compile the game code**
   + **Compile the engine and asset pipeline**
   + **Compile the Lumberyard Editor and tools**
   + **Compile for Android devices**

1. On the **Required Software** page, click **Browse** and specify the paths for the following:
   + **Android Native Development \(NDK\)**
   + **Android Software Development Kit \(SDK\) Tools**
   + **Java SE Development Kit \(JDK\)**

     See the following example,  
**Example**    
![\[Required software for Android in Lumberyard.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/android/android-third-party-software.png)

1. Click **Next** until you reach the final page, and close Lumberyard Setup Assistant\.

## Configuring Asset Processor<a name="set-up-asset-processor-for-android"></a>

Next, you must configure Asset Processor so that it can process your game assets for Android\.

1. Navigate to the `lumberyard_version\dev\` directory\.

1. In a text editor, open the `AssetProcessorPlatformConfig.ini` file\. 

1. Remove the semicolon to uncomment `es3=enabled`, as shown in the following example\.

   ```
   [Platforms]
   ;pc=enabled
   es3=enabled
   ;ios=enabled
   ;osx_gl=enabled
   ```

1. Save the file\.

## Running the Deployment Tool<a name="run-the-deployment-tool-for-android"></a>

Next, you must run Lumberyard Editor and the **Deployment Tool** so that the Samples Project runs on your device\.

**To run the deployment tool**

1. Start Lumberyard Editor\.

1. Choose **File**, **Open**, and select the **Advanced\_RinLocomotion** level\.

1. Choose **File**, **Project Settings**, and choose **Deploy to device**\.

1. In the **Deployment Tool** window, select the following\.
   + For **Target Platform**, select **Android ARMv8**\.
   + For **Build Options**, select **Build Game**\.

1. Click **Deploy to local device**\. The code builds and deploys to your device, as shown in the following example\.  
**Example**    
![\[Deploying to the local Android device from Lumberyard.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/android/android-quick-start-log.png)