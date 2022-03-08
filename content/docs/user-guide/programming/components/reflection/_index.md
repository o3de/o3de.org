---
linkTitle: Reflection Contexts
title: Reflection Contexts in O3DE
description: Learn how to use the various reflection contexts in Open 3D Engine (O3DE) for serializing component data, enabling editors to manipulate component data, and exposing component methods, properties, and events to scripting systems.
weight: 300
---

Use the **Open 3D Engine (O3DE)** reflection system to make a component's C++ objects available for serialization and manipulation by editors, and for scripting systems to invoke a component's methods and events at runtime.

For these purposes, O3DE provides the following reflection contexts:

* [Serialization context](serialization-context/) -- Enables persistence of a component's data through reflection of C++ objects.
* [Edit context](edit-context) -- Exposes a component's serialized C++ data for editing in **O3DE Editor**.
* [Behavior context](behavior-context) -- Exposes a component's methods, properties, and events through reflection to scripting systems such as Script Canvas and Lua. You can use these script bindings at runtime to invoke a component's methods, events, and event handlers.

All of these reflection contexts use the C++ [builder design pattern](https://en.wikipedia.org/wiki/Builder_pattern).
