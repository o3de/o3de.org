# Slider<a name="ui-editor-slider-components"></a>

You can use the **Slider** component to make an element behave like a slider\. This component is typically applied to an element with three visual child elements: one immediate child, called **Track**, and two child elements of the track, called **Fill** and **Handle**\. 

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-slider-components.png)

To see in\-game examples of completed canvases with the **Slider** component, open the level UiFeatures in the project SamplesProject\. Press **Ctrl\+G** to play the game, and then choose **Components**, **Interactable Components**, **Slider**\. You can view examples of different slider behavior and positioning\. Press **Esc** to exit the game\.

To view these same canvases in the **UI Editor**, navigate to the `\Gems\LyShineExamples\Assets\UI\Canvases\LyShineExamples\Comp\Slider` directory\. You can open the following canvases:
+ `Behavior.uicanvas` – Examples of slider behaviors such as fill type, handles, and buttons to control the slider
+ `Rotation.uicanvas` – Example of slider positioning

You can add a prebuilt **Slider** element from the slice library\. When you do this, the slider's track, fill, and handle are automatically created in your **Hierarchy** pane\.

**To add a Slider element from the slice library**
+ In the [**UI Editor**](ui-editor-using.md), choose **New**, **Element from Slice Library**, **Slider**\.

**To edit a slider component**  
In the **Properties** pane of the [**UI Editor**](ui-editor-using.md), expand **Slider** and do the following, as appropriate:    
**Interactable**  
See [Properties](ui-editor-components-interactive-properties.md) to edit the common interactive component settings\.  
**Elements**, **Track**  
Select an element from the list to provide the background of the slider and to limit the movement of the manipulator\.  
**Elements**, **Fill**  
Select an element from the list to provide the background of the slider, from the lower limit to the center of the manipulator position\.  
**Elements**, **Manipulator**  
Select an element from the list to provide the movable knob of the slider\.  
**Value**, **Value**  
Enter the initial value of the slider\.  
**Value**, **Min**  
Enter the lower limit of the slider\.  
**Value**, **Max**  
Enter the upper limit of the slider\.  
**Value**, **Stepping**  
Enter the step value\. For example, use `1` to only permit whole integer values\.  
**Actions**, **Change**  
Enter a text string\. This string is sent as an action on the UI canvas when the slider has finished changing values\.  
**Actions**, **End Change**  
Enter a text string\. This string is sent as an action on the UI canvas when the slider has changing values\.