# Enable Rain Drops<a name="enable-rain-drops-node"></a>

Apply raindrops on the screen\.

To disable the effect, see [Disable Rain Drops](disable-rain-drops-node.md)\.

**Contents**
+ [Inputs](#enable-rain-drops-note-input)
+ [Outputs](#enable-rain-drops-node-output)

![\[enableraindrops, enableraindropsnode\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-enable-rain-drops-node.png)

**Example**  

![\[Use the Enable Rain Drops node to enable raindrops falling on the screen.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/enable-rain-drops-node-example.gif)

## Inputs<a name="enable-rain-drops-note-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event |  Triggers the node\.  | 
| Amount | Number |  Enables raindrops\. A value of `0` disables raindrops\. Default value: `1`  | 
| Spaw Time Distance | Number |  Sets the spawn time distance for the raindrops\.  Default value: `0.35` For example, a value of `0.35` means the node waits at least `0.35` seconds between drops\.  | 
|  Size  | Number |  Specifies the raindrop size\. Default value: `5.0`  | 
| Size Variation | Number |  Sets raindrops variation\. Default value: `2.5`  | 

## Outputs<a name="enable-rain-drops-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 