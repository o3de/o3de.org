---
linkTitle: Grid-based Movement
title: Grid-based Movement
description: Learn how to implement grid-based movement from input device events in Open 3D Engine (O3DE).
weight: 100
---

## Overview



| O3DE Experience | Time to Complete | Feature Focus | Last Updated |
| - | - | - | - |
| Beginner | 20 Minutes | Input Bindings assets, **Input** component, **Script Canvas** component | November 14, 2022 |

## What you will learn

In this tutorial you will learn how to:
- Create an Input Bindings asset in **Asset Editor** that links input device signals to input events.
- Enable those input events in your level by adding an Input component and referencing an Input Bindings asset.
- Create a script with Script Canvas that listens for input events and moves an entity along a grid when they occur.
- Add smooth entity motion over time with linear interpolation.
- Add input event blocking while the entity is in motion.
- Add diagonal motion to the entity.

## Prerequisites



## Steps

### Prepare the scene

In this tutorial, you will modify several child entities of the `Atom Default Environment`, namely, the `Shader ball`, `Grid`, and `Camera`.  The grid will represent a grid or tile-based terrain that the Shader Ball moves on.  You will attach the camera to the Shader ball so that the camera follows its movements on the grid.

1. In a new level, select the `Grid` entity in **Entity Outliner**.  In **Entity Inspector**, set the [Grid](/docs/user-guide/components/reference/atom/grid/) component's **Primary Grid Spacing** to `5 meters`.  Set the **Secondary Grid Spacing** to `1 meter` and **Secondary Color** to white, `255, 255, 255` so that the grid spacing is more visible.

1. Select the `Shader Ball` in Entity Outliner.  Currently, it is located at the intersection of four grid spaces and it is too large to fit within a single space.  In Entity Inspector, set [Transform](/docs/user-guide/components/reference/transform/) component's **Uniform Scale** to `0.5`.  Set the **Translate** value to `X: 0.5, Y:0.5, Z:0.0`, the Shader Ball should now be located within a single grid space.  Remove all rotations from it by setting **Rotate** to `X: 0.0, Y:0.0, Z:0.0`.

1. Select the `Camera` in Entity Outliner, **left-click** and **drag** it over the `Shader Ball` entity and release it to attach the camera as a child entity of the Shader ball.  In Entity Inspector, set the Transform component's **Translate** value to `X: 0.0, Y:-4.0, Z:5.0` and the **Rotate** value to `X: -45.0, Y:0.0, Z:0.0`.  As a child entity of the Shader Ball, the camera's translation and rotation are relative to its parent, so the camera will be positioned behind the Shader Ball and looking down on it. The [Fly Camera Input](/docs/user-guide/components/reference/gameplay/fly-camera-input/) component that is currently attached to this entity will interfere with the input events you create later.  **Right-click** on the Fly Camera Input component in Entity Inspector and choose `Delete component`.

The following image shows the scene layout after completing these steps.

![The grid, Shader Ball, and camera in the 3D Viewport after setting up the scene](/images/learning-guide/tutorials/input-and-movement/grid-based-movement/prepare-scene.png)

### Create an Input Bindings asset

Next you will create an Input Bindings asset that links input device event generators to input events.  In this tutorial, you will use the keyboard's `W`, `A`, `S`, and `D` keys to generate two input events that will move the Shader Ball on the X and Y-axis of of the grid.  

1. Open Asset Editor from the O3DE Editor `Tools` menu. **Left-click** the {{< icon "add.svg" >}} next to **Input Event Groups** twice to add two new input events.

1. In the new events' **Event Name** property, name the first event `MoveY` and the second `MoveX`.  You will need to remember these event names later when you begin to script the Shader Ball's movement.

1. **Left-click** the {{< icon "add.svg" >}} next to **Event Generators** to add a generator to an event.  Add two event generators to each event.  In the **Class to create** dialog box that appears you will need to choose the second option, `InputEventMap`.

1. Set the four generator's **Input Device Type** to `keyboard`.

1. For the `MoveY` event, set the **Input Name** for the event generators to `keyboard_key_alphanumeric_W` and `keyboard_key_alphanumeric_S`.  For the `MoveX` event, set the **Input Name** for the event generators to `keyboard_key_alphanumeric_D` and `keyboard_key_alphanumeric_A`.

1. You can leave the **Event value multiplier** of the `W` and `D` keys at their default value of `1.0`.  This corresponds to a movement in the positive direction on the X and Y-axis.  Change the **Event value multiplier** of the `S` and `A` keys to `-1.0` as this will correspond to a movement in the negative direction of the X and Y-axis.  It can be advantageous to use **Event value multipliers** to reduce the number of events that you use, it can simplify the scripting that handling the events requires.

1. Save the Input Bindings asset in your project's directory.

The following image shows the completed Input Bindings asset in the Asset Editor.

![The completed Input Bindings asset in Asset Editor](/images/learning-guide/tutorials/input-and-movement/grid-based-movement/input-bindings.png)

### Add the Input component

Next, you will add an Input component and reference the Input Bindings asset that you created.

1. Select the `Shader Ball` in Entity Outliner.  In Entity Inspector add an Input component to the Shader ball.

1. In the Input component, **left-click** the {{< icon "browse-edit-select-files.svg" >}} button next to the **Input to event bindings** property and select the Input Bindings asset you created.

![The Input component with the Input Bindings asset selected](/images/learning-guide/tutorials/input-and-movement/grid-based-movement/input-component.png)

{{< note >}}
You can attach Input components to any active entity in a level, if an Input Bindings asset is referenced, all entities in the level can receive and handle its events.  
{{< /note >}}

### Create a script with Script Canvas



### Simplify the graph with variables

### Add smooth motion over with the `Lerp Between` node

### Block input events

### Add diagonal motion

## Conclusion


## Related resources

| Resource | Description |
|-|-|
| [Using player input in O3DE](/docs/user-guide/interactivity/input/using-player-input/) | User Guide topics related to input. |
| [Creating gameplay and other behaviors with Script Canvas](/docs/user-guide/scripting/script-canvas/) | User Guide topics related to Script Canvas. |
| [Input component](/docs/user-guide/components/reference/gameplay/input/) | Reference for the Input component. |
| [Script Canvas component](/docs/user-guide/components/reference/scripting/script-canvas/) | Reference for the Script Canvas component. |
