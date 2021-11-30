---
linktitle: Nodeables
title: Script Canvas Nodeables
description: Learn how to use nodeables to create custom Script Canvas nodes in Open 3D Engine (O3DE).
weight: 100
---

A _nodeable_ is a <!-- (process for creating a?) --> custom Script Canvas node that has been created from C++ code. Nodeables are translated by **Asset Processor** at runtime.
<!-- Can "nodeable" be plural? I would say yes if it is a node, no if it is a process. -->
<!-- translated into what? Does AP really translate at _runtime_? Don't we mean during the build? -->

To help simplify the process of creating custom nodes, nodeables take advantage of the automatic and templated code generation capabilities of [AzAutoGen](/docs/user-guide/programming/autogen/). Using AzAutoGen and the templating language of Jinja, you can create the C++ code for your custom Script Canvas nodes from XML and Jinja templates.

The following diagram shows the process for using nodeables in Script Canvas.

TODO: Update the diagram and steps.

![Nodeable process in Script Canvas](/images/user-guide/scripting/script-canvas/script-canvas-custom-nodes-1.png)

In **Step 1**, AZ Code Generator processes `MyNode.h` and looks for code generation tags \(source code location: `dev\Gems\ScriptCanvas\Code\Include\ScriptCanvas\CodeGen\CodeGen.h`\). After processing, AZ Code Generator creates a file called `MyNode.generated.h`.

{{< note >}}
You must include `MyNode.generated.h` in the `MyNode.h` file so that the preprocessor macro that AZ Code Generator produces is resolved by C++ during Step 3.
{{< /note >}}

In **Step 2**, AZ Code Generator processes `MyNode.h` again, but this time produces a `.cpp` file.

{{< note >}}
You must include `MyNode.generated.cpp` the in `MyNode.cpp` file. This ensures that the generated code can be compiled and has access to all the same `#include` declarations as those found in `MyNode.cpp`.
{{< /note >}}

In **Step 3**, AZ Code Generator is finished and the build process continues as normal. `MyNode.cpp` is compiled and succeeds provided all the generated files are correct.

## Creating a node from a nodeable

Creating a custom node from a nodeable requires the following steps:

* 