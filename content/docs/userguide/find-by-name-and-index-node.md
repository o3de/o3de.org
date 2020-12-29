# Find by Name and Index<a name="find-by-name-and-index-node"></a>

Finds a procedural material by the substance file name and the index of a graph\. All substance files contain one or more graphs, and these graphs correspond to a procedural material\. 

**Contents**
+ [Inputs](#find-by-name-and-index-node-input)
+ [Outputs](#find-by-name-and-index-node-output)

![\[FindbyNameandIndex finds the substance name and graph index for a procedural material.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-find-by-name-and-index-node.png)

**To find the substance name**

1. In Lumberyard Editor, choose **Tools**, **Plug\-ins**, **Substance Editor**\.

1. Browse to the substance material that you want\. The substance material name appears in the **Substance** field and the graph name appears in the tab\.  
**Example**  

   The substance material path is `materials/substance/brickwall_04.sbsar` and the graph name `BrickWall_04` appears in the tab\.  
![\[Finding the substance material name and graph index in the Substance Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-find-by-name-procedural-material-node-2.png)

1. Copy the substance material path and in the **Find by Name and Index** node, do the following:

   1. For **Substance Name**, paste the substance material path\.

   1. For **Graph Index**, specify the graph that you want\. The far\-left tab is index `0`, the next is `1`, and so on\. If the substance material has only one graph, leave the **Graph Index** field as `0`\.

## Inputs<a name="find-by-name-and-index-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Substance Name | String | The path name of the substance material \.sbsar or \.smtl file to find\. | 
| Graph Index | Number |  Index of the specific graph in the substance material\.  Default value: `0`  | 
| Force Load | Boolean | Forces the procedural material to load, if it's not already loaded\. | 

## Outputs<a name="find-by-name-and-index-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 
| Procedural Material | Procedural material |  The specified procedural material to return\.  Returns `Invalid` if the material can't be found\.  | 