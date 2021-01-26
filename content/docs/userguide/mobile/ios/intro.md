---
description: ' Use Amazon Lumberyard to build games for iOS devices. '
title: iOS Support
---
# iOS Support {#ios-intro}

You can use Lumberyard to create applications for [iOS devices](/docs/userguide/mobile/support-intro.md)\. The topics in this section will teach you how to generate assets that your app can load, and how to build and debug code\. You will also learn about the different types of apps that you can generate for development purposes or to release publicly\.

Lumberyard includes four iOS\-supported sample projects that you can use to learn how to build assets for iOS games using Asset Processor, build shaders using the remote shader compiler, and build and deploy iOS apps using the Lumberyard build tools\. For more information, see [Using Lumberyard sample projects and levels](/docs/userguide/samples/projects/s-levels-intro.md)\.

Lumberyard has the following minimum requirements for iOS:


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
+ [Lumberyard Mac Support Files](https://aws.amazon.com/lumberyard/downloads/)
+ Lumberyard installed on a Windows computer
+ Lumberyard installed on a macOS computer
+ Familiarity with Lumberyard Editor, the Shader Compiler, and Asset Processor
+ Ability to build from a command line tool
+ Previously built the macOS code and optionally the PC code

To set up your environment, use the Lumberyard Setup Assistant \(located in the `lumberyard_version\dev\Tools\LmbrSetup\Mac` directory\) to select the following:
+ **Compile the game code**
+ **Compile the engine and asset pipeline**
+ **Compile the Lumberyard Editor and tools**
+ **Compile for iOS devices**

The Setup Assistant will install the required third\-party software and SDKs\.

## Lumberyard Binaries {#ios-support-lumberyard-binaries}

During installation, Lumberyard creates the following directories for its binaries:

**Mac**
+ `BinMac64`

**PC**
+ `Bin64vc141` \(for binaries generated with Visual Studio 2017\)

## Anatomy of a Lumberyard iOS App {#ios-support-lumberyard-ios-app-anatomy}

The Lumberyard build system can generate the following types of applications:
+ Development app
+ VFS app
+ Release app

**Note**
Lumberyard Editor is currently supported on Windows only\. You must export each level of your game project prior to using Asset Processor for your assets\.

### Development App {#lumberyard-ios-app-anatomy-development-app}

You will use a Development app throughout most of your development cycle\. Your app must connect to the Remote Shader Compiler in order to compile the shaders into a format that the iOS device can read\. Your app connects to the shader compiler over WiFi or through Asset Processor\. Asset Processor generates the Development app executable and its assets, which can be loose files or PAK files\.

![\[The Development app contains the Lumberyard executable and assets.\]](/images/userguide/mobile/ios/ios_development_app.png)

![\[The Development app connects to the remote shader compiler.\]](/images/userguide/mobile/ios/ios_development_scenario_01.png)

### VFS App {#lumberyard-ios-app-anatomy-vfs-app}

You can use the VFS app with the Virtual Filing System \(VFS\)\. While similar to a Development app, the VFS app also contains the `bootstrap.cfg` and `game.xml` configuration files in your build\. After reading these configuration files, the app connects to your macOS or Windows computer and uses the assets from the local `Cache` directory\. This allows you to iterate content and see the changes on your device in real time\.

Your app must also connect to the Remote Shader Compiler in order to compile the shaders into a format that the iOS device can read\. Your app connects to the shader compiler over WiFi or through Asset Processor on startup\. You can optionally choose to direct traffic to and from the Remote Compiler through Asset Processor\.

![\[The Virtual Filing System (VFS) app contains the Lumberyard executable, bootstrap.cfg file, and the game.xml file.\]](/images/userguide/mobile/ios/ios_vfs_app.png)

![\[The VFS app connects to the Asset Processor on startup.\]](/images/userguide/mobile/ios/ios_development_scenario_02.png)

### Release App {#lumberyard-ios-app-anatomy-release-app}

The Release app contains the executable and all binaries and assets that are required for your app to run\. The assets and shaders must be PAK files because the app will not connect to the Remote Shader Compiler or Asset Processor\.

![\[The Release app contains the Lumberyard binaries, asset .pak files, and shader .pak files.\]](/images/userguide/mobile/ios/ios_release_app.png)

**Topics**
+ [Prerequisites](#ios-prerequisites)
+ [Lumberyard Binaries](#ios-support-lumberyard-binaries)
+ [Anatomy of a Lumberyard iOS App](#ios-support-lumberyard-ios-app-anatomy)
+ [Quick Start: Running the Samples Project on iOS Devices](/docs/userguide/mobile/ios/quick-start.md)
+ [Building Your iOS App](/docs/userguide/mobile/ios/game-building.md)
+ [Creating a Release App](/docs/userguide/mobile/ios/creating-release-app.md)
+ [Using Virtual File System with iOS](/docs/userguide/mobile/ios/virtual-file-system.md)
+ [Universal Remote Console](/docs/userguide/lumberyard-remote-console.md)
+ [Sharing Assets Between Windows and macOS](/docs/userguide/mobile/ios/sharing-assets-between-mac-pc.md)
+ [Add iOS Frameworks to a Lumberyard project](/docs/userguide/mobile/ios/custom-frameworks.md)
+ [iOS Debugging and Troubleshooting](/docs/userguide/mobile/ios/debugging-troubleshooting.md)