---
description: ' Use the Audio Trigger component to set up play and stop triggers in
  your game in &ALY;. '
slug: component-audio-trigger
title: Audio Trigger
---
# Audio Trigger<a name="component-audio-trigger"></a>

The **Audio Trigger** component provides basic play and stop features so that you can set up [Audio Translation Layer \(ATL\)](/docs/userguide/audio/default-controls.md) play and stop triggers that can be executed on demand\. With an audio trigger, you can also enable the player to run or stop audio triggers by name on entities\.

## Audio Trigger Properties<a name="component-audio-trigger-properties"></a>

The Audio Trigger component has the following properties\.

**Default 'play' Trigger**  
Enter the name of the audio trigger that this component runs when **'play'** is called\. You can change this property to specify a different default audio trigger\.

**Default 'stop' Trigger**  
Enter the name of the audio trigger that this component runs when **'stop'** is called\. You can specify any trigger here; you do not need to specify a **'stop'** trigger in order to stop audio, but it is a best practice to pair the two triggers\. If you leave this setting blank, the **'stop'** trigger simply stops the audio trigger specified for **'play'**\.

**Obstruction Type**  
Select an option for the raycasts used in calculation of obstruction and occlusion\.  
+ **Ignore**
+ **SingleRay**
+ **MultiRay**

**Play immediately**  
Select this option to run upon component activation the audio **'play'** trigger\.

## EBus Request Bus Interface<a name="component-audio-trigger-ebusrequest"></a>

Use the following request functions with the EBus interface to communicate with other components of your game\.

For more information about using the Event Bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](/docs/userguide/programming/ebus/intro.md)\.

### Play<a name="audio-ebus-play"></a>

Runs the default **'play'** trigger, if set\.

**Parameters**  
None

**Return**  
None

**Scriptable**  
Yes

### Stop<a name="audio-ebus-stop"></a>

Runs the default **'stop'** trigger, if set\. If no **'stop'** trigger is set, ends the default **'play'** trigger\.

**Parameters**  
None

**Return**  
None

**Scriptable**  
Yes

### ExecuteTrigger<a name="audio-ebus-execute"></a>

Runs the specified audio trigger\.

**Parameters**  
`triggerName` – Name of the audio trigger to run\.

**Return**  
None

**Scriptable**  
Yes

### KillTrigger<a name="audio-ebus-kill"></a>

Cancels the specified audio trigger\.

**Parameters**  
`triggerName` – Name of the audio trigger to cancel\.

**Return**  
None

**Scriptable**  
Yes

### KillTrigger<a name="audio-ebus-killall"></a>

Cancels all audio triggers that are active on an entity\.

**Parameters**  
None

**Return**  
None

**Scriptable**  
Yes

### SetMovesWithEntity<a name="audio-ebus-setmoves"></a>

Specifies whether triggers should update position as the entity moves\.

**Parameters**  
`shouldTrackEntity` – Boolean indicating whether triggers should track the entity's position\.

**Return**  
None

**Scriptable**  
Yes

## EBus Response Bus Interface<a name="component-audio-trigger-ebusresponse"></a>

Use the following response functions with the EBus interface to communicate with other components of your game\.

For more information about using the Event Bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](/docs/userguide/programming/ebus/intro.md)\.

### OnTriggerFinished<a name="audio-ebus-ontrigger"></a>

Informs all listeners about an audio trigger that has finished playing \(the sound has ended\)\.

**Parameters**  
`triggerId` – ID of trigger that was successfully executed\.

**Return**  
None

**Scriptable**  
Yes