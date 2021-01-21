---
description: ' Use the perspective viewport in &ly-editor; to place objects, edit
  terrain, test your game, and create assets in &ALYlong;. '
title: Using the Viewport
---
# Using the Viewport {#lumberyard-editor-viewport}

The viewport window \(called **Perspective** in Lumberyard Editor\) displays the scene that is rendered by the engine\. The majority of level design occurs in the viewport, including object placement, terrain editing, in\-editor play testing, and asset creation and interaction\. You can also use dynamic and flexible tools to understand the 3D relationships among objects in a level\.

The **Perspective** header includes a search box, field of view \(FOV\), screen ratio information, and options to show or hide debug information\.

**Topics**
+ [Changing the Field of View \(FOV\)](#lumberyard-editor-viewport-view)
+ [Changing the Camera View](#lumberyard-editor-viewport-camera)

![\[Image NOT FOUND\]](/images/userguide/lumberyard-editor-viewport.png)

**To customize the viewport**

1. In Lumberyard Editor, in the viewport title bar, right\-click **Perspective** and choose **Configure Layout**\.

1. In the **Layout Configuration** dialog box, select your preferred layout\.
![\[Image NOT FOUND\]](/images/shared/cinematics-cameras-focus-layout-configuration.png)

1. Click **OK** to save your changes\.

## Changing the Field of View \(FOV\) {#lumberyard-editor-viewport-view}

You can change the default camera's FOV for the Lumberyard Editor viewport or the FOV for your game's camera\. Follow the steps to change the default camera's FOV\. To change the FOV for your game's camera, see [Camera](/docs/userguide/components/camera.md)\.

**To change the default camera's FOV**

1. In Lumberyard Editor, choose **Edit**, **Editor Settings**, **Global Preferences**\.

1. In the **Preferences** window, under **Viewports**, click **General**\.

1. In the right pane, under **General Viewport Settings**, for **Perspective View FOV**, set the desired value in degrees\.

1. Click **OK** to save your changes\.

## Changing the Camera View {#lumberyard-editor-viewport-camera}

You can use the **Viewport Camera Selector** to quickly position and orient a camera in your game\. You can choose between all in\-game cameras and the editor camera\. When you possess the camera, you can use the editor controls to manipulate the camera\.

**To possess the camera and move around**

1. In Lumberyard Editor, in the **Perspective** viewport, select an entity with a **Camera** component or create one if it doesn't exist\.

1. In the **Entity Inspector**, under **Camera**, choose **Be this camera**\. This allows the editor to use the selected camera as its view\.
**Note**
After choosing **Be this camera**, moving the view in the editor changes the transform for the camera entity\. As you look around in the viewport while possessing a camera, the corresponding position and orientation for the transform is updated accordingly\.
![\[Image NOT FOUND\]](/images/userguide/camera-selector-be-camera.png)

1. Do any of the following:
   + Change to the default view: In the **Entity Inspector**, under **Camera**, choose **Return to default editor camera**\.
   + Choose another camera to possess in the **Viewport Camera Selector**\.
![\[Image NOT FOUND\]](/images/userguide/camera-selector-camera-options.png)
   + Disable the **Viewport Camera Selector** controls by entering game mode \(**Ctrl\+G**\)\.