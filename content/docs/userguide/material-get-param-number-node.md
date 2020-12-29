description: ' Use the Get Param Number node in the &ALYlong; &script-canvas; editor
  to return a material parameter as a numerical value. '
slug: material-get-param-number-node
title: Get Param Number
---
# Get Param Number<a name="material-get-param-number-node"></a>

Returns a material parameter as a numerical value\.

**Contents**
+ [Inputs](#material-get-param-number-node-input)
+ [Outputs](#material-get-param-number-node-output)

![\[getparamnumber, getparamnumbernode\]](/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-get-param-number-node.png)

## Inputs<a name="material-get-param-number-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Material | Material |  The material to query\.  | 
| Param Name | String |  The name of the material parameter to return\. For more information, see [Finding the Material Parameter Name](material-param-names.md)\.  | 

## Outputs<a name="material-get-param-number-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 
| Number | Number | The queried value\. If the parameter is not found, the value is 0\. | 