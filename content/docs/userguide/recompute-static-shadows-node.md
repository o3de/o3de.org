---
description: ' Use the Recompute Static Shadows node in the &ALYlong; &script-canvas;
  editor to trigger the recalculation of cached shadow maps. '
title: Recompute Static Shadows
---
# Recompute Static Shadows {#recompute-static-shadows-node}

Triggers recalculation of cached shadow maps\.

**Contents**
+ [Inputs](#recompute-static-shadows-node-inputs)
+ [Outputs](#recompute-static-shadows-node-outputs)

![\[recompute static shadows, recomputestaticshadows\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/shadows-recompute-static-shadow.png)

## Inputs {#recompute-static-shadows-node-inputs}


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Bounds | AABB |  Specifies the area where shadow maps should be recomputed\.  | 
| Next Cascade Scale | Number | Multiplier for scaling the bounding boxes for subsequent cached cascades\. The bounding boxes are scaled versions of the preceding cascades\. | 

## Outputs {#recompute-static-shadows-node-outputs}


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 