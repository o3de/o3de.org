---
linkTitle: "Controllable Entities"
title: "Create a Controllable Entity"
description: This tutorial describes how to create a simple moving entity that you can control with the keyboard and mouse with Open 3D Engine (O3DE).
weight: 450
toc: true
---
This tutorial describes how to create a simple moving entity that you can control with the keyboard and mouse with Open 3D Engine (O3DE).
![The Shaderball Entity](/images/learning-guide/tutorials/shaderball.png)

## Gem Requirements
You will need to enable the following gems in your project in order to complete this tutorial:

Starting Point Input Gem

PhysX Gem

Script Canvas Gem

Script Canvas Physics?

## Create a level
Open the **O3DE Editor** and create a new level.  The **Entity Outliner** pane of the O3DE Editor should already contain an entity named `Default Atom Environment`.  `Default Atom Environment` has child entities that add lighting, a camera, and components to simulate a terrain.  

![The Default Atom Environment](/images/learning-guide/tutorials/default-atom-environment.png)

{{< note >}}
If `Default Atom Environment` is not visible in the **Perspective** pane, **right-click** `Default Atom Environment` in the Entity Outliner and select **Find in Viewport** from the context menu.  The Editor Camera should move `Default Atom Environment` into view.
{{< /note >}}

The entity `Shaderball` has the **Mesh** component which allows you to place 3D models in the level.  The entity `Ground` also has a Mesh component.  A *Mesh* only provide the visual geometry for the 3D model, they do not provide the ability to collide with other entities or react to physical forces.  When entities collide, the **PhysX** system does not use the mesh's visual geometry, it uses an approximate shape that is defined with the **PhsyX Collider** component.

## Add PhsyX Collider components
**Left-click** on `Ground` in the Entity Outliner.  In the Entity Inspector, **left-click** the **Add Component** button and select **PhsyX Collider**.

![The PhysX Collider Component](/images/learning-guide/tutorials/physx-collider-component.png)

Set the shape to use during collisions in the **Shape** dropdown box, select `Box`. Set the **Dimensions** of the Box to `x = 32`, `y = 32`, `z = .1` to simulate a flat terrain.  

Select `Shaderball` in the Entity Outliner and add a PhysX Collider component to it.  In the new PhsyX collider component set the **Shape** property to `Sphere` and the **Radius** of the sphere to `.7`.  If the collider does not align with the mesh, adjust the collider's location with the **Offset** property.  Set the **Z-Offset** to `.6`.  Now the collider is aligned with the mesh's visual geometry.

{{< important >}}
The PhsyX Collider component must be configured with **Trigger** set to `False` and **In Scene Queries** set to `True`.
{{< /important >}}

For static, colliding entities like the simulated terrain in this tutorial, no additional components are needed.  Entities that need to react to gravity and other physical forces require the **PhysX Rigid Body** component.

## Add the PhysX Rigid Body component
Select `Shaderball` in the Entity Outliner and add a PhysX Rigid Body component to it.  

![The PhysX Rigid Body Component](/images/learning-guide/tutorials/physx-rigid-body-component.png)

In the **Angular Axis Locking** parameter of the PhysX Rigid Body component, set **Lock X** and **Lock Y** to `True`.  Now the Shaderball will not be able to roll and scripting movement will be easier.  

{{< important >}}
The PhysX Rigid Body component must be configured with **Kinematic** set to `False` and **Gravity enabled** set to `True`.
{{< /important >}}

In the **Transform** component of `Shaderball`, set **Translate-Z** to `5` to raise `Shaderball` above the ground.  By default `Shaderball` is rotated 180 degrees on the Z-axis.  Set **Rotate-Z** to `0` degrees in the Transform component.  Test the changes made to the level by pressing **CTRL+G** or selecting **Play Game** from the **Game** menu of the Editor.  The Shaderball should fall to the ground and bounce.  To control the movement of entities with an input device such as a keyboard or mouse, you must add an **Input** component to an entity in the level.

## Add the Input component
Select `Shaderball` in the Entity Outliner and add an Input component.

![The Input Component](/images/learning-guide/tutorials/input-component.png)

Click the ![Open in Editor Icon](/img/icons/open_in.png)icon in the Input component to open a new **.inputbindings** file in the **Asset Editor**.  Click on the ![Add Icon](/img/icons/add.png)icon to create a new **Input Event Group**.  An Input Event Group maps the signals that are received from input devices to `event names` that you can use in your level's scripting.  You can add multiple **Event Generators** to a single Input Event Group.  Below, an event with the **Event Name** `jump` is generated when the player presses the **spacebar** on the keyboard or **X** on the gamepad.

![Input Bindings for Multiple Devices](/images/learning-guide/tutorials/multiple-devices-inputbindings.png)

Events have a **value** in addition to an **Event Name**. Event Generators can alter the **value** of an event with the **Event value multiplier**.

## Create an .inputbindings file
![MoveY and Turn Input Bindings](/images/learning-guide/tutorials/overloaded-event-inputbindings.png)

This .inputbindings file allows you to use the keyboard's **W** and **S** keys, and side-to-side movement of the mouse to generate two events, `MoveY` and `Turn`.  Note the use of the **Event value multiplier** in `MoveY` to reduce the number of **Event names** that must be handled by your level's scripting.  In the Asset Editor, recreate the `MoveY` and `Turn` events and save the file to your project's directory.  In the Input component click the ![Browse Directory Icon](/img/icons/tree.png)icon and select the .inputbindings file you created.  The final step in making an entity controllable is to create a script that listens for `MoveY` and `Turn` Events.

## Scripting Movement
Select `Shaderball` and add a **Script Canvas** component.  Click on the ![Open in Editor Icon](/img/icons/open_in.png)icon to open a new graph in Script Canvas.

![Completed Script Canvas Graph](/images/learning-guide/tutorials/controllable-entity-sc-graph.png)

1.  Connect two **Input Handler** nodes to the `out` slot of an **On Entity Activated** node.  

2.  Add the two **Event Names**, `MoveY` and `Turn` to the **Input Handlers**.  In the **Variable Manager** add two variables of the `number` type, named `Move Multiplier` and `Turn Multiplier`.  

3.  Set **Initial Value Source** for both variables to `From Component`.  You can use these two variables to tune the movement and turn speed of the entity from the Editor, without the need to edit the Script Canvas graph.

4.  Connect a **Multiply *** node to the `Held` slot of both **Input Handlers**.  You will multiply the value of the `MoveY` and `Turn` events by their respective multiplier variable.  **Click+Drag** the two Multiplier variables from the Variable Manager into the appropriate **Multiply *** node.  Connect event values to the **Multiply *** nodes.

5.  The **GetEntityForward** node is placed with with `MoveY`, and **GetEntityUp** is placed with `Turn`.  These two nodes return the entity's forward and up vectors.  

6.  Add two **Vector3 Multiply By Number** nodes and connect the forward and up vectors and the `Result` slots of the two **Multiply *** nodes.  When the **S** key is pressed, the negative **Event Value Multiplier** will produce a vector that is opposite to the forward vector.  

7.  Add an **Apply Linear Impulse** node to `MoveY` and connect the output of **Multiply By Number** to the `Impulse` input slot.  

8.  Add an **Apply Angular Impulse** node to `Turn` and connect the `Impulse` input slot.

Save the Script Canvas graph and close Script Canvas.  In the Script Canvas component, **Script Canvas Asset** should display your graph's name.  Save the level and Press **Ctrl+G** to run the level. You should be able to control the Shaderball's movement with the keyboard and mouse.  Exit the running level by pressing **Escape**.  

![Move and Turn multipliers exposed in Script Canvas component](/images/learning-guide/tutorials/exposed-variables.png)

Change the Move and Turn Multipliers in the Script Canvas component to adjust the entity's movement and turn rate.
