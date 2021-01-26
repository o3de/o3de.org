---
description: ' Use the Get Input Number node in the Amazon Lumberyard Script Canvas editor
  to return the value of a procedural material input parameter as a number. '
title: Get Input Number
---
# Get Input Number {#get-input-number-node}

Returns the value of an input parameter as a number\. Use this node with the `Float1` and `Integer1` substance data types\.

**Note**
You can use this node with all substance data types: `Float1` through `Float4` and `Integer1` through `Integer4`\. However, if the dimensions don't match, the extra dimensions from the input parameter are ignored\.

**Contents**
+ [Inputs](#get-input-number-node-input)
+ [Outputs](#get-input-number-node-output)

![\[GetInputNumber gets the numeric value for a procedural material's parameter.\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-get-input-number-node.png)

## Inputs {#get-input-number-node-input}


****

| Pin | Type | Description |
| --- | --- | --- |
| In | Event | Triggers the node\. |
| Procedural Material | Procedural material | The procedural material to query\. |
| Input Name | String | The name of the input parameter to return\. |

## Outputs {#get-input-number-node-output}


****

| Pin | Type | Description |
| --- | --- | --- |
| Out | Event | Sends when the node is finished\. |
| Number | Number |  The value of the specified input parameter\.  Returns `0` if the value can't be found\.  |