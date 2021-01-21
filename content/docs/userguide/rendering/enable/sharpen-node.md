---
description: ' Use the Enable Sharpen node in the &ALYlong; &script-canvas; editor
  to configure the sharpen filter effect. '
title: Enable Sharpen
---
# Enable Sharpen {#enable-sharpen-node}

Applies a sharpen filter\. You can specify a negative value to blur the screen\.

To disable the effect, see [Disable Sharpen](/docs/userguide/rendering/disable/sharpen-node.md)\.

**Contents**
+ [Inputs](#enable-sharpen-note-input)
+ [Outputs](#enable-sharpen-node-output)

![\[enablesharpennode, enablesharpen\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-enable-sharpen-node.png)

**Example**

![\[Use the Enable Sharpen node to sharpen the game details.\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/enable-sharpen-node-example.png)

## Inputs {#enable-sharpen-note-input}


****

| Pin | Type | Description |
| --- | --- | --- |
| In | Event |  Triggers the node\.  |
| Amount | Number |  Amount of sharpening\. Default value: `1`  |

## Outputs {#enable-sharpen-node-output}


****

| Pin | Type | Description |
| --- | --- | --- |
| Out | Event | Sends when the node is finished\. |