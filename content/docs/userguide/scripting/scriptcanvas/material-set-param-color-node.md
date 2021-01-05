---
description: ' Use the Set Param Color node in the &ALYlong; &script-canvas; editor
  to set a material parameter with a color value. '
slug: script-canvas-material-set-param-color-node
title: Set Param Color
---
# Set Param Color<a name="script-canvas-material-set-param-color-node"></a>

Sets a material parameter with a color value\.

**Contents**
+ [Inputs](#script-canvas-material-set-param-color-node-input)
+ [Outputs](#script-canvas-material-set-param-color-node-output)

![\[setparamcolor, setparamcolornode\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-param-color-node.png)

## Inputs<a name="script-canvas-material-set-param-color-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Material | Material |  The material to modify\.  | 
| Param Name | String |  The name of the material parameter to set\. For more information, see [Finding the Material Parameter Name](/docs/userguide/materials/param-names.md)\.  | 
| Color | Color |  The new value to apply\.  | 

## Outputs<a name="script-canvas-material-set-param-color-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 