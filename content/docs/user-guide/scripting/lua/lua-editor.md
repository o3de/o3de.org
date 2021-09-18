---
linkTitle: Lua Editor
title: Introduction to Open 3D Engine's Lua Editor
description: Learn about the Lua Editor in Open 3D Engine.
toc: true
weight: 300
---

The O3DE **Lua Editor** (Lua IDE) offers an intuitive integrated development environment (IDE) that makes it easy to author, debug, and edit Lua scripts when you create or extend your game. Lua Editor is a standalone application, but can be opened directly from the **O3DE Editor** using the Edit Mode toolbar.

## Editing 

Lua Editor can open multiple scripts at the same time. Each script has its own tab in the editor. The editor provides a standard set of capabilities for text editing but also includes useful features for editing source code.

The following table summarizes the options available while editing and debugging.

| **Action** | **Keyboard Shortcut** |
| --- | --- |
| Comment selected block | **Ctrl+K** |
| Copy | **Ctrl+C** |
| Cut | **Ctrl+X** |
| Find | **Ctrl+F** |
| Find in open files | **Ctrl+Shift+F** |
| Find next | **F3** |
| Fold source functions | **Alt+0** |
| Go to line | **Ctrl+G** |
| Paste | **Ctrl+V** |
| Quick find local | **Ctrl+F3** |
| Quick find local reverse | **Ctrl+Shift+F3** |
| Redo | **Ctrl+Y** |
| Replace | **Ctrl+R** |
| Replace in open files | **Ctrl+Shift+R** |
| Select all | **Ctrl+A** |
| Select to brace¹ | **Ctrl+Shift+]** |
| Transpose lines down | **Ctrl+Shift+Down Arrow** |
| Transpose lines up | **Ctrl+Shift+Up Arrow** |
| Uncomment selected block | **Ctrl+Shift+K** |
| Undo | **Ctrl+Z** |
| Unfold source functions | **Alt+Shift+0** |

¹ Select to brace selects a block bounded by braces. Before using this option, the cursor must be immediately next to the beginning or ending brace of the block.

## Maintaining separate search results 

In addition to the usual search capabilities, the **Find** feature can display the results of four different searches separately.

1. Click the **Find** icon ![Find Results Icon](/images/user-guide/scripting/lua/lua-editor-debugger-find-results-icon.png) or press **Ctrl+F** to perform searches in the currently open file, or in all open files.

    ![Lua Editor Find dialog](/images/user-guide/scripting/lua/lua-editor-debugger-find-dialogue.png)

1. Before starting a search, choose **Find 1**, **Find 2**, **Find 3**, or **Find 4** to choose the window in which you want to see the results. You can maintain the results of four searches separately in the tabbed windows. The search results in the other windows remain unchanged.

    ![Find Results](/images/user-guide/scripting/lua/lua-editor-debugger-find-results-window.png)

1. To go directly to the line in the code which a search result was found, double-click the line in the search results.

{{< note >}}
 For convenience, you can also dock or float the **Find Results** window.
{{< /note >}}

## Perforce integration 

Lua Editor includes Perforce integration features. When you open a file from your Perforce environment, Lua Editor displays the file's status in the top right of the text editing window.

![Not Checked Out](/images/user-guide/scripting/lua/lua-editor-debugger-p4-not-checked-out.png)

![Checked Out By You](/images/user-guide/scripting/lua/lua-editor-debugger-p4-checked-out-by-you.png)

The **Source Control** menu offers **Check Out/Check In** functionality.

![Source Control Menu](/images/user-guide/scripting/lua/lua-editor-debugger-check-out-icon.png)
