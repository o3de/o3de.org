---
linktitle: AZ::Interface
title: AZ::Interface
description:  Use the AZ::Interface<T> template class to create global message request buses for Open 3D Engine. 
weight: 400
---

Use the `AZ::Interface<T>` template class to create global or application lifetime message request buses that support systems of `type T`. This template class is used to implement access for registered singletons across module boundaries. In this case, a singleton is an instance of a type that inherits `AZ::Interface::Registrar`. Once the singleton instance is registered, you can access the environment variables through code implemented on the instance. You can also make changes to the envirovnment variables that can be viewed by other parts of your game's components.

Commonly, `AZ::Interface` should be used when you want to invoke methods on a core system like the renderer or the console from another component.

A system is an instance of a class that inherits the `Registrar` method from `AZ::Interface`. Systems that are registered with `AZ::Interface` are designed to replace global or application lifetime request buses that are currently implemented using EBus. There are a number of benefits to this new system, including vastly improved performance and compatibility with IDE standard code autocomplete functionality.

{{< note >}}
*Systems*, in this usage, are key parts of O3DE. Some examples include the renderer, the console, the audio system, the input system, and the AI pathfinding system. With `AZ::Interface`, you access these systems with this simplified syntax:

`AZ::Interface<{system-interface-here}>->Get()->PerformCommand`
For example, `AZ::Interface<IAudio>->Get()->PlaySound();`

Likewise, you can use this syntax to invoke behaviors across systems for console functors (cfuncs) declared with [AZ::Console](./az-console).
{{< /note >}}

`AZ::Interface<T>` provides a number of significant improvements over using a single handler EBus, such as:
+ Improved performance. Calls to the singleton are a virtual function call that can often even be de-virtualized by the compiler, rather than a lock / list iterate / function dispatch to a virtual call.
+ Improved debuggability. `AZ::Interface` is essentially just an `AZ::Environment` variable wrapper that enables extensible singletons within O3DE.
+ Compatibility with code autocomplete in Visual Studio.

`AZ::Interface` is defined as a C++ template \(`template <T>`\) in the following header: `%INSTALL-ROOT%dev\Code\Framework\AzCore\AzCore\Interface\Interface.h`

**Using AZ::Interface**
This is the process for registering a singleton thread for a system with `AZ::Interface`
+ Obtain a raw interface pointer to a `type T` class instance for registration. You can assume that the registered system will outlive any cached references.
+ Register the system with the interface at initialization time by calling `Register()` on the reference to it.
+ Wait. If registration is successful, an `AZ::Environment` (which contains the environment variables for your game) is successfully attached and is ready to receive messages to update the environment variables.

To deregister a system, call `Unregister()` on `AZ::Interface`.

`AZ::Interface` defines the following static methods:
+ `static void Register(T* type)` - Registers an instance of `type T` to `AZ::Interface`.
+ `static void Unregister(T* type)` - Deregisters an instance of `type T` from `AZ::Interface`.
+ `static T* Get() `- Gets a reference to an instance of `type T` that is registered with `AZ::Interface`.

It also defines a helper class, `Registrar`, that enables registration and deregistration from within the `AZ::Interface` class constructor and destructor, respectively.

```
/**
         * A helper utility RAII mixin class that will register / unregister within the constructor / destructor, respectively.
         *
         * Example Usage:
         * @code{.cpp}
         *      class System
         *          : public Interface<ISystem>::Registrar
         *      {
         *      };
         * @endcode
         */
        class Registrar
            : public T
        {
        public:
            Registrar();
            virtual ~Registrar();
        };--
```

In most cases, you use `Registrar` instead of implementing registration directly.

Here's an example of using `AZ::Interface::Registrar` to register a system with a single method, `DoSomething()`, defined for it.

```
class ISystem
{
    public:
        virtual ~ISystem();
        virtual void DoSomething() = 0;
};

class System
    : public AZ::Interface<ISystem>::Registrar
{
    public:
        void DoSomething() override;
};

// In client code.

// Check that the pointer is valid before use.
if (ISystem* system = AZ::Interface<ISystem>::Get())
{
    system->DoSomething();
}
```

{{< important >}}
The restrictions for `AZ::Interface` are similar to that of a single-handler EBus:
Use `AZ::Interface` on long-lived instances only, such as instances with global variables that live across the lifetime of a module or application.

Because `AZ::Interface` uses `AZ::Environment` variables across DLL boundaries, you can only register/unregister after the `AZ::Environment` instance is attached after successful registration.
`AZ::Interface` works with EBus, and you can soft-migrate EBus code by providing an `AZ::Interface<T>` handler for the same set of requests.

***Thread safety is your responsibility***. Using `AZ::Interface<T>`does not make threads safe.
{{< /important >}}

**Vs. AZ::Event**
`AZ::Event` is a publish/subscribe (pub/sub) event handler that can be used when you want to subscribe to notifications from another component on the same thread. `AZ::Interface`, on the other hand, is a replacement for singletons, when you want to invoke methods on a core system like the renderer or the console.

## Converting from an EBus implementation 

Here is an example of converting a global request bus to `AZ::Interface<T>`.

**Example Original original EBus baseline**

```
// Bus interface
class EBusRequests
    : public AZ::EBusTraits
{
public:
    using MutexType = NullMutex;
    static const AZ::EBusHandlerPolicy HandlerPolicy = AZ::EBusHandlerPolicy::Single;
    static const AZ::EBusAddressPolicy AddressPolicy = AZ::EBusAddressPolicy::Single;
    virtual void Request(int value) = 0;
};
using EBusEventExampleBus = AZ::EBus<EBusEventExample>;

// Bus implementation
class EBusEventExampleImpl
    : public EBusPerfBaselineBus::Handler
{
public:
    EBusEventExampleImpl() { EBusEventExampleBus::Handler::BusConnect(); }
    ~EBusEventExampleImpl() { EBusEventExampleBus::Handler::BusDisconnect(); }
    void Request(int value) override;
};


// Invoke a request
EBusRequestsBus::Broadcast(&EBusRequests::Request, 1);
```

**Example EBus implementation converted to use AZ::Interface**
To convert from all-in EBus usage to a global request bus that uses `AZ::Interface` but can still interoperate with Script Canvas, you must make a few changes:
+ Create your pure virtual interface without any EBus code.
+ Create an EBus wrapper that inherits from `AZ::EBusTraits`, and declare the EBus as `AZ::EBus<{your-interface-class-name}, {your-ebus-wrapper-name}>.`
+ Create your implementation of your interface, inherit from your EBus wrapper handler, and do the following:
  + Call both `Register()` and `BusConnect()` in your class constructor.
  + Call both `Unregister()` and `BusDisconnect()` in your class destructor.

```
// Our pure-virtual interface only
class IRequests
{
public:
    virtual void Request(int value) = 0;
};

// EBus stuff
class EBusStuff
    : public AZ::EBusTraits
{
public:
    using MutexType = NullMutex;
    static const AZ::EBusHandlerPolicy HandlerPolicy = AZ::EBusHandlerPolicy::Single;
    static const AZ::EBusAddressPolicy AddressPolicy = AZ::EBusAddressPolicy::Single;
};
using EBusStuffBus = AZ::EBus<IRequests, EBusStuff>; // Note we specify the pure virtual interface first, and then the EBus stuff after

// Implementation, inherit from the pure-virtual interface
class RequestsImpl
    : public EBusStuffBus::Handler // Note we inherit from the bus handler
{
public:
    AZ_RTTI(RequestsImpl, "{some guid}", IRequests); // AZ type info is required

    RequestsImpl()
    {
        AZ::Interface<IRequests>::Register(this);
        EBusStuffBus::Handler::BusConnect();
    }

    ~RequestsImpl()
    {
        EBusStuffBus::Handler::BusDisconnect();
        AZ::Interface<IRequests>::Unregister(this);
    }

    void Request(int value) override;
};

// Invoke a request
AZ::Interface<IRequests>::Get()->Request(1);
```

**Example**
If you don't require interoperation with Script Canvas, you can avoid using EBus entirely, as seen in this example.

```
// Our pure-virtual interface only
class IRequests
{
public:
    virtual void Request(int value) = 0;
};

// Implementation
class RequestsImpl
    : public IRequests
{
public:
    AZ_RTTI(RequestsImpl, "{some guid}", IRequests); // AZ type info is required

    RequestsImpl()
    {
        AZ::Interface<IRequests>::Register(this);
    }

    ~RequestsImpl()
    {
        AZ::Interface<IRequests>::Unregister(this);
    }

    void Request(int value) override;
};

// Invoke a request
AZ::Interface<IRequests>::Get()->Request(1);
```

## Unit testing 

The `AZ::Interface` system includes a number of unit tests to validate correct behavior.

To execute the unit tests, the following command-line arguments can be provided to the `AzTestRunner`:

%INSTALL-ROOT%\\dev\\Bin64vc141.Test\\AzCoreTests.dll AzRunUnitTests --pause-on-completion --gtest\_break\_on\_failure --gtest\_filter=InterfaceTest\*

You should see unit testing output like this:

```
[==========] Running 6 tests from 1 test case.
[----------] Global test environment set-up.
[----------] 6 tests from InterfaceTest
[ RUN      ] InterfaceTest.EmptyInterfaceTest
[       OK ] InterfaceTest.EmptyInterfaceTest (2 ms)
[ RUN      ] InterfaceTest.EmptyAfterDisconnectTest
[       OK ] InterfaceTest.EmptyAfterDisconnectTest (0 ms)
[ RUN      ] InterfaceTest.ValidInterfaceTest
[       OK ] InterfaceTest.ValidInterfaceTest (0 ms)
[ RUN      ] InterfaceTest.RegistrarTest
[       OK ] InterfaceTest.RegistrarTest (0 ms)
[ RUN      ] InterfaceTest.RegisterTwiceAssertTest
[       OK ] InterfaceTest.RegisterTwiceAssertTest (1 ms)
[ RUN      ] InterfaceTest.RegisterMismatchTest
[       OK ] InterfaceTest.RegisterMismatchTest (0 ms)
[----------] 6 tests from InterfaceTest (4 ms total)
BM_EventPerf_EBusIncrementLambda      24516 ns      24554 ns      28000
```
