# Gestures Gem<a name="gems-system-gem-gestures"></a>

You can use the Gestures gem to recognize common gesture\-based input, which includes the following:
+ Tap or click – Single\-touch, discrete gesture
+ Drag or pan – Single\-touch, continuous gesture
+ Hold or press – Single\-touch, continuous gesture
+ Swipe – Single\-touch, discrete gesture
+ Pinch – Multiple\-touch, continuous gesture
+ Rotate – Multiple\-touch, continuous gesture

Single\-touch gestures \(such as tap, drag, hold, and swipe\) can be detected with touch or mouse input\. However, multiple\-touch gestures \(such as pinch and rotate\) can only be recognized on multi\-touch enabled devices such as iOS or Android\. You can extend the underlying C\+\+ gesture recognition framework to support your custom gesture recognizers\.

![\[Enable the Gestures gem to detect common gesture input actions.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/gestures-gem.png)

To enable the Gestures gem for your project, see [Add modular features and assets with Gems](gems-system-gems.md)\.

**Topics**
+ [Configuring Gesture Recognizers](#configuring-gesture-recognizers)
+ [Responding to Gesture Input](#responding-to-gesture-input)

## Configuring Gesture Recognizers<a name="configuring-gesture-recognizers"></a>

You can configure gesture recognizers with C\+\+ and the **Gestures** system component in the **System Entity Editor**\. For more information, see [Configuring Advanced Settings](configurator-advanced.md)\.

**To configure gesture recognizers**

1. In the Project Configurator, click **Advanced Settings**\.

1. In the **System Entity Editor**, click **Add Component**, and then expand **Gestures**\.

1. For each gesture recognizer, specify your preferred values\. For example, if you want to change the **Min Clicks or Taps** for a double press gesture, specify a new value\.  
![\[Use the System Entity Editor to manage the gesture settings.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/gems/gestures-system-entity-editor-settings.png)
**Note**  
Pause on the gesture recognizer to see a description and the valid values\.

1. Make your changes and then click **Save**\.

## Responding to Gesture Input<a name="responding-to-gesture-input"></a>

Each gesture recognizer that the **Gestures** system component exposes corresponds to a gesture input channel that belongs to a gesture input device\.

You can use gesture input channels in the same way as other input channels with C\+\+, Lua, or Script Canvas\. You can map the gesture input channels to gameplay actions with an **Input** component\. This component is part of the [Input Management Framework](gems-system-gem-input.md) and [Starting Point Input](gems-system-starting-point-input.md) gems\.

To add input to an entity, see the **[Input](component-input.md)** component\.

**Example Lua Script**  
The following script listens for and responds to the default double press gesture\.  

```
function GestureExample:OnActivate()
    self.inputChannelNotificationBus = InputChannelNotificationBus.Connect(self);
end

function GestureExample:OnInputChannelEvent(inputChannel)
    if (inputChannel.channelName == InputDeviceGestures.gesture_double_press) then
        -- Respond to the default double press gesture
    end
end

function GestureExample:OnDeactivate()
    if (self.inputChannelNotificationBus) then
        self.inputChannelNotificationBus:Disconnect();
    end
end
```

For more information, see [Input in Amazon Lumberyard](input-intro.md)\.