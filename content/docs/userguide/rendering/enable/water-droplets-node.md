---
description: ' Use the Enable Water Droplet node in the &ALYlong; &script-canvas;
  editor to enable water droplets. '
title: Enable Water Droplets
---
# Enable Water Droplets {#enable-water-droplets-node}

Apply a water effect that appears from various sources on the screen\. Unlike the **[Enable Rain Drops](/docs/userguide/rendering/enable/rain-drops-node.md)** node, this node simulates a splash of water thrown on the screen\. For example, you can use this node when the camera leaves the water\.

To disable the effect, see [Disable Water Droplets](/docs/userguide/rendering/disable/water-droplets-node.md)\.

**Contents**
+ [Inputs](#enable-water-droplets-node-input)
+ [Outputs](#enable-water-droplets-node-output)

![\[enablewaterdropletsnode, enablewaterdroplets\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-enable-water-droplets-node.png)

**Example**  

![\[Use the Enable Water Droplets node to have water wash down the screen.\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/enable-water-droplets-node-example.gif)

## Inputs {#enable-water-droplets-node-input}


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Amount | Number | Amount of water\.Default value: `5` | 

## Outputs {#enable-water-droplets-node-output}


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the effect starts\. | 