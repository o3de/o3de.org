---
description: ' Use the Area Light component on an entity to light an area in &ALYlong;. '
title: Area Light
---
# Area Light {#component-area-light}

Use the **Area Light** component on an entity to light an area\.

The **Area Light** component has the following settings:

**Visible**  
Shows the light\.

**On initially**  
When created, the light is on by default\.

## General Settings {#component-area-light-general-settings}

See the following general settings:

**Color**  
The color of the light\.

**Diffuse multiplier**  
Sets the strength of the diffuse color\.

**Specular multiplier**  
Sets the strength of the specular brightness\.

**Ambient**  
Light acts as a multiplier for cubemap values\.

## Area Light Settings {#component-area-light-settings}

See the following area light settings:

**Area width**  
Width of the area light in meters\.

**Area Height**  
Height of the area light in meters\.

**Max Distance**  
Maximum distance in meters that the area light extends\.

**FOV**  
Field of View \(FOV\) in degrees\.

## Options {#component-area-light-options}

See the following options:

**View distance multiplier**  
Adjusts the maximum view distance\. For example, **1\.0** uses the default and **1\.1** is 10% farther than the default\.

**Minimum spec**  
Minimum specification value at which the light is enabled\.

**Cast shadow spec**  
The minimum specification at which shadows are cast\.

**Voxel GI mode**  
Mode for light interaction with voxel global illumination \(GI\)\. Choose **None**, **Static**, or **Dynamic**\.

**Use VisAreas**  
Light uses visible areas\. If unselected, light ignores visible areas\.

**Indoor only**  
Light is only rendered indoors\.

**Affects this area only**  
Light affects only the immediate area\.

**Volumetric fog only**  
Light affects only volumetric fog\.

**Volumetric fog**  
Light affects volumetric fog and surrounding area\.

## Shadow Settings {#component-area-light-shadow}

See the following shadow settings:

**Terrain Shadows**  
Includes the terrain in the shadow casters for this light\.

## Animation {#component-area-light-animation}

See the following animation settings:

**Style**  
Enter a number to specify a preset light animation curve to play as defined in the `Light.cfx` file\. Valid values are **0** to **48**\. You can also use values **40** to **48** for testing and debugging\.

**Speed**  
Multiple of the base animation rate\. For example, a value of **2\.0** makes an animation play twice as fast\.

**Phase**  
Animation start offset from **0** to **1**\. A value of **0\.1** is 10% into the animation\. For example, you can use this setting, for to prevent lights in the same scene, with the same animation, from being animated in unison\.

## EBus Request Bus Interface {#component-light-ebusrequest}

Use the following request functions with the EBus interface to communicate with other components of your game\.

For more information about using the event bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](/docs/userguide/programming/ebus/intro.md)\.

### SetLightState {#light-ebus-setlightstate}

Turns the light on or off\.

**Parameters**  
`On` or `Off`

**Return**  
None

**Scriptable**  
Yes

### TurnOnLight {#light-ebus-turnonlight}

Turns the light on\.

**Parameters**  
None

**Return**  
None

**Scriptable**  
Yes

### TurnOffLight {#light-ebus-turnofflight}

Turns off the light\.

**Parameters**  
None

**Return**  
None

**Scriptable**  
Yes

### ToggleLight {#light-ebus-togglelight}

Toggles the light state from on to off, or off to on\.

**Parameters**  
None

**Return**  
None

**Scriptable**  
Yes

## EBus Notification Bus Interface {#component-light-ebusnotification}

Use the following notification functions with the EBus interface to communicate with other components of your game\.

For more information, see [Working with the Event Bus \(EBus\) system](/docs/userguide/programming/ebus/intro.md)\.

### LightTurnedOn {#light-ebus-lightturnedon}

Sends a signal when the light is turned on\.

**Parameters**  
None

**Return**  
None

**Scriptable**  
Yes

### LightTurnedOff {#light-ebus-lightturnedoff}

Sends a signal when the light is turned off\.

**Parameters**  
None

**Return**  
None

**Scriptable**  
Yes

The following is an example of script using the **Request Bus Interface**\.

```
function example:OnActivate()
    LightComponentRequestBus.Event.TurnOnLight(self.entityId)
    LightComponentRequestBus.Event.TurnOffLight(self.entityId)
    LightComponentRequestBus.Event.ToggleLight(self.entityId)
end
```