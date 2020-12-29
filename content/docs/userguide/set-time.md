# Set Time<a name="set-time"></a>

Sets a time value for the time of day system\. Time values are specified as decimal numbers from `0.0` to `24.0`\. For example, a value of `13.75` is 1:45 P\.M\. A value of `0.0` or `24.0` is 12:00 A\.M\. Once the time of day is set, the time of day continues as specified by the speed setting\.

**Contents**
+ [Inputs](#set-time-input)
+ [Outputs](#set-time-output)

![\[settimenode, settime, settimeofdaynode, settimeofday\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-time-node.png)

## Inputs<a name="set-time-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Time | Number |  Time of day in hours\. Default value: `0` Valid values: `0.0` to `24.0`  | 
| Force Update | Boolean |  If `true`, the entire sky updates immediately in the current frame; otherwise, the sky is rendered across several frames\. Default value: `False`  | 

## Outputs<a name="set-time-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 