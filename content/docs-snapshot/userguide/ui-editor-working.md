# Working with UI Components<a name="ui-editor-working"></a>

You can use the **UI Editor** to add and delete components, create references to UI elements for component properties, and manage components\.

**Topics**
+ [Adding or Deleting Components](#ui-editor-add-delete)
+ [Referencing UI Elements](#ui-editor-referencing-ui-elements)
+ [Managing UI Components](#ui-editor-managing)

## Adding or Deleting Components<a name="ui-editor-add-delete"></a>

You can add or delete components in the [UI Editor](ui-editor-using.md)\.

**To add a component to an element**

1. In the **UI Editor**, select an element in the **Hierarchy** pane or in the Viewport\.

   To add components to multiple elements at once, use **Ctrl** to select multiple elements\.

1. Do one of the following:
   + At the top of the **Properties** panel, click **Add Component**\.
   + In the **Properties** panel, right\-click and choose **Add Component**\.

1. Select the component to add to the element: image, text, button, check box, slider, text input, scroll box, fader, mask, layout column, layout row, or layout grid\.

1. See the instructions for the specific component that you're adding\.

**To delete a component from an element**

1. In the **UI Editor**, select an element in the **Hierarchy** pane\.

1. In the **Properties** panel, right\-click the component and click **Remove**\.

## Referencing UI Elements<a name="ui-editor-referencing-ui-elements"></a>

You can specify a UI element for some properties on components\. For example, you can specify UI elements for **Lua Script** properties\. 

![\[Properties in a Lua Script component.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-referencing-ui-elements-1.png)

You can specify elements as properties either by dragging the element into the property field or by using the pick object button\.

**To drag a UI element into a property**
+ In the **UI Editor**'s **Hierarchy** panel, select an element and drag it to the component property in the **Properties** panel\.

**To use the pick object button to reference a UI element**

1. In the **Properties** panel, next to the property to specify an element for, click the pick object button\.  
![\[Properties in a Lua Script component.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-referencing-ui-elements-2.png)

1. Select the element that you want from either the viewport or the **Hierarchy** panel\.

   The property populates with the UI element name\.

**To clear the element name from the property**
+ In the **Properties** panel, next to the property name, click **x**\.

After you specify a UI element as a property, you can select that element from the **Properties** panel\.

**To select a UI element from the **Properties** panel**
+ In the **Properties** panel, double\-click the element name\.

## Managing UI Components<a name="ui-editor-managing"></a>

You can use the context menu in the **Properties** panel to add, remove, cut, copy, and paste components\.

**To manage components from the context menu**

1. In the **Hierarchy** panel, select the UI element\.

1. In the **Properties** panel, either right\-click the component or click the menu button in the header\. Then choose one of the following:
   + **Add component** – Add a component to the element
   + **Delete component** – Remove a component from the element
   + **Cut component** – Cut a component from one UI element to be pasted onto a different UI element
   + **Copy component** – Copy a component from one UI element to be pasted onto a different UI element
   + **Paste component** – Paste a component copied from one UI element onto a different UI element

You can also use the context menu to act on multiple components at once\.

**To perform actions on multiple components**

1. Press **Ctrl** to select multiple components and then right\-click to open the context menu\.

1. Choose an action\.

**Note**  
The **Element** and **Transform2D** components are automatically added to a UI element and can't be removed from the component list\. 
Some actions are disabled, depending on the context\. For example, you can't paste a component if you haven't copied one\. 