# Set Input Vector2<a name="set-input-vector2-node"></a>

Sets the value of an input parameter as a Vector2\. Use this node with the `Float2` and `Integer2` substance data types\. 

If the input parameter is an `integer` type, the numbers that you specify are rounded down to the nearest integer value\. For example, a value of `4.7` resolves to `4`\.

**Note**  
You can use this node with all substance data types: `Float1` through `Float4` and `Integer1` through `Integer4`\. However, if the input parameter has fewer dimensions, the extra dimensions are ignored\. If the input parameter has more dimensions, they are assigned a value of `0`\. 

**Contents**
+ [Inputs](#set-input-vector2-node-input)
+ [Outputs](#set-input-vector2-node-output)

![\[SetInputVector2 sets the Vector2 value for a procedural material input parameter.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-input-vector2-node.png)

## Inputs<a name="set-input-vector2-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Procedural Material | Procedural material | The procedural material to modify\. | 
| Input Name | String | The name of the input parameter to set\. | 
| Vector2 | Vector2 | The new value to apply\. | 

## Outputs<a name="set-input-vector2-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 