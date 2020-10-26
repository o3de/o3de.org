# Setting Up Your Environment<a name="android-setting-up-environment"></a>

To get started, download and install [Android Studio](https://developer.android.com/studio/index.html)\. This includes everything that you need to build for Android\.

Lumberyard supports the following minimum versions of the SDK, NDK, and JDK:
+ SDK API level 29\. Include the following when installing the SDK:
  + Google Play APK Expansion Library
  + Google Play Licensing Library
  + Android SDK Tools
  + Android SDK Platform\-Tools
  + Build Tools 26\.x\.x or later
+ NDK r20
+ JDK 1\.8

**Note**  
Google requires that new apps submitted to the Google Play store are built against an SDK version that is no more than one year old\.

**Tip**  
If you're installing the SDK and NDK for the first time, you might find it useful to locate everything under a single directory on your PC\. For example, on a PC, your directory might be `C:\android` or for macOS, `~/android`\.

After you install Android Studio, see the following procedure to configure it\.

**To set up Android Studio**

1. In Android Studio, choose **Tools**, **Android**, **SDK Manager**\.  
![\[Configure Android Studio on initial setup.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/android/android-sdk-manager-set-up.png)

1. In the SDK Manager dialog box, select the SDK tools to install\.

1. Under the **SDK Tools** tab, there's a check box for **NDK**\. Make sure that it installs a version that Lumberyard supports before you download and install it\. 

   We recommend that you download the NDK directly from the [Android Developer Portal](https://developer.android.com/ndk/downloads/index.html)\. If you need an earlier version, you can find it in the [archives](https://developer.android.com/ndk/downloads/older_releases.html) section\.  
![\[Configure Android Studio to download an NDK version that Lumberyard supports.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/android/android-sdk-manager-set-up-2.png)

1. Follow the prompts to install the tools\.

1. After you download and install these tools, run Lumberyard Setup Assistant\.
   + For Windows, run `lumberyard_version/dev/Tools/LmbrSetup/Win/SetupAssitant.exe`\.
   + For macOS, run `lumberyard_version/dev/Tools/LmbrSetup/Mac/SetupAssitant.app`\.

1. On the **Get Started** page, select the following:
   + **Compile the game code**
   + **Compile the engine and asset pipeline**
   + **Compile the Lumberyard Editor and tools**
   + **Compile for Android devices**

1. On the **Required Software** page, click **Browse** and specify the paths for the following:
   + **Android Native Development \(NDK\)**
   + **Android Software Development Kit \(SDK\) Tools**
   + **Java SE Development Kit \(JDK\)**  
**Example**    
![\[Required software for Android in Lumberyard.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/android/android-third-party-software.png)

1. Click **Next** until you reach the final page and close Lumberyard Setup Assistant\.

Edit your system path so that it contains an entry to the directory where the ADB is installed\. Usually, this is the platform\-tools directory\.

**To edit your system path**

1. In the Windows **Control Panel**, click **System**, **Advanced system settings**\.

1. In the **System Properties** dialog box, click **Environment Variables**\.

1. Under **User variables**, edit the **PATH** variable to add the directory where you installed the ADB\. For example, this might be the `SDK_root/platform-tools` directory\.