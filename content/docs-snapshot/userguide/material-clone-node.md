# Clone<a name="material-clone-node"></a>

Creates a copy of the specified material\. The material must already be loaded into memory, so that the node can find the material\. If the material is not found, the node returns `Invalid`\.

![\[materialclone, clonematerial, materialclonenode, clonematerialnode\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-material-clone-node.png)

In some cases, you might need to store the material to use later\. For more information, see **[Material Variables](script-canvas-variable-material-node.md)**\.

**Warning**  
Don't trigger this node for every frame\. Each time the **In** event is received, a copy of the material is created\.

**Contents**
+ [Inputs](#material-clone-node-input)
+ [Outputs](#material-clone-node-output)

## Inputs<a name="material-clone-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Material | Material |  The material to be cloned\.  | 

## Outputs<a name="material-clone-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 
| Material | Material | The cloned material\. | 