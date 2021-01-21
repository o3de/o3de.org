---
description: ' Use the Get Input String node in the &ALYlong; &script-canvas; editor
  to return the value of a procedural material input parameter as a string or image. '
title: Get Input String
---
# Get Input String {#get-input-string-node}

Returns the value of an input parameter as a string or image\.

If the input parameter is a `string` type, the node returns the text value\. If the input parameter is an `image` type, the node returns the path name of the image file\.

**Contents**
+ [Inputs](#get-input-string-node-input)
+ [Outputs](#get-input-string-node-output)

![\[GetInputString gets the string value for a procedural material's parameter.\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-get-input-string-node.png)

## Inputs {#get-input-string-node-input}


****

| Pin | Type | Description |
| --- | --- | --- |
| In | Event | Triggers the node\. |
| Procedural Material | Procedural material | The procedural material to query\. |
| Input Name | String | The name of the input parameter to return\. |

## Outputs {#get-input-string-node-output}


****

| Pin | Type | Description |
| --- | --- | --- |
| Out | Event | Sends when the node is finished\. |
| String | String | The value of the specified input parameter\. |