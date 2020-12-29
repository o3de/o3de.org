# Placing UI Canvases in the 3D World<a name="ui-editor-placing-canvases-3d"></a>

You can place a UI canvas directly on an object in the 3D world, as opposed to showing it in screen space\. To do this, you render a UI canvas to a texture, and then use that texture in a material on a 3D mesh\.

You can use any material on any type of entity to display a texture rendered by a UI canvas\. However, if players are to interact with the UI canvas in the 3D world—by clicking with the mouse, for example—you must use a component entity\.

To see an example of a UI canvas on an object in a 3D world, open the **UiIn3DWorld** level in the Samples Project\.

Follow all the steps in the following procedure if you need to create a canvas that players can interact with\. If the canvas is not to be interactive, then you only need steps 1 through 5\.

**To place a UI canvas on an object in the 3D world**

1. [Create your UI canvas file](ui-editor-creating-canvases.md)\. In the [canvas properties](ui-editor-canvas-properties.md), select **Render to texture** and enter a name in the **Render target** text box\. You can enter any name, but the convention is to prefix the name with the `$` character to distinguish it from other texture assets\.

1. In the level, create a [component entity](creating-entity.md)\.

1. In the **Entity Inspector**, [add to this component entity](creating-adding-components.md) a **UI Canvas Asset Ref** to specify the UI canvas and optionally to load it automatically when the level loads\.

1. In the [**Material Editor**](mat-surface-types.md), create a material that uses the render target texture that is rendered by your canvas\. Under **Texture Maps**, for **Diffuse**, specify the texture file name\. 

1. Add a [Mesh](component-static-mesh.md) component to the component entity and choose the mesh asset onto which you want to map your canvas\. Use the **Material override property** to select the material that you created\.

1. Add a **[Mesh Collider](https://docs.aws.amazon.com/lumberyard/latest/userguide/component-physics-mesh-collider.html)** and a **Static Physics** component\. Physics is required on this entity because a ray cast is used to translate a mouse or touch input into a position on the UI canvas that is at that point in the world\.

1. Add a **UI Canvas on Mesh** component\. Type a canvas name in the **Render target override** property if you want to load several instances of the UI canvas on different meshes and have them display different states\. Otherwise, leave this property blank\. 

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-placing-canvases-3d.png)