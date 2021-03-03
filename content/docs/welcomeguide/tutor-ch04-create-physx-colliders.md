---
description: ' Learn how to add PhysX colliders in Open 3D Engine. '
title: 'Tutorial Four: Create PhysX colliders'
---
# Tutorial Four: Create PhysX colliders<a name="tutor-ch04-create-physx-colliders"></a>

In this tutorial, you add a **White Box Collider** to the feed locker and a **Character Controller** to the chicken to detect collisions with PhysX\. In the first tutorial, you added a **PhysX Terrain** level component which creates a collider for terrain\. The chicken and the feed locker colliders, in combination with the **PhysX Terrain** level component, allow the chicken to move and jump around the level without falling through the terrain or the feed locker\.

**Tip**
If you like, you can follow this chapter in video \(4:28 minutes\) form:

[![AWS Videos](https://img.youtube.com/vi/https://www.youtube.com/embed/jNm6jPKCmWk?rel=0/0.jpg)](http://www.youtube.com/watch?v=https://www.youtube.com/embed/jNm6jPKCmWk?rel=0)

Begin this tutorial either with the level you created in [Tutorial Three: Build a player character](tutor-ch03-build-a-player-character.md), or by opening `ch03_barnyard_final` from the `Levels` directory of the **WelcomeGuideTutorials** project\. To open a level in Lumberyard, choose **Open Level…​** from the **File** menu in the main menu bar\.

1.  This tutorial is written for the default **Lumberyard Editor** layout, so make sure this is the layout that you're using\. To set the layout, access the menu bar and select **View**, **Layouts**, and choose **Default Layout**\.
![\[Lumberyard select default layout\]](/images/welcomeguide/ui-default-layout-1.25.png)

1.  Add a collider to the the feed locker\. Select the `feed_locker` entity either by clicking its name in **Entity Outliner**, or by clicking on it in **Perspective**\. In **Entity Inspector**, click **Add Component** to open the component list\. Enter `whi` in the search field to filter the list by name and choose **White Box Collider** from the filtered results to add a **White Box Collider** component\. For this tutorial the default property settings on the component are fine\.
![\[Lumberyard add white box collider component\]](/images/welcomeguide/ui-add-white-box-collider-component-1.25.png)

1.  Add a collider to the chicken\. Select the chicken slice by clicking its name in **Entity Outliner** or by clicking on it in **Perspective**\. In **Entity Inspector**, click **Add Component** to open the component list\. Enter `char` in the search field to filter the list by name and choose **PhysX Character Controller** from the filtered results to add a **PhysX Character Controller** component\.
![\[Lumberyard add PhysX Character Controller component\]](/images/welcomeguide/ui-add-physx-character-controller-component-1.26.png)

1.  The default collider shape for the **PhysX Character Controller** is a capsule\. Change its Height to `0.6` and its **Radius** to `0.3`, so that the collider more closely matches the shape of the chicken's body\.
![\[Lumberyard set the PhysX collider shape\]](/images/welcomeguide/ui-physx-character-controller-set-size-1.26.png)

1.  To test the colliders, you need to be able to move the chicken\. To do this, you add input bindings that link input from keys and buttons to events in Lumberyard\. You also add a script canvas that handles the input events\. The next chapter will go into detail about input bindings and **Script Canvas**\. For now, add an already created set of input bindings and a script canvas to provide basic movement for the chicken\.

   With **player\_chicken** selected, in **Entity Inspector**, choose **Add Component** to open the component list\. Enter `inp` in the search field to filter the list by name and choose **Input** from the filtered results to add an **Input** component\.
![\[Lumberyard add an Input component\]](/images/welcomeguide/ui-add-input-component-1.25.png)

1.  In the **Input** component, for **Input to event bindings**, choose the **Hierarchy** button to the right\. Expand the `InputBindings` directory and open `ch04_chicken_controls_final.inputbindings`\. The `.inputbindings` file is an asset created in Lumberyard that creates event groups with event generators\. A button on a gamepad is an event generator and a `.inputbindings` asset links the button to a named event you can handle through script\.
![\[Lumberyard set input bindings on Input component\]](/images/welcomeguide/ui-input-component-set-bindings-1.26.png)

1.  With **player\_chicken** selected, in **Entity Inspector**, choose **Add Component** to open the component list\. Enter `sc` in the search field to filter the list by name and choose **Script Canvas** from the filtered results to add a **Script Canvas** component\.
![\[Lumberyard add a Script Canvas component\]](/images/welcomeguide/ui-add-script-canvas-component-1.25.png)

1.  In the **Script Canvas** component, for **Script Canvas Asset**, choose the **Hierarchy** button to the right\. Expand the `ScriptCanvas` directory and open `ch04_chicken_movement_final`\. The `ch04_chicken_movement_final.scriptcanvas` asset contains a few script networks that respond to events generated from the `ch04_chicken_controls_final.inputbindings` asset, making the chicken move in response\.
![\[Lumberyard set script on Script Canvas component\]](/images/welcomeguide/ui-script-canvas-component-set-script-1.26.png)

1.  In the top toolbar, click the **Play** button or press **Control \+ G** to enter play mode\. Use the **W**, **A**, **S**, and **D** keys or, preferably, the **Left thumbstick** on a game controller to move the chicken\. The **Space** key, or the **Right bumper** button on the controller makes the chicken jump\. Press **Escape** to exit play mode\.
![\[Lumberyard chicken input and movement\]](/images/welcomeguide/anim-chicken-input-1.26.gif)

1.  You might have noticed that when the chicken collides with the feed box, she will pop up on top of the feed box if you continue to press forward on the thumbstick\. This is a feature of the **PhysX Character Controller**\. The **PhysX Character Controller** has a **Step Height** property that allows the character to walk up objects smaller than a set height\. The property is set too high by default for this scenario\.

   With **player\_chicken** selected, in **Entity Inspector**, in the **PhysX Character Controller** component, set **Step Height** to `0.1`\. Test the chicken input again\. The chicken no longer pops up on the feedbox after colliding with it\.
![\[Lumberyard set step height on Player Controller component\]](/images/welcomeguide/ui-player-controller-set-step-height-1.26.png)

1.  Save the changes to the `player_chicken` slice\. Right\-click the player\_chicken slice in Entity Outliner to open the context menu, and choose `player_chicken.slice` in the **Save Slice Overrides** list to save the changes you made to `player_chicken`\.

For extra credit, open Script Canvas to view the `ch04_chicken_movement_final.scriptcanvas` asset\.

1.  From **Tools** in the main menu, choose **Script Canvas** to open the Script Canvas editor\.

   In **Script Canvas**, expand the **File** menu and choose **Open** or press **Control \+ O**\. In the `ScriptCanvas` directory, open `ch04_chicken_movement_final.scriptcanvas`\. This script canvas creates event notifications for the events generated by `ch04_chicken_controls_final.inputbindings`, and then moves the chicken entity in response to the events\. There are comments and groups in the canvas that explain what various parts of the graph do\.

1.  Notice the **Variable Manager** in the upper right of the **Script Canvas** window\. The variables control various aspects of the chicken's movement\. The variables that are intialized to some value other than `0.0` set limits on properties such as how fast the chicken can move, how high it can jump, and how long it hangs in the air at the apex of its jump\. Try changing one of the variables, such as **jumpMaxHeight**, and test the changes to see the effect\.

**Tip**
Save your changes to a new script canvas\. Assign the new script canvas to the chicken's **Script Canvas** component to preserve the original `ch04_chicken_movement_final.scriptcanvas`\.

When you're ready, try [Tutorial Five: Handling player input through Script Canvas](tutor-ch05-player-input.md)\.