# Vegetation Debugging<a name="vegetation-debugging"></a>

Branches and tree trunks can be broken upon collision\.

**e\_vegetation 1 \| 0**  
Enables and disables rendering of the vegetation\. 1 = on, 0 = off\.

**e\_MergedMeshesDebug 1**  
Displays statistics on global memory consumption of vegetation objects placed in the level\.

**e\_MergedMeshesDebug 2**  
Displays vegetation in the cells that form the merged meshes\. They are color coded over distance\. Red boxes should be displayed only around the player \(the cell the player is standing in and the surrounding eight cells\)\. Beyond this, all cells should be green\.  
Displayed above each cell is information about the current LOD step and memory consumption for the cell—this updates as you move closer and further away\.