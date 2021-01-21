---
description: ' Use the Enable Directional Blur node in the &ALYlong; &script-canvas;
  editor to configure directional blur effects. '
title: Enable Directional Blur
---
# Enable Directional Blur {#enable-directional-blur-node}

Applies a directional blur filter\. To enable this node, you must enable the `r_MotionBlur` console variable\. For more information, see [Using the Console Window](/docs/userguide/console-intro.md)\.

To disable the effect, see [Disable Directional Blur](/docs/userguide/rendering/disable/directional-blur-node.md)\.

**Contents**
+ [Inputs](#enable-directional-blur-note-input)
+ [Outputs](#enable-directional-blur-node-output)

![\[enabledirectionalblur, directionalblurnode\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-enable-directional-blur-node.png)

**Example**

![\[Use the Enable Directional Blur node to enable blur effects at a specific angle on the screen.\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/enable-directional-blur-node-example.png)

## Inputs {#enable-directional-blur-note-input}


****

| Pin | Type | Description |
| --- | --- | --- |
| In | Event |  Triggers the node\.  |
| Direction | Vector2 | Indicates the direction and strength of the blur, in the screen space\. |

## Outputs {#enable-directional-blur-node-output}


****

| Pin | Type | Description |
| --- | --- | --- |
| Out | Event | Sends when the node is finished\. |