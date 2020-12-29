# Tick Bus and Components<a name="component-entity-system-pg-tick-bus"></a>

The tick bus is the primary mechanism by which components subscribe to events that occur per simulation frame\. Instead of connecting components to the tick bus, strive to make your components entirely driven by events\. If your component requires tick\-based functionality, it can implement the tick bus interface's `OnTick` method and connect to the tick bus for the required period of time\. To avoid poor scalability of polling\-based update structures, components should limit the time that they are connected to the tick bus\.

Traditionally, a component might use the `OnTick` method to check the state continuously but actively do processing for only a fraction of the connected time\. Instead, the component should connect to the tick bus only when the state changes and disconnect after processing is complete\. This approach is closer to that of event\-based programming, in which polling is conducted only for short periods of time or not at all\.

As an example, imagine a component that monitors the state of an entity after the entity enters a trigger\. The component should avoid subscribing to the tick bus until the entity has entered the trigger\. It should then disconnect from the tick bus as soon as the entity has left the trigger\.

In the following example, the `NavigationComponent` implements the `OnTick` method\.

```
class NavigationComponent
      : public AZ::Component
    , public NavigationComponentRequestBus::Handler
    , public AZ::TickBus::Handler
{
      ...
      
    // TickBus
    virtual void OnTick(float deltaTime, AZ::ScriptTimePoint time);
          
      ...
}
```

To connect and disconnect from the tick bus, the component uses code like the following\.

```
AZ::TickBus::Handler::BusConnect();
```

```
AZ::TickBus::Handler::BusDisconnect();
```

## Customizing Tick Order<a name="component-entity-system-pg-tick-bus-custom-tick-order"></a>

By default, a handler receives events based on the order in which the components are initialized\. To control the order that your component receives `OnTick` events, you can override the `GetTickOrder()` function to return a custom integer value\. The integer value determines the order in which your component is ticked relative to other components on the tick bus\. Lower values are ticked before higher values\. Any value is permitted\. For convenience, the `AZ::ComponentTickBus` enum \(`TickBus.h`\) provides some preset values\. These values are shown in the following table\.


**Tick Order Preset Values**  

| Name \(C\+\+\) | Name \(Lua/Script Canvas\) | Value | Description | 
| --- | --- | --- | --- | 
| TICK\_FIRST | TickOrder\.First | 0 | First position in the tick handler order\. | 
| TICK\_PLACEMENT | TickOrder\.Placement | 50 | Suggested tick handler position for components that need to be early in the tick order\. | 
| TICK\_INPUT | TickOrder\.Input | 75 | Suggested tick handler position for input components\. | 
| TICK\_GAME | TickOrder\.Game | 80 | Suggested tick handler position for game\-related components\. | 
| TICK\_ANIMATION | TickOrder\.Animation | 100 | Suggested tick handler position for animation components\. | 
| TICK\_PHYSICS | TickOrder\.Physics | 200 | Suggested tick handler position for physics components\. | 
| TICK\_ATTACHMENT | TickOrder\.Attachment | 500 | Suggested tick handler position for attachment components\. | 
| TICK\_PRE\_RENDER | TickOrder\.PreRender | 750 | Suggested tick handler position to update render\-related data\. | 
| TICK\_DEFAULT | TickOrder\.Default | 1000 | Default tick handler position when the handler is constructed\. | 
| TICK\_UI | TickOrder\.UI | 2000 | Suggested tick handler position for UI components\. | 
| TICK\_LAST | TickOrder\.Last | 100000 | Last position in the tick handler order\. | 

The following code examples show how to override the `GetTickOrder()` function in Lua and in C\+\+\.

```
-- Lua example
function MyLuaUIComponent:GetTickOrder()
    return TickOrder.UI
end
```

```
// C++ example
int MyCppUIComponent::GetTickOrder()
{
    return TICK_UI;
}
```

**Note**  
As of Lumberyard version 1\.11, use of the `TickEvents::m_tickOrder` variable is deprecated\. If you change the value of `m_tickOrder` instead of overriding `GetTickOrder()`, you will receive a warning\. However, your component will still tick in the appropriate order\.

## Event\-Based Programming and Event\-Based Polling: Best Practices<a name="component-entity-system-pg-tick-bus-event-based-programming-polling-best-practices"></a>

It is important to know when to use the tick bus and when to use event\-driven programming patterns instead\.

### Event\-Based Polling<a name="component-entity-system-pg-tick-bus-event-based-polling"></a>

It is often convenient to tick a component every frame and monitor the state of other entities\. For example, a `LookAt` camera component is commonly implemented to tick each frame, retrieve the transform of the target entity, and update its own transform accordingly\.

### Event\-Based Programming<a name="component-entity-system-pg-tick-bus-event-based-programming"></a>

In Lumberyard, a more event\-driven approach is to use the `TransformBus` to monitor the target entity for transform changes in a purely event\-driven fashion\. If the target entity doesn't move, no work is done and no polling is required\. When the target entity moves, the `LookAt` component adjusts its own entity's transform accordingly\.

### Use Notifications to Make Your Components Easy to Use<a name="component-entity-system-pg-tick-bus-use-notifications"></a>

When authoring a component, try to anticipate the requirements of components that might depend on yours\. Use a notification bus to expose the appropriate notifications for your component\. This approach enables others to write code that consumes the services of your components in a faster and more scalable way\.

For more best practices, see [Components and EBuses: Best Practices](component-entity-system-pg-components-ebuses-best-practices.md)\.