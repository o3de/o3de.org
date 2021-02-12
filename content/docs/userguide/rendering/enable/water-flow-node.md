---
description: ' Use the Enable Water Flow node in the Amazon Lumberyard Script Canvas editor
  to enable water flow effects. '
title: Enable Water Flow
---
# Enable Water Flow {#enable-water-flow-node}

Draws water flowing down the entire screen\. You can use this node in situations where the player is standing under flowing water, such as a waterfall\.

To disable the effect, see [Disable Water Flow](/docs/userguide/rendering/disable/water-flow-node.md)\.

**Contents**
+ [Inputs](#enable-water-flow-note-input)
+ [Outputs](#enable-water-flow-node-output)

![\[enablewaterflow, enablewaterflownode\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-enable-water-flow-node.png)

**Example**

![\[Use the Enable Water Flow node to simulate waterfall effects on the screen .\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/enable-water-flow-node-example.gif)

## Inputs {#enable-water-flow-note-input}


****

| Pin | Type | Description |
| --- | --- | --- |
| In | Event |  Triggers the node\.  |
| Amount | Number |  Amount of water\.  |

## Outputs {#enable-water-flow-node-output}


****

| Pin | Type | Description |
| --- | --- | --- |
| Out | Event | Sends when the node is finished\. |