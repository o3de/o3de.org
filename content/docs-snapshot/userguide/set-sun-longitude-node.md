# Set Sun Longitude<a name="set-sun-longitude-node"></a>

Sets the sun's longitude in the sky\.

**Contents**
+ [Inputs](#set-sun-longitude-node-input)
+ [Outputs](#set-sun-longitude-node-output)

![\[setsunlongitudenode, setsunlongitude\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-sun-longitude-node.png)

## Inputs<a name="set-sun-longitude-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Longitude | Number |  Sun longitude value to specify\.  | 
| Force Update | Boolean |  Forces an immediate update of the entire sky\. Use this input to make sudden changes to the sun position\. For more information, see [Environment Nodes](script-canvas-environment-nodes.md)\.  | 

## Outputs<a name="set-sun-longitude-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node finishes\. | 