---
description: ' Use the Get Param Number node in the Amazon Lumberyard Script Canvas editor
  to get a material''s numerical parameter value for the specified entity. '
title: Get Param Number
---
# Get Param Number {#material-owner-get-param-number-node}

Returns a material's numerical parameter value for the specified entity\.

**Contents**
+ [Inputs](#material-owner-get-param-number-node-input)
+ [Outputs](#material-owner-get-param-number-node-output)

![\[getparamnumbernode, getparamnumber\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-get-param-number-material-owner-node.png)

## Inputs {#material-owner-get-param-number-node-input}


****

| Pin | Type | Description |
| --- | --- | --- |
| In | Event | Triggers the node\. |
| Source | EntityID |  References a specific entity from which events are generated\. By default, it references **Self**, the entity to which the **[Script Canvas](/docs/userguide/components/script-canvas.md)** component attaches the current script\. You can also select another entity\. For more information, see [Setting Entity Targets](/docs/userguide/scripting/scriptcanvas/referencing-entities.md)\.  |
| Param Name | String |  The name of the material parameter to query\. For more information, see [Finding the Material Parameter Name](/docs/userguide/materials/param-names.md)\.  |
| Material ID | Number | If the material owner has a multimaterial, use this parameter to select a specific submaterial\. IDs start at 1\. |

## Outputs {#material-owner-get-param-number-node-output}


****

| Pin | Type | Description |
| --- | --- | --- |
| Out | Event | Sends when the node is finished\. |
| Number | Number | The queried value\. If the parameter is not found, the value is 0\. |