# Enable Depth of Field<a name="enable-depth-of-field-node"></a>

Configures the depth of field \(DOF\) effect, which gives you control over distance, range, and amount\. You can use the node to add realism to scenes by simulating the way a real\-world camera works\. You can use a broad depth of field to focus on the entire scene, or use a shallow depth of field to have sharp focus only on objects that are a specific distance from the camera\.

To disable the effect, see [Disable Depth of Field](disable-depth-of-field-node.md)\.

You can also apply depth of field in the Track View\. See [Adding a Depth of Field Node](cinematics-track-view-nodes-dof.md)\.

**Contents**
+ [Inputs](#enable-depth-of-field-note-input)
+ [Outputs](#enable-depth-of-field-node-output)

![\[enabledepthoffieldnode, enabledepthoffield\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/script-canvas-enable-depth-of-field-node.png)

**Example**  

![\[Use the Enable Depth of Field node to simulate focusing like a camera.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/scriptcanvasnodes/enable-depth-of-field-node-example.png)

## Inputs<a name="enable-depth-of-field-note-input"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| In | Event |  Triggers the node\.  | 
| Focus Distance | Number |  Distance the focus is from the camera\. Positive values are in front of the camera while negative values are behind the camera\.  | 
|  Focus Range  | Number |  Distance toward and away from the camera until maximum blurriness is reached\.  | 
| Blur Amount | Number | Maximum blurriness value\. | 
| CoC Scale | Number |  Sets the circle of confusion scale when a cone of light in a specific area appears unfocused or blurry\. For example, a cone of light from a lens focuses on a specific point, but the light does not appear in perfect focus\.   This is also known as the blur circle of a blur spot\.  | 
| Center Weight | Number | Sets the central samples weight\. | 

## Outputs<a name="enable-depth-of-field-node-output"></a>


****  

| Pin | Type | Description | 
| --- | --- | --- | 
| Out | Event | Sends when the node is finished\. | 