# Get Enabled<a name="high-quality-shadow-get-enabled"></a>

Returns whether an entity's **[High Quality Shadow](component-high-quality-shadow.md)** component is enabled\.

**Contents**
+ [Inputs](#high-quality-shadow-get-enabled-input)
+ [Outputs](#high-quality-shadow-get-enabled-output)

![\[getenabled, highqualityshadow, highqualityshadownode\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/high-quality-shadow-get-enabled.png)

## Inputs<a name="high-quality-shadow-get-enabled-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Source | EntityID |  References a specific entity from which events are generated\. By default, it references **Self**, the entity to which the **[Script Canvas](component-script-canvas.md)** component attaches the current script\.  You can also select another entity\. For more information, see [Setting Entity Targets](script-canvas-referencing-entities.md)\.  | 

## Outputs<a name="high-quality-shadow-get-enabled-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 
| Enabled | Event | Returns true if the [Script Canvas](component-script-canvas.md) component is enabled\. | 