---
linkTitle: Gestures
title: Gestures Gem
description: The Gestures Gem provides detection for common gesture-based input actions in Open 3D Engine (O3DE).
toc: true
---

You can use the Gestures Gem to recognize common gesture-based input, including the following:

* **Tap** or **Click** - Single-touch, discrete gesture
* **Drag** or **Pan** - Single-touch, continuous gesture
* **Hold** or **Press** - Single-touch, continuous gesture
* **Swipe** - Single-touch, discrete gesture
* **Pinch** - Multiple-touch, continuous gesture
* **Rotate** - Multiple-touch, continuous gesture

Single-touch gestures (such as tap, drag, hold, and swipe) can be detected with touch or mouse input. However, multiple-touch gestures (such as pinch and rotate) can only be recognized on multi-touch enabled devices such as iOS or Android. You can extend the underlying C++ gesture recognition framework to support your custom gesture recognizers.

Enable the Gem in your project to automatically start receiving gesture input events that you can respond to.

{{< note >}}
Gesture recognizers can only be configured in the Gem's source at the moment. There is no UI available to modify them.
{{< /note >}}

## Responding to Gesture Input

Each gesture recognizer that the **Gestures** system component exposes corresponds to a gesture input channel that belongs to a gesture input device.

You can use gesture input channels in the same way as other input channels with C++, Lua, or Script Canvas. You can map the gesture input channels to gameplay actions with an **Input** component.

To add input to an entity, see the [Input component](/docs/user-guide/components/reference/gameplay/input).

**Example Lua Script**
The following script listens for and responds to the default double press gesture.

```lua
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

For more information, see [Input in Open 3D Engine](/docs/user-guide/interactivity/input/).
