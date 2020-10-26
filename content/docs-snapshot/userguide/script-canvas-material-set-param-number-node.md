# Set Param Number<a name="script-canvas-material-set-param-number-node"></a>

Sets a material parameter with a number value\.

**Contents**
+ [Inputs](#script-canvas-material-set-param-number-node-input)
+ [Outputs](#script-canvas-material-set-param-number-node-output)

![\[setparamnumbernode, setparamnumber\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-param-number-node.png)

## Inputs<a name="script-canvas-material-set-param-number-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Material | Material |  The material to modify\.  | 
| Param Name | String |  The name of the material parameter to set\. For more information, see [Finding the Material Parameter Name](material-param-names.md)\.  | 
| Number | Number |  The new value to apply\.  | 

## Outputs<a name="script-canvas-material-set-param-number-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished | 