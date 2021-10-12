---
linktitle: Script Canvas
title: Creating Gameplay and Other Behaviors with Script Canvas
description: Get started with the Open 3D Engine (O3DE) Script Canvas, a visual scripting environment to implement game logic and other behaviors without needing to write code.
weight: 50
---

Script Canvas is a visual scripting environment for **Open 3D Engine (O3DE)** that you can use to create game logic and behaviors. Integrated with O3DE's component entity system, Script Canvas offers an approachable and easy-to-read environment to author behaviors using the same framework as Lua and C++. With its visual scripting options, you can use Script Canvas to create [scripts](/docs/user-guide/appendix/glossary#scripts) for game logic without needing to know how to code. Event-driven scripts let you produce small scripts that don't require complex logic to maintain states.

Script Canvas is also an extensible system. You can build your own reusable Script Canvas functions and, since Script Canvas is based on AzCore, you can create custom Script Canvas nodes that use the serialization, reflection, modularization, and EBus messaging systems.

To enable Script Canvas for O3DE, you must enable the [Script Canvas](/docs/user-guide/gems/reference/script/script-canvas) Gem and its dependencies.

| Topics | Description |
| --- | --- |
| [Get Started Guide](get-started/) | Learn the basic concepts of Script Canvas and the layout of the Script Canvas Editor. |
| [Editor Reference](editor-reference/) | Get a reference of Script Canvas Editor features, menu options, and tools. |
| [Programmer Guide](programmer-guide/) | Learn how to expose runtime code in Script Canvas using the behavior context, and how to create custom nodes. |
| [Best Practices](best-practices) | Get tips on best practices for Script Canvas. |
| [Debugging](debugging) | Learn how to use the Script Canvas Debugger. |
| [Troubleshooting](troubleshooting) | Get tips and techniques for troubleshooting in Script Canvas. |
