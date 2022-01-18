---
linkTitle: Loading UI Canvases
description: ' Learn how to load a UI Canvas at runtime using Open 3D Engine (O3DE). '
title: Loading UI Canvases
weight: 800
---

Once a UI canvas is authored using **UI Editor** it can be loaded at runtime using one of the following methods.

- Use a UI Canvas Asset Ref component.
    The [UI Canvas Asset Ref component](/docs/user-guide/components/reference/ui/canvas-asset-ref/) references a UI canvas asset and has an option to automatically load the UI canvas when the component's entity activates.

- Use the Load Canvas Script Canvas node.
    Load a UI canvas by pathname with the Load Canvas [Script Canvas node](/docs/user-guide/scripting/script-canvas/editor-reference/nodes/). Add the node to a Script Canvas graph that is assigned to a **Script Canvas** component on an entity in the level.

- Use the UI Canvas Manager EBus.
    The UI Canvas Manager [EBus](/docs/user-guide/programming/ebus) contains methods for loading a canvas by pathname and unloading a canvas by entity Id. Use this EBus in a [Lua script](/docs/user-guide/scripting/lua/) that is assigned to a **Lua Script** component on an entity in the level.
