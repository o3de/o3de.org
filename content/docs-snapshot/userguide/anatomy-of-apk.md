# Anatomy of an Android Application<a name="anatomy-of-apk"></a>

Before you create an app, learn more about the following types of Android applications \(APK\) that the build system can generate\.

**Topics**
+ [Basic APK](#anatomy-of-basic-apk)
+ [Packed APK](#anatomy-of-packed-apk)
+ [VFS APK](#anatomy-of-vfs-apk)
+ [Release APK](#anatomy-of-release-apk)
+ [ARMv8](#armv8)
+ [Scenarios for APKs](#scenarios-for-working-with-apks)

## Basic APK<a name="anatomy-of-basic-apk"></a>

To build for Android, you need an APK that can run on your device\. The APK contains, at a minimum, the executable binaries for your app\. This is called a basic APK\.

![\[Basic APK for building for Android.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/android/android-basic-apk-anatomy.png)

When you use a basic APK, the assets for your app must be copied to your device's SD card\. You can copy the assets or use the build system\. Engineers who iterate on code and don't frequently change data should find using a basic APK an efficient way for working\.

## Packed APK<a name="anatomy-of-packed-apk"></a>

A packed APK already contains the assets for your app\. If you use a packed APK, you don't need to copy files to the SD card\. You can also distribute the APK to your team members for play testing\. The build tools can include the asset files for your project as loose files or as a series of PAK files\.

![\[Packed APKs for building for Android.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/android/android-packed-apk-anatomy.png)

## VFS APK<a name="anatomy-of-vfs-apk"></a>

A VFS APK is a build variation that you use with a Virtual Filing System \(VFS\)\. This is similar to a basic APK except that two configuration files, `bootstrap.cfg` and `game.xml`, must be copied to your SD card\. After your app reads these files, the app connects to your computer and uses the assets directly from the `Cache` directory on your hard drive\.

If you're an artist, you might find the VFS APK is the most useful method\. It lets you iterate on content and see your changes on the device in real time\.

![\[VFS APKs for building for Android.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/android/android-vfs-apk-anatomy.png)

## Release APK<a name="anatomy-of-release-apk"></a>

A release APK is one that you can publish to the Google Play store\. A release APK contains the executable and binaries and assets that your apps need to run\. All assets must be in PAK files\. All shaders that your app requires must be stored as PAK files in the APK\.

**Important**  
If your APK is greater than 100 Mb, you must use Opaque Binary Blobs \(OBBs\)\. These are also known as APK Expansion files\.

![\[Release APK for building for Android.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/android/android-release-apk-anatomy.png)

**Example**  
When you create an OBB, you can split up your game, as shown in the following diagram\. You should include enough assets so that users can see a splash screen and some activity while the OBB downloads\.  
In this example, the first five levels are included so that your users can play your game while the remaining levels are downloaded to their devices\.  

![\[Use OBBs to create a release APK.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/android/android-release-apk-anatomy-2.png)

## ARMv8<a name="armv8"></a>

Lumberyard build tools let you build for the ARMv8 architecture, which is 64\-bit\. 

**Note**  
Starting August 2019, apps for sale through the Google Play store must support ARMv8 builds\.

Currently, the Lumberyard build system doesn't support the generation of a fat APK\. A fat APK contains binaries for and ARMv8\. This keeps the size of the final APK as small as possible\.

## Scenarios for APKs<a name="scenarios-for-working-with-apks"></a>

The APK that you choose depends on your use case\.

### Development<a name="development-apk"></a>

When you use a basic, packed or VFS APK, your app must connect to the Remote Shader Compiler\. The Remote Shader Compiler compiles the shaders that your game uses into a format that your device can support\. You connect the app to the Remote Shader Compiler over Wi\-Fi or a USB using Asset Processor\.

![\[Connect your APK using the Remote Shader Compiler.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/android/android-apk-development-example-1.png)

If you use VFS, the app attempts to connect to Asset Processor on startup\.

![\[Connect to Asset Processor using the VFS APK.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/android/android-apk-development-example-2.png)

### Release<a name="release-apk"></a>

There are two ways you can use a release APK\. 

1. Use the standard standalone version\. 

1. If your app exceeds 100 Mb, you must use [APK expansion files](https://developer.android.com/google/play/expansion-files.html)\.

The Android binaries generated by the build process are placed in a directory named `BinAndroidClangArmv8`, followed by `.Debug`, `.Profile` or `.Release` \(for example, `BinAndroidClangArmv8.Release`\)\.