# Checkbox<a name="ui-editor-checkbox-components"></a>

You can use the **Checkbox** component to make an element behave like a check box\. This component is typically applied to an element with two visual child elements: One element appears when the check box is selected and another appears when the check box is cleared\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-checkbox-components.png)

To see in\-game examples of completed canvases with the **Checkbox** component, open the level UiFeatures in the project SamplesProject\. Press **Ctrl\+G** to play the game, and then choose **Components**, **Interactable Components**, **CheckBox**\. You can view examples of color targets, check box interaction areas, and on and off elements\. Press **Esc** to exit the game\.

To view these same canvases in the **UI Editor**, navigate to the `\Gems\LyShineExamples\Assets\UI\Canvases\LyShineExamples\Comp\CheckBox` directory\. You can open the following canvases:
+ `Area.uicanvas` – Examples of different check box interaction areas
+ `ColorTargets.uicanvas` – Examples of different color targets when interacting with the check box
+ `OnOff.uicanvas` – Examples of different check box on and off elements

You can add a prebuilt **Checkbox** element from the slice library\. When you do this, a basic check box with the text string "Checkbox" and a check image for the box is automatically created in your **Hierarchy** pane\.

**To add a Checkbox element from the slice library**
+ In the [**UI Editor**](ui-editor-using.md), choose **New**, **Element from Slice Library**, **Checkbox**\.

**To edit a check box component**  
In the **Properties** pane of the [**UI Editor**](ui-editor-using.md), expand **Checkbox** and do the following, as appropriate:    
**Interactable**  
See [Properties](ui-editor-components-interactive-properties.md) to edit the common interactive component settings\.  
**Elements**, **On**  
Select an element from the list to specify the entity that appears when the check box state is `on` \(selected\)\.  
**Elements**, **Off**  
Select an element from the list to specify the entity that appears when the check box state is `off` \(cleared\)\.  
**Value, Checked**  
Select the box to change the initial state of the check box\.  
**Actions**, **Change**  
Enter a text string\. This string is sent as an action on the UI canvas when the check box has any state changes\.  
**Actions**, **On**  
Enter a text string\. This string is sent as an action on the UI canvas when the check box state changes to `on` \(selected\)\.  
**Actions**, **Off**  
Enter a text string\. This string is sent as an action on the UI canvas when the check box state changes to `off` \(cleared\)\.