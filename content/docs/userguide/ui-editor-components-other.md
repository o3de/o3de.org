# Other Components<a name="ui-editor-components-other"></a>

You can add either or both of the fader and mask components to an element\.

**Topics**
+ [Fader](#ui-editor-components-fader)
+ [Mask](ui-editor-components-mask.md)
+ [Flipbook Animation](ui-editor-components-other-flipbook.md)

## Fader<a name="ui-editor-components-fader"></a>

You can use a **Fader** component to simultaneously adjust the transparency of an element and its children\. 

**To see in\-game examples of completed canvases with a **Fader** component**

1. [Open the Samples Project](configurator-projects.md#project-configurator-launch-projects)\.

1. When Lumberyard Editor has started, choose **File**, **Open** and open the UiFeatures level\.

1. Press **Ctrl\+G** to play the game\.

1. Choose **Components**, **Other Components**, **Fader**\. You can view an example of a direct fade and an animated fade\.

1. Press **Esc** to exit the game\.

**To view these same canvases in the **UI Editor****
+ Navigate to the `\Gems\LyShineExamples\Assets\UI\Canvases\LyShineExamples\Comp\Fader` directory\.

You can open the following canvases:
+ `AnimFade.uicanvas`
+ `DirectFade.uicanvas`

**To edit a fader component**

1. In the **Properties** pane of the [**UI Editor**](ui-editor-using.md), expand **Fader**\.

1. For the **Fade** multiplier, use the slider to select a number between `0` \(invisible\) and `1` \(opaque\) and press **Enter**\.