---
linkTitle: Placing UI Canvases in the 3D World
title: Placing UI Canvases in the 3D World
description: Place a UI canvas on an object in the 3D world in Open 3D Engine (O3DE).
weight: 500
---

You can place a UI canvas directly on an object in the 3D world, as opposed to showing it in screen space. To do this, you render a UI canvas to a texture, and then use that texture in a material of a mesh or actor.

You can use any material on an entity to display a texture rendered by a UI canvas. To interact with a canvas on a mesh or actor, the entity requires a **UI Canvas on Mesh** component.

## Placing a canvas in the world

1. [Create a UI canvas](/docs/user-guide/interactivity/user-interface/canvases) in [**UI Editor**](/docs/user-guide/interactivity/user-interface/editor/). 

1. In the [canvas properties](/docs/user-guide/interactivity/user-interface/canvases/canvas-properties), enable the **Render to texture** property.  

1. In the **Render Target** property, click the {{< icon "picker.svg" >}} button and select an `.attimage` Attachment Image asset.  Refer to [Attachment Image assets](/docs/user-guide/interactivity/user-interface/canvases/canvas-properties/#attachment-image-assets) for an example `.attimage` source asset.

1. In the level, create an entity.

1. With the entity selected, in the **Entity Inspector**, add a **UI Canvas Asset Ref** component to the entity and select the UI canvas you created. Enable **Load automatically**.

1. Add a **Mesh** component to the entity and select a **Model Asset**.

1. Add a **Material** component to the entity and select a material to display the canvas on. Edit the material instance by clicking on the arrow next to the **Model Materials** property. Select **Edit Material Instance...**. In the Material Property Inspector, update the **Base Color** texture to the same Attachment Image asset as the UI canvas' **Render Target**.

1. (For interactable canvases) Add a **UI Canvas on Mesh** component to the entity. If you want to load multiple instances of the UI canvas on different entities and have them display different states, select the Attachment Image asset in the **Render target override** property. Otherwise, leave this property blank.

    {{< note >}}
You must create a unique Attachment Image asset for each entity, assign that asset the entity's material, and then assign the Attachment Image asset in the **Render target override** property.  
{{</ note >}}

## Example entity component configuration

The following image shows an entity that is configured to display a non-interactable canvas on its mesh.

![Entity Inspector with components that have been configured](/images/user-guide/interactivity/user-interface/canvases/ui-editor-placing-canvases-3d.png)
