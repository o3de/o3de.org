# Get Time<a name="get-time"></a>

Returns the current time of day for the level\. Time values are specified as decimal numbers from `0.0` to `24.0`\. For example, a value of `13.75` is 1:45 P\.M\. A value of `0.0` or `24.0` is 12:00 A\.M\.

**Contents**
+ [Inputs](#get-time-input)
+ [Outputs](#get-time-output)

![\[gettime gettimenode, gettimeofdaynode\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-get-time-node.png)

## Inputs<a name="get-time-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 

## Outputs<a name="get-time-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 
| Time | Number |  Time of day in hours\.  Default value: `0` Valid values: `0.0` to `24.0`  | 