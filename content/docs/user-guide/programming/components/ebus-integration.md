---
description: ' Learn about the relationship between components and EBuses in Open 3D Engine. '
title: Components and EBuses
weight: 700
---

EBuses are not required for components, nor are they directly bound to components in any way. But because they form the backbone of communication among all O3DE components, EBuses offer many benefits. We highly recommend that you learn how to use them in your game, systems, and components. For more information, see [Working with the Event Bus (EBus) system](/docs/user-guide/programming/messaging/ebus/).

Most components provide two EBuses to facilitate communication: a request bus and a notification bus. Both these EBuses use the `EBusAddressPolicy::ById` address policy and the ID of the entity for identification.

## Request Bus 

A component's request bus allows other components or external systems to make requests of the component. Usually the runtime version of the component implements the request bus. However, the editor component can service the bus in special cases.

The following sections examine the individual parts of an example request bus.

### Transform Request Event Group 

The following example defines a group of events that the `TransformComponent` handles.

```
class TransformComponentRequests
      : public AZ::ComponentBus // EBus traits for component buses: identification is based on an entity ID.
{
      public:

      // EBusTraits overrides - Only a single handler is allowed for a given entity ID.
      // Only one component on a entity can implement the events.
      static const EBusHandlerPolicy HandlerPolicy = EBusHandlerPolicy::Single;

      // Returns the local transform (parent transform excluded).
      virtual const Transform& GetLocalTM() = 0;

      // Sets the local transform and notifies all interested parties.
      virtual void SetLocalTM(const Transform& /*tm*/) {}

      // Returns the world transform (including parent transform).
      virtual const Transform& GetWorldTM() = 0;

      // Sets the world transform and notifies all interested parties.
      virtual void SetWorldTM(const Transform& /*tm*/) {}

      // Returns both local and world transforms.
      virtual void GetLocalAndWorld(Transform& /*localTM*/, Transform& /*worldTM*/) {}

...
 };
```

### Base Class and Trait Specification 

The base class for most `AZ::Component` request buses is `AZ::ComponentBus`. This class is a convenience to help set up EBus traits typical of component EBuses. You could also set up EBus traits by inheriting the default `AZ::EbusTraits`. Then you could optionally override any or all of the following traits. For more information, see [EBus Configuration Options](/docs/user-guide/programming/messaging/ebus-design/#ebus-in-depth-configuration).
+ Address policy
+ Bus ID type
+ Connection policy
+ Handler policy
+ Lock type
+ Priority sorting

These two approaches are shown in the following examples.

```
// Example using AZ::ComponentBus.
class TransformComponentRequests
      : public AZ::ComponentBus
{...}
```

```
// Example using AZ::EBusTraits
class TransformComponentRequests
      : public AZ::EBusTraits
{
...
      // EBusTraits overrides.
      static const EBusAddressPolicy AddressPolicy = EBusAddressPolicy::ById; // OR YOUR CHOSEN POLICY
      static const AZ::EBusHandlerPolicy HandlerPolicy = AZ::EBusHandlerPolicy::Multiple; // OR YOUR CHOSEN POLICY
      using BusIdType = EntityId;
...
}
```

### EBus Request Bus Events 

EBus event definitions are the main part of the bus specification. This interface defines what your component does. In the following example, the `TransformComponent` allows the retrieval and modification of the local and world transforms. It also creates interfaces for setting parent-child relationships.

```
...

// Returns the local transform (parent transform excluded).
virtual const Transform& GetLocalTM() = 0;

// Sets the local transform and notifies all interested parties.
virtual void SetLocalTM(const Transform& /*tm*/) {}

// Returns the world transform (including parent transform).
virtual const Transform& GetWorldTM() = 0;

// Sets the world transform and notifies all interested parties.
virtual void SetWorldTM(const Transform& /*tm*/) {}

// Returns both local and world transforms.
virtual void GetLocalAndWorld(Transform& /*localTM*/, Transform& /*worldTM*/) {}

...
```

### EBus Request Bus Definition 

After the event group has been declared, the EBus must be defined. Although you can use `AZ::EBus<TransformComponentRequests>` to define an EBus, we recommend that you use a `typedef` instead, as in the following example. This improves readability at bus call sites.

```
typedef AZ::EBus<TransformComponentRequests> TransformComponentRequestBus;
```

Another best practice is to use descriptive names in EBuses and avoid overloaded functions. Explicit and descriptive function names prevent future API name collisions as classes inherit (potentially many of) your EBus interfaces. Avoiding overloaded functions improves the experience of using your EBuses from scripting environments. In Lua and in visual scripting, the extra expressiveness improves readability and clarity.

## Notification Bus 

A component uses its notification bus to inform other components and the rest of the engine about relevant changes. To do this, it sends notifications in the form of EBus events to any class that monitors the bus. To monitor the bus, classes implement the notification bus handler interface \(in the case of `TransformComponent`, this is `AZ::TransformNotificationBus::Handler`.\)

{{< note >}}
A request bus sends messages **to** a component; a notification bus sends messages **from** a component.
{{< /note >}}

### Transform Notification Event Group 

The following example defines a group of notification events that the `TransformComponent` sends.

```
class TransformNotifications
      : public AZ::ComponentBus
{
    public:
    ...
      // Called when the local transform of the entity has changed. Local transform update always implies world transform change too.
      virtual void OnTransformChanged(const Transform& /*local*/, const Transform& /*world*/) {}
    ...
};

typedef AZ::EBus<TransformNotifications>    TransformNotificationBus;
```

The notification bus can also change its `EBusTrait` specification if required.

## Components as EBus Handlers 

After you have created the EBus event groups and defined the EBuses, your component can implement the EBus interface by deriving the EBus handler. The following example is from the `TransformComponent`.

```
class TransformComponent
      : public AZ::Component
    , private AZ::TransformComponentRequestBus::Handler
{
      ...

      // TransformBus.

      /// Returns true if the tm was set to the local transform.
      const AZ::Transform& GetLocalTM() override { return m_localTM; }

      /// Sets the local transform and notifies all interested parties.
      void SetLocalTM(const AZ::Transform& tm) override;

      /// Returns true if the transform was set to the world transform.
      const AZ::Transform& GetWorldTM() override { return m_worldTM; }

      /// Sets the world transform and notifies all interested parties.
      void SetWorldTM(const AZ::Transform& tm) override;

      /// Returns both local and world transforms.
      void GetLocalAndWorld(AZ::Transform& localTM, AZ::Transform& worldTM) override { localTM = m_localTM; worldTM = m_worldTM; }

      ...
}
```

At this point you can implement the defined methods in the `TransformComponent`. After the `TransformComponent` connects to the EBus for its entity ID, its event handlers are invoked whenever an event is sent on that bus or ID.
