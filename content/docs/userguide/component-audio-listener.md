# Audio Listener<a name="component-audio-listener"></a>

With the **Audio Listener** component, you can place a virtual microphone in the environment\. An audio listener acts as a sink for sound sources in the virtual world, and 3D audio rendering is processed with respect to the listener's world transform\. You can specify the audio listener's position and rotation independently\.

## Audio Listener Properties<a name="component-audio-listener-properties"></a>

The **Audio Listener** component has the following properties:

**Rotation Entity**  
Link this property to an entity where the audio listener adopts the rotational part of the transform\. The current entity is used if a value is not specified\.

**Position Entity**  
Link this property to an entity where the audio listener adopts the positional part of the transform\. The current entity is used if a value is not specified\.

**Fixed Offset**  
Link this property to an entity where the audio listener adopts the offset part of the transform\. The current entity is used if a value is not specified\.

**Listener Enabled**  
Controls the initial state of the listener\.

## Using the Audio Listener Component<a name="component-audio-listener-setup"></a>

Only one audio listener is supported in a game\. You can add the **Audio Listener** component to an entity that contains the game camera\.

**To set up the Audio Listener component**

1. In Lumberyard Editor, right\-click the viewport in your level, and click **Create new component entity**\.

1. Click **Tools**, **Entity Inspector**\. Be sure that your new component entity is selected in the viewport\.

1. In the **Entity Inspector**, click **Add Component**, **Audio**, **Audio Listener**\.

## EBus Request Bus Interface<a name="component-audio-listener-ebus-request"></a>

Use the following request functions with the EBus interface to communicate with other components of your game\.

For more information about using the Event Bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

### SetRotationEntity<a name="audio-listener-ebus-setrotationentity"></a>

Specify the entity with the rotational part of the transform that the audio listener will adopt\.

**Parameters**  
`entityId` – Entity to use for the rotational part of the transform

**Return**  
None

**Scriptable**  
Yes

### SetPositionEntity<a name="audio-listener-ebus-setpositionentity"></a>

Specify the entity with the positional part of the transform that the audio listener will adopt\.

**Parameters**  
`entityId` – Entity to use for the positional part of the transform

**Return**  
None

**Scriptable**  
Yes

### SetFullTransformEntity<a name="audio-listener-ebus-setfulltransformentity"></a>

Specify the entity with the full transform that the audio listener will adopt\.

**Parameters**  
`entityId` – Entity to use for the transform

**Return**  
None

**Scriptable**  
No