---
description: ' Use Open 3D Engine to compile a dedicated Linux server for a multiplayer
  game, prepare your server for game hosting, and integrate with AGS. '
linktitle: Linux dedicated server
title: Creating O3DE executables for Linux
weight: 300
---

|  |
| --- |
| This feature is in [preview](/docs/userguide/ly-glos-chap#preview) release and is subject to change\.  |

O3DE supports compiling a Windows client for a multiplayer project and connecting to a Linux dedicated server\. You must do the following to ensure that the Windows client works properly on a Linux dedicated server:
+ [Compile the assets on a Windows computer](/docs/user-guide/tutorials/packaging/tutorial-release.md)
+ [Compile the server executable for use on a Linux computer](/docs/user-guide/features/platforms/linux/build-lumberyard-executable.md)
+ [Compile a Windows client to use to connect to the Linux server](/docs/userguide/game-build-intro.md)

When these tasks are complete, you can deploy assets to either a Linux server or Windows client\.

**Topics**
+ [Prerequisites](#linux-prerequisites)
+ [Deploy a O3DE multiplayer project's server on Linux](/docs/user-guide/features/platforms/linux/build-lumberyard-executable.md)
+ [Testing the Windows Client to Linux Server Connection](/docs/user-guide/features/platforms/linux/test-windows-client-linux-server-connection.md)
+ [Preparing the Amazon GameLift Package](/docs/user-guide/features/platforms/linux/prepare-gamelift-package.md)

## Prerequisites {#linux-prerequisites}

To create O3DE executables for Linux, you must have the following:
+ A Windows 10 O3DE install configured to compile your project and the O3DE engine\.
+ A computer running Ubuntu Bionic \(18\.04 LTS\) where you have superuser access, with at least 50Gb of available hard drive space\. This can be a native host, [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/about) \(WSL\), or a virtual machine\. For instructions on hosting an Ubuntu instance on Amazon Elastic Compute Cloud, see [Getting started with Amazon EC2 Linux Instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html)\. When you create an Amazon EC2 instance, pick **Ubuntu 18\.04 LTS** as the image and **x86\_64** as the architecture to ensure that O3DE is supported\.