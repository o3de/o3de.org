# Audio Environment<a name="component-audio-environment"></a>

The **Audio Environment** component provides access to features of the [Audio Translation Layer \(ATL\)](audio-default-controls.md) environments\. Environments are used to apply environmental effects such as reverb or echo\.

![\[Image NOT FOUND\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/audio/component-audio-environment1.png)

## Audio Environment Properties<a name="component-audio-environment-properties"></a>

The **Audio Environment** component has the following property:

**Default Environment**  
Enter the name of the audio environment to use by default when setting amounts\.

## EBus Request Bus Interface<a name="component-audio-environ-ebusrequest"></a>

Use the following request functions with the EBus interface to communicate with other components of your game\.

For more information about using the Event Bus \(EBus\) interface, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.

### SetAmount<a name="environ-audio-ebus-setamount"></a>

Sets the amount of environmental **'send'** to apply to the default environment, if set\.

**Parameters**  
`amount` – Float value of the amount to set

**Return**  
None

**Scriptable**  
Yes

### SetEnvironmentAmount<a name="environ-audio-ebus-setenvironmentamount"></a>

Sets the amount of environmental **'send'** to apply to the specified environment\.

**Parameters**  
`environmentName` – Name of ATL Environment to set an amount on  
`amount` – Float value of the amount to set

**Return**  
None

**Scriptable**  
Yes