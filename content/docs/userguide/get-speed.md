---
description: ' Use the Get Speed node in the &ALYlong; &script-canvas; editor to return
  the speed multiplier for the time of day. '
title: Get Speed
---
# Get Speed {#get-speed}

Returns the current time of day speed multiplier\. The value is specified in conversion units of hours per second\. For example, a value of `1` runs through an entire time of day cycle in 24 seconds\.

**Contents**
+ [Inputs](#get-speed-input)
+ [Outputs](#get-speed-output)

![\[getspeed, getspeednode\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-get-speed-node.png)

## Inputs {#get-speed-input}


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 

## Outputs {#get-speed-output}


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 
| Speed | Number | Current speed multiplier that determines how quickly the time of day changes\. | 