---
linktitle: Best Practices
title: Script Canvas Best Practices
description: Learn about best practices when using Script Canvas in Open 3D Engine (O3DE).
---

Best practices for Script Canvas include using an event-driven approach and using custom nodes to simplify your graphs.

## Use an event-driven approach

Script Canvas nodes are stateless by default. However, by connecting to the [tick bus](/docs/user-guide/programming/components/tick), they can be configured to have a state. Engineers must manage the lifetime and performance of nodes that have a state.

In the core Script Canvas libraries, state is used primarily to drive the logic in a graph (as with the **Delay** node). However, an event-driven paradigm is recommended because it helps reduce the complexity of authoring and running graphs.

We recommend that you reflect functionality to Script Canvas through the behavior context. This is true even for Script Canvas-specific functionality. Using the behavior context encourages event-driven paradigms through EBuses. This approach yields modular, decoupled behaviors that can reduce graph complexity and takes advantage of runtime optimizations.

## Use custom nodes to simplify your graphs

Identify user patterns that are frequently used, but complicated, and help simplify them through custom nodes and improved behavior context methods. Using custom nodes with EBuses can reduce the overall complexity of graphs and make graph authoring more intuitive. For information about creating custom nodes, see [Creating Custom Nodes in Script Canvas](/docs/user-guide/scripting/script-canvas/programmer-guide/custom-nodes).

## Be careful with entity activation order

Sending events during entity activation can have undesired results. Because the order of activation of entities is not guaranteed, when an event is sent during activation, some entities that need to handle the event might not receive it. In particular, the **On Graph Start** and **On Entity Activated** nodes are subject to activation order issues. Be careful when sending events from them.

In order to ensure that all entities that need to listen for and handle a given script event are ready to receive the event, it is best to queue the message on the tick bus. To implement this strategy, use a **Once** node connected to the **On Tick** message, as the following image shows. This practice guarantees that when the message is sent, all entities that might be connected to that script event receive it.

![The Once node connected to the On Tick message](/images/user-guide/scripting/script-canvas/best-practices-activation-order.png)
