---
description: ' Use &ly-launcher; to install required third-party software, SDKs, and
  plugins. '
title: Running &ly-launcher;
---
# Running Lumberyard Setup Assistant {#lumberyard-launcher-using}

**Note**  
Before you run Lumberyard Setup Assistant, verify the following:  
`3rdParty.txt` file appears in the `lumberyard_version\3rdParty` directory
`engineroot.txt` appears in the `lumberyard_version\dev` directory
 Lumberyard Setup Assistant requires these files to properly detect third\-party software and SDKs\.

**To use Lumberyard Setup Assistant**

1. Open Lumberyard Setup Assistant with your preferred method:
   + From the desktop, double\-click the **Setup Assistant** icon
   + Navigate to the `lumberyard_version\dev\Tools\LmbrSetup\Win` directory and double\-click `SetupAssistant.exe`

1. In the **Custom Install** box, click **Customize**\.

1. Verify that the engine root path is correct\.

1. On the **Get started** page, select what you want to do:
   + **Run your game project**
   + **Run the Lumberyard Editor and tools** - Use Lumberyard Editor to create a game
   + **Compile the game code**\* - Compile the game code to include any changes that you have made
   + **Compile the engine and asset pipeline**\* - Compile the engine code and asset pipeline to include any changes that you have made
   + **Compile the Lumberyard Editor and tools**\* - Compile Lumberyard tools to include any changes that you have made
   + **Compile for Android devices\***
   + **Setup for Linux Dedicated Server\***
**Note**  
In Lumberyard version 1\.23 and later, if you intend to create new projects, the following options must be selected:  
**Run your game project**
**Run the Lumberyard Editor and tools** - Use Lumberyard Editor to create a game
**Compile the game code**\* - Compile the game code to include any changes that you have made
**Compile the engine and asset pipeline**\* - Compile the engine code and asset pipeline to include any changes that you have made
**Compile the Lumberyard Editor and tools**\* - Compile Lumberyard tools to include any changes that you have made
\*If you select any of these options, you may need to perform additional tasks, such as installing Microsoft Visual Studio\. If so, these tasks display on the **Install software** and **Required SDKs** pages\. Follow the instructions in Lumberyard Setup Assistant to obtain the software and third\-party SDKs that aren't installed\.

   You can also create, enable, and disable these capabilities from the command line\. For more information, see [Using Lumberyard Setup Assistant Batch](/docs/userguide/lumberyard-launcher-batch-using.md) and [Lmbr\.exe](/docs/userguide/lmbr-exe.md)\.

1. Select **Visual Studio 2017** or **Visual Studio 2019**\.
**Note**  
We recommend that you select only *one* version of Visual Studio \- the one that you will use to compile your projects\. If both are enabled, you will be asked which compiler to use when you rebuild your project in Project Configurator\.  
![\[Use Lumberyard Setup Assistant to configure Lumberyard, and install software and plugins.\]](/images/userguide/setup/ui-setup-assistant-1.24.png)
**Note**  
Selecting a version of Visual Studio here will enable it as a build platform and enable a Visual Studio solution to be generated for that version\. For more information about build settings specific to Visual Studio, see [Waf User Options and Settings](/docs/userguide/waf/user-options-and-settings.md)\.
**Note**  
For more information about installing and configuring Visual Studio for Lumberyard, see [Developer tools](/docs/userguide/setup/system-requirements#lumberyard-visual-studio-requirement)\.

1. Click **Next**\.

1. Follow the instructions on each page\.

1. When you have completed installing software and SDKs, the **Summary** page displays information about your Lumberyard environment\. From the **Summary** page, you can launch the Lumberyard Editor by choosing **Launch Editor**\. If you'd like to choose an existing project or create a new project, choose **Configure project** to launch Project Configurator\. For more information about configuring your project, see [Creating Lumberyard projects](/docs/userguide/configurator/intro.md)\.