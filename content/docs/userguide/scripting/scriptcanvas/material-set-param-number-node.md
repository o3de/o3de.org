---
description: ' Use the Set Param Number node in the &ALYlong; &script-canvas; editor
  to set a material parameter with a number value. '
title: Set Param Number
---
# Set Param Number {#script-canvas-material-set-param-number-node}

Sets a material parameter with a number value\.

**Contents**
+ [Inputs](#script-canvas-material-set-param-number-node-input)
+ [Outputs](#script-canvas-material-set-param-number-node-output)

![\[setparamnumbernode, setparamnumber\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-param-number-node.png)

## Inputs {#script-canvas-material-set-param-number-node-input}


****

| Pin | Type | Description |
| --- | --- | --- |
| In | Event | Triggers the node\. |
| Material | Material |  The material to modify\.  |
| Param Name | String |  The name of the material parameter to set\. For more information, see [Finding the Material Parameter Name](/docs/userguide/materials/param-names.md)\.  |
| Number | Number |  The new value to apply\.  |

## Outputs {#script-canvas-material-set-param-number-node-output}


****

| Pin | Type | Description |
| --- | --- | --- |
| Out | Event | Sends when the node is finished |