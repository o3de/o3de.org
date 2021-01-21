---
description: ' Use the Set Sun Latitude node in the &ALYlong; &script-canvas; editor
  to set the sun latitude. '
title: Set Sun Latitude
---
# Set Sun Latitude {#set-sun-latitude-node}

Sets the sun's latitude in the sky\.

**Contents**
+ [Inputs](#set-sun-latitude-node-input)
+ [Outputs](#set-sun-latitude-node-output)

![\[setsunlatitudenode, setsunlatitude\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-sun-latitude-node.png)

## Inputs {#set-sun-latitude-node-input}


****

| Pin | Type | Description |
| --- | --- | --- |
| In | Event | Triggers the node |
| Latitude | Number |  Sun latitude value to specify\.  |
| Force Update | Boolean |  Forces an immediate update of the entire sky\. Use this parameter to make sudden changes to the sun position\. For more information, see [Environment Nodes](/docs/userguide/scripting/scriptcanvas/environment-nodes.md)\.  |

## Outputs {#set-sun-latitude-node-output}


****

| Pin | Type | Description |
| --- | --- | --- |
| Out | Event | Sends when the node is finished\. |