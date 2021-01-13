---
description: ' Use the Set Material node in the &ALYlong; &script-canvas; editor to
  specify an entity''s material. '
title: Set Material
---
# Set Material {#material-owner-set-material}

Sets an entity's material\. If the material is `Invalid`, this node removes the entity's material override\. The entity uses its default material, if it has one\.

**Contents**
+ [Inputs](#material-owner-set-material-input)
+ [Outputs](#material-owner-set-material-output)

![\[setmaterialnode, setmaterial\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-material-owner-node.png)

## Inputs {#material-owner-set-material-input}


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Source | EntityID |  References a specific entity from which events are generated\. By default, it references **Self**, the entity to which the **[Script Canvas](/docs/userguide/components/script-canvas.md)** component attaches the current script\. You can also select another entity\. For more information, see [Setting Entity Targets](/docs/userguide/scripting/scriptcanvas/referencing-entities.md)\.  | 
| Material | Material |  The new material\.  | 

## Outputs {#material-owner-set-material-output}


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 