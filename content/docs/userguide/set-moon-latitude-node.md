# Set Moon Latitude<a name="set-moon-latitude-node"></a>

Sets the moon's latitude in the sky\.

**Contents**
+ [Inputs](#set-moon-latitude-node-input)
+ [Outputs](#set-moon-latitude-node-output)

![\[setmoonlatitude, setmoonlatitudenode\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-moon-latitude-node.png)

## Inputs<a name="set-moon-latitude-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Latitude | Number | Moon latitude value to specify\. | 
| Force Update | Boolean |  Forces an immediate update of the entire sky\. Use this parameter to make sudden changes to the moon position\. For more information, see [Environment Nodes](script-canvas-environment-nodes.md)\.  | 

## Outputs<a name="set-moon-latitude-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 