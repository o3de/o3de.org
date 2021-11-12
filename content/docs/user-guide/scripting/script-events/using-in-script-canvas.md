---
title: Using Script Events in Script Canvas
description: Learn how to use script events with Script Canvas in Open 3D Engine (O3DE).
weight: 200
---

Script Canvas scans for and detects script event assets, so after you define a script event, you can use it in Script Canvas.

## Script events in the node palette

Script event assets appear by default in the **Script Events** category in the **Script Canvas Editor** **Node Palette**.

![The Script Events category in the Script Canvas Node Palette.](/images/user-guide/scripting/script-events/using-in-script-canvas-1.png)

{{< note >}}
To change the name of the category, open the script event's asset definition in the Asset Editor and edit the `Category` property.
{{< /note >}}

## Sending events

You can send an event by adding a **Send** *method\_name* node to a Script Canvas graph.

**To send an event**

1. Drag and drop the method that you want to send onto the Script Canvas graph.

1. In the context menu, choose **Send** *method\_name*.

    ![Choose Send method_name in the context menu.](/images/user-guide/scripting/script-events/using-in-script-canvas-2.png)

    A method send node is added to the graph.

    ![A send node added to a Script Canvas graph.](/images/user-guide/scripting/script-events/using-in-script-canvas-3.png)

1. Connect this node to the appropriate logic and data inputs. When the Script Canvas graph runs, it sends the event to the entities or systems to which the node is connected.

## Handling events

You can handle an event by adding a **Receive** *method\_name* node to a Script Canvas graph.

**To handle an event**

1. Drag and drop a script event method onto the canvas.

1. In the context menu, choose **Receive** *method\_name*.

    ![Choose Receive method_name in the context menu.](/images/user-guide/scripting/script-events/using-in-script-canvas-4.png)

    An event handler method node is added to the graph.

    ![A receive node added to a Script Canvas graph.](/images/user-guide/scripting/script-events/using-in-script-canvas-5.png)

1. Connect your event handling logic to the **Out** pin of the node.

1. Connect the data pin as needed.
