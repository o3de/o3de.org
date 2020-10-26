# Event Buses in Depth<a name="ebus-in-depth"></a>

Event buses \(or EBus for short\) are a general purpose system for dispatching messages\. Ebuses have many advantages: 
+ **Abstraction** – Minimize hard dependencies between systems\.
+ **Event\-driven programming** – Eliminate polling patterns for more scalable and high performing software\.
+ **Cleaner application code** – Safely dispatch messages without concern for what is handling them or whether they are being handled at all\.
+ **Concurrency** – Queue events from various threads for safe execution on another thread or for distributed system applications\.
+ **Predictability** – Provide support for ordering of handlers on a given bus\.
+ **Debugging** – Intercept messages for reporting, profiling, and introspection purposes\.

You can use EBuses in many different ways\. Following are some examples:
+ As a direct global function call
+ Dispatch processing to multiple handlers
+ Queue all calls, acting like a command buffer
+ As an addressable mailbox 
+ For imperative delivery
+  For queued delivery
+  Automatic marshalling of a function call into a network message or other command buffer

The EBus source code can found in the Lumberyard directory location `<root>\dev\Code\Framework\AZCore\AZCore\EBus\EBus.h`\.

## Bus Configurations<a name="ebus-in-depth-configuration"></a>

You can configure EBuses for various usage patterns\. This section presents common configurations and their applications\.

**Topics**
+ [Single Handler](#ebus-in-depth-configuration-single)
+ [Many Handlers](#ebus-in-depth-configuration-many)
+ [EBus with Addresses and a Single Handler](#ebus-in-depth-configuration-addresses-single-handler)
+ [EBus with Addresses and Many Handlers](#ebus-in-depth-configuration-addresses-many-handlers)

### Single Handler<a name="ebus-in-depth-configuration-single"></a>

The simplest configuration is a many\-to\-one \(or zero\) communication bus, much like a singleton pattern\.

![\[Many to one pattern\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/ebus-in-depth-1.png)

There is at most one handler, to which any sender can dispatch events\. Senders need not manually check and de\-reference pointers\. If no handler is connected to the bus, the event is simply ignored\.

```
// One handler is supported.
static const AZ::EBusHandlerPolicy HandlerPolicy = AZ::EBusHandlerPolicy::Single;
 
// The EBus uses a single address.
static const AZ::EBusAddressPolicy AddressPolicy = AZ::EBusAddressPolicy::Single;
```

### Many Handlers<a name="ebus-in-depth-configuration-many"></a>

Another common configuration is one in which many handlers can be present\. You can use this configuration to implement observer patterns, subscriptions to system events, or general\-purpose broadcasting\.

![\[Many handlers\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/ebus-in-depth-2.png)

Events to the handlers can be received in defined or undefined order\. You specify which one in the `HandlerPolicy` trait\.

#### Example Without Handler Ordering<a name="ebus-in-depth-configuration-many-unordered"></a>

To handle events in no particular order, simply use the `Multiple` keyword in the `HandlerPolicy` trait, as in the following example: 

```
// Multiple handlers. Events received in undefined order.
static const AZ::EBusHandlerPolicy HandlerPolicy = AZ::EBusHandlerPolicy::Multiple;
 
// The EBus uses a single address.
static const AZ::EBusAddressPolicy AddressPolicy = AZ::EBusAddressPolicy::Single;
```

#### Example with Handler Ordering<a name="ebus-in-depth-configuration-many-ordered"></a>

To handle events in a particular order, use the `MultipleAndOrdered` keyword in the `HandlerPolicy` trait, and then implement a custom handler\-ordering function, as in the following example: 

```
// Multiple handlers. Events received in defined order.
static const AZ::EBusHandlerPolicy HandlerPolicy = AZ::EBusHandlerPolicy::MultipleAndOrdered;
 
// The EBus uses a single address.
static const AZ::EBusAddressPolicy AddressPolicy = AZ::EBusAddressPolicy::Single;
 
// Implement a custom handler-ordering function
struct BusHandlerOrderCompare : public AZStd::binary_function<MyBusInterface*, MyBusInterface*, bool>
{
    AZ_FORCE_INLINE bool operator()(const MyBusInterface* left, const MyBusInterface* right) const { return left->GetOrder() < right->GetOrder();  }
};
```

### EBus with Addresses and a Single Handler<a name="ebus-in-depth-configuration-addresses-single-handler"></a>

EBuses also support addressing based on a custom ID\. Events addressed to an ID are received by handlers connected to that ID\. If an event is broadcast without an ID, it is received by handlers at all addresses\.

A common use for this approach is for communication among the components of a single entity, or between components of a separate but related entity\. In this case the entity ID is the address\.

![\[Addressing based on specific IDs\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/ebus-in-depth-3.png)

#### Example Without Address Ordering<a name="ebus-in-depth-configuration-single-addresses-unordered"></a>

In the following example, messages broadcast with an ID arrive at each address in no particular order\.

```
// One handler per address is supported.
static const AZ::EBusHandlerPolicy HandlerPolicy = AZ::EBusHandlerPolicy::Single;
 
// The EBus has multiple addresses. Addresses are not ordered.
static const AZ::EBusAddressPolicy AddressPolicy = AZ::EBusAddressPolicy::ById;
 
// Messages are addressed by EntityId.
using BusIdType = AZ::EntityId;
```

#### Example With Address Ordering<a name="ebus-in-depth-configuration-single-addresses-ordered"></a>

In the following example, messages broadcast with an ID arrive at each address in a specified order\.

```
// One handler per address is supported.
static const AZ::EBusHandlerPolicy HandlerPolicy = AZ::EBusHandlerPolicy::Single;
 
// The EBus has multiple addresses. Addresses are ordered.
static const AZ::EBusAddressPolicy AddressPolicy = AZ::EBusAddressPolicy::ByIdAndOrdered;
 
// Messages are addressed by EntityId.
using BusIdType = AZ::EntityId;
 
// Addresses are ordered by EntityId.
using BusIdOrderCompare = AZStd::greater<BusIdType>;
```

### EBus with Addresses and Many Handlers<a name="ebus-in-depth-configuration-addresses-many-handlers"></a>

In the previous configuration, only one handler is allowed per address\. This is often desirable to enforce ownership of an EBus for a specific ID, as in the singleton case above\. However, if you want more than one handler per address, you can configure the EBus accordingly:

![\[More than one handler per address\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/ebus-in-depth-4.png)

#### Example: Without Address Ordering<a name="ebus-in-depth-configuration-many-addresses-unordered"></a>

In the following example, messages broadcast with an ID arrive at each address in no particular order\. At each address, the order in which handlers receive the message is defined by `EBusHandlerPolicy`, which in this example is simply `ById`:

```
// Allow any number of handlers per address.
static const AZ::EBusHandlerPolicy HandlerPolicy = AZ::EBusHandlerPolicy::Multiple;
 
// The EBus has multiple addresses. Addresses are not ordered.
static const AZ::EBusAddressPolicy AddressPolicy = AZ::EBusAddressPolicy::ById;
 
// Messages are addressed by EntityId.
using BusIdType = AZ::EntityId;
```

#### Example: With Address Ordering<a name="ebus-in-depth-configuration-many-addresses-ordered"></a>

In the following example, messages broadcast with an ID arrive at each address in a specified order\. At each address, the order in which handlers receive the message is defined by the `EBusHandlerPolicy`, which in this example is `ByIdAndOrdered`\.

```
// Allow any number of handlers per address.
static const AZ::EBusHandlerPolicy HandlerPolicy = AZ::EBusHandlerPolicy::Multiple;
 
// The EBus has multiple addresses. Addresses are ordered.
static const AZ::EBusAddressPolicy AddressPolicy = AZ::EBusAddressPolicy::ByIdAndOrdered;
 
// We address the bus EntityId.
using BusIdType = AZ::EntityId;
 
// Addresses are ordered by EntityId.
using BusIdOrderCompare = AZStd::greater<BusIdType>;
```

## Synchronous vs\. Asynchronous<a name="ebus-in-depth-synchronous"></a>

EBus supports both synchronous and asynchronous \(queued\) messaging\. 

**Synchronous Messaging**  
Synchronous messages are sent to any and all handlers when an EBus event is invoked\. Synchronous messages limit opportunities for asynchronous programming, but they offer the following benefits:
+ They don't require storing a closure\. Arguments are forwarded directly to callers\.
+ They let you retrieve an immediate result from a handler \(event return value\)\.
+ They have no latency\.

**Asynchronous Messaging**  
Asynchronous messages have the following advantages: 
+ They create many more opportunities for parallelism and are more future proof\.
+ They support queuing messages from any thread, dispatching them on a safe thread \(like the main thread, or any thread that you choose\)\.
+ The code used to write them is inherently tolerant to latency and is easily migrated to actor models and other distributed systems\.
+ The performance of the code that initiates events doesn't rely on the efficiency of the code that handles the events\.
+ In performance\-critical code, asynchronous messages can improve i\-cache and d\-cache performance because they require fewer virtual function calls\.

For information on declaring an EBus for queing and sending messages asynchronously, see [Asynchronous/Queued Buses](ebus-usage-and-examples.md#ebus-usage-and-examples-queued)\.

## Additional Features<a name="ebus-in-depth-features"></a>

EBuses contain other features that address various patterns and use cases:
+ **Cache a pointer to which messages can be dispatched** – This is handy for EBuses that have IDs\. Instead of looking up the EBus address by ID for each event, you can use the cached pointer for faster dispatching\.
+ **Queue any callable function on an EBus** – When you use queued messaging, you can queue a Lambda function or bound function against an EBus for execution on another thread\. This is useful for general purpose thread\-safe queuing\.