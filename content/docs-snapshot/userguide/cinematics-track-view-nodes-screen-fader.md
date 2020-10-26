# Screen Fader Node<a name="cinematics-track-view-nodes-screen-fader"></a>

Use the **Screen Fader** node to fade the screen in and out in a scene\.

**To add a Screen Fader node in the Track View**

1. In the Track View, right\-click the sequence \(top node\) or the **Director** node in the tree as applicable, and then choose **Add Screen Fader**\.

1. Click the **Fader** key under the **ScreenFader** node\.

1. Double\-click to position the key on its highlighted row in the timeline\.

1. Double\-click the green marker, and under **Key Properties**, enter a value for **Value**\.


**Screen Fader Node Key Properties**  

| Property | Description | 
| --- | --- | 
| Type | Specifies either FadeIn or FadeOut values\. | 
| ChangeType |  For this transition type, you can specify one of the following:  [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/cinematics-track-view-nodes-screen-fader.html)  | 
| Color | Specifies the RGB value used for fading\. | 
| Duration | Specifies how long it takes to fade in or out the screen\. | 
| Texture |  Specifies a texture file to use as a screen overlay\. An alpha texture is commonly used for effects like dirt or blood\. The texture is multiplied by the color value to allow you to animate the brightness during the fade\.  | 
| Use Current Color | Ignores the Color property and uses the color of the previous key instead\. | 