---
description: ' Use the Set Skybox Stretch node in the Amazon Lumberyard Script Canvas editor
  to stretch the skybox vertically. '
title: Set Skybox Stretch
---
# Set Skybox Stretch {#set-sky-box-stretch}

Sets the stretch factor, which affects how the skybox stretches vertically\. Stretching the skybox lowers the horizon line\.

**Contents**
+ [Inputs](#set-sky-box-stretch-input)
+ [Outputs](#set-sky-box-stretch-output)

![\[sky box node, setskyboxstretch\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/environment-set-skybox-stretch.png)

## Inputs {#set-sky-box-stretch-input}


****

| Pin | Type | Description |
| --- | --- | --- |
| In | Event | Triggers the node\. |
| Amount | Number |  Vertical stretch factor\.  A value of `0` does not stretch the skybox\. Specify a higher value to lower the horizon line\. Default value: `0`  |

## Outputs {#set-sky-box-stretch-output}


****

| Pin | Type | Description |
| --- | --- | --- |
| Out | Event | Sends when the node is finished\. |