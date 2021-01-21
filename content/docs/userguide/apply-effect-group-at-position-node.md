---
description: ' Use the Apply Effect Group at Position node in the &ALYlong; &script-canvas;
  editor to apply an effect group file. '
title: Apply Effect Group At Position
---
# Apply Effect Group At Position {#apply-effect-group-at-position-node}

Applies an effect group at a specific position in the world\. You must use this node instead of the **[Enable Effect Group](/docs/userguide/rendering/enable/effect-group-node.md)** node for effect group `xml` files that include the **fadeDistance** parameter\.

The strength of the effect depends on the camera's proximity to the specified location\. You can call this node multiple times to apply the same effect group at multiple locations\. The effect strength is cleared for each frame, so the node needs to be triggered every frame\.

For more information, see [Setting Effect Strength Based on Camera Distance](/docs/userguide/rendering/effect-groups/strength-camera-distance.md)\.

**Contents**
+ [Inputs](#apply-effect-group-at-position-node-input)
+ [Outputs](#apply-effect-group-at-position-node-output)

![\[applyeffectgroupatposition, applyefffectgroupatpositionnode\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-apply-effect-group-at-position-node.png)

## Inputs {#apply-effect-group-at-position-node-input}


****

| Pin | Type | Description |
| --- | --- | --- |
| In | Event | Triggers the node\. |
| Group Name | String | Relative path to the effect group xml file\. |
| Position | Vector3 | World position where the effect is applied\. |

## Outputs {#apply-effect-group-at-position-node-output}


**Outputs**

| Pin | Type | Description |
| --- | --- | --- |
| Out | Event | Sends when the effect starts\. |