---
description: ' Use the Get Enabled – High Quality Shadow node in the Amazon Lumberyard
  Script Canvas editor to learn whether a High Quality Shadow component is enabled
  for a specific entity. '
title: Get Enabled
---
# Get Enabled {#high-quality-shadow-get-enabled}

Returns whether an entity's **[High Quality Shadow](/docs/userguide/components/high-quality-shadow.md)** component is enabled\.

**Contents**
+ [Inputs](#high-quality-shadow-get-enabled-input)
+ [Outputs](#high-quality-shadow-get-enabled-output)

![\[getenabled, highqualityshadow, highqualityshadownode\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/high-quality-shadow-get-enabled.png)

## Inputs {#high-quality-shadow-get-enabled-input}


****

| Pin | Type | Description |
| --- | --- | --- |
| In | Event | Triggers the node\. |
| Source | EntityID |  References a specific entity from which events are generated\. By default, it references **Self**, the entity to which the **[Script Canvas](/docs/userguide/components/script-canvas.md)** component attaches the current script\.  You can also select another entity\. For more information, see [Setting Entity Targets](/docs/userguide/scripting/scriptcanvas/referencing-entities.md)\.  |

## Outputs {#high-quality-shadow-get-enabled-output}


****

| Pin | Type | Description |
| --- | --- | --- |
| Out | Event | Sends when the node is finished\. |
| Enabled | Event | Returns true if the [Script Canvas](/docs/userguide/components/script-canvas.md) component is enabled\. |