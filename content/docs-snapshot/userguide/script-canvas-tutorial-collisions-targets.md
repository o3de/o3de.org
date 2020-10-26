# Script Canvas Tutorial: Shooting a Target by Spawning Entities and Detecting Collisions<a name="script-canvas-tutorial-collisions-targets"></a>

This tutorial builds on what you learned in the previous two tutorials\. In the following tutorial, you create a controllable sphere that shoots projectiles at a target\.

**Example**  

![\[Example Script Canvas graph with collision targets.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/target.gif)

This involves several tasks:
+ Spawn entities
+ Add scripts that run on the spawned entities
+ Set up collision
+ Add tag filtering

## Prerequisites<a name="script-canvas-tutorial-collisions-target-prerequisites"></a>
+ Complete the [Script Canvas Tutorial: Creating a Controllable Entity](script-canvas-tutorial-controllable-character.md) and [Script Canvas Tutorial: Opening and Closing a Door with Trigger Areas and Variables](script-canvas-tutorial-trigger-areas.md)\.

**Topics**
+ [Prerequisites](#script-canvas-tutorial-collisions-target-prerequisites)
+ [Step 1: Set Up a Projectile Entity](#script-canvas-tutorial-collisions-targets-step-one)
+ [Step 2: Create a Script to Propel the Projectile Forward](#script-canvas-tutorial-collisions-targets-step-two)
+ [Step 3: Save the Projectile Entity as a Slice](#script-canvas-tutorial-collisions-targets-step-three)
+ [Step 4: Set Up the Player Entity to Spawn the Slice](#script-canvas-tutorial-collisions-targets-step-four)
+ [Step 5: Set Up the Input Binding for the Projectile](#script-canvas-tutorial-collisions-targets-step-five)
+ [Step 6: Add Logic to the Player Script to Spawn the Projectile](#script-canvas-tutorial-collisions-targets-step-six)
+ [Step 7: Create a Target Entity](#script-canvas-tutorial-collisions-targets-step-seven)
+ [Step 8: Add Logic to the Projectile to Destroy Target Entities](#script-canvas-tutorial-collisions-targets-step-eight)

## Step 1: Set Up a Projectile Entity<a name="script-canvas-tutorial-collisions-targets-step-one"></a>

To create a projectile entity, create an entity and then add the **[Mesh](component-static-mesh.md)**, **[Rigid Body](https://docs.aws.amazon.com/lumberyard/latest/userguide/component-rigid-body.html)** component, **[Mesh Collider](https://docs.aws.amazon.com/lumberyard/latest/userguide/component-physics-mesh-collider.html)**, and **[Script Canvas](component-script-canvas.md)** components\.

**To create a projectile entity**

1. In Lumberyard Editor, right\-click in the **Perspective** viewport near your sphere and choose **Create entity**\.

1. In the **Entity Inspector**, do the following:

   1. For **Name**, enter **Projectile**\.

   1. In the **Transform** component, for **Scale**, set **X** to **0\.25**, **Y** to **0\.25**, and **Z** to **0\.25**\.  
![\[Transform properties for the Projectile entity.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-projectile-transform-properties.png)

   1. Click **Add Component** and then choose the **Mesh** component\.

   1. In the **Mesh** component, for **Mesh asset**, click the browse \(**\.\.\.**\) button, select the `\SamplesProject\Objects\default\primitive_sphere.cgf` file, and then click **OK**\.  
![\[Select the mesh asset for the projectile entity.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/pick-static-mesh-window-primitive-sphere.png)

1. In the **Entity Inspector**, click **Add Component** and then choose the following components:
   +  **Rigid Body Physics** 
   + **Mesh Collider**
   + **Script Canvas**

1. In Lumberyard Editor, choose **Tools**, **Script Canvas**\.

1. In the **Script Canvas** editor, choose **File**, **New Script**\.

1. After the graph loads, choose **File**, **Save As**\.

1. In the **Save As** dialog box, for **File name**, enter **projectile** and then click **Save**\.

1. In the **Script Canvas** component, for **Script Canvas Asset**, click the browse \(**\.\.\.**\) button, select the `projectile.scriptcanvas` file, and then click **OK**\.  
![\[Select the Script Canvas graph file for the entity.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-pick-script-canvas-window.png)

1. Verify that the **Projectile** entity looks like the following\.  
**Example**    
![\[The components and properties for the Projectile entity.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-entity-projectile.png)

## Step 2: Create a Script to Propel the Projectile Forward<a name="script-canvas-tutorial-collisions-targets-step-two"></a>

Now that you've set up a projectile, you can create a script to propel the projectile forward when it spawns\.

**To create a projectile script**

1. In the **Script Canvas** editor, open the `projectile.scriptcanvas` file, if it's not still open from [Step 1: Set Up a Projectile Entity](#script-canvas-tutorial-collisions-targets-step-one)\.

1. In the **Node Palette**, enter **start** in the search box\.

1. Under **Utilities**, drag **On Graph Start** from the **Node Palette** to the graph\. This event node executes only for the first tick after the entity has initialized\.

1. In the **Node Palette**, enter **Get Forward**\.

1.  From **Entity**, **Transform**, drag the **Get Forward** node to the graph\. 

1. From **On Graph Start**, drag the **Out** pin to connect it to the **In** pin of the **Get Forward** node\.  
![\[Get Forward node in Script Canvas.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-on-graph-start-get-forward-connection.png)

1. In the **Get Forward** node, for **Scale**, enter **200**\.

1. In the **Node Palette**, enter **Set Velocity** and drag the node to the graph\.

1. From **Get Forward**, drag the **Out** pin to connect it to the **In** pin of the **Set Velocity** node\.

1. From** Get Forward**, drag the **Forward** pin to the **Velocity** pin of the **Set Velocity** node\.  
![\[Set Velocity node in Script Canvas.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-get-forward-set-velocity-connection.png)

1. To set a lifetime for the projectile, do the following:

   1. In the **Node Palette**, enter **delay** in the search box\.  
![\[Delay node in Script Canvas.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-delay-node.png)

   1. Under **Timing**, drag **Delay** from the **Node Palette** to the graph\.

   1. From **On Graph Start**, drag the **Out** pin to connect it to the **In** pin of the **Delay** node\.

   1. In the **Delay** node, for **Time**, enter **1\.0**\.  
![\[Connect the On Graph Start node to the Delay node.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-delay-node-properties-connections.png)

1. To destroy the projectile after the set time, do the following:

   1. In the **Node Palette**, enter **destroy** in the search box\.

   1. Under **Entity**, **Game Entity**, drag **Destroy Game Entity and Descendants** from the **Node Palette** to the graph\.  
![\[Use the Destroy Game Entity and Descendents node to destroy entities that are generated.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-game-entity-destroy-game-entity-descendants-node.png)

   1. From **Delay**, drag the **Out** pin to connect it to the **In** pin of the **Destroy Game Entity and Descendants** node\.  
![\[Connect the Delay node to the Destroy Game Entity and Descendents node.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-destroy-gem-entity-descendents-node-properties-connections.png)

   1. Verify that your `projectile.scriptcanvas` graph looks like the following\.  
**Example**    
![\[Example script for the projectile entity in Script Canvas.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-projectile-script-example.png)

1. In the **Script Canvas** editor, choose **File**, **Save**\. You can also press **Ctrl\+S**\.

## Step 3: Save the Projectile Entity as a Slice<a name="script-canvas-tutorial-collisions-targets-step-three"></a>

Now that you've created a projectile script, you can save the projectile entity as a slice\.

**To save the projectile entity as a slice**

1. In Lumberyard Editor, in the **Entity Outliner**, right\-click **Projectile** and choose **Create slice**\.

1. In the **Save As** dialog box, for **File name**, enter **projectile** and then click **Save**\.

1. To enable the projectile to spawn, do the following:

   1. In the **Asset Browser**, navigate to the `projectile.slice` file that you just created\.  
![\[Select the projectile.slice file in the Asset Browser.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-asset-browser-projectile-slice-file.png)

   1. Right\-click `projectile.slice` and choose **Set Dynamic Slice**\. Scripts that run on a dynamic slice will properly remap source entity assignments to the entity that the graph runs on\.  
![\[Set the projectile.slice file as a dynamic slice in the Asset Browser.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-projectile-dynamic-slice.png)

1. In the **Entity Outliner**, right\-click **Projectile** and then click **Delete**\. Because you will spawn the projectile entity dynamically from your player script, you no longer need the entity in your scene\.

## Step 4: Set Up the Player Entity to Spawn the Slice<a name="script-canvas-tutorial-collisions-targets-step-four"></a>

Now that you've created a slice, you can set up your **Player** entity to spawn the slice\.

**To set up the player entity to spawn the slice**

1. In Lumberyard Editor, in the **Entity Outliner**, right\-click the **Player** entity and choose **Create child entity**\.

1. Enter a name for the child entity such as *spawner*\.

1. In the **Transform** component, for the **Translate Y** property, enter **1\.0**\. This sets the spawn point 1 meter in front of the parent entity\.

1. Select the child entity and in the **Entity Inspector**, click **Add Component**, and then choose the **[Spawner](component-spawner.md)** component\.

1. In the **Spawner** component, for **Dynamic slice**, click the browse \(**\.\.\.**\) icon, select the `projectile.slice` file, and then click **OK**\.  
![\[Select the projectile.slice for the Spawner component.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-pick-dynamic-slice-window.png)

1. Verify that the **spawner** entity looks like the following\.  
![\[The components and properties for the spawner entity.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-entity-spawner.png)

## Step 5: Set Up the Input Binding for the Projectile<a name="script-canvas-tutorial-collisions-targets-step-five"></a>

Now that you've added the **Spawner** component, you can set up the input binding to shoot the projectile when you press the **Spacebar**\.

**To set up the projectile input binding**

1. In Lumberyard Editor, in the **Entity Outliner**, select the **Player** entity\.

1. In the **Entity Inspector**, under **Input**, click the **Input Bindings Editor** icon ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/input-bindings-editor-icon.png)\.

1. In the **Edit Asset** window, do the following:

   1. For **Input Event Groups**, click **\+** to add a new input event group\.

   1. Expand the input event group\. For **Event Name**, enter **shoot**\.

   1. For **Event Generators**, click **\+** to add an event generator\.

   1. In the **Class to create** dialog box, click **OK** to add an input class\.

   1. Expand **shoot**, **Event Generators**, **gamepad\_button\_a**\. For **Input Device Type**, choose **keyboard**\.

   1. For **Input Name**, choose **keyboard\_key\_edit\_space**\.

   1. Verify that your settings appear as shown in the following\.  
![\[Example inputbindings for the entity.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/player-inputbindings-editor-shoot.png)

   1. In the **Edit Asset** window, choose **File**, **Save**\.

## Step 6: Add Logic to the Player Script to Spawn the Projectile<a name="script-canvas-tutorial-collisions-targets-step-six"></a>

Now that you've set up the input binding, you can add logic to the **Player** script to spawn the projectile when you press the **Spacebar**\.

**To add logic to the player script**

1. In Lumberyard Editor, choose **Tools**, **Script Canvas**\.

1. In the **Script Canvas** editor, choose **File**, **Open**\. Select `player.scriptcanvas` and then click **Open**\.

1. Do the following to enable the event node to listen for the input event:

   1. In the **Node Palette**, enter **input** in the search box\.

   1. Under **Gameplay**, **Input**, drag **Input Handler** from the **Node Palette** to the graph\. **Input Handler** is an event node\. When an event occurs, the event node sends a message to the script\.

   1. For **Event Name**, enter **shoot**\.  
![\[Input Handler node in Script Canvas.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-input-handler-node.png)

1. Do the following to control the firing rate for the shoot event:

   1. In the **Node Palette**, enter **once** in the search box\.

   1. Under **Logic**, drag **Once** from the **Node Palette** to the graph\.  
![\[Once node in Script Canvas.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-once-node.png)

   1. From **Input Handler**, drag the **Held** pin to connect it to the **In** pin of the **Once** node\.  
![\[Once node in Script Canvas.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-input-handler-once-connection.png)

   1. In the **Node Palette**, enter **spawn** in the search box\.

   1. Under **Gameplay**, **Spawner**, drag **Spawn** from the **Node Palette** to the graph\.

   1. From **Once**, drag the **Out** pin to connect it to the **In** pin of the **Spawn** node\.

   1. In the **Spawn** node, for **Source**, enter the name of the child entity with the **Spawner** component attached from [Step 4](#script-canvas-tutorial-collisions-targets-step-four)\.  
![\[Connect the Once node to the Spawn node in Script Canvas.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-once-spawn-connection.png)

   1. In the **Node Palette**, enter **delay** in the search box\.

   1. Under **Timing**, drag **Delay** from the **Node Palette** to the graph\.  
![\[Delay node in Script Canvas.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-delay-node.png)

   1. From **Spawn**, drag the **Out** pin to connect it to the **In** pin of the **Delay** node\.

   1. In the **Delay** node, for **Time**, enter **0\.25** \(seconds\)\.

   1. From **Delay**, drag the **Out** pin to connect it to the **Reset** pin of the **Once** node\.
**Note**  
Node execution always flows from the left side to the right side of a node\. For more information, see [Inputs, Outputs, and Connection Types](script-canvas-nodes-understanding.md#script-canvas-pins-and-connections)\.

1. Verify that your `player.scriptcanvas` graph looks like the following\.  
**Example**    
![\[Example script for the spawned entities.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-spawn-delay-connection-properties.png)

1. Choose **File**, **Save**\. You can also press **Ctrl\+S**\.

1. In Lumberyard Editor, press **Ctrl\+G** to enter game mode and test your script\.

1. Do the following:
   + To move the sphere forward, press **W**\.
   + To move the sphere backwards, press **S**\.
   + To move the sphere from side to side, press **A** and **D**\.
   + To spawn a projectile that propels forward, press the **Spacebar**\.

     If you hold the **Spacebar**, the spawn fires once and the **Delay** node resets the **Once** node every 0\.25 seconds\.

1. When you are done testing your script, press **Esc**\.

## Step 7: Create a Target Entity<a name="script-canvas-tutorial-collisions-targets-step-seven"></a>

Now that the **Player** entity shoots projectiles, you can add a **Target** entity for the **Player** entity to destroy\.

**To create a target entity**

1. In Lumberyard Editor, create an entity: Right\-click in the **Perspective** viewport near your controllable sphere and choose **Create entity**\.

1. In the **Entity Inspector**, for **Name**, enter **Target**\.  
![\[Create an entity named Target.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-entity-inspector-name-target.png)

1. Click **Add Component** and then choose the **Mesh** component\.

1. In the **Mesh** component, for **Mesh asset**, click the browse \(**\.\.\.**\) button, select the `\SamplesProject\Objects\default`\\`primitive_cylinder.cgf` file, and then click **OK**\.  
![\[Assign a mesh asset to the Target entity.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-pick-static-mesh-primitive-cylinder.png)

1. Click **Add Component** and choose the following components:
   + **Static Physics**
   + **Mesh Collider**
   + **Tag**

1. In the **Tag** component, click **\+** to add a tag and for **\[0\]**, enter **Target**\.  
![\[Tag component attached to the Target entity.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-tag-component-properties.png)

1. Verify that your **Target** entity appears like the following\.  
**Example**    
![\[Example components attached to the Target entity.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-target-entity-component-properties.png)

## Step 8: Add Logic to the Projectile to Destroy Target Entities<a name="script-canvas-tutorial-collisions-targets-step-eight"></a>

Now that you've set up the **Target** entity, you can add logic to the projectile to destroy entities that have the **Target** tag\.

**To add logic to destroy target entities**

1. In the **Script Canvas** editor, open the `projectile.scriptcanvas` file\.

1. Do the following to add collision nodes:

   1. In the **Node Palette**, enter **collision** in the search box\.

   1. Under **Physics**, **Physics Component**, drag **On Collision** from the **Node Palette** to the graph\. This node has a special data enter called collision\.  
![\[On Collision node in Script Canvas.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-physics-on-collision-component.png)

1. Do the following to add a **Set hit** node:

   1. In the bottom\-right pane, in the **Variable Manager**, click **Create Variable**\. You can use variables to store and modify persistent values in your graph\. 

      For more information, see [Managing Script Canvas Variables](script-canvas-managing-variables.md)\.

   1. Select **Collision**, double\-click **Variable 1** and then rename the variable to **hit**\.

   1. Right\-click the **hit** variable and choose **Set hit**\.

1. Select the **Out** pin for **On Collision** and drag to connect it to the **In** pin for the **Set hit** node\.

1. From **On Collision**, drag the **Collision** pin to connect it to the **Collision** pin of the **Set hit** node\.  
![\[Connect the On Collision node to the Set hit variable node in Script Canvas.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-set-hit-collision-connections.png)

1. Do the following to add tags:

   1. In the **Node Palette**, enter **CRC32** in the search box\.

   1. Under **Math**, **CRC32**, drag **Create CRC32** from the **Node Palette** to the graph\. The tag system uses CRC32s to store tag names\.

   1. From **Set hit**, drag the **Out** pin to connect it to the **In** pin of the **Create CRC32** node\.

   1. In the **Create CRC32** node, for **String**, enter **Target**\.  
![\[Connect the Set hit node to the Create CRC32 node in Script Canvas.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-crc32-set-hit-connection.png)

   1. In the **Node Palette**, enter **tag** in the search box\.

   1. Under **Gameplay**, **Tag**, drag **Has Tag** from the **Node Palette** to the graph\.  
![\[Has Tag node in Script Canvas.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-has-tag-node.png)

   1. From **Create CRC32**, drag the **CRC32** pin to connect it to the **Tag** pin of the **Has Tag** node\.

1. Do the following to add a **Get hit** node:

   1. In the **Variable Manager**, right\-click the **hit** variable and choose **Get hit**\.

   1. From **Get hit**, drag the **entity: EntityID** pin to connect it to the **Source** pin of the **Has Tag** node\. This enables the **Has Tag** node to check the entity that the projectile collided with rather than itself\.

   1. From **Create CRC32**, drag the **Out** pin to connect it to the **In** pin of the **Get hit** node\.

   1. From **Get hit**, drag the **Out** pin to the **In** pin of the **Has Tag** node\.  
![\[Connect the Get hit variable node to the Has Tag node in Script Canvas.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-get-hit-has-tag-connection.png)

1. Do the following to add the **If** node:

   1. In the **Node Palette**, enter **if** in the search box\.

   1. Under **Logic**, drag **If** from the **Node Palette** to the graph\.

   1.  From **Has Tag**, drag the **Out** pin to connect it to the **In** pin of the **If** node\.

   1. From **Has Tag**, drag the **Result** pin to connect it to the **Condition** pin for the **If** node\.  
![\[Connect the Has Tag node in to the If node in Script Canvas.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-has-tag-if-nodes-connection.png)

1. Do the following to add a destroy node:

   1. In the **Node Palette**, enter **destroy** in the search box\.

   1. Under **Entity**, **Game Entity**, drag **Destroy Game Entity and Descendants** from the **Node Palette** to the graph\.  
![\[Destroy Game Entity and Descendants node in Script Canvas.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-destroy-game-entity-descendants-node.png)

   1. From **If**, drag the **True** pin to connect it to the **In** pin of the **Destroy Game Entity and Descendants** node\.

   1. From **Get hit**, drag the **entity: EntityID** pin to connect it to the **EntityID** pin of the **Destroy Game Entity and Descendants** node\.

   1. Verify that your `projectile.scriptcanvas` graph looks like the following\.  
**Example**    
![\[Example Script Canvas graph for the projectile entity.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-projectile-script-example-2.png)

1. In the **Script Canvas** editor, choose **File**, **Save**\. You can also press **Ctrl\+S**\.

1. In Lumberyard Editor, press **Ctrl\+G** to enter game mode and test your script\.

1. To aim and shoot at the target, do the following:
   + To move the sphere forward, press **W**\.
   + To move the sphere backward, press **S**\.
   + To move the sphere from side to side, press **A** and **D**\.
   + To spawn a projectile that propels forward, press the **Spacebar**\.

1. When you are done testing your script, press **Esc**\.