---
description: ' Use the Get Param Color node in the &ALYlong; &script-canvas; editor
  to return a material''s color parameter. '
title: Get Param Color
---
# Get Param Color {#material-owner-get-param-color-node}

Returns a material's color parameter value for the specified entity\.

**Contents**
+ [Inputs](#material-owner-get-param-color-node-input)
+ [Outputs](#material-owner-get-param-color-node-output)

![\[getparamcolor, getparamcolornode\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-get-param-color-material-owner-node.png)

## Inputs {#material-owner-get-param-color-node-input}


****

| Pin | Type | Description |
| --- | --- | --- |
| In | Event | Triggers the node\. |
| Source | EntityID |  References a specific entity from which events are generated\. By default, it references **Self**, the entity to which the **[Script Canvas](/docs/userguide/components/script-canvas.md)** component attaches the current script\.  You can also select another entity\. For more information, see [Setting Entity Targets](/docs/userguide/scripting/scriptcanvas/referencing-entities.md)\.  |
| Param Name | String |  The name of the material parameter to query\. For more information, see [Finding the Material Parameter Name](/docs/userguide/materials/param-names.md)\.  |
| Material ID | Number |  If the material owner has a multimaterial, use this parameter to select a specific submaterial\. IDs start at `1`\.  |

## Outputs {#material-owner-get-param-color-node-output}


****

| Pin | Type | Description |
| --- | --- | --- |
| Out | Event | Sends when the node is finished\. |
| Color | Color | The queried value\. If the parameter is not found, the value is \(0, 0, 0, 0\)\. |