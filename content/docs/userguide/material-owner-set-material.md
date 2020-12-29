# Set Material<a name="material-owner-set-material"></a>

Sets an entity's material\. If the material is `Invalid`, this node removes the entity's material override\. The entity uses its default material, if it has one\.

**Contents**
+ [Inputs](#material-owner-set-material-input)
+ [Outputs](#material-owner-set-material-output)

![\[setmaterialnode, setmaterial\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-material-owner-node.png)

## Inputs<a name="material-owner-set-material-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Source | EntityID |  References a specific entity from which events are generated\. By default, it references **Self**, the entity to which the **[Script Canvas](component-script-canvas.md)** component attaches the current script\. You can also select another entity\. For more information, see [Setting Entity Targets](script-canvas-referencing-entities.md)\.  | 
| Material | Material |  The new material\.  | 

## Outputs<a name="material-owner-set-material-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 