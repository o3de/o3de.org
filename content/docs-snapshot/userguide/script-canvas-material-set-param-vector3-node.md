# Set Param Vector3<a name="script-canvas-material-set-param-vector3-node"></a>

Sets a material parameter with a **Vector3** value\.

**Contents**
+ [Inputs](#script-canvas-material-set-param-vector3-node-input)
+ [Outputs](#script-canvas-material-set-param-vector3-node-output)

![\[set param vector3, setparamvector3\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-param-vector3-node.png)

## Inputs<a name="script-canvas-material-set-param-vector3-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Material | Material |  The material to modify\.  | 
| Param Name | String |  The name of the material parameter to set\. For more information, see [Finding the Material Parameter Name](material-param-names.md)\.  | 
| Vector3 | Vector3 |  The new value to apply\.  | 

## Outputs<a name="script-canvas-material-set-param-vector3-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 