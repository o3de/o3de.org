---
description: ' Use Open 3D Engine to build games for iOS devices. '
linktitle: iOS
title: O3DE iOS support
weight: 200
---

{{< preview-migrated >}}

You can use O3DE to create applications for [iOS devices](/docs/user-guide/platforms/mobile-support.md)\. The topics in this section will teach you how to generate assets that your app can load, and how to build and debug code\. You will also learn about the different types of apps that you can generate for development purposes or to release publicly\.

O3DE includes four iOS\-supported sample projects that you can use to learn how to build assets for iOS games using Asset Processor, build shaders using the remote shader compiler, and build and deploy iOS apps using the O3DE build tools\. For more information, see [Using O3DE sample projects and levels](/docs/userguide/samples/projects/s-levels-intro.md)\.

O3DE has the following minimum requirements for iOS:


****

|  |  |
| --- |--- |
| CPU | ARM v8 or newer |
| GPU | A8 or newerSupports Metal |
| OS | iOS 13 or newer |
| Example devices | iPhone 6 and newer |

## Prerequisites {#ios-prerequisites}

To build apps for iOS devices, you must have the following:
+ [Xcode 11](https://developer.apple.com/xcode/download/) or later
+ iOS 13 SDK or later
+ O3DE installed on a Windows computer
+ O3DE installed on a macOS computer
+ Familiarity with O3DE Editor, the Shader Compiler, and Asset Processor
+ Ability to build from a command line tool
+ Previously built the macOS code and optionally the PC code

To set up your environment, use the O3DE Setup Assistant \(located in the `lumberyard_version\dev\Tools\LmbrSetup\Mac` directory\) to select the following:
+ **Compile the game code**
+ **Compile the engine and asset pipeline**
+ **Compile the O3DE Editor and tools**
+ **Compile for iOS devices**

The Setup Assistant will install the required third\-party software and SDKs\.

## Anatomy of a O3DE iOS App {#ios-support-lumberyard-ios-app-anatomy}

The O3DE build system can generate the following types of applications:
+ Development app
+ VFS app
+ Release app

**Note**
O3DE Editor is currently supported on Windows only\. You must export each level of your game project prior to using Asset Processor for your assets\.

### Development App {#lumberyard-ios-app-anatomy-development-app}

You will use a Development app throughout most of your development cycle\. Your app must connect to the Remote Shader Compiler in order to compile the shaders into a format that the iOS device can read\. Your app connects to the shader compiler over WiFi or through Asset Processor\. Asset Processor generates the Development app executable and its assets, which can be loose files or PAK files\.

![\[The Development app contains the O3DE executable and assets.\]](/images/user-guide/mobile/ios/ios_development_app.png)

![\[The Development app connects to the remote shader compiler.\]](/images/user-guide/mobile/ios/ios_development_scenario_01.png)

### VFS App {#lumberyard-ios-app-anatomy-vfs-app}

You can use the VFS app with the Virtual Filing System \(VFS\)\. While similar to a Development app, the VFS app also contains the `bootstrap.cfg` and `game.xml` configuration files in your build\. After reading these configuration files, the app connects to your macOS or Windows computer and uses the assets from the local `Cache` directory\. This allows you to iterate content and see the changes on your device in real time\.

Your app must also connect to the Remote Shader Compiler in order to compile the shaders into a format that the iOS device can read\. Your app connects to the shader compiler over WiFi or through Asset Processor on startup\. You can optionally choose to direct traffic to and from the Remote Compiler through Asset Processor\.

![\[The Virtual Filing System (VFS) app contains the O3DE executable, bootstrap.cfg file, and the game.xml file.\]](/images/user-guide/mobile/ios/ios_vfs_app.png)

![\[The VFS app connects to the Asset Processor on startup.\]](/images/user-guide/mobile/ios/ios_development_scenario_02.png)

### Release App {#lumberyard-ios-app-anatomy-release-app}

The Release app contains the executable and all binaries and assets that are required for your app to run\. The assets and shaders must be PAK files because the app will not connect to the Remote Shader Compiler or Asset Processor\.

![\[The Release app contains the O3DE binaries, asset .pak files, and shader .pak files.\]](/images/user-guide/mobile/ios/ios_release_app.png)

**Topics**
+ [Prerequisites](#ios-prerequisites)
+ [O3DE Binaries](#ios-support-lumberyard-binaries)
+ [Anatomy of a O3DE iOS App](#ios-support-lumberyard-ios-app-anatomy)
+ [Quick Start: Running the Samples Project on iOS Devices](/docs/user-guide/platforms/ios/quick-start.md)
+ [Building Your iOS App](/docs/user-guide/platforms/ios/game-building.md)
+ [Creating a Release App](/docs/user-guide/platforms/ios/creating-release-app.md)
+ [Using Virtual File System with iOS](/docs/user-guide/platforms/ios/virtual-file-system.md)
+ [Universal Remote Console](/docs/user-guide/engine/remote-console.md)
+ [Sharing Assets Between Windows and macOS](/docs/user-guide/platforms/ios/sharing-assets-between-mac-pc.md)
+ [Add iOS Frameworks to a O3DE project](/docs/user-guide/platforms/ios/custom-frameworks.md)
+ [iOS Debugging and Troubleshooting](/docs/user-guide/platforms/ios/debugging-troubleshooting.md)
