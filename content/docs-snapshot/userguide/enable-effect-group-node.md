# Enable Effect Group<a name="enable-effect-group-node"></a>

Enables a specific group of effects setting that are defined in an `xml` file\. 

**Note**  
You must use the **[Apply Effect Group At Position](apply-effect-group-at-position-node.md)** node for effect group `xml` files that include the **fadeDistance** parameter\. 

To disable the effect, see [Disable Effect Group](disable-effect-group-node.md)\.

For more information about effect group files, see [Customizing Post\-Processing Effects](effect-groups-customizing-intro.md)\.

**Contents**
+ [Inputs](#enable-effect-group-node-input)
+ [Outputs](#enable-effect-group-node-output)

![\[enableeffectgroup, enableeffectgroupnode\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-enable-effect-group-node.png)

## Inputs<a name="enable-effect-group-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node | 
| Group Name | String | Relative path to the effect group xml file\. | 

## Outputs<a name="enable-effect-group-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the effect starts\. | 