---
description: ' Use the Enable Volumetric Scattering node in the &ALYlong; &script-canvas;
  editor to add volumetric effects. '
title: Enable Volumetric Scattering
---
# Enable Volumetric Scattering {#enable-volumetric-scattering-node}

Adds a volumetric effect for simulating fog, snow, or other environments\. You can specify the color, speed, and amount for each effect, so that you can simulate various environments, such as lava\.

**Note**  
This effect has high performance impact and can negatively affect the frame rate\.

To disable the effect, see [Disable Volumetric Scattering](/docs/userguide/rendering/disable/volumetric-scattering-node.md)\.

**Contents**
+ [Inputs](#enable-volumetric-scattering-note-input)
+ [Outputs](#enable-volumetric-scattering-node-output)

![\[enablevolumetricscatttering, enablevolumetricscatteringnode\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-enable-volumetric-scattering-node.png)

## Inputs {#enable-volumetric-scattering-note-input}


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event |  Triggers the node\.  | 
| Amount | Number |  Sets volumetric scattering amount\. Default value: `1`  | 
| Tiling | Number |  Sets volumetric scattering tiling\. Default value: `1`  | 
|  Speed  | Number |  Sets volumetric scattering animation speed\. Default value: `1`  | 
| Color | Color | Sets volumetric scattering color tint\. | 

## Outputs {#enable-volumetric-scattering-node-output}


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 