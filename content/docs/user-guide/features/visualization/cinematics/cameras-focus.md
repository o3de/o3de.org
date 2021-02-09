---
description: ' Set the camera focus for cinematic sequences in &ALYlong;. '
title: Animating Depth of Field
---
# Animating Depth of Field {#cinematics-cameras-focus}

Camera focus, or depth of field \(DoF\), is used to add realism to scenes, which simulates the way a real\-world camera works\. You can use a broad DoF to focus on the entire scene, or use a shallow DoF to have sharp focus only on objects that are a specific distance from the camera\.

See the following guidelines and best practices when setting up camera focus:
+ Always keep characters in focus\.
+ Shift focus slowly and deliberately\.
+ Don't overdo camera focus
+ Don't use DoF for scenes that are far away\. DoF works best for differentiating between closeups and the background\.
+ Use your eyes to focus at different distances and see what is sharp and what is blurred\. You can use your thumb as a helper\. This should give you a sense of how it should look in a scene\.

DoF is rendered only for a single view pane layout \(the default\) in the viewport in Lumberyard Editor\. If you are using a multiple view pane layout and the sequence camera is not in the active pane, DoF doesn't render\. If you need to set this, do the following\.

**To set the viewport for a single view pane layout**

1. In Lumberyard Editor, right\-click the **Perspective** title bar in the viewport and choose **Configure Layout**

1. In the **Layout Configuration** dialog box, select the single view pane and then click **OK**\.  
![\[Create animation tracks for a Camera component in the timeline for a sequence.\]](/images/shared/cinematics-cameras-focus-layout-configuration.png)

1. Right\-click the **Perspective** title bar again and choose **Sequence Camera**\.

**To add a Depth of Field node**

1. In the Track View, select or create the sequence that you want\.

1. In the node browser, right\-click the **Director** node or any **Camera** node and choose **Add Depth of Field Node**\.

**Camera** nodes take precedence over the **Director** node\. Use the **Director** DoF node if you want the same DoF setup for multiple cameras\. In most cases, you want separate, specific DoF setups for each camera for more control\.

You can add as many keys as you want, and use the ****Curve Editor**** to further adjust DoF settings to change over time\. 

For more information, see [Using Animation Curves](/docs/userguide/cinematics/track-view/editor-animation-curves.md)\.