# Get Wind Direction<a name="get-wind-direction-node"></a>

Returns the direction of the global wind\. The length of the **Wind Direction** vector indicates the strength of the wind\.

**Contents**
+ [Inputs](#get-wind-direction-node-input)
+ [Outputs](#get-wind-direction-node-output)

![\[getwinddirection, winddirectionnode, getwinddirectionnode\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-get-wind-direction-node.png)

## Inputs<a name="get-wind-direction-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 

## Outputs<a name="get-wind-direction-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 
| Wind Direction | Vector3 | Current global wind direction\. | 