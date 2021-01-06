---
description: ' Use the Enable Ghosting node in the &ALYlong; &script-canvas; editor
  to enable ghosting effects. '
title: Enable Ghosting
---
# Enable Ghosting<a name="enable-ghosting-node"></a>

Apply a ghosting effect that overlaps and blurs previous frames together\.

To disable the effect, see [Disable Ghosting](/docs/userguide/rendering/disable/ghosting-node.md)\.

**Contents**
+ [Inputs](#enable-ghosting-note-input)
+ [Outputs](#enable-ghosting-node-output)

![\[enableghosting, enableghostingnode\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-enable-ghosting-node.png)

**Example**  

![\[Use the Enable Ghosting node to add blurriness as you move the camera.\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/enable-ghosting-node-example.gif)

## Inputs<a name="enable-ghosting-note-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event |  Triggers the node\.  | 
| Amount | Number |  Strength of the ghosting effect\. Default value: `0`  | 

## Outputs<a name="enable-ghosting-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 