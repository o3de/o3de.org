---
linkTitle: UI Canvas on Mesh
title: UI Canvas on Mesh Component
description: Use the UI Canvas on Mesh component to place a UI canvas on a component entity in the 3D world that a user can interact with in Open 3D Engine (O3DE).
---

With the **UI Canvas on Mesh** component, you can place a UI canvas on a component entity in the 3D world that a user can interact with using a cursor.

## Usage

You can use the **Render target override** property when you want to load two unique instances of the same UI canvas that the user can set to different states. Assigning this property to an `.attimage` Attachment Image asset overrides a UI canvas' [**Render Target** property](/docs/user-guide/interactivity/user-interface/canvases/canvas-properties/#rendering-properties) value. You must use the same Attachment Image asset selected in **Render target override** as the diffuse texture of the mesh or actor's material.

For simple cases that do not require unique instances of the same `.uicanvas` asset, you can leave the **Render target override** property blank.

![Two entities load a unique instance of the same canvas](/images/user-guide/component/ui_canvas/component-ui-canvas-on-mesh-properties2.png)

For more information about how to use the UI Canvas on Mesh component, refer to [Placing UI Canvases in the 3D World](/docs/user-guide/interactivity/user-interface/canvases/placing-canvases-3d).

## Provider ##

[LyShine Gem](/docs/user-guide/gems/reference/ui/lyshine/)

## Dependencies

Select one of the following required components to display a UI canvas on:
- [Actor component](/docs/user-guide/components/reference/animation/actor)
- [Mesh component](/docs/user-guide/components/reference/atom/mesh)

Select one of the following required components to provide a reference to a UI canvas:
- [UI Canvas Asset Ref component](./canvas-asset-ref)
- [UI Canvas Proxy Ref component](./canvas-proxy-ref)

## UI Canvas on Mesh properties 

![UI Canvas Asset Ref properties](/images/user-guide/components/reference/ui/ui-canvas-on-mesh-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Render target override** | Selects an `.attimage` [Attachment Image asset](/docs/user-guide/interactivity/user-interface/canvases/canvas-properties/#attachment-image-assets) that will override a UI Canvas' **Render Target** property. | Attachment Image asset | None |
