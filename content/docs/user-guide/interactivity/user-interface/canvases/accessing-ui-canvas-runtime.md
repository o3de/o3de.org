---
linkTitle: Accessing UI Elements at Runtime
description: ' Learn how to manipulate a UI canvas at runtime using Open 3D Engine (O3DE). '
title: Accessing UI Elements at Runtime
weight: 900
---

Once a UI canvas loads, you can communicate with its UI elements at runtime by creating [Script Canvas](/docs/user-guide/scripting/script-canvas/get-started) graphs, [Lua scripts](/docs/user-guide/scripting/lua/ebus) or by using [EBuses](/docs/user-guide/programming/messaging/ebus) directly from C++.

## Communicating with components attached to other UI elements

You can communicate with a UI element only after it has been activated. If you have a Script Canvas graph or Lua script attached to a UI element that needs to get or set information on another UI element or its owning UI canvas, your script should wait until all UI elements activate and their parent and UI canvas references are initialized. It is recommended to connect to the **UI Activation bus** and wait for the **In-game Post-activate event** before requesting the relevant information.

{{< important >}}
To ensure that UI elements are not accessed before they have been activated, connect to the **UI Activation bus** and subscribe to the **In-game Post-activate event**, which only executes after all UI elements activate and their parent and UI canvas references are initialized.
{{< /important >}}

The following example shows how to use the UI Initialization bus in a Lua script attached to a UI element.

```lua
function samplescript:OnActivate()
    -- Connect to the UI Initialization bus to receive events
    self.initializationHandler = UiInitializationBus.Connect(self, self.entityId);
end

function samplescript:InGamePostActivate()
    -- All UI elements have now been activated and their parent and UI canvas references initialized
    self.initializationHandler:Disconnect()
    self.StartButtonHandler = UiButtonNotificationBus.Connect(self, self.Properties.StartButton)
end
```

The following example shows how to use the UI Initialization bus in a Script Canvas graph attached to a UI element.

![UI Activation Node](/images/user-guide/interactivity/user-interface/editor/ui-initialization-sc.png)

---

**Cpp**

The following example shows how to use the UI Initialization bus in a C++ UI-Component attached to a UI element.

Open your UI component header, include the (1) UiInitializationBus, inherit from (2) UiInitializationBus and override the (3) InGamePostActivate function.

```cpp
#pragma once

#include <AzCore/Component/Component.h>
#include <MyCustomGem/MyCustomExampleInterface.h>
#include <LyShine/Bus/UiInitializationBus.h> // (1) this is the bus

namespace MyCustomGem
{
    class MyCustomExampleComponent: public AZ::Component, public MyCustomExampleRequestBus::Handler,
      public UiInitializationBus::Handler // (2) 
    {
    public:
        virtual void InGamePostActivate() override; // (3)
/// rest of the code...
```

Inside your cpp file you should (1) connect and (2) disconnect your Ui Initialization Bus. To evaluate if the event is working as expected, you can print something in the (3) console. Even if you test this in the UI Editor, the messages will appear in your Game-Editor console. The Open 3D Engine LyShine Gem API reference about this bus is available [here](/docs/api/gems/lyshine/class_ui_initialization_interface)

```cpp
void MyCustomExampleComponent::Activate()
{
    /// rest of the code...
    UiInitializationBus::Handler::BusConnect(GetEntityId()); // (1)
}
void MyCustomExampleComponent::Deactivate()
{
    /// rest of the code...
    UiInitializationBus::Handler::BusDisconnect(GetEntityId()); // (2)
}
void MyCustomExampleComponent::InGamePostActivate()
{
    // AZ_Printf("MyCustomExampleComponent::InGamePostActivate", "Triggered after all UI was loaded and ready \n"); (3)
}
```
