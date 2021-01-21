---
description: ' Use &ALY; to build game assets for your macOS games. '
title: Building Game Assets for macOS Games
---
# Building Game Assets for macOS Games {#osx-assets-building}


****

|  |
| --- |
| This feature is in [preview](/docs/userguide/ly-glos-chap#preview) release and is subject to change\.  |

When you build a macOS game using Lumberyard, you must first build the assets that are included with the application\. All built assets are located in the `cache` folder of your Lumberyard installation\. For example, when you build the Samples Project, the assets are saved to the `lumberyard_version\dev\cache\SamplesProject\osx_gl` directory\. The initial build of the Samples Project assets may take up to an hour to process, but incremental changes should process almost instantly\.

**Note**
If you make changes to your game in Lumberyard Editor on your PC, you must copy the updated assets to your Mac using your preferred method\. For example, you can use source control\. For information, see [Using the Perforce Plugin with Lumberyard](/docs/userguide/setup/lumberyard-perforce-plugin.md)\.

**To build macOS game assets on your Mac**

1. On your Mac, close all instances of the Asset Processor\.

1. Edit the `bootstrap.cfg` file \(located in the `lumberyard_version/dev` directory\) to set `sys_game_folder` to **SamplesProject** \(or the project you want to build\)\. Save the file\.

1. Edit the `AssetProcessorPlatformConfig.ini` file \(located in the `lumberyard_version/dev` directory\) to uncomment `osx_gl=enabled` \(remove the preceding semicolon\) and to comment out `pc=enabled` \(add a preceding semicolon\)\. Save the file\.

1. In a command line window, navigate to the `lumberyard_version/dev/BinMac64` directory and run Asset Processor \(GUI or batch version\) to process and build your game assets\.