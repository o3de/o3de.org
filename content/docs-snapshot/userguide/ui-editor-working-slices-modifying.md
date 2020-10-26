# Modifying a UI Slice and Pushing Changes<a name="ui-editor-working-slices-modifying"></a>

In the **UI Editor**, you modify UI slices and push changes similarly to the way that you do in the main Lumberyard Editor For more information on pushing changes in Lumberyard's component entity system, see [Working with Slices](component-slices.md)\.

The following conventions apply when working with slices in the **UI Editor**:
+ If you select an entity that is part of a slice instance, the **Properties** pane highlights in orange any properties that are different between the selected entity and the slice to which it belongs\.
+ A UI slice can't contain references to any entities not within the slice\. A UI slice can only contain reference to entities within the slice\.

In the **Hierarchy** pane, elements that are part of a slice appear in blue\. Elements that appear in bold blue indicate that the element is the root of the slice\. Within the slice's root, elements that appear in italic indicate a child slice\.

**Example**  
+ The element **Background** is not in a slice\.
+ **FontRenderingButton** is a root element and its child element, **Text**, is an element within `submenubutton.slice`\.

![\[The UI Editor's Hierarchy pane displays in blue any elements that are part of a slice.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-modifying-slices-submenubutton.png)

You can locally change an instantiated slice's name, which obscures the name of the slice from which it instantiated\.

**To determine the slice that the element instantiated from**
+ Pause on the element\. The slice name and its path appears in a tooltip\.

**To push local changes to the slice**

1. Right\-click in the **Properties** pane or on selected UI elements in the **Hierarchy** pane\.

1. In the context menu, choose **Push to Slice**\.