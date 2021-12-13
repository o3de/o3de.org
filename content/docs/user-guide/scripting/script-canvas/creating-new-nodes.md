---
linktitle: Creating New Nodes
title: Creating New Nodes in Script Canvas
description: Learn about the many ways to create new Script Canvas nodes in Open 3D Engine (O3DE).
weight: 300
---

Script Canvas is an _extensible_ visual scripting system. There are four ways that you can create new nodes in Script Canvas. Listed in relative order of complexity, they include:

* Script Canvas functions
* Script events
* Behavior context binding
* Custom nodes

## Functions

One of the simplest ways to create a new node is by combining the functionality of several existing nodes into one, reusable function node. Use the Script Canvas Editor to create function nodes---there's no need to write any C++ code.

![Script Canvas function node example](/images/user-guide/scripting/script-canvas/function-node-example.png)

{{< note >}}
Script Canvas functions are not available outside of the Script Canvas scripting system.
{{< /note >}}

Refer to the documentation on [Script Canvas functions](editor-reference/functions) for more information.

## Script events

You can create new sender and receiver event nodes in Script Canvas with the help of the **Asset Editor**. Configure a script event in Asset Editor by supplying the event name, parameters, and return value---similar to how you would define a function in any programming language, but no C++ code is required.

![Script event node example](/images/user-guide/scripting/script-canvas/script-event-node-example.png)

{{< note >}}
Script events are available to any O3DE scripting system, including Lua.
{{< /note >}}

Refer to the documentation on [Script events](/docs/user-guide/scripting/script-events/) for more information.

## Behavior context binding

To expose new C++ classes, methods, constants, data types, and events to Script Canvas, you can create script bindings to the behavior context. This is the most common method used to create new nodes for O3DE Gems and components.

![Example of node created from behavior context binding](/images/user-guide/scripting/script-canvas/behavior-context-node-example.png)

{{< note >}}
Script bindings are available to any O3DE scripting system that uses the behavior context, such as Lua.
{{< /note >}}

{{< note >}}
No dependency on the Script Canvas Gem is required to create script bindings that reflect to the behavior context.
{{< /note >}}

Refer to the documentation on [Creating Script Canvas nodes from the behavior context](programmer-guide/behavior-context) in the Script Canvas Programmer Guide for more information.

## Custom nodes

For the most control and flexibility when creating new nodes, including the ability to add new functionality, you can use the highly customizable node implementation mechanism called _nodeables_. Nodeables use XML configuration, Jinja templates, and an automatic C++ code generation tool to create custom Script Canvas nodes. Using this mechanism, programmers can write classes in C++ using an SDK that is guaranteed to generate a class interface that provides a useable node in the Script Canvas Editor, and a useable object at runtime.

![Example of node created from nodeables](/images/user-guide/scripting/script-canvas/nodeable-node-example.png)

{{< note >}}
Nodeables are not available to other O3DE scripting systems, such as Lua.
{{< /note >}}

{{< note >}}
Gems that use nodeables to provide custom Script Canvas nodes must specify a dependency on the Script Canvas Gem.
{{< /note >}}

Refer to the documentation on [Creating custom nodes](programmer-guide/custom-nodes/) in the Script Canvas Programmer Guide for more information.
