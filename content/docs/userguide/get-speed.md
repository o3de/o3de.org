# Get Speed<a name="get-speed"></a>

Returns the current time of day speed multiplier\. The value is specified in conversion units of hours per second\. For example, a value of `1` runs through an entire time of day cycle in 24 seconds\.

**Contents**
+ [Inputs](#get-speed-input)
+ [Outputs](#get-speed-output)

![\[getspeed, getspeednode\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-get-speed-node.png)

## Inputs<a name="get-speed-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 

## Outputs<a name="get-speed-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 
| Speed | Number | Current speed multiplier that determines how quickly the time of day changes\. | 