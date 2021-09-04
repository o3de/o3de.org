---
description: null
title: Using Script Events in Script Canvas
weight: 200
---

Script Canvas scans for and detects script event assets, so after you define a script event, you can use it in Script Canvas.

## Script Events in the Node Palette 

Script event assets appear by default in the **Script Events** category in the Script Canvas editor **Node Palette**.

![\[The Script Events category in the Script Canvas Node Palette.\]](/images/user-guide/script-canvas-script-events-4.png)

{{< note >}}
To change the name of the category, open the script event's asset definition in the Asset Editor and edit the `Category` property.
{{< /note >}}

## Sending Events 

You can send an event by adding a **Send** *method\_name* node to a Script Canvas graph.

**To send an event**

1. Drag and drop the method that you want to send onto the Script Canvas graph.

1. In the context menu, choose **Send** *method\_name*.
![\[Choose Send method_name in the context menu.\]](/images/user-guide/script-canvas-script-events-5.png)

   A method send node is added to the graph.
![\[A send node added to a Script Canvas graph.\]](/images/user-guide/script-canvas-script-events-6.png)

1. Connect this node to the appropriate logic and data inputs. When the Script Canvas graph runs, it sends the event to the entities or systems to which the node is connected.

## Handling Events 

You can handle an event by adding a **Receive** *method\_name* node to a Script Canvas graph.

**To handle an event**

1. Drag and drop a script event method onto the canvas.

1. In the context menu, choose **Receive** *method\_name*.
![\[Choose Receive method_name in the context menu.\]](/images/user-guide/script-canvas-script-events-7.png)

   An event handler method node is added to the graph.
![\[A receive node added to a Script Canvas graph.\]](/images/user-guide/script-canvas-script-events-8.png)

1. Connect your event handling logic to the **Out** pin of the node.

1. Connect the data pin as needed.
