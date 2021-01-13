---
description: ' Use the Set Time node in the &ALYlong; &script-canvas; editor to set
  the time of day system''s current time value. '
title: Set Time
---
# Set Time {#set-time}

Sets a time value for the time of day system\. Time values are specified as decimal numbers from `0.0` to `24.0`\. For example, a value of `13.75` is 1:45 P\.M\. A value of `0.0` or `24.0` is 12:00 A\.M\. Once the time of day is set, the time of day continues as specified by the speed setting\.

**Contents**
+ [Inputs](#set-time-input)
+ [Outputs](#set-time-output)

![\[settimenode, settime, settimeofdaynode, settimeofday\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-time-node.png)

## Inputs {#set-time-input}


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Time | Number |  Time of day in hours\. Default value: `0` Valid values: `0.0` to `24.0`  | 
| Force Update | Boolean |  If `true`, the entire sky updates immediately in the current frame; otherwise, the sky is rendered across several frames\. Default value: `False`  | 

## Outputs {#set-time-output}


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 