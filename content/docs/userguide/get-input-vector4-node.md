---
description: ' Use the Get Input Vector4 node in the Amazon Lumberyard Script Canvas editor
  to return the value of a procedural material input parameter as a Vector4. '
title: Get Input Vector4
---
# Get Input Vector4 {#get-input-vector4-node}

Returns the value of an input parameter as a Vector4\. Use this node with the `Float4` and `Integer4` substance data types\.

**Note**
You can use this node with all substance data types: `Float1` through `Float4` and `Integer1` through `Integer4`\. However, if the input parameter has fewer dimensions, the extra dimensions are assigned a value of `0`\.

**Contents**
+ [Inputs](#get-input-vector4-node-input)
+ [Outputs](#get-input-vector4-node-output)

![\[GetInputVector4 gets the Vector4 value for a procedural material's parameter.\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-get-input-vector4-node.png)

## Inputs {#get-input-vector4-node-input}


****

| Pin | Type | Description |
| --- | --- | --- |
| In | Event | Triggers the node\. |
| Procedural Material | Procedural material | The procedural material to query\. |
| Input Name | String | The name of the input parameter to return\. |

## Outputs {#get-input-vector4-node-output}


****

| Pin | Type | Description |
| --- | --- | --- |
| Out | Event | Sends when the node is finished\. |
| Vector4 | Vector4 |  The value of the specified input parameter\.  Returns `0` if the value can't be found\.  |