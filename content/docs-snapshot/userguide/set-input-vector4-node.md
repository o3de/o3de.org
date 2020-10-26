# Set Input Vector4<a name="set-input-vector4-node"></a>

Sets the value of an input parameter as a Vector4\. Use this node with the `Float4` and `Integer4` substance data types\. 

If the input parameter is an `integer` type, the numbers that you specify are rounded down to the nearest integer value\. For example, a value of `4.7` resolves to `4`\.

**Note**  
You can use this node with all substance data types: `Float1` through `Float4` and `Integer1` through `Integer4`\. However, if the input parameter has fewer dimensions, the extra dimensions are ignored\.

**Contents**
+ [Inputs](#set-input-vector4-node-input)
+ [Outputs](#set-input-vector4-node-output)

![\[SetInputVector4 sets the Vector4 value for a procedural material input parameter.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-input-vector4-node.png)

## Inputs<a name="set-input-vector4-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Procedural Material | Procedural material | The procedural material to modify\. | 
| Input Name | String | The name of the input parameter to set\. | 
| Vector4 | Vector4 | The new value to specify\. | 

## Outputs<a name="set-input-vector4-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 