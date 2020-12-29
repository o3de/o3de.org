# Set Speed<a name="set-speed"></a>

Sets the current time of day speed multiplier\. The value is specified in conversion units of hours per second\. 

For example, a value of `0.0` stops automatic time progression, although you can change the time manually with the **[Set Time](set-time.md)** node\. 

A value of `1.0` runs through an entire time of day cycle in 24 seconds\. 

**Note**  
To make simulations similar to real\-world time, specify a value of `0.0003`\.

**Contents**
+ [Inputs](#set-speed-input)
+ [Outputs](#set-speed-output)

![\[setspeednode, setspeed, settimeofdayspeed\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-speed-node.png)

## Inputs<a name="set-speed-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Speed | Number |  The speed multiplier that determines how quickly the time of day changes\. Default value: `0` Valid values: `0.0` to `100.0`  | 

## Outputs<a name="set-speed-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 