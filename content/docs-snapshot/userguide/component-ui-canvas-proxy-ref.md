# UI Canvas Proxy Ref<a name="component-ui-canvas-proxy-ref"></a>

With the UI Canvas Proxy Ref component, you can associate a component entity in a level with another component entity that is managing a UI canvas\. Use this component in conjunction with the [**UI Canvas on Mesh**](component-ui-canvas-on-mesh.md) component if you want to place a UI canvas on a 3D mesh that a player can interact with in several places in the 3D world\.

Use of this component is often a special case, as it supports displaying the same UI canvas on multiple entities in the 3D world\. The **UI Canvas Proxy Ref** component allows the component entity that it is on it to act as if it had a [**UI Canvas Asset Ref**](component-ui-canvas-asset-ref.md) component but without having to load another copy of the UI canvas\. This means that, as the user interacts with one UI canvas on a 3D object, the other 3D object shows the same changes\.

To see an example of using the **UI Canvas Proxy Ref** component, open the **UiIn3DWorld** level in the **Samples Project**\.

The following picture shows three entities that share the same loaded canvas\. The curved plane entity has a **UI Canvas Asset Ref** component and the egg and the sphere both have **UI Canvas Proxy Ref** components:

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/ui_canvas/component-ui-canvas-proxy-ref-screenshot.png)

## UI Canvas Proxy Ref Component Properties<a name="component-ui-canvas-proxy-ref-properties"></a>

The UI Canvas Proxy Ref component has the following properties:

**Canvas Asset Ref entity**  
Click the picker \(hand icon\) to select the component entity that you want to mirror\. The picked component must have the **UI Canvas Asset Ref** component on it\.