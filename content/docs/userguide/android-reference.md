---
description: ' Learn &ALYlong; build commands and settings for the Android platform. '
title: Reference for Android
---
# Reference for Android<a name="android-reference"></a>

 This section is a reference for commands and build settings used by Lumberyard when working with the Android platform\. For general information and system\-wide build settings or commands, see the following topics\. 
+ [Waf Commands and Options](waf-commands.md)
+ [Waf Project Settings](waf-project-settings.md)

**Topics**
+ [Build command reference](#android-reference-build)
+ [Waf settings](#android-waf-settings)
+ [Android build configuration file](#android-specific-settings)
+ [Other command\-line arguments](#android-command-line-args)
+ [Lumberyard project settings for Android](#android-reference-project-settings)

## Build command reference<a name="android-reference-build"></a>

 This section contains information on the available build variants and commands that are used to build and deploy Android projects through `lmbr_waf`\. The `lmbr_waf` commands are structured as `command_android_armv8_clang_variant`\. For example, you deploy a debug build to a device with the following command: 

```
lmbr_waf deploy_android_armv8_clang_debug -p game_and_engine
```

**Tip**  
 Since you never need to build the editor or any tools for Android, you can always use the `game_and_engine` project spec with any Android commands\. 

 Valid values for all of these parts of a command are indexed here\. You can also display all available Android build commands by using `lmbr_waf --help` from the command line\. 

### Commands<a name="android-waf-commands"></a>

**build**  
Build the currently selected Lumberyard project\.

**deploy**  
Manually deploy to a connected device\.

**clean**  
Clean local build artifacts\. This command doesn't perform any device cleanup\.

**package**  
Package the contents of your project into a single distributable APK\.

### Build variants<a name="android-waf-variants"></a>

**debug**  
Enables debugging\. Does not change or disable any optimizations during compile time\.

**profile**  
Enables debugging\. Does not change or disable any optimizations during compile time\.

**release**  
Disables debugging and strips debug symbols in the final build\.

## Waf settings<a name="android-waf-settings"></a>

 The Waf build system settings can be controlled by either setting an attribute value in `lumberyard_install_dir/dev/_WAF_/user_settings.options`, or by passing an argument on the command line\. The configuration file is written in [INI file format](https://en.wikipedia.org/wiki/INI_file)\. Each of the following reference tables are named after their corresponding INI section header\. 

 For a full reference of all configurable Waf settings, see [Waf User Options and Settings](waf-user-options-and-settings.md)\. 


**Android Options**  

| Attribute \(config file\) | Parameter \(command line\) | Description | Default | 
| --- | --- | --- | --- | 
| android\_maven\_force\_http | \-\-android\-maven\-force\-http\-requests | Forces Android Maven library requests to use HTTP instead of HTTPS\. | False | 
| android\_asset\_mode | \-\-android\-asset\-mode |  Specify one of the following asset packaging modes: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/android-reference.html) For more information on asset modes, see [Handling assets on Android](android-configure-project.md#android-configure-asset-loading)\.  | configuration\_default | 


**Android Deploy**  

| Attribute \(config file\) | Parameter \(command line\) | Description | Default | 
| --- | --- | --- | --- | 
| deploy\_android | \-\-deploy\-android | Deploys to an Android device after a successful package command\. | True | 
| deploy\_android\_clean\_device | \-\-deploy\-android\-clean\-device | Completely uninstalls the app from the target device\. | True | 
| deploy\_android\_device\_filter | \-\-deploy\-android\-device\-filter | Comma\-separated list of Android device IDs to deploy to\. If empty, deploys to all connected devices\. |  | 
| deploy\_android\_executable | \-\-deploy\-android\-executable | Installs the executable \.apk file on the Android device\. | True | 
| deploy\_android\_install\_options | \-\-deploy\-android\-install\-options | Provides additional options to specify for the install command\. |  | 
| deploy\_android\_replace\_apk | \-\-deploy\-android\-replace\-apk | When installing the \.apk file to the Android device, uses the \-r option to force the replacement of the package\. | True | 


**Android Project Generator**  

| Attribute \(config file\) | Parameter \(command line\) | Description | Default | 
| --- | --- | --- | --- | 
| android\_studio\_project\_folder | \-\-android\-studio\-project\-folder | Name of the directory in which the generated Android Studio project should be stored\. | Solutions | 
| android\_studio\_project\_name | \-\-android\-studio\-project\-name | Name of the root Android project directory and Android Studio project name\. | LumberyardAndroidSDK | 
| generate\_android\_projects\_automatically | \-\-generate\-android\-projects\-automatically | Automatically generates Android Studio projects\. | True | 

## Android build configuration file<a name="android-specific-settings"></a>

 Lumberyard stores some settings for the Android platform in an independent file, `lumberyard_install_dir\dev\_WAF_\android\android_settings.json`\. This file contains a JSON dictionary of build setting names and their values\. 

**Important**  
 After making any changes to the Android settings, run `lmbr_waf configure`\. Taking this action causes your changes to be imported to the generated Android Studio project and its manifest information\. 

**DEV\_KEYSTORE\_ALIAS**  
 The keystore alias used in the **Development** environment by the Android JAR signer\. This value is exported to the build command's environment as `KEYSTORE_ALIAS`\. 

**DEV\_KEYSTORE**  
 The path to the keystore used in the **Development** environment by the Android JAR signer\. This path should either be absolute or relative to the `lumberyard_install_dir\dev` directory\. This value is exported to the build command's environment as `KEYSTORE`\. 

**DISTRO\_KEYSTORE\_ALIAS**  
 The keystore alias used in the **Distribution** environment by the Android JAR signer\. This value is exported to the build command's environment as `KEYSTORE_ALIAS`\. 

**DISTRO\_KEYSTORE**  
 The path to the keystore used in the **Distribution** environment by the Android JAR signer\. This path should either be absolute or relative to the `lumberyard_install_dir\dev` directory\. This value is exported to the build command's environment as `KEYSTORE`\. 

**BUILD\_TOOLS\_VER**  
 The version of the Android build tools to use\. The value can either be **latest** to use the most recent version of the Android build tools, or a specific version identifier\. 

**SDK\_VERSION**  
 The SDK version to use\. The value must be in the format **android\-*apilevel***, where *apilevel* is the API level of the SDK\. 

**NDK\_PLATFORM**  
 The NDK version to use\. The value must be in the format **android\-*version***, where *version* is the major version number of the NDK\. 

**BUILD\_ENVIRONMENT**  
Selects which environment is being built for\. Valid values are **Development** and **Distribution** \(case\-sensitive\)\.    
**Development**  
The default environment, used for daily development\. Building for the Development environment doesn't require a key store or signing key\.  
**Distribution**  
 Build for distribution to the Google Play Store\. This environment requires that you use the `--distro-key-pass` and `--distro-store-pass` arguments to access the distribution key store and your signing key\. 

## Other command\-line arguments<a name="android-command-line-args"></a>

 Android builds use some command\-line arguments that are not stored in a configuration file because they would contain sensitive data, or are best for one\-off use\. There are also some arguments that override some settings that are less commonly changed\. 

`--android-sdk-version-override`  
Override the Android SDK version used in the Java compilation\. Only works during configure\.

`--android-ndk-platform-override`  
Override the Android NDK platform version used in the native compilation\. Only works during configure\.

`--dev-store-pass`  
 The password for the development keystore\. Lumberyard ships with a store with the password `Lumberyard` by default\. This default password is used in the Development environment if this command\-line argument is missing\. 

`--dev-key-pass`  
 The password for the development key\. Lumberyard ships with a self\-signed key with the password `Lumberyard` in its default key store\. This default password is used in the Development environment if this command\-line argument is missing\. 

`--distro-store-pass`  
The password for the distribution keystore\. This argument is required when using the Distribution environment\.

`--distro-key-pass`  
The password for the distribution key\. This argument is required when using the Distribution environment\.

`--deploy-android-attempt-libs-only`  
 Push only the changed native libraries\. If `deploy_android_executable` is enabled, it takes precedence if the executable was modified\. This option is ignored if `deploy_android_clean_device` is enabled\. This argument only works when deploying to a rooted device\. 

## Lumberyard project settings for Android<a name="android-reference-project-settings"></a>

 As part of every Lumberyard project, there is a settings file that describes the application and per\-project build settings\. This file is located at `lumberyard_install_dir/dev/project-name/project.json`\. Within the JSON dictionary contained in this file is the key `android_settings`, with a value of a JSON dictionary that contains the settings used by your project when building and deploying for Android\. 

**`package_name`**  
 Android application package identifier\. Used for generating the project\-specific Java activity class and as part of `AndroidManifest.xml`\. The identifier must be in reverse domain name format\.   
For more information, see the [Android Application ID documentation](https://developer.android.com/studio/build/application-id.html)\.  
Type: String  
Default: `"com.lumberyard.sdk"`

**`version_number`**  
Internal application version number\. Used to set the `"android:versionCode"` value of `AndroidManifest.xml`\.   
Type: Integer \(32\-bit\)  
Default: `1`

**`version_name`**  
Human\-readable version number, displayed in the Google Play Store\. Used to set the `"android: versionName"` value of `AndroidManifest.xml`\.  
Type: String  
Default: `"1.0.0.0"`

**`orientation`**  
The orientation of the Android app\. Used to set the `"android:screenOrientation"` value of `AndroidManifest.xml`\.  
For valid values, see the [Android Activity documentation](http://developer.android.com/guide/topics/manifest/activity-element.html#screen)\.  
Type: String  
Default: `"landscape"`

**`icons`**  
A map of icon override paths based on screen DPI\. All entries should be paths relative to `lumberyard_install_dir/Code/project-name/Resources` or an absolute path\.  
Available options:  
+ `default` – Default image used if a specific DPI is not specified
+ `mdpi` – Medium \~160 DPI
+ `hdpi` – High \~240 DPI
+ `xhdp` – Extra high \~320 DPI
+ `xxhdpi` – Extra\-extra high \~480 DPI
+ `xxxhdpi` – Extra\-extra\-extra high \~640 DPI
For more information on Android screen DPI settings, see the [Android screen compatibility documentation](https://developer.android.com/guide/practices/screens_support.html)\.   

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
```
Default: `{}`

**`app_public_key`**  
The app license key that the Google Play store provides\. Required for using APK expansion files or other Google Play Services\.  
Type: String  
Default: `"NoKey"`

**`app_obfuscator_salt`**  
Salt used in the signing of OBB files\.  
Type: String \(Base64\)  
Default: `""`

**`use_main_obb`**  
Specify if the "Main" APK Expansion file should be used\. This option toggles the APK expansion file mode in release builds\.   
Type: String \(`"true"` \| `"false"`\)  
Default: `"false"`

**`use_patch_obb`**  
Specify if the "Patch" APK expansion file should be used\. This option toggles the APK expansion file mode in release builds\.   
Type: String \(`"true"` \| `"false"`\)  
Default: `"false"`

**`enable_key_screen_on`**  
Enable or disable the screen wake lock\. If `true`, the device won't go to sleep while the activity is active\.   
Type: String \(`"true"` \| `"false"`\)  
Default: `"false"`

**`disable_immersive_mode`**  
Disable the hiding of top and bottom system bars\.   
Type: String \(`"true"` \| `"false"`\)  
Default: `"false"`

**`rc_pak_job`**  
Path to the RC job XML file that's used to override the normal APK expansion file generation that's used in release builds\.   
The path must be relative to `lumberyard_install_dir/dev/Bin64/rc`\.  
Type: String \(Path\)  
Default: `" RCJob_Generic_Android_MakeObb.xml"`

**`multi_window_options`**  
Information for multi\-window support when targeting Android N \(API 24\) or later\.  
The keys used in this dictionary for window settings are as follows:    
**`enabled`**  
Activate or deactivate multi\-window support\.  
Type: Boolean  
Default: `false`  
**`default_width`**  
The preferred density\-independent pixel width of the application when launching in multi\-window mode\. This measurement is in dp, which is always calculated against a 160dpi screen \(1dp = 1 pixel on a 160dpi screen\)\.  
Type: Integer  
Default: None  
**`default_height`**  
The preferred density\-independent pixel height of the application when launching in multi\-window mode\. This measurement is in dp, which is always calculated against a 160dpi screen \(1dp = 1 pixel on a 160dpi screen\)\.  
Type: Integer  
Default: None  
**`min_width`**  
The minimum density\-independent pixel width that your application can run in multi\-window mode\. Your application is cropped if the window is smaller than this value\.  
This measurement is in dp, which is always calculated against a 160dpi screen \(1dp = 1 pixel on a 160dpi screen\)\.  
Type: Integer  
Default: None  
**`min_height`**  
The minimum density\-independent pixel height that your application can run in multi\-window mode\. Your application will be cropped if the window is smaller than this value\.  
This measurement is in dp, which is always calculated against a 160dpi screen \(1dp = 1 pixel on a 160dpi screen\)\.  
Type: Integer  
Default: None  
**`gravity`**  
The preferred starting location of the window when launched in multi\-window mode\.   
See the [Android LinearLayout documentation](https://developer.android.com/reference/android/widget/LinearLayout.LayoutParams#xml-attributes_1) for valid values\.  
Type: String  
Default: None
Type: Dictionary  
Default: Empty