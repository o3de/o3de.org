# Apply Effect Group At Position<a name="apply-effect-group-at-position-node"></a>

Applies an effect group at a specific position in the world\. You must use this node instead of the **[Enable Effect Group](enable-effect-group-node.md)** node for effect group `xml` files that include the **fadeDistance** parameter\.

The strength of the effect depends on the camera's proximity to the specified location\. You can call this node multiple times to apply the same effect group at multiple locations\. The effect strength is cleared for each frame, so the node needs to be triggered every frame\. 

For more information, see [Setting Effect Strength Based on Camera Distance](effect-groups-strength-camera-distance.md)\.

**Contents**
+ [Inputs](#apply-effect-group-at-position-node-input)
+ [Outputs](#apply-effect-group-at-position-node-output)

![\[applyeffectgroupatposition, applyefffectgroupatpositionnode\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-apply-effect-group-at-position-node.png)

## Inputs<a name="apply-effect-group-at-position-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Group Name | String | Relative path to the effect group xml file\. | 
| Position | Vector3 | World position where the effect is applied\. | 

## Outputs<a name="apply-effect-group-at-position-node-output"></a>


**Outputs**  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the effect starts\. | 