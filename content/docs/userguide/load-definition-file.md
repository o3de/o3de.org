---
description: ' Use the Load Definition File node in the &ALYlong; &script-canvas;
  editor to load the time of day preset file and update the sky. '
title: Load Definition File
---
# Load Definition File {#load-definition-file}

Loads a time of day preset `XML` file `file_name.xml` and then updates the sky\. For example, the preset file can be named `Time_Of_Day.xml`\.

**Contents**
+ [Inputs](#load-definition-file-input)
+ [Outputs](#load-definition-file-output)

![\[loaddefinitionfile, timeofdaypresetfile, loadtimeofdayfile\]](/images/userguide/scripting/script-canvas/scriptcanvasnodes/script-canvas-load-definition-file-node.png)

## Inputs {#load-definition-file-input}


****

| Pin | Type | Description |
| --- | --- | --- |
| In | Event | Triggers the node to load the time of day preset \.xml file\. |
| File Name | String |  Path to the time of day preset `.xml` file\.  |

## Outputs {#load-definition-file-output}


****

| Pin | Type | Description |
| --- | --- | --- |
| Out | Event | Sends when the node is finished\. |
| Success | Boolean | Returns true if the file loads successfully\. |