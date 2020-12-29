# Enable Water Droplets<a name="enable-water-droplets-node"></a>

Apply a water effect that appears from various sources on the screen\. Unlike the **[Enable Rain Drops](enable-rain-drops-node.md)** node, this node simulates a splash of water thrown on the screen\. For example, you can use this node when the camera leaves the water\.

To disable the effect, see [Disable Water Droplets](disable-water-droplets-node.md)\.

**Contents**
+ [Inputs](#enable-water-droplets-node-input)
+ [Outputs](#enable-water-droplets-node-output)

![\[enablewaterdropletsnode, enablewaterdroplets\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-enable-water-droplets-node.png)

**Example**  

![\[Use the Enable Water Droplets node to have water wash down the screen.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/enable-water-droplets-node-example.gif)

## Inputs<a name="enable-water-droplets-node-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event | Triggers the node\. | 
| Amount | Number | Amount of water\.Default value: `5` | 

## Outputs<a name="enable-water-droplets-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the effect starts\. | 