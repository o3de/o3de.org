---
linkTitle: Loading UI Canvases
description: ' Load a UI Canvas at runtime. '
title: Loading UI Canvases
weight: 800
---

Once a UI Canvas is authored using the UI Editor it can be loaded at runtime using one of the following methods.

**Use a UI Canvas Asset Ref component**

The [UI Canvas Asset Ref component](/docs/user-guide/components/reference/ui/canvas-asset-ref/) references a UI canvas asset and has an option to automatically load the UI canvas when the component's entity is activated.

**Use the Load Canvas Script Canvas node**

The Load Canvas [Script Canvas node](/docs/user-guide/scripting/script-canvas/editor-reference/nodes/) loads a UI canvas by pathname and can be added to a Script Canvas graph that is assigned to a **Script Canvas** component on an entity in the level.

**Use the UI Canvas Manager EBus**

The UI Canvas Manager [EBus](/docs/user-guide/programming/ebus) contains methods for loading a canvas by pathname and unloading a canvas by entity Id. This EBus can be used in a [Lua script](/docs/user-guide/scripting/lua/) that is assigned to a **Lua Script** component on an entity in the level.
