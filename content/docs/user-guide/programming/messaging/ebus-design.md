---
linktitle: EBus In Depth
title: Event Buses In Depth
description: Learn detailed information about EBuses in Open 3D Engine.
weight: 300
---

Event buses (EBus) are a general purpose system for dispatching messages. EBuses have many advantages:

* **Abstraction** - Minimize hard dependencies between systems.
* **Event-driven programming** - Eliminate polling patterns for more scalable and high performing software.
* **Cleaner application code** - Safely dispatch messages without concern for what is handling them or whether they are being handled at all.
* **Concurrency** - Queue events from various threads for safe execution on another thread or for distributed system applications.
* **Predictability** - Provide support for ordering of handlers on a given bus.
* **Debugging** - Intercept messages for reporting, profiling, and introspection purposes.

You can use EBuses in many different ways. Following are some examples:

* As a direct global function call
* Dispatch processing to multiple handlers
* Queue all calls, acting like a command buffer
* As an addressable mailbox
* For imperative delivery
* For queued delivery
* Automatic marshalling of a function call into a network message or other command buffer

The EBus source code can found in the O3DE directory location `Code/Framework/AZCore/AZCore/EBus/EBus.h`.

## Bus Configurations

You can configure EBuses for various usage patterns. This section presents common configurations and their applications.

### Single Handler

The simplest configuration is a many-to-one (or zero) communication bus, much like a singleton pattern.

{{< image-width src="/images/user-guide/programming/messaging/ebus/ebus-in-depth-1.png" width="700" alt="Many to one pattern" >}}

There is at most one handler, to which any sender can dispatch events. Senders need not manually check and de-reference pointers. If no handler is connected to the bus, the event is simply ignored.

```cpp
// One handler is supported.
static const AZ::EBusHandlerPolicy HandlerPolicy = AZ::EBusHandlerPolicy::Single;

// The EBus uses a single address.
static const AZ::EBusAddressPolicy AddressPolicy = AZ::EBusAddressPolicy::Single;
```

### Many Handlers

Another common configuration is one in which many handlers can be present. You can use this configuration to implement observer patterns, subscriptions to system events, or general-purpose broadcasting.

{{< image-width src="/images/user-guide/programming/messaging/ebus/ebus-in-depth-2.png" width="700" alt="Many handlers" >}}


Events to the handlers can be received in defined or undefined order. You specify which one in the `HandlerPolicy` trait.

#### Example Without Handler Ordering

To handle events in no particular order, simply use the `Multiple` keyword in the `HandlerPolicy` trait, as in the following example:

```cpp
// Multiple handlers. Events received in undefined order.
static const AZ::EBusHandlerPolicy HandlerPolicy = AZ::EBusHandlerPolicy::Multiple;

// The EBus uses a single address.
static const AZ::EBusAddressPolicy AddressPolicy = AZ::EBusAddressPolicy::Single;
```

#### Example with Handler Ordering

To handle events in a particular order, use the `MultipleAndOrdered` keyword in the `HandlerPolicy` trait, and then implement a custom handler-ordering function, as in the following example:

```cpp
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

### EBus with Addresses and a Single Handler

EBuses also support addressing based on a custom ID. Events addressed to an ID are received by handlers connected to that ID. If an event is broadcast without an ID, it is received by handlers at all addresses.

A common use for this approach is for communication among the components of a single entity, or between components of a separate but related entity. In this case the entity ID is the address.

{{< image-width src="/images/user-guide/programming/messaging/ebus/ebus-in-depth-3.png" width="700" alt="Addressing based on specific IDs" >}}

#### Example Without Address Ordering

In the following example, messages broadcast with an ID arrive at each address in no particular order.

```cpp
// One handler per address is supported.
static const AZ::EBusHandlerPolicy HandlerPolicy = AZ::EBusHandlerPolicy::Single;

// The EBus has multiple addresses. Addresses are not ordered.
static const AZ::EBusAddressPolicy AddressPolicy = AZ::EBusAddressPolicy::ById;

// Messages are addressed by EntityId.
using BusIdType = AZ::EntityId;
```

#### Example With Address Ordering

In the following example, messages broadcast with an ID arrive at each address in a specified order.

```cpp
// One handler per address is supported.
static const AZ::EBusHandlerPolicy HandlerPolicy = AZ::EBusHandlerPolicy::Single;

// The EBus has multiple addresses. Addresses are ordered.
static const AZ::EBusAddressPolicy AddressPolicy = AZ::EBusAddressPolicy::ByIdAndOrdered;

// Messages are addressed by EntityId.
using BusIdType = AZ::EntityId;

// Addresses are ordered by EntityId.
using BusIdOrderCompare = AZStd::greater<BusIdType>;
```

### EBus with Addresses and Many Handlers

In the previous configuration, only one handler is allowed per address. This is often desirable to enforce ownership of an EBus for a specific ID, as in the singleton case above. However, if you want more than one handler per address, you can configure the EBus accordingly:

{{< image-width src="/images/user-guide/programming/messaging/ebus/ebus-in-depth-4.png" width="700" alt="More than one handler per address" >}}

#### Example: Without Address Ordering

In the following example, messages broadcast with an ID arrive at each address in no particular order. At each address, the order in which handlers receive the message is defined by `EBusHandlerPolicy`, which in this example is simply `ById`:

```cpp
// Allow any number of handlers per address.
static const AZ::EBusHandlerPolicy HandlerPolicy = AZ::EBusHandlerPolicy::Multiple;

// The EBus has multiple addresses. Addresses are not ordered.
static const AZ::EBusAddressPolicy AddressPolicy = AZ::EBusAddressPolicy::ById;

// Messages are addressed by EntityId.
using BusIdType = AZ::EntityId;
```

#### Example: With Address Ordering

In the following example, messages broadcast with an ID arrive at each address in a specified order. At each address, the order in which handlers receive the message is defined by the `EBusHandlerPolicy`, which in this example is `ByIdAndOrdered`.

```cpp
// Allow any number of handlers per address.
static const AZ::EBusHandlerPolicy HandlerPolicy = AZ::EBusHandlerPolicy::Multiple;

// The EBus has multiple addresses. Addresses are ordered.
static const AZ::EBusAddressPolicy AddressPolicy = AZ::EBusAddressPolicy::ByIdAndOrdered;

// We address the bus EntityId.
using BusIdType = AZ::EntityId;

// Addresses are ordered by EntityId.
using BusIdOrderCompare = AZStd::greater<BusIdType>;
```

## Multithreaded Dispatches

EBuses can be configured for use in a multithreaded environment. Locking strategies are available for many common use cases.

### Single-Threaded

By default, an EBus is configured for single-threaded usage. Attempts to use it from multiple threads will result in asserts. This configuration is defined by setting the `MutexType` to `NullMutex`.

```cpp
// This EBus only supports single-threaded usage.
using MutexType = NullMutex;
```

### Multi-Threaded With Blocking Dispatches

To configure the EBus to allow for bus connects, disconnects, and event dispatches from multiple threads, set the MutexType to either `AZStd::mutex` or `AZStd::recursive_mutex`. Each operation on the EBus will lock the mutex to protect from multiple threads executing simultaneously. This configuration ensures that a bus handler cannot disconnect while it is in the middle of handling an event on a different thread. For simple multithreading cases, `AZStd::mutex` can be used. However, if the bus handler sends new events or connects / disconnects to a bus while handling an event on the same bus, `AZStd::recursive_mutex` should be chosen to ensure a single thread can't deadlock itself.

```cpp
// This EBus supports multi-threaded usage, though only one thread will execute at a time.
using MutexType = AZStd::recursive_mutex;
```

### Shared Locks

Inherit from `EBusSharedDispatchTraits` to configure the EBus so that it exclusively locks during bus connects and disconnects but uses a shared lock for event dispatches. Shared locks enable multiple concurrent event dispatches while still ensuring that bus connects / disconnects cannot occur during an event dispatch. This configuration is useful for an EBus that services requests from many threads and also has handlers that frequently connect and disconnect during the application lifetime. `EBusSharedDispatchTraits` sets the MutexType and the related LockGuard types to custom policies that enable concurrent event dispatches and ensure connects / disconnects only occur when no event dispatches are in progress.

```cpp
// This EBus supports concurrent multi-threaded event dispatches and protects
// from connects / disconnects occuring during event dispatches.
class MyBus : public AZ::EBusSharedDispatchTraits<MyBus>
{
    ...
}
```

### Lockless Dispatches

To configure the EBus so that it only locks during bus connects and disconnects, but not during event dispatches, set `LocklessDispatch` to true. The MutexType still needs to be set as well to configure the EBus as a multithreaded EBus and to guard against concurrent connects / disconnects. This is useful for an EBus that has handlers that only connect at startup and disconnect at shutdown, and never have handlers change connections status while the bus is in use. Lockless dispatches allow multiple events to execute concurrently with the least amount of event dispatch overhead.

```cpp
// Locking primitive to use for connects and disconnects.
using MutexType = AZStd::recursive_mutex;

// This EBus supports concurrent multi-threaded event dispatches but does not protect
// from connects / disconnects occuring during event dispatches.
static const bool LocklessDispatch = true;
```

## Synchronous vs. Asynchronous

EBus supports both synchronous and asynchronous (queued) messaging.

### Synchronous Messages

Synchronous messages are sent to any and all handlers when an EBus event is invoked. Synchronous messages limit opportunities for asynchronous programming, but they offer the following benefits:

* They don't require storing a closure. Arguments are forwarded directly to callers.
* They let you retrieve an immediate result from a handler (event return value).
* They have no latency.

### Asynchronous Messages

Asynchronous messages have the following advantages:

* They create many more opportunities for parallelism and are more future proof.
* They support queuing messages from any thread, dispatching them on a safe thread (like the main thread, or any thread that you choose).
* The code used to write them is inherently tolerant to latency and is easily migrated to actor models and other distributed systems.
* The performance of the code that initiates events doesn't rely on the efficiency of the code that handles the events.
* In performance-critical code, asynchronous messages can improve i-cache and d-cache performance because they require fewer virtual function calls.

## Additional Features

EBuses contain other features that address various patterns and use cases:

* **Cache a pointer to which messages can be dispatched** - This is handy for EBuses that have IDs. Instead of looking up the EBus address by ID for each event, you can use the cached pointer for faster dispatching.
* **Queue any callable function on an EBus** - When you use queued messaging, you can queue a Lambda function or bound function against an EBus for execution on another thread. This is useful for general purpose thread-safe queuing.
