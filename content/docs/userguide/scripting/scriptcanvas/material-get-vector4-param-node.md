---
description: ' Use the Get Param Vector4 node in the Amazon Lumberyard Script Canvas editor
  to return a material parameter as a Vector4 value. '
title: Get Param Vector4
---
# Get Param Vector4 {#script-canvas-material-get-vector4-param-node}

Returns a material parameter as a **Vector4** value\.

**Contents**
+ [Inputs](#script-canvas-material-get-vector4-param-node-input)
+ [Outputs](#script-canvas-material-get-vector4-param-node-output)

![\[getparamvector4, getparamvector4node\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-get-param-vector4-node.png)

## Inputs {#script-canvas-material-get-vector4-param-node-input}


****

| Pin | Type | Description |
| --- | --- | --- |
| In | Event | Triggers the node\. |
| Material | Material |  The material to query\.  |
| Param Name | String |  The name of the material parameter to return\. For more information, see [Finding the Material Parameter Name](/docs/userguide/materials/param-names.md)\.  |

## Outputs {#script-canvas-material-get-vector4-param-node-output}


****

| Pin | Type | Description |
| --- | --- | --- |
| Out | Event | Sends when the node is finished\. |
| Vector4 | Vector4 | The queried value\. If the parameter is not found, the value is \(0, 0, 0, 0\)\. |