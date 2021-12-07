---
linktitle: Creating Custom Nodes
title: Creating Custom Nodes in Script Canvas
description: Learn how to create custom Script Canvas nodes in Open 3D Engine (O3DE).
weight: 200
---

Creating custom nodes in Script Canvas offers you maximum control and flexibility with the functionality of the node. You might wish to a create custom node in the following scenarios:

* When your node has state, time, or latent results.
* When creating complex nodes.
* When you need control over the node's topology.

To make the process of creating a custom node easier, Script Canvas uses a templated, automatic code generation system called [AzAutoGen](/docs/user-guide/programming/autogen/) to significantly reduce the amount of "boilerplate code" you need to write just to get a node up and running, allowing the developer to immediately focus on the functionality of the new node, since the code required for the node to show up in the **Node Palette** is already there.

The following four steps are required to create a custom node:

1. Create a code generation XML file.
1. Create the .h and .cpp files, known as _nodeables_.
1. Add these files to CMake.
1. Reflect the new node by adding it to a library.

## Step 1: Create an XML file for code generation

Code generation files 