description: ' Use the Set Skybox Stretch node in the &ALYlong; &script-canvas; editor
  to stretch the skybox vertically. '
slug: set-sky-box-stretch
title: Set Skybox Stretch
---
# Set Skybox Stretch<a name="set-sky-box-stretch"></a>

Sets the stretch factor, which affects how the skybox stretches vertically\. Stretching the skybox lowers the horizon line\.

**Contents**
+ [Inputs](#set-sky-box-stretch-input)
+ [Outputs](#set-sky-box-stretch-output)

![\[sky box node, setskyboxstretch\]](/images/scripting/script-canvas/scriptcanvasnodes/environment-set-skybox-stretch.png)

## Inputs<a name="set-sky-box-stretch-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Amount | Number |  Vertical stretch factor\.  A value of `0` does not stretch the skybox\. Specify a higher value to lower the horizon line\. Default value: `0`  | 

## Outputs<a name="set-sky-box-stretch-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 