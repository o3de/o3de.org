# Enable Frost<a name="enable-frost-node"></a>

Display spots of frost on the screen\.

To disable the effect, see [Disable Frost](disable-frost-node.md)\.

**Contents**
+ [Inputs](#enable-frost-note-input)
+ [Outputs](#enable-frost-node-output)

![\[enablefrost, enablefrostnode\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-enable-frost-node.png)

**Example**  

![\[Use the Enable Frost node to enable frost on the screen.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/enable-frost-node-example.png)

## Inputs<a name="enable-frost-note-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event |  Triggers the node\.  | 
| Amount | Number |  Amount of frost\. Default value: `0`  | 
| Center Amount | Number |  Amount of frost at the center of the screen\. Default value: `1`  | 

## Outputs<a name="enable-frost-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 