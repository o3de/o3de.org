# Working with UI Canvases<a name="ui-editor-creating-canvases"></a>

The **UI Editor** uses the concept of a canvas as an invisible backdrop for your game user interface elements\. Once you create a canvas, you can add elements such as images, text, and buttons\.

**To create a UI canvas**

1. In Lumberyard Editor, click **Tools**, **UI Editor**\.

   The **UI Editor** automatically creates an empty canvas\.

1. In the **UI Editor**, add [elements](ui-editor-elements.md), [components](ui-editor-components.md), [slices](ui-editor-working-slices.md), and [prefabs](ui-editor-prefabs.md)\.

1. Click **File**, **Save As**\. Name the canvas with a `.uicanvas` file extension, and then click **Save**\.

**Topics**
+ [Navigating the Viewport](ui-editor-navigating-viewport.md)
+ [Changing the Canvas Size](ui-editor-changing-size.md)
+ [Previewing Canvases](ui-editor-previewing-canvas.md)
+ [Configuring Canvas Properties](ui-editor-canvas-properties.md)
+ [Loading Canvases in Lua](ui-editor-loading-canvases-lua.md)
+ [Placing UI Canvases in the 3D World](ui-editor-placing-canvases-3d.md)
+ [Using Texture Atlases](ui-editor-texture-atlases.md)
+ [Debugging UI Canvases](ui-editor-debugging-ui-canvases.md)

You can open multiple canvases in the **UI Editor**\. For each open canvas, a tab appears in the tab bar\. The active canvas is highlighted in the tab bar\. Its content is displayed in the viewport and its elements and properties are displayed in the hierarchy and properties panes\.

From the **UI Editor**'s **File** menu, in addition to the basic open, close, and save functionality, you can also do the following:
+ Save all open canvases
+ Close all open canvases
+ Close all but the active canvas

![\[UI Editor File menu\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-creating-canvases-1.png)