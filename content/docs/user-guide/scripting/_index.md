---
linktitle: Scripting
title: Scripting in Open 3D Engine
description: Learn about the scripting languages supported in Open 3D Engine (O3DE).
weight: 900
---

**Open 3D Engine (O3DE)** includes two scripting languages for creating logic and behaviors: Script Canvas and Lua.

**Script Canvas** is a visual scripting environment. In the Script Canvas editor, you create, connect, and rearrange graphical nodes that provide a visual representation of the logic flow. Script Canvas offers an approachable and easy-to-read environment to author behaviors using the same framework as Lua and C++. You can use Script Canvas to create scripts without needing to know how to code.

**Lua** is a powerful, fast, lightweight, embeddable scripting language. Lua facilitates quick iteration in your project because you can run your changes immediately without needing to recompile your source code.

O3DE functionality is exposed to Script Canvas and Lua through the behavior context. The behavior context reflects runtime code and makes it accessible to scripts by providing bindings to C++ classes, methods, properties, constants, and enums. The behavior context also provides bindings for O3DE's [EBus](/docs/user-guide/engine/ebus/) so you can dispatch and handle events through Script Canvas and Lua. For more information, refer to [Script Canvas and the Behavior Context](script-canvas/development/behavior-context).
