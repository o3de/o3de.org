# Set Skybox Stretch<a name="set-sky-box-stretch"></a>

Sets the stretch factor, which affects how the skybox stretches vertically\. Stretching the skybox lowers the horizon line\.

**Contents**
+ [Inputs](#set-sky-box-stretch-input)
+ [Outputs](#set-sky-box-stretch-output)

![\[sky box node, setskyboxstretch\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/environment-set-skybox-stretch.png)

## Inputs<a name="set-sky-box-stretch-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Amount | Number |  Vertical stretch factor\.  A value of `0` does not stretch the skybox\. Specify a higher value to lower the horizon line\. Default value: `0`  | 

## Outputs<a name="set-sky-box-stretch-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 