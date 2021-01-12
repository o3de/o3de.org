---
description: ' Learn how to add a camera that follows a moving player character in
  Lumberyard. '
title: 'Tutorial Six: Add a camera'
---
# Tutorial Six: Add a camera<a name="tutor-ch06-add-a-camera"></a>

In this tutorial, you will create a camera entity and use **Script Canvas** to make a third\-person camera follow the player\. This tutorial introduces the **On Tick** event, and explains how to request data from other entities in **Script Canvas**\.

**Tip**  
If you like, you can follow this chapter in video \(4:41 minutes\) form:  

[![AWS Videos](http://img.youtube.com/vi/https://www.youtube.com/embed/Cg2uDaix7fA?rel=0/0.jpg)](http://www.youtube.com/watch?v=https://www.youtube.com/embed/Cg2uDaix7fA?rel=0)

Begin this tutorial either with the level you created in [Tutorial Five: Handling player input through Script Canvas](tutor-ch05-player-input.md), or by opening `ch05_barnyard_final` from the `Levels` directory of the **WelcomeGuideTutorials** project\. To open a level in Lumberyard, choose **Open Level…​** from the **File** menu in the main menu bar\.

1.  This tutorial is written for the default **Lumberyard Editor** layout, so make sure this is the layout that you’re using\. To set the layout, access the menu bar and select **View**, **Layouts**, and choose **Default Layout**\.   
![\[Lumberyard select default layout\]](/images/welcomeguide/ui-default-layout-1.25.png)

1.  Use the navigation controls to line up the **Perspective** view roughly behind and above the chicken\. The exact view is not important\. The camera you create in this tutorial automatically provides a consistent view\.   
![\[Lumberyard line up the camera in perspective view\]](/images/welcomeguide/ui-line-up-view-1.26.png)

1.  Right\-click in the viewport to open the context menu and select **Create camera entity from view**\. A new entity is added to the level containing a transform and a **Camera** component\. The default settings for the camera component are suitable for this tutorial\. 

   Zoom out and adjust your view with the **S** key and right mouse button to get a view of the camera entity\. The camera entity displays the camera’s frustum as a yellow wire frame\. The frustum represents the field of view of the camera\. Enter play mode and **Perspective** snaps to the camera entity’s view\. Press Escape to exit play mode\.  
![\[Lumberyard create a camera entity from view\]](/images/welcomeguide/ui-create-camera-from-view-1.26.png)

1.  Rename the camera entity\. Select the camera entity by clicking its name in **Entity Outliner** or by clicking the camera in **Perspective**\. Name the entity `player_camera`\. 

1.  Add a `.scriptcanvas` to the `player_camera` entity\. The provided `.scriptcanvas` updates the camera entity’s position and rotation in response to the chicken’s movement creating a floating follow camera\. In **Entity Inspector**, choose **Add Component** and add a **Script Canvas** component to the `player_camera` entity\. 

1.  Open **Script Canvas** by expanding the **Tools** menu and choosing **Script Canvas**\. 

1.  In **Script Canvas**, expand the **File** menu, and choose **Open**\. In the `ScriptCanvas` directory, select `ch06_chicken_camera.scriptcanvas`\.   
![\[Lumberyard follow camera Script Canvas\]](/images/welcomeguide/ui-chicken-camera-script-canvas-1.26.png)

   Before continuing, take a moment to examine the script and understand its function\.

   The entry node \(the node furthest to the left\) is an **On Tick** event\. Every entity has an **On Tick** event\. Any networks connected to this event node will execute for every tick of the game clock, generally once per frame, 30, 60, or more times per second\. You should use **On Tick** whenever your entity needs to process something at regular intervals\. It’s best to keep the processes that use **On Tick** simple\. Complicated and computationally expensive processes that run every tick can result in poor performance\.

   The first node group \(the green box\) finds the position and orientation of the chicken in world space, and uses the **camDistance** and **camHeight** variables to create a position behind and slightly above the chicken\.

   The second node group \(the purple box\) takes the position created in the first node group and the position of the camera at the current tick, and *lerps* the two positions based on a **lerpPercentage** variable\. Lerp is shorthand for *linear interpolation*, which is a function that estimates a new position between the two given positions, weighted by a value \(**lerpPercentage** in this scenario\)\. The position created by the **Lerp** node is somewhere between the camera’s current position and the position calculated in the first node group\. The result is that the camera follows the chicken with a slight lag that softens the camera movement\. If you use the position generated in the first node group without this **Lerp** function, the resulting camera movement is very sharp and jarring\. You can adjust the camera movement lag by changing the **lerpPercentage** variable\. Use values between `0.0` and `1.0`\.

   At the end of the second node group, the camera is positioned behind the chicken, facing the same direction as the chicken, but not actually looking at the chicken\. In the third node group \(the orange box\), the **Look At** node produces a transform \(a matrix representing a position, orientation, and scale\) that ensures the camera is positioned behind and above the chicken, and rotated to look at the chicken\. The slight rotations added to the camera by **Look At** can be jarring when the chicken jumps\. The final group of nodes smooth out the camera rotation\.

   The script gets the world rotation of the camera at the current tick and the world rotation of the camera after the **Look At** has been applied\. These world rotations are formatted as *quaternions*\. A quaternion represents a series of *Euler* rotations around the X, Y, and Z axes as a single rotation around a new axis\. The primary reason for using quaternions is to avoid *gimbal lock*, which is a common issue with Euler rotations\. If this camera smoothing functionality had been implemented with Euler rotations, many more nodes would be required\. In an Euler implementation, in certain circumstances, the camera might flip and roll unpredictably due to gimbal lock\. With quaternions, the rotations are lerped, producing a camera rotation somewhere between the current camera rotation and the **Look At** rotation\. The result is put in a transform and applied to the camera entity, softening the rotation of the camera\.

1.  The `ch06_chicken_camera.scriptcanvas` is functionally complete, but needs to reference the `player_chicken` entity to get the location and orientation of the chicken\. You might notice that some nodes, such as the **Get World Translation** and **Get Forward** nodes in the first node group, have input pins labeled **Source** and **Entity ID**\. These inputs are set to `Self` when they are placed in a graph, which means they will get the required data from the entity that the script is attached to\. These inputs can reference other entities in the level, however\. 

   Find the **Get World Translation** node in the first node group, click the target button to the right of **Source**, then click the `player_chicken` entity in **Perspective**\. This references the chicken entity in the **Get World Translation** node and allows the camera script to get the chicken’s position in the world\.  
![\[Lumberyard Script Canvas link entity\]](/images/welcomeguide/ui-script-canvas-link-entity-a-1.26.png)

1.  Find the **Get Forward** node in the first node group, click the target button to the right of **EntityID**, then click the `player_chicken` entity in **Perspective**\. This allows the camera script to get the chicken’s orientation\.   
![\[Lumberyard Script Canvas link entity\]](/images/welcomeguide/ui-script-canvas-link-entity-b-1.26.png)

1.  Press **Control \+ S** to save the `ch06_chicken_camera.scriptcanvas`, and close the **Script Canvas** window\. 

1.  Assign the `ch06_chicken_camera.scriptcanvas` to the **Script Canvas** component you added to the `player_camera` entity\. Select the camera by clicking it in **Perspective**\. In **Entity Inspector**, in the **Script Canvas** component, click the **Hierarchy** icon to the right of **Script Canvas Asset**, expand the **ScriptCanvas** directory and choose `ch06_chicken_camera.scriptcanvas`\. 

1.  Test the camera\. Press the **Play** button or **Control \+ G** and move the chicken\. The camera should follow behind the chicken\.   
![\[Lumberyard follow camera\]](/images/welcomeguide/anim-follow-camera-1.26.gif)

For extra credit, try changing the **Field of View** of the camera component to see its effect\. Try to change the camera script canvas to create a side\-scrolling like camera view\.

When you’re ready, try [Tutorial Seven: Create terrain](tutor-ch07-create-terrain.md)\.