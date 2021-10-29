---
linktitle: Scripting
title: Scripting in Open 3D Engine
description: Learn about the scripting languages supported in Open 3D Engine (O3DE).
weight: 900
---

**Open 3D Engine (O3DE)** includes two scripting languages for creating logic and behaviors: Script Canvas and Lua.

**Script Canvas** is a general purpose, visual scripting environment. In the Script Canvas editor, you create, connect, and rearrange graphical nodes that provide a visual representation of the logic flow. Script Canvas offers an approachable environment to author behaviors using the same framework as Lua and C++. You can use Script Canvas to create scripts without coding experience.

**Lua** is a powerful, fast, lightweight, embeddable scripting language. Lua facilitates quick iteration in your project because you can run your changes immediately without needing to recompile your source code.

O3DE functionality is exposed to Script Canvas and Lua through the behavior context. The behavior context reflects runtime code, making it accessible to scripts through bindings to C++ classes.
