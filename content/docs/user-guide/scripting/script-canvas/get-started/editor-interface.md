---
linktitle: Editor Interface
title: Script Canvas Editor Interface
description: Understand the layout of the Script Canvas Editor.
weight: 100
---

You can open the **Script Canvas Editor** from **O3DE Editor**.

**To open the Script Canvas Editor**

1. In O3DE Editor, choose **Tools**, **Script Canvas**.

1. Choose **File**, **New Script** or drag a node from the **Node Palette** and drop it on the canvas.

![Use the Script Canvas Editor in O3DE to create connections for nodes.](/images/user-guide/scripting/script-canvas/user-interface.png)

In the Script Canvas Editor, you can do the following:

1. Use the menu bar to do the following:
   + Create, save, and open your scripts.
   + Cut, copy, or undo actions.
   + Change the Script Canvas Editor view.

1. Use the tabs to switch between scripts.

1. In the **Node Palette**, you can search for nodes.

1. You can drag a node from the **Node Palette** to the canvas or **right-click** the canvas for a context menu.

1. On a node, you can specify values for the parameters.

1. Drag to connect an output pin of a node to an input pin of another node. This line creates a connection between the nodes.

1. The **Variable Manager** shows the variables that are used in the script. You can add or delete variables and set their default values. To create **Get**, **Set**, or **OnValueChanged** nodes, you can drag a variable from the **Variable Manager** onto the script. Refer to [Script Canvas Variables and the Variable Manager](/docs/user-guide/scripting/script-canvas/editor-reference/variables/) for more information.

1. In the **Node Inspector**, you can view and modify the properties for a selected node.

## Additional Tools

Script Canvas Editor has the following additional menus and tools.

### Bookmarks

View and modify your saved bookmarks. You can use bookmarks to save locations on your script and then use keyboard shortcuts to move to that location. For more information, see [Adding Bookmarks in Script Canvas](/docs/user-guide/scripting/script-canvas/editor-reference/nodes/organizing/adding-bookmarks).

### Comments

You can create floating blocks of text on the Script Canvas Editor canvas. For more information, see [Adding Comments in Script Canvas](/docs/user-guide/scripting/script-canvas/editor-reference/nodes/organizing/commenting-nodes).
