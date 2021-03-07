---
description: ' Learn how to use Open 3D Engine''s EBus from examples. '
title: Usage and Examples
---

This section provides examples in C\+\+ of how to declare and configure an EBus, implement a handler, send messages, and receive return values\. For information about using EBuses in Lua, see [Using EBuses in Lua](/docs/user-guide/features/interactivity/scripting/lua/ebus.md)\.

**Topics**
+ [Declaring an EBus](#ebus-usage-and-examples-declaring)
+ [EBus Configuration Options](#ebus-usage-and-examples-config-options)
+ [Implementing a Handler](#ebus-in-depth-handler)
+ [Sending Messages to an EBus](#ebus-usage-and-examples-messages)
+ [Retrieving Return Values](#ebus-usage-and-examples-return)
+ [Return Values from Multiple Handlers](#ebus-usage-and-examples-multiple)
+ [Asynchronous/Queued Buses](#ebus-usage-and-examples-queued)

## Declaring an EBus {#ebus-usage-and-examples-declaring}

Declaring an EBus is much like declaring any virtual interface class in C\+\+\. However, you can specify various configuration options that control how the EBus is generated at compile time and how it behaves\.

Here is a simple example of a basic interface and associated EBus\.

```
class ExampleInterface : public AZ::EBusTraits
{
public:
    // ------------------ EBus Configuration -------------------
    // These override the defaults in EBusTraits.

    // One handler per address is supported.
    static const AZ::EBusHandlerPolicy HandlerPolicy = AZ::EBusHandlerPolicy::Single;

    // The EBus contains a single address.
    static const AZ::EBusAddressPolicy AddressPolicy = AZ::EBusAddressPolicy::Single;
    // ------------------------ Other -------------------------

    virtual ~ExampleInterface() { };

    // ------------------ Handler Interface -------------------
    // Handlers inherit from ExampleInterfaceBus::Handler

    // Handlers are required to implement this because it's pure virtual.
    virtual void DoSomething() = 0;

    // Handlers can override this, but are not required to.
    virtual void SomeMessage() { }

    // Returns a value and has a parameter.
    virtual bool ReturnsValue(int x) = 0;
};

using ExampleInterfaceBus = AZ::EBus<ExampleInterface>;
```

**Tip**
Use descriptive names in EBuses, and avoid overloaded functions\. Explicit and descriptive function names prevent future API name collisions when classes inherit your EBus interfaces\. Avoiding overloaded functions improves the experience of using your EBuses\. This is especially true from scripting environments such as Lua, in which descriptive names improve readability and clarity\. For more information, see [Components and EBuses: Best Practices](/docs/userguide/components/entity-system-pg-components-ebuses-best-practices.md)\.

## EBus Configuration Options {#ebus-usage-and-examples-config-options}

EBus configuration options are key to controlling how the EBus behaves\. The configuration options used in the previous example are explained in the following sections\.

### HandlerPolicy {#ebus-usage-and-examples-config-options-handler-policy}

The `HandlerPolicy` trait determines how many handlers connect to an address on the EBus and the order in which handlers at each address receive events\. The following example specifies a [single handler](/docs/userguide/programming/ebus/in-depth#ebus-in-depth-configuration-single):

```
// One handler per address is supported.
static const AZ::EBusHandlerPolicy HandlerPolicy = AZ::EBusHandlerPolicy::Single;
```

The `HandlerPolicy` has two common uses:
+ A singleton pattern in which various systems post messages or requests to a single system elsewhere in the codebase\.
+ A pattern where a specific component or an entity handles messages to the EBus\. For example, you might have a mesh component that owns an entity\. The mesh component handles all mesh\-related queries addressed to the entity's ID\.

### Address Policy {#ebus-usage-and-examples-config-options-address-policy}

The `AddressPolicy` trait defines how many addresses exist on the EBus\. The following example specifies only a single address\. An ID is not required\.

```
// The EBus contains a single address.
static const AZ::EBusAddressPolicy AddressPolicy = AZ::EBusAddressPolicy::Single;
```

Practical use cases for a single address policy include any global EBus that is not tied to a specific entity, application\-specific ID, or object\.

### EBusAddressPolicy Options {#ebus-usage-and-examples-config-options-ebusaddresspolicy}

The `EBusAddressPolicy` has the following options:
+ **`Single`** - The EBus uses a single address\. No ID is used\. The EBus can have a [single handler](/docs/userguide/programming/ebus/in-depth#ebus-in-depth-configuration-single) or [many handlers](/docs/userguide/programming/ebus/in-depth#ebus-in-depth-configuration-many)\.
+ **`ById`** - The EBus has multiple addresses\. The order in which addresses are notified when broadcasting events without an ID is not specified\.
+ **`ByIdAndOrdered`** - The EBus has multiple addresses\. However, when broadcasting events without an ID, we want to control the order in which individual addresses are notified\. The `BusIdOrderCompare` definition allows for arbitrary customization of ordering\.

### EBusHandlerPolicy Options {#ebus-usage-and-examples-config-options-ebushandlerpolicy}

The `EBusHandlerPolicy` has the following options:
+ **`Single`** - One handler per address is supported\. Uses include an EBus with a [single handler](/docs/userguide/programming/ebus/in-depth#ebus-in-depth-configuration-single) or an [EBus with addresses and a single handler](/docs/userguide/programming/ebus/in-depth#ebus-in-depth-configuration-addresses-single-handler)\.
+ **`Multiple`** - Any number of handlers are supported\. Ordering is ignored\. Uses include [many handlers](/docs/userguide/programming/ebus/in-depth#ebus-in-depth-configuration-many) or an [EBus with addresses and many handlers](/docs/userguide/programming/ebus/in-depth#ebus-in-depth-configuration-addresses-many-handlers)\.
+ **`MultipleAndOrdered`** - Any number of handlers are supported, and handlers are notified in a particular order\. The `BusHandlerOrderCompare` definition allows for arbitrary customization of ordering\.

## Implementing a Handler {#ebus-in-depth-handler}

A handler of an EBus derives from `AZ::EBus<x>::Handler`\. For convenience this was defined as `ExampleInterfaceBus` in the [previous example](#ebus-usage-and-examples-declaring)\. This means that the handler can be derived from `ExampleInterfaceBus::Handler`\.

```
#include "ExampleInterface.h"

// note: derives from bus handler, rather than directly from ExampleInterface
class MyHandler : protected ExampleInterfaceBus::Handler
{
public:
   void Activate();

protected:
   // Implement the handler interface:
   void DoSomething() override; // note:  Override specified.
   void SomeMessage() override;
   bool ReturnsValue(int x) override;
};
```

Note that handlers are not automatically connected to an EBus, but are disconnected automatically because the destructor of `Handler` calls `BusDisconnect`\.

In order to actually connect to the EBus and start receiving events, your handler must call `BusConnect()`:

```
void MyHandler::Activate()
{
    // For a single EBus, this would be just BusConnect().
    // For multiple EBuses, you must specify the EBus to connect to:
    ExampleInterfaceBus::Handler::BusConnect();
}
```

You can call `BusConnect()` at any time and from any thread\.

If your EBus is addressed, connect to the EBus by passing the EBus ID to `BusConnect()`\.

```
// connect to the EBus at address 5.
ExampleAddressBus::Handler::BusConnect(5);
```

## Sending Messages to an EBus {#ebus-usage-and-examples-messages}

Anyone who can include the header can send messages to the EBus at any time\. Using the previous example, a completely unrelated class can issue a `DoSomething` call on the EBus:

```
#include "ExampleInterface.h" // Note: You don't need to include MyHandler.h.
...
ExampleInterfaceBus::Broadcast(&ExampleInterfaceBus::Events::DoSomething);
```

EBuses also support a macro\-based syntax\. This syntax is being phased out, but uses of it can still be found in O3DE source code\. The macro syntax for the previous example is as follows\.

```
#include "ExampleInterface.h"
// Note:  You don't need to include MyHandler.h.
...
EBUS_EVENT(ExampleInterfaceBus, DoSomething);
```

If your EBus is addressed, you can send events to a specific address ID\. Events broadcast globally are received at all addresses\.

```
// Broadcasts to ALL HANDLERS on this EBus regardless of address (even if the EBus has addresses)
ExampleAddressBus::Broadcast(&ExampleAddressBus::Events::Test);

// Broadcasts only to handlers connected to address 5.
ExampleAddressBus::Event(5, &ExampleAddressBus::Events::Test);
```

## Retrieving Return Values {#ebus-usage-and-examples-return}

If you make a synchronous call, you can also supply a variable in which to place the result:

```
// ALWAYS INITIALIZE YOUR RESULT!!!
// Since there may be nobody connected to the EBus, your result may not be populated.
bool result = false;
ExampleInterfaceBus::BroadcastResult(result, &ExampleInterfaceBus::Events::ReturnsValue, 2);
```

In this example, if there are no handlers connected to the EBus, the `result` variable is not modified\. If one or more handlers are connected to the EBus, `operator=()` is called on the `result` variable for each handler\.

## Return Values from Multiple Handlers {#ebus-usage-and-examples-multiple}

In certain cases you might have to aggregate the return value of a function when there are multiple handlers\. For example, suppose you want to send a message to all handlers that asks whether any one handler objects to shutting down an application\. If any one handler returns true, you should stop the shutdown\. The following would not suffice:

```
// Counterexample: returnValue contains only the result of the final handler.
bool returnValue = false;
SomeInterfaceBus::BroadcastResult(returnValue, &SomeInterfaceBus::Events::DoesAnyoneObject);
```

Because the EBus issues `operator=` for each handler, `returnValue` would contain only the result of the final handler\.

Instead, you can create a class to collect your results that overrides `operator=`\. There are several built\-in types for this, and you can make your own:

```
#include <AZCore/EBus/Results.h>

...
AZ::EBusAggregateResults<bool> results;
SomeInterfaceBus::BroadcastResult(results, &SomeInterfaceBus::Events::DoesAnyoneObject);

// results now contains a vector of all results from all handlers.

// alternative:
AZ::EBusLogicalResult<bool, AZStd::logical_or<bool>> response(false);
SomeInterfaceBus::BroadcastResult(response, &SomeInterfaceBus::Events::DoesAnyoneObject);

// response now contains each result, using a logical OR operation. So all responses are OR'd with each other.
```

**Note**
Additional building blocks \(for example, arithmetic results\) are available inside the `results.h` file\.

## Asynchronous/Queued Buses {#ebus-usage-and-examples-queued}

To declare an EBus on which events can be queued and sent asynchronously, add the following to the EBus declaration:

```
static const bool EnableEventQueue = true;
```

You can use `QueueBroadcast` and `QueueEvent` to enqueue events on an EBus so that you can flush them later from a controlled location or thread\.

To flush the queue at the appropriate location or thread, invoke the following:

```
ExampleInterfaceBus::ExecuteQueuedEvents();
```