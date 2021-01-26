---
description: ' Use the On Render Finished node in the Amazon Lumberyard Script Canvas editor
  to trigger when a procedural material update finishes. '
title: On Render Finished
---
# On Render Finished {#on-render-finished-node}

This node is triggered when an update for a procedural material finishes rendering\.

You can use the node to detect when texture updates scheduled by the **[Render Asynchronous](/docs/userguide/render-asynchronous-node.md)** node are complete\.

**Contents**
+ [Outputs](#on-render-finished-node-output)

![\[OnRenderFinished triggers when the procedural material render finishes.\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-on-render-finished-node.png)

To verify that the render update is the event that you want, compare the **Render ID** values that the **[Render Asynchronous](/docs/userguide/render-asynchronous-node.md)** and **On Render Finished** nodes return\. You can use the **Equal To \(==\)** node, such as in the following example\.

![\[Verify the Render ID for the Render Asynchronous and On Render Finished nodes.\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-on-render-finished-node-2.png)

## Outputs {#on-render-finished-node-output}


****

| Pin | Type | Description |
| --- | --- | --- |
| Out | Event | Sends when a procedural material render update is complete\. |
| Render ID | Number | Unique ID for the scheduled render process\.  |