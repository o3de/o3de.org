---
description: ' Use the Enable Radial Blur node in the &ALYlong; &script-canvas; editor
  to configure radial blur filters. '
title: Enable Radial Blur
---
# Enable Radial Blur {#enable-radial-blur-node}

 Enables the radial blur filter around a defined 2D position on the screen\. To enable this feature, you must enable the `r_MotionBlur` console variable\. For more information, see [Using the Console Window](/docs/userguide/console-intro.md)\.

To disable the effect, see [Disable Radial Blur](/docs/userguide/rendering/disable/radial-blur-node.md)\.

**Contents**
+ [Inputs](#enable-radial-blur-node-input)
+ [Outputs](#enable-radial-blur-node-output)

![\[enableradialblurnode, enableradialblur\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-enable-radial-blur-node.png)

**Example**  

![\[Use the Enable Radial Blur node to add blur radius on the screen.\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/enable-radial-blur-node-example.png)

## Inputs {#enable-radial-blur-node-input}


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event |  Triggers the node\.  | 
| Amount | Number |  Amount of blurring\. Default value: `1`  | 
| Screen Position | Vector2 |  Screen position of the center of the blur\. Default value: \(`0.5`, `0.5`\) This is the center of the screen\.  | 
|  Radius  | Number |  Blurring radius\. Default value: `1`  | 

## Outputs {#enable-radial-blur-node-output}


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 