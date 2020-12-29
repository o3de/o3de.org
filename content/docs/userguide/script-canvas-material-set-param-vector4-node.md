description: ' Use the Set Param Vector node in the &ALYlong; &script-canvas; editor
  to set a material parameter with a Vector4 value. '
slug: script-canvas-material-set-param-vector4-node
title: Set Param Vector4
---
# Set Param Vector4<a name="script-canvas-material-set-param-vector4-node"></a>

Sets a material parameter with a **Vector4** value\.

**Contents**
+ [Inputs](#script-canvas-material-set-param-vector4-node-input)
+ [Outputs](#script-canvas-material-set-param-vector4-node-output)

![\[setparamvector4, setparamvector4node\]](/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-param-vector4-node.png)

## Inputs<a name="script-canvas-material-set-param-vector4-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Material | Material |  The material to modify\.  | 
| Param Name | String |  The name of the material parameter to set\.  For more information, see [Finding the Material Parameter Name](material-param-names.md)\.  | 
| Vector4 | Vector4 |  The new value to apply\.  | 

## Outputs<a name="script-canvas-material-set-param-vector4-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 