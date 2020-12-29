# Toolbar<a name="ui-editor-toolbar"></a>

## Interaction Modes<a name="ui-editor-toolbar-interaction-modes"></a>

The **UI Editor** toolbar features interaction modes\. The selected interaction mode determines how you can interact with the UI elements in your canvas\.Interaction modes

**Select**  
Select elements in your canvas\. In this mode, selecting is the only action that you can use on your UI elements\.

**Move**  
Select and move UI elements\. Moving a UI element modifies its offset\. In the **Move** mode, you can view but not interact with the anchor widget, which is disabled\.  
You can move UI elements in the following ways:  
+ Select an element and drag it to a new position\.
+ Select a particular axis \(X, Y, or Z\) on the axis gizmo and drag the element by only one axis at a time\.
+ Nudge your selected elemented using keyboard arrows\.
+ Select multiple elements and align them using the [Alignment Tool](#ui-editor-toolbar-alignment-tool)\.

**Rotate**  
Select and rotate UI elements\.

**Resize**  
Select and resize UI elements\. Resizing modifies the UI element's offsets\.

**Anchor**  
Select and move UI elements by their anchors\. If you select one element, the anchor widget appears in blue, and you can interact directly with that element\. If you select multiple elements, the anchor widget is disabled\.  
In **Anchor** mode, you can interact with UI elements in the same ways as in the **Move** mode\.

## Alignment Tool<a name="ui-editor-toolbar-alignment-tool"></a>

The alignment tool is a set of buttons on the **UI Editor**'s toolbar\.

![\[The alignment tools are on the UI Editor's toolbar.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-toolbar-alignment-tool-buttons.png)

The alignment tools are enabled when your interaction mode is **Move** or **Anchor** and you have selected two or more movable elements\.

**Note**  
One type of element that you can't moved is one that a parent layout element controls\.

With these tools, you can align elements by lining up their:
+ Top edges
+ Elements' horizontal centers
+ Bottom edges
+ Left edges
+ Elements' vertical centers
+ Right edges

**To align objects**

1. Select one of the following interaction modes:
   + **Move**
   + **Anchor**

1. On your canvas, select two or more movable elements\.

   The alignment tools on the toolbar are now enabled\.

1. Select an alignment button\.

The method that the alignment tool uses to move the elements depends on the interaction mode you're using\. If the mode is in **Move**, elements are moved using their offsets\. If the mode is **Anchor**, the elements are moved by their anchors\.

A bounding rectangle is a useful graphic for understanding how the alignment tool determines how it aligns elements\.

Imagine a gray bounding rectangle that encompasses the elements in it\.

![\[The selected elements are contained by an imaginary bounding rectangle, which determines how the elements are moved.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-toolbar-alignment-tool-bounding1.png)

If you align vertically by the elements' centers, the elements are centered at the bounding rectangle's center, which remains in its original position\.

![\[Align elements vertically by their center.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-toolbar-alignment-tool-bounding2.png)

If you align vertically by the elements' right edges, the elements' right edges are aligned to the bounding rectangle's right edge\.

![\[Align elements vertically by their right edges.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-toolbar-alignment-tool-bounding3.png)