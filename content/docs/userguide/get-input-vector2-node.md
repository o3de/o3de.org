---
description: ' Use the Get Input Vector2 node in the Amazon Lumberyard Script Canvas editor
  to return the value of a procedural material input parameter as a Vector2. '
title: Get Input Vector2
---
# Get Input Vector2 {#get-input-vector2-node}

Returns the value of an input parameter as a Vector2\. Use this node with the `Float2` and `Integer2` substance data types\.

**Note**
You can use this node with all substance data types: `Float1` through `Float4` and `Integer1` through `Integer4`\. However, if the input parameter has fewer dimensions, the extra dimensions are assigned a value of `0`\. If there are more dimensions, they are ignored\.

**Contents**
+ [Inputs](#get-input-vector2-node-input)
+ [Outputs](#get-input-vector2-node-output)

![\[GetInputVector2 gets the Vector2 value for a procedural material's parameter.\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-get-input-vector2-node.png)

## Inputs {#get-input-vector2-node-input}


****

| Pin | Type | Description |
| --- | --- | --- |
| In | Event | Triggers the node\. |
| Procedural Material | Procedural material | The procedural material to query\. |
| Input Name | String | The name of the input parameter to return\. |

## Outputs {#get-input-vector2-node-output}


****

| Pin | Type | Description |
| --- | --- | --- |
| Out | Event | Sends when the node is finished\. |
| Vector2 | Vector2 |  The value of the specified input parameter\.  Returns `0` if the value can't be found\.  |