---
linktitle: Editor Shortcuts
title: Script Canvas Editor Shortcuts
description: Learn keyboard and mouse shortcuts for the Script Canvas Editor in Open 3D Engine (O3DE).
weight: 100
---

The **Script Canvas Editor** includes the following keyboard and mouse shortcuts:

## Keyboard shortcuts

| Key Combination | Action | Description |
| --- | --- | --- |
| **Arrow keys** | Scroll graph | Scrolls the graph left, right, up, or down. You must have focus in the graph canvas, either by clicking on a node or clicking anywhere inside the canvas. |
| **Ctrl+C** | Copy | Copies the selected nodes and their connections to the clipboard. |
| **Ctrl+V** | Paste | Pastes copied nodes and their connections from the clipboard into the active graph. |
| **Ctrl+D** | Duplicate | Duplicates the selected nodes in the active graph. This is the equivalent of using **Ctrl+C** and **Ctrl+V**. |
| **Ctrl+Left Arrow** | Select inputs | Selects all nodes that are connected to the input pins of the currently selected node. |
| **Ctrl+Right Arrow** | Select outputs | Selects all nodes that are connected to the output pins of the currently selected node. |
| **Ctrl+Up Arrow** | Select connected nodes | Selects all nodes that are connected to the currently selected node. |
| **Esc** | Clear selection | Deselects any selected nodes. |
| **Ctrl+Shift+P** | Screenshot | Creates an image of the area around all selected nodes and adds it to the clipboard. If no nodes are selected, an image of the entire active graph is added to the clipboard. |
| **Shift+Left Arrow** | Align left | Aligns all the selected nodes along a left edge. |
| **Shift+Right Arrow** | Align right | Aligns all the selected nodes along a right edge. |
| **Shift+Up Arrow** | Align top | Aligns all the selected nodes along a top edge. |
| **Shift+Down Arrow** | Align bottom | Aligns all the selected nodes along a bottom edge. |
| **Ctrl+Alt+M** | Add comment | Adds a new comment using the properties from the default comment preset. For information about presets, see [Creating Comment and Group Presets](/docs/user-guide/scripting/script-canvas/editor-reference/nodes/organizing/creating-comment-and-group-presets). Note that NVIDIA's GeForce Experience overlay uses a default setting for turning on/off the microphone that interferes with this hotkey. |
| **Ctrl+Alt+O** | Make group | Creates a new group using the properties from the default node group preset. Any selected nodes become part of the new group, and are enclosed within the group border. For information about presets, see [Creating Comment and Group Presets](/docs/user-guide/scripting/script-canvas/editor-reference/nodes/organizing/creating-comment-and-group-presets). |
| **Ctrl+Shift+H** | Ungroup | Ungroups the currently selected group. |
| **Ctrl+[0-9]** | Create bookmark | Creates a bookmark out of the current view and assigns it to the specified number key. If you choose a number that is already assigned to a bookmark or a bookmark-enabled group, you are prompted to reassign the existing bookmark. For more information about bookmarks, see [Adding Bookmarks in Script Canvas](/docs/user-guide/scripting/script-canvas/editor-reference/nodes/organizing/adding-bookmarks). For information about enabling groups as bookmarks, see [Grouping Nodes](/docs/user-guide/scripting/script-canvas/editor-reference/nodes/organizing/grouping-nodes). |
| **[0-9]** | Jump to bookmark | Jumps to the bookmark location associated with the key that is pressed. |
| **Ctrl+Plus Sign (+)** | Zoom in | Zooms the graph in. |
| **Ctrl+Minus Sign (-)** | Zoom out | Zooms the graph out. |
| **Ctrl+Shift+Up Arrow** | Zoom to selection | Centers the view on the nodes that are currently selected. |
| **Ctrl+Shift+Down Arrow** | Show entire graph | Centers the entire graph into the current display. Zooms out as much as possible to display all nodes. |
| **Ctrl+Shift+Left Arrow** | Show start of chain | Centers the view on the nodes that do not have any input connections, and are connected to the selected node through their output connections. |
| **Ctrl+Shift+Right Arrow** | Show end of chain | Centers the view on the nodes that do not have any output connections, and are connected to the selected node through their input connections. |
| **Ctrl+K** then **Ctrl+C** | Disable selected nodes | Disables the selected nodes. When a node is disabled, its color changes to gray. Disabled nodes remain visible in the Editor, but are not run at runtime. |
| **Ctrl+K** then **Ctrl+U** | Enable selected nodes | Enables the selected nodes. |

{{< note >}}
If a keyboard shortcut doesn't appear to work for you, another process running in the background might have bound that key combination.
{{< /note >}}

## Mouse shortcuts

The following shortcuts use the mouse or keyboard and mouse.

| User Action | Result | Description |
| --- | --- | --- |
| **Alt+LMB** on node | Disconnect and delete a single node or group | Disconnects and deletes the node or group clicked. |
| **Alt+LMB** on connection | Delete a connection | Deletes the connection clicked from the active graph. |
| **Alt+LMB** on slot | Delete connections |  Deletes any connections to the slot from the active graph.  Ensure that the connections that you want to delete are highlighted before pressing **Alt+Left Click**. Otherwise, you might delete the node instead.   |
| **MMB** on graph tab | Close graph | Closes the open graph that corresponds to the tab that you clicked. If the graph has changed and has not been saved, you're prompted to save it first. |
| **Mouse Wheel Up/Down** | Zoom in/out | Zooms in or out on the graph. |
