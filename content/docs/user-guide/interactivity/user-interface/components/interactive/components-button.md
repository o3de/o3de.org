---
linkTitle: UI Button
description: ' Use a button component to make an element behave like a button in the O3DE UI Editor. '
title: UI Button Component
weight: 100
---

You can use a **Button** component to make an element behave like a button.

![UI Editor Button component](/images/user-guide/interactivity/user-interface/components/interactive/ui-editor-components-button.png)

To see an in-game example of a completed canvas with the **Button** component, open the level UiFeatures in the project SamplesProject. Press **Ctrl+G** to play the game, and then choose **Components**, **Interactable Components**, **Button**. You can view the different types of buttons you can create. Press **Esc** to exit the game.

To view this same canvas in the **UI Editor**, open `\Gems\LyShineExamples\Assets\UI\Canvases\LyShineExamples\Comp\Button\Styles.uicanvas`.

Note the following:
+ This component is typically applied to an element with an image component; if no visual or image component is present, many of the button's properties have no effect.

+ If you want to add a text label to a button, add a child element with a text component.
 
+ To define borders for a sliced image type, open the **Sprite Editor**. To do this, click the arrow (open-in) ![Open In Icon](/images/user-guide/interactivity/user-interface/editor/sprite-editor/ui-editor-components-button-1.png) next to **Sprite path**.

You can add a prebuilt **Button** element from the slice library. When you do this, a basic button with the text string "Button" is automatically created in your **Hierarchy** pane.

**To add a Button element from the slice library**
+ In the [**UI Editor**](/docs/user-guide/interactivity/user-interface/editor), choose **New**, **Element from Slice Library**, **Button**.

**To edit a button component**

In the [**UI Editor**](/docs/user-guide/interactivity/user-interface/editor) **Properties** pane, expand **Button** and do the following, as appropriate:

****Interactable****

See [Properties](properties) to edit the common interactive component settings.

****Actions**, **Click****

Enter a text string. This string is sent as an action on the UI canvas when the button is clicked.

---

****Cpp****

To create your own UI components, check the [Working with UI Components](https://www.docs.o3de.org/docs/user-guide/interactivity/user-interface/components/working/) page.

Once the component is available in the UI editor; and the UI button is in the canvas; you can attach the cpp component to it.

Open your component header, include the (1) UiButtonBus and inherit from (2) UiButtonNotificationBus. In order to listen or handle one and only one address use ::Handler. The EntityID variable is required to connect and disconnect the button. OnButtonClick is the event obtained through the inheritance. Here is an example of what you should have in your header:

```cpp
#pragma once

#include <AzCore/Component/Component.h>
#include <MyCustomGem/MyCustomExampleInterface.h>
#include <LyShine/Bus/UiButtonBus.h> // (1) bus 

namespace MyCustomGem
{
    class MyCustomExampleComponent: public AZ::Component, public MyCustomExampleRequestBus::Handler,
      private UiButtonNotificationBus::Handler // (2)
    {
     public:
        void OnButtonClick() override;
     private:
        AZ::EntityId m_buttonRefresh; // (3) your element ID
/// rest of the code...
```

Inside your cpp file you should (1) connect and (2) disconnect. To evaluate if the event is working as expected, you can (3) print something in the console. Even if you test this in the UI Editor, the messages will appear in your Game-Editor console. Feel free to inspect the [UIButtonBus.h](https://github.com/o3de/o3de/blob/be6604e28033e205f36a8863251279ff067ce31e/Gems/LyShine/Code/Include/LyShine/Bus/UiButtonBus.h#L64) code.

```cpp
void MyCustomExampleComponent::Activate()
{
    /// rest of the code...
    UiButtonNotificationBus::Handler::BusConnect(m_buttonRefresh); // (1) only one 
}
void MyCustomExampleComponent::Deactivate()
{
    /// rest of the code...
    UiButtonNotificationBus::Handler::BusDisconnect(m_buttonRefresh); // (2) only one 
}

void MyCustomExampleComponent::OnButtonClick()
{
    //const AZ::EntityId* btnId = UiButtonNotificationBus::GetCurrentBusId();
    //AZ_Printf("ButtonClick", "Button clicked: %s\n", btnId->ToString().c_str()); // (3) print
}
```

---

****Lua****

In Lua scripting, you can add the script in the UI without any further changes. The ButtonRefresh inside the properties table will allow you to reference your button.

You should (1) connect and (2) disconnect the bus, using the id of the element you passed as an input param (the ButtonRefresh which is an EntityId()).

OnButtonClick method becomes a trigger once you connect the bus. Notice that if you add more buttons, it will use the same OnButtonClick method.

```lua
local YourLuaScript =
{
    Properties =
    {
        ButtonRefresh =
        {
            default = EntityId(),
            description = "Element that contains the Dynamic Layout component. Default is called btnRefresh"
        }
    }
}

local LO = YourLuaScript;

function LO:OnActivate()
  self.btnRefreshHandler = UiButtonNotificationBus.Connect(self, self.Properties.ButtonRefresh); -- (1)
end

function LO:OnDeactivate()
  self.btnRefreshHandler:Disconnect(); -- (2)
end

function LO:OnButtonClick()
  Debug.Log("All button clicks of all buttons pass through this method"); 
end

-- -- rest of the code

return LO;

```
