---
description: ' Learn to use the O3DE Editor. '
linktitle: Editor tour
title: Introduction to the O3DE Editor
weight: 100
---

{{< preview-migrated >}}

O3DE Editor is your primary workspace\. From here, you access all of the tools to design, create, test, play, and deploy your project\. If you have used other professional engines or 3D animation packages, you'll find the user experience familiar and adapt to O3DE Editor quickly\.

O3DE Editor can be launched from the start menu or the O3DE Editor desktop icon\. When O3DE Editor launches, you're given the option to create a new level or load an existing level\. If you're using one of the example O3DE projects, you will find example levels in the **Levels** directory of the project\. If you're working with a new project, you must create a new level\.

For a 20\-minute crash course on navigating the **Perspective** viewport, customizing the O3DE Editor layout, creating entities, and working with components in O3DE Editor, see the following video tutorial\.

[![AWS Videos](https://img.youtube.com/vi/https://www.youtube.com/embed/E1NgI8urJ7o?rel=0/0.jpg)](http://www.youtube.com/watch?v=https://www.youtube.com/embed/E1NgI8urJ7o?rel=0)

**Note**
Open 3D Engine version 1\.25 introduced an updated interface\. You will notice differences in the visual interface and user experience viewing this video while using O3DE 1\.25 or later; however, the information in the video tutorial is still applicable to the fundamentals of using O3DE Editor\.

## The O3DE Editor default layout<a name="editor-default-layout"></a>

The default layout of O3DE Editor contains the most commonly used tools in a configuration, similar to other content creation applications\. The core workflow of O3DE is to create and place *entities* in a level, so the default layout contains a menu bar, two toolbars, and five tool panes focused on entity creation and placement\.

You can customize the layout through drag and drop, and save to a custom layout through the **Layouts** option in the **View** menu of the main menu bar\. Drag the separator bars between panes to resize the panes\. Drag the title bar of a pane to tear off the pane\. The pane can be dropped anywhere in the layout or dropped outside of O3DE Editor as its own window\. To restore the default layout, select **Default Layout** from the **Layouts** option in the **View** menu of the main menu bar\.

![\[The default O3DE Editor layout.\]](/images/welcomeguide/ui-editor-labeled-1.25.png)

1.  **Perspective** - This 3D viewport is a real\-time view of your level\. In **Perspective**, you create and place entities, and view and play your project\.

   Right\-click **Perspective** in the title bar of the pane to open the perspective menu\. From the perspective menu, you can toggle visibility for various helpers such as the construction plane, icons, and guides\. You can also select an aspect ratio, view through various cameras placed in the level, create new cameras from the current view, and split the **Perspective** pane into multiple views\.

   Right\-click in **Perspective** to open the context menu to create entities and *slices*, which are reusable assets that contain multiple entities\. From the context menu, you can also create *layers* that you can use to organize entities and slices in your level\.

1.  **Entity Outliner** - The **Entity Outliner** displays a list of entities, slices, and layers in the current level\.

   Right\-click in the **Entity Outliner** to open the context menu to create entities, slices, and layers\. Much of the functionality of the **Entity Outliner** context menu is shared with the **Perspective** context menu\. The **Entity Outliner** context menu also has options to find selected entities and slices in **Perspective**, organize the list in the **Entity Outliner** and find slices in the **Asset Browser**\.

1.  **Entity Inspector** - The **Entity Inspector** displays the components of the currently selected entity\. At the top of the **Entity Inspector** is a field for the entity **Name** and an **Add Component** button\. The **Add Component** button opens a list of components, sorted by type, that can be added to the entity\. Each component has its own set of properties that are displayed in the **Entity Inspector**\. All entities contain a transform component that sets the position, rotation, and scale of the entity in the level\.

1.  **Asset Browser** - The **Asset Browser** browses your project's on\-disk assets\. Assets such as meshes, animations, and textures are created in third\-party applications\. Assets such as materials, scripts, and slices are created within O3DE Editor\. The assets that you create are stored in your project directory\. You can also browse default assets that are included with O3DE, as well as assets that are included with Gems that have been added to your project\.

   The left of the pane of the **Asset Browser** displays a directory structure that you can browse for available assets\. When an asset is selected, the preview pane on the right displays a thumbnail preview and information about the asset, if available\.

1.  **Editor Console** - The **Editor Console** shows command and process output from O3DE Editor and your project\. When you load a level, for example, the console displays messages about assets and configuration files as they load, and might display warnings and errors if issues are encountered\. You can enter console commands such as setting console variables in the entry field at the bottom of the console\. Click the **\{x\}** button in the lower left of the **Editor Console** to open the **Console Variables Editor**, which provides a simple interface for setting console variables\.

1.  **Toolbar** - The **Toolbar** provides easy access to various editor tools and features\. The toolbar is docked at the top of the editor by default, but you can also dock it vertically on the edges of the editor\. To customize the toolbar, right\-click anywhere on the toolbar and select **Customize** from the context menu\. You can choose which toolbars, views, or modes to include\. You can also add commands to a toolbar\.

1.  **Perspective Toolbar** - The **Perspective Toolbar** at the bottom of the **Perspective** pane displays position information for selected objects\. You can also adjust navigation speed; mute audio; go to a specific position; toggle camera collision; run simulations, and enable VR preview mode\.

## Navigating the O3DE Perspective viewport<a name="navigation"></a>

O3DE's interaction model will be familiar to anyone who has played a first\-person PC game, with a few minor tweaks and additions\. Movement is handled by keyboard input, and view is handled by pointer device input\.

![\[WSAD and Mouse graphic.\]](/images/welcomeguide/wg-WASD.png)
+  **W** - Move forward\.
+  **S** - Move backward\.
+  **A** - Move left\.
+  **D** - Move right\.
+  **Q** - Move down\.
+  **E** - Move up\.
+  **Z** - Focus on selected\.
+  **Right mouse \+ drag** - Rotate view, known as *mouselook* in most games\.
+  **Mouse wheel scroll** - Zoom view\.
+  **Middle mouse \+ drag** - Pan view\.
+  **Left mouse** - Select entity\.
+  **Left mouse \+ drag** - Area select entities\.

## Movement preferences<a name="movement-preferences"></a>

You might prefer that your editor camera controls behave like a flight simulator\. Or you might want to speed up or slow down the default movement or rotation of the editor camera\. You can adjust the default editor camera control behavior by setting the **Movement** properties in the **Global Preferences** editor\.

![\[O3DE movement preferences.\]](/images/welcomeguide/ui-preferences-movement-1.25.png)

Choose **Global Preferences** from the **Editor Settings** group in the **Edit** menu\. Select **Movement** under the **Viewports** list on the left\. Here, you can invert either mouse axis and adjust the movement speed of the editor camera\.

When you have your movement preferences set to your liking, you might find at times that the editor camera movement is too fast or too slow in certain situations\. You can adjust the movement speed in the **Perspective Toolbar** at the bottom of the **Perspective** pane\.

![\[O3DE Perspective movement speed.\]](/images/welcomeguide/ui-camera-speed-1.25.png)

Enter a floating point value in the **Speed** property to set movement speed\. You can also click the arrow to the right of the **Speed** property to set the movement speed to **0\.1**, **1\.0**, or **10\.0**\.

## Save Perspective locations<a name="save-perspective-locations"></a>

As you build a level, you might find that it's helpful to have preset **Perspective** views saved for later use\. You can save the current editor camera view, assigning it to a **\[Function\]** key\. To save a **Perspective** location, press **\[Control \+ Function\(1\-12\)\]** To set the **Perspective** view to a saved location, press **\[Shift \+ Function\(1\-12\)\]**\.