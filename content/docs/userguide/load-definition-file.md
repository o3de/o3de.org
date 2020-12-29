# Load Definition File<a name="load-definition-file"></a>

Loads a time of day preset `XML` file `file_name.xml` and then updates the sky\. For example, the preset file can be named `Time_Of_Day.xml`\.

**Contents**
+ [Inputs](#load-definition-file-input)
+ [Outputs](#load-definition-file-output)

![\[loaddefinitionfile, timeofdaypresetfile, loadtimeofdayfile\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-load-definition-file-node.png)

## Inputs<a name="load-definition-file-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node to load the time of day preset \.xml file\. | 
| File Name | String |  Path to the time of day preset `.xml` file\.  | 

## Outputs<a name="load-definition-file-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 
| Success | Boolean | Returns true if the file loads successfully\. | 