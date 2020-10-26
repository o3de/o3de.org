# Draggable<a name="ui-editor-components-draggable"></a>

You can use the **Draggable** component to make a UI element movable from one location to another on screen\. Use the **Draggable** component in combination with the **DropTarget** component so that dragging can start on the draggable element and end on the drop target element\. Drag\-and\-drop is a common operation in UI screens, such as an inventory system\.

Because drag\-and\-drop behavior is game specific, the **Draggable** and **DropTarget** components are designed to be used with scripting or C\+\+ to define actions that result from the drag and the drop\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-components-draggable.gif)

To add the draggable component to a UI element, use the **Add Component** menu in the **Properties** pane\. 

The following picture shows an example of a **Draggable** component, where color has been added to the state actions for **Drag States**\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-components-drag-drop-draggable.png)

The **Draggable** component is an interactive component\. It has the standard [interactive properties](ui-editor-components-interactive-properties.md)\.

**To edit a Draggable component**  
In the **Properties** pane of the [**UI Editor**](ui-editor-using.md), expand **Draggable** and do the following, as appropriate:    
**Interactable**  
See [Properties](ui-editor-components-interactive-properties.md) to edit the common interactive component settings\.  
**Drag States**  
Define the color, alpha, sprite, or font of this element and its child elements for a particular drag state\.  
When it is not being dragged, an element with a draggable component uses the interactable states \(pause on, pressed, and disabled\)\.  
When being dragged, however, the draggable component has an additional three states:  
+ **Normal** – Automatic state when a drag state begins\.

   
+ **Valid** – Typically the state used when the draggable component pauses on a valid drop target\. This state is determined by a script that you write or C\+\+ code that connects to the `UiDropTargetNotificationBus` and listens for the `OnDropHoverStart` method\. 

   
+ **Invalid** – Typically the state used when a draggable component pauses over an invalid drop target\. This state is determined by a script that you write or C\+\+ code\. When a valid drag state is triggered, a notification is automatically sent using the `UiDropTargetNotificationBus`\.

   
The script or C\+\+ can use the `UiDraggableBus` to set the drag state of the **Draggable** component\. It can also set the drop state of the **DropTarget** to indicate valid drop targets to the user\.  
To see an example of simple drag Lua script, open `DraggableElement.lua` in `Gems\LyShineExamples\Assets\UI\Scripts\LyShineExamples\DragAndDrop`\.