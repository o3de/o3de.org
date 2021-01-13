---
description: ' Use the Set Param Number node in the &ALYlong; &script-canvas; editor
  to specify a material''s numerical parameter for the specified entity. '
title: Set Param Number
---
# Set Param Number {#material-owner-set-param-number}

Sets a material's numerical parameter for the specified entity\.

**Contents**
+ [Inputs](#material-owner-set-param-number-input)
+ [Outputs](#material-owner-set-param-number-output)

![\[setparamnumber, setparamnumbernode\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-param-number-material-owner-node.png)

## Inputs {#material-owner-set-param-number-input}


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Source | EntityID |  References a specific entity from which events are generated\. By default, it references **Self**, the entity to which the **[Script Canvas](/docs/userguide/components/script-canvas.md)** component attaches the current script\.  You can also select another entity\. For more information, see [Setting Entity Targets](/docs/userguide/scripting/scriptcanvas/referencing-entities.md)\.  | 
| Param Name | String |  The name of the material parameter to update\. For more information, see [Finding the Material Parameter Name](/docs/userguide/materials/param-names.md)\.  | 
| Number | Number |  The new value to apply\.  | 
| Material ID | Number | If the material owner has a multimaterial, use this parameter to select a specific submaterial\. IDs start at 1\. | 

## Outputs {#material-owner-set-param-number-output}


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 