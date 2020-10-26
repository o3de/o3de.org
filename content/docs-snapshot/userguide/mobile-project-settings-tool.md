# Modifying Project Settings for Mobile Device Games<a name="mobile-project-settings-tool"></a>

Use the **Project Settings Tool** \(PST\) to make streamlined changes to project settings across all mobile platforms\. The **Project Settings Tool** shows properties from all of the project settings files so that you can edit and save changes at once\.

**Note**  
Before you can use the **Project Settings Tool**, you must have Lumberyard Editor installed, and an active project created and set as the default project\.
Currently, only Android and iOS are supported for platform\-specific configuration\.

**Topics**
+ [Settings Files](#mobile-project-settings-tool-settings-files)
+ [Using the Project Settings Tool](#mobile-project-settings-tool-using)
+ [Properties](#mobile-project-settings-tool-properties)

## Settings Files<a name="mobile-project-settings-tool-settings-files"></a>

The **Project Settings Tool** modifies project settings files which are located in their respective project directories\. The main settings file, [`project.json`](waf-files-projects-file.md), is located in the root directory of each project and contains cross\-platform settings for platforms such as PC and Android\. The file also contains platform\-specific settings for PC and Android\.

You can find the project settings for iOS in `project_name\Root\Gem\Resources\PlatformLauncher\Info.plist`\. Plist files have a special format of XML that use dictionaries to store properties\. All plist files have some properties that are common across platforms, yet are stored in each individual file\. 

For more information about `.plist` files, see [About Info\.plist Keys and Values](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Introduction/Introduction.html) and [Core Foundation Keys](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html)\.

For more information about iOS\-specific settings, see [iOS Keys](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/iPhoneOSKeys.html)\.

## Using the Project Settings Tool<a name="mobile-project-settings-tool-using"></a>

You can use the **Project Settings Tool** to set settings related to the current project\. 

**To open the PST**

1. In Lumberyard Editor, choose **File**, **Project Settings**, **Project Settings Tool**\.

1. In the **Project Settings Tool**, you can review and change your settings\. For more information, pause on a property and review the tooltip\. You can also see [Properties](#mobile-project-settings-tool-properties)\.
   + The **Base Settings** apply to all platforms\. 
   + The **Platform Settings** section has tabs for platform\-specific settings\.

1. If you haven't saved your changes, and you want to reload the settings back to the way they are on disk \(in your settings files\), choose **Reload**\.

![\[The Project Settings Tool interface with Base Settings and Platform Settings.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/mobile-project-settings-tool-ui.png)

### Image Previews<a name="mobile-project-settings-tool-using-imagepreview"></a>

For image settings such as **Icons** and **Splashscreens**, the **Project Settings Tool** displays image previews using the image to be used for each dpi or size\.

![\[The Project Settings Tool displays image previews for image settings, such as for Splashscreens and Icons.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/mobile-project-settings-tool-using-imagepreview.png)

### Validation<a name="mobile-project-settings-tool-using-validation"></a>

The **Project Settings Tool** validates settings as you enter values and provides feedback when a value is invalid with the selected setting\. 

A red outline appears around the setting to indicate an invalid value\. You can also pause on the setting to view the error message that describes the reason that the field is invalid\. 

![\[The Project Settings Tool displays a red outline and an error message for incompatible inputs on settings.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/mobile-project-settings-tool-using-validation.png)

### Linked Properties<a name="mobile-project-settings-tool-using-linked-properties"></a>

You can link similar properties to each other\. When you link properties to one another, modifying one of them makes the same changes to all other linked properties\.

**To work with link properties**

1. In the **Project Settings Tool**, navigate to the property that you want to link\. Properties that you can link have a chain\-link icon\.

1. Pause on the link icon to see what properties are linked\. Properties that you can link are automatically linked when loaded from the settings file if all relevant properties have the same value\. 

1. You can enable or disable any link\. To enable a link, click the icon\. All properties that it links to are updated with the current value\.

   When a property's link is enabled and linked to a valid property, the link icon appears intact and has an orange outline\.  
![\[The Bundle Identifier property is linked to the Android Package Name.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/mobile-project-settings-tool-using-linked-properties-1.png)

   When a property's link is broken or disabled, the link icon appears broken and without an orange outline\.  
![\[The Package Name property is linked to the iOS Bundle Identifier.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/mobile-project-settings-tool-using-linked-properties-2.png)

1. To disable a link, click the icon again\.

**Note**  
Some properties are always linked and can't be disabled, such as **Base Settings \- Project Name** and **iOS \- Bundle Name**\. This ensures accuracy for properties that are required to have the same values across platforms\. If the **Project Settings Tool** finds discrepancies between settings files for the always\-linked properties, the `project.json` values take precedence\.

### Reconfiguring the Project<a name="mobile-project-settings-tool-using-reconfigure"></a>

After you make changes and save, the **Project Settings Tool** prompts you to reconfigure your project\.

![\["For new settings to be applied the project must be reconfigured. Would you like to run configure now?"\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/mobile-project-settings-tool-using-reconfigure.png)

If you choose to run the `configure` command, the output appears at the bottom of the window\. Once the results display "Reconfiguration Finished," you can use the **Deployment Tool** to deploy to your device with the new changes\.

**Note**  
If you want to deploy your changes immediately, choose **Yes**\. Lumberyard Editor doesn't automatically run the `configure` command and will not prompt you to do so later\.

![\[The Project Settings Tool displays a successful configure and shows "Reconfiguration Finished."\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/mobile-project-settings-tool-using-reconfigure-result.png)

## Properties<a name="mobile-project-settings-tool-properties"></a>

See the following properties in the **Project Settings Tool**\.

### Base Settings<a name="mobile-project-settings-tool-properties-base"></a>

The **Base Settings** properties apply to both Android and iOS\.


****  

| Property | Description | 
| --- | --- | 
| Project Name |  Name that Lumberyard uses to identify the selected project\. This value should not be changed\.   | 
| Product Name |  Name to be displayed in titles for the executables or apps\.  | 
| Executable Name |  File name of the application that runs the project\. This value should not be changed\.  | 
| Game Folder |  Directory name that stores all of the project's code and resources\. This value should not be changed\.  | 
| Game Dll Name |  File name of the DLL used to load the game\. This value should not be changed\.  | 
| Output Folder |  Directory to which the packaged project is exported after being built\.  | 
| Code Folder |  A legacy setting that specifies the directory that contains code for the project\.  | 

### Android Settings<a name="mobile-project-settings-tool-properties-android"></a>

You can find the following properties in the **Platforms Settings** on the **Android** tab\.


****  

| Property | Description | 
| --- | --- | 
| Package Name |  Android application package identifier\. Used for generating the project\-specific Java activity class and in the `AndroidManifest.xml`\.  Must be in dot\-separated format\.  | 
| Version Name |  Human\-readable version number\. Used to set the `android: versionName` tag in the `AndroidManifest.xml` and is displayed in [Google Play](https://play.google.com/store/apps)\.  | 
| Version Number |  Internal application version number\. Used to set the `android:versionCode` tag in the `AndroidManifest.xml`\.  This value must always be greater than the previously submitted build\. Otherwise, submission to Google Play will fail\.  | 
| Orientation |  Desired orientation of the Android application\. Used to set the `android:screenOrientation` tag in the `AndroidManifest.xml`\.  | 
| Public App Key |  Application license key provided by Google Play\. Required for using APK expansion files or other Google Play Services\.  | 
| App Obfuscation Salt |  Application\-specific salt value for \(un\)obfuscation when using APK expansion files\.  | 
| Rc Job PAK Override |  Path to the RC job XML file used to override the normal PAK files generation used in release builds\.  Path must be relative to `dev\Bin64\rc`\.  | 
| Rc Job APK Override |  Path to the RC job XML file used to override the normal APK Expansion file\(s\) generation used in release builds\.  Path must be relative to `dev\Bin64\rc`\.  | 
| Use Main APK |  Specifies whether the Main APK Expansion file should be used\.  | 
| Use Path PAK |  Specifies whether the Patch APK Expansion file should be used\.  | 
| Enable Screen Wake Lock |  Enables the screen wake lock\. If enabled, the device won't go to sleep while the app is running\.  | 
| Disable Immersive Mode |  Disables hiding of the top and bottom system bars\.  | 
| Icons |  All icon overrides for Android\. The **Default** property is used on all overrides that are not explicitly specified\. PNG images are required\.  Resolutions must be 48px, 72px, 96px, 144px, and 192px\.  | 
| Splashscreens |  All splashscreen \(the image shown while the app first loads\) overrides for Android\. The **Default** property is used on all overrides that are not explicitly specified\. PNG images are required\.  Resolution values are not strictly enforced but the recommended values are 1024 x 640, 1280 x 800, 1920 x 1200, and 2560 x 1600\.  | 

### iOS Settings<a name="mobile-project-settings-tool-properties-ios"></a>

You can find the following properties in the **Platforms Settings** on the **iOS** tab\.


****  

| Property | Description | 
| --- | --- | 
| Bundle Name |  Internal name of the bundle that iOS uses to identify it\. This value should not be changed\.  | 
| Display Name |  User\-visible name of the app that is shown in the app store\.  | 
| Executable Name |  Name of the bundle's generated XCode project\. This value should not be changed\.  | 
| Bundle Identifier |  Uniquely identifies the bundle on iOS\. This value should be in reverse\-DNS format\.  | 
| Version Name |  Release version string for the app that is displayed in the [App Store](https://www.apple.com/ios/app-store/)\.  | 
| Version Number |  Build version number string for the bundle\.  This value must be greater than the previous submission to the App Store\.  | 
| Development Region |  Default language and region for the app\. Defined by the region in which it was developed and the primary language used during development\.  | 
| Requires Fullscreen |  Specifies whether the app is required to run in full\-screen mode\.  | 
| Hide Status Bar |  Specifies whether the status bar is initially hidden when the app launches\.  | 
| Orientations |  Select which orientations to enable on the iOS device: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/mobile-project-settings-tool.html)  | 
| Icons |  All icon overrides for iOS\. PNG images are required\. All resolutions must be exactly as specified\.  | 
| Launchscreens |  All launch screen overrides for iOS\. PNG images are required\. All resolutions must be exactly as specified\.  | 

### Override Images<a name="mobile-project-settings-tool-properties-ios-override"></a>

On iOS devices, override images are stored in the `project_root\Gem\Resources\platformLauncher\Images.xcassets`\. Within that directory, the `AppIcon.appiconset` directory contains icons and the `LaunchImage.launchimage` directory contains splashscreens\. 

**Example**  
The following image shows the default iOS icons and splashscreens\. When you choose an override for one of these images, it overwrites the currently selected one\. The overwrite is completed when you choose **Save**\. This change can't be undone\.  

![\[Default iOS icons.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/mobile-project-settings-tool-properties-ios-override-icons.png)

![\[Default iOS splashscreens.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/mobile/mobile-project-settings-tool-properties-ios-override-splashscreens.png)