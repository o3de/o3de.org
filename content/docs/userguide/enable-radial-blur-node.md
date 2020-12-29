# Enable Radial Blur<a name="enable-radial-blur-node"></a>

 Enables the radial blur filter around a defined 2D position on the screen\. To enable this feature, you must enable the `r_MotionBlur` console variable\. For more information, see [Using the Console Window](console-intro.md)\.

To disable the effect, see [Disable Radial Blur](disable-radial-blur-node.md)\.

**Contents**
+ [Inputs](#enable-radial-blur-node-input)
+ [Outputs](#enable-radial-blur-node-output)

![\[enableradialblurnode, enableradialblur\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-enable-radial-blur-node.png)

**Example**  

![\[Use the Enable Radial Blur node to add blur radius on the screen.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/enable-radial-blur-node-example.png)

## Inputs<a name="enable-radial-blur-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event |  Triggers the node\.  | 
| Amount | Number |  Amount of blurring\. Default value: `1`  | 
| Screen Position | Vector2 |  Screen position of the center of the blur\. Default value: \(`0.5`, `0.5`\) This is the center of the screen\.  | 
|  Radius  | Number |  Blurring radius\. Default value: `1`  | 

## Outputs<a name="enable-radial-blur-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 