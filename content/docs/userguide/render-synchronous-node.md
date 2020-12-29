# Render Synchronous<a name="render-synchronous-node"></a>

Regenerates the texture maps for all procedural materials that have pending parameter changes\. This update is done synchronously, so that the textures are updated by the time the node completes\. In general, use this node in cases where the frame rate isn't a concern and you want to avoid the complexity of the **[Render Asynchronous](render-asynchronous-node.md)** node\.

**Note**  
If the **Set Input <Type>** nodes don't modify a procedural material, which means the procedural material doesn't have pending parameter changes, the **Render Synchronous** node ignores the material\.

**Contents**
+ [Inputs](#render-synchronous-node-input)
+ [Outputs](#render-synchronous-node-output)

![\[RenderSynchronousNode generates the texture map for all materials with parameter changes.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-render-synchronous-node.png)

## Inputs<a name="render-synchronous-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 

## Outputs<a name="render-synchronous-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 