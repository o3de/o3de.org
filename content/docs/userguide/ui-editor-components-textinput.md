# TextInput<a name="ui-editor-components-textinput"></a>

You can use a **TextInput** component to make an element offer player input\. This component is typically applied to an element with an image component and two child elements with text components \(one for placeholder text and one for input text\)\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-components-textinput.png)

To see in\-game examples of completed canvases with the **TextInput** component, open the level UiFeatures in the project SamplesProject\. Press **Ctrl\+G** to play the game, and then choose **Components**, **Interactable Components**, **TextInput**\. You can view examples of different types of text input behavior on single lines and on multiple lines\. Press **Esc** to exit the game\.

To view these same canvases in the **UI Editor**, navigate to the `\Gems\LyShineExamples\Assets\UI\Canvases\LyShineExamples\Comp\TextInput` directory\. You can open the following canvases:
+ `Multiline.uicanvas` – Examples of editing multiline text strings
+ `SingleLine.uicanvas` – Example of editing single\-line text strings

You can add a prebuilt **TextInput** element from the slice library\. When you do this, a text input box, pause\-on state, and placeholder text "Type here\.\.\." are automatically created in your **Hierarchy** pane\.

**To add a TextInput element from the slice library**
+ In the [**UI Editor**](ui-editor-using.md), choose **New**, **Element from Slice Library**, **TextInput**\.

**To edit a text input component**  
In the **Properties** pane of the [**UI Editor**](ui-editor-using.md), expand **TextInput** and do the following, as appropriate:    
**Interactable**  
See [Properties](ui-editor-components-interactive-properties.md) to edit the common interactive component settings\.  
**Elements**, **Text**  
Select an element from the list to provide the text component for the input text\. The list shows child elements that have text components\.   
**Elements**, **Placeholder text element**  
Select an element from the list to provide the text component for the placeholder text\. The list shows child elements that have text components\.   
**Text editing**, **Selection color**  
Click the color swatch to select a different color for the selected text\.  
**Text editing**, **Cursor color**  
Click the color swatch to select a different color for the cursor\.  
**Text editing**, **Max char count**  
Enter the maximum number of characters allowed in the text input box\. Type `-1` for no character limit\.  
**Text editing**, **Cursor blink time**  
Enter a value in seconds\. Use `0` for no blink, `1` to blink once every second, `2` to blink once every two seconds, etc\.  
**Text editing**, **Is password field**  
Select the box and specify the replacement character\.  
**Text editing**, **Clip input text**  
Sets the **Overflow mode** of the text element to **Clip text** at runtime\.  
**Actions**, **Change**  
Enter a text string\. This string is sent as an action on the UI canvas whenever a change occurs in the text input, such as typing or deleting a character\.   
**Actions**, **End edit**  
Enter a text string\. This string is sent as an action on the UI canvas whenever the player clicks off the text input or presses **Enter**\.   
**Actions**, **Enter**  
Enter a text string\. This string is sent as an action on the UI canvas when the player presses **Enter**\. 