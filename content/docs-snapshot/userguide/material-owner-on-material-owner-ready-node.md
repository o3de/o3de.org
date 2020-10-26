# On Ready<a name="material-owner-on-material-owner-ready-node"></a>

This node is triggered when the material owner finishes loading its assets\. We recommend that you use this event to trigger functions for the **Get Param\*** and **Set Param\*** nodes \(for example, the **[Get Param Color](material-owner-get-param-color-node.md)** and **[Set Param Color](material-owner-set-param-color.md)** nodes\)\. Otherwise, the material asset might not be available when the script is first activated\. For example, a **[Mesh](component-static-mesh.md)** component does not load its mesh until at least one frame after the script starts\.

**Contents**
+ [Inputs](#material-owner-on-material-owner-ready-node-input)
+ [Outputs](#material-owner-on-material-owner-ready-node-output)

![\[onmaterialownerreadynode, onmaterialownerready\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-on-ready-material-owner-node.png)

## Inputs<a name="material-owner-on-material-owner-ready-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Source | EntityID |  References a specific entity from which events are generated\. By default, it references **Self**, the entity to which the **[Script Canvas](component-script-canvas.md)** component attaches the current script\.  You can also specify another entity\. For more information, see [Setting Entity Targets](script-canvas-referencing-entities.md)\.  | 

## Outputs<a name="material-owner-on-material-owner-ready-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the material owner's material is available for use\. | 