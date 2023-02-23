---
linktitle: Script Canvas
title: Creating Gameplay and Other Behaviors with Script Canvas
description: Get started with the Open 3D Engine (O3DE) Script Canvas, a visual scripting environment to implement runtime logic and scripted behaviors without writing code.
weight: 50
---

**Script Canvas** is a general purpose, visual scripting environment for **Open 3D Engine (O3DE)** that you can use to create runtime logic and scripted behaviors for any entity. Script Canvas offers an approachable yet powerful environment to author behaviors using the same framework as Lua and C++. You can use Script Canvas to create [scripts](/docs/user-guide/appendix/glossary#scripts) for game logic without needing to know how to code, and take advantage of O3DE messaging systems to produce small, event-driven scripts that don't require complex logic to maintain states.

Script Canvas is an extensible system. You can build your own reusable Script Canvas functions from within the **Script Canvas Editor**, and use Script Canvas nodes that are created automatically from functionality exposed through the [behavior context](/docs/user-guide/appendix/glossary#behavior-context). The behavior context reflects runtime code, making it accessible to scripts by providing bindings to C++ classes, methods, properties, constants, and enums. The behavior context also provides bindings for O3DE's [AZ::Event](/docs/user-guide/programming/messaging/az-event) and [EBus](/docs/user-guide/appendix/glossary#ebus) messaging systems, giving you the ability to use Script Canvas nodes to dispatch and handle messages and events.

To extend Script Canvas even further, you can create your own custom nodes ("nodeables") using the powerful automatic generation capabilities of the [AzAutoGen](/docs/user-guide/programming/autogen) system.

The ease of use of this visual scripting environment does _not_ come at the cost of performance when compared to the more traditional Lua model. To maintain similar performance, Script Canvas graphs are translated by the Asset Processor to optimized Lua script.

To use Script Canvas in your O3DE project, you must enable the [Script Canvas](/docs/user-guide/gems/reference/script/script-canvas) Gem and its dependencies.

| Topics | Description |
| --- | --- |
| [Get Started Guide](get-started/) | Learn the basic concepts of Script Canvas and the interface of the Script Canvas Editor. |
| [Editor Reference](editor-reference/) | A reference of Script Canvas Editor features, menu options, and tools. |
| [Creating New Nodes](creating-new-nodes) | Learn about the different ways to create new Script Canvas nodes. |
| [Programmer Guide](programmer-guide/) | Learn how to expose runtime code in Script Canvas using the behavior context, and how to create custom nodes ("nodeables") using AzAutoGen. |
| [Best Practices](best-practices) | Get tips on best practices when using Script Canvas. |
| [Debugging](debugging) | Learn how to use the Script Canvas Debugger. |
