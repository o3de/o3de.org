# Creating Lumberyard Executables for Linux<a name="linux-intro"></a>


****  

|  | 
| --- |
| This feature is in [preview](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#preview) release and is subject to change\.  | 

Lumberyard supports compiling a Windows client for a multiplayer project and connecting to a Linux dedicated server\. You must do the following to ensure that the Windows client works properly on a Linux dedicated server:
+ [Compile the assets on a Windows computer](asset-bundler-tutorial-release.md)
+ [Compile the server executable for use on a Linux computer](linux-build-lumberyard-executable.md)
+ [Compile a Windows client to use to connect to the Linux server](game-build-intro.md)

When these tasks are complete, you can deploy assets to either a Linux server or Windows client\.

**Topics**
+ [Prerequisites](#linux-prerequisites)
+ [Deploy a Lumberyard multiplayer project's server on Linux](linux-build-lumberyard-executable.md)
+ [Testing the Windows Client to Linux Server Connection](linux-test-windows-client-linux-server-connection.md)
+ [Preparing the Amazon GameLift Package](linux-prepare-gamelift-package.md)

## Prerequisites<a name="linux-prerequisites"></a>

To create Lumberyard executables for Linux, you must have the following:
+ A Windows 10 Lumberyard install configured to compile your project and the Lumberyard engine\.
+ A computer running Ubuntu Bionic \(18\.04 LTS\) where you have superuser access, with at least 50Gb of available hard drive space\. This can be a native host, [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/about) \(WSL\), or a virtual machine\. For instructions on hosting an Ubuntu instance on Amazon Elastic Compute Cloud, see [Getting started with Amazon EC2 Linux Instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html)\. When you create an Amazon EC2 instance, pick **Ubuntu 18\.04 LTS** as the image and **x86\_64** as the architecture to ensure that Lumberyard is supported\. 