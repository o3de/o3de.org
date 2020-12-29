# Set Param Vector4<a name="material-owner-set-param-vector4"></a>

Sets a material's **Vector4** parameter value for the specified entity\. 

**Contents**
+ [Inputs](#material-owner-set-param-vector4-input)
+ [Outputs](#material-owner-set-param-vector4-output)

![\[setparamvector4, setparamvector4node\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-param-vector4-material-owner-node.png)

## Inputs<a name="material-owner-set-param-vector4-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Source | EntityID |  References a specific entity from which events are generated\. By default, it references **Self**, the entity to which the **[Script Canvas](component-script-canvas.md)** component attaches the current script\.  You can also select another entity\. For more information, see [Setting Entity Targets](script-canvas-referencing-entities.md)\.  | 
| Param Name | String |  The name of the material parameter to update\. For more information, see [Finding the Material Parameter Name](material-param-names.md)\.  | 
| Vector4 | Vector4 |  The new value to apply\.  | 
| Material ID | Number | If the material owner has a multimaterial, use this parameter to select a specific submaterial\. IDs start at 1\. | 

## Outputs<a name="material-owner-set-param-vector4-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 