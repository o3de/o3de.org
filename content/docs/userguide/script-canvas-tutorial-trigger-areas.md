# Script Canvas Tutorial: Opening and Closing a Door with Trigger Areas and Variables<a name="script-canvas-tutorial-trigger-areas"></a>

In the following tutorial, you create a door that opens and closes when your controllable sphere enters and exits a trigger area\.

**Example**  

![\[Example Script Canvas graph for the creating a trigger area.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/door.gif)

This involves several tasks:
+ Create a trigger area
+ Add event nodes
+ Add variables

## Prerequisites<a name="script-canvas-tutorial-trigger-area-prerequisites"></a>
+ Complete the [Script Canvas Tutorial: Creating a Controllable Entity](script-canvas-tutorial-controllable-character.md)\.

**Topics**
+ [Prerequisites](#script-canvas-tutorial-trigger-area-prerequisites)
+ [Step 1: Create a Door and Trigger Area](#script-canvas-tutorial-trigger-areas-step-one)
+ [Step 2: Create a Script to Open and Close the Door](#script-canvas-tutorial-trigger-areas-step-two)

## Step 1: Create a Door and Trigger Area<a name="script-canvas-tutorial-trigger-areas-step-one"></a>

To create a door and trigger area, create an entity with child entities and then add components to the child entities\.

**To create a door and trigger area**

1. In Lumberyard Editor, right\-click the **Perspective** viewport near your controllable sphere and choose **Create entity**\.  
![\[Create an entity in the Perspective viewport.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/perspective-viewport-choose-create-entity.png)

1. In the **Entity Inspector**, for **Name**, enter **Door Group**\.

1. Do the following to create a door:

   1. In the **Entity Outliner**, right\-click **Door Group** and choose **Create child entity**\. This child entity is your door\.

   1. In the **Entity Inspector**, for **Name**, enter **Door Mesh**\.  
![\[Create a child entity named Door Mesh.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/entity-inspector-name-field-door-mesh.png)

   1. For the **Door Mesh** entity, click **Add Component** and then choose the **[Mesh](component-static-mesh.md)** component\.

   1. In the **Mesh** component, for **Mesh asset**, click the browse \(…\) icon and select the `SamplesProject\Objects\Primitives\box_1x1.cgf` file\.  
![\[Select the mesh file to create a Mesh component for your entity.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/asset-browser-game-objects-primitives-directory.png)

   1. Click **Add Component** and then choose the **[Static Physics](https://docs.aws.amazon.com/lumberyard/latest/userguide/component-static-physics.html)** component\.

   1. Click **Add Component** and then choose the **[Mesh Collider](https://docs.aws.amazon.com/lumberyard/latest/userguide/component-physics-mesh-collider.html)** component\. This component defines the collision shape for the **Door Mesh** entity\.

   1. In the **[Transform](component-transform.md)** component, for **Scale**, set **X** to **2\.5**, **Y** to **0\.5**, and **Z** to **4\.0**\. 

   1. Verify that your **Door Mesh** entity looks like the following\.  
**Example**    
![\[See the components and settings for the Door Mesh entity.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/entity-inspector-transform-scale-settings.png)

1. Do the following to create a trigger area:

   1. In the **Entity Outliner**, right\-click **Door Group** and choose **Create child entity**\. This child entity is your trigger area\.

   1. In the **Entity Inspector**, for **Name**, enter **Door Trigger**\.

   1. Click **Add Component** and then choose the **[Trigger Area](component-triggerarea.md)** component\.

   1. With the [**Move** tool](lumberyard-editor-toolbars.md#lumberyard-editor-toolbars-editmode), adjust the **Door Trigger** entity so that its Z position fits the **Door Mesh** entity\.

   1. In the **Trigger Area** component, click **Add Required Component** and choose **Box Shape**\.

   1. For the **Box Shape** component, for **Dimensions**, set **X** to **3\.0**, **Y** to **9\.0**, and **Z** to **6\.0**\.

   1. Click **Add Component** and then choose the **[Script Canvas](component-script-canvas.md)** component\.

   1. In Lumberyard Editor, choose **Tools**, **Script Canvas**\.

   1. In the **Script Canvas** editor, choose **File**, **New Script**\.

   1. After the new canvas loads, choose **File**, **Save As**\.

   1. For **File name**, enter **door** and then click **Save**\.

   1. In the **Script Canvas** component, click the browse \(**\.\.\.**\) icon, select the `door.scriptcanvas` file, and then click **OK**\.

1. Verify that your **Door Trigger** entity looks like the following\.  
**Example**    
![\[See the components and properties for the Door Trigger entity.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/entity-inspector-box-shape-dimensions-settings.png)

## Step 2: Create a Script to Open and Close the Door<a name="script-canvas-tutorial-trigger-areas-step-two"></a>

Now that you've set up your door and trigger area, you can create a script that opens and closes the door when another entity enters or leaves the trigger area\.

**To create a script that opens and closes the door**

1. In the **Script Canvas** editor, open the `door.scriptcanvas` file\.

1. In the **Node Palette**, enter **trigger** in the search box and under **Gameplay**, **Trigger Area**, drag **On Area Entered** to the canvas\. 
**Note**  
With this event node you can easily use the Lumberyard EBus messaging system\. For more information, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

1. In the **Trigger Area** node, click **Add/Remove Events** and then select the **On Area Exited** check box\. This exposes the entered and exited events from the **Trigger Area** EBus\.  
![\[Add the Trigger Area node in Script Canvas editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/trigger-area-node-add-remove-events.png)

1. In the bottom\-right pane, in the **Variable Manager**, click **Create Variable**\. 
**Note**  
You can store and modify persistent values in your graph with variable nodes\. For more information, see [Managing Script Canvas Variables](script-canvas-managing-variables.md)\.

1. Select **Vector3**, double\-click **Variable 1** and then rename the variable to **opened\_position**\.

1. In the **Node Inspector**, specify **2** for the **Z** value\. A positive value for the z\-axis slides the door up\. Because the door entity is a child of **Door Group**, you can specify local relative positions to control the open and closed positions of the door\.

1. Create another **Vector3** variable and name it **closed\_position**\. Keep the default value of `0`, `0`, `0`\.

1. Create another **Vector3** variable and name it **current\_position**\. Keep the default value of `0`, `0`, `0`\. This variable sets the door's current position\.

1. Create another **Vector3** variable and name it **destination\_position**\. Keep the default value of `0`, `0`, `0`\. This variable sets the door's destination position when the entity enters and exits the trigger area\.  
**Example**  

   You should have four **Vector3** variable nodes such as the following\.  
![\[Vector3 variables for the Variable Manager.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-trigger-areas-variables-manager.png)

1. In the **Variable Manager**, do the following:

   1. Select and drag the **open\_position** node to the canvas and then click **Get opened\_position**\.

   1. Select and drag the **closed\_position** node to the canvas and then click **Get closed\_position**\.

   1. Select and drag two **destination\_position** nodes to the canvas and then click **Set destination\_position**\.

1. In the canvas, make the following connections:

   1. From **On Area Entered**, drag the **Out** pin to connect it to the **In** pin of a **Get opened\_position** node\.

   1. From **On Area Exited**, drag the **Out** pin to connect it to the **In** pin of the **Get closed\_position** node\.

   1. From **Get opened\_position**, drag the **Out** pin to connect it to the **In** pin of the **Set destination\_position** node\.

   1. From **Get opened\_position**, drag the **Vector3** pin to connect it to the **Vector3** pin of the **Set destination\_position** node\.

   1. From **Get closed\_position**, drag the **Out** pin to connect it to the **In** pin of the other **Set destination\_position** node\.

   1. From **Get closed\_position**, drag the **Vector3** pin to connect it to the **Vector3** pin of the other **Set destination\_position** node\.

   1. Verify that your `door.scriptcanvas` graph looks like the following\.  
**Example**    
![\[Connect the Trigger Area node to the variable nodes.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-tutorial-trigger-area-connections.png)

1. Do the following to get the **Door Mesh** entity's position and interpolate to the destination:

   1. In the **Node Palette**, enter **get local** in the search box\.

   1. Under **Entity**, **Transform**, drag **Get Local Translation** to the canvas\. You can use this node to get the current position of the **Door Mesh** entity and interpolate to the destination\. A local translation applies to the translation of the entity relative to its parent\.

   1. In the **Get Local Translation** node, pause on the **Source** text box and click the target button\. When selected, the target button has an orange outline\.  
![\[Get Local Translation node.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/get-local-translation-node-target-button.png)

   1. In the **Entity Outliner**, select **Door Mesh** to assign the **Door Mesh** entity to the **Source** property in the **Get Local Translation** node\.  
![\[Add the Door Mesh entity as the source for the Get Local Translation node.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/get-local-translation-node-door-mesh.png)
**Note**  
To reset an entity reference, right\-click twice on the **Source** text box and choose **Set to Self**\.

   1. In the **Script Canvas** editor, from both **Set destination\_position** nodes, drag the **Out** pins to connect it to the **In** pin for **Get Local Translation**\.  
![\[Connect the Set destination_position variable nodes to the Get Local Translation node.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/get-local-translation-node-destination-position-connections.png)
**Note**  
When multiple connections enter a single logic pin, the node is executed each time either execution is triggered\. The node is executed more than once in the same game tick if multiple executions are triggered simultaneously\.

1. Do the following to execute nodes for a specified amount of time, in seconds:

   1. In the **Variable Manager**, drag **current\_position** to the canvas and click **Set current\_position**\.

   1. From **Get Local Translation**, drag the **Out** pin to connect it to the **In** pin of the **Set current\_position** node\.

   1. From **Get Local Translation**, drag the **Translation** pin to connect it to the **Vector3** pin of the **Set current\_position** node\.

   1. In the **Node Palette**, enter **duration** in the search box and under **Timing**, drag **Duration** to the canvas\.

   1. From **Set current\_position**, drag the **Out** pin to connect it to the **Start** pin of the **Duration** node\. Triggering the **Duration** node resets the time\.

   1. In the **Duration** node, for **Duration**, enter **1\.0** \(seconds\)\.  
**Example**    
![\[Connect the Get Local Translation node to the Set current_position node to the Duration node.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/get-local-translation-connection-to-duration-node-2.png)

1. Do the following to set up interpolation between the current position and the destination:

   1. In the **Variable Manager**, select and drag **current\_position** to the canvas and then click **Get current\_position**\.

   1. In the **Variable Manager**, select and drag **destination\_position** to the canvas and then click **Get destination\_position**\.

   1. In the **Node Palette**, enter **lerp** in the search box and under **Math**, **Vector3**, drag **Lerp** from the **Node Palette** to the canvas\. This node blends two values based on the **Percentage** property\.

   1. From **Duration**, drag the **Out** pin to connect it to the **In** pin of the **Get current\_position** node\.

   1. From **Duration**, drag the **Elapsed** pin to connect it to the **Percentage** pin of the **Lerp** node\.

   1. From **Get current\_position**, drag the **Out** pin to connect it to the **In** pin of the **Get destination\_position** node\.

   1. From **Get current\_position**, drag the **Vector3** pin to connect it to the **Start** pin of the **Lerp** node\.

   1. From **Get destination\_position**, drag the **Out** pin to connect it to the **In** pin of the **Lerp** node\.

   1. From **Get destination\_position**, drag the **Vector3** pin to connect it to the **End** pin of the **Lerp** node\.  
**Example**    
![\[Use the Lerp node to blend together the values from the Percentage pin.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-current-position-destination-interpolation-2.png)

1. Do the following to set the position of the door when the **Duration** node blends between the current and destination positions:

   1. In the **Node Palette**, enter **set local translation** in the search box and under **Entity**, **Transform**, drag **Set Local Translation** to the canvas\.

   1. From **Lerp**, drag the **Out** pin to connect it to the **In** pin of the **Set Local Translation** node\.

   1. From **Lerp**, drag the **Vector3** pin to connect it to the **Translation** pin of the **Set Local Translation** node\.

   1. In the **Set Local Translation** node, pause on the **Source** text box and click the target button\.

   1. In the **Entity Outliner**, select **Door Mesh** to assign the **Door Mesh** entity to the **Source** property in the **Set Local Translation** node\.

   1. Verify that your `door.scriptcanvas` graph looks like the following\.  
**Example**    
![\[Finished Script Canvas graph for creating a trigger area for an entity.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-door-translation-2.png)

1. Save your graph\.

1. In Lumberyard Editor, press **Ctrl\+G** to enter game mode and test your script\.

1. To move the sphere forward into the door trigger area and slide open the door, press the **W**, **A**, **D** keys\.

1. To move the sphere backwards out of the trigger area and slide the door closed, press **S**\.

1. When you are done testing your script, press **Esc**\.