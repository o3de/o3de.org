---
description: ' Download and install &ALYlong;, which includes folders and files for
  WAF, code, gems, &ly-editor;, assets, and samples. '
title: Installing &ALY;
---
# Installing Lumberyard<a name="setting-up-downloading-lumberyard"></a>

**Download the latest version of Lumberyard Installer**  
[https://d1a5h15s88ekwk.cloudfront.net/latest/installer/LumberyardInstaller.exe](https://d1a5h15s88ekwk.cloudfront.net/latest/installer/LumberyardInstaller.exe)

You can also download earlier versions of Lumberyard and assets from the [Amazon Lumberyard Downloads](https://aws.amazon.com/gamedev/lumberyard/downloads) page\.

**Note**  
Verify that you have the required hardware and software for Lumberyard\. For more information, see [System requirements](/docs/userguide/setup/system-requirements.md)\.

**Topics**
+ [Using the Lumberyard Installer](#download-lumberyard-installer)
+ [Using GitHub to Download Lumberyard](#download-lumberyard-github)
+ [Lumberyard Directories and Files](#lumberyard-installed-directories-and-files)

## Using the Lumberyard Installer<a name="download-lumberyard-installer"></a>

The Lumberyard Installer extracts the Lumberyard files and adds shortcuts to your desktop and start menu for the following:
+ Lumberyard Setup Assistant
+ Project Configurator
+ Lumberyard Editor

If you have an existing Lumberyard project and you want to upgrade, see [Upgrading Lumberyard](/docs/userguide/lumberyard-upgrading.md)\.

**Note**  
If you get file errors during extraction about `AssetProcessor.exe`, `AssetProcessor_temp.exe`, or `CrySystem.dll`, verify if your antivirus software is placing these files in quarantine\. If needed, grant exceptions for the affected files\.

**To use the Lumberyard installer**

1. Navigate to your download directory and run the Lumberyard Installer executable file: `LumberyardInstaller.exe`

1. **\(Optional\)** Change the location of the installation by selecting **Options**\. The default installation location is `C:\Amazon`\. 

1. On the **Welcome** page of the installer, click **Install**\.  
![\[Lumberyard Installer.\]](/images/userguide/lumberyard-installer-1.23.png)
**Note**  
In some situations, the Lumberyard Installer can stop responding and refuse to progress\. The only known remedy at this time is to forcibly terminate the installer through the Windows Task Manager and reboot, then retry the installation\.

1. Follow the instructions to complete your installation\.

1. On the **Installation Successfully Completed** page, click **Launch Lumberyard Setup Assistant** to install required third\-party software and SDKs\. For more information, see [Running Lumberyard Setup Assistant](/docs/userguide/lumberyard-launcher-using.md)\.

## Using GitHub to Download Lumberyard<a name="download-lumberyard-github"></a>

Each Lumberyard release exists as a separate branch in GitHub\. To download Lumberyard, see the [Amazon Lumberyard page on GitHub](https://github.com/aws/Lumberyard)\.

## Lumberyard Directories and Files<a name="lumberyard-installed-directories-and-files"></a>

After you install Lumberyard, the Lumberyard root directory includes the following folders and files:
+ `dev`
  + `_WAF_` – Waf build system files\.
  + `Bin64` – Binaries directory and configuration files for the Resource Compiler\.
  + `Bin64vc141` – Binaries directory and configuration files for Visual Studio 2017\.
  + `Bin64vc142` – Binaries directory and configuration files for Visual Studio 2019\.
  + `Code` – Source files directory and solution files\.
  + `Editor` – Editor assets\.
  + `Engine` – Engine assets\.
  + `Gems` – Optional systems and assets\.
  + `MultiplayerSample` – Multiplayer sample project that demonstrates how to build a multiplayer game with the new component entity system\. For more information, see [Multiplayer Sample](/docs/userguide/samples/projects/multiplayer-enhanced.md)\.
  + `ProjectTemplates` – Configuration files, libraries, and scripts for the empty template\.
  + `SamplesProject` – Sample project\. For more information, see [Samples Project](/docs/userguide/samples/projects/samples.md)\.
  + `Tools` – Third\-party tools and plugins\.
  + `engineroot.txt` – System file required by Lumberyard Setup Assistant\.
+ `3rdParty`
  + Third\-party software required to use or compile Lumberyard
  + `3rdParty.txt` – System file used by other third\-party tools to verify the directory\.