---
description: ' Build, deploy, and run an Open 3D Engine multiplayer project''s dedicated
  server to a host running Linux. '
linktitle: Server deployment
title: Deploy a O3DE multiplayer project's server on Linux
weight: 100
---

{{< preview-migrated >}}

 To distribute your O3DE project's server onto Linux, you need to have access to a Windows 10 computer to perform your first build, which generates the client executable and assets that the server uses\. After your build is complete, bundle up the assets and code for distribution, building, and hosting on your Linux server\. This topic walks you through the steps to perform the Windows 10 client build, get the files onto your Linux host, and then build the Linux server application\.

 Currently, the only officially supported Linux distribution is Ubuntu 18\.04 LTS\. To verify that you're running the correct distribution on your Linux host, run the **lsb\_release \-a** command\. If you're on the correct distribution, you should see `Ubuntu 18.04` in the output\.

 These instructions are for building the **MultiplayerSample** project that's included in the O3DE distribution\. When you build and distribute your project, edit the scripts referenced in this topic where needed to reference your project's name and contents instead\.

## Bundle the assets and source on Windows {#linux-build-lumberyard-executable-package}

To create a Linux server for your project, you first have to build the assets on Windows and bundle them for distribution to the server\. This distribution also includes all of the source code and tools that you need to generate a server build, so you don't need to install O3DE on your Linux host\.

**To package the assets and source on Windows**

1. Open a console and navigate to the `lumberyard_install\dev` directory\.

1. Open `bootstrap.cfg` and set the value of `sys_game_folder` to `MultiplayerSample`\.

   ```
   sys_game_folder=MultiplayerSample
   ```

1.  Build the project assets for the multiplayer server\.

   ```
   BuildMultiplayerSample_Paks_PC_dedicated.bat
   ```

1.  Bundle the packaged assets together into a tape archive \(`.tar`\) file for distribution to a Linux host\. This requires Python, which is distributed with O3DE:

   ```
   Tools\Python\version\windows\python.exe Tools\LmbrSetup\Linux\archiver.py
   ```

    This tool generates a file based on the current timestamp, located at `BinTemp\unix_archives\YYYY-MM-DD_HH-mm-ss.tar`
**Note**
 This archive file is uncompressed and is quite large\. Before distributing it to a remote Linux host, you might want to compress it with LZMA, bzip2, or gzip\.

1.  Copy the created archive over to your Linux host\. 

    If you're running Windows 10, you can use the Windows Subsystem for Linux \(WSL\) to test a deployment\. See Microsoft's instructions on [installing WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10) and [initializing a distribution](https://docs.microsoft.com/en-us/windows/wsl/initialize-distro) to get set up with WSL\. You can access the file directly from the WSL mount points for your Windows drives\. The drives are available from within a WSL terminal at `/mnt/drive_letter`\. To avoid performance problems when running the dedicated server under WSL, copy the archive into WSL's file system before continuing\.

## Compile the dedicated server on Linux {#linux-build-lumberyard-executable-compile}

1.  When the packaged assets and source are copied to your Linux host, extract them so that you can build the dedicated server\.

   ```
   cd your_upload_path
   tar -xvf YYYY-MM-DD_HH-mm-ss.tar
   ```
**Note**
 If you compressed your archive in an earlier step, add a decompression argument to `tar`:
Compressed with **LZMA**: **tar \-xJvf *YYYY\-MM\-DD\_HH\-mm\-ss*\.tar\.xz**
Compressed with **bzip2**: **tar \-xyvf *YYYY\-MM\-DD\_HH\-mm\-ss*\.tar\.bz2**
Compressed with **gzip**: **tar \-xzvf *YYYY\-MM\-DD\_HH\-mm\-ss*\.tar\.gz**

1. With the archive unpacked, change to the project's `dev` directory:

   ```
   cd MultiplayerSample/dev
   ```

1. Check that your Linux host has the correct dependencies installed and update them if needed:

   ```
   sudo ./Tools/LmbrSetup/Linux/setup.sh
   ```

    While setting up your environment, this script might prompt you for input to confirm adding a package repository \(PPA\) or install a package\. If you need to automate server setup, edit this script to make sure there are no user prompts\.

1. Configure the O3DE build environment that's bundled as part of the distribution:

   ```
   ./lmbr_waf.sh configure --3rdpartypath absolute_path_to_unarchive_location/MultiplayerSample/3rdParty \
       --bootstrap-tool-param "--enablecapability compileengine --enablecapability compilegame" \
       --update-settings True
   ```

1. Edit the `MultiplayerSample_pc_Paks_Dedicated/system_linux_pc.cfg` file\. Set the `log_RemoteConsoleAllowedAddresses` value to a comma\-separated list of the IP addresses that Windows clients will connect from\.

1. \(For non\-release builds only\) Build the builder assistant tool binaries\.

   ```
   ./lmbr_waf.sh --3rdpartypath absolute_path_to_unarchive_location/3rdParty/ build_linux_x64_profile -p host_tools
   ```

1.  Build the dedicated server:

   ```
   ./lmbr_waf.sh --3rdpartypath absolute_path_to_unarchive_location/MultiplayerSample/3rdParty \
       build_linux_x64_profile_dedicated -p game_and_engine
   ```
**Note**
 To create a different type of build, such as a debug or release, change *profile* to the appropriate build type\. For all of the available Linux server build types, see [Waf Commands and Options](/docs/userguide/waf/commands.md)\.
