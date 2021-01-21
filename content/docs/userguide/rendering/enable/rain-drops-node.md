---
description: ' Use the Enable Rain Drops node in the &ALYlong; &script-canvas; editor
  to configure raindrops on the screen. '
title: Enable Rain Drops
---
# Enable Rain Drops {#enable-rain-drops-node}

Apply raindrops on the screen\.

To disable the effect, see [Disable Rain Drops](/docs/userguide/rendering/disable/rain-drops-node.md)\.

**Contents**
+ [Inputs](#enable-rain-drops-note-input)
+ [Outputs](#enable-rain-drops-node-output)

![\[enableraindrops, enableraindropsnode\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-enable-rain-drops-node.png)

**Example**

![\[Use the Enable Rain Drops node to enable raindrops falling on the screen.\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/enable-rain-drops-node-example.gif)

## Inputs {#enable-rain-drops-note-input}


****

| Pin | Type | Description |
| --- | --- | --- |
| In | Event |  Triggers the node\.  |
| Amount | Number |  Enables raindrops\. A value of `0` disables raindrops\. Default value: `1`  |
| Spaw Time Distance | Number |  Sets the spawn time distance for the raindrops\.  Default value: `0.35` For example, a value of `0.35` means the node waits at least `0.35` seconds between drops\.  |
|  Size  | Number |  Specifies the raindrop size\. Default value: `5.0`  |
| Size Variation | Number |  Sets raindrops variation\. Default value: `2.5`  |

## Outputs {#enable-rain-drops-node-output}


****

| Pin | Type | Description |
| --- | --- | --- |
| Out | Event | Sends when the node is finished\. |