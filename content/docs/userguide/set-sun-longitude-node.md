---
description: ' Use the Set Sun Longitude node in the &ALYlong; &script-canvas; editor
  to set the sun longitude. '
title: Set Sun Longitude
---
# Set Sun Longitude {#set-sun-longitude-node}

Sets the sun's longitude in the sky\.

**Contents**
+ [Inputs](#set-sun-longitude-node-input)
+ [Outputs](#set-sun-longitude-node-output)

![\[setsunlongitudenode, setsunlongitude\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-sun-longitude-node.png)

## Inputs {#set-sun-longitude-node-input}


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Longitude | Number |  Sun longitude value to specify\.  | 
| Force Update | Boolean |  Forces an immediate update of the entire sky\. Use this input to make sudden changes to the sun position\. For more information, see [Environment Nodes](/docs/userguide/scripting/scriptcanvas/environment-nodes.md)\.  | 

## Outputs {#set-sun-longitude-node-output}


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node finishes\. | 