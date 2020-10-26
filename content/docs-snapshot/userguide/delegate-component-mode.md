# Step 2: Add a ComponentModeDelegate<a name="delegate-component-mode"></a>

To add this feature to the **Point Light** component, you must update the component so that it can detect the intent to begin editing a component and manage the creation of a Component Mode\. To do so, add a new type called a `ComponentModeDelegate` to your existing component\.

**To add a ComponentModeDelegate**

1. Navigate to the `EditorPointLightComponent.h` file and open the file in a text editor\.

1. Add the `ComponentModeDelegate`\.  
**Example EditorPointLightComponent\.h**  

------
#### [ Before ]

   ```
   #pragma once
     
   #include "EditorLightComponent.h"
     
   namespace LmbrCentral
   {
       /*!
        * In-editor Point Light component.
        * Handles previewing and activating lights in the editor.
        */
       class EditorPointLightComponent
           : public EditorLightComponent
       {
       public:
           AZ_COMPONENT(EditorPointLightComponent, "{00818135-138D-42AD-8657-FF3FD38D9E7A}", AzToolsFramework::Components::EditorComponentBase);
     
           static void Reflect(AZ::ReflectContext* context);
     
           void Init() override;
     
       protected:
           const char* GetLightTypeText() const override
           {
               return "Point Light";
           }
       };
   } // namespace LmbrCentral
   ```

------
#### [ After ]<a name="new-component-mode-example"></a>

   See the following code changes\.

   ```
   #pragma once
     
   #include "EditorLightComponent.h"
     
   // BEGIN ADD
   #include <AzToolsFramework/ComponentMode/ComponentModeDelegate.h>
   // END ADD
     
   namespace LmbrCentral
   {
       /**
        * In-editor Point Light component.
        * Handles previewing and activating lights in the editor.
        */
       class EditorPointLightComponent
           : public EditorLightComponent
       {
       public:
           AZ_COMPONENT(EditorPointLightComponent, "{00818135-138D-42AD-8657-FF3FD38D9E7A}", AzToolsFramework::Components::EditorComponentBase);
     
           static void Reflect(AZ::ReflectContext* context);
     
           void Init() override;
           // BEGIN ADD
           void Activate() override;
           void Deactivate() override;
           // END ADD
     
       protected:
           const char* GetLightTypeText() const override
           {
               return "Point Light";
           }
     
           // BEGIN ADD
           using ComponentModeDelegate = AzToolsFramework::ComponentModeFramework::ComponentModeDelegate;            
           ComponentModeDelegate m_componentModeDelegate; ///< Responsible for detecting ComponentMode activation
                                                          ///< and creating a concrete ComponentMode(s).
           /// END ADD
       };
   } // namespace LmbrCentral
   ```

------

   In this example, there's an `#include` for `ComponentModeDelegate.h`, which is where you add the file as a member\. The `using` declaration reduces the length of the `m_componentDelegate` definition\. The updated file also provides `Activate` and `Deactivate` member functions for the component\.

1. Save the file\.

Now that you've updated the `EditorPointLightComponent.h` file, you must make changes to the `EditorPointLightComponent.cpp` implementation file\.

**To update the EditorPointLightComponent\.cpp**

1. In a text editor, open the `EditorPointLightComponent.cpp` file\.

1. Add an `#include` for the unwritten Component Mode and comment out the change\. This becomes the `EditorPointLightComponentMode.h` file\. 

   ```
   // #include "EditorPointLightComponentMode.h"
   ```

1. Serialize the `m_componentModeDelegate` member to expose it to the `EditContext`\.

   ```
   ->Field("ComponentMode", &EditorPointLightComponent::m_componentModeDelegate)
   ```

1. Enter the following changes so that the `ComponentModeDelegate` appears in the **Entity Inspector**\. This change adds the **Edit** button to the **Point Light** component\.

   ```
   ->DataElement(AZ::Edit::UIHandlers::Default, &EditorPointLightComponent::m_componentModeDelegate, "Component Mode", "Point Light Component Mode")
       ->Attribute(AZ::Edit::Attributes::Visibility, AZ::Edit::PropertyVisibility::ShowChildrenOnly)
   ```
**Tip**  
The `Attribute` ensures that the **Edit** button appears inline without being nested inside the `ComponentModeDelegate` class/struct\.

1. Inside the `Activate` call, add the following code\.

   ```
   m_componentModeDelegate.ConnectWithSingleComponentMode <
       EditorPointLightComponent, /*EditorPointLightComponentMode*/>(
           AZ::EntityComponentIdPair(GetEntityId(), GetId()), nullptr);
   ```

   1. The helper function `ConnectWithSingleComponentMode` handles the most common case of adding a Component Mode\. This call wraps a more complex API where multiple Component Modes can be activated at the same time\. 

      For example, see the `EditorTubeShapeComponent.h` file\.

   1. Specify the component type and Component Mode itself\.
**Note**  
The template parameters generalize connecting and instantiating Component Modes\. For more information, see the `CreateComponentModeBuilder.h` and its `AddComponentModes` function\.

   1. Specify the `EntityId` that the component is attached to and the `ComponentId`\. 
**Note**  
It's possible \(although not often used\) to address an EBus not only by the `EntityId` but by the `EntityId` and `ComponentId` pair\. A `ComponentId` isn't guaranteed to be unique on its own, but when it's combined with an `EntityId`, you can target a specific component attached to an entity\. This is useful when you have multiple components of the same type attached to a single entity\.

   1. The final argument is a `nullptr`, which is an `EditorComponentSelectionRequestBus::Handler`\. To use this handler, the `EditorComponent` must implement the `EditorComponentSelectionRequestsBus`\. If the EBus was implemented, you can pass `'this'` here, but as you haven't implemented it yet, enter `nullptr` for now\. 

      These changes enable you to double\-click in the viewport to select a component\. You implement the `EditorComponentSelectionRequestBus` in [Step 5: Handle Selection in the Viewport](handling-selection-viewport.md)\.

      For examples, see the `EditorBaseShapeComponent.h` and `EditorSplineComponent.h` files\.

1. Enter the following code to disconnect the `ComponentModeDelegate` when the `EditorComponent` is deactivated\.

   ```
   m_componentModeDelegate.Disconnect();
   ```

   This change ensures that the `ComponentModeDelegate` disconnects from the various EBuses that are connected to in the `Activate` function\.

**Example EditorPointLightComponent\.cpp**  
Your code should look like the following\.  

```
#include "LmbrCentral_precompiled.h"
#include "EditorPointLightComponent.h"
 
#include <AzCore/Serialization/SerializeContext.h>
#include <AzCore/Serialization/EditContext.h>
#include <AzCore/RTTI/BehaviorContext.h>
 
namespace LmbrCentral
{
    void EditorPointLightComponent::Reflect(AZ::ReflectContext* context)
    {
        if (auto serializeContext = azrtti_cast<AZ::SerializeContext*>(context))
        {
            serializeContext->Class<EditorPointLightComponent, EditorLightComponent>()
                ->Version(1)
                ;
 
            if (AZ::EditContext* editContext = serializeContext->GetEditContext())
            {
                editContext->Class<EditorPointLightComponent>(
                    "Point Light", "The Point Light component allows an entity to create a point of light")
                    ->ClassElement(AZ::Edit::ClassElements::EditorData, "")
                        ->Attribute(AZ::Edit::Attributes::Category, "Rendering")
                        ->Attribute(AZ::Edit::Attributes::Icon, "Editor/Icons/Components/PointLight.png")
                        ->Attribute(AZ::Edit::Attributes::ViewportIcon, "Editor/Icons/Components/Viewport/PointLight.png")
                        ->Attribute(AZ::Edit::Attributes::AppearsInAddComponentMenu, AZ_CRC("Game", 0x232b318c))
                        ->Attribute(AZ::Edit::Attributes::AutoExpand, true)
                        ->Attribute(AZ::Edit::Attributes::Visibility, AZ::Edit::PropertyVisibility::ShowChildrenOnly)
                        ->Attribute(AZ::Edit::Attributes::HelpPageURL, "https://docs.aws.amazon.com/lumberyard/latest/userguide/component-point-light.html")
                        ;
            }
        }
        
        if (auto behaviorContext = azrtti_cast<AZ::BehaviorContext*>(context))
        {
            behaviorContext->Class<EditorPointLightComponent>()->RequestBus("EditorPointLightComponentBus");
        }
    }
 
    void EditorPointLightComponent::Init()
    {
        SetLightType(EditorLightConfiguration::LightType::Point);
        EditorLightComponent::Init();
    }
} // namespace LmbrCentral
```

```
#include "LmbrCentral_precompiled.h"
#include "EditorPointLightComponent.h"
// BEGIN ADD
// #include "EditorPointLightComponentMode.h"
// END ADD
 
#include <AzCore/Serialization/SerializeContext.h>
#include <AzCore/Serialization/EditContext.h>
#include <AzCore/RTTI/BehaviorContext.h>
 
namespace LmbrCentral
{
    void EditorPointLightComponent::Reflect(AZ::ReflectContext* context)
    {
        if (auto serializeContext = azrtti_cast<AZ::SerializeContext*>(context))
        {
            serializeContext->Class<EditorPointLightComponent, EditorLightComponent>()
                ->Version(1)
                // BEGIN ADD
                ->Field("ComponentMode", &EditorPointLightComponent::m_componentModeDelegate)
                // END ADD
                ;
 
            if (AZ::EditContext* editContext = serializeContext->GetEditContext())
            {
                editContext->Class<EditorPointLightComponent>(
                    "Point Light", "The Point Light component allows an entity to create a point of light")
                    ->ClassElement(AZ::Edit::ClassElements::EditorData, "")
                        ->Attribute(AZ::Edit::Attributes::Category, "Rendering")
                        ->Attribute(AZ::Edit::Attributes::Icon, "Editor/Icons/Components/PointLight.png")
                        ->Attribute(AZ::Edit::Attributes::ViewportIcon, "Editor/Icons/Components/Viewport/PointLight.png")
                        ->Attribute(AZ::Edit::Attributes::AppearsInAddComponentMenu, AZ_CRC("Game", 0x232b318c))
                        ->Attribute(AZ::Edit::Attributes::AutoExpand, true)
                        ->Attribute(AZ::Edit::Attributes::Visibility, AZ::Edit::PropertyVisibility::ShowChildrenOnly)
                        ->Attribute(AZ::Edit::Attributes::HelpPageURL, "https://docs.aws.amazon.com/lumberyard/latest/userguide/component-point-light.html")
                    // BEGIN ADD
                    ->DataElement(AZ::Edit::UIHandlers::Default, &EditorPointLightComponent::m_componentModeDelegate, "Component Mode", "Point Light Component Mode")
                        ->Attribute(AZ::Edit::Attributes::Visibility, AZ::Edit::PropertyVisibility::ShowChildrenOnly)
                    // END ADD
                        ;
            }
        }
        
        if (auto behaviorContext = azrtti_cast<AZ::BehaviorContext*>(context))
        {
            behaviorContext->Class<EditorPointLightComponent>()->RequestBus("EditorPointLightComponentBus");
        }
    }
 
    void EditorPointLightComponent::Init()
    {
        SetLightType(EditorLightConfiguration::LightType::Point);
        EditorLightComponent::Init();
    }
 
    // BEGIN ADD
    void EditorPointLightComponent::Activate()
    {
        EditorLightComponent::Activate();
        // m_componentModeDelegate.ConnectWithSingleComponentMode <
        //    EditorPointLightComponent, EditorPointLightComponentMode>(
        //        AZ::EntityComponentIdPair(GetEntityId(), GetId()), nullptr);
    }

    void EditorPointLightComponent::Deactivate()
    {
        // m_componentModeDelegate.Disconnect();
        EditorLightComponent::Deactivate();
    }
    // END ADD
} // namespace LmbrCentral
```