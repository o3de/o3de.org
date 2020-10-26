# Script Canvas Debugging<a name="script-canvas-debugging"></a>

Script Canvas supports live debugging of a Script Canvas graph running in\-game\. You can use Lumberyard Editor or non\-editor tools like game launchers as debug targets\.

**To open the Script Canvas debugger and choose a target**

1. From the Script Canvas editor, choose **Tools**, **Debugging**\. The debugger panel opens at the bottom of the Script Canvas editor\.  
![\[Choose Tools, Debugging.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-debugging-1.png)

1. On the **Live** tab of the debugging panel, use the dropdown menu to choose the debug target\. The default target is Lumberyard Editor, but you can use Script Canvas to debug the game running in standalone mode\. For more information, see [In\-Game Debugging](#script-canvas-debugging-in-game)\.  
![\[Choosing the debug target.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-debugging-2.png)

## Choosing Entities and Graphs to Debug<a name="script-canvas-debugging-choosing-entities-and-graphs-to-debug"></a>

After you choose a debug target, you can choose the entities and graphs that you want to debug\.

**To choose entities and graphs to debug**

1. To see entities with Script Canvas graphs that are available for debugging, expand the items on the **Entities** tab\. The **Entities** tab displays the entities known to the debugger at edit time that have Script Canvas graphs\.  
![\[Entities with Script Canvas graphs.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-debugging-3.png)
**Note**  
Running the same graph multiple times on a single entity is not supported\.

1. To get a complete listing of all available Script Canvas graphs in the project, click the **Graphs** tab\. Each graph in the table shows all entities that are using that graph\. The **Graphs** tab is useful for debugging dynamically spawned scripts\. For more information, see [Debugging a Dynamically Spawned Graph](#script-canvas-debugging-debugging-a-dynamically-spawned-graph) later in this topic\.  
![\[Graphs that are attached to entities.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-debugging-4.png)

1. On the **Entities** tab or **Graphs** tab, select the check boxes for the entities or graphs that you want to debug\.  
![\[Selecting entities to debug.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-debugging-5.png)

1. To capture all instances of a selected graph, select **All Graph Instances**\.  
![\[Selecting all instances of a graph.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-debugging-6.png)

## Configuring Debugger Options<a name="script-canvas-debugging-configuring"></a>

Use the following options to configure debugger behavior\.

**Auto Capture**

![\[The Auto Capture option enabled.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-debugging-7.png)

Enable this option if you want the output from a specified target to be captured as soon as the debugger connects to it\. For external tools, capture starts immediately when you enable this option\. For Lumberyard Editor, capture starts when the editor enters game mode\.

**Live Updates**

![\[The Live Updates option enabled.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-debugging-8.png)

Enable this option to display the data as it is captured\. When disabled, the data is captured silently and displays only after the capture completes\.

**Note**  
When live updates are enabled and you capture a large amount of data, editor performance decreases noticeably\. For better performance, you should disable live updates, especially for longer captures\.

## Running the Debugger<a name="script-canvas-debugging-running-the-debugger"></a>

After you have chosen the entities or graphs to debug, you are ready to run the Script Canvas debugger\.

**To run the Script Canvas debugger**

1. Click **Capture**\. The **Capture** button puts Lumberyard into gameplay mode automatically\.  
![\[The Script Canvas debugger Capture button.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-debugging-9.png)
**Note**  
If **Editor** is selected as the capture target, the game must be running for the debugger to return results\.

   The Script Canvas debugger begins capturing data when the graph runs\. If live updates are enabled, the data appears in the debugger panel when the graph being debugged becomes active during gameplay\. Otherwise, the data appears after the capture completes\.  
![\[Data being captured in the Script Canvas debugger.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-debugging-10.png)

1. After you have enough data, click **Capture** again to stop the data capture\.

## Examining Captured Data<a name="script-canvas-debugging-examining-captured-data"></a>

The captured data is presented in a log that is sorted in order of processing\. Each line represents the processing of a single node\.

![\[Captured data in the Script Canvas debugger.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-debugging-11.png)

**Note**  
Currently, only a single instance of captured data can be stored\. Previous data is lost when a new set of data is captured\.

**To examine the captured data**

1. To see the Script Canvas node that corresponds to a line in the log, click the line\.

   Each line typically shows the node's **In** signal and **Out** signal\. If the **In** or **Out** signal is not present, the node is either the first or final node of a given execution line\. As shown in the following image, the **Set Location Rotation** node is the final node in the execution line, so an **Out** signal is not present\.  
![\[Choosing a debugger line to show the corresponding node on a Script Canvas graph.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-debugging-12.png)

1. Use the up or down arrow keys to move through the log messages in the debugger panel\. As you do so, the corresponding node to in Script Canvas graph is highlighted\.

1. To examine the data that the node was using, expand the log message\.  
![\[Expanding a log message to reveal its data.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-debugging-13.png)
**Note**  
Some nodes send additional information that appears in the form of annotations\. For example, the **Print** node sends the full string that it displayed\.

1. To expand all lines, click the ![\[Expand log messages.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-debugging-14.png) expand icon\.

1. To collapse all lines, click the collapse ![\[Expand log messages.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-debugging-15.png) icon\.

1. To search for a particular node name or names, use the **Search** box\.  
![\[Using search to find specific nodes in the Script Canvas debugger.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-debugging-16.png)

## Debugging a Dynamically Spawned Graph<a name="script-canvas-debugging-debugging-a-dynamically-spawned-graph"></a>

Dynamically spawned graphs are usually part of a dynamic slice\. Because dynamically spawned graphs cannot be known at edit time, you must select them by name rather than by the entity or entities on which they are used\.

**To debug a dynamically spawned graph**

1. On the **Graphs** tab, select the name of the graph\.

1. Follow the same steps that you use to debug any other Script Canvas graph\. The debugger records the graph's operations when the graph becomes active during gameplay\.

## In\-Game Debugging<a name="script-canvas-debugging-in-game"></a>

For in\-game debugging, you use the Script Canvas debugger to connect to a running game launcher\.

**To debug a running game**

1. Run `GridHub.exe` from the `Bin64vcxxx` directory that corresponds to the version of Visual Studio that you are using \(for example, `lumberyard_version\dev\Bin64vc141\GridHub.exe`\)\. GridHub is the network environment that provides connectivity between Lumberyard and its tools\. For more information, see [Using GridHub](gridhub-intro.md)\.
**Note**  
GridHub must be active for non\-editor targets to appear in the **Live** tab\.

1. Run the launcher for your game \(for example, `lumberyard_version\dev\Bin64vc141\SamplesProjectLauncher.exe`\.

1. On the **Live** tab of the Script Canvas debugger, choose the launcher from the list of debug targets\. When you choose the launcher as the debug target, Script Canvas execution is recorded for the graphs that you specify\.  
![\[Choosing a launcher debug target.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-debugging-2.png)

## Notes<a name="script-canvas-debugging-notes"></a>

When using the Script Canvas debugger, keep the following points in mind\.

### Performance<a name="script-canvas-debugging-performance"></a>

The editor experiences a severe decrease in performance when it is capturing data\. To mitigate this, disable live updates and avoid capturing lengthy sessions\. Lengthy sessions can easily lead to a sharp increase in logging events\. If your game runs at 60fps and you have 40 Script Canvas nodes that run on each tick, 2400 log messages must be displayed every second\. After a minute, this number increases to 144,000 messages\. To minimize the amount of data captured, limit the scope and intensity of logging\.

### Saving Issues<a name="script-canvas-debugging-saving"></a>

When you modify a graph and save it, some IDs are remapped in the asset, but not in the visualized Script Canvas scene\. As a result, the unified ID used in the logging messages no long matches the visual presentation\. This mismatch causes the visual scraping to fail\. To work around this, close and re\-open the Script Canvas scene\.