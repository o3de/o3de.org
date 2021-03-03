---
description: ' Create a canvas in the UI Editor to use as an invisible backdrop
  for your game user interface elements in Open 3D Engine. '
title: Working with UI Canvases
---
# Working with UI Canvases {#ui-editor-creating-canvases}

The **UI Editor** uses the concept of a canvas as an invisible backdrop for your game user interface elements\. Once you create a canvas, you can add elements such as images, text, and buttons\.

**To create a UI canvas**

1. In Lumberyard Editor, click **Tools**, **UI Editor**\.

   The **UI Editor** automatically creates an empty canvas\.

1. In the **UI Editor**, add [elements](/docs/user-guide/features/interactivity/user-interface/editor/elements.md), [components](/docs/user-guide/features/interactivity/user-interface/editor/components.md), [slices](/docs/user-guide/features/interactivity/user-interface/editor/working-slices.md), and [prefabs](/docs/userguide/ui/editor/prefabs.md)\.

1. Click **File**, **Save As**\. Name the canvas with a `.uicanvas` file extension, and then click **Save**\.

**Topics**
+ [Navigating the Viewport](/docs/user-guide/features/interactivity/user-interface/editor/navigating-viewport.md)
+ [Changing the Canvas Size](/docs/user-guide/features/interactivity/user-interface/editor/changing-size.md)
+ [Previewing Canvases](/docs/user-guide/features/interactivity/user-interface/editor/previewing-canvas.md)
+ [Configuring Canvas Properties](/docs/user-guide/features/interactivity/user-interface/editor/canvas-properties.md)
+ [Loading Canvases in Lua](/docs/user-guide/features/interactivity/user-interface/editor/loading-canvases-lua.md)
+ [Placing UI Canvases in the 3D World](/docs/user-guide/features/interactivity/user-interface/editor/placing-canvases-3d.md)
+ [Using Texture Atlases](/docs/user-guide/features/interactivity/user-interface/editor/texture-atlases.md)
+ [Debugging UI Canvases](/docs/user-guide/features/interactivity/user-interface/editor/debugging-ui-canvases.md)

You can open multiple canvases in the **UI Editor**\. For each open canvas, a tab appears in the tab bar\. The active canvas is highlighted in the tab bar\. Its content is displayed in the viewport and its elements and properties are displayed in the hierarchy and properties panes\.

From the **UI Editor**'s **File** menu, in addition to the basic open, close, and save functionality, you can also do the following:
+ Save all open canvases
+ Close all open canvases
+ Close all but the active canvas

![\[UI Editor File menu\]](/images/user-guide/game_ui_editor/ui-editor-creating-canvases-1.png)