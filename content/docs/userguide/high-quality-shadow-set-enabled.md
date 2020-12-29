# Set Enabled<a name="high-quality-shadow-set-enabled"></a>

Indicates whether the entity's **[High Quality Shadow](component-high-quality-shadow.md)** component is enabled\.

**Contents**
+ [Inputs](#high-quality-shadow-set-enabled-input)
+ [Outputs](#high-quality-shadow-set-enabled-output)

![\[setenabled, highqualityshadow\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/high-quality-shadow-set-enabled.png)

## Inputs<a name="high-quality-shadow-set-enabled-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Source | EntityID |  References a specific entity from which events are generated\. By default, it references **Self**, the entity to which the **[Script Canvas](component-script-canvas.md)** component attaches the current script\.  You can also select another entity\. For more information, see [Setting Entity Targets](script-canvas-referencing-entities.md)\.  | 
| Enabled | Boolean | Indicates whether the [Script Canvas](component-script-canvas.md) component is enabled\. | 

## Outputs<a name="high-quality-shadow-set-enabled-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 