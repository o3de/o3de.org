---
description: ' Use the Enable Visual Artifacts node in the Amazon Lumberyard Script Canvas
  editor to enable visual artifact filters such as an old television. '
title: Enable Visual Artifacts
---
# Enable Visual Artifacts {#enable-visual-artifacts-node}

Applies effects associated with old television sets, such as grain, vsync, and interlacing\. You can mask the effect with a texture or apply it to the entire screen\.

To disable the effect, see [Disable Visual Artifacts](/docs/userguide/rendering/disable/visual-artifacts-node.md)\.

**Contents**
+ [Inputs](#enable-visual-artifacts-note-input)
+ [Outputs](#enable-visual-artifacts-node-output)

![\[enablevisualartifacts, enablevisualartifactsnode\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-enable-visual-artifacts-node.png)

## Inputs {#enable-visual-artifacts-note-input}


****

| Pin | Type | Description |
| --- | --- | --- |
| In | Event |  Triggers the node\.  |
| VSync | Number | Amount of vsync \(vertical sync\) visible\. |
| VSync Frequency | Number | Frequency of the vertical sync\. |
| Interlacing | Number | Amount of interlacing visible\. |
| Interlacing Tiling | Number | Amount of interlacing tiling\. |
| Interlacing Rotation | Number | Amount of interlacing rotation\. |
| Sync Wave Phase | Number | Sync wave phase\. |
| Sync Wave Frequency | Number | Sync wave frequency\. |
| Sync Wave Amplitude | Number | Sync wave amplitude\. |
| Chroma Shift | Number | Chromatic shift\. |
| Grain | Number | Amount of image grain\. |
| Color Tint | Number | Amount of color tinting\.  |
| Texture Name | String  | Visual artifacts mask texture\. |

## Outputs {#enable-visual-artifacts-node-output}


****

| Pin | Type | Description |
| --- | --- | --- |
| Out | Event | Sends when the node is finished\. |