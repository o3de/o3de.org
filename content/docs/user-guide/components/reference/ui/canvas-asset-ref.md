---
linkTitle: UI Canvas Asset Ref
title: UI Canvas Asset Ref Component
description: Use the UI Canvas Asset Ref component in Open 3D Engine (O3DE) to associate a UI canvas with a component entity in a level.
---

With the **UI Canvas Asset Ref** component, you can associate a UI canvas with an entity.

## Usage

In the **Canvas pathname** property field, enter the name of a `.uicanvas` asset in your project. Then, select the canvas to associate with this component from the dropdown list that automatically populates.  Alternatively, click the {{< icon browse-edit-select-files.svg >}} button and choose a `.uicanvas` asset from the file browser.

After you select a UI canvas you can set additional properties to load automatically and choose whether to load it in an enabled or disabled state.

Use UI Canvas Asset Ref nodes to reference the canvas in Script Canvas.

If you want to place a UI canvas on a 3D mesh that a user can interact with, use this component in conjunction with the [**UI Canvas on Mesh**](/docs/user-guide/components/reference/ui/canvas-on-mesh) component. For more information, refer to [Placing UI Canvases in the 3D World](/docs/user-guide/interactivity/user-interface/canvases/placing-canvases-3d).

## Provider

[LyShine Gem](/docs/user-guide/gems/reference/ui/lyshine)

## UI Canvas Asset Ref properties 

![UI Canvas Asset Ref properties](/images/user-guide/components/reference/ui/ui-canvas-asset-ref-component.png)

| Property | Description | Values | Default |
|-|-|-|-|
| **Canvas pathname** | Selects the canvas asset to load. | `.uicanvas` | None |
| **Load automatically** | If enabled, the canvas will automatically load in an enabled state when this component activates.  | Boolean | `Disabled` |
| **Load in disabled state** | If enabled, the canvas will automatically load, but in a disabled state. The canvas must be enabled before it is visible. <br> <br>*This property is available only if **Load automatically** is set to `Enabled`.* | Boolean | `Disabled` |

## UiCanvasRefBus

| Method Name | Description | Parameter | Return | Scriptable |
|-|-|-|-|-|
| `GetCanvas` | Returns the name of the UI Canvas asset set in the **Canvas pathname** property. | None | Name: String | Yes |

For more information, see [Working with the Event Bus (EBus) system](/docs/user-guide/programming/messaging/ebus/).
