---
description: ' Use the Get Param Number node in the Amazon Lumberyard Script Canvas editor
  to return a material parameter as a numerical value. '
title: Get Param Number
---
# Get Param Number {#material-get-param-number-node}

Returns a material parameter as a numerical value\.

**Contents**
+ [Inputs](#material-get-param-number-node-input)
+ [Outputs](#material-get-param-number-node-output)

![\[getparamnumber, getparamnumbernode\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-get-param-number-node.png)

## Inputs {#material-get-param-number-node-input}


****

| Pin | Type | Description |
| --- | --- | --- |
| In | Event | Triggers the node\. |
| Material | Material |  The material to query\.  |
| Param Name | String |  The name of the material parameter to return\. For more information, see [Finding the Material Parameter Name](/docs/userguide/materials/param-names.md)\.  |

## Outputs {#material-get-param-number-node-output}


****

| Pin | Type | Description |
| --- | --- | --- |
| Out | Event | Sends when the node is finished\. |
| Number | Number | The queried value\. If the parameter is not found, the value is 0\. |