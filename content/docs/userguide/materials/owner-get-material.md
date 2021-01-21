---
description: ' Use the Get Material node in the &ALYlong; &script-canvas; editor to
  find an entity''s current material file. '
title: Get Material
---
# Get Material {#material-owner-get-material}

Returns an entity's current material\.

**Contents**
+ [Inputs](#material-owner-get-material-input)
+ [Outputs](#material-owner-get-material-output)

![\[getmaterialnode, getmaterial\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-get-material-owner-node.png)

**Note**
If you use the **[Set Material](/docs/userguide/materials/owner-set-material.md)** node and specify an invalid material and then call the **Get Material** node, **Get Material** returns the entity's default material instead of `Invalid`\.

## Inputs {#material-owner-get-material-input}


****

| Pin | Type | Description |
| --- | --- | --- |
| In | Event | Triggers the node\. |
| Source | EntityID |  References a specific entity from which events are generated\. By default, it references **Self**, the entity to which the **[Script Canvas](/docs/userguide/components/script-canvas.md)** component attaches the current script\. You can also select another entity\. For more information, see [Setting Entity Targets](/docs/userguide/scripting/scriptcanvas/referencing-entities.md)\.  |

## Outputs {#material-owner-get-material-output}


****

| Pin | Type | Description |
| --- | --- | --- |
| Out | Event | Sends when the node is finished\. |
| Material | Material | The entity's current material\. |