---
description: ' Use the Is Ready node in the Amazon Lumberyard Script Canvas editor to learn
  whether the material owner finished loading its assets and the material is ready. '
title: Is Ready
---
# Is Ready {#material-owner-is-material-owner-ready}

Indicates whether the material owner finished loading its assets and the material is ready\.

**Contents**
+ [Inputs](#material-owner-is-material-owner-ready-input)
+ [Outputs](#material-owner-is-material-owner-ready-output)

![\[isreadynode, isready\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-is-ready-material-owner-node.png)

## Inputs {#material-owner-is-material-owner-ready-input}


****

| Pin | Type | Description |
| --- | --- | --- |
| In | Event | Triggers the node\. |
| Source | EntityID |  References a specific entity from which events are generated\. By default, it references **Self**, the entity to which the **[Script Canvas](/docs/userguide/components/script-canvas.md)** component attaches the current script\. You can also specify another entity\. For more information, see [Setting Entity Targets](/docs/userguide/scripting/scriptcanvas/referencing-entities.md)\.  |

## Outputs {#material-owner-is-material-owner-ready-output}


****

| Pin | Type | Description |
| --- | --- | --- |
| Out | Event | Sends when the node is finished\. |
| Boolean | Boolean | Indicates whether the material owner is ready, so that request functions can be called\. |