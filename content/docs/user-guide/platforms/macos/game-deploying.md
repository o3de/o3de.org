---
description: ' Run a macOS game using the O3DE build tools. '
title: Running macOS Games
weight: 400
---

{{< preview-migrated >}}

Before you can run your game on a macOS computer, you must ensure the shader compiler \(located in the `lumberyard_version\dev\Tools\CrySCompileServer\x64\profile` directory\) is running on your PC\. For more information, see [Building Shaders for macOS Games](/docs/user-guide/platforms/macos/shaders-building.md)\.

**To run your game on a macOS computer**

1. Open the Xcode solution that you generated \(located in the `Solutions` folder in the directory where you installed O3DE\)\.

1. Build, run, and debug your application as you would any Xcode project\. For information, see [Launching Your Mac App](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/AppDistributionGuide/LaunchingYourApponDevices/LaunchingYourApponDevices.html)\.

1. \(Optional\) Load different levels by doing one of the following:
   + Open the console window using the tilde \(**\~**\) key, and then enter `map <name of map or level to load>`\. The console supports tab completion, so you can press **Tab** after the map command to see the list of supported levels and maps to load\.
   + Edit the `autoexec.cfg` file for your game to change the `map` command to load a different map or level\. Run the game from Xcode again\.

     For example, if you are using the Samples Project, edit the `autoexec.cfg` file located in the `/dev/SamplesProject` directory\. macOS supports the Advanced\_RinLocomotion level\.

1. Use the following controls to navigate around your game:
   + Switch between cameras by selecting the buttons in the lower right corner of the screen\.
   + Move Rin in the Character Controller view by using the mouse or keyboard \(**WASD**\)\.
   + Jump in the Character Controller view by pressing the **Space** key\.
![\[Image NOT FOUND\]](/images/user-guide/platforms/macos/advanced-rin-locomotion-mobile.jpg)
