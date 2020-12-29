# Set Input Color<a name="set-input-color-node"></a>

Sets the value of an input parameter as a color\. The color channels are assumed to be floating point, including an alpha channel\. Use this node with the `Float4` substance data type\. 

**Note**  
You can use this node with all substance data types: `Float1` through `Float4` and `Integer1` through `Integer4`\. However, if the input parameter has fewer dimensions, the extra dimensions are ignored\.   
If the input parameter is an `integer` type, the numbers that you specify are rounded down to the nearest integer value \(for example, a value of `4.7` resolves to `4`\)\. For example, if you use a 50% gray opaque color to set a `Float4`, this results in a value of \(`0.5`, `0.5`, `0.5`, `1.0`\)\. If you use the same color to set an `Integer4`, this results in a value of \(`0`, `0`, `0`, `1`\)\.

**Contents**
+ [Inputs](#set-input-color-node-input)
+ [Outputs](#set-input-color-node-output)

![\[SetInputColor sets the color value for a procedural material input parameter.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-input-color-node.png)

## Inputs<a name="set-input-color-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Procedural Material | Procedural material | The procedural material to modify\. | 
| Input Name | String | The name of the input parameter to set\. | 
| Color | Color | The new value to specify\. | 

## Outputs<a name="set-input-color-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 