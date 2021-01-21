---
description: ' Use the Clone material node in the &script-canvas; editor in &ALYlong;
  to create a copy of a material file. '
title: Clone
---
# Clone {#material-clone-node}

Creates a copy of the specified material\. The material must already be loaded into memory, so that the node can find the material\. If the material is not found, the node returns `Invalid`\.

![\[materialclone, clonematerial, materialclonenode, clonematerialnode\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-material-clone-node.png)

In some cases, you might need to store the material to use later\. For more information, see **[Material Variables](/docs/userguide/scripting/scriptcanvas/variable-material-node.md)**\.

**Warning**
Don't trigger this node for every frame\. Each time the **In** event is received, a copy of the material is created\.

**Contents**
+ [Inputs](#material-clone-node-input)
+ [Outputs](#material-clone-node-output)

## Inputs {#material-clone-node-input}


****

| Pin | Type | Description |
| --- | --- | --- |
| In | Event | Triggers the node\. |
| Material | Material |  The material to be cloned\.  |

## Outputs {#material-clone-node-output}


****

| Pin | Type | Description |
| --- | --- | --- |
| Out | Event | Sends when the node is finished\. |
| Material | Material | The cloned material\. |