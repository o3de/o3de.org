---
description: ' View status, lock selection, cursor position and transform status,
  and so on with the bottom toolbar in &ALYlong;. '
title: Using the Bottom Toolbar
---
# Using the Bottom Toolbar {#lumberyard-editor-toolbar-bottom}

 Lumberyard Editor includes a bottom toolbar that provides status as well as the features below\.

![\[Image NOT FOUND\]](/images/userguide/editor-toolbar-bottom-1.25.png)

## Status {#lumberyard-editor-toolbar-bottom-status}

The **status** bar \(A\) displays the number of selected entities and provides functional hints for buttons or menu items in Lumberyard Editor\.

## Coordinates/Transforms {#lumberyard-editor-toolbar-bottom-coordinates}

The **coordinates/transform** area \(B\) shows the position of the cursor or the status of a transform, and allows you to enter new transform values\. The information in these fields vary based on your tasks:
+ When creating an entity or moving the mouse in the viewport, these fields show the cursor location in absolute world coordinates\.
+ When translating an entity by dragging it in the viewport, these fields show entity's location in absolute world coordinates\.
+ While transforming an entity, these fields change to spinners in which you can directly type values, or modify by scrolling the mouse wheel\.
+ While a transform button is active and multiple entities are selected, these fields show the first selection's transform values\.

## Set Vector {#lumberyard-editor-toolbar-bottom-vector}

The **Set Vector** button \(C\) allows you to set the position, rotation or scale for the selected entities\.

## Goto Position {#lumberyard-editor-toolbar-bottom-goto}

The **Goto Position** button \(D\) opens the **Go to position** dialog box to set a world position and rotation for the perspective view\. You can enter floating point coordinates and rotation, or use the spinners to specify values\. Clicking the **Go To** button immediately moves the viewport to the specified coordinates and rotates the view\.

![\[Image NOT FOUND\]](/images/userguide/editor-toolbar-bottom-goto-1.25.png)

## Lock Selection {#lumberyard-editor-toolbar-bottom-lock}

The **Lock Selection** button \(E\) toggles selection locking, preventing you from inadvertently selecting something else in a level\.

When your selection is locked, you can click or drag the mouse anywhere in the viewport without losing your selection\. To deselect or alter your selection, click **Lock Selection** again to unlock the selection\.

## Lock Axis Vectors {#lumberyard-editor-toolbar-bottom-lock-axis-vector}

The **Lock Axis Vectors** button \(F\) makes scale operations uniform\.

## Speed Control {#lumberyard-editor-toolbar-bottom-speed}

The **Speed** button \(G\) allows you to change the speed of viewport movement\. Select a preset speed from the list, enter a value into the field, or use the spinners to adjust the speed up or down\.

## Terrain Collision {#lumberyard-editor-toolbar-bottom-terrain-collision}

The **Enable Terrain Camera Collision** button \(H\) toggles terrain collision to inhibit camera movement below the terrain surface\.

## Move Player and Camera Separately {#lumberyard-editor-toolbar-bottom-separate-camera}

The **Move Player and Camera Separately** button \(I\) allows the viewport camera to be moved separately from the player entity\.

## Simulate {#lumberyard-editor-toolbar-bottom-simulate}

The **Simulate** button \(J\) toggles physics simulation and AI, allowing you to test physics and AI behavior directly in the editor without entering game mode\.

## Mute Audio {#lumberyard-editor-toolbar-bottom-audio}

The **Mute Audio** button \(K\) mutes audio in both editor and play mode\.

## VR Preview {#lumberyard-editor-toolbar-bottom-vr}

The **VR Preview** button \(L\) previews your project in [virtual reality mode](/docs/userguide/vr/preview.md) when a [virtual reality](/docs/userguide/vr/_index.md) gem is enabled\.