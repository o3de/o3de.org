# Get Input Color<a name="get-input-color-node"></a>

Returns the value of an input parameter as a color\. The color channels are assumed to be a floating point, including the alpha channel\. Use this node with the `Float4` substance data type\. 

**Note**  
You can use this node with all substance data types: `Float1` through `Float4` and `Integer1` through `Integer4`\. However, if the input parameter has fewer dimensions, the extra dimensions are assigned a value of `0`\.   
The node does not perform any range conversion\. For example, if an `Integer4` substance data type has a value of \(`255`, `0`, `0`, `255`\), this is returned as \(`255.0`, `0.0`, `0.0`, `255.0`\), which is outside the normal `0.0` to `1.0` range of a color value\.

**Contents**
+ [Inputs](#get-input-color-node-input)
+ [Outputs](#get-input-color-node-output)

![\[GetInputColor gets the color value for a procedural material's parameter.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-get-input-color-node.png)

## Inputs<a name="get-input-color-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Procedural Material | Procedural material | The procedural material to query\. | 
| Input Name | String | The name of the input parameter to return\. | 

## Outputs<a name="get-input-color-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 
| Color | Color |  The value of the specified input parameter\.  Returns \(`0.0`, `0.0`, `0.0`, `0.0`\) if the value can't be found\.  | 