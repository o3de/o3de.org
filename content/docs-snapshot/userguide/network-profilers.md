# Using Profiler for Networking<a name="network-profilers"></a>

****  
Profiler is in preview release and is subject to change\. 

You can use the Lumberyard Profiler tool to examine how your game uses network bandwidth, including its GridMate carrier connections and replica activity\. You can use network\-specific profilers to drill down further into the activity of specific replica chunks, RPCs, and data sets\. 

## Prerequisites<a name="network-profilers-knowledge-prerequisites"></a>

This topic assumes familiarity with Lumberyard networking and the Lumberyard Profiler tool\. For information on Lumberyard networking, see [Using Lumberyard Networking](network-intro.md)\. For an introduction to the Profiler tool, see [Profiler](profiler-intro.md)\.

**Topics**
+ [Prerequisites](#network-profilers-knowledge-prerequisites)
+ [Carrier Profiler](#network-profiler-carrier)
+ [Replica Activity Profiler](#network-profiler-replica-activity)

## Carrier Profiler<a name="network-profiler-carrier"></a>

The Profiler tool has a GridMate channel with **Carrier** and **Replica activity** profiler instances\. You can use the Carrier profiler detail view to examine the bandwidth usage of a selected GridMate carrier connection\.

**To open the detail view for the Carrier profiler**
+ Click the **Detailed Profiling Information** icon for **Carrier** in the GridMate channel:   
![\[Carrier details icon\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-network-gridmate-carrier-detail-icon.png)

  The Carrier profiler detail view resembles the following image:   
![\[Carrier Profiler detail view\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-network-gridmate-carrier-detail-view.png)

  This view uses all of the data supplied in the capture session to show an overview of the bandwidth usage through the GridMate carrier for the selected connection\. It includes the following information:
  + **Total Sent/Total Received** – The total number of bytes sent and the total number of bytes received on the selected connection\.

     
  + **User Data Sent/User Data Received** – The user data sent and the user data received on the selected connection\. This data does not include the overhead associated with carrier or connection maintenance\.

     
  + **Packets Sent/Packets Received** – The number of packets sent and the number of packets received\. 

     
  + **Return Trip Time \(Latency\)** – How many seconds the packets took to make a return trip\.

## Replica Activity Profiler<a name="network-profiler-replica-activity"></a>

You can use the Replica Activity profiler to see how much replica bandwidth your application is using\.

**To open the Replica Activity profiler**
+ Click the **Detailed Profiling Information** icon for **Replica activity**\.   
![\[Replica activity details icon\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-network-gridmate-replica-activity-detail-icon.png)

  The Replica Activity profiler detail view has a pair of **Bytes Sent** and **Bytes Received** graphs at the top, a toolbar to control the display in the middle, and a table of replicas at the bottom:   
![\[Replica network activity\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-network-replica-activity.png)

  This view is useful for discovering how much bandwidth a single entity is using, and for finding what information is synchronized in response to particular events for particular entities\. 

Two main detail views are available for replica activity: **Replica** and **Chunk Type**\. The view defaults to **Replica**, but Profiler remembers your most recent choice and uses it the next time you view replica activity details\.

### Using Replica View<a name="network-profiler-replica-activity-replica-view"></a>

In replica view, the table shows how much data each replica used in a given frame\. 

**To change the view to Replica**
+  In the toolbar, choose **Replica**\.  
![\[Choosing replica view\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-network-replica-activity-choose-replica-view.png)

  Each replica is represented by its associated color in the graphs above the toolbar\. Replica view includes the following information:
  + ** Bytes Sent** – Shows bandwidth usage in bytes sent by the object for a particular frame\.

     
  + **Bytes Received** – Shows bandwidth usage in bytes received by the object for a particular frame\.

     

**To display or hide an individual line in the graph**
+ Double\-click the associated row in the tree\. 

  The toolbar also offers the following options: 
  + **Hide All** – Hides the line graphs of all replicas in the table\.

     
  + **Show All** – Shows the line graphs for all replicas in the table\.

     
  + **Hide Selected** and **Show Selected** – Use **Ctrl\+click** to select individual replicas in the table, and then click **Hide Selected** or **Show Selected** to hide or show the graphs for the replicas that you selected\.

     
  + **Display Range** – Determines the number of frames that are shown in the graph, with the currently selected frame in the center\. You can use this option to zoom in or out on the data\. 

     

**To display replica chunk details for a particular replica**
+ Click its details icon\.  
![\[Replica chunk details icon\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-network-replica-activity-replica-details-icon.png)

  The graph shows the bytes sent and received for a replica chunk, data set, and RCP:   
![\[Details view\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-network-replica-activity-replica-details-view.png)

  You can use this details view to see what replica chunk types a given replica is using, how much data each replica chunk type is using, and how much bandwidth individual data sets and RPCs are using\. 

**Tip**  
Click **Expand All** to list all replica chunks in all replicas, and every data set and remote procedure call \(RPC\) in each replica chunk:   
   

![\[Expanded view\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-network-replica-activity-replica-details-view-expanded.png)

**To use the Replica Activity profiler tree view**
+ Do either of the following:
  + Select a row to highlight its corresponding line in the graph\.
  + Double\-click a row to display or hide the graph for the row\.

  The following information is available:
  + **Display Name** – The debug name associated with the corresponding row of the table\.

     
  + **Sent Bytes** – The number of bytes sent for an item, including all information sent by children of the item\.

     
  + **Received Bytes** – The number of bytes received by an item, including all information received by children of the item\.

     

### Chunk Type View<a name="network-profiler-replica-activity-chunk-type-view"></a>

Chunk type view shows you how much data each chunk type used in a given frame\. The view is useful for seeing how much information a particular system might be using across all entities\. 

**To change the view to Chunk Type**
+ In the toolbar on the main detail page for **Replica activity**, choose **Chunk Type**\.   
![\[Changing to Chunk Type view\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-network-replica-activity-choose-chunk-type-view.png)

  The chunk type view shows how much data a particular replica chunk type is using in a given frame:   
![\[Chunk type view\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-network-replica-activity-chunk-type-table-view.png)

**To inspect chunk type details**
+ Click the details icon for the chunk type:   
![\[Chunk type details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-network-replica-activity-chunk-type-details-icon.png)

  The details window shows which replicas are using a chunk type's bandwidth, how much data they are using, and how much data the individual data sets and RPCs are using:   
![\[Chunk type details collapsed\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-network-replica-activity-inspecting-chunk-type-details.png)

  As before, you can expand the items in the tree to see detailed information about each:   
![\[Chunk type details expanded\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/profiler-network-replica-activity-inspecting-chunk-type-details-expanded.png)