# Script Canvas and the Behavior Context<a name="script-canvas-behavior-context"></a>

**Topics**
+ [The Light Component and Script Canvas](#script-canvas-behavior-context-light-component)
+ [Objects: The PhysicsComponent Example](#script-canvas-behavior-context-physicscomponent)
+ [Displaying EBus Event Parameter Names in Script Canvas Nodes](#script-canvas-behavior-context-parameter-names)
+ [Common Programming Problems](#script-canvas-behavior-context-common-programming-problems)

You can use Script Canvas to expose runtime code in a visual authoring environment using the behavior context\. In addition to this topic, it is recommended that you also read the [Programmer's Guide to Entities and Components](component-entity-system-pg-intro.md) and [Behavior Context](component-entity-system-reflection-behavior-context.md)\.

The following code architecture diagram shows the relationship between Script Canvas and the behavior context in Amazon Lumberyard\.

![\[Script Canvas code architecture\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-code-architecture-1.png)

The core Script Canvas code is built as a static library that is linked into the dependent gem and editor gem\. This allows the code footprint at run time to be as small as the minimum required to run a Script Canvas graph\. It also allows the Script Canvas Editor Gem to contain all the code required to author and develop Script Canvas graphs\.

Script Canvas is designed to use behavior context reflection and provide access to the same objects and [EBus](ebus-intro.md) that are available in Lua\. When you use the behavior context, you do not need to write any Script Canvas–specific code\. However, it is important that the way in which your code is reflected to the behavior context remains intuitive in a visual scripting environment\.

The behavior context for Script Canvas includes the following benefits:
+ Functionality exposed through the behavior context is also available in Lua \(and any other scripting solution bound to the behavior context\)\.
+ The EBus system makes it easier for you to use decoupled, event\-driven programming paradigms\.
+ Script Canvas can use any functionality that is exposed to the behavior context, even if it comes from other gems\. Therefore, when code is reflected to the behavior context, gems can enhance Script Canvas\.
+ Reflecting gems to the behavior context removes any need to add gem dependencies to Script Canvas\.

## The Light Component and Script Canvas<a name="script-canvas-behavior-context-light-component"></a>

So that you can better understand the relationship between the behavior context and Script Canvas, this section discusses the fairly simple Light component\. The example shows how its behavior context reflection translates into Script Canvas nodes\.

You can use the Light component to give an entity a light\. You can configure the light by setting parameters such as color, intensity, and radius\. The Light component can also be turned on or off, and you can respond to these events when they occur\.

Communication with an entity's Light component is done through two EBuses: `LightComponentRequestBus` and `LightComponentNotificationBus`\.

A request bus provides methods that can be called on an entity\. If an entity has a Light component, the Light component implements the behavior of the requests that are made to it\.

Some of the requests that you can issue on a Light Component are the following\. For the source code, see the file `dev\Gems\LmbrCentral\Code\include\LmbrCentral\Rendering\LightComponentBus.h`\.

```
//! Turns light on. Returns true if the light was successfully turned on
virtual bool TurnOnLight() { return false; } 
//! Turns light off. Returns true if the light was successfully turned off
virtual bool TurnOffLight() { return false; } 
//! Toggles light state.
virtual void ToggleLight() {}
```

These requests are part of the `LightComponentRequestBus`\. Their behavior is implemented by `LightComponent`\.

To make these requests accessible for scripting, they must be reflected to the behavior context\. This is done in `LightComponent::Reflect`\. The source code is in the file `dev\Gems\LmbrCentral\Code\Source\Rendering\LightComponent.cpp`\.

```
behaviorContext->EBus<LightComponentRequestBus>("Light", "LightComponentRequestBus")
    ->Attribute(AZ::Script::Attributes::Category, "Rendering")
    ->Event("TurnOn", &LightComponentRequestBus::Events::TurnOnLight, "TurnOnLight")
    ->Event("TurnOff", &LightComponentRequestBus::Events::TurnOffLight, "TurnOffLight")
    ->Event("Toggle", &LightComponentRequestBus::Events::ToggleLight, "ToggleLight")
```

When Script Canvas examines the behavior context, it finds these bindings and automatically generates the corresponding nodes for you\.

![\[Light component nodes in Script Canvas\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-behavior-context-1.png)

You use EBuses to communicate with an entity's components\. To do so, you need an address\. All component EBuses derive from `AZ::ComponentBus`, which is addressable by an ID of the type `AZ::EntityId`\. For this reason, all nodes from a component EBus have an entry slot for an `EntityID`\. The presence of `Self` in the `EntityID` field refers to the `EntityID` of the entity that owns the Script Canvas graph\. However, this ID can be assigned to another entity, or even changed to an invalid entity ID\.

![\[Self EntityID\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-behavior-context-2.png)

The other bus that the Light component reflects to the behavior context is `LightComponentNotificationBus`\. The following source code is also in the file `dev\Gems\LmbrCentral\Code\Source\Rendering\LightComponent.cpp`\.

```
behaviorContext->EBus<LightComponentNotificationBus>("LightNotification", "LightComponentNotificationBus", "Notifications for the Light Components")
    ->Attribute(AZ::Script::Attributes::Category, "Rendering")
    ->Handler<BehaviorLightComponentNotificationBusHandler>();
```

Notification buses are also known as *event handlers*\. You can use these event handlers on a component to respond to the events that happen to the component\. As part of reflection to the behavior context, the preceding code specifies that the `BehaviorLightComponentNotificationBusHandler` handles events for the Light component\.

The following code shows the binding for the `BehaviorLightComponentNotificationBusHandler` and defines two events: `LightTurnedOn` and `LightTurnedOff`\.

```
class BehaviorLightComponentNotificationBusHandler : public LightComponentNotificationBus::Handler, public AZ::BehaviorEBusHandler
{
public:
    AZ_EBUS_BEHAVIOR_BINDER(BehaviorLightComponentNotificationBusHandler, "{969C5B17-10D1-41DB-8123-6664FA64B4E9}", AZ::SystemAllocator,
        LightTurnedOn, LightTurnedOff); 
    // Sent when the light is turned on.
    void LightTurnedOn() override
    {
        Call(FN_LightTurnedOn);
    } 
    // Sent when the light is turned off.
    void LightTurnedOff() override
    {
        Call(FN_LightTurnedOff);
    }
};
```

Script Canvas has a node that gives you access to all the events for EBus\. You can handle the events that you are interested in\.

![\[Light notification bus\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-behavior-context-3.png)

## Objects: The PhysicsComponent Example<a name="script-canvas-behavior-context-physicscomponent"></a>

Objects that are reflected to the behavior context are also available in Script Canvas\. Objects become available in the form of variables\.

The Light component does not provide any objects, but the `PhysicsComponent` provides an example of an object reflected to the behavior context\. The `Collision` class is reflected as a behavior context object that you can access through the use of variables in Script Canvas\. You can find the following source code in the file `dev\Gems\LmbrCentral\Code\Source\Physics\PhysicsComponent.cpp`\.

```
using Collision = PhysicsComponentNotifications::Collision;
// Information about a collision event
behaviorContext->Class<Collision>()
    ->Attribute(AZ::Script::Attributes::Storage, AZ::Script::Attributes::StorageType::Value)
    ->Property("entity", BehaviorValueProperty(&Collision::m_entity))
    ->Property("position", BehaviorValueProperty(&Collision::m_position))
    ->Property("normal", BehaviorValueProperty(&Collision::m_normal))
    ->Property("impulse", BehaviorValueProperty(&Collision::m_impulse))
    ->Property("velocities", BehaviorValueGetter(&Collision::m_velocities), nullptr)
    ->Property("masses", BehaviorValueGetter(&Collision::m_masses), nullptr)
    ->Property("surfaces", BehaviorValueGetter(&Collision::m_surfaces), nullptr)
     ;
```

**Note**  
During the preview release of Script Canvas, properties must provide both getters and setters to be accessible on a Script Canvas node\. Containers such as vectors are currently not supported\. For this reason, velocities, masses, and surfaces do not provide a setter\.

Most object variables are set as a result of an event\. In the case of the preceding `Collision` example, the `Collision` variable is returned by the `OnCollision` event\.

![\[Collision variable\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-behavior-context-4.png)

You can use the following graph to set the collision variable:

![\[Setting the Collision variable\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-behavior-context-5.png)

## Displaying EBus Event Parameter Names in Script Canvas Nodes<a name="script-canvas-behavior-context-parameter-names"></a>

To display parameter names correctly for your EBus events, ensure that you specify custom names when you reflect your events to the behavior context\. 

If you do not specify names for the parameters, they are given default display names like "1", "2", or "3", as in the following image:

![\[Default parameter names displayed\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-behavior-context-parameter-names-1.png)

The following code produced the event node in the image:

```
if (auto behaviorContext =
    azrtti_cast < AZ::BehaviorContext * >(reflectContext))
{
    behaviorContext->EBus < MyBus > ("MyBus")
      // This is the category that appears in the Node Palette window
      ->Attribute (AZ::Script::Attributes::Category,
		   "Rendering")->Event ("SomeEvent",
					&MyBus::Events::SomeEvent);
}
```

The following version of the same code adds the parameter names `FirstParam` and `SecondParam` and corresponding tooltip text to the `Event` function:

```
if (auto behaviorContext = azrtti_cast<AZ::BehaviorContext*>(reflectContext))
{
    behaviorContext->EBus<MyBus>("MyBus")
        // This is the category that appears in the Node Palette window
        ->Attribute(AZ::Script::Attributes::Category, "Rendering") 
        ->Event("SomeEvent", &MyBus::Events::SomeEvent, { { { "FirstParam" , "First Param Tooltip" }, { "SecondParam", "Second Param Tooltip" } } });
}
```

In the node palette window, the parameter names appear as specified:

![\[Specified parameter names displayed\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/scripting/script-canvas/script-canvas-behavior-context-parameter-names-2.png)

**Alternate Syntax**  
You can also use the following alternate syntax to create parameter override instances before passing them to the `Event` function:

```
if (auto behaviorContext = azrtti_cast<AZ::BehaviorContext*>(reflectContext))
{
    AZ::BehaviorParameterOverrides someEventParam1 = { "FirstParam", "First Param Tooltip" };
    AZ::BehaviorParameterOverrides someEventParam2 = { "SecondParam", "Second Param Tooltip" };
    behaviorContext->EBus<MyBus>("MyBus")
        // This is the category that appears in the Node Palette window
        ->Attribute(AZ::Script::Attributes::Category, "Rendering") 
        ->Event("SomeEvent", &MyBus::Events::SomeEvent, { {someEventParam1, someEventParam2} });
}
```

## Common Programming Problems<a name="script-canvas-behavior-context-common-programming-problems"></a>

The following are some common problems that occur when programming with Script Canvas and the behavior context\.

**I reflected my class to the behavior context, but it doesn't appear in Script Canvas\.**  
Both the serialization context and the behavior context use the same `Reflect` function:

```
Reflect(AZ::ReflectContext*)
```

A common mistake is to not keep the reflection scopes separate\. For example, you might mistakenly place the `BehaviorContext` reflection within the `SerializeContext` scope\. The following code examples show the problem and the solution\.

**Problem**

```
void Example::Reflect(AZ::ReflectContext* context)
{
    if (AZ::SerializeContext* serializeContext = azrtti_cast<AZ::SerializeContext*>(context))
    {
        serializeContext->Class<Example>()
            ->Version(1)
            ;
 
        // Problem! BehaviorContext is inside the SerializeContext scope and will not get reflected.
        if (AZ::BehaviorContext* behaviorContext = azrtti_cast<AZ::BehaviorContext*>(context))
        {
            behaviorContext->Class<Example>()
                ->Method("IsValid", &Example::IsValid)
                ;
        }
    }
}
```

**Solution**

```
void Example::Reflect(AZ::ReflectContext* context)
{
    if (AZ::SerializeContext* serializeContext = azrtti_cast<AZ::SerializeContext*>(context))
    {
        serializeContext->Class<Example>()
            ->Version(1)
            ;
    }
 
    // Correct! Each context requires its own scope as this function is called multiple times (once per context)
    if (AZ::BehaviorContext* behaviorContext = azrtti_cast<AZ::BehaviorContext*>(context))
    {
        behaviorContext->Class<Example>()
            ->Method("IsValid", &Example::IsValid)
            ;
     }
}
```

**I exposed a new EBus to the Behavior Context, but my handler is not getting called\.**  
For example, you created an EBus handler and properly exposed it script\. Yet, when you try to receive the event in Script Canvas, it does not get triggered\.

This is caused by an oversight that is easy to make: newly implemented EBus handlers must be connected before they can receive events\. The solution is to ensure that your component connects to the bus, as in the following example:

```
MyBus::BusConnect()
```

Depending on the type of bus, you might have to specify an ID to connect to\. For more information, see [Working with the Event Bus \(EBus\) system](ebus-intro.md)\.