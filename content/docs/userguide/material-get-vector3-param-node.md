# Get Param Vector3<a name="material-get-vector3-param-node"></a>

Returns a material parameter as a **Vector3** value\.

**Contents**
+ [Inputs](#material-get-vector3-param-node-input)
+ [Outputs](#material-get-vector3-param-node-output)

![\[getparamvector3, getvector3param, getparamvector3node\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-get-param-vector3-node.png)

## Inputs<a name="material-get-vector3-param-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Material | Material |  The material to query\.  | 
| Param Name | String |  The name of the material parameter to return\. For more information, see [Finding the Material Parameter Name](material-param-names.md)\.  | 

## Outputs<a name="material-get-vector3-param-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 
| Vector3 | Vector3 | The queried value\. If the parameter is not found, the value is \(0, 0, 0\)\. | 