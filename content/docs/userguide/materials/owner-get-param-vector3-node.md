---
description: ' Use the Get Param Vector3 node in the &ALYlong; &script-canvas; editor
  to return a material''s Vector3 parameter value for the specified entity. '
title: Get Param Vector3
---
# Get Param Vector3 {#material-owner-get-param-vector3-node}

Returns a material's **Vector3** parameter value for the specified entity\.

**Contents**
+ [Inputs](#material-owner-get-param-vector3-node-input)
+ [Outputs](#material-owner-get-param-vector3-node-output)

![\[getparamvector3node, getparamvector3\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-get-param-vector3-material-owner-node.png)

## Inputs {#material-owner-get-param-vector3-node-input}


****

| Pin | Type | Description |
| --- | --- | --- |
| In | Event | Triggers the node\. |
| Source | EntityID |  References a specific entity from which events are generated\. By default, it references **Self**, the entity to which the **[Script Canvas](/docs/userguide/components/script-canvas.md)** component attaches the current script\.  You can also select another entity\. For more information, see [Setting Entity Targets](/docs/userguide/scripting/scriptcanvas/referencing-entities.md)\.  |
| Param Name | String |  The name of the material parameter to query\. For more information, see [Finding the Material Parameter Name](/docs/userguide/materials/param-names.md)\.  |
| Material ID | Number | If the material owner has a multimaterial, use this parameter to select a specific submaterial\. IDs start at 1\. |

## Outputs {#material-owner-get-param-vector3-node-output}


****

| Pin | Type | Description |
| --- | --- | --- |
| Out | Event | Sends when the node is finished\. |
| Vector3 | Vector3 | The queried value\. If the parameter is not found, the value is \(0, 0, 0\)\. |