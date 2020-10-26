# Set Color Chart<a name="set-color-chart-node"></a>

Applies a color chart texture for color grading\.

**Note**  
When you call the node for the first time, you must set a default color chart for the fade to work correctly\. The **Set Color Chart** node uses this color chart as a reference to fade into the next color chart\. If the **Set Color Chart** node doesn't have a default color chart to fade from, the node will immediately fade to the first color chart, regardless of the fade time\.  
For an example script, see [Example Set Color Chart Script](creating-a-color-chart-for-lumberyard.md#color-chart-script-example)\.

**Contents**
+ [Inputs](#set-color-chart-node-input)
+ [Creating a Color Chart](creating-a-color-chart-for-lumberyard.md)
+ [Console Variables for Color Charts](set-color-chart-console-variables.md)

![\[setcolorchartnode, setcolorchart, colorchart, colorgrading, setcolorgrading\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-set-color-chart-node.png)

## Inputs<a name="set-color-chart-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Texture Name | String |  The name of a color chart texture\. For more information, see [Finding the Texture Name](finding-texture-by-names.md)\.  | 
| Fade Time | Number |  Number of seconds to fade into the color grading\.  | 