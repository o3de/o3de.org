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

<!-- TODO: Write a sentence or two about each method for creating new nodes, defining what it involves and when to use it, along with any cautionary notes. Might be helpful to include a representative screenshot for each one. Then move the link for the documentation to the end of the paragraph, such as "For documentation, see: []()." -->

### Functions

You can create function nodes by combining a group of nodes into one, reusable function using the Script Canvas Editor, without needing to write any C++ code.

![Script Canvas function node example]()

Refer to the documentation on [Script Canvas functions](editor-reference/functions) for more information.

### Script events

You can create sender and receiver event nodes in Script Canvas with the help of the **Asset Editor**. An event is configured in Asset Editor by supplying the event name, parameters, and return value---similar to how you would define a function in any programming language. However, no C++ code is required.

![Script event node example]()

Refer to the documentation on [Script events](/docs/user-guide/scripting/script-events/) for more information.

### Behavior context binding

To expose new C++ classes, methods, constants, data types, and events to Script Canvas, you can create script bindings to the behavior context.

![Example of node created from behavior context binding]()

Refer to the documentation on [Creating Script Canvas nodes from the behavior context](programmer-guide/behavior-context) for more information.

### Custom nodes

For the most control and flexibility when creating new nodes, including the ability to add new functionality, you can use the highly customizable process known as _nodeables_. Nodeables use XML configuration, Jinja templates, and an automatic C++ code generation tool to create custom Script Canvas nodes.

![Example of node created from nodeables]()

<!-- Pro/con: If your Gem provides custom Script Canvas nodes, you must specify a dependency on the Script Canvas Gem. Functionality that you reflect through the behavior context requires no dependency on the Script Canvas Gem. -->

Refer to the documentation on [Creating custom nodes](programmer-guide/custom-nodes/) for more information.
