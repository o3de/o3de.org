# DropTarget<a name="ui-editor-components-drop-target"></a>

You can use the **DropTarget** component to implement drag\-and\-drop behavior with the **Draggable** component\.

Because drag\-and\-drop behavior is game specific, the **Draggable** and **DropTarget** components are designed to be used with scripting or C\+\+ to define actions that result from the drag and the drop\.

To add the **DropTarget** component to a UI element, use the **Add Component** menu in the **Properties** pane\. 

The following picture shows an example of a **DropTarget** component, where color has been added to the state actions for **Drop States**\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-components-drag-drop-droptarget.png)

The **DropTarget** component shares properties with interactive components, such as state actions and navigation settings\.

**To edit a DropTarget component**  
In the **Properties** pane of the [**UI Editor**](ui-editor-using.md), expand **DropTarget** and do the following, as appropriate:    
**Drop States**  
Define the color, alpha, sprite, or font of this element and its child elements in a valid or invalid drop state\. By default, the drop state of a drop target is normal, which means that there are no visual overrides\.  
During a drop, the drop target component can be **Valid** or **Invalid**\. Because the drop target component has no knowledge of what is a valid drag\-and\-drop operation, you use a script or C\+\+ to switch the drop target into the **Normal**, **Valid**, and **Invalid** states\. This is usually accomplished by connecting to the `UiDropTargetNotifications` bus and listening for the `OnDropHoverStart` and `OnDropHoverEnd` notifications\.  
**Navigation**  
Navigation settings control how keyboard or gamepad navigation works during a drag\-and\-drop operation\. When using the keyboard, you can press **Enter** on a draggable element to enter drag mode\. Then you can use the arrow keys to move the element from one drop target to another using the navigation settings specified here\.  
**Actions, On Drop**  
Enter a text string\. This string is sent as an action on the UI canvas whenever a draggable is dropped on this drop target\. For better control, we recommend that you use the `UiDropTargetNotifications` bus instead\.
To see an example of simple drop target Lua script, open `DropTarget.lua` in `Gems\LyShineExamples\Assets\UI\Scripts\LyShineExamples\DragAndDrop`\.