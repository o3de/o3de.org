---
description: ' Use the Find by Name node in the &ALYlong; &script-canvas; editor to
  find a material. '
title: Find by Name
---
# Find by Name {#material-find-by-name-node}

Finds and returns the material with the specified name\. The material must be loaded into memory in order to be found\.

In some cases, the **Find by Name** node might not find the material as expected\. 

**Example**  

1. You have an entity named `Crate` that has a material file named `crate.mtl`\. 

1. In your script, you use the **[Find by Name](#material-find-by-name-node)** node to access the `crate.mtl` file\. You want to trigger the node when the graph starts with the **On Graph Start** node\. However, it's possible that the **[Find by Name](#material-find-by-name-node)** node can't load the material immediately\. It might take additional frames before the entity finishes loading the material file\.

1. In this example, you can use one of the following nodes to detect when the `Crate` entity finishes loading the `crate.mtl` file:
   + Use the **[Load by Name](/docs/userguide/materials/load-by-name-node.md)** node instead of the **[Find by Name](#material-find-by-name-node)** node\.
   + Use the **[On Ready](/docs/userguide/materials/owner-on-material-owner-ready-node.md)** node instead of the **On Graph Start** node\.

In some cases, you might need to store the material for later use\. For more information, see **[Material Variables](/docs/userguide/scripting/scriptcanvas/variable-material-node.md)**\.

**Contents**
+ [Inputs](#material-find-by-name-node-input)
+ [Outputs](#material-find-by-name-node-output)

![\[findbymaterialname, findbymaterialnamdenode, findbynamenode, findbyname\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-find-by-name-node.png)

## Inputs {#material-find-by-name-node-input}


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Material Name | String |  The path name of a material to find\. For more information, see [Finding the Material Name](/docs/userguide/finding-materials-by-name.md)\.  | 

## Outputs {#material-find-by-name-node-output}


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 
| Material | Material | The material that was found\. Returns Invalid if the material is not found\. | 