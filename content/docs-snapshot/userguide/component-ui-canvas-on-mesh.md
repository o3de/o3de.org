# UI Canvas on Mesh<a name="component-ui-canvas-on-mesh"></a>

With the **UI Canvas on Mesh** component, you can place a UI canvas on a component entity in the 3D world that a player can interact with via ray casts\. Use this component in conjunction with the [**UI Canvas Asset Ref**](component-ui-canvas-asset-ref.md) component\.

For more information about how to use the **UI Canvas Asset Ref** component, see [Placing UI Canvases in the 3D World](ui-editor-placing-canvases-3d.md)\.

## UI Canvas on Mesh Component Properties<a name="component-ui-canvas-on-mesh-properties"></a>

The UI Canvas on Mesh component has the following properties:

**Render target override**  
For simple cases, you can leave this property blank\. The UI canvas specifies a render target, and that render target can be used as a texture name for the material on the 3D mesh\.  
You can use the **Render target override** property when you want to load two unique instances of the same UI canvas that the user can set to different states\. This example case is demonstrated in the **UiIn3DWorld** level in the **Samples Project**\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/ui_canvas/component-ui-canvas-on-mesh-properties2.png)