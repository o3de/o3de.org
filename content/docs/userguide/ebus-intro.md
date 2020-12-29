# Working with the Event Bus \(EBus\) system<a name="ebus-intro"></a>

Event buses \(EBuses\) are a general\-purpose communication system that Lumberyard uses to dispatch notifications and receive requests\. EBuses are configurable and support many different use cases\. 

To interact with the engine or other components in Lumberyard, include the component or system's EBus or API header in your code\. Then make calls to the exposed EBuses\. With this approach you can replace engine–level system APIs with implementations that you define in a gem\. For example, you could replace Lumberyard's audio system with your own EBus handler\. This would give you complete control over audio without having to recompile the engine\.

For examples of EBus usage, see [Usage and Examples](ebus-usage-and-examples.md)\. 

For in\-depth information about EBuses, including conceptual diagrams, see [Event Buses in Depth](ebus-in-depth.md)\. 

For C\+\+ API reference documentation on the core EBus code, see the [EBus API Reference](https://docs.aws.amazon.com/lumberyard/latest/apireference/EBus.html) in the [Amazon Lumberyard C\+\+ API Reference](https://docs.aws.amazon.com/lumberyard/latest/apireference/)\.

## How Components Use EBuses<a name="event-bus-intro-how-components-use-ebuses"></a>

Components commonly use EBuses in two ways: to dispatch events or to handle requests\. A bus that dispatches events is a `notification` bus\. A bus that receives requests is a `request` bus\. Some components provide one type of bus, and some components provide both types\. Some components do not provide an EBus at all\. You use the EBus class for both EBus types, but you configure the EBuses differently\. The following sections show how to set up and configure notification buses, event handlers, and request buses\.

## **Notification Buses**<a name="event-bus-intro-notification-buses"></a>

Notification buses dispatch events\. The events are received by handlers, which implement a function to handle the event\. Handlers first connect to the bus\. When the bus dispatches an event, the handler's function executes\. This section shows how to set up a notification bus to dispatch an event and a handler to receive the event\.

### Setting up a Notification Bus<a name="event-bus-intro-setting-up-a-notification-bus"></a>

**To set up a bus to dispatch events**

1. Define a class that inherits from [https://docs.aws.amazon.com/lumberyard/latest/apireference/struct_a_z_1_1_e_bus_traits.html](https://docs.aws.amazon.com/lumberyard/latest/apireference/struct_a_z_1_1_e_bus_traits.html)\. This class will be the interface for the [EBus](https://docs.aws.amazon.com/lumberyard/latest/apireference/class_a_z_1_1_e_bus.html)\.

1. Override individual `EBusTraits` properties to define the behavior of your bus\. Three `EBusTraits` that notification buses commonly override are `AddressPolicy`, which defines how many addresses the EBus contains, `HandlerPolicy`, which describes how many handlers can connect to each address, and `BusIdType`, which is the type of ID that is used to address the EBus if addresses are used\. For example, notification buses often need to have multiple addresses, with the addresses identified by entity ID\. To do so, they override the default `AddressPolicy` with [https://docs.aws.amazon.com/lumberyard/latest/apireference/namespace_a_z.html#abd62fbe2e48ab376e0cce1a0ff0ea873adb4f7ff88b3cc15c6c585c284600a3dd](https://docs.aws.amazon.com/lumberyard/latest/apireference/namespace_a_z.html#abd62fbe2e48ab376e0cce1a0ff0ea873adb4f7ff88b3cc15c6c585c284600a3dd) and set the `BusIdType` to [https://docs.aws.amazon.com/lumberyard/latest/apireference/class_a_z_1_1_entity_id.html](https://docs.aws.amazon.com/lumberyard/latest/apireference/class_a_z_1_1_entity_id.html)\.

1. Declare a function for each event that the EBus will dispatch\. Handler classes will implement these functions to handle the events\.

1. Declare an EBus that takes your class as a template parameter\.

1. Send events\. The function that you use to send the event depends on which addresses you want to send the event to, whether to return a value, the order in which to call the handlers, and whether to queue the event\.
   + To send an event to all handlers connected to the EBus, use [https://docs.aws.amazon.com/lumberyard/latest/apireference/struct_a_z_1_1_bus_internal_1_1_e_bus_broadcaster.html#aa622f2e4e0b27e0554a8d450d1af5385](https://docs.aws.amazon.com/lumberyard/latest/apireference/struct_a_z_1_1_bus_internal_1_1_e_bus_broadcaster.html#aa622f2e4e0b27e0554a8d450d1af5385)\. If an EBus has multiple addresses, you can use [https://docs.aws.amazon.com/lumberyard/latest/apireference/struct_a_z_1_1_bus_internal_1_1_e_bus_eventer.html#aed9aca9df1d88a51f34838100787c8cd](https://docs.aws.amazon.com/lumberyard/latest/apireference/struct_a_z_1_1_bus_internal_1_1_e_bus_eventer.html#aed9aca9df1d88a51f34838100787c8cd) to send the event only to handlers connected at the specified ID\. For performance\-critical code, you can avoid an address lookup by using `Event()` variants that take a pointer instead of an ID\.
   + If an event returns a value, use [https://docs.aws.amazon.com/lumberyard/latest/apireference/struct_a_z_1_1_bus_internal_1_1_e_bus_broadcaster.html#a4d3c8f6502a4358a36c763356c47063f](https://docs.aws.amazon.com/lumberyard/latest/apireference/struct_a_z_1_1_bus_internal_1_1_e_bus_broadcaster.html#a4d3c8f6502a4358a36c763356c47063f) or [https://docs.aws.amazon.com/lumberyard/latest/apireference/struct_a_z_1_1_bus_internal_1_1_e_bus_eventer.html#aee2aef13279c7fab83d9229f26cace1a](https://docs.aws.amazon.com/lumberyard/latest/apireference/struct_a_z_1_1_bus_internal_1_1_e_bus_eventer.html#aee2aef13279c7fab83d9229f26cace1a) to get the result\.
   + If you want handlers to receive the events in reverse order, use [https://docs.aws.amazon.com/lumberyard/latest/apireference/struct_a_z_1_1_bus_internal_1_1_e_bus_broadcaster.html#ad0588a3dab7547dccdc516377e90c4a4](https://docs.aws.amazon.com/lumberyard/latest/apireference/struct_a_z_1_1_bus_internal_1_1_e_bus_broadcaster.html#ad0588a3dab7547dccdc516377e90c4a4) or [https://docs.aws.amazon.com/lumberyard/latest/apireference/struct_a_z_1_1_bus_internal_1_1_e_bus_eventer.html#a930172ceeea2692b0eb5c6b85d83d53d](https://docs.aws.amazon.com/lumberyard/latest/apireference/struct_a_z_1_1_bus_internal_1_1_e_bus_eventer.html#a930172ceeea2692b0eb5c6b85d83d53d)\.
   + To send events asynchronously, queue the event\. Queued events are not executed until the queue is flushed\. To support queuing, set the [https://docs.aws.amazon.com/lumberyard/latest/apireference/class_a_z_1_1_e_bus.html#a95b9e7e9c5b00de0356853b8be5c3649](https://docs.aws.amazon.com/lumberyard/latest/apireference/class_a_z_1_1_e_bus.html#a95b9e7e9c5b00de0356853b8be5c3649) trait\. To queue events, use `QueueBroadcast()` or `QueueEvent()`\. To flush the event queue, use `ExecuteQueuedEvents()`\.

### Setting up a Handler<a name="event-bus-intro-setting-up-a-handler"></a>

**To enable a handler class to handle the events dispatched by a notification bus**

1. Derive your handler class from `<BusName>::Handler`\. For example, a class that needs to handle tick requests should derive from [https://docs.aws.amazon.com/lumberyard/latest/apireference/class_a_z_1_1_e_bus.html#a766031c060a297361903f0bbba31081b](https://docs.aws.amazon.com/lumberyard/latest/apireference/class_a_z_1_1_e_bus.html#a766031c060a297361903f0bbba31081b)\.

1. Implement the EBus interface to define how the handler class should handle the events\. In the tick bus example, a handler class would implement `OnTick()`\.

1. Connect and disconnect from the bus at the appropriate places within your handler class's code\. Use `<BusName>:Handler::BusConnect()` to connect to the bus and `<BusName>:Handler::BusDisconnect()` to disconnect from the bus\. If the handler class is a component, connect to the bus in `Activate()` and disconnect from the bus in `Deactivate()`\. Non\-components typically connect in the constructor and disconnect in the destructor\.

## **Request Buses**<a name="event-bus-intro-request-buses"></a>

A request bus receives and handles requests\. Typically, only one class handles requests for a request bus\.

### Setting up a Request Bus<a name="event-bus-intro-setting-up-a-request-bus"></a>

The first several steps for setting up a request bus are similar to setting up a notification bus\. After that you also need to implement the handlers for handling the requests\.

**To set up a request bus**

1. Define a class that inherits from `EBusTraits`\. This class will be the interface for requests made to the EBus\.

1. Override individual `EBusTraits` properties to define the behavior of your bus\. Two `EBusTraits` that request buses commonly override are `AddressPolicy`, which defines how many addresses the EBus contains, and `HandlerPolicy`, which describes how many handlers can connect to each address\. For example, because there is typically only one handler class for each request bus, request buses typically override the default handler policy with [https://docs.aws.amazon.com/lumberyard/latest/apireference/namespace_a_z.html#abd62fbe2e48ab376e0cce1a0ff0ea873a66ba162102bbf6ae31b522aec561735e](https://docs.aws.amazon.com/lumberyard/latest/apireference/namespace_a_z.html#abd62fbe2e48ab376e0cce1a0ff0ea873a66ba162102bbf6ae31b522aec561735e)\.

1. Declare a function for each event that the handler class will receive requests about\. These are the functions that other classes will use to make requests of the handler class\.

1. Declare an EBus that takes your class as a template parameter\.

1. Implement a handler for the events as described in the previous section [Setting up a Handler](#event-bus-intro-setting-up-a-handler)\.