---
description: ' Use the Open 3D Engine Graphics Settings window and configuration files
  to update graphics performance settings for Android and iOS games. '
title: Updating Graphics Settings for Android and iOS
weight: 1000
---

O3DE supports low, medium, high, and very high graphics performance for mobile devices\. You can change the graphics settings in O3DE Editor to simulate the graphics on Android and iOS devices\. This feature helps you visually check your mobile games in O3DE Editor during the development process\.

## Updating Graphics Performance in O3DE Editor {#ios-android-updating-graphics-settings-in-lumberyard-editor}

Use the **Graphics Performance** menu in O3DE Editor to choose a graphics setting for Android or iOS\.

**To update graphic settings in O3DE Editor**

1. In O3DE Editor, choose **Edit**, **Editor Settings**, **Graphics Performance**\.

1. Choose **Android** or **iOS** and then choose a setting\. For more information, see [Editor Settings](/docs/userguide/editor/menus#lumberyard-editor-menus-config-spec)\.

![\[O3DE Editor Graphics Performance menu for Android\]](/images/user-guide/mobile/graphics-performance-mobile-settings.png)

When you choose a graphics performance setting, the `r_GraphicsQuality` console variable automatically updates with a corresponding value:
+ Very High: `4`
+ High: `3`
+ Medium: `2`
+ Low: `1`

You can change the default value for the `r_GraphicsQuality` console variable in each OS configuration file\. You can find the files in the `lumberyard_version\dev\Cache\game_project\pc` directory\.

**Example iOS Configuration File**
The following is an example of the `system_ios_ios.cfg` file\.

![\[Example of the system_ios_ios.cfg configuration file\]](/images/user-guide/mobile/graphics-performance-system-ios-ios-cfg-file-example.png)

If you set `r_GraphicsQuality` to **0**, the graphics performance setting is automatically detected based on the mobile device model or total RAM\. You can review the mapping for mobile device models and graphics performance settings in the `android_models.xml` and `ios_models.xml` files, located in the `lumberyard_version\dev\Cache\game_project\pc\game_project\config` directory\.

**Example**
The following is an example of the `ios_models.xml` file\.

![\[Example of the ios_models.xml file\]](/images/user-guide/mobile/graphics-performance-ios-models-xml-file-example.png)

## Modifying Graphics Configuration Files {#ios-android-modifying-graphics-configuration-files}

Use the **Graphics Settings** window in O3DE Editor to modify the graphics settings for each OS configuration file\. You can also modify the configuration files for the following graphics settings: low, medium, high, and very high\.

**To modify a graphics configuration file**

1. In O3DE Editor, choose **Edit**, **Editor Settings**, **Graphics Settings**\.

1. In the **Graphics Settings** window, for **Platform**, choose **Android** or **iOS** for the configuration file that you want to modify\.
![\[Platform drop-down list in the Graphics Settings window.\]](/images/user-guide/mobile/graphics-settings-platform-drop-down-menu.png)

1. Modify the graphics settings for each parameter as needed\.
![\[Parameters for the iOS configuration file in the Graphics Settings window\]](/images/user-guide/mobile/graphics-settings-ios-platform-parameters.png)

1. Click **Save**\.
**Note**
The configuration file saves to the `lumberyard_version\dev\game_project\Config` directory\. Asset Processor prioritizes the settings in this configuration file above the engine's default configuration file, located in the `lumberyard_version\dev\Engine\Config` directory\.