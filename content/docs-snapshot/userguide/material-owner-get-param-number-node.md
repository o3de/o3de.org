# Get Param Number<a name="material-owner-get-param-number-node"></a>

Returns a material's numerical parameter value for the specified entity\.

**Contents**
+ [Inputs](#material-owner-get-param-number-node-input)
+ [Outputs](#material-owner-get-param-number-node-output)

![\[getparamnumbernode, getparamnumber\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-get-param-number-material-owner-node.png)

## Inputs<a name="material-owner-get-param-number-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Source | EntityID |  References a specific entity from which events are generated\. By default, it references **Self**, the entity to which the **[Script Canvas](component-script-canvas.md)** component attaches the current script\. You can also select another entity\. For more information, see [Setting Entity Targets](script-canvas-referencing-entities.md)\.  | 
| Param Name | String |  The name of the material parameter to query\. For more information, see [Finding the Material Parameter Name](material-param-names.md)\.  | 
| Material ID | Number | If the material owner has a multimaterial, use this parameter to select a specific submaterial\. IDs start at 1\. | 

## Outputs<a name="material-owner-get-param-number-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 
| Number | Number | The queried value\. If the parameter is not found, the value is 0\. | 