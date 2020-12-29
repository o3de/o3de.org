# Load by Name<a name="material-load-by-name-node"></a>

Finds and returns the material with the specified name\. Loads the material if the material is not already loaded\.

**Contents**
+ [Inputs](#material-load-by-name-node-input)
+ [Outputs](#material-load-by-name-node-output)

![\[loadbynamenode, loadbyname\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-load-by-name-node.png)

In some cases, you might need to store the material to use later\. For more information, see **[Material Variables](script-canvas-variable-material-node.md)**\.

## Inputs<a name="material-load-by-name-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Material Name | String |  The path name of a material to find and load\. For more information, see [Finding the Material Name](finding-materials-by-name.md)\.  | 

## Outputs<a name="material-load-by-name-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 
| Material | Material | The material that was found\. Returns Invalid if the material is not found\. | 