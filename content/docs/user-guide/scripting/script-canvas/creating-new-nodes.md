---
linktitle: Creating New Nodes
title: Creating New Nodes in Script Canvas
description: Learn about the different ways to create new Script Canvas nodes in Open 3D Engine (O3DE).
weight: 300
---

Script Canvas is an _extensible_ visual scripting system. You can create new nodes in Script Canvas in the following four ways, listed in ascending order of complexity:

* Script Canvas functions
* Script events
* Behavior context binding
* Custom nodes

## Functions

One of the simplest ways to create a new node is by combining the functionality of several existing nodes into one reusable function node. Use **Script Canvas Editor** to create function nodes---there's no need to write any C++ code.

![Script Canvas function node example](/images/user-guide/scripting/script-canvas/function-node-example.png)

{{< note >}}
Script Canvas functions are not available outside of the Script Canvas scripting system.
{{< /note >}}

For more information, refer to [Script Canvas Functions](editor-reference/functions).

## Script events

You can create new sender and receiver event nodes in Script Canvas using **Asset Editor**. Configure a script event in Asset Editor by supplying the event name, parameters, and return value---similar to defining a function in any programming language, but with no C++ code required.

![Script event node example](/images/user-guide/scripting/script-canvas/script-event-node-example.png)

{{< note >}}
Script events are available to all O3DE scripting systems, including Lua.
{{< /note >}}

For more information, refer to [Script Events](/docs/user-guide/scripting/script-events/).

## Behavior context binding

To expose new C++ classes, methods, constants, data types, and events to Script Canvas, you can create script bindings to the behavior context. This is the most common method used to create new nodes for O3DE Gems and components.

![Example node created from behavior context binding](/images/user-guide/scripting/script-canvas/behavior-context-node-example.png)

{{< note >}}
You can use script bindings with any O3DE scripting system that uses the behavior context, such as Lua.
{{< /note >}}

{{< note >}}
You don't need to specify a dependency on the Script Canvas Gem to create script bindings that reflect to the behavior context.
{{< /note >}}

For more information, refer to [Creating Script Canvas Nodes from the Behavior Context](programmer-guide/behavior-context) in the Script Canvas Programmer Guide.

## Custom nodes

For the most control and flexibility when creating new nodes, including the ability to add new functionality, you can use
* _nodeables_, a highly customizable node implementation mechanism
* free function nodes, a customizable node reflecting C++ free function

To create custom Script Canvas nodes, we use XML configuration, Jinja templates, and an automatic C++ code generation tool.
Programmers can use nodeables/free function nodes to write classes/functions in C++ using an SDK that is guaranteed to generate a class interface that provides both a usable node in Script Canvas Editor and a usable object at runtime.

![Example node created from nodeables](/images/user-guide/scripting/script-canvas/nodeable-node-example.png)

{{< note >}}
Nodeables are not available to other O3DE scripting systems, such as Lua.
{{< /note >}}

{{< note >}}
Gems that use nodeables to provide custom Script Canvas nodes must specify a dependency on the Script Canvas Gem.
{{< /note >}}

{{< note >}}
Gems that use free function nodes to provide custom Script Canvas nodes must specify a dependency on the ScriptCanvas.Extensions target.
{{< /note >}}

For more information, refer to [Creating Custom Nodes in Script Canvas](programmer-guide/custom-nodes/) in the Script Canvas Programmer Guide.
