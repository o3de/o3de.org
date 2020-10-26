# Enable Water Flow<a name="enable-water-flow-node"></a>

Draws water flowing down the entire screen\. You can use this node in situations where the player is standing under flowing water, such as a waterfall\.

To disable the effect, see [Disable Water Flow](disable-water-flow-node.md)\.

**Contents**
+ [Inputs](#enable-water-flow-note-input)
+ [Outputs](#enable-water-flow-node-output)

![\[enablewaterflow, enablewaterflownode\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-enable-water-flow-node.png)

**Example**  

![\[Use the Enable Water Flow node to simulate waterfall effects on the screen .\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/enable-water-flow-node-example.gif)

## Inputs<a name="enable-water-flow-note-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event |  Triggers the node\.  | 
| Amount | Number |  Amount of water\.  | 

## Outputs<a name="enable-water-flow-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 