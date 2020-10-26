# On Render Finished<a name="on-render-finished-node"></a>

This node is triggered when an update for a procedural material finishes rendering\.

You can use the node to detect when texture updates scheduled by the **[Render Asynchronous](render-asynchronous-node.md)** node are complete\.

**Contents**
+ [Outputs](#on-render-finished-node-output)

![\[OnRenderFinished triggers when the procedural material render finishes.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-on-render-finished-node.png)

To verify that the render update is the event that you want, compare the **Render ID** values that the **[Render Asynchronous](render-asynchronous-node.md)** and **On Render Finished** nodes return\. You can use the **Equal To \(==\)** node, such as in the following example\.

![\[Verify the Render ID for the Render Asynchronous and On Render Finished nodes.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-on-render-finished-node-2.png)

## Outputs<a name="on-render-finished-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when a procedural material render update is complete\. | 
| Render ID | Number | Unique ID for the scheduled render process\.  | 