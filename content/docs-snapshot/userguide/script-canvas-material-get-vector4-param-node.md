# Get Param Vector4<a name="script-canvas-material-get-vector4-param-node"></a>

Returns a material parameter as a **Vector4** value\.

**Contents**
+ [Inputs](#script-canvas-material-get-vector4-param-node-input)
+ [Outputs](#script-canvas-material-get-vector4-param-node-output)

![\[getparamvector4, getparamvector4node\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-get-param-vector4-node.png)

## Inputs<a name="script-canvas-material-get-vector4-param-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Material | Material |  The material to query\.  | 
| Param Name | String |  The name of the material parameter to return\. For more information, see [Finding the Material Parameter Name](material-param-names.md)\.  | 

## Outputs<a name="script-canvas-material-get-vector4-param-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 
| Vector4 | Vector4 | The queried value\. If the parameter is not found, the value is \(0, 0, 0, 0\)\. | 