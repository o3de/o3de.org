---
description: ' Use the Get Param Color node in the &ALYlong; &script-canvas; editor
  to get the parameter color for a material. '
title: Get Param Color
---
# Get Param Color<a name="material-get-param-color-node"></a>

Returns a material parameter as a color value\.

**Contents**
+ [Inputs](#material-get-param-color-node-input)
+ [Outputs](#material-get-param-color-node-output)

![\[getparamcolornode, getparamcolormaterial, getcolorparam\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-get-param-color-node.png)

## Inputs<a name="material-get-param-color-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Material | Material |  The material to query\.  | 
| Param Name | String |  The name of the material parameter to return\. For more information, see [Finding the Material Parameter Name](/docs/userguide/materials/param-names.md)\.  | 

## Outputs<a name="material-get-param-color-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 
| Color | Color | The queried value\. If the parameter is not found, the value is \(0, 0, 0, 0\)\. | 