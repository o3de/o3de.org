---
description: ' Use the Set Enabled &endash; High Quality Shadow node in the &ALYlong;
  &script-canvas; editor to check whether an entity''s High Quality Shadow component
  is enabled. '
title: Set Enabled
---
# Set Enabled {#high-quality-shadow-set-enabled}

Indicates whether the entity's **[High Quality Shadow](/docs/userguide/components/high-quality-shadow.md)** component is enabled\.

**Contents**
+ [Inputs](#high-quality-shadow-set-enabled-input)
+ [Outputs](#high-quality-shadow-set-enabled-output)

![\[setenabled, highqualityshadow\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/high-quality-shadow-set-enabled.png)

## Inputs {#high-quality-shadow-set-enabled-input}


****

| Pin | Type | Description |
| --- | --- | --- |
| In | Event | Triggers the node\. |
| Source | EntityID |  References a specific entity from which events are generated\. By default, it references **Self**, the entity to which the **[Script Canvas](/docs/userguide/components/script-canvas.md)** component attaches the current script\.  You can also select another entity\. For more information, see [Setting Entity Targets](/docs/userguide/scripting/scriptcanvas/referencing-entities.md)\.  |
| Enabled | Boolean | Indicates whether the [Script Canvas](/docs/userguide/components/script-canvas.md) component is enabled\. |

## Outputs {#high-quality-shadow-set-enabled-output}


****

| Pin | Type | Description |
| --- | --- | --- |
| Out | Event | Sends when the node is finished\. |