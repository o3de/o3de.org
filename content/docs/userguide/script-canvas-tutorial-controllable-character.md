# Script Canvas Tutorial: Creating a Controllable Entity<a name="script-canvas-tutorial-controllable-character"></a>

This tutorial walks you through the steps to create a simple sphere that you can control with keyboard input\.

**Example**  

![\[Example controllable sphere in Script Canvas.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/moving.gif)

In addition to node basics, input, movement, and logging, you learn the following key concepts:
+ Adding nodes
+ Creating execution and data connections
+ Adding event nodes
+ Adding action nodes

## Prerequisites<a name="script-canvas-tutorial-controllable-character-prerequisites"></a>
+ Set the [Samples Project](sample-project-samples.md) as the default project\. For more information, see [Choosing a Game Project to Open](configurator-projects.md#project-configurator-launch-projects)\.
+ If your **Node Palette** is missing nodes, you can update your preferences to show hidden nodes\. For more information, see [Script Canvas Node Reference](script-canvas-node-reference.md)\. 
+ To access diagnostic nodes, including the **Print** node, you must enable the **Script Canvas Diagnostic Library** gem and then build your game project\. For more information, see [Enabling Gems](gems-system-using-project-configurator.md)\.

**Topics**
+ [Prerequisites](#script-canvas-tutorial-controllable-character-prerequisites)
+ [Step 1: Create a Level](#script-canvas-tutorial-controllable-character-step-one)
+ [Step 2: Create an Entity and Add Components to Create a Controllable Entity](#script-canvas-tutorial-controllable-character-step-two)
+ [Step 3: Create an Input Script with Script Canvas](#script-canvas-tutorial-controllable-character-step-three)
+ [Step 4: Assign the Script to Your Entity and Test the Script](#script-canvas-tutorial-controllable-character-step-four)
+ [Step 5: Create a Script to Move Your Sphere](#script-canvas-tutorial-controllable-character-step-five)
+ [Step 6: Add Movement on the X\-Axis for Your Sphere](#script-canvas-tutorial-controllable-character-step-six)

## Step 1: Create a Level<a name="script-canvas-tutorial-controllable-character-step-one"></a>

Before you create a sphere that you can control with keyboard input, you need to create a level\.

**To create a level**

1. In Lumberyard Editor, choose **File**, **New**\.

1. In the **New Level** dialog box, enter **firstscriptcanvas** and then click **OK**\.

1. In the **Generate Terrain Texture** dialog box, choose **512x512** and then click **OK**\.

## Step 2: Create an Entity and Add Components to Create a Controllable Entity<a name="script-canvas-tutorial-controllable-character-step-two"></a>

To create a sphere that you can control with keyboard input, you create an entity and add the **[Mesh](component-static-mesh.md)**, **[Rigid Body](https://docs.aws.amazon.com/lumberyard/latest/userguide/component-rigid-body.html)** component, **[Mesh Collider](https://docs.aws.amazon.com/lumberyard/latest/userguide/component-physics-mesh-collider.html)**, and **[Input](component-input.md)** components\. You also create an input mapping that converts WASD keyboard input into movement in the x and y directions\.

**To create a controllable entity**

1. In Lumberyard Editor, right\-click in the **Perspective** viewport and choose **Create entity**\.

1. In the **Entity Inspector**, do the following:

   1. For **Name**, enter **Player**\.  
![\[Create an entity for the sphere in Script Canvas.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/entity-inspector-name-field-player.png)

   1. Click **Add Component** and then choose the **Mesh** component\.

   1. In the **Mesh** component, for **Mesh asset**, click the browse \(**\.\.\.**\) button, select the `\SamplesProject\Objects\default\primitive_sphere.cgf` file and then click **OK**\.  
![\[Select the sphere asset for the Mesh component.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/pick-static-mesh-window-primitive-sphere.png)

1. In the viewport, use the [**Move** tool](lumberyard-editor-toolbars.md#lumberyard-editor-toolbars-editmode) to select the z\-axis and move the entity off the ground\.

1. In the **Entity Inspector**, click **Add Component** and then add the following components:
   + **Rigid Body Physics**
   + **Mesh Collider**\.
   + **Input**

1. In the **Input** component, click the **Input Bindings Editor** icon ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/input-bindings-editor-icon.png)\. This opens the **Asset Editor**\.

1. In the **Asset Editor**, choose **File**, **New**, **Input Bindings** and for **File name**, enter **player** and then click **Save**\.

1. In the **Edit Asset** window, do the following:

   1. For **Input Event Groups**, click **\+** to add a new input event group\.

   1. Expand the input event group\. For **Event Name**, enter **move\_x**\.

   1. For **Event Generators**, click **\+** to add an event generator\.

   1. In the **Class to create** dialog box, click **OK** to add an input class\.

   1.  Expand **move\_x**, **Event Generators**, **gamepad\_button\_a**\. For **Input Device Type**, select **keyboard**\.

   1. For **Input Name**, select **keyboard\_key\_alphanumeric\_A**\.

   1. For **Event value multiplier**, enter **\-1**\.

   1. Repeat steps C – E\. For **Input Name**, select **keyboard\_key\_alphanumeric\_D**\. For **Event value multiplier**, use the default value of `1`\.

   1. Expand the **keyboard\_key\_alphanumeric\_A** event generator and verify that your settings appear like the following\.  
![\[Creating the inputbindings for the Input component.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/player-inputbindings-editor-move-x.png)

1. In the **Edit Asset** window, do the following:

   1. For **Input Event Groups**, click **\+** to add a new input event group\.

   1. Expand the input event group\. For **Event Name**, enter **move\_y**\.

   1. For **Event Generators**, click **\+** to add an event generator\.

   1. In the **Class to create** dialog box, click **OK** to add an input class\.

   1. Expand **move\_y**, **Event Generators**, **gamepad\_button\_a**\. For **Input Device Type**, select **keyboard**\.

   1. For **Input Name**, select **keyboard\_key\_alphanumeric\_W**\. For **Event value multiplier**, use the default value of `1`\.

   1. Repeat steps C – E\. For **Input Name**, select **keyboard\_key\_alphanumeric\_S**\. For **Event value multiplier**, enter **\-1**\.

   1. Expand **keyboard\_key\_alphanumeric\_W** and verify that your settings appear like the following\.  
![\[Example player.inputbindings file.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/player-inputbindings-editor.png)

   1. Choose **File**, **Save**\.

1. In the **Input** component, click the browse \(**…**\) button, select the `player.inputbindings` file, and then click **OK**\.

## Step 3: Create an Input Script with Script Canvas<a name="script-canvas-tutorial-controllable-character-step-three"></a>

Now that you set up a sphere with physics and input mapping, you can create your first script with the **Script Canvas** editor\.

**To create an input script**

1. In Lumberyard Editor, choose **Tools**, **Script Canvas**\.

1. In the **Script Canvas** editor, choose **File**, **New Script**\.

1. After the graph loads, choose **File**, **Save As**\.

1. In the **Save As** dialog box, for **File name**, enter **player** and then click **Save**\.

1. In the **Node Palette**, enter **input** in the search box\.
**Note**  
You can also access the list of nodes by right\-clicking in an empty area on the graph\.

1. Under **Gameplay**, **Input**, drag **Input Handler** from the **Node Palette** to the graph\. **Input Handler** is an event node\. When an event occurs, the event node sends a message to the graph\.

1. For **Event Name**, enter **move\_y**\. This tells the node to listen for the input event\.  
![\[Example Input Handler node in Script Canvas.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/input-handler-node-event-name-move-y.png)

1. In the **Node Palette**, enter **Print** in the search box\.

1. Under **Utilities**, **Debug**, drag **Print** from the **Node Palette** to the graph\. **Print** is an action node\. When you execute an action node, it completes actions such as request data, set data, manipulate data, and trigger functions\. Action nodes also print data to the editor console, allowing you to check values as the script is being executed\.

1. From **Input Handler**, drag the **Held** pin to connect it to the **In** pin of the **Print** node\. This connection tells the **Print** node to execute after the input handler receives a held event\.

1. From **Input Handler**, drag the **Value** pin to connect it to the **Value** pin of the **Print** node\. This connection tells the **Input Handler** node to pass the input event value from the input handler to the first argument on the **Print** node\.
**Note**  
Node execution always flows from the left side to the right side of a node\. 
Data is always input on the left side of a node and output from the right side of the node\.   
For more information, see [Inputs, Outputs, and Connection Types](script-canvas-nodes-understanding.md#script-canvas-pins-and-connections)\.

1. Verify that your `player.scriptcanvas` file looks like the following\.  
![\[Example Input Handler and Print nodes in Script Canvas.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/input-handler-log-script-canvas-example.png)

1. In the **Script Canvas** editor, choose **File**, **Save** or press **Ctrl\+S**\.

## Step 4: Assign the Script to Your Entity and Test the Script<a name="script-canvas-tutorial-controllable-character-step-four"></a>

The script that you made outputs the value of the input event\. Now you can assign the script to your entity and test the script\.

**Note**  
The tutorial's keyboard input doesn't work in a remote desktop session\. 

**To assign and test your script**

1. In Lumberyard Editor, select the **Player** entity that you created\.

1. In the **Entity Inspector**, click **Add Component**, and then choose the **Script Canvas** component\.

1. Under **Script Canvas**, click the browse \(**\.\.\.**\) button, select the `player.scriptcanvas` file, and then click **OK**\.

1. Press **`** to open the console window or choose **Tools**, **Console**\.

1. Press **Ctrl\+G** to enter game mode\.

1. To trigger your input event, press **W** and then press **S**\. The **Console** pane in Lumberyard Editor outputs the value of the input event when the `move_y` event is triggered\. In this case, the **Console** pane outputs `1` when you press **W** and outputs `-1` when you press **S**\.  
![\[Console pane outputs 1 when you press W.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-console-test-input-event.png)

1. When you are done testing your script, press **Esc**\.

## Step 5: Create a Script to Move Your Sphere<a name="script-canvas-tutorial-controllable-character-step-five"></a>

Now that you've successfully created your first script, you can add nodes to move your sphere\. You also modify the input event value to control the movement speed\.

**To move your sphere**

1. In the **Script Canvas** editor, in the **Node Palette**, enter **multiply** in the search box\.

1. Under **Math**, drag **Multiply** from the **Node Palette** to the graph\.  
![\[Example Script Canvas Multiply node.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/move-entity-script-canvas-multiply-node.png)

1. From **Input Handler**, drag the **Held** pin to connect it to the **In** pin of the **Multiply** node\. This connection executes the **Multiply** node after the input handler receives a held event\.

1. From **Input Handler**, drag the **Value** pin to connect it to the **Value A** pin of the **Multiply** node\.

1. In the **Multiply** node, for **Value B**, enter **0\.1**\. This smaller value for the input event throttles the movement speed\.

1. In the **Node Palette**, enter **move** in the search box\.

1. Under **Entity**, **Transform**, drag **Move Entity** from the **Node Palette** to the graph\.

1. In the **Node Palette**, enter **create from values** in the search box\.

1. Under **Math**, **Vector3**, drag **Create From Values** from the **Node Palette** to the graph\. You use this node to build a vector 3 from a number\.

1. From **Multiply**, drag the **Out** pin to connect it to the **In** pin of the **Create From Values** node\.

1. From **Multiply**, drag the **Result** pin to connect it to the **Y** pin of the **Create From Values** node\. You only need a y direction, so use the default value \(`0`\) for **X** and **Z**\.

1. From **Create From Values**, drag the **Out** pin to connect it to the **In** pin of the **Move Entity** node\.

1. From **Create From Values**, drag the **Vector 3** pin to connect it to the **Direction** pin of the **Move Entity** node\.

1. Verify that your `player.scriptcanvas` graph looks like the following\.  
![\[Example Script Canvas graph to move a sphere across the y-axis.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/move-entity-script-canvas-example.png)

1. Save your graph\.

1. In Lumberyard Editor, press **Ctrl\+G** to enter game mode and test your script\.

1. To move the sphere forward, press **W**\. To move the sphere backwards, press **S**\.

1. When you are done testing your script, press **Esc**\.

## Step 6: Add Movement on the X\-Axis for Your Sphere<a name="script-canvas-tutorial-controllable-character-step-six"></a>

Now that you've converted your input event value to a direction that moves the entity on the y\-axis, you can add movement on the x\-axis\.

**To add movement on the x\-axis**

1. In the **Script Canvas** editor, drag on the graph to select the **Input Handler**, **Multiply**, **Create From Values**, and **Move Entity** nodes\. An orange outline appears around the selected nodes\.  
![\[Example Script Canvas graph to add movement on the x-axis for the sphere.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-selected-nodes-highlight.png)

1. Press **Ctrl\+C** to copy the selected nodes\.

1. Press **Ctrl\+V** to paste the copied nodes and their connections\. This allows you to clone the existing script and modify the cloned version with the appropriate settings for movement on the x\-axis\. 

1. While still selected, move the nodes so they don't overlap the copied nodes\.

1. In the duplicate **Input Handler** node, for **Event Name**, enter **move\_x**\.  
**Example**  

   Your `player.scriptcanvas` graph should look like the following\.  
![\[Copy the nodes in the Script Canvas graph to move the sphere up and down and side to side.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-selected-nodes-copied.png)

1. For the duplicate **Multiply** node, move the connection from the **Y** pin to the **X** pin on the duplicate **Create From Values** node\.
**Note**  
To disconnect a connection, drag it to an empty part of the canvas\. To delete a connection, press **Alt** and click the connection\.  
![\[Example Multiply and Create From Values nodes in Script Canvas.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-create-from-values-node.png)

1. Verify that your `player.scriptcanvas` file graph looks like the following\.  
**Example**    
![\[Example Script Canvas graph to control your sphere movement.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-x-axis-movement.png)

1. Save your graph\.

1. In Lumberyard Editor, press **Ctrl\+G** to enter game mode and test your script\.

1. Do the following:

   1. To move the sphere forward, press **W**\.

   1. To move the sphere backwards, press **S**\.

   1. To move the sphere from side to side, press **A** and **D**\.

1. When you are done testing your script, press **Esc**\.