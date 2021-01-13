---
description: ' Use the Set Moon Longitude node in the &ALYlong; &script-canvas; editor
  to set the moon latitude. '
title: Set Moon Longitude
---
# Set Moon Longitude {#set-moon-longitude-node}

Sets the moon's longitude in the sky\.

**Contents**
+ [Inputs](#set-moon-longitude-node-input)
+ [Outputs](#set-moon-longitude-node-output)

![\[setmoonlongitude, setmoonlongitudenode\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-moon-longitude-node.png)

## Inputs {#set-moon-longitude-node-input}


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Longitude | Number | Moon longitude value to specify\. | 
| Force Update | Boolean |  Forces an immediate update of the entire sky\. Use this parameter to make sudden changes to the moon position\. For more information, see [Environment Nodes](/docs/userguide/scripting/scriptcanvas/environment-nodes.md)\.  | 

## Outputs {#set-moon-longitude-node-output}


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 