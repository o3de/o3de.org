# Sprite Sheets<a name="ui-editor-component-sprite-sheets"></a>

You can configure an image as a sprite sheet\. 

A sprite sheet is a collection of separate images—such as icons, buttons, and other UI assets—that are stored in a single image\. Although you can keep all of your images in separate files, using a sprite sheet has several advantages:
+ Faster performance – For that collection of assets, Lumberyard can load just one image from disk instead of many separate images\. Loading multiple images requires many hard drive seeks and is performance expensive\.
+ Workflow improvements – When your animation contains multiple frames, for example, it's easier to manage just one image that contains all of the animation frames rather than separate files\. This makes editing and other workflows easier\.

  Other workflow improvements include easier management of your assets\. For example, you could have one image called `mainmenu_ui_assets_spritesheet.png` that contains all of your buttons rather than a series of files such as `mainmenu_button1.png`, `mainmenu_button2.png`, and so on\. 

**Example**  
The following image contains 12 walking images in a single row\.  

![\[Walking images.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-component-sprite-sheets-walking.png)

In the following procedure, you can divide the image into 12 columns when configuring the sprite sheet\. You can then select the piece of the image that you want to display for your **Image** component\.

**To configure an image as a sprite sheet**

1. In the [Sprite Editor](ui-editor-sprite-editor.md), click **Configure Spritesheet** in the lower\-left corner\.

   The **Configure Spritesheet** view displays two new sections, **Configure Spritesheet** and **Select cell**\.  
![\[Configure Spritesheet and Select cell.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-component-sprite-sheets-1.png)

1. Enter the number of rows and columns\. The walking images example has 12 columns and 1 row\. These values divide the sprite into a uniform grid and assume that each cell of the sprite sheet is of the same \(uniform\) size\.

1. In the **Select cell** section, click a cell to select it and display its properties\.

1. To configure individual cells with slices scaling, drag the dotted lines to the preferred positions\. The **Top**, **Bottom**, **Left**, and **Right** properties are updated automatically to reflect the current positions\.

   For more information about slice scaling, see [Sliced Image Type](ui-editor-component-9-sliced.md)\.

1. Click **Save** to save your changes and close the **Sprite Editor**\. Or click **Cancel** to revert your changes and close the **Sprite Editor**\.

1. To select the specific cell of the sprite sheet that you want to use, in the **Image** component properties, select the appropriate **Index** number\. 

   The **Sprite Editor** assigns index numbers in the rows and columns of the sprite sheet, from left to right and then top to bottom, starting with 0 \(zero\)\.

   If you defined an **Alias** in the **Sprite Editor** properties, that also appears next to the index numbers\.   
![\[Select Index number of sprite sheet.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-component-sprite-sheets-2.png)

   The cell that you selected appears in the **UI Editor** viewport\.