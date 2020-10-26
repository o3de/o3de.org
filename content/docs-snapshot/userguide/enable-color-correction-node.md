# Enable Color Correction<a name="enable-color-correction-node"></a>

Sets color correction parameters\. You can use this node to specify the CMYK, brightness, contrast, saturation, and hue in a scene\. Most color correction properties aren't updated smoothly, so it's recommended that you hide stronger color correction changes with cuts or fading between scenes\.

You can also apply color correction in the Track View\. See [Color Correction Node](cinematics-track-view-nodes-color-correction.md)\.

To disable the effect, see [Disable Color Correction](disable-color-correction-node.md)\.

**Contents**
+ [Inputs](#enable-color-correction-node-input)
+ [Outputs](#enable-color-correction-node-output)

![\[enableeffectcorrection\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-enable-color-correction-node.png)

**Example**  
In the following example, the **Saturation** value is `2.0`\.  

![\[Use the Enable Color Correction node to change colors for your screen.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/enable-color-correcton-node-example.png)

## Inputs<a name="enable-color-correction-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Cyan | Number | Adjusts cyan to enhance the color of the scene\. | 
| Magenta | Number | Adjusts magenta to enhance color of the scene\. | 
| Yellow | Number | Adjusts yellow to enhance color of the scene\. | 
| Luminance | Number | Adjusts luminance to enhance the color of the scene\. | 
| Brightness | Number | Adjusts brightness to enhance light and darkness of the scene\. | 
| Contrast | Number | Adjusts contrast to enhance the bias of highlights and shadows of the scene\. | 
| Saturation | Number | Adjusts saturation to enhance the color intensity of the scene\. | 
| Hue | Number | Adjusts hue to enhance the color globally\. | 

## Outputs<a name="enable-color-correction-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 