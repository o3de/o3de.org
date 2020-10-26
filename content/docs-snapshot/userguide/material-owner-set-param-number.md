# Set Param Number<a name="material-owner-set-param-number"></a>

Sets a material's numerical parameter for the specified entity\.

**Contents**
+ [Inputs](#material-owner-set-param-number-input)
+ [Outputs](#material-owner-set-param-number-output)

![\[setparamnumber, setparamnumbernode\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-param-number-material-owner-node.png)

## Inputs<a name="material-owner-set-param-number-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Source | EntityID |  References a specific entity from which events are generated\. By default, it references **Self**, the entity to which the **[Script Canvas](component-script-canvas.md)** component attaches the current script\.  You can also select another entity\. For more information, see [Setting Entity Targets](script-canvas-referencing-entities.md)\.  | 
| Param Name | String |  The name of the material parameter to update\. For more information, see [Finding the Material Parameter Name](material-param-names.md)\.  | 
| Number | Number |  The new value to apply\.  | 
| Material ID | Number | If the material owner has a multimaterial, use this parameter to select a specific submaterial\. IDs start at 1\. | 

## Outputs<a name="material-owner-set-param-number-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 