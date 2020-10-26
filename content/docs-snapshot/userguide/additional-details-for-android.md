# Additional Details for Android<a name="additional-details-for-android"></a>

This section provides additional details about the build system and configuration files\.

**Topics**
+ [Build Commands](#build-commands-for-android)
+ [Game Project File](#game-project-file)
+ [Building Your Code with Visual Studio](#building-your-code-with-visual-studio)
+ [Debugging Your App With Visual Studio](#debugging-your-app-with-visual-studio)

## Build Commands<a name="build-commands-for-android"></a>

This section shows the build commands that you can use to debug your project\.


**For PC**  

| Build Type | Command | 
| --- | --- | 
|  Debug ARMv8 \(64 bit\)  |  `lmbr_waf.bat build_android_armv8_clang_debug -p all`  | 
|  Profile ARMv8 \(64 bit\)  |  `lmbr_waf.bat build_android_armv8_clang_profile -p all`  | 
|  Release ARMv8 \(64 bit\)  |  `lmbr_waf.bat build_android_armv8_clang_release -p all`  | 


**For macOS**  

| Build type | Command | 
| --- | --- | 
|  Debug ARMv8 \(64 bit\)  |  `sh lmbr_waf.sh build_android_armv8_clang_debug -p all`  | 
|  Profile ARMv8 \(64 bit\)  |  `sh lmbr_waf.sh build_android_armv8_clang_profile -p all`  | 
|  Release ARMv8 \(64 bit\)  |  `sh lmbr_waf.sh build_android_armv8_clang_release -p all`  | 

### Example Build Commands<a name="example-build-commands-for-android"></a>

See the following examples of common command line build commands\. The examples are for a PC but you can run them on macOS\. Change `lmbr_waf.bat` to `lmbr_waf.sh`\.

**Example**  
To build your entire project, clean the device, and push all content to the device, enter the following command\.  

```
lmbr_waf.bat build_android_armv8_clang_profile -p all --deploy-android-executable=True
```

**Example**  
To deploy changed assets only and nothing else, enter the following command\.  

```
lmbr_waf.bat deploy_android_armv8_clang_profile -p all --deploy-android-executable=False --deploy-android-clean-device=False
```

## Game Project File<a name="game-project-file"></a>

All game projects have a `project.json` file in your projects directory \(for example, `lumberyard_version/dev/SamplesProject/project.json`\)\.

**Example**  
 The default file looks similar to the following example\.  

```
"android_settings": {
        "package_name"  : "com.lumberyard.samples",
        "version_number": 1,
        "version_name"  : "1.0.0.0",
        "orientation"   : "landscape",
        "app_public_key" : "MY_APP_PUBLIC_KEY",
        "app_obfuscator_salt" : "MY_OBFUSCATOR_SALT_BASE_64",
        "use_main_obb" : "false",
        "use_patch_obb" : "false",
        "rc_obb_job" : "RCJob_Generic_Android_MakeObb.xml"
    },
```

See the following settings to specify in this file\.


****  

| Value | Description | 
| --- | --- | 
|  `package_name`  |  Android application package identifier\. Used for generating the project specific Java activity class and in the `AndroidManifest.xml`\. You must specify the `package_name` in dot\-separated format\. Default: `"com.lumberyard.sdk"` For more information, see the [Android documentation](https://developer.android.com/studio/build/application-id.html)\.  | 
| version\_number |  Internal application version number\. Used to set the `"android:versionCode"` tag in the `AndroidManifest.xml`\.  This value interprets as a signed 32\-bit integer\. Default: `1`  | 
|  `version_name`  |  Human\-readable version number\. Used to set the `"android: versionName"` tag in the `AndroidManifest.xml`\. This value is displayed in the Google Play store, for example `"1.2.3-beta"`\. Default: `"1.0.0.0"`  | 
| orientation |  The orientation of the Android app\. Used to set the `"android:screenOrientation"` tag in the `AndroidManifest.xml`\. For valid values, see the [Android documentation](http://developer.android.com/guide/topics/manifest/activity-element.html#screen)\. Default: `"landscape"`  | 
|  `icons`  |  A map of icon override paths for each screen DPI type\. All entries require a path that is relative to `<engine>/Code/<project>/Resources` or an absolute resource path to the PNG image\. Available suboptions: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/additional-details-for-android.html) For more information on Android screen DPI settings, see the [Android documentation](https://developer.android.com/guide/practices/screens_support.html)\.  

**Example**  

```
"icons" :
{
    "default" : "AndroidLauncher/icon-xhdpi.png",

    "mdpi" : "AndroidLauncher/icon-mdpi.png",
    "hdpi" : "AndroidLauncher/icon-hdpi.png",
    "xhdpi" : "AndroidLauncher/icon-xhdpi.png",
    "xxhdpi" : "AndroidLauncher/icon-xxhdpi.png",
    "xxxhdpi" : "AndroidLauncher/icon-xxxhdpi.png"
}
``` Default: Empty  | 
|  `app_public_key`  |  The app license key that the Google Play store provides\. Required for using APK expansion files or other Google Play Services\. Default: `"NoKey"`  | 
|  `app_obfuscator_salt`  |  Application specific value for \(un\)obfuscation when using APK expansion files\. Example: `"8d87473f5b24852836d06512abbd9e9b9869c208"` Default: `""`  | 
|  `use_main_obb`  |  Specify if the "Main" APK Expansion file should be used\. This option toggles APK expansion file mode in release builds\.  Value must be `"true"` or `"false"`\. Default: `"false"`  | 
|  `use_patch_obb`  |  Specify if the "Patch" APK expansion file should be used\. This option toggles APK expansion file mode in release builds\.  Value must be `"true"` or `"false"`\. Default: `"false"`  | 
|  `enable_key_screen_on`  |  Enable or disable the screen wake lock\. This means the device won’t go to sleep while the application is running\.  Value must be `"true"` or `"false"`\. Default: `"false"`  | 
|  `disable_immersive_mode`  |  Disable the hiding of top and bottom system bars\.  Value must be `"true"` or `"false"`\. Default: `"false"`  | 
|  `rc_pak_job`  |  Path to the RC job XML file used to override the normal APK expansion file generation used in release builds\.  The path must be relative to `dev/Bin64/rc`\. Default: `" RCJob_Generic_Android_MakeObb.xml"`  | 
|  `multi_window_options`  |  For multi\-window support when targeting Android N \(API 24\) or later\. 

**Example**  

```
"multi_window_options" : {
    "enabled" : true,
    "default_width" : 600,
    "default_height" : 500,
    "min_width" : 300,
    "min_height" : 450,
    "gravity" : "top\|left"
}
``` Default: Empty See the next table for available suboptions\.  | 
|  |  | 


****  

| Available suboptions | Description | 
| --- | --- | 
|  `enabled`  |  Boolean value\. Toggles multi\-window support on \(true\) and off \(false\)\.  | 
|  `default_width`  | Integer value\. The preferred density independent pixel width of the application when launching in multi\-window mode\. Maps directly to the `android:defaultWidth` in the application layout tag of the `AndroidManifest.xml`\. | 
|  `default_height`  |  Integer value\. The preferred density independent pixel height the application when launching in multi\-window mode\.  Maps directly to the `android:defaultHeight` in the application layout tag of the `AndroidManifest.xml`\.  | 
| min\_width |  Integer value\. The minimum density independent pixel width your application can run in multi\-window mode\.  Your application is cropped if the window is smaller than this value\. Maps directly to the `android:minWidth` in the application layout tag of the `AndroidManifest.xml`\.  | 
|  `min_height`  |  Integer value\. The minimum density independent pixel width your application can run in multi\-window mode\.  Your application will be cropped if the window is smaller than this value\. Maps directly to the `android:minHeight` in the application layout tag of the `AndroidManifest.xml`\.   | 
|  `gravity`  |  String value\. The preferred starting location of the window when launched in multi\-window mode\.  See the [Gravity](https://developer.android.com/reference/android/widget/LinearLayout.LayoutParams#xml-attributes_1) Android documentation page for acceptable values\. Maps directly to the `android:gravity` in the application layout tag of the `AndroidManifest.xml`\.  | 

## Building Your Code with Visual Studio<a name="building-your-code-with-visual-studio"></a>

**Note**  
During the install process for Visual Studio, you must select **Visual C\+\+ Mobile Development**\.

**To build your code with Visual Studio**

1. Rerun the Visual Studio installer and select **Add Additional Components**\.

1. Select **Visual C\+\+ Mobile Development**\.

1. After the installation is complete, navigate to `lumberyard_version/dev/Solutions` and open the `LumberyardSDK_vs2017.sln` file\.

1.  After the file loads, select ARM as your target from the dropdown menu at the top of the editor\.  
![\[Select ARM in Visual Studio.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/android/android-build-your-code-arm.png)

1. Set your startup project to the Android launcher\.  
![\[Set your startup project to the Android launcher in Visual Studio.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/android/android-build-your-code-android-build-your-code-launcher.png)

1. Build using the standard Visual Studio shortcuts, such as **Ctrl\+Shift\+B**, or use the dropdown menus\.

## Debugging Your App With Visual Studio<a name="debugging-your-app-with-visual-studio"></a>

Configure the build system to deploy assets to the device\. You can also manually copy the assets to your device when debugging using Visual Studio\.

You must open another instance of Visual Studio to debug your APK and follow these steps\.

**To debug your app using Visual Studio**

1. In Visual Studio, choose **Open**, **Project/Solution**\.

1. Navigate to your APK located in the `lumberyard_version/dev/BinAndroidClang.Debug` directory\. For profile builds, your APK is located in the `dev/BinAndroid`directory\.

1. In Visual Studio, navigate to the project window, right\-click the project, and choose **Properties**\.

1. For **Additional Symbol Search Paths**, enter the following directories:
   + `dev/BinAndroidClang.Debug`
   + `dev/Code`

     Your configuration should look similar to the following example\.  
**Example**    
![\[Set up debugging in Visual Studio for your Android app.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/android/android-debug-your-app-visual-studio.png)

1. To open code files, choose **File**, **Open**\.

1. If needed, set breakpoints, and press **F5** to run\.