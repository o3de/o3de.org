# Set Sun Latitude<a name="set-sun-latitude-node"></a>

Sets the sun's latitude in the sky\.

**Contents**
+ [Inputs](#set-sun-latitude-node-input)
+ [Outputs](#set-sun-latitude-node-output)

![\[setsunlatitudenode, setsunlatitude\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-sun-latitude-node.png)

## Inputs<a name="set-sun-latitude-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node | 
| Latitude | Number |  Sun latitude value to specify\.  | 
| Force Update | Boolean |  Forces an immediate update of the entire sky\. Use this parameter to make sudden changes to the sun position\. For more information, see [Environment Nodes](script-canvas-environment-nodes.md)\.  | 

## Outputs<a name="set-sun-latitude-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 