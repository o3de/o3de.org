# Input in Amazon Lumberyard<a name="input-intro"></a>

Use the information in this section to learn about game input in Amazon Lumberyard\.

**Note**  
For information on the **Input** component that replaces legacy action maps, see [Input](component-input.md)\.

Input is what differentiates interactive experiences from all other entertainment media\. Regardless of genre or operating system or device, every game is driven by some form of player interaction with a physical input device\. There are many different types of input devices, each of which can produce a wide range of input data\. Furthermore, the way this data is delivered to an application is rarely consistent across devices or operating systems\. As a cross\-operating system and device game engine, Lumberyard's goal is to provide independent access to input data from any supported device\. The goal is to provide a common interface with these qualities:
+ OS and device agnostic
+ Extensible
+ Efficient

In addition, input data should have these attributes:
+ Must be obtainable by subscribing to input device events
+ Must be obtainable on demand by polling the state or value of an input device
+ Can be a custom payload, but adds no overhead when not used

Lumberyard's input system satisfies all of these requirements and replaces the [deprecated input system](https://docs.aws.amazon.com/lumberyard/latest/legacyreference/input-legacy.html)\.

## AZ Framework Input<a name="input-intro-azframework"></a>

The Lumberyard input interface is called AZ framework input\. AZ framework already provides abstracted interfaces for OS\-specific features like file I/O and application lifecycle management, so the AZ framework code location is a natural fit\.

The AZ framework input interface uses the `AZCore` EBus system and defines the following classes and EBuses:
+ `InputDevice` – A base class that represents a physical input device\.
+ `InputDeviceId` – A device name and device index that together uniquely identify an `InputDevice`\.
+ `InputDeviceNotificationBus` – An EBus interface that subscribes to events from input devices when they connect or disconnect\.
+ `InputDeviceRequestBus` – An EBus interface that queries input devices about their associated input channels or current connected state\.
+ `InputChannel` – A base class that represents a specific source of input data \(for example, the left mouse button\)\. Input devices typically have multiple input channels\.
+ `InputChannelId` – A name that uniquely identifies an `InputChannel`\.
+ `InputChannelNotificationBus` – An EBus interface that subscribes to events from input channels when the channels are active or when their state or value changes\.
+ `InputChannelRequestBus` – An EBus interface that obtains an input channel from the input channel's ID\. You can then query the input channel directly for its current state or value\.
+ `InputChannelEventListener` – An event monitor that inherits from `InputChannelNotificationBus` but provides additional features\. Subscribers can use the additional features to receive events in priority order or filter events based on the source device or channel\. Subscribers can also consume events so that the events aren’t passed on to lower priority monitors\.

### Processing the Input<a name="input-intro-processing"></a>

To process input, you can simply inherit from `AzFramework::InputChannelEventListener`\. You can also create a filter to receive events only from specific input devices or channels, and then override `OnInputChannelEvent` to process the input data\.

If you want to query the current input state directly, use `AzFramework`::`InputChannelRequestBus` to obtain an input channel's ID\. Then query the input channel for its current state or value\.

#### Text Input Interfaces<a name="input-intro-text-input-interfaces"></a>

The following interfaces are designed to process text input\. The input is delivered as a complete string of UTF\-8 code points\. This eliminates the requirement to keep track of and interpret individual code units or convert from other encodings\.
+ `InputTextEventNotificationBus` – An EBus interface that subscribes to text events from input devices or input channels\.
+ `InputTextEntryRequestBus` – An EBus interface that sends text entry requests\. The requests inform input devices that the user is expecting to start or stop entering text\.
+ `InputTextEventListener` – An event monitor that inherits from `InputTextNotificationBus` but provides additional features\. Subscribers can use the additional features to receive events in priority order or consume events so that the events aren’t passed on to lower priority monitors\.

#### Auxiliary Input Interfaces<a name="input-intro-auxiliary-input-interfaces"></a>

The following AZ framework input auxiliary interfaces are only implemented by certain input devices\. You can use these interfaces to query or post data related to device activity like vibration effects, motion sensors, or the mouse cursor\.
+ `InputHapticFeedbackBus` – An EBus interface that sends haptic feedback requests to connected input devices\.
+ `InputMotionSensorRequestBus` – An EBus interface that sends motion sensor requests to connected input devices\.
+ `InputSystemCursorRequestBus` – An EBus interface that queries or changes the state, position, or appearance of the system cursor\.

### Input Devices<a name="input-intro-devices"></a>

All input device classes inherit from `AzFramework::InputDevice`\. While multiple instances of the same class can exist, every input device is identified by a unique `InputDeviceId`\.

#### Input Devices Included in Lumberyard<a name="input-intro-devices-included-in-lumberyard"></a>

The base class is designed so that you can inherit from it to implement new types of input devices\. However, Lumberyard already includes implementations for the following devices:


****  

| Device Type | Supported Operating Systems | 
| --- | --- | 
| Mouse | Windows, macOS | 
| Keyboard | Windows and macOS | 
| Gamepad | Windows, macOS, iOS, Android, consoles | 
| Touch | iOS, Android | 
| Motion | iOS, Android | 
| Virtual keyboard | iOS, Android, consoles | 
| Virtual reality controller | Oculus, OpenVR | 

This core set of input devices are managed by the `AzFramework::InputSystemComponent`\. You can use this component to configure the type and number of input devices that your application creates at startup\.

#### Creating Input Devices<a name="input-intro-creating-input-devices"></a>

You can create and implement new types of input devices by inheriting from `AzFramework::InputDevice` and creating or destroying instances of the new class as required\. For examples, see the [Configuring your Project for Virtual Reality](virtual-reality-configuring.md), which define and create new types of input devices that inherit from `AzFramework::InputDevice`\. Their code is located at the Lumberyard directory locations `\dev\Gems\Oculus` and `\dev\Gems\OpenVR`, respectively\.

The implementation details of each input device differ depending on the device type and operating system\. However, almost all devices follow a similar pattern\. They use an OS\-specific API to obtain raw input data for each frame and then update all the device’s associated input channels accordingly\.

When you implement an input device, use only your device’s `TickInput` function to update the value of the input channels\. This ensures that input events are delivered at the same time every frame\.

Depending on how the input device gets the raw, operating system\-specific input, you might have to use one of the following techniques:
+ Polling the underlying input API on each call to your input device’s `TickInput` function\. For examples, see all `InputDeviceGamepad` implementations in the directory `\dev\Code\Framework\AzFramework\AzFramework\Input\Devices\Gamepad`\.
+ Queuing or coalescing input data from the application’s main message loop until the next call to `TickInput`\. For an example, see `InputDeviceMouse` in the directory `\dev\Code\Framework\AzFramework\AzFramework\Input\Devices\Mouse`\.
+ Ensuring input channels are updated in a thread\-safe manner if no raw input is received on the main thread\. For an example, see `InputDeviceTouchAndroid` in the directory `\dev\Code\Framework\AzFramework\AzFramework\Input\Devices\Touch`\.

### Input Channels<a name="input-intro-channels"></a>

Input devices can have multiple input channels\. Each channel represents a discrete source of input data that is uniquely identified by an `InputChannelId`\.

Input channels use `AzFramework::InputChannelNotificationBus::OnInputChannelEvent` to broadcast events\. A channel broadcasts events when the channel's state or value changes from one frame to the next or if the channel is still active or held\. Input channels can also be accessed directly and polled at any time to query their current state and value\.

#### Creating Input Channels<a name="input-intro-channels-creating"></a>

Like the `AzFramework::InputDevice` base class, you can inherit from `AzFramework::InputChannel` to implement new types of input data sources\.

#### Input Channels Included in Lumberyard<a name="input-intro-channels-included-in-lumberyard"></a>

Lumberyard provides the following input channel implementations that are used by the devices listed in the [Input Devices](#input-intro-devices) section\. You can also use these implementations for new input devices\.


****  

| Input Channel | Example Use | 
| --- | --- | 
| InputChannelAnalog | Gamepad trigger | 
| InputChannelAnalogWithPosition2D | Touch with pressure at a position | 
| InputChannelAxis1D | Gamepad thumbstick x or y | 
| InputChannelAxis2D | Gamepad thumbstick x and y together | 
| InputChannelAxis3D | Motion sensor acceleration, rotation, or magnetic field | 
| InputChannelDelta | Mouse wheel | 
| InputChannelDeltaWithSharedPosition2D | Mouse movement | 
| InputChannelDigital | Gamepad button or keyboard key | 
| InputChannelDigitalWithPosition2D | Touch without pressure at a position | 
| InputChannelDigitalWithSharedPosition2D | Mouse button at a position | 
| InputChannelQuaternion | Motion sensor orientation | 