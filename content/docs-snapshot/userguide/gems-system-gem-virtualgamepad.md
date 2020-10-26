# Virtual Gamepad Gem<a name="gems-system-gem-virtualgamepad"></a>

Use the Virtual Gamepad gem to provide your game's UI with touch screen capabilities on mobile devices\. After you enable the Virtual Gamepad gem, you can add the virtual gamepad components to your game's UI in the **UI Editor**\.

**Topics**
+ [Configuring Virtual Gamepad Behavior](#gems-system-gem-virtualgamepad-behavior)
+ [Virtual Gamepad Component Properties](#gems-system-gem-virtualgamepad-properties)
+ [Displaying the Virtual Gamepad at Runtime](#gems-system-gem-virtualgamepad-displaying)

The Virtual Gamepad gem includes a sample UI canvas that you can either customize for your game or use as an example for a new UI canvas\. To view this canvas in the [**UI Editor**](ui-editor-using.md), open `Gems\VirtualGamepad\Assets\UI\Canvases\VirtualGamepad\VirtualGamepad.uicanvas`\.

There is no limit for the number of active UI canvases that can contain virtual gamepad components\. This means you can create many virtual gamepad canvases to display for the appropriate scenarios, or even at the same time\. For example, you can show a different UI canvas on each half of your virtual gamepad\.

**Example**  
To experiment with the Virtual Gamepad gem, run the [Advanced\_RinLocomotion Sample](animation-editor-rin-locomotion-sample.md) level from the [Samples Project](sample-project-samples.md) on a device with touch screen support\.  

![\[Provide your game with touch screen capabilities when played on a mobile device.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shared-gems-system-gem-virtualgamepad-1.png)

You can customize the virtual gamepad's appearance and layout by creating or modifying an existing UI canvas\. For more information on working with UI Canvases, see [Working with UI Canvases](ui-editor-creating-canvases.md)\. 

## Configuring Virtual Gamepad Behavior<a name="gems-system-gem-virtualgamepad-behavior"></a>

You can configure the virtual gamepad's behavior in the **UI Editor**\.

**To configure virtual gamepad behavior**

1. In the **UI Editor**, add the [UI components](ui-editor-components.md) **VirtualGamepadButton** and **VirtualGamepadThumbStick** to the UI canvas\. 

1. For each component, select an **Input Channel**\.

![\[Input Channel selection for the VirtualGamepadButton\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/gems-system-gem-virtualgamepad-2.png)

For more information about input in Lumberyard, see [Input in Amazon Lumberyard](input-intro.md)\.

To modify the list of available virtual gamepad input channels, use the Project Configurator to edit the virtual gamepad's system component \. For more information, see [Configuring Advanced Settings](configurator-advanced.md)\.

![\[Use the Project Configurator to modify the list of available virtual gamepad input channels.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/gems-system-gem-virtualgamepad-3.png)

## Virtual Gamepad Component Properties<a name="gems-system-gem-virtualgamepad-properties"></a>

The Virtual Gamepad gem features two components that you can use to customize input for your mobile games: 

****VirtualGamepadButton****  
**VirtualGamepadButton** has one property, **Input Channel**\. Select the appropriate input\.  

![\[Input Channel selection for the VirtualGamepadButton.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/gems-system-gem-virtualgamepad-properties-1.png)

****VirtualGamepadThumbstick****  
**VirtualGamepadThumbstick** has the following properties:  

![\[VirutalGamepadThumbStick component properties\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/gems-system-gem-virtualgamepad-properties-2.png)  
****    
[\[See the AWS documentation website for more details\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/gems-system-gem-virtualgamepad.html)

## Displaying the Virtual Gamepad at Runtime<a name="gems-system-gem-virtualgamepad-displaying"></a>

You can enable the virtual gamepad for runtime by creating instructions that loads the virtual gamepad UI canvas\. You can do this with C\+\+, Lua, or Script Canvas\. For more information, see [UICanvasManager](lua-scripting-ces-api-ui-uicanvasmanager.md) and [UICanvasComponent](lua-scripting-ces-api-ui-uicanvascomponent.md)\.

The following example Lua script displays a virtual gamepad UI canvas if touch screen support is detected\.

```
local touchDevice =
    InputDeviceRequestBus.Event.GetInputDevice(InputDeviceId(InputDeviceTouch.name))
if (touchDevice and touchDevice:IsSupported()) then
    self.virtualGamepadCanvasId = UiCanvasManagerBus.Broadcast.LoadCanvas("UI/Canvases/VirtualGamepad/virtualgamepad.uicanvas");
end
```

The following example Lua script checks if a physical gamepad is connected\. If found, the Lua script disables the virtual gamepad\.

```
local gamepadDevice =
    InputDeviceRequestBus.Event.GetInputDevice(InputDeviceId(InputDeviceGamepad.name))
if (gamepadDevice and gamepadDevice:IsConnected()) then
    UiCanvasBus.Event.SetEnabled(self.virtualGamepadCanvasId, false);
end
```

The following Lua script enables the virtual gamepad when a physical gamepad is disconnected and disables the virtual gamepad when a physical gamepad is connected\. 

You can find a working example of this Lua script in the `lumberyard_version\dev\SamplesProject\AnimationSamples\Advanced_RinLocomotion\Scripts\Advanced_RinLocomotion.lua` file\.

```
function Example:OnActivate()
    self.inputDeviceNotificationBus = InputDeviceNotificationBus.Connect(self);
end

function Example:OnInputDeviceConnectedEvent(inputDevice)
    if (inputDevice.deviceName == InputDeviceGamepad.name) then
        UiCanvasBus.Event.SetEnabled(self.virtualGamepadCanvasId, false);
    end
end

function Example:OnInputDeviceDisonnectedEvent(inputDevice)
    if (inputDevice.deviceName == InputDeviceGamepad.name) then
        UiCanvasBus.Event.SetEnabled(self.virtualGamepadCanvasId, true);
    end
end

function Example:OnDeactivate()
    if (self.inputDeviceNotificationBus) then
        self.inputDeviceNotificationBus:Disconnect();
    end
end
```