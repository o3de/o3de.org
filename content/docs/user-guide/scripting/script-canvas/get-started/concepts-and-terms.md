---
linktitle: Concepts and Terms
title: Script Canvas Concepts and Terms
description: Learn common Script Canvas concepts and terms.
weight: 200
---

The following concepts and terms are commonly used in **Script Canvas**:

## Script

A script is a collection of nodes, node properties, and node connections that, when combined, create a visual script.

## Node

Nodes represent the data, events, and actions that you use to create logic and behaviors in Script Canvas.

## Node types

Script Canvas defines the following _node types_:

### Event nodes

Event nodes subscribe to event bus (EBus) handlers to listen for events to occur. Examples include entering a trigger area, colliding with an object, turning off a light, and when the game ticks. For more information about using the EBus interface, refer to [The Open 3D Engine Event Bus (EBus) System](/docs/user-guide/programming/messaging/ebus/).

### Action nodes

Action nodes are used to get or send data across an EBus. Examples of action nodes include getting the mass of an entity, turning on a light, setting the text of a UI element, and playing an animation.

### Variable and data nodes

Variable and data nodes represents the custom data that can be required to build game logic. You can use these nodes to make counters, store entity references, specify a direction, define a color, and so on. Variable nodes are added to a script to declare and initialize them. Use _get_ and _set_ nodes to retrieve or set the variable's value.

{{< note >}}
An alternative to variable nodes are [variable references](/docs/user-guide/scripting/script-canvas/editor-reference/variables/variable-references).
{{< /note >}}

The following are the commonly used data types in Script Canvas:

+ Boolean
+ Color
+ Entity
+ Number
+ String
+ Transform
+ Vector 2/3/4

### Logic nodes

Logic nodes include comparison and timing operations. You can use logic nodes to check whether two values are equal, control the execution of nodes, delay the execution of a node for a specific amount of time, and more.

### Math nodes

Math nodes enable math operations, such as arithmetic, geometry, algebra, and calculus.

### Debugging nodes

Debugging nodes verify whether a script is functioning as expected. You can use debugging nodes to print data to the console or viewport and check for errors. These nodes pass logic flow, but do not execute in release builds.

### User-defined nodes

You can build your own nodes for your project's specific needs. For more information, see [Creating Custom Nodes in Script Canvas](/docs/user-guide/scripting/script-canvas/programmer-guide/custom-nodes/).

## Node Palette

The **Node Palette** contains a searchable list of nodes. By default, the palette is docked to the left of the **Script Canvas Editor**.

**To display the Node Palette**

1. From O3DE Editor, choose **Tools**, **Script Canvas**.

1. In the Script Canvas window, do one of the following:
   + Choose **Tools**, **Node Palette**.
   + Press **Ctrl+Shift+L**.

   {{< note >}}
If you have an existing script open, you can **right-click** the canvas to open a context menu.
   {{< /note >}}

## Node Inspector

The **Node Inspector** shows the properties of the node. You can edit each property in the inspector or directly in the node. By default, this window doesn't appear in the editor.

**To display the Node Inspector**

1. In **O3DE Editor**, choose **Tools**, **Script Canvas**.

1. Do one of the following:
   + Choose **Tools**, **Node Inspector**.
   + Press **Ctrl+Shift+I**.
