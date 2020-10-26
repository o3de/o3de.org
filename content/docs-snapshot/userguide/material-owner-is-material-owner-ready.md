# Is Ready<a name="material-owner-is-material-owner-ready"></a>

Indicates whether the material owner finished loading its assets and the material is ready\.

**Contents**
+ [Inputs](#material-owner-is-material-owner-ready-input)
+ [Outputs](#material-owner-is-material-owner-ready-output)

![\[isreadynode, isready\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-is-ready-material-owner-node.png)

## Inputs<a name="material-owner-is-material-owner-ready-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Source | EntityID |  References a specific entity from which events are generated\. By default, it references **Self**, the entity to which the **[Script Canvas](component-script-canvas.md)** component attaches the current script\. You can also specify another entity\. For more information, see [Setting Entity Targets](script-canvas-referencing-entities.md)\.  | 

## Outputs<a name="material-owner-is-material-owner-ready-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 
| Boolean | Boolean | Indicates whether the material owner is ready, so that request functions can be called\. | 