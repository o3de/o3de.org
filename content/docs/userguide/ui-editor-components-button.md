# Button<a name="ui-editor-components-button"></a>

You can use a **Button** component to make an element behave like a button\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-components-button.png)

To see an in\-game example of a completed canvas with the **Button** component, open the level UiFeatures in the project SamplesProject\. Press **Ctrl\+G** to play the game, and then choose **Components**, **Interactable Components**, **Button**\. You can view the different types of buttons you can create\. Press **Esc** to exit the game\.

To view this same canvas in the **UI Editor**, open `\Gems\LyShineExamples\Assets\UI\Canvases\LyShineExamples\Comp\Button\Styles.uicanvas`\.

Note the following:
+ This component is typically applied to an element with an image component; if no visual or image component is present, many of the button's properties have no effect\.

   
+ If you want to add a text label to a button, add a child element with a text component\.

   
+ To define borders for a sliced image type, open the **Sprite Editor**\. To do this, click the arrow \(open\-in\) ![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/game_ui_editor/ui-editor-components-button-1.png) next to **Sprite path**\.

You can add a prebuilt **Button** element from the slice library\. When you do this, a basic button with the text string "Button" is automatically created in your **Hierarchy** pane\.

**To add a Button element from the slice library**
+ In the [**UI Editor**](ui-editor-using.md), choose **New**, **Element from Slice Library**, **Button**\.

**To edit a button component**  
In the [**UI Editor**](ui-editor-using.md) **Properties** pane, expand **Button** and do the following, as appropriate:    
****Interactable****  
See [Properties](ui-editor-components-interactive-properties.md) to edit the common interactive component settings\.  
****Actions**, **Click****  
Enter a text string\. This string is sent as an action on the UI canvas when the button is clicked\.