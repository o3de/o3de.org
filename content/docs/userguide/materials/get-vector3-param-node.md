---
description: ' Use the Get Param Vector3 node in the Amazon Lumberyard Script Canvas editor
  to return a material parameter as a Vector3 value. '
title: Get Param Vector3
---
# Get Param Vector3 {#material-get-vector3-param-node}

Returns a material parameter as a **Vector3** value\.

**Contents**
+ [Inputs](#material-get-vector3-param-node-input)
+ [Outputs](#material-get-vector3-param-node-output)

![\[getparamvector3, getvector3param, getparamvector3node\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-get-param-vector3-node.png)

## Inputs {#material-get-vector3-param-node-input}


****

| Pin | Type | Description |
| --- | --- | --- |
| In | Event | Triggers the node\. |
| Material | Material |  The material to query\.  |
| Param Name | String |  The name of the material parameter to return\. For more information, see [Finding the Material Parameter Name](/docs/userguide/materials/param-names.md)\.  |

## Outputs {#material-get-vector3-param-node-output}


****

| Pin | Type | Description |
| --- | --- | --- |
| Out | Event | Sends when the node is finished\. |
| Vector3 | Vector3 | The queried value\. If the parameter is not found, the value is \(0, 0, 0\)\. |