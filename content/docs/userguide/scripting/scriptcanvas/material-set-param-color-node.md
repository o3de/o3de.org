---
description: ' Use the Set Param Color node in the Amazon Lumberyard Script Canvas editor
  to set a material parameter with a color value. '
title: Set Param Color
---
# Set Param Color {#script-canvas-material-set-param-color-node}

Sets a material parameter with a color value\.

**Contents**
+ [Inputs](#script-canvas-material-set-param-color-node-input)
+ [Outputs](#script-canvas-material-set-param-color-node-output)

![\[setparamcolor, setparamcolornode\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-param-color-node.png)

## Inputs {#script-canvas-material-set-param-color-node-input}


****

| Pin | Type | Description |
| --- | --- | --- |
| In | Event | Triggers the node\. |
| Material | Material |  The material to modify\.  |
| Param Name | String |  The name of the material parameter to set\. For more information, see [Finding the Material Parameter Name](/docs/userguide/materials/param-names.md)\.  |
| Color | Color |  The new value to apply\.  |

## Outputs {#script-canvas-material-set-param-color-node-output}


****

| Pin | Type | Description |
| --- | --- | --- |
| Out | Event | Sends when the node is finished\. |