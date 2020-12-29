# Get Material<a name="material-owner-get-material"></a>

Returns an entity's current material\.

**Contents**
+ [Inputs](#material-owner-get-material-input)
+ [Outputs](#material-owner-get-material-output)

![\[getmaterialnode, getmaterial\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-get-material-owner-node.png)

**Note**  
If you use the **[Set Material](material-owner-set-material.md)** node and specify an invalid material and then call the **Get Material** node, **Get Material** returns the entity's default material instead of `Invalid`\.

## Inputs<a name="material-owner-get-material-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Source | EntityID |  References a specific entity from which events are generated\. By default, it references **Self**, the entity to which the **[Script Canvas](component-script-canvas.md)** component attaches the current script\. You can also select another entity\. For more information, see [Setting Entity Targets](script-canvas-referencing-entities.md)\.  | 

## Outputs<a name="material-owner-get-material-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 
| Material | Material | The entity’s current material\. | 