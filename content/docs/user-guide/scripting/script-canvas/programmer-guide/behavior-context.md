---
title: Script Canvas and the Behavior Context
description: Learn about the important relationship between Script Canvas and the behavior context in Open 3D Engine (O3DE).
weight: 100
---

The behavior context is a reflection system in **Open 3D Engine (O3DE)** that exposes C++ methods, data types, and the O3DE event mechanisms, providing the necessary bindings for scripting environments to invoke the exposed code at run time. Script Canvas uses the script bindings to automatically create new nodes in the Node Palette for use in your Script Canvas graphs. Using these nodes, you can call the C++ methods, send and receive the events, or pass the new data types through the node's data pins.

In short, use the behavior context with Script Canvas to do the following:

+ Reflect C++ methods as Script Canvas nodes.
+ Expose C++ data types to Script Canvas.
+ Reflect AZ::Event and EBus events as Script Canvas nodes.

In this topic, you will learn how Script Canvas works with the behavior context to create new nodes and expose new data types. We will review an example of this process and provide tips and best practices when using the behavior context with Script Canvas.

## Architecture

The following code architecture diagram shows the relationship between Script Canvas and the behavior context in Open 3D Engine.

![Script Canvas code architecture](/images/user-guide/scripting/script-canvas/behavior-context-code-architecture.png)

The core Script Canvas code is built as a static library that is linked into the dependent Gem and the Script Canvas Editor Gem. This allows the code footprint at run time to be as small as the minimum required to run a Script Canvas graph. It also allows the Script Canvas Editor Gem to contain all the code required to author and develop Script Canvas graphs.

When you use the behavior context, you do not need to write any code specific to Script Canvas. However, it is important that the way in which your code is reflected to the behavior context remains intuitive in a visual scripting environment.

The behavior context for Script Canvas includes the following benefits:

+ Support for the AZ::Event and EBus event systems enable your scripts to use decoupled, event-driven programming paradigms.
+ Script Canvas can use functionality exposed through the behavior context from any Gem, enabling any Gem to enhance Script Canvas.
+ Support for Gems reflecting C++ code through the behavior context means there is no need to add Gem dependencies to Script Canvas.

## Behavior context example - static functions

To demonstrate how C++ code can become a Script Canvas node, this example uses the behavior context to reflect a few simple, static math library functions.

We start with the static function declarations. The functions return the sine and cosine of an angle. The angle is in radians:

```cpp
float Sin(float angle);
float Cos(float angle);
```

We also need a class that defines the namespace for these functions:

```cpp
class GlobalClass
{
public:
    AZ_TYPE_INFO(GlobalClass, "{47A07917-103F-41F5-A586-8D7C1C40A625}");
    AZ_CLASS_ALLOCATOR(GlobalClass, SystemAllocator, 0);

    GlobalClass() = default;
    ~GlobalClass() = default;
        
    static void Reflect(AZ::ReflectContext* context);
};
```

In the class's static `Reflect` method, we use the behavior context to bind the static `Sin` and `Cos` functions as part of a class. In this example, the functions are configured to be part of a group called "Globals". The group is used as a subtitle on the new node and the category under which the nodes will appear in the Node Palette.

```cpp
static void GlobalClass::Reflect(AZ::ReflectContext* context)
{
    if (auto behaviorContext = azrtti_cast<AZ::BehaviorContext*>(context))
    {
        behaviorContext->Class<GlobalClass>("Globals")
            ->Method("Sin", &Sin)
            ->Method("Cos", &Cos)
            ;
    }
}
```

To complete this example, `GlobalClass::Reflect` must be called from a system component's Reflect function.

Once the code has been compiled, it is available as a new node in Script Canvas:

![Sin function available as a Script Canvas node](/images/user-guide/scripting/script-canvas/behavior-context-sin-function.png)

However, there are a few usability improvements that can be made to improve its appearance in Script Canvas:

+ Provide the class with a top-level category, "My Extensions", instead of the default "Other".
+ Provide a user-friendly parameter name, "Radians", for the input pin.
+ Provide a tooltip when a user hovers over the Radians parameter.

This can all be accomplished through additional code in the `Reflect` function:

```cpp
        behaviorContext->Class<GlobalClass>("Globals")
          ->Attribute(AZ::Script::Attributes::Category, "My Extensions")
          ->Method("Sin", &Sin, {{{"Radians", "The value in radians"}}})
          ->Method("Cos", &Cos, {{{"Radians", "The value in radians"}}})
```

The result contains some helpful categorization and information for the user:

![](/images/user-guide/scripting/script-canvas/behavior-context-my-extensions-nodes.png)
![](/images/user-guide/scripting/script-canvas/behavior-context-sin-node-with-tooltip.png)

## Behavior context example - reflecting an EBus event

So that you can better understand the relationship between the behavior context and Script Canvas, this section discusses the fairly simple Light component. The example shows how its behavior context reflection translates into Script Canvas nodes.

You can use the Light component to give an entity a light. You can configure the light by setting parameters such as color, intensity, and radius. The Light component can also be turned on or off, and you can respond to these events when they occur.

Communication with an entity's Light component is done through two EBuses: `LightComponentRequestBus` and `LightComponentNotificationBus`.

A request bus provides methods that can be called on an entity. If an entity has a Light component, the Light component implements the behavior of the requests that are made to it.

Some of the requests that you can issue on a Light Component are the following. For the source code, see the file `dev\Gems\LmbrCentral\Code\include\LmbrCentral\Rendering\LightComponentBus.h`.

```cpp
//! Turns light on. Returns true if the light was successfully turned on.
virtual bool TurnOnLight() { return false; }
//! Turns light off. Returns true if the light was successfully turned off.
virtual bool TurnOffLight() { return false; }
//! Toggles light state.
virtual void ToggleLight() {}
```

These requests are part of the `LightComponentRequestBus`. Their behavior is implemented by `LightComponent`.

To make these requests accessible for scripting, they must be reflected to the behavior context. This is done in `LightComponent::Reflect`. The source code is in the file `dev\Gems\LmbrCentral\Code\Source\Rendering\LightComponent.cpp`.

```cpp
behaviorContext->EBus<LightComponentRequestBus>("Light", "LightComponentRequestBus")
    ->Attribute(AZ::Script::Attributes::Category, "Rendering")
    ->Event("TurnOn", &LightComponentRequestBus::Events::TurnOnLight, "TurnOnLight")
    ->Event("TurnOff", &LightComponentRequestBus::Events::TurnOffLight, "TurnOffLight")
    ->Event("Toggle", &LightComponentRequestBus::Events::ToggleLight, "ToggleLight")
```

When Script Canvas examines the behavior context, it finds these bindings and automatically generates the corresponding nodes for you.

![Light component nodes in Script Canvas](/images/user-guide/scripting/script-canvas/script-canvas-behavior-context-1.png)

You use EBuses to communicate with an entity's components. To do so, you need an address. All component EBuses derive from `AZ::ComponentBus`, which is addressable by an ID of the type `AZ::EntityId`. For this reason, all nodes from a component EBus have an entry slot for an `EntityID`. The presence of `Self` in the `EntityID` field refers to the `EntityID` of the entity that owns the Script Canvas graph. However, this ID can be assigned to another entity, or even changed to an invalid entity ID.

![Self EntityID](/images/user-guide/scripting/script-canvas/script-canvas-behavior-context-2.png)

The other bus that the Light component reflects to the behavior context is `LightComponentNotificationBus`. The following source code is also in the file `dev\Gems\LmbrCentral\Code\Source\Rendering\LightComponent.cpp`.

```cpp
behaviorContext->EBus<LightComponentNotificationBus>("LightNotification", "LightComponentNotificationBus", "Notifications for the Light Components")
    ->Attribute(AZ::Script::Attributes::Category, "Rendering")
    ->Handler<BehaviorLightComponentNotificationBusHandler>();
```

Notification buses are also known as *event handlers*. You can use these event handlers on a component to respond to the events that happen to the component. As part of reflection to the behavior context, the preceding code specifies that the `BehaviorLightComponentNotificationBusHandler` handles events for the Light component.

The following code shows the binding for the `BehaviorLightComponentNotificationBusHandler` and defines two events: `LightTurnedOn` and `LightTurnedOff`.

```cpp
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

Script Canvas has a node that gives you access to all the events for EBus. You can handle the events that you are interested in.

![Light notification bus](/images/user-guide/scripting/script-canvas/script-canvas-behavior-context-3.png)

## Objects: The PhysicsComponent example

{{< todo issue="https://github.com/o3de/o3de.org/issues/992" >}}
This example is outdated. It refers to a legacy component that no longer exists.
{{< /todo >}}

Objects that are reflected to the behavior context are also available in Script Canvas. Objects become available in the form of variables.

The Light component does not provide any objects, but the `PhysicsComponent` provides an example of an object reflected to the behavior context. The `Collision` class is reflected as a behavior context object that you can access through the use of variables in Script Canvas. You can find the following source code in the file `dev\Gems\LmbrCentral\Code\Source\Physics\PhysicsComponent.cpp`.

```cpp
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

{{< note >}}
<!-- During the preview release of Script Canvas, -->Properties must provide both getters and setters to be accessible on a Script Canvas node. Containers such as vectors are currently not supported. For this reason, velocities, masses, and surfaces do not provide a setter.
{{< /note >}}

Most object variables are set as a result of an event. In the case of the preceding `Collision` example, the `Collision` variable is returned by the `OnCollision` event.

![Collision variable](/images/user-guide/scripting/script-canvas/script-canvas-behavior-context-4.png)

You can use the following graph to set the collision variable:

![Setting the Collision variable](/images/user-guide/scripting/script-canvas/script-canvas-behavior-context-5.png)

## Displaying EBus event parameter names in Script Canvas nodes

To display parameter names correctly for your EBus events, ensure that you specify custom names when you reflect your events to the behavior context.

If you do not specify names for the parameters, they are given default display names like "1", "2", or "3", as in the following image:

![Default parameter names displayed](/images/user-guide/scripting/script-canvas/script-canvas-behavior-context-parameter-names-1.png)

The following code produced the event node in the image:

```cpp
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

```cpp
if (auto behaviorContext = azrtti_cast<AZ::BehaviorContext*>(reflectContext))
{
    behaviorContext->EBus<MyBus>("MyBus")
        // This is the category that appears in the Node Palette window
        ->Attribute(AZ::Script::Attributes::Category, "Rendering")
        ->Event("SomeEvent", &MyBus::Events::SomeEvent, { { { "FirstParam" , "First Param Tooltip" }, { "SecondParam", "Second Param Tooltip" } } });
}
```

In the node palette window, the parameter names appear as specified:

![Specified parameter names displayed](/images/user-guide/scripting/script-canvas/script-canvas-behavior-context-parameter-names-2.png)

**Alternate Syntax**
You can also use the following alternate syntax to create parameter override instances before passing them to the `Event` function:

```cpp
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

## Common programming problems

The following are some common problems that occur when programming with Script Canvas and the behavior context.

**I reflected my class to the behavior context, but it doesn't appear in Script Canvas.**

Both the serialization context and the behavior context use the same `Reflect` function:

```cpp
Reflect(AZ::ReflectContext*)
```

A common mistake is to not keep the reflection scopes separate. For example, you might mistakenly place the `BehaviorContext` reflection within the `SerializeContext` scope. The following code examples show the problem and the solution.

**Problem**

```cpp
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

```cpp
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

**I exposed a new EBus to the Behavior Context, but my handler is not getting called.**

For example, you created an EBus handler and properly exposed it script. Yet, when you try to receive the event in Script Canvas, it does not get triggered.

This is caused by an oversight that is easy to make: newly implemented EBus handlers must be connected before they can receive events. The solution is to ensure that your component connects to the bus, as in the following example:

```cpp
MyBus::BusConnect()
```

Depending on the type of bus, you might have to specify an ID to connect to. For more information, refer to [The Open 3D Engine Event Bus (EBus) System](/docs/user-guide/engine/ebus/).

## Additional material

To get started creating new components in O3DE that integrate the behavior context, we recommend that you read the [Programmer's Guide to Component Development](/docs/user-guide/components/development/).

For a closer look at the behavior context system itself, refer to [Behavior Context In-Depth](/docs/user-guide/components/development/behavior-context).
