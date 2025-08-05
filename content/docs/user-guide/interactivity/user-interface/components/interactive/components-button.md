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

****C++****

In CMakeLists.txt (of your custom gem for example), reference the LyShine Gem under BUILD_DEPENDENCIES, PUBLIC. If you are only using this in your custom gem, you can add this under your Private.Object module.
```
# The ${gem_name}.Private.Object target is an internal target
# It should not be used outside of this Gems CMakeLists.txt
ly_add_target(
    NAME ${gem_name}.Private.Object STATIC
    NAMESPACE Gem
    FILES_CMAKE
        mycustomgem_private_files.cmake
        ${pal_dir}/mycustomgem_private_files.cmake
    TARGET_PROPERTIES
        O3DE_PRIVATE_TARGET TRUE
    INCLUDE_DIRECTORIES
        PRIVATE
            Include
            Source
    BUILD_DEPENDENCIES
        PUBLIC
            AZ::AzCore
            AZ::AzFramework
            LyShine
)
```
That will tell your CMAKE configuration that you want to reference header (files) that are inside the LyShine Gem.

In your header file (of your custom component), include the UiButtonBus header, at the beggining of the file (after #pragma once and before namespace).

You also need to inherit from the UiButtonNotificationBus (this is inside the UiButtonBus.h). In order to listen, or handle one and only one address, ::Handler is the appropriate choice (only on button). In order to listen to multiple addresses ::MultiHandler is advised (multiple buttons). 

```
#pragma once

#include <AzCore/Component/Component.h>
#include <MyCustomGem/MyCustomExampleInterface.h>
#include <LyShine/Bus/UiButtonBus.h>

namespace MyCustomGem
{
    class MyCustomExampleComponent: public AZ::Component, public MyCustomExampleRequestBus::Handler, private UiButtonNotificationBus::Handler // , private UiButtonNotificationBus::MultiHandler
    {
     private:
        AZ::EntityId m_buttonRefresh;
/// rest of the code...
```

In your cpp file (of your custom component), search for the Activate and Deactivate methods and add connect and disconnect methods. This will expose the OnButtonClick method. Here is a cpp example: [**UiButtonBus.h**](https://github.com/o3de/o3de/blob/be6604e28033e205f36a8863251279ff067ce31e/Gems/LyShine/Code/Include/LyShine/Bus/UiButtonBus.h#L64)

```
void MyCustomExampleComponent::Activate()
{
    /// rest of the code...
    UiButtonNotificationBus::Handler::BusConnect(m_buttonRefresh);   
}
void MyCustomExampleComponent::Deactivate()
{
    /// rest of the code...
    UiButtonNotificationBus::Handler::BusDisconnect(m_buttonRefresh);
}
```

You can then override the method in the header.

Add any code you want inside the OnButtonClick event. You can see an example in the file called [LyShineExamplesCppExample](https://github.com/o3de/o3de/blob/be6604e28033e205f36a8863251279ff067ce31e/Gems/LyShineExamples/Code/Source/LyShineExamplesCppExample.h#L43)

```
void MyCustomExampleComponent::OnButtonClick(const AZ::EntityId& entityId)
{
    //AZ::EntityId thisId = GetEntityId();
    //AZ_Printf("MyButton", "EntityId (numeric): %llu", static_cast<unsigned long long>(thisId));
}
```

TIP: To make a component available in the UI editor, replace the "Game" with "UI" and the O3DE reflection will do the rest. Do this in the cpp file of your component in the existing Reflect method.

```

void MyCustomExampleComponent::Reflect(AZ::ReflectContext* context)
{
    if (auto serializeContext = azrtti_cast<AZ::SerializeContext*>(context))
    {
        serializeContext->Class<MyCustomExampleComponent, AZ::Component>()
        ->Version(1)
        -> Field("Element btnRefresh", &MyCustomExampleComponent::m_buttonRefresh)
        ;

        /// other code...

       editContext->Class<MyCustomExampleComponent>("MyCustomExampleComponent", "[Description of functionality provided by this component]")
        ->ClassElement(AZ::Edit::ClassElements::EditorData, "")
        ->Attribute(AZ::Edit::Attributes::Category, "Category/Subcategory")
        ->Attribute(AZ::Edit::Attributes::Icon, "Icons/Components/Component_Placeholder.svg")
        ->Attribute(AZ::Edit::Attributes::AppearsInAddComponentMenu, AZ_CRC_CE("UI")) /// use "UI" instead of "Game" to make it available in the UI Editor

        /// rest of the code...
```

---

****Lua****

In Lua scripting, you can add the script in the UI without any further changes. The ButtonRefresh inside the properties table will allow you to reference your button.

OnActivate and OnDeactivate is often where the connect and disconnect of the bus of the button is done, using the id of the element you passed as an input param (the ButtonRefresh which is an EntityId()).

OnButtonClick method becomes a trigger once you connect the bus. Notice that if you add more buttons, it will use the same OnButtonClick method.

```
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
  self.btnRefreshHandler = UiButtonNotificationBus.Connect(self, self.Properties.ButtonRefresh);
end

function LO:OnDeactivate()
  self.btnRefreshHandler:Disconnect();
end

function LO:OnButtonClick()
  Debug.Log("All button clicks of all buttons pass through this method");
end

-- -- rest of the code

return LO;

```
