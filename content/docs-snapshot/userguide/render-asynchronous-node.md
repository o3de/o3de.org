# Render Asynchronous<a name="render-asynchronous-node"></a>

Schedules all procedural materials that have pending parameter changes to regenerate their texture maps\. This update is done asynchronously, so that the textures are updated within a few frames\. Use this node \(instead of the **[Render Synchronous](render-synchronous-node.md)** node\) for changes made during gameplay\.

The node returns a **Render ID**, which you can use with the **[On Render Finished](on-render-finished-node.md)** node to detect when the textures finish updating\. This should only be necessary if you need to synchronize another action with the texture update\.

If the **Force** parameter is disabled, the node renders only procedural materials that are not currently rendering\. Use this option when updating procedural materials every frame\. Otherwise, the render queue can back up and may not catch up\. 

When the **Force** parameter is enabled, the node is guaranteed to render the changes\. Use this option to make only occasional updates to the procedural material, or if you previously updated the procedural material every frame and you want a final update to guarantee that the update is not missed\.

For an example script with the **Render Asynchronous** node, see the [example script](script-canvas-procedural-material-nodes.md#example-brick-wall-render-asynchronous-script)\.

**Note**  
If the **Set Input <Type>** nodes don't modify a procedural material, which means the procedural material doesn't have pending parameter changes, the **Render Asynchronous** node ignores the material\.

**Contents**
+ [Inputs](#render-asynchronous-node-input)
+ [Outputs](#render-asynchronous-node-output)

![\[RenderAsynchronous node schedule updates for pending changes for a procedural material.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-render-asynchronous-node.png)

## Inputs<a name="render-asynchronous-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Force | Boolean |  Forces the render to be scheduled\. Specify `false` for better performance on high frequency updates\.  | 

## Outputs<a name="render-asynchronous-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 
| Render ID | Number | Unique ID for the scheduled render process\. The value is 0 if a render was not scheduled\. | 