---
description: ' Use the top toolbar in &ly-editor; to access editor tools and features
  in &ALYlong;. '
title: Using the Top Toolbar
---
# Using the Top Toolbar<a name="lumberyard-editor-toolbars"></a>


****  

|  | 
| --- |
| This topic references tools and features that are [legacy](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#legacy)\. If you want to use legacy tools in Lumberyard Editor, disable the [CryEntity Removal gem](https://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-cryentity-removal-gem.html) using the [Project Configurator](https://docs.aws.amazon.com/lumberyard/latest/userguide/configurator-intro.html) or the [command line](https://docs.aws.amazon.com/lumberyard/latest/userguide/lmbr-exe.html)\. To learn more about legacy features, see the [Lumberyard Legacy Reference](https://d3bqhfbip4ze4a.cloudfront.net/lumberyard-legacy.pdf)\. | 

Lumberyard Editor provides a toolbar that allows you to easily access various editor tools and features\. The toolbar is docked at the top of the editor by default, but you can also dock it vertically on the edges of the editor or undock it from the editor\. To customize the toolbar, right\-click anywhere on the toolbar and select **Customize** from the context menu\. You can choose which toolbars, views, or modes to include\. You can also add commands to a toolbar\.

![\[Image NOT FOUND\]](/images/userguide/lumberyard-editor-top-toolbar.png)

You can access Lumberyard tools and features using one of the following methods:
+ Toolbar buttons
+ Tools menu
+ [Keyboard shortcuts](/docs/userguide/editor/shortcut-keys.md)

For information about the bottom toolbar, see [Using the Bottom Toolbar](/docs/userguide/editor/toolbar-bottom.md)\.

## EditMode Toolbar<a name="lumberyard-editor-toolbars-editmode"></a>

![\[Image NOT FOUND\]](/images/userguide/editor-toolbars-editmode.png)

The **EditMode** toolbar includes various tools for general level editing:
+ **A** – Revert or apply the last command
+ **B** – Link or unlink the selected object
+ **C** – Filter what you can select in the viewport: all, brushes, no brushes, entities, prefabs, areas, shapes, AI points, decals, solids, or no solids
+ **D** – Use the translation tools to select, move, rotate, or scale an object or object type; and select or rotate a terrain area
+ **E** – Select the reference coordinate system
+ **F** – Specify the axis constraint by locking on the x\-, y\-, or z\-axis or xy\-plane
+ **G** – Use the object placement tools to follow the terrain, snap to objects, snap to grid, snap to angle, or show the ruler
+ **H** – Use the asset organization tools to open the object selector, create a selection, delete a selection, save selected objects, or load selected objects
+ **I** – Select the current layer

## Object Toolbar<a name="lumberyard-editor-toolbars-object"></a>

![\[Image NOT FOUND\]](/images/userguide/editor-toolbars-object.png)

The **Object** toolbar includes various tools for object alignment and manipulation:
+ **A** – Go to the selected object
+ **B** – Align the selection to an object by choosing the source object, clicking the tool, and then clicking the target object
+ **C** – Align the object to the grid
+ **D** – Set the object's height
+ **E** – Align the object to the terrain surface normal \(press and hold **Ctrl** for object surface normal alignment\)
+ **F** – Freeze or unfreeze the selected object
+ **G** – Apply vertex snapping for the selected object
+ **H** – Reset or get the physics state for the selected object or simulate physics on the selected object

If you align an object to another object that has modified scale or rotation, the original object will use the modified settings along with the position data\. To override this action, use the following keys \(single or combination\) when you select the original object:
+ **Ctrl** – Align the object to the bounding box
+ **Alt** – Use the object's existing rotation
+ **Shift** – Use the object's existing scale

## Editors Toolbar<a name="lumberyard-editor-toolbars-dialogs"></a>

![\[Image NOT FOUND\]](/images/userguide/editor-toolbars-dialogs.png)

The **Editors** toolbar allows you to access various editor tools:
+ **A** – Open the **Asset Browser**
+ **B** – Open the **Layer Editor**
+ **C** – Open the **LOD Generator**
+ **D** – Open the **Material Editor**
+ **E** – Opens **Geppetto**
+ **F** – Open the **Mannequin Editor** 
+ **H** – Open the **AI Debugger**
+ **I** – Open the Track View
+ **J** – Open the **Audio Controls Editor**
+ **K** – Open the **Terrain Editor**
+ **L** – Open the **Terrain Texture Layers** editor
+ **M** – Open the **Particle Editor**
+ **N** – Open the **Time of Day** editor
+ **O** – Open the **Sun Trajectory Tool**
+ **P** – Open the **Database View**
+ **Q** – Open the **UI Editor**

## Substance Toolbar<a name="lumberyard-editor-toolbars-substance"></a>

The **Substance** toolbar includes a button that opens the **Substance Editor**\.

![\[Image NOT FOUND\]](/images/userguide/editor-toolbars-substance.png)