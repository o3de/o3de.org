# Disable Effect Group<a name="disable-effect-group-node"></a>

Disables a specific effect group of settings that was enabled with the **[Enable Effect Group](enable-effect-group-node.md)** node\. The **Group Name** must match the same name specified in the **[Enable Effect Group](enable-effect-group-node.md)** node\.

For more information about effect group files, see [Customizing Post\-Processing Effects](effect-groups-customizing-intro.md)\.

![\[disableeffectgroupnode, disableeffectgroup\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-disable-effect-group-node.png)

## Inputs<a name="disable-effect-group-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Group Name | String | Relative path to the effect group xml file\. | 

## Outputs<a name="disable-effect-group-node-output"></a>


**Outputs**  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the effect is disabled\. | 