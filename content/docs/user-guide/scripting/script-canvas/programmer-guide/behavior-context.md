---
linktitle: Creating Nodes from the Behavior Context
title: Creating Script Canvas Nodes from the Behavior Context
description: Learn about the important relationship between Script Canvas and the behavior context, and about how to create new nodes using script binding in Open 3D Engine (O3DE).
weight: 100
---

The [behavior context](/docs/user-guide/programming/components/reflection/behavior-context) in **Open 3D Engine (O3DE)** is a reflection system that exposes C++ classes, methods, constants, data types, and the O3DE event mechanisms, providing the necessary bindings for scripting environments to invoke the code at runtime. **Script Canvas** uses the script bindings to automatically create new nodes in the Node Palette for use in your Script Canvas graphs. Using these new nodes, you can call the C++ methods, get and set properties, retrieve constants, broadcast and handle events, and pass your custom data types through the node's data pins.

In short, use the behavior context with Script Canvas to do the following:

+ Call C++ methods using Script Canvas nodes.
+ Access properties and constants from Script Canvas.
+ Expose C++ data types to Script Canvas.
+ Send and receive AZ::Event and EBus events through Script Canvas nodes.

In this topic, you will learn how Script Canvas uses the behavior context to create new nodes and expose new data types to do all of the things described. There are several illustrative examples, and each example contains tips and best practices when using the behavior context to extend Script Canvas.

## Script Canvas architecture

The following code architecture diagram shows the relationship between Script Canvas and the behavior context in Open 3D Engine.

![Script Canvas code architecture](/images/user-guide/scripting/script-canvas/behavior-context-code-architecture.png)

The core Script Canvas code is built as a static library that is linked into the dependent Gem and the Script Canvas Editor Gem. This allows the code footprint at run time to be as small as the minimum required to run a Script Canvas graph. It also allows the Script Canvas Editor Gem to contain all the code required to author and develop Script Canvas graphs.

When you use the behavior context, you do not need to write any code specific to Script Canvas. However, it is important that the way in which your code is reflected to the behavior context remains intuitive and practical in a visual scripting environment.

The combination of the Script Canvas and behavior context architectures includes the following benefits:

+ Support for the AZ::Event and EBus event systems enable your scripts to use decoupled, event-driven programming paradigms.
+ Script Canvas can use functionality exposed through the behavior context from any Gem, enabling any Gem to enhance Script Canvas.
+ Support for Gems reflecting C++ code through the behavior context means there is no need to add Gem dependencies to Script Canvas.

## Example: Static functions

{{< note >}}
Refer to [Custom Free Function Nodes](/docs/user-guide/scripting/script-canvas/programmer-guide/custom-nodes/custom-free-function-nodes/) for an approach with a lighter overhead.
{{< /note >}}

To demonstrate how C++ code can become a Script Canvas node, this example uses the behavior context to reflect a few simple, static math library functions.

We start with the static function declarations. The following functions return the sine and cosine of an angle. The angle is in radians:

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

In the class's static `Reflect` method, we use the behavior context to reflect the `GlobalClass` and bind the static `Sin` and `Cos` methods that are part of the class. In this example, the functions are configured to be part of a group called `Globals`. The group is used as a subtitle on the new node and the category under which the nodes will appear in Script Canvas's Node Palette.

```cpp
static void GlobalClass::Reflect(AZ::ReflectContext* context)
{
    if (auto behaviorContext = azrtti_cast<AZ::BehaviorContext*>(context))
    {
        behaviorContext->Class<GlobalClass>("Globals")
            ->Method("Sin", &Sin)
            ->Method("Cos", &Cos);
    }
}
```

To complete the example, `GlobalClass::Reflect` must be called from a system component's Reflect function.

Once the code has been compiled, it is available as a new node in Script Canvas:

![Sin function available as a Script Canvas node](/images/user-guide/scripting/script-canvas/behavior-context-sin-function.png)

However, there are a few usability improvements that can be made to improve its appearance in Script Canvas:

+ Provide the class with a top-level category, `My Extensions`, instead of the default `Other`.
+ Provide a user-friendly parameter name, `Radians`, for the input pin.
+ Provide a tooltip when a user hovers over the Radians parameter.

This can all be accomplished through changes to the code in the `Reflect` function:

```cpp
        behaviorContext->Class<GlobalClass>("Globals")
          ->Attribute(AZ::Script::Attributes::Category, "My Extensions")
          ->Method("Sin", &Sin, {{{"Radians", "The value in radians"}}})
          ->Method("Cos", &Cos, {{{"Radians", "The value in radians"}}});
```

The result contains some helpful categorization and parameter information for users of this new node:

![](/images/user-guide/scripting/script-canvas/behavior-context-my-extensions-nodes.png)
![](/images/user-guide/scripting/script-canvas/behavior-context-sin-node-with-tooltip.png)

## Example: Reflecting an EBus

The ability to bind an EBus to the behavior context enables scripting to become driven and modular. The two main use cases for reflecting EBuses to the behavior context are _event handlers_ and _events_.

Events are typically defined in code as part of a request bus, and are generally handled by some code system such as a component. Event handlers are typically defined as part of a notification bus.

In this example, we'll take a look at a basic **Light** component. The example shows how its behavior context reflection translates into Script Canvas nodes.

In this Light component, the user can configure the light by setting parameters such as color, intensity, and radius. The Light component can also be turned on or off, and you can respond to these events when they occur. Communication with an entity's Light component is done through two EBuses: the `LightComponentRequestBus` and the `LightComponentNotificationBus`.

### Request bus

A request bus is an EBus that can send _events_. Events can be thought of as requests that are intended for a system or object to handle. Components can reflect their event methods to the behavior context to make them available to scripting environments such as Script Canvas.

Here are a few of the C++ event methods in the Light component:

```cpp
// Turn light on. Returns true if the light was successfully turned on.
bool TurnOnLight();

// Turn light off. Returns true if the light was successfully turned off.
bool TurnOffLight();

// Toggle light state.
void ToggleLight();
```

These events are part of the `LightComponentRequestBus`. Their behavior is implemented by `LightComponent`.

```cpp
bool LightComponent::TurnOnLight()
{
    bool success = m_light.TurnOn();
    if (success)
    {
        LightComponentNotificationBus::Event(GetEntityId(), &LightComponentNotifications::LightTurnedOn);
    }
    return success;
}

bool LightComponent::TurnOffLight()
{
    bool success = m_light.TurnOff();
    if (success)
    {
        LightComponentNotificationBus::Event(GetEntityId(), &LightComponentNotifications::LightTurnedOff);
    }
    return success;
}

void LightComponent::ToggleLight()
{
    if (m_light.IsOn())
    {
        TurnOffLight();
    }
    else
    {
        TurnOnLight();
    }
}
```

To make these events accessible for scripting, their methods must be reflected to the behavior context. This is done in `LightComponent::Reflect`.

```cpp
if (AZ::BehaviorContext* behaviorContext = azrtti_cast<AZ::BehaviorContext*>(context))
{
    behaviorContext->EBus<LightComponentRequestBus>("Light", "LightComponentRequestBus")
        ->Attribute(AZ::Script::Attributes::Category, "Rendering")
        ->Event("TurnOn", &LightComponentRequestBus::Events::TurnOnLight)
        ->Event("TurnOff", &LightComponentRequestBus::Events::TurnOffLight)
        ->Event("Toggle", &LightComponentRequestBus::Events::ToggleLight);
}
```

When Script Canvas examines the behavior context, it finds these events and automatically generates the corresponding nodes.

![Light component nodes in Script Canvas](/images/user-guide/scripting/script-canvas/behavior-context-ebus-request-light-nodes.png)

#### EBus events and EntityId

EBuses communicate with an entity's components. To do this, it needs an address. All component EBuses derive from `AZ::ComponentBus`, which is addressable by an ID of the type `AZ::EntityId`. For this reason, all nodes from a component EBus have a data pin for an **EntityID**. The presence of `Self` in the **EntityID** pin refers to the `AZ::EntityID` of the entity that owns the Script Canvas graph. However, this ID can be assigned to another entity, or even changed to an invalid ID.

![Self EntityID data pin](/images/user-guide/scripting/script-canvas/behavior-context-ebus-request-entityID.png)

#### Tooltips

Script Canvas nodes should include a helpful tooltip for every parameter. For example, the Light component might have a `SetLightState` event with a `state` parameter:

```cpp
// Set the light state to on or off.
void SetLightState(State state);
```

You should add a tooltip in the behavior context reflection to describe the parameter. In this example, the tooltip will show `1=On, 0=Off` when a user hovers over the **State** data pin on the **SetState** node.

```cpp
    behaviorContext->EBus<LightComponentRequestBus>("Light", "LightComponentRequestBus")
        ->Event("SetState", &LightComponentRequestBus::Events::SetLightState, {{{"State", "1=On, 0=Off"}}});
```

### Notification bus

A notification bus is an EBus that enables the use of *event handlers*. Event handlers in a component can respond to the events that are sent to the component. You can reflect event handlers to the behavior context to make them available to scripting environments such as Script Canvas.

Our Light component example handles the `TurnOn`, `TurnOff`, and `Toggle` events from the request bus using the following C++ event handler methods on the `LightComponentNotificationBus`:

```cpp
class LightComponentNotifications
      : public AZ::ComponentBus
{
public:

    // Sent when the light is turned on.
    virtual void LightTurnedOn() {}

    // Sent when the light is turned off.
    virtual void LightTurnedOff() {}
};

using LightComponentNotificationBus = AZ::EBus <LightComponentNotifications>;
```

To create the script binding between the C++ EBus and the scripting system, you must implement an EBus handler.

In the following code, the `BehaviorLightComponentNotificationBusHandler` handler establishes the script binding with two event handlers: `LightTurnedOn` and `LightTurnedOff`.

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

Next, you need to reflect the notification bus to the behavior context in the Light component's `Reflect` method. As part of this reflection, you also specify that the `BehaviorLightComponentNotificationBusHandler` handles events for the Light component. The following code is added after the reflection of the request bus:

```cpp
if (AZ::BehaviorContext* behaviorContext = azrtti_cast<AZ::BehaviorContext*>(context))
{
    ...

    behaviorContext->EBus<LightComponentNotificationBus>("LightNotification", "LightComponentNotificationBus", "Notifications for the Light components")
        ->Attribute(AZ::Script::Attributes::Category, "Rendering")
        ->Handler<BehaviorLightComponentNotificationBusHandler>();
}
```

Once compiled, these event handlers are available to Script Canvas from the **LightNotification** node.

![Light notification node](/images/user-guide/scripting/script-canvas/behavior-context-ebus-light-notification-node.png)

## Example: Data types

To make a custom data type available for use as a variable in Script Canvas, you can reflect it using the behavior context's `Class` builder. The new type is also available to pass as a parameter to functions and events.

This example uses the `BoxShapeConfig` class as an example. This class is defined in the file `Gems\LmbrCentral\Code\include\LmbrCentral\Shape\BoxShapeComponentBus.h` and reflected in `Gems\LmbrCentral\Code\Source\Shape\BoxShapeComponent.cpp`.

A data type must be reflected to both the serialization context and the behavior context. The serialization context enables the data type to be stored and read from a file, and the behavior context allows it to be bound to the scripting system.

```cpp
void BoxShapeConfig::Reflect(AZ::ReflectContext* context)
{
    if (auto serializeContext = azrtti_cast<AZ::SerializeContext*>(context))
    {
        serializeContext->Class<BoxShapeConfig, ShapeComponentConfig>()
            ->Version(2)
            ->Field("Dimensions", &BoxShapeConfig::m_dimensions);
     }

    if (auto behaviorContext = azrtti_cast<AZ::BehaviorContext*>(context))
    {
         behaviorContext->Class<BoxShapeConfig>()
            ->Constructor()
            ->Constructor<AZ::Vector3&>()
            ->Property("Dimensions", BehaviorValueProperty(&BoxShapeConfig::m_dimensions));
    }
}
```

Resulting variable node:

![Get BoxShapeConfig variable node](/images/user-guide/scripting/script-canvas/behavior-context-data-types-boxshapeconfig.png)

## Best practice: Displaying EBus event parameter names in nodes

To display parameter names correctly for your EBus events, ensure that you specify custom names when you reflect your events to the behavior context.

If you do not specify names for the parameters, they are given default display names like `1`, `2`, or `3`, as in the following image:

![Default parameter names displayed](/images/user-guide/scripting/script-canvas/behavior-context-displaying-parameter-names-1.png)

The following code produced the event node in the image:

```cpp
if (auto behaviorContext = azrtti_cast <AZ::BehaviorContext*>(reflectContext))
{
    behaviorContext->EBus<MyBus>("MyBus")
        // This is the category that appears in the Node Palette window.
        ->Attribute(AZ::Script::Attributes::Category, "Rendering")
        ->Event("SomeEvent", &MyBus::Events::SomeEvent);
}
```

An improved version of the same code adds the parameter names `FirstParam` and `SecondParam` and corresponding tooltip text to the `Event` function:

```cpp
if (auto behaviorContext = azrtti_cast<AZ::BehaviorContext*>(reflectContext))
{
    behaviorContext->EBus<MyBus>("MyBus")
        // This is the category that appears in the Node Palette window.
        ->Attribute(AZ::Script::Attributes::Category, "Rendering")
        ->Event("SomeEvent", &MyBus::Events::SomeEvent, {{{"FirstParam" , "First Param Tooltip"}, { "SecondParam", "Second Param Tooltip"}}});
}
```

In the node palette window, the parameter names appear as specified:

![Specified parameter names displayed](/images/user-guide/scripting/script-canvas/behavior-context-displaying-parameter-names-2.png)

### Alternate syntax

You can also use the alternate syntax `AZ::BehaviorParameterOverrides` to create parameter override instances before passing them to the `Event` function.

```cpp
if (auto behaviorContext = azrtti_cast<AZ::BehaviorContext*>(reflectContext))
{
    AZ::BehaviorParameterOverrides someEventParam1 = {"FirstParam", "First Param Tooltip"};
    AZ::BehaviorParameterOverrides someEventParam2 = {"SecondParam", "Second Param Tooltip"};
    behaviorContext->EBus<MyBus>("MyBus")
        // This is the category that appears in the Node Palette window
        ->Attribute(AZ::Script::Attributes::Category, "Rendering")
        ->Event("SomeEvent", &MyBus::Events::SomeEvent, {{ someEventParam1, someEventParam2 }});
}
```

## Common behavior context problems

The following are some common problems that occur when programming with Script Canvas and the behavior context.

### Reflected object does not appear in Script Canvas

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
            ->Version(1);

        // Problem! BehaviorContext is inside the SerializeContext scope and will not get reflected.
        if (AZ::BehaviorContext* behaviorContext = azrtti_cast<AZ::BehaviorContext*>(context))
        {
            behaviorContext->Class<Example>()
                ->Method("IsValid", &Example::IsValid);
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
            ->Version(1);
    }

    // Correct! Each context requires its own scope as this function is called multiple times (once per context)
    if (AZ::BehaviorContext* behaviorContext = azrtti_cast<AZ::BehaviorContext*>(context))
    {
        behaviorContext->Class<Example>()
            ->Method("IsValid", &Example::IsValid);
     }
}
```

### EBus handler is not getting called

**Problem**

You created an EBus handler and properly exposed it to the behavior context. However, when you try to receive the event in Script Canvas, it does not get triggered.

**Solution**

EBus handlers must be connected before they can receive events. Make sure your component connects to the bus, as in the following example:

```cpp
MyBus::BusConnect();
```

Depending on the type of bus, you might have to specify an ID to connect to. For more information, refer to [The Open 3D Engine Event Bus (EBus) System](/docs/user-guide/programming/messaging/ebus/).

## Additional material

To get started creating new components in O3DE that integrate the behavior context, we recommend that you read the [Programmer's Guide to Component Development](/docs/user-guide/programming/components/).

For a closer look at the behavior context system itself, refer to [Behavior Context](/docs/user-guide/programming/components/reflection/behavior-context).
