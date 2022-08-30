---
linktitle: Adding Bookmarks
title: Adding Bookmarks in Script Canvas
description: Use the Open 3D Engine (O3DE) Script Canvas Editor to add bookmarks to your script.
weight: 500
---

A bookmark is a shortcut that you can add to a specific location on your Script Canvas graph. You can then use keyboard shortcuts to move quickly to that location. For example, you may have a complex script for a massive character controller that includes sections for movement, camera, and each attack. You can add a bookmark to each section and then press the keyboard shortcut to move the graph view to the specified section.

![Simple Script Canvas script with bookmarks added to various nodes.](/images/user-guide/scripting/script-canvas/bookmarks-example.png)

**To add a bookmark**

1. In your script, navigate to the node, group, or region of the canvas that you want to bookmark.

1. Press **Ctrl+1** (or **2** to **9**) to add a bookmark. A colored diamond icon appears on the canvas (unless you have bookmarked a node group).

    {{< note >}}
If you specify a number for a shortcut that a previous shortcut already uses, a dialog box appears. If you want to replace the previous shortcut, click **Yes**.
    {{< /note >}}

**To snap the graph view to a bookmark**
+ Press **1** to **9** to snap the graph view to the bookmarked location.

**To move a bookmark**

+ Drag the bookmark diamond to a new position in the graph.

To move a node group bookmark, simply move the node group.

**To manage your bookmarks**

1. In the **Script Canvas Editor**, choose **Tools**, **Bookmarks**.

1. In the **Bookmarks** window, you can do the following:
   + Search for the bookmark name.
   + Double-click a bookmark and then enter a new name.
   + Click **Create** to add a bookmark at your current location.
   + Select a bookmark and then click **Delete** to remove it.
   + Assign up to nine keyboard shortcuts for your bookmarks. To move to a bookmark that does not have an assigned keyboard shortcut, click the bookmark in the list.
   + Double-click a shortcut and then select a new number.
