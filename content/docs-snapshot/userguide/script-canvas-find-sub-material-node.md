# Find Sub\-Material<a name="script-canvas-find-sub-material-node"></a>

Finds and returns the submaterial with the specified name and submaterial ID\.

Lumberyard has two types of material assets:
+ Materials – A basic single item that represents one material\.
+ Multimaterials – A material that contains multiple submaterials inside it\. 

You can use the **Find Sub\-Material** node to access a submaterial that is inside a multimaterial\. To access the submaterial, specify the name of the multimaterial and the ID of one of its submaterials\. Material IDs range from the number of available submaterials\. For example, if a multimaterial has five submaterials, you can specify a value from `1` to`5`\.

To access a single material, you can use the **[Find by Name](material-find-by-name-node.md)** node\.

**Contents**
+ [Inputs](#script-canvas-find-sub-material-node-input)
+ [Outputs](#script-canvas-find-sub-material-node-output)

![\[findsubmaterial, findsubmaterial, findsubmaterialnode, findchildmaterial\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-find-sub-material-node.png)

## Inputs<a name="script-canvas-find-sub-material-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Material Name | String |  The path name of the material to find\. The material must be a multimaterial\. For more information, see [Finding the Material Name](finding-materials-by-name.md)\.  | 
| Material ID | Number | ID of the submaterial in the multimaterial\. IDs start at 1\. | 
| Should Load | Boolean | If true, the submaterial is loaded if it is not already available\. | 

## Outputs<a name="script-canvas-find-sub-material-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 
| Material | Material | The submaterial that is found\. Returns Invalid if the submaterial is not found\. | 