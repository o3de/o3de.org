# Set Input Number<a name="set-input-number-node"></a>

Sets the value of an input parameter as a number\. You can use this node with the `Float1` and `Integer1` substance data types\. 

If the input parameter is an integer type, the numbers that you specify are rounded down to the nearest integer value\. For example, a value of `4.7` resolves to `4`\.

**Note**  
You can use this node with all substance data types: `Float1` through `Float4` and `Integer1` through `Integer4`\. However, if the input parameter has more dimensions, the extra dimensions are assigned a value of `0`\.

**Contents**
+ [Inputs](#set-input-number-node-input)
+ [Outputs](#set-input-number-node-output)

![\[SetInputNumber sets the numeric value for a procedural material input parameter.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-input-number-node.png)

## Inputs<a name="set-input-number-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Procedural Material | Procedural material | The procedural material to modify\. | 
| Input Name | String | The name of the input parameter to set\. | 
| Number | Number | The new value to apply\. | 

## Outputs<a name="set-input-number-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 