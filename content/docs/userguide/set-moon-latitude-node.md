---
description: ' Use the Set Moon Latitude node in the &ALYlong; &script-canvas; editor
  to set the moon latitude. '
title: Set Moon Latitude
---
# Set Moon Latitude {#set-moon-latitude-node}

Sets the moon's latitude in the sky\.

**Contents**
+ [Inputs](#set-moon-latitude-node-input)
+ [Outputs](#set-moon-latitude-node-output)

![\[setmoonlatitude, setmoonlatitudenode\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-moon-latitude-node.png)

## Inputs {#set-moon-latitude-node-input}


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Latitude | Number | Moon latitude value to specify\. | 
| Force Update | Boolean |  Forces an immediate update of the entire sky\. Use this parameter to make sudden changes to the moon position\. For more information, see [Environment Nodes](/docs/userguide/scripting/scriptcanvas/environment-nodes.md)\.  | 

## Outputs {#set-moon-latitude-node-output}


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 