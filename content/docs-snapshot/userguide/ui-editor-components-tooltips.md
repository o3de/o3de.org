# Tooltip Components<a name="ui-editor-components-tooltips"></a>

You can add either a **Tooltip** component or a **TooltipDisplay** component to an element\. With these components, you can display a tooltip when hovering over an interactive element\.

To see in\-game examples of completed canvases with **Tooltip** components, open the level UiFeatures in the project SamplesProject\. Press **Ctrl\+G** to play the game, and then choose **Components**, **Other Components**, **Tooltips**\. You can view examples of tooltip text options and display styles\. Press **Esc** to exit the game\.

To view these same canvases in the **UI Editor**, navigate to the `\Gems\LyShineExamples\Assets\UI\Canvases\LyShineExamples\Comp\Tooltips` directory\.

You can open the following canvases:
+ `TextOptions.uicanvas`
+ `Tooltips.uicanvas`

## Tooltip<a name="ui-editor-components-tooltips-tooltips"></a>

You can use a **Tooltip** component to provide the text of the tooltip\. Add a tooltip component to any interactive element that is to display a tooltip in the pause state\.

**To edit a tooltip component**

1. In the **Properties** pane of the [**UI Editor**](ui-editor-using.md), expand **Tooltip**\.

1. Enter a text string\.

## TooltipDisplay<a name="ui-editor-components-tooltipsdisplay"></a>

The **TooltipDisplay** component defines the tooltip's display behavior\. Add a **TooltipDisplay** component to the element that is to visually represent the tooltip\. You must also set the [**Tooltip display element**](ui-editor-canvas-properties.md#editor-properties-tooltips) property of the canvas to this element\. For more information, see [Configuring Canvas Properties](ui-editor-canvas-properties.md)\.

**To edit a TooltipDisplay component**
+ In the **Properties** pane of the [**UI Editor**](ui-editor-using.md), expand **TooltipDisplay** and use the following settings, as appropriate:  
**Trigger Mode \(v1\.24 and later\)**  
Select a tooltip trigger condition:  
  + **On Hover** – The tooltip appears when the pointer hovers over the interactive element, and disappears when the pointer moves off of the interactive element\.
  + **On Press** – The tooltip appears when the interactive element is pressed and held, and disappears when the press is released\. Note that the pointer might have moved elsewhere on the canvas by the time the release action has occurred\.
  + **On Click** – The tooltip appears when a pointer click, which includes a press and a release, occurs on the interactive element\. The tooltip disappears when the next pointer click occurs anywhere on the canvas\. Note that if the pointer clicks on the same entity, the tooltip disappears, but then reappears after the specified **Delay time**\.
On mobile devices, you might want to use **On Press** or **On Click** instead of **On Hover**\.
In all cases, the appearance of the tooltip is delayed by the amount of time specified in **Delay time**\. Furthermore, in all cases, the tooltip will disappear after a fixed amount of time set by Lumberyard, regardless of other criteria specified in the trigger conditions\.  
**Auto position**  
Automatically positions the element based on the positioning mode\. The positioning mode is specified in the **Positioning** property\.  
**Positioning**  
Select a positioning mode:  
  + **Offset from mouse** – Position the element so that its pivot is a certain distance from the pointer\. The distance is specified in the **Offset** property\.
  + **Offset from element** – Position the element so that its pivot is a certain distance from the pivot of the element that triggered the tooltip display\.  
**Offset**  
The offset to use when automatically positioning the element\.  
**Auto size**  
Automatically resizes the element to match the tooltip string's size\. The text element is a child of the element, and its text is specified in the **Text** property\. If **Auto size** is selected, then the text element’s anchors should be apart so that the text element can grow and shrink with its parent\.  
**Text**  
The child element that is to display a tooltip string\.  
**Delay time**  
The amount of time to wait before displaying the element\.  
**Display time**  
The amount of time the element is to be displayed\.  
**Show sequence**  
The animation sequence to be played when the element is about to appear\.  
**Hide sequence**  
The animation sequence to be played when the element is about to disappear\.