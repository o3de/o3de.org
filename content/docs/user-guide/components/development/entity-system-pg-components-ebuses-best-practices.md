---
description: ' Learn about best practices for components and EBuses in Open 3D Engine. '
title: 'Components and EBuses: Best Practices'
weight: 1000
---

{{< preview-migrated >}}

Follow these best practices for creating and using components and EBuses.

## EBus Names 

The following EBus naming conventions remove ambiguity and provide consistency.
+ Use the name format `MyComponentRequestBus` for the bus that others use to invoke functions on `MyComponent`, as in the following example.

  ```
  class CheeseburgerComponentRequests : public AZ::ComponentBus
  {
        bool ICanHasCheeseburger() const = 0;
  };
  using CheeseburgerComponentRequestBus = AZ::EBus<CheeseburgerComponentRequests>;
  ```
+ Use the name format `MyComponentNotificationBus` for events that are broadcast from `MyComponent`, as in the following example.

  ```
  class CheeseburgerComponentNotifications : public AZ::ComponentBus
  {
        void OnCheeseburgerEaten(AZ::u8 yelpRating) {};
  };
  using CheeseburgerComponentNotificationBus = AZ::EBus<CheeseburgerComponentNotifications>;
  ```

## Provide Default Implementations of Methods 

Notification buses typically provide default implementations of the methods within the interface. Many other components can monitor your component's events, but not all of them are interested in every event that your component sends. If you provide default implementations for all your methods, other components that subscribe to your events can implement only those events that are relevant to them.

## EBus Event Naming 

Good EBus event names are verbose. Classes can monitor multiple buses, so descriptive event names makes it clear which bus the function corresponds to. This practice also prevents potential name collisions among event interfaces from different buses.

The following example is a clearly named `PhysicsComponentNotificationBus` event.

```
virtual void OnPhysicsEnabled() = 0;
```

The following example is an ambiguously named `PhysicsComponentNotificationBus` event.

```
virtual void OnEnabled() = 0;
```

## Avoid Using Type Definitions for Serialized Data 

An instructive example from O3DE shows the importance of using classes instead of type definitions for serialized data. Formerly, `EntityId` used the type definition `uint32_t`. When the decision was made to change this to 64\-bit, upgrade functions had to be written for every class that contained an `EntityId`. If `EntityId` had been a class, a single upgrade function could have been written for the class, and no further work would have been required. Obviously, this principle does not apply to primitive types like `bool`, `float`, `int`, and `string`. However, if you have a specific type that is serialized and might change in the future, implement it as a reflected class. This provides a single context where you can easily make the conversion for the class or type.

## EBus Results 

Always initialize a variable before calling an EBus event that overwrites the variable. Even if you are sure that a particular class or component is listening on the bus, it's worth handling the exceptional case. This is especially true in distributed environments in which entities can come and go as part of area\-of\-interest or other dynamic patterns.

The following example initializes a result variable before calling an EBus event that produces a result.

```
AZ::Transform targetEntityTransform = AZ::Transform::Identity(); // initialize result variable...
EBUS_EVENT_ID_RESULT(targetEntityTransform, targetEntityId, AZ::TransformBus, GetWorldTM); // ...in case of no response
```

## EBus Timing 

Following are some best practices for the timing of EBus actions.
+ In the [Activate()](/docs/userguide/components/entity-system-create-component#component-entity-system-create-component-az-activate) function, make sure that connecting to buses is the last step.
+ In the [Deactivate()](/docs/userguide/components/entity-system-create-component#component-entity-system-create-component-az-deactivate) function, make sure that disconnecting from buses is the first step.
+ In a multithreaded environment, it's possible to receive bus events from the moment that you connect to the bus until the moment you disconnect. For this reason, make sure of the following:
  + Your component is fully activated before it starts reacting to events.
  + Your component stops receiving events before it starts deactivation.

This practice prevents your component from being in a half\-activated state when it starts reacting to events, or in a half\-deactivated while still receiving events.
+ When you send events on a notification\-style bus, the last step in a function should ensure that the data is fully populated.

The following is an example to avoid.

```
EBUS_EVENT_ID(GetEntityId(), OnTransformChanged, newTransform);
m_transform = newTransform;
```

If a component is monitoring the `OnTransformChanged` event and sets your transform in response to the event, the component's action will be undone by the `m_transform = newTransform;` assignment.

## Making Functions Public or Protected 

Consider the following when deciding to make functions public or private.
+ Make your bus functions `public` if they constitute the public interface for your class. While it's discouraged, O3DE does not prevent users from getting direct pointers to components and calling functions directly. To avoid this, make sure that your useful functions are public. For example, `MyComponent` should probably implement functions from `MyComponentRequestBus` publicly.
+ Make your bus functions `protected` if they contain the private workings of your class. For example, your component's reaction to the `TransformNotificationBus::OnTransformChanged` event would likely be a private implementation detail.

## Additional Resources 

For more information on components and EBuses, consult the following resources.
+ For examples of EBus usage, see [Usage and Examples](/docs/learning-guide/samples/ebus/direct-access/).
+ For in\-depth information about EBuses, including conceptual diagrams, see [Event Buses in Depth](/docs/user-guide/engine/ebus/design/).
+ For questions and answers regarding best practices for components and EBuses, see [Components and EBuses: Questions and Answers](/docs/userguide/components/entity-system-pg-components-ebuses-questions-and-answers.md).
