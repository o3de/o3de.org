# Enable Sharpen<a name="enable-sharpen-node"></a>

Applies a sharpen filter\. You can specify a negative value to blur the screen\.

To disable the effect, see [Disable Sharpen](disable-sharpen-node.md)\.

**Contents**
+ [Inputs](#enable-sharpen-note-input)
+ [Outputs](#enable-sharpen-node-output)

![\[enablesharpennode, enablesharpen\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-enable-sharpen-node.png)

**Example**  

![\[Use the Enable Sharpen node to sharpen the game details.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/enable-sharpen-node-example.png)

## Inputs<a name="enable-sharpen-note-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event |  Triggers the node\.  | 
| Amount | Number |  Amount of sharpening\. Default value: `1`  | 

## Outputs<a name="enable-sharpen-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 