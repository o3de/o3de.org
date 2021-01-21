---
description: ' Use the UI Canvas Asset Ref component in &ALYlong; to associate a UI
  canvas with a component entity in a level. '
title: UI Canvas Asset Ref
---
# UI Canvas Asset Ref {#component-ui-canvas-asset-ref}

With the **UI Canvas Asset Ref** component, you can associate a UI canvas with a component entity in a level\.

When you set up a UI canvas asset ref component, you can:
+ Select whether to automatically load the UI canvas when the level loads
+ Use Script Canvas that is associated with the UI canvas to reference it using the **UI Canvas Asset Ref** Script Canvas nodes\.

Use this component in conjunction with the [**UI Canvas on Mesh**](/docs/userguide/components/ui-canvas-on-mesh.md) component if you want to place a UI canvas on a 3D mesh that a player can interact with\.

For more information about how to use the **UI Canvas Asset Ref** component, see [Placing UI Canvases in the 3D World](/docs/userguide/ui/editor/placing-canvases-3d.md)\.

## UI Canvas Asset Ref Component Properties {#component-ui-canvas-asset-ref-properties}

The **UI Canvas Asset Ref** component has the following properties:

**Canvas pathname**
The relative pathname of the UI canvas asset file\.

**Load automatically**
If selected, the canvas is automatically loaded when this component entity is loaded, typically when the level is loaded\.