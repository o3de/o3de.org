---
linktitle: Scripting
title: Scripting Gameplay in O3DE
description: Learn about the scripting languages supported in Open 3D Engine (O3DE) to add gameplay logic and behaviors in your project.
weight: 900
---

**Open 3D Engine (O3DE)** provides two scripting technologies so you can add gameplay logic and behaviors in your project: **Script Canvas** and **Lua**.

*Script Canvas* is a general purpose, visual scripting environment. In the **Script Canvas Editor**, you lay out and connect graphical nodes that provide a visual representation of the logic flow. Script Canvas offers an approachable environment to author behaviors using the same framework as Lua and C++. You can use Script Canvas to create scripts without coding experience.

*Lua* is a powerful, fast, lightweight, embeddable scripting language. Lua facilitates quick iteration in your project because you can run your changes immediately without needing to recompile your source code.


### How scripts communicate in O3DE

O3DE functionality is exposed to Script Canvas and Lua through the _behavior context_. The behavior context reflects runtime code, making it accessible to scripts through bindings to C++ classes, methods, properties, constants, and enums. The behavior context also provides bindings for O3DE's EBus so you can dispatch and handle events through Script Canvas and Lua.

Functionality for both Script Canvas and Lua is added to entities through components. You can have multiple script components and mix and match between Lua and Script Canvas within your entities. This approach enables you to create small, manageable modules of logic and behavior that can be reused throughout your projects.


## Section topics

| Topic | Description |
| --- | --- |
| [Script Canvas](script-canvas/) | Learn how to get started using Script Canvas and find tips on best practices, troubleshooting, and how to use the Script Canvas debugger. Includes a reference for the Script Canvas Editor and a programmer's guide to learn how to extend Script Canvas. |
| [Lua](lua/) | Learn how to get started adding Lua scripts to your entities and using the Lua Editor and debugger. |
| [Script Events](script-events/) | Learn how to author script events that can send and receive data between entities, scripts, and scripting systems in O3DE. |
