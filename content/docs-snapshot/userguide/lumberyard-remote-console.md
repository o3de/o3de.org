# Universal Remote Console<a name="lumberyard-remote-console"></a>

You can use **Console** commands to modify and configure the Lumberyard runtime application\. On a PC, the **Console** is available from Lumberyard Editor or the game\. But for mobile platforms you must use a separate Windows\-based application called the Universal Remote Console\. With the Universal Remote Console you can use the IP address of the machine running the Lumberyard game to connect to a remote instance of Lumberyard\.

Universal Remote Console requires the use of a PC and works with both Android and iOS\. Your mobile device and the PC will need to be on the same network and your firewall should be configured to allow traffic through port 4600\. 

**To start the Universal Remote Console**

1. Run `lumberyard_version\dev\Tools\RemoteConsole\RemoteConsole.exe`  
![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/remote-console.png)

1. To see output from the Lumberyard logging system, click the **Full Log** tab\. 

**To connect to a Lumberyard game on a mobile device**

1. In the `system_platform_asset.cfg` file, enter the console variable `log_RemoteConsoleAllowedAddresses=[IP address]`, where IP address is the address of the computer that the remote console is running on\. 

   For Android, use the `system_android_es.cfg` file\. 

   For iOS, use the `system_ios_ios.cfg` file\.

1. Save the file\.

1. After you update the `.cfg` file, deploy the game to mobile devices\.

   For more information, see [Running the Deployment Tool](run-the-deployment-tool.md) and [Creating a Release App](ios-creating-release-app.md)\.

1. If the game is already running, restart it\.

1. In the Universal Remote Console, click **Targets** on the toolbar\.

1. Enter the IP address of the device under **Custom IP**\.

If your network allows you to assign fixed IP addresses per device, you can edit the `params.xml` file and add the new target devices, as illustrated in the following example\. This file is located in the same directory as Universal Remote Console, and you can edit it with the application running\.

```
<Targets>
<Target name="PC" ip="localhost" port="4600"/>
<Target name="Android" ip="192.168.1.247" port="4600"/> 
</Targets>
```

This lets you select from a list of devices instead of entering the IP address each time\. Once successfully connected, the status indicator in the lower right corner will turn green\. 

## Issuing Commands<a name="lumberyard-remote-console-commands"></a>

In the **Type a command** box at the bottom of the window, enter a command like the ones that follow\. This control features autocomplete and, for certain commands \(like `map`\), can also detect available options\.

Commands include the following:
+ `cl_DisableHUDText` – Disables HUD text
+ `g_debug_stats` – Enables gameplay events debugging
+ `r_DisplayInfo` – Displays rendering information
+ `r_ProfileShaders` – Displays profiling information for the shaders