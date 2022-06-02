---
linktitle: Adding and Connecting Nodes
title: Adding and Connecting Nodes in Script Canvas
description: Learn how to add and connect Script Canvas nodes in Open 3D Engine.
weight: 100
---

You can add nodes to a canvas by dragging and dropping them from the **Node Palette** onto the canvas. Use the Node Palette's search feature to search for a node by name.

You can also quickly add and connect nodes without using the **Node Palette**, as described in the following sections.

## Creating a chain of linked nodes

You can add nodes quickly in succession to a graph by using the daisy chaining feature. Script Canvas automatically links the pins on each new node to the previous node for you.

**To create a chain of linked nodes**

1. On the right side of the graph, press **Shift** + **Right-click**.

1. In the context menu search box, enter the name or partial name of the node that you want to add.

1. Press **Enter** to accept the search result, or click the name of another node in the result list.

    The new node appears on the graph with a line extended from the output pin. The context menu opens automatically, ready for you to add another node and link it to the previous one.

1. Continue to add as many connected nodes as you want. Previously created nodes automatically scroll off to the left.

    {{< note >}}
If you start by adding nodes on the left side of the graph, the nodes that you create quickly scroll out of view. To see the previous nodes that you created, start by pressing **Shift+Right-click** on the right side of the graph.
    {{< /note >}}

    ![Quickly adding nodes in succession in the Script Canvas Editor.](/images/user-guide/scripting/script-canvas/nodes-adding-and-connecting-1.gif)

1. To exit the daisy-chaining mode, press **ESC**.

## Creating a node from the output pin of an existing node

**To create a connected node from an output pin of an existing node**

1. From an output pin on the existing node, drag a line onto the canvas.

1. In the context menu search box, enter the name or partial name of the node that you want to add.

1. Press **Enter** to accept the search result, or click the name of another node in the result list. The pins on the new node connect automatically to the pins on the existing node.

    ![Creating a node from the output pin of an existing node in the Script Canvas Editor.](/images/user-guide/scripting/script-canvas/nodes-adding-and-connecting-2.gif)

1. To create a chain of linked nodes from the output pin of an existing node, hold **Shift** and drag a line from the output pin onto the canvas.

## Inserting a node between two connected nodes

To insert a node between two connected nodes and connect the new node automatically, you can use the following methods:

* Insert an existing node between the nodes.
* Create a new node between the nodes.

**To insert an existing node between two connected nodes**

1. Drag a node over the line that connects the two nodes, and hold the new node in position.

1. When an expanding, box-shaped animation appears, the node pins are connected. Script Canvas nudges surrounding nodes aside to accommodate the new node.

    ![Inserting an existing node between two connected nodes in the Script Canvas Editor.](/images/user-guide/scripting/script-canvas/nodes-adding-and-connecting-3.gif)

1. The node-nudging feature is enabled by default. To change it, choose **Edit**, **Settings**, **Global Preferences** and select or clear the **Allow Node Nudging On Splice** option.

    ![Configuring the node nudging preferences in the Script Canvas Editor.](/images/user-guide/scripting/script-canvas/nodes-adding-and-connecting-4.png)

**To create a node between two connected nodes**

1. Right-click the line that connects the two nodes.

1. In the context menu search box, do one of the following:

    * Enter the name of the node that you want, and press **Enter**.
    * Choose a node from the list.

    The pins on the new node connect automatically to the nodes on the left and the right.

    ![Creating a node between two nodes and connecting it automatically in the Script Canvas Editor.](/images/user-guide/scripting/script-canvas/nodes-adding-and-connecting-5.gif)

## Connecting two existing nodes automatically

You can connect two nodes by dragging one node onto another node. Script Canvas connects the corresponding pins for you.

**To connect two nodes automatically**

1. Drag a node over the side of the node that you want to connect, briefly holding the new node in position. For example, drag the left side of one node onto the right side of the second node.

1. When an expanding, box-shaped animation appears over the overlapping nodes, the node pins have been connected.

1. Adjust the position of the new node on the graph.

    ![Connecting two existing nodes by superimposing them in the Script Canvas Editor.](/images/user-guide/scripting/script-canvas/nodes-adding-and-connecting-6.gif)
