# Set Moon Longitude<a name="set-moon-longitude-node"></a>

Sets the moon's longitude in the sky\.

**Contents**
+ [Inputs](#set-moon-longitude-node-input)
+ [Outputs](#set-moon-longitude-node-output)

![\[setmoonlongitude, setmoonlongitudenode\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-moon-longitude-node.png)

## Inputs<a name="set-moon-longitude-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Longitude | Number | Moon longitude value to specify\. | 
| Force Update | Boolean |  Forces an immediate update of the entire sky\. Use this parameter to make sudden changes to the moon position\. For more information, see [Environment Nodes](script-canvas-environment-nodes.md)\.  | 

## Outputs<a name="set-moon-longitude-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 