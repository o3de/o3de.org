# Find by Name<a name="find-by-name-procedural-material-node"></a>

Finds a procedural material by the substance file name and graph name\. All substance files contain one or more graphs, and these graphs correspond to a procedural material\. 

**Contents**
+ [Inputs](#find-by-name-procedural-material-node-input)
+ [Outputs](#find-by-name-procedural-material-node-output)

![\[FindByName finds substance and graph names for procedural materials.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-find-by-name-procedural-material-node.png)

**To find the substance name for a procedural material**

1. In Lumberyard Editor, choose **Tools**, **Plug\-ins**, **Substance Editor**\.

1. Browse to the substance material that you want\. The substance material name appears in the **Substance** field and the graph name appears in the tab\.  
**Example**  

   The substance material path is `materials/substance/brickwall_04.sbsar` and the graph name is `BrickWall_04`\.  
![\[Finding the substance material name and graph name in the Substance Editor.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-find-by-name-procedural-material-node-2.png)

1. Copy the substance material path and in the **Find by Name** node, do the following:

   1. For **Substance Name**, paste the substance material path\.

   1. For **Graph Name**, enter the graph name\.

## Inputs<a name="find-by-name-procedural-material-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Substance Name | String | The path name of the substance material \.sbsar or \.smtl file to find\. | 
| Graph Name | String | Name of the specific graph in the substance material\. | 
| Force Load | Boolean | Forces the procedural material to load, if it's not already loaded\. | 

## Outputs<a name="find-by-name-procedural-material-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 
| Procedural Material | Procedural material |  The specified procedural material\.  Returns `Invalid` if the material can't be found\.  | 