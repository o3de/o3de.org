---
description: ' Use the Enable Effect Group node in the &ALYlong; &script-canvas; editor
  to enable a group of effects. '
title: Enable Effect Group
---
# Enable Effect Group {#enable-effect-group-node}

Enables a specific group of effects setting that are defined in an `xml` file\.

**Note**
You must use the **[Apply Effect Group At Position](/docs/userguide/apply-effect-group-at-position-node.md)** node for effect group `xml` files that include the **fadeDistance** parameter\.

To disable the effect, see [Disable Effect Group](/docs/userguide/rendering/disable/effect-group-node.md)\.

For more information about effect group files, see [Customizing Post\-Processing Effects](/docs/userguide/rendering/effect-groups/customizing-intro.md)\.

**Contents**
+ [Inputs](#enable-effect-group-node-input)
+ [Outputs](#enable-effect-group-node-output)

![\[enableeffectgroup, enableeffectgroupnode\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-enable-effect-group-node.png)

## Inputs {#enable-effect-group-node-input}


****

| Pin | Type | Description |
| --- | --- | --- |
| In | Event | Triggers the node |
| Group Name | String | Relative path to the effect group xml file\. |

## Outputs {#enable-effect-group-node-output}


****

| Pin | Type | Description |
| --- | --- | --- |
| Out | Event | Sends when the effect starts\. |