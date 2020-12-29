# Get Input String<a name="get-input-string-node"></a>

Returns the value of an input parameter as a string or image\.

If the input parameter is a `string` type, the node returns the text value\. If the input parameter is an `image` type, the node returns the path name of the image file\.

**Contents**
+ [Inputs](#get-input-string-node-input)
+ [Outputs](#get-input-string-node-output)

![\[GetInputString gets the string value for a procedural material's parameter.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-get-input-string-node.png)

## Inputs<a name="get-input-string-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Procedural Material | Procedural material | The procedural material to query\. | 
| Input Name | String | The name of the input parameter to return\. | 

## Outputs<a name="get-input-string-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 
| String | String | The value of the specified input parameter\. | 