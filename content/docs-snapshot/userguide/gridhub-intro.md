# Using GridHub<a name="gridhub-intro"></a>

****  
GridHub is in preview release and is subject to change\. 

GridHub is Lumberyard's connection hub for debugging\. GridHub acts as a central hub through which specified local clients connect with each other and exchange information\. When you run the Lumberyard diagnostic and debugging tools `Profiler.exe` or `LuaIDE.exe` \(located in the `\dev\Bin64` directory\), GridHub launches as a background process in Windows and enables their functionality\. For more information about Profiler, see [Profiler](profiler-intro.md)\.

**Note**  
Because GridHub listens for connections on the loopback address \(`127.0.0.1`\), you must run GridHub on the same computer as the target application\. 

**Topics**
+ [Registering an Application in GridHub](#gridhub-registering-an-application)
+ [Viewing and Configuring GridHub](#gridhub-viewing-and-configuring)
+ [Troubleshooting GridHub](#gridhub-troubleshooting)

## Registering an Application in GridHub<a name="gridhub-registering-an-application"></a>

To register an application in GridHub so that Profiler can capture information from the application, add `AzFramework::TargetManagementComponent` to the application’s `SystemComponent`\. 

**Note**  
 Lumberyard's built\-in applications already have this component added by default\. 

## Viewing and Configuring GridHub<a name="gridhub-viewing-and-configuring"></a>

When you launch `Profiler.exe` or `LuaIDE.exe`, GridHub starts automatically and is represented by a globe icon in the Windows taskbar\. 

**To view and configure GridHub**

1. In the Windows taskbar, right\-click the globe icon and choose **Show**:   
![\[Click Show\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gridhub-viewing-and-configuring-show.png)

   The GridHub window has a configuration bar, a connections pane, and pane for viewing log messages:   
![\[GridHub window\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gridhub-viewing-and-configuring-window.png)

1. You can use the configuration toolbar to view or change GridHub configuration:   
![\[GridHub configuration toolbar\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gridhub-viewing-and-configuring-toolbar.png)

   The toolbar options are as follows: 

   **Session port** – Specifies the port on which GridHub listens for discovery requests\. 

   **Connection slots** – Specifies the maximum number of applications that can be connected concurrently to GridHub\. 

   **Hub name** – The name of your hub\. By default, this is the name of the local computer\. 
**Note**  
The name of the hub must be the neighborhood name to which the `TargetManagementComponent` connects\. 

   **Enable Disconnection Detection** – Specifies whether the connection to GridHub is terminated when the source fails to respond\. 

   **Add to Windows startup folder** – Specifies whether GridHub starts automatically when Windows starts\. 

   **Log activity** – Starts or stops logging\. 

   **Start/Stop** – Starts or stops GridHub\. When GridHub is off, no connections are discovered or maintained\. 

1. When GridHub and your target application are active, your target application appears in the GridHub **Connections** list:   
![\[GridHub connections list\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gridhub-viewing-and-configuring-connections.png)

   The columns in the **Connections** list provide the following information: 

   **ID** – The identifier of the connected application\. 

   **Name** – The name of the connected application\. 

   **Connection** **ID** – The identifier of the connection between GridHub and the application\. 

   **IsHost** – Whether or not the connection is the connection host 

   **IsLocal** – Whether or not the connection is local\. 

   **IsReady** – Whether or not the application is ready to handle further connections\. 

1. Use the **Output** window to see the log messages that GridHub generates as it manages connections:   
![\[GridHub log messages\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gridhub-viewing-and-configuring-output.png)

When GridHub is terminated, the connections it established are also terminated\. 

## Troubleshooting GridHub<a name="gridhub-troubleshooting"></a>

If you experience difficulty using GridHub, check the following: 
+ Make sure that the neighborhood name in `TargetManagerComponent` is the same as the one in GridHub\. 
+ Make sure that the port that GridHub is listening on is the same port as the one specified for `TargetManagementComponent`\. 
+ Make sure that all applications are running on the same computer\. The GridHub socket is bound to the loopback address `127.0.0.1`\. 