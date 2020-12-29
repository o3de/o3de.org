# Enable Ghosting<a name="enable-ghosting-node"></a>

Apply a ghosting effect that overlaps and blurs previous frames together\.

To disable the effect, see [Disable Ghosting](disable-ghosting-node.md)\.

**Contents**
+ [Inputs](#enable-ghosting-note-input)
+ [Outputs](#enable-ghosting-node-output)

![\[enableghosting, enableghostingnode\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-enable-ghosting-node.png)

**Example**  

![\[Use the Enable Ghosting node to add blurriness as you move the camera.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/enable-ghosting-node-example.gif)

## Inputs<a name="enable-ghosting-note-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event |  Triggers the node\.  | 
| Amount | Number |  Strength of the ghosting effect\. Default value: `0`  | 

## Outputs<a name="enable-ghosting-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 