---
linktitle: Creating Custom Nodes
title: Creating Custom Nodes in Script Canvas
description: Learn how to create custom Script Canvas nodes in Open 3D Engine (O3DE).
weight: 200
---

Creating custom nodes in Script Canvas offers you maximum control and flexibility with the functionality of the node. You might wish to create a custom node in the following scenarios:

* When your node has state, time, or latent results.
* When creating complex nodes.
* When you need control over the node's topology.
* When you want to reflect your own C++ free functions. 

To make the process of creating a custom node easier, Script Canvas uses a templated, automatic code generation system called [AzAutoGen](/docs/user-guide/programming/autogen/) to significantly reduce the amount of "boilerplate code" you need to write just to get a node up and running. Using AzAutoGen allows the developer to immediately focus on the functionality of the new node, since the code required for the node to show up in the [Node Palette](/docs/user-guide/scripting/script-canvas/get-started/concepts-and-terms/#node-palette) is already there.

The following four steps are required to create a custom node:

1. Create a code generation XML file.
1. Create the C++ files for your node.
1. Add these files to CMake.
1. Register your new node.

## Related information

For a better understanding of creating custom nodes, we recommend reading following
- [Nodes](/docs/user-guide/scripting/script-canvas/editor-reference/nodes/)
- [Text Replacement](/docs/user-guide/scripting/script-canvas/editor-reference/text-replacement/)
- [AzAutoGen](/docs/user-guide/programming/autogen/)


## Topics

| Topic | Description |
| --- | --- |
| [Custom Nodeable Nodes](custom-nodeable-nodes/) | How to create custom Script Canvas Nodeable Nodes in Open 3D Engine (O3DE). |
| [Custom Free Function Nodes](custom-free-function-nodes/) | How to create custom Script Canvas Free Function Nodes in Open 3D Engine (O3DE). |
| [Node Definition Reference](custom-node-definition-reference/) | Reference guide for Script Canvas node definitions. |
| [Dynamic Data Slots](dynamic-data-slots/) | Use dynamic data slots to enable a single Script Canvas node to process a variety of data types in Open 3D Engine (O3DE). |

