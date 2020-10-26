# Get Input Vector2<a name="get-input-vector2-node"></a>

Returns the value of an input parameter as a Vector2\. Use this node with the `Float2` and `Integer2` substance data types\. 

**Note**  
You can use this node with all substance data types: `Float1` through `Float4` and `Integer1` through `Integer4`\. However, if the input parameter has fewer dimensions, the extra dimensions are assigned a value of `0`\. If there are more dimensions, they are ignored\. 

**Contents**
+ [Inputs](#get-input-vector2-node-input)
+ [Outputs](#get-input-vector2-node-output)

![\[GetInputVector2 gets the Vector2 value for a procedural material's parameter.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-get-input-vector2-node.png)

## Inputs<a name="get-input-vector2-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Procedural Material | Procedural material | The procedural material to query\. | 
| Input Name | String | The name of the input parameter to return\. | 

## Outputs<a name="get-input-vector2-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 
| Vector2 | Vector2 |  The value of the specified input parameter\.  Returns `0` if the value can't be found\.  | 