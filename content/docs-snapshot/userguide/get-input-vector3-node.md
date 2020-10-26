# Get Input Vector3<a name="get-input-vector3-node"></a>

Returns the value of an input parameter as a Vector3\. Use this node with the `Float3` and `Integer3` substance data types\. 

**Note**  
You can use this node with all substance data types: `Float1` through `Float4` and `Integer1` through `Integer4`\. However, if the input parameter has fewer dimensions, the extra dimensions are assigned a value of `0`\. If there are more dimensions, they are ignored\. 

**Contents**
+ [Inputs](#get-input-vector3-node-input)
+ [Outputs](#get-input-vector3-node-output)

![\[GetInputVector3 gets the Vector3 value for a procedural material's parameter.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-get-input-vector3-node.png)

## Inputs<a name="get-input-vector3-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Procedural Material | Procedural material | The procedural material to query\. | 
| Input Name | String | The name of the input parameter to return\. | 

## Outputs<a name="get-input-vector3-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 
| Vector3 | Vector3 |  The value of the specified input parameter\.  Returns `0` if the value can't be found\.  | 