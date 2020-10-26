# Using the Perforce Plugin with Lumberyard<a name="setting-up-lumberyard-perforce-plugin"></a>

Lumberyard integrates with Perforce as a source control solution\. The engine uses the `p4 set` command to configure settings, and the Perforce visual client \(P4V\) to selectively sync and submit changed assets\.

You can use the **Perforce Settings** dialog box to configure how Lumberyard connects to Perforce\. The following settings are cached and populated when the dialog box opens:
+ **Server** \(`P4PORT`\)
+ **User** \(`P4USER`\)
+ **Workspace** \(`P4CLIENT`\)
+ **Charset** \(`P4CHARSET`\)
**Note**  
`P4_<P4PORT>_CHARSET` is also cached\. This value is used if it matches your current `P4PORT` value; otherwise, the value for `P4CHARSET` is used\. For example, if `P4PORT` is set to **my\.perforce\.server\.com:1666**, the value **P4\_my\.perforce\.server\.com:1666** would be used\.

Certain values may not be modifiable if your Perforce connection settings are configured using a method that overrides the `p4 set` command\. The following connection methods may override the ability to modify a setting:
+ Config – A configuration file overrides this connection setting\. If detected, the path to the configuration file is displayed\. If undetected, you can check the setting for `P4CONFIG`\.
+ Environment – Your system environment overrides this connection setting\. You can check your system's control panel to remove these overrides\.

**To use the Perforce plugin menu**

1. In Lumberyard Editor, click the P4 icon in the bottom toolbar\.
**Note**  
Hover over the icon to display the connection status\.

1. In the drop\-down menu, you can do the following:
   + Click **Enable** or **Disable** to toggle the plugin\. The **Enable** setting allows you to work online\. The **Disable** setting forces you to work offline\.
**Note**  
Changes are not tracked in offline mode\. If you work offline, you must manually reconcile your work when you reconnect to Perforce\.
   + Click **Settings** to view or modify your Perforce settings\.

   To restore default settings, click **Reset** for each value\. When finished, click **OK** to apply your changes\.