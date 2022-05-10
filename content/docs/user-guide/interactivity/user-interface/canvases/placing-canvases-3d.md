---
linkTitle: Placing UI Canvases in the 3D World
description: ' Place a UI canvas on an object in the 3D world in Open 3D Engine. '
title: Placing UI Canvases in the 3D World
weight: 500
---

You can place a UI canvas directly on an object in the 3D world, as opposed to showing it in screen space. To do this, you render a UI canvas to a texture, and then use that texture in a material on a 3D mesh.

You can use any material on a component entity to display a texture rendered by a UI canvas. If players are to interact with the UI canvas in the 3D world—by clicking with the mouse, for example—an extra **UI Canvas on Mesh** component is required to be added to the entity.

Follow all the steps in the following procedure if you need to create a canvas that players can interact with. If the canvas is not to be interactive, then you only need steps 1 through 5.

**To place a UI canvas on an object in the 3D world**

1. [Create your UI canvas file](/docs/user-guide/interactivity/user-interface/canvases). In the [canvas properties](/docs/user-guide/interactivity/user-interface/canvases/canvas-properties), find the **Render to texture** property and click on the folder icon to select an attachment image asset.

1. In the level, create a component entity.

1. In the **Entity Inspector**, add to this component entity a **UI Canvas Asset Ref** to specify the UI canvas and optionally to load it automatically when the level loads.

1. Add a **Mesh** component to the component entity and assign it a mesh onto which you want to map your canvas.

1. Add a **Material** component to the component entity and select a material that will be assigned the attachment image. Edit the material instance by clicking on the arrow next to the **Model Materials** property. Select "Edit Material Instance...". In the Material Property Inspector that comes up and update the Base Color texture to the same attachment image asset that the UI canvas' **Render to texture** property was set to.

1. Add a **UI Canvas on Mesh** component. Assign an attachment image asset in the **Render target override** property if you want to load several instances of the UI canvas on different meshes and have them display different states. Otherwise, leave this property blank.

![Entity Inspector with components that have been configured](/images/user-guide/interactivity/user-interface/canvases/ui-editor-placing-canvases-3d.png)
