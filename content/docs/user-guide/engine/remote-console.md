---
description: ' Use console commands to modify and configure the Open 3D Engine runtime
  application. '
title: 'Universal Remote Console'
draft: true
---

You can use **Console** commands to modify and configure the O3DE runtime application. On a PC, the **Console** is available from O3DE Editor or the game. But for mobile platforms you must use a separate Windows-based application called the Universal Remote Console. With the Universal Remote Console you can use the IP address of the machine running the O3DE game to connect to a remote instance of O3DE.

Universal Remote Console requires the use of a PC and works with both Android and iOS. Your mobile device and the PC will need to be on the same network and your firewall should be configured to allow traffic through port 4600.

**To start the Universal Remote Console**

1. Run `Tools\RemoteConsole\RemoteConsole.exe`
![Image NOT FOUND](/images/user-guide/remote-console.png)

1. To see output from the O3DE logging system, click the **Full Log** tab.

**To connect to a O3DE game on a mobile device**

1. In the `system_platform_asset.cfg` file, enter the console variable `log_RemoteConsoleAllowedAddresses=[IP address]`, where IP address is the address of the computer that the remote console is running on.

   For Android, use the `system_android_es.cfg` file.

   For iOS, use the `system_ios_ios.cfg` file.

1. Save the file.

1. After you update the `.cfg` file, deploy the game to mobile devices.

   For more information, see [Deploy with O3DE Editor](/docs/userguide/mobile/android/build-deploy#run-the-deployment-tool) and [Creating a Release App](/docs/user-guide/platforms/ios/creating-release-app/).

1. If the game is already running, restart it.

1. In the Universal Remote Console, click **Targets** on the toolbar.

1. Enter the IP address of the device under **Custom IP**.

If your network allows you to assign fixed IP addresses per device, you can edit the `params.xml` file and add the new target devices, as illustrated in the following example. This file is located in the same directory as Universal Remote Console, and you can edit it with the application running.

```
<Targets>
<Target name="PC" ip="localhost" port="4600"/>
<Target name="Android" ip="192.168.1.247" port="4600"/>
</Targets>
```

This lets you select from a list of devices instead of entering the IP address each time. Once successfully connected, the status indicator in the lower right corner will turn green.

## Issuing Commands

In the **Type a command** box at the bottom of the window, enter a command like the ones that follow. This control features autocomplete and, for certain commands \(like `map`\), can also detect available options.

Commands include the following:
+ `cl_DisableHUDText` - Disables HUD text
+ `g_debug_stats` - Enables gameplay events debugging
+ `r_DisplayInfo` - Displays rendering information
+ `r_ProfileShaders` - Displays profiling information for the shaders
