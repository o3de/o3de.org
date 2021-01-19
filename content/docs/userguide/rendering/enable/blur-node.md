---
description: ' Use the Enable Blur node in the &ALYlong; &script-canvas; editor to
  set the blur (Gaussian blur) filter. '
title: Enable Blur
---
# Enable Blur {#enable-blur-node}

Sets the blur filter, which uses Gaussian blur\.

To disable the effect, see [Disable Blur](/docs/userguide/rendering/disable/blur-node.md)\.

**Contents**
+ [Inputs](#enable-blur-node-input)
+ [Outputs](#enable-blur-node-output)

![\[enablefilterblurnode, enablefilterblur\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-enable-blur-node.png)

**Example**  

![\[Use the Enable Blur node to blur the screen for your game.\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/enable-blur-node-example.png)

## Inputs {#enable-blur-node-input}


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Amount | Number | Amount of blurring\. | 

## Outputs {#enable-blur-node-output}


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 