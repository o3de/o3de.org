# Image<a name="ui-editor-components-image"></a>

You can use an **Image** component to add a color tint or texture to an element\.

**To see in\-game examples of completed canvases with **Image** components**

1. In Lumberyard Editor, in the [Samples Project](sample-project-samples.md), open the UiFeatures level\.

1. Press **Ctrl\+G** to play the game and then choose f**Components**, and then **Visual Components**, and then **Image**\. 

   You can view examples of image types such as sliced, stretched, fixed, tiled, stretched to fit, and stretched to fill\.

1. Press **Esc** to exit the game\.

To view these same canvases in the **UI Editor**, navigate to the `lumberyard_version\dev\Gems\LyShineExamples\Assets\UI\Canvases\LyShineExamples\Comp\Image` directory\.

You can open the following canvases:
+ `ColorTest.uicanvas`
+ `ImageTypes.uicanvas`

Use the **Properties** pane of the [UI Editor](https://docs.aws.amazon.com/lumberyard/latest/userguide/ui-editor-using.html) to configure the following settings for the **Image** component\.


**Image Settings**  

| Name | Description | 
| --- | --- | 
| SpriteType |  Select one of the following: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/ui-editor-components-image.html)  | 
| Sprite path |  Click the browse \(**…**\) icon and select a suitable file\. Click the open\-in \(arrow\) icon next to **Sprite path** to open the [Sprite Editor](ui-editor-sprite-editor.md)\.  | 
| Render target name |  Enter a name of a render target and press **Enter**\. For more information, see [Adding a Render Target to a UI Element](component-render-to-texture.md#adding-render-target-to-UI-element)\.  | 
| Index |  The sprite sheet image index that the component will render\.  | 
| Color |  Click the color swatch to select a different color\.  Displays only if the **SpriteType** is **Sprite/Texture asset** and the image has been configured as a sprite sheet using the [Sprite Editor](ui-editor-sprite-editor.md)\.  | 
| Alpha |  Use the slider to choose an alpha value between **0** and **1**\.  | 
| Image type |  Select one of the following:  [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/ui-editor-components-image.html)  | 
| Blend Mode |  Select one of the following:  [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/ui-editor-components-image.html)  | 
| Fill Type |  Select one of the following:  [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/ui-editor-components-image.html)  | 
| Fill Amount |  The amount of the image to be filled, from `0.00` to `1.00`\.  | 
| Fill Start Angle |  The start angle for the fill, measured in degrees clockwise from vertical\.  | 
| Corner Fill Origin |  The starting corner that the image is filled from\. Select one of the following: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/ui-editor-components-image.html)  | 
| Edge Fill Origin |  The edge from which the image is filled about \(radial corner\) or from \(linear\)\. Select one of the following: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/ui-editor-components-image.html)  | 
| Fill Clockwise |  If selected, the image is radially filled clockwise about the fill center\.  | 
| Fill Center |  If selected, the center segment of a slice\-resized sprite is visible\.  | 