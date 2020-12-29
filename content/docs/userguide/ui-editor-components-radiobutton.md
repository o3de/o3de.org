# RadioButton<a name="ui-editor-components-radiobutton"></a>

You can use the **RadioButton** component to make an element behave like a radio button\. This component is typically used on an element with two visual child elements—one to display when the radio button is selected and another to display when the radio button is cleared\.

Use this component in conjunction with the **RadioButtonGroup** component\. The **RadioButtonGroup** component handles selecting and clearing the radio buttons in the group and makes sure that only one radio button is ever selected\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-components-radiobutton.png)

To see in\-game examples of completed canvases with the **RadioButton** component, open the level UiFeatures in the project SamplesProject\. Press **Ctrl\+G** to play the game, and then choose **Components**, **Interactable Components**, **RadioButton**\. You can view examples of different behaviors, default settings, and groups for radio buttons Press **Esc** to exit the game\.

To view these same canvases in the **UI Editor**, navigate to the `\Gems\LyShineExamples\Assets\UI\Canvases\LyShineExamples\Comp\RadioButton` directory\. You can open the following canvases:
+ `Groups.uicanvas` – Examples of different radio button groupings
+ `RadioButton.uicanvas` – Examples of different behaviors and default settings

**To edit a radio button component**  
In the **Properties** pane of the [**UI Editor**](ui-editor-using.md), expand **RadioButton** and do the following, as appropriate:    
**Interactable**  
See [Properties](ui-editor-components-interactive-properties.md) to edit the common interactive component settings\.  
**Elements**, **On**  
Select an element from the list to specify the entity that appears when the radio button state is on \(selected\)\.   
**Elements**, **Off**  
Select an element from the list to specify the entity that appears when the radio button state is off \(cleared\)\.   
**Elements**, **Group**  
Select an element from the list to specify the group the radio button belongs to\.  
**Value**, **Checked**  
Select the box to change the initial state of the radio button\.  
**Actions**, **Change**  
Enter a text string\. This string is sent as an action on the UI canvas when the radio button has any state changes\.  
**Actions**, **On**  
Enter a text string\. This string is sent as an action on the UI canvas when the radio button state changes to on \(selected\)\.  
**Actions**, **Off**  
Enter a text string\. This string is sent as an action on the UI canvas when the radio button state changes to off \(cleared\)\.