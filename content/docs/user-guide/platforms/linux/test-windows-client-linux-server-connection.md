---
description: ' Test the connection between the Windows client and the Linux server
  for Open 3D Engine. '
linktitle: Client connection testing
title: Testing the Windows Client to Linux Server Connection
weight: 200
---

{{< preview-migrated >}}

|  |
| --- |
| This feature is in [preview](/docs/userguide/ly-glos-chap#preview) release and is subject to change\.  |

After you've [built the Windows client and Linux server](/docs/user-guide/platforms/linux/build-lumberyard-executable.md), you should test the connection to make sure that everything is running smoothly\. This topic covers starting your server, getting connection information, running the remote console on Windows to manage your connection, and connecting your game client to the server\.

## Prerequisites {#linux-test-windows-client-linux-server-connection-prerequisites}

To test your server setup, complete the following tasks\.
+ Complete the steps in [Deploy a O3DE multiplayer project's server on Linux](/docs/user-guide/platforms/linux/build-lumberyard-executable.md)\.
+ Get the *public* IP address \(not DNS name\) of your Linux server\.
+ Get the *public* IP address of your client machine\.
+  Allow outbound TCP connections on Windows 10 to your Linux server on port `4600`, and outbound UDP connections on port `33435`\. If you're not familiar with how to configure Windows firewall to allow outbound connections, see the [Microsoft Windows Firewall documentation](https://docs.microsoft.com/en-us/windows/security/threat-protection/windows-firewall/create-an-outbound-program-or-service-rule)\.
+  Allow inbound TCP connections on Linux on port `4600`, and inbound UDP connections on port `33435`\. If you're using an Amazon EC2 instance, follow the instructions for [Authorizing inbound traffic on Linux](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/authorizing-access-to-an-instance.html)\. If you're running your own independent Linux server or using Windows Subsystem for Linux \(WSL\), read your distribution's instructions on configuring your firewall to allow the client connection\.

**Important**
 There might be other considerations in your network environment that require additional setup - such as a corporate firewall, proxy, or VPN - that you should consult with your system administrator on as part of setting up for testing\.

## Start the server {#linux-test-windows-client-linux-server-connection-start-server}

Before starting the client and after configuring the server to accept connections, start the dedicated server\.

**To start the server**

1. In a terminal, navigate to the `absolute_path_to_unarchive_location/dev/BinLinux64.Dedicated` directory\.

1.  Copy the resources built on Windows to the build directory\. To function properly, the working directory that you launch the server from needs to contain configuration information for the project and the `multiplayersample` directory containing the `.pak` asset bundles\.

   ```
   cp -r ../MultiplayerSample_pc_Paks_Dedicated/* ./
   ```

1.  Make sure that the correct project is bootstrapped\. Edit the `absolute_path_to_unarchive_location/dev/BinLinux64.Dedicated/bootstrap.cfg` file to ensure that the value of `sys_game_folder` is set to `MultiplayerSample`\.

   ```
   sys_game_folder=MultiplayerSample
   ```
**Note**
 You might see `^M` characters at the end of every line in the `bootstrap.cfg` file\. This indicates that the file uses Windows\-style line endings rather than Linux\-style ones\. This doesn't affect the ability of the O3DE dedicated server from loading the bootstrap file correctly, and you don't need to worry about preserving the line ending type when you edit the file\.

1. Start the server\.

   ```
   ./MultiplayerSampleLauncher_Server
   ```

## Configure the server remotely {#linux-test-windows-client-linux-server-connection-remote-console}

When the server is running, launch the remote console and set up the server to start hosting a game session\.

1. Launch the Remote Console on your Windows 10 machine, located at `lumberyard_install_dir\dev\Tools\RemoteConsole\RemoteConsole.exe`\.

1. In the Remote Console, Select **Targets > PC**, and then edit the **Targets > Custom IP** setting to be the IP address for your Linux server\.
![\[The upper half of the Remote Console window. The menu bar displays the tabs "Tools","Toggles", "Sliders", "Targets", "Generic", "WF1", "MacrosOther", "GamePlays", "Maps". The "Targets" menu is surrounded by a red box. The Targets dropdown lists platforms "PC", "Xenia", "Provo" followed by a text input field for "Custom IP". The "PC" dropdown item is surrounded by a red box. The "Custom IP" text input field is surrounded by a red box.\]](/images/user-guide/platforms/linux/remote-console-ipaddr.png)

    If the connection to the dedicated server is successful, you see a green status light and the word **Connected** in the lower right corner of the window\. Make sure that the IP address and port, located in the lower left of the window, match up with the location of your server\. If you had an instance of the client already running, the remote console will attempt to connect to it first\.
![\[The status bar for the Remote Console Window. On the far left is the text "Target: PC" followed by an obfuscated host and the port "4600". On the far right is "Status:", a green circle indicator, and the word "Connected".\]](/images/user-guide/platforms/linux/remote-console-connected.png)

1. In the command line located at the bottom of the window, send commands to the server to start the multiplayer session and load a map\.

   ```
   mphost
   map multiplayersample
   ```

1. Close the remote console\.

## Connect from the client to the server {#linux-test-windows-client-linux-server-connection-connect-client}

Start the game client and connect to the multiplayer session\.

1. Edit the `lumberyard_install_dir\dev\bootstrap.cfg` file and set `connect_to_remote` to `1`\.

   ```
   connect_to_remote=1
   ```

1. Launch the client\.
   + For Visual Studio 2019: `lumberyard_install_dir\dev\Bin64vc142\`

1. In the client, press the ``` \(grave\) key to open the console and enter the command `mpjoin server_ip_address.`

 If the connection to the game server was successful, you now have a game session running in your client\. Try out connecting other clients to the server using these same steps to continue testing with multiple players\!
