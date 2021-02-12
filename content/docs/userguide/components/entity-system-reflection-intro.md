---
description: ' Expose C++ code for scripting in Amazon Lumberyard. '
title: Reflecting Lumberyard Classes, Methods, and EBus Interfaces
---
# Reflecting Lumberyard Classes, Methods, and EBus Interfaces {#component-entity-system-reflection-intro}

You can use Lumberyard's reflection system to expose runtime code for C\+\+\-based objects, for Lumberyard Editor, and for scripting\.

Lumberyard provides the following reflection contexts for these purposes:
+ [Serialization Context](/docs/userguide/components/entity-system-reflection-serialization-context.md) - Provides persistence for C\+\+ based objects through reflection for serialization\.
+ [Edit Context](/docs/userguide/components/entity-system-reflection-edit-context.md) - Enhances the serialization context to enable manipulation of data by Lumberyard Editor\.
+ [Behavior Context](/docs/userguide/components/entity-system-reflection-behavior-context.md) - Provides reflection for Lumberyard's [Script Canvas](/docs/userguide/scripting/scriptcanvas/intro.md) and for scripting languages like Lua\.

All these reflection systems use a C\+\+ [builder design pattern](https://en.wikipedia.org/wiki/Builder_pattern)\.