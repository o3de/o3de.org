---
description: ' Learn how to install Open 3D Engine. '
title: Installing Open 3D Engine
---
# Installing Open 3D Engine<a name="wg-install"></a>

Download the latest [O3DE Installer](https://d1a5h15s88ekwk.cloudfront.net/latest/installer/O3DEInstaller.exe)\.

## Run the O3DE installer<a name="lumberyard-installer"></a>

Navigate to your `Downloads` directory and run `O3DEInstaller.exe` to download, extract, and install O3DE\.

![\[O3DEInstaller.exe.\]](/images/welcomeguide/ui-installer-1.23.png)

The default O3DE installation path is `C:\Amazon\O3DE\`\. To set a different installation path, choose the **Options** button\. Choose the **Install** button to begin installation\. The process can take some time, depending on your internet connection speed\.

**Note**
In some situations, the O3DE Installer can hang and refuse to progress\. The only known remedy at this time is to forcibly terminate the installer through the Windows Task Manager and reboot, then retry the installation\.

The installer displays an **Installation Successfully Completed** message\. Click **Launch O3DE Setup Assistant** to continue with setup\.

## O3DE's executables<a name="executables"></a>

 `O3DEInstaller.exe` creates shortcuts on the desktop and in the Start Menu for three applications:

 [Setup Assistant](wg-setup-assistant.md)
+ Setup Assistant configures O3DE's environment according to your development needs, and downloads and installs additional software and SDKS\. You can use Setup Assistant at any time to add development features to your O3DE environment\.

  SetupAssistant\.exe is located in `lumberyard_version\dev\Tools\LmbrSetup\Win`\.

 [Project Configurator](wg-project-configurator.md)
+ With Project Configurator, you create, configure, set, and build projects\. When you run Project Configurator for the first time, you see several sample projects that are available to help you learn O3DE's features\.

  ProjectConfigurator\.exe is located in `lumberyard_version` `\dev\Bin64vc141_or_vc142`\.

 [O3DE Editor](wg-editor.md)
+ O3DE Editor is O3DE's core application\. In O3DE Editor, you create levels, assets, and interactions for your projects\.

  Editor\.exe is located in `lumberyard_version` `\dev\Bin64vc141_or_vc142`\.

## O3DE's directory structure<a name="directory-structure"></a>

The default O3DE installation location is `C:\Amazon\O3DE\lumberyard_version\`\. The root directory contains the following directories and files:
+  `dev`
  +  `_WAF_`: Waf build system files\.
  +  `Bin64`: Binaries and configuration files for the Resource Compiler\.
  +  `Bin64vc141`: Binaries and configuration files for Visual Studio 2017\.
  +  `Bin64vc142`: Binaries and configuration files for Visual Studio 2019\.
  +  `Code`: Source files and solution files for the O3DE engine and tools\.
  +  `Editor`: Editor assets\.
  +  `Engine`: Engine assets\.
  +  `Gems`: Modular components and assets\.
  +  `MultiplayerSample`: Multiplayer sample project that demonstrates how to build a multiplayer game with the component entity system\.
  +  `ProjectTemplates`: Configuration files, libraries, and scripts for the empty template\.
  +  `SamplesProject`: Sample project\.
  +  `StarterGame`: A full example game with 3D environments, event scripting, and basic enemy AI\.
  +  `Tools`: Third\-party tools and plugins\.
  +  `engineroot.txt`: System file required by O3DE Setup Assistant to verify the directory\.
+  `3rdParty`
  + Third\-party software required to use or compile O3DE\.
  +  `3rdParty.txt`: System file used by other third\-party tools to verify the directory\.