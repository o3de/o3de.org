# Particle<a name="component-particle"></a>

You can use the **Particle** component to place a single particle emitter on an entity\. An entity can have multiple **Particle** components\.

## Particle Component Properties<a name="component-particle-properties"></a>

![\[Particle component properties\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/component-particle-properties.png)

The **Particle** component has the following properties:


****  

| Name | Description | 
| --- | --- | 
| Visible |  If set, renders the emitter\.  | 
| Enable |  If set, activates the particle effect\.  | 
| Particle effect library |  Specifies the particle effect library\. The **Particle** component uses the effects from an XML file\.  | 
| Emitters |  Select an emitter from the list after specifying a particle effect library\. If emitters are not listed, you can create emitters in the [**Particle Editor**](particle-editor.md)\.  | 
| Color tint |  Select the color of the effect with the color swatch\.  | 
| Pre\-Roll |  If set, the emitter behaves as though it has been running indefinitely\.  | 
| Count scale |  Sets the multiplier for the particle count\. Valid values: `0` to `1000` Default value: `1`  | 
| Time scale |  Sets the multiplier for the emitter time evolution\. Valid values: `0` to `1000` Default value: `1`  | 
| Pulse period |  Sets the frequency at which to restart the emitter\.  Default value: `1`  | 
| Global size scale |  Sets the multiplier for all effect sizes\. Valid values: `1` to `100` Default value: `1`  | 
| Particle size scale x |  Sets the multiplier for the particle size on the x\-axis\. Valid values: `1` to `100`  | 
| Particle size scale y |  Sets the multiplier for the particle size on the y\-axis\. Valid values: `1` to `100`  | 
|  **Particle size scale z**  |  Sets the multiplier for the particle size on the z\-axis\. This parameter applies to geometry particles only\. For more information, see the [Geometry](particle-editor-reference-particles.md#geometry-attribute) parameter\. Valid values: `1` to `100`  | 
| Particle size scale random |  Randomizes the particle size scale\. Valid values: `0` to `1`  | 
| Speed scale |  Sets the multiplier for the particle emission speed\. Valid values: `1` to `1000`  | 
| Strength Curve Time |  Controls all **Strength Over Emitter Life** curves\. The curves will use this **Strength Curve Time** parameter instead of the actual emitter lifetime\. Negative values are ignored\. Valid values: `-1` to `1`  | 
| Ignore rotation |  If set, ignores the entity's rotation\.  | 
| Not attached |  If set, ignores the entity's position\. The emitter does not follow its entity\.  | 
| Register by bounding box |  If set, uses the bounding box instead of the entity's position to appear in the visible area\.  | 
| Use LOD |  If cleared, ignores the emitter's level of detail \([LOD](https://docs.aws.amazon.com/lumberyard/latest/userguide/ly-glos-chap.html#lod)\)\.  | 
| Target Entity |  Uses the specified target entity for emitters with the **Target Attraction** parameter or similar features enabled\. For more information, see [Movement Attribute](particle-editor-reference-movement.md)\.  | 
| View distance multiplier |  Adjusts the maximum view distance\. If the value is `1`, the default is used\. If the value is `1.1`, the view distance would be 10% further than the default\.  Set the value to `100` for infinite visibility\. Valid values: `0` to `100`  | 
| Use VisAreas | Allow visible areas to control this component's visibility\. | 
| Enable audio |  If set, enables audio\.  | 
| Audio RTPC |  Select the audio [Real\-Time Parameter Control \(RTPC\)](audio-default-controls.md) that the particle effect instance drives\.  | 

## EBus Request Bus Interface<a name="component-particle-ebusrequest"></a>

Use the following request function with the EBus \(event bus\) interface to communicate with other components of your game\.

For more information, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.


****  

| Name | Description | Parameters | Return | Scriptable | 
| --- | --- | --- | --- | --- | 
| Hide | Hides the emitter\. | None | None | Yes | 
| Show | Shows the emitter\. | None | None | Yes | 
| SetVisibility | Sets an explicit value for emitter visibility\. | Boolean | None | Yes | 

**Example**  
The following script uses the EBus interface\.  

```
function example:OnActivate()
    ParticleComponentRequestBus.Event.Show(self.entityId)
    ParticleComponentRequestBus.Event.Hide(self.entityId)
    ParticleComponentRequestBus.Event.SetVisibility(self.entityId, false)
end
```