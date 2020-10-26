# Exposing Custom Components to Track View for Animation<a name="component-entity-system-track-view"></a>

To include custom components in cinematic cut scenes and movies rendered to disk, you must expose animatable component properties to Lumberyard’s Track View and **Entity Inspector**\. To expose a custom component and its properties, you must perform three steps:

1. Create getter and setter methods for the animated property on one of the component’s request event buses\.

1. Implement the getter and setter request handlers in your component\.

1. Reflect your component to the edit context and the behavior context\. Edit context reflection exposes your component in **Entity Inspector**, and behavior context reflection exposes it in the Track View\.

## Exposing a Custom Component: Example<a name="component-entity-system-track-view-example"></a>

The following example assumes that a custom component called `ImaginaryTargetComponent` has been created\. The component has a `Vector3` property called `ImaginaryPosition` that you want to animate in **Track View**\. A request bus called `ImaginaryTargetComponentBus` has also been created for the component\. This example assumes that you are familiar with programming event buses and component handlers for them\. For more information, see [Working with the Event Bus \(EBus\) system](ebus-intro.md) and [Creating a Component](component-entity-system-create-component.md)\.

**To expose a custom component to Track View**

1. 

**Create getter and setter methods**

   Each property must provide a method to set its value and get its current value\. To implement this, create setter and getter methods on one of the component’s request buses\. Then reflect those methods to the behavior context as part of the class reflection for the component\.

   The following example creates setter and getter requests on the `ImaginaryTargetComponentRequestBus`\.

   ```
   /*!
   * ImaginaryTargetComponentRequests EBus Interface
   * Messages serviced by ImaginaryTargetComponents.
   */
   class ImaginaryTargetComponentRequests
       : public AZ::ComponentBus
   {
   public:
   
       // EBusTraits overrides - Application is a singleton.
       // Only one component on an entity can implement the events.
       static const AZ::EBusHandlerPolicy HandlerPolicy = AZ::EBusHandlerPolicy::Single;
   
       // Getter/Setter methods for ImaginaryTargetPosition.
       virtual AZ::Vector3 GetImaginaryTargetPosition() = 0;
       virtual void SetImaginaryTargetPosition(const AZ::Vector3& newPosition) = 0;
   };
   using ImaginaryTargetComponentRequestBus = AZ::EBus<ImaginaryTargetComponentRequests>;
   ```

1. 

**Implement handlers in your component**

   Implement handlers in your component for the setter and getter requests that you declared in the first step, as in the following example\.

   ```
   class ImaginaryTargetComponent
       : public AzToolsFramework::Components::EditorComponentBase
       , public LmbrCentral::ImaginaryTargetComponentRequestBus::Handler
   {
   
   public:
       AZ_EDITOR_COMPONENT(ImaginaryTargetComponent, "{4491D282-C120-4B2E-BC63-AC86296956A2}");
   
       ImaginaryTargetComponent() : m_imaginaryPosition(.0f) {};
   
       // ImaginaryTargetComponentRequestBus::Handler implementation.
   
       // Implementations for Getter/Setter methods for ImaginaryTargetPosition.
       // Presumably these would be used for something useful; this example just
       // stores and returns the value.
       AZ::Vector3 GetImaginaryTargetPosition() override { return m_imaginaryPosition; }
       void SetImaginaryTargetPosition(const AZ::Vector3& newPosition) override { m_imaginaryPosition = newPosition; }
   
   protected:
       // Required Reflect function.
       static void Reflect(AZ::ReflectContext* context);
   
   private:
       AZ::Vector3 m_imaginaryPosition;
   };
   ```

1. 

**Reflect your component**

   Using the edit context and behavior contexts, reflect the component’s class, request event bus, and setter and getter methods\. **Track View** uses the setter and getter methods that you reflect in this step to set and get values for your animated property\. You must also reflect a `VirtualProperty` declaration that tells **Track View** that your component is capable of being animated\.

   ```
   /*static*/ void ImaginaryTargetComponent::Reflect(AZ::ReflectContext* context)
   {
       AZ::SerializeContext* serializeContext = azrtti_cast<AZ::SerializeContext*>(context);
       
       if (serializeContext)
       {
           serializeContext->Class<ImaginaryTargetComponent, AzToolsFramework::Components::EditorComponentBase>()
               ->Version(0)
               ->Field("ImaginaryPosition", &ImaginaryTargetComponent::m_imaginaryPosition);
   
           AZ::EditContext* editContext = serializeContext->GetEditContext();
           if (editContext)
           {
               editContext->Class<ImaginaryTargetComponent>("ImaginaryTarget", "A Code Sample enabling Track View Animation")
                   ->ClassElement(AZ::Edit::ClassElements::EditorData, "")
                       ->Attribute(AZ::Edit::Attributes::Category, "Game")
                       ->Attribute(AZ::Edit::Attributes::AppearsInAddComponentMenu, AZ_CRC("Game", 0x232b318c))
                   ->DataElement(0, &ImaginaryTargetComponent::m_imaginaryPosition, "Imaginary Target Pos", "Imaginary Target Position")
                   ;
           }
       }
   
       AZ::BehaviorContext* behaviorContext = azrtti_cast<AZ::BehaviorContext*>(context);
       if (behaviorContext)
       {
           // Reflect the setter and getter methods and create a virtual property that refers to them.
           behaviorContext->EBus<ImaginaryTargetComponentRequestBus>("ImaginaryTargetRequestBus")
               ->Event("GetImaginaryTargetPosition", &ImaginaryTargetComponentRequestBus::Events::GetImaginaryTargetPosition)
               ->Event("SetImaginaryTargetPosition", &ImaginaryTargetComponentRequestBus::Events::SetImaginaryTargetPosition)
               ->VirtualProperty("ImaginaryPosition", "GetImaginaryTargetPosition", "SetImaginaryTargetPosition");
   
           // Attach the "ImaginaryTargetRequestBus" EBus that you reflected to the behavior context of the ImaginaryTargetComponent class.
           behaviorContext->Class<ImaginaryTargetComponent>()->RequestBus("ImaginaryTargetRequestBus");
       }       
   }
   ```

1. 

**\(Optional\) Place Unit Attributes on Getters**

   The **Track View** user interface depends on the data type that the getter and setter use\. The foregoing example uses a type of `AZ::Vector3`, so **Track View** creates a compound `x,y,z` track from the property\. By contrast, if the getter and setters use a `bool`, **Track View** creates a Boolean track\. For the majority of animatable properties, the type is sufficient\. However, in some cases you might have to set units for a reflected property\. For example, if your property’s `AZ::Vector3` represents a color, you must add an attribute to the reflection of the getter event\. The attribute instructs **Track View** to use a color picker for that property\. If you have a property called `ImaginaryTargetColor` that calls a getter event called `GetImaginaryTargetColor`, use reflection code like the following:

   ```
   ->Event("GetImaginaryTargetColor", &ImaginaryTargetComponentRequestBus::Events::GetImaginaryTargetColor)
       ->Attribute("Units", AZ::Edit::Attributes:: PropertyUnits8BitColor)
   ```

   **Track View** then uses a color track for the property, as the following image shows\.  
![\[Color picker in Track View\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/entity_system/component-entity-system-pg-track-view-unit-attributes.png)

   Other units can be found in the file `dev\Code\Framework\AZCore\AZCore\Serialization\EditContextConstants.inl`\. As of Lumberyard release 1\.8, these units are the following\.

   ```
   const static AZ::Crc32 PropertyUnitsRadian = AZ_CRC("Radians");
   const static AZ::Crc32 PropertyUnits8BitColor = AZ_CRC("8BitColor");
   ```

   If you have an angular parameter in radians that you want to **Track View** to convert to degrees in its user interface, use `AZ::Crc32 PropertyUnitsRadian`\.

## Viewing the Result<a name="component-entity-system-track-view-viewing-the-result"></a>

Now you can view how the example component and property appear in the **Entity Inspector** and the Track View\.

In the following **Entity Inspector** image, `EditContext` reflection has exposed the **ImaginaryTarget** component and its **Imaginary Target Pos** property\.

![\[ImaginaryTarget component in Entity Inspector\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/entity_system/exposing-custom-components-to-track-view-for-animation-entity-inspector.jpg)

In the following **Track View** image, `BehaviorContext` reflection has exposed the **ImaginaryTarget** component and the **ImaginaryPosition** track from the corresponding virtual property\.

![\[ImaginaryTarget component in the Track View\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/entity_system/exposing-custom-components-to-track-view-for-animation-track-view.jpg)