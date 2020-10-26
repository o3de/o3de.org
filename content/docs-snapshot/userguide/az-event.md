# AZ::Event<\.\.\.><a name="az-event"></a>

The `AZ::Event` template class is used to subscribe to and publish single value messages across the different components of your game\. It's designed to replace value\-based event pub/sub patterns that are currently implemented using EBus, only with significantly simpler syntax\. There are a number of benefits to this new system, including simpler code, fewer files, removal of aggregate interfaces where a handler only cares about a subset of events, and improved runtime performance when dispatching value changes to registered handlers\.

`AZ::Event` is defined as a C\+\+ template \(`template <typename... Params>`\) in the following header: `%INSTALL-ROOT%\dev\Code\Framework\AzCore\AzCore\Ebus\Event.h`

**Important**  
As of Amazon Lumberyard version 1\.24, `AZ::Event `limitations include the following:  
The event system is single\-threaded only\. Handlers should `Connect()` and `Disconnect()` on the same thread that is dispatching events\.
Handlers can be bound only to an existing event instance\. You can't bind to an event prior to its creation \(the way you can with an address by ID EBus\)\.
A handler can be bound only to a single event\. You can't bind a single handler to more than one event\.
There are no return results for handlers\. The handler function signature must have a void return result\.
There is no event queuing\. A queue can be built as a modular handler wrapper, but in the single\-threaded implementation, all events immediately dispatch to all handlers\.

`AZ::Event` provides a `Handler` class and the following explicit constructors:
+ `Handler(std::nullptr_t)`
+  `Handler(Callback callback)`
+ `Handler(const Handler& rhs)`
+ `Handler(Handler&& rhs)`

`AZ::Event::Handler` has the following methods defined on it:
+ To connect to a `Handler` instance: `void Connect(Event<Params...>& event);`
+ To disconnect from a `Handler` instance: `void Disconnect();`

**Example usage** 
+ To create an event for handling, declare an instance of `AZ::Event` with the following C\+\+ syntax:

  `AZ::Event<{type}> {name_of_event};`

  For example, to declare an event that can publish a Boolean value:

  `AZ::Event<bool> isPlayerActive;`
+ To declare a handler that will process the event when it is signaled:

  `AZ::Event<bool>::Handler playerActiveHandler([]({type} value) {});`

  For example, to create a handler for the event from the previous example:

  `AZ::Event<bool>::Handler playerActiveHandler([](bool value) {});`

When you declare the event and the handler in your header, you can connect to the event and signal it\. Here is a simple example using the declarations and calls from the prior examples:

```
// Declaration in your header
AZ::Event<bool> isPlayerActive; // Declare the event
AZ::Event<bool>::Handler playerActiveHandler([](bool value) {}); // Declare our handler
 
// Usage in your code
handler.Connect(isPlayerActive); // Connect the handler to to our event
// ...
isPlayerActive.Signal(true); // Signal the event to inform subscribers that the player is active
```

Here is a more complex example that signals multiple events with a class to handle them:

```
class ExampleEventComponent
   : public AZ::Component
{
public:
    using Event1Type = AZ::Event<const AZ::Vector3&>;
    using Event2Type = AZ::Event<float, float>;
 
    void Tick()
    {
        // Update component state
        if (value1Changed)
        {
            m_event1.Signal(value1);
        }
 
        if (value2Changed)
        {
            m_event2.Signal(value2.x, value2.y);
        }
    }
 
    void ConnectEvent1Handler(Event1Type::Handler& handler) { handler.Connect(m_event1); }
    void ConnectEvent2Handler(Event2Type::Handler& handler) { handler.Connect(m_event2); }
private:
    Event1Type m_event1;
    Event2Type m_event2;
};
 
class ExampleHandlerComponent
   : public AZ::Component
{
public:
    ExampleHandlerComponent()
       : m_handler1([this](const AZ::Vector3& value) { this->OnEvent1Invoked(value); })
       , m_handler2([this](float value2x, float value2y) { this->m_value2x = value2x; this->m_value2y = value2y;})
    {
    }
 
    void Activate()
    {
        ExampleEventComponent* eventComponent = GetEntity()->FindComponent<ExampleEventComponent>();
        if (eventComponent)
        {
            eventComponent->ConnectEvent1Handler(m_handler1);
            eventComponent->ConnectEvent2Handler(m_handler2);
        }
    }
 
    void OnEvent1Invoked(int32_t value) { // do something with value }
private:
    ExampleEventComponent::Event1Type::Handler m_handler1;
    ExampleEventComponent::Event2Type::Handler m_handler2;
};
```

**Performance**  
`AZ::Event` is roughly another 20% faster than even the lambda syntax for EBus, and over 40% faster than EBus's member function pointer model\. These performance deltas scale linearly with the number of handlers, so `AZ::Event` is 40% faster than using standard EBus member function pointers whether there's 1,000 handlers attached, or 1,000,000\.

To compare the EBus handler implementation code against `AZ::Event`, here is an example of code used to signal a change to a single value using EBus\.

```
// Single-value message handler using EBus

// Bus interface
class EBusEventExample
    : public AZ::EBusTraits
{
public:
    using MutexType = NullMutex;
    static const AZ::EBusHandlerPolicy HandlerPolicy = AZ::EBusHandlerPolicy::Multiple;
    static const AZ::EBusAddressPolicy AddressPolicy = AZ::EBusAddressPolicy::Single;
    virtual void OnSignal(int32_t) = 0;
};
using EBusEventExampleBus = AZ::EBus<EBusEventExample>;
 
// Bus implementation
class EBusEventExampleImpl
    : public EBusPerfBaselineBus::Handler
{
public:
    EBusEventExampleImpl() { EBusEventExampleBus::Handler::BusConnect(); }
    ~EBusEventExampleImpl() { EBusEventExampleBus::Handler::BusDisconnect(); }
    void OnSignal(int32_t) override {}
};
 
// Usage
EBusEventExampleImpl handler;
EBusEventExampleBus::Broadcast(&EBusEventExample::OnSignal, 1);
```

And here is an example that performs the same work using `AZ::Event`\.

```
// Single-value message handler implemented using AZ::Event
AZ::Event<int32_t> event; // Declare the event
AZ::Event<int32_t>::Handler handler([](int32_t value) {}); // Declare our handler
 
// Usage
handler.Connect(event); // Connect the handler to our event
event.Signal(1); // Signal an event, this will invoke our handler's lambda
```

Note the reduced lines of code, as well as the overall simpler code pattern\. Try it out by porting some of your current EBus message handlers to use `AZ::Event`, and then test it using our built\-in unit tests and benchmarks\.

## Unit testing and benchmarking<a name="az-event-unit-tests"></a>

The `AZ::Event `system includes a number of unit tests and benchmarks to validate correct behavior and confirm the performance advantages over an equivalent EBus implementation\.

To execute the unit tests, the following command\-line arguments can be provided to the `AzTestRunner`: 

%INSTALL\-ROOT%\\dev\\Bin64vc141\.Test\\AzCoreTests\.dll AzRunBenchmarks \-\-pause\-on\-completion \-\-benchmark\_filter=BM\_EventPerf\*

You should see unit testing output like this\.

```
[==========] Running 7 tests from 1 test case.
[----------] Global test environment set-up.
[----------] 7 tests from EventTests
[ RUN      ] EventTests.TestHasCallback
[       OK ] EventTests.TestHasCallback (0 ms)
[ RUN      ] EventTests.TestScopedConnect
[       OK ] EventTests.TestScopedConnect (0 ms)
[ RUN      ] EventTests.TestEvent
[       OK ] EventTests.TestEvent (1 ms)
[ RUN      ] EventTests.TestEventMultiParam
[       OK ] EventTests.TestEventMultiParam (0 ms)
[ RUN      ] EventTests.TestConnectDuringEvent
[       OK ] EventTests.TestConnectDuringEvent (0 ms)
[ RUN      ] EventTests.TestDisconnectDuringEvent
[       OK ] EventTests.TestDisconnectDuringEvent (0 ms)
[ RUN      ] EventTests.TestDisconnectDuringEventReversed
[       OK ] EventTests.TestDisconnectDuringEventReversed (1 ms)
[----------] 7 tests from EventTests (9 ms total)
```

To execute the benchmarks, the following command\-line arguments can be provided to the `AzTestRunner`: 

%INSTALL\-ROOT%\\dev\\Bin64vc141\.Test\\AzCoreTests\.dll AzRunBenchmarks \-\-pause\-on\-completion \-\-benchmark\_filter=BM\_EventPerf\*

You should see benchmark output like this\.

```
Benchmark name                     benchmark time   cpu time   iterations
BM_EventPerf_EventEmpty               16869 ns      16881 ns      40727
BM_EventPerf_EventIncrement           20124 ns      20508 ns      37333
BM_EventPerf_EBusEmpty                29421 ns      29157 ns      23579
BM_EventPerf_EBusIncrement            29686 ns      29297 ns      22400
BM_EventPerf_EBusIncrementLambda      24516 ns      24554 ns      28000
```