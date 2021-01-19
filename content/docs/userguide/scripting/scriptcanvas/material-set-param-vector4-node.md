---
description: ' Use the Set Param Vector node in the &ALYlong; &script-canvas; editor
  to set a material parameter with a Vector4 value. '
title: Set Param Vector4
---
# Set Param Vector4 {#script-canvas-material-set-param-vector4-node}

Sets a material parameter with a **Vector4** value\.

**Contents**
+ [Inputs](#script-canvas-material-set-param-vector4-node-input)
+ [Outputs](#script-canvas-material-set-param-vector4-node-output)

![\[setparamvector4, setparamvector4node\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-param-vector4-node.png)

## Inputs {#script-canvas-material-set-param-vector4-node-input}


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Material | Material |  The material to modify\.  | 
| Param Name | String |  The name of the material parameter to set\.  For more information, see [Finding the Material Parameter Name](/docs/userguide/materials/param-names.md)\.  | 
| Vector4 | Vector4 |  The new value to apply\.  | 

## Outputs {#script-canvas-material-set-param-vector4-node-output}


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 