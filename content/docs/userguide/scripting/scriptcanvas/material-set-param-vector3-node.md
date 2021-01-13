---
description: ' Use the Set Param Vector3 node in the &ALYlong; &script-canvas; editor
  to set a material parameter with a Vector3 value. '
title: Set Param Vector3
---
# Set Param Vector3 {#script-canvas-material-set-param-vector3-node}

Sets a material parameter with a **Vector3** value\.

**Contents**
+ [Inputs](#script-canvas-material-set-param-vector3-node-input)
+ [Outputs](#script-canvas-material-set-param-vector3-node-output)

![\[set param vector3, setparamvector3\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-param-vector3-node.png)

## Inputs {#script-canvas-material-set-param-vector3-node-input}


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Material | Material |  The material to modify\.  | 
| Param Name | String |  The name of the material parameter to set\. For more information, see [Finding the Material Parameter Name](/docs/userguide/materials/param-names.md)\.  | 
| Vector3 | Vector3 |  The new value to apply\.  | 

## Outputs {#script-canvas-material-set-param-vector3-node-output}


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 