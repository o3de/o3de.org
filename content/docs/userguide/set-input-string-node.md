description: ' Use the Set Input String node in the &ALYlong; &script-canvas; editor
  to set the value of a procedural material input parameter as a string or image. '
slug: set-input-string-node
title: Set Input String
---
# Set Input String<a name="set-input-string-node"></a>

Sets the value for an input parameter as a string or an image\.

If the input parameter is a `string` type, the node sets the text value that the procedural material uses\. If the input parameter is an `image` type, this sets the path name of the image file that the procedural material uses\.

**Contents**
+ [Inputs](#set-input-string-node-input)
+ [Outputs](#set-input-string-node-output)

![\[GetInputString sets the string value for a procedural material input parameter.\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-input-string-node.png)

## Inputs<a name="set-input-string-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Procedural Material | Procedural material | The procedural material to modify\. | 
| Input Name | String | The name of the input parameter to set\. | 
| String | String | The new value to apply\. | 

## Outputs<a name="set-input-string-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 