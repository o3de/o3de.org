---
description: ' Use the Get Wind Direction node in the Amazon Lumberyard Script Canvas editor
  to return the global wind direction. '
title: Get Wind Direction
---
# Get Wind Direction {#get-wind-direction-node}

Returns the direction of the global wind\. The length of the **Wind Direction** vector indicates the strength of the wind\.

**Contents**
+ [Inputs](#get-wind-direction-node-input)
+ [Outputs](#get-wind-direction-node-output)

![\[getwinddirection, winddirectionnode, getwinddirectionnode\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-get-wind-direction-node.png)

## Inputs {#get-wind-direction-node-input}


****

| Pin | Type | Description |
| --- | --- | --- |
| In | Event | Triggers the node\. |

## Outputs {#get-wind-direction-node-output}


****

| Pin | Type | Description |
| --- | --- | --- |
| Out | Event | Sends when the node is finished\. |
| Wind Direction | Vector3 | Current global wind direction\. |