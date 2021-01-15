---
description: ' Learn how to handle player input in Lumberyard. '
title: 'Tutorial Five: Handling player input through Script Canvas'
---
# Tutorial Five: Handling player input through Script Canvas<a name="tutor-ch05-player-input"></a>

In this tutorial, you will add new input event generators and build a network in **Script Canvas** to turn the chicken when the user presses the right thumbstick or the **L** and **;** keys\. This tutorial goes into detail about handling input events, working with variables, and finding, placing, and connecting nodes in **Script Canvas**\.

**Tip**  
If you like, you can follow this chapter in video \(7:33 minutes\) form:  

[![AWS Videos](https://img.youtube.com/vi/https://www.youtube.com/embed/Zh0LT9XSYLw?rel=0/0.jpg)](http://www.youtube.com/watch?v=https://www.youtube.com/embed/Zh0LT9XSYLw?rel=0)

Begin this tutorial either with the level you created in [Tutorial Four: Create PhysX colliders](tutor-ch04-create-physx-colliders.md), or by opening `ch04_barnyard_final` from the `Levels` directory of the **WelcomeGuideTutorials** project\. To open a level in Lumberyard, choose **Open Level…​** from the **File** menu in the main menu bar\.

1.  This tutorial is written for the default **Lumberyard Editor** layout, so make sure this is the layout that you’re using\. To set the layout, access the menu bar and select **View**, **Layouts**, and choose **Default Layout**\.   
![\[Lumberyard select default layout\]](/images/welcomeguide/ui-default-layout-1.25.png)

1.  Edit the `.inputbindings` asset to create a new event group and event generators for turn input\. From the **Tools** menu, choose **Asset Editor**\. 

1.  Locate the **Asset Editor** tab on the left below **Asset Browser**\. In **Asset Editor**, expand the **File** menu and choose **Open**\. In the **InputBindings** folder, open `ch05_chicken_controls.inputbindings`\. The `.inputbindings` file binds user input to events in Lumberyard that you can handle through script\. This `.inputbindings` asset has been set up with three events: forward and back movement, left and right movement, and jump\. These events are bound to keyboard and gamepad input\.   
![\[Lumberyard input bindings\]](/images/welcomeguide/ui-input-bindings-1.25.png)

1.  In **Asset Editor**, in the `ch05_chicken_controls.inputbindings` asset, click the **\+** button to the right of **Input Event Groups** to create a new input event group\. Expand the group by clicking the arrow in the left\. Enter `Turn` for **Event Name** in the new group\.   
![\[Lumberyard create a new input event group\]](/images/welcomeguide/ui-new-input-event-group-1.26.png)

1.  Add **three** event generators\. Event generators are mapped to the keys and buttons on your input devices\. Click the **\+** button to the right of **Event Generators** in the **Turn** input event group to create an new event generator\. In the **Class to create** dialog for each new generator, accept the default choice **Input**\.   
![\[Lumberyard create new input event bindings\]](/images/welcomeguide/ui-three-new-input-bindings-1.26.png)

1.  The following steps assign the first input generator to the right thumbstick, and the second and third generators to the **L** and **;** keys so the player can turn the chicken left and right\. 

   1.  In the first input generator, set **Input Device Type** to `gamepad`, set **Input Name** to `gamepad_thumbstick_r_x`, and set **Event value multiplier** to `-1.0`\. Setting **Event value multiplier** to `-1.0` will invert the output from the left to right axis of the right thumbstick\. This is necessary to rotate the chicken to the right when the thumbstick is pressed right, and left when the thumbstick is pressed left\. 

   1.  In the second input generator, set **Input Device Type** to `keyboard`, set **Input Name** to `keyboard_key_alphanumeric_L`, and set **Event value multiplier** to `1.0`\. 

   1.  In the third input generator, set **Input Device Type** to `keyboard`, set **Input Name** to `keyboard_key_punctuation_semicolon`, and set **Event value multiplier** to `-1.0`\.   
![\[Lumberyard create new input event generators\]](/images/welcomeguide/ui-new-input-event-generator-1.26.png)

1.  In **Asset Editor** expand the **File** menu and choose **Save** to save the new input bindings\. 
**Important**  
The chicken entity is set to use a different `.inputbindings` than the one you created\. Make sure to update the **Input** component on `player_chicken` to use the `ch05_chicken_controls.inputbindings` asset you edited\.

1.  You must create a script to handle the input events the `Turn` input bindings will generate\. From **Tools** in the main menu, choose **Script Canvas** to open the Script Canvas editor\. 

    **Script Canvas** is a visual script editor\. In Script Canvas, rather than write code, you create scripts visually by placing and connecting nodes\. The nodes in **Script Canvas** are functions that use the same framework as Lua and the Lumberyard C\+\+ API\. You can create complex functionality in Script Canvas without knowing how to program\.

   On the left of **Script Canvas** is the **Node Pallette**\. You can filter the node list by typing terms in the search bar at the top of the pallette\. To place a node, click and drag node names from the pallette into the graph\. Hold the right mouse button and drag the mouse to pan the graph\. Scroll the mouse wheel to zoom the graph\. Take a moment to examine the contents of the network and try navigating the graph\.  
![\[Lumberyard navigating Script Canvas\]](/images/welcomeguide/anim-script-canvas-navigation-1.26.gif)

1.  In **Script Canvas**, expand the **File** menu and choose **Open** or press **Control \+ O**\. In the `ScriptCanvas` directory, open `ch05_chicken_movement.scriptcanvas`\. This script canvas creates event notifications for the input events generated by `ch05_chicken_controls.inputbindings`, and then moves the `player_chicken` entity based on those input events\.   
![\[Lumberyard Script Canvas interface\]](/images/welcomeguide/ui-script-canvas-1.26.png)

1.  To create a network that handles the `Turn` input event, begin by panning and zooming the graph to find an empty spot to build a new node network\. 

1.  Type `activated` in the search bar at the top of the **Node Pallette** to filter the list\. Click and drag the **On Entity Activated** node into the graph\. Every entity can generate an activated event\. In this scenario, the chicken entity generates an activated event when gameplay starts\. The network connected to this node will execute when the chicken is activated\. 

   Note the **On Entity Activated** node is in a container called **Game Entity**\. This is because game entities can also be deactivated\. In some circumstances you will want access to both events in the same network\.  
![\[Lumberyard add an On Activated event node\]](/images/welcomeguide/ui-script-canvas-activated-1.26.png)

1.  Using the same method as above, place a **Create Input Event Notification ID** node to the right of the **On Entity Activated** node in the graph\. 

1.  Place an **On Held** node to the right of **Create Input Event Notification ID** in the graph\. The **On Held** node is in an **Input** container\. The **Input** container may also have on pressed and on released events in the same network\.   
![\[Lumberyard setting up a Turn event handler in Script Canvas\]](/images/welcomeguide/ui-script-canvas-turn-input-a-1.26.png)

1.  Click the **Create Input Event Notification ID** node to select it\. Set the **actionName** property to `Turn` either by typing in the field on the node, or in the **Node Inspector** to the right\. This sets the script to respond to the `Turn` event you created in the input bindings\. 

1.  Click the **Input** node to select it\. In the node inspector to the right, enable the **Display Connection Controls** property\. This exposes some input connection pins on the **Input** node, and enables the node to be wired into a network\. Most often, event nodes like **On Held** begin a network, so their input connections pins are hidden by default\. 

1.  Wire up the following pins by clicking and dragging from the *first pin* to the *second pin*: 

   1.  From **On Entity Activated** *Out* to **Create Input Event Notification ID** *In* 

   1.  From **Create Input Event Notification ID** *Out* to **Input** *Connect* 

   1.  From **Create Input Event Notification ID** *InputEventNotificationID* to **Input** *Source*   
![\[Lumberyard wiring up input handler nodes\]](/images/welcomeguide/anim-sc-input-network-1.26.gif)

      These three nodes are the basis for handling player input\. The network that connects to these nodes will be executed every time the player presses the right thumbstick, or the **L** or **;** keys\.

1.  The functionality to rotate the chicken entity requires three nodes\. Add a **Multiply \(\)** node to the right of the **On Held** node\. 

1.  Add a \(Vector3\) **Create From Values** node to the right of the **Multiply \(\)** node\. 

1.  Add a **Rotate** node to the right of the **Create From Values** node\. 

1.  The value **On Held** provides must be multiplied by a value that controls how fast the chicken rotates when the right thumbstick is held\. The **turnRate** variable controls rotation speed\. You can add the **turnRate** variable to the **Multiply \(\)** node as a reference using drag and drop\. Locate the **turnRate** variable in the **Variable Manager** to the right\. 

1.  Click and drag the **turnRate** variable into the graph and drop it on the second **Number** pin of the **Multiply \(\)** node to reference the **turnRate** variable\.   
![\[Lumberyard drag and drop reference Script Canvas\]](/images/welcomeguide/anim-sc-drag-reference-1.26.gif)

1.  Wire up the following pins by clicking and dragging from the *first pin* to the *second pin*: 

   1.  From **On Held** *Out* to **Multiply \(\)** *In* 

   1.  From **On Held** *Value* to **Multiply** *Number*\(1\) 

   1.  From **Multiply** *Out* to **Create From Values** *In* 

   1.  From **Multiply** *Result* to **Create From Values** *Z* 

   1.  From **Create From Values** *Out* to **Rotate** *In* 

   1.  From **Create From Values** *Vector3* to **Rotate** *Euler Angles*   
![\[Lumberyard setting up a Turn event handler in Script Canvas\]](/images/welcomeguide/ui-script-canvas-rotate-1.26.png)

      The **On Held** node provides input values when the user holds a button or key on a device\. In this scenario, the right thumbstick is an analog control and provides a value between `-1.0` and `1.0` depending how far left or right it is pressed\. The value from the input is multiplied by the turn rate\. The result will determine how quickly the chicken turns when the user holds the right thumbstick left or right\. The result is plugged into the Z element of a Vector3, Z being the axis we want to rotate the chicken around\. The resulting Vector3 is used by the **Rotate** node to apply a rotation to the chicken entity\.

1.  Save the `ch05_chicken_movement` Script Canvas by pressing **Control \+ S** or choosing **Save** from the **File** menu in **Script Canvas**\. 
**Important**  
The chicken entity’s **Script Canvas** component is not referencing the `ch05_chicken_movement` script canvas you just edited\. Make sure the chicken entity’s **Script Canvas** component is referencing the correct script canvas, otherwise the turn functionality you just added will not work in the next step\.  
Select the chicken by clicking it in **Perspective**\. In **Entity Inspector**, in the **Script Canvas** component, click the **Hierarchy** icon to the right of **Script Canvas Asset**, expand the **ScriptCanvas** directory and choose `ch05_chicken_movement.scriptcanvas`\.

1.  In the top toolbar, click the **Play** button or press **Control \+ G** to enter play mode\. Use the **Left thumbstick** or **W**, **A**, **S**, and **D** keys to move the chicken\. Use the **Right thumbstick** or **L** and **;** keys to turn the chicken\. Tap the **Space** key or the **Right bumper** button on a gamepad repeatedly to make the chicken jump\. Press **Escape** to exit play mode\.   
![\[Lumberyard chicken turn example\]](/images/welcomeguide/anim-chicken-turn-1.26.gif)

**Note**  
This tutorial implements a very simple approach to handling turn input\. The result of this tutorial is not framerate independent\. The chicken will turn slower or faster depending on framerate\. In `ch05_chicken_movement_final.scriptcanvas` you can examine a better implementation that multiplies the input by a `turnMaxVelocity` and puts the result in a `turnVelocity` variable\. The turn is computed **On Tick** using `Delta` \(the elapsed time between ticks\) to make the rate the chicken turns consistent regardless of framerate\.

For extra credit, try adding a new event generator to the input bindings\. Create a small graph in Script Canvas that uses a **DrawTextOnScreen** node to display a message, variable, or value on screen when a key is pressed\. Hint: use a **BuildString** Script Canvas node to create a string from a numerical value\.

When you’re ready, try [Tutorial Six: Add a camera](tutor-ch06-add-a-camera.md)\.