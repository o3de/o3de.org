---
description: ' Use the Sprite Editor to configure your images and textures in Open 3D Engine''s
  UI Editor . '
title: Sprite Editor
---

The **Sprite Editor** configures the following sprite configurations:
+ Border values for [sliced image types](/docs/user-guide/interactivity/user-interface/editor/component-9-sliced.md)
+ [Sprite sheets](/docs/user-guide/interactivity/user-interface/editor/component-sprite-sheets.md)

You open the **Sprite Editor** from the **Image** component's properties.

**To open the Sprite Editor**

1. Open the **UI Editor** as explained in the preceding section.

1. Choose the ellipsis button next **Sprite path** and select the sprite file.

1. To the right of **Sprite path**, click the arrow ![\[Image NOT FOUND\]](/images/user-guide/game_ui_editor/ui-editor-components-button-1.png) icon.

![\[To open the Sprite Editor, click the arrow button next to Sprite path.\]](/images/user-guide/game_ui_editor/ui-editor-sprite-editor-1.png)

The **Sprite Editor** has the following features:

![\[Sprite Editor UI.\]](/images/user-guide/game_ui_editor/ui-editor-sprite-editor-2.png)
+ **Sprite viewport** - Displays sprite image.
+ **Border manipulators** - Sets border properties for sliced image types. To adjust the borders, drag the dotted lines, which are called manipulator positions. Changing these positions updates the corresponding **Border Properties** values.
+ **Properties**
  + **Image resolution** - The size of the image.
  + **Alias** - A short description of what the cell represents. Use this setting to improve the readability of sprite-sheet index values. You can use the same alias string for multiple sprite sheet cells.
  + **Top**, **Bottom**, **Left**, **Right** - The number of pixels from the respective edge of the image where the sliced region is situated.
+ **Configure Spritesheet** - Available only for sprites that are not currently configured as a sprite sheet. For more information, see [Configuring Sprite Sheets](/docs/user-guide/interactivity/user-interface/editor/component-sprite-sheets.md).
