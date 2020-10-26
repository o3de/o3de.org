# Managing Particle Level of Detail \(LOD\)<a name="particle-lod"></a>

The Level of Detail \(LOD\) system blends multiple particle emitters based on their distance from the camera\. This allows you to use emitters that require less computation and rendering time, rather than computationally heavy particle emitters\.

**To add an LOD for a particle emitter**

1. In Lumberyard Editor, choose **Tools**, **Particle Editor**\.

1. In the **Particle Editor**, in the **Libraries** panel, right\-click an emitter\.

1. Select **Add LOD**\.

   The LOD is a copy of the base particle emitter and has the same settings\. The LOD also applies to all parent or child particle emitters in the hierarchy that belong to the selected emitter\.  
![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/particles/particle-lod-1.png)

## Level of Detail Panel<a name="particle-lod-panel"></a>

The **Level of Detail** panel appears when you add an LOD\. This panel shows the level of detail that you selected from the **View** menu in the **Particle Editor**\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/particles/particle-lod-2.png)


****  

| Option | Description | 
| --- | --- | 
| Blend In | The amount of time, in seconds, for an LOD to blend in\. | 
| Blend Out | The amount of time, in seconds, for an LOD to blend out\. | 
| Overlap | The amount of time, in seconds, that both LODs are shown before the old LOD blends out and the new LOD blends in\. | 
| \+ Add Level of Detail | Adds an LOD\. The new LOD distance is set to 10 additional units from the farthest LOD\. The list of added LOD levels appears under \+ Add Level of Detail\. | 

### Hide or Display Options<a name="particle-lod-panel-hide-display-options"></a>

Hide or display the **Level of Detail** panel by clicking **View**, **Hide Level of Detail** in the **Particle Editor**\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/particles/particle-lod-5.png)


****  

| Option | Description | 
| --- | --- | 
| Hide Level of Detail | Hides the LOD panel if the panel is visible\. | 
| Show Level of Detail | Displays the LOD panel if the panel is hidden\. | 

### Manage LOD Options<a name="particle-lod-panel-manage-lod-options"></a>

Manage your LOD levels in the list by clicking the drop\-down menu in the **Level of Detail** title bar\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/particles/particle-lod-4.png)


****  

| Option | Description | 
| --- | --- | 
| Add level | Adds an LOD level to the end of the list\. | 
| Arrange | Shows the Arrange submenu: [\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/particle-lod.html) | 
| Jump to first | Selects the first LOD level in the list\. This also selects the top particle emitter in the list and loads it in the Attributes panel\. | 
| Jump to last | Selects the last LOD level in the list\. This also selects the top particle emitter in the list and loads it in the Attributes panel\. | 
| Remove | Removes the selected LOD level\. | 
| Remove All | Removes all LOD levels for the related particle emitters\. | 
| Close | Closes the Level of Detail panel\. | 

## LOD Level Panel<a name="particle-lod-level-panel"></a>

Each LOD level has its own panel in the LOD level list\. These panels show all relevant information for each individual level\.

**Note**  
The base particle emitter is shown if the camera distance is lower than the top LOD level\. This makes the base particle the starting LOD level\. 

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/particles/particle-lod-3.png)


****  

| Option | Description | 
| --- | --- | 
| Top left check box | Turns on/off the entire level\. | 
| LOD distance value | Specifies the camera distance at which the LOD level becomes active\. At this level, the particle emitter blends toward the LOD level and blends out the previous LOD level\. | 
| Top right button | Deletes the corresponding LOD level\. | 
| Particle check box | Turns off the particle emitter at this level\. When the emitter is off, nothing is drawn\. You can use this to turn off particle emitters based on the LOD level\. | 
| Particle name | Click a particle name to load the LOD level particle emitter for the selected particle emitter in the Attributes panel\. You can use this to change the LOD level particle emitter\. Right\-click a particle name and click Remove to remove the particle from the LOD level\. Any child particle emitters are also removed from the LOD level\. | 