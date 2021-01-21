---
description: ' Use the Enable Frost node in the &ALYlong; &script-canvas; editor to
  display frost on the screen. '
title: Enable Frost
---
# Enable Frost {#enable-frost-node}

Display spots of frost on the screen\.

To disable the effect, see [Disable Frost](/docs/userguide/rendering/disable/frost-node.md)\.

**Contents**
+ [Inputs](#enable-frost-note-input)
+ [Outputs](#enable-frost-node-output)

![\[enablefrost, enablefrostnode\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-enable-frost-node.png)

**Example**

![\[Use the Enable Frost node to enable frost on the screen.\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/enable-frost-node-example.png)

## Inputs {#enable-frost-note-input}


****

| Pin | Type | Description |
| --- | --- | --- |
| In | Event |  Triggers the node\.  |
| Amount | Number |  Amount of frost\. Default value: `0`  |
| Center Amount | Number |  Amount of frost at the center of the screen\. Default value: `1`  |

## Outputs {#enable-frost-node-output}


****

| Pin | Type | Description |
| --- | --- | --- |
| Out | Event | Sends when the node is finished\. |