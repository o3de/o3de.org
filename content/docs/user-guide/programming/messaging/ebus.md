---
linktitle: EBus
title: Event Bus (EBus) System
description: Use event buses and the eventing system to dispatch messages between systems in Open 3D Engine. 
weight: 200
---

Most engines driven by *entity-component systems (ECS)*, such as Open 3D Engine's [Component Entity System](../../components), use a *publish-subscribe (pub/sub)* model to decouple event generators from event consumers. In these systems, an entity *publishes* events which interested consumers can *subscribe* to. For example, a collision component would want to *publish* an event when an object collides into it, and the entity which owns the component would *subscribe* to these events in order to adjust the other components.

In O3DE, the two main pub/sub systems are **EBus** (Event Bus), and [`AZ::Event`](/docs/api/frameworks/azcore/class_a_z_1_1_event.html). `AZ::Event` uses a delegate pattern: Specific component instances have a member of type `AZ::Event`, and the component adds (or removes) [`AZ::EventHandler`](/docs/api/frameworks/azcore/class_a_z_1_1_event_handler.html) objects
which perform the actual processing of the event itself for the component.

With EBus, listeners subscribe to a global singleton that is automatically created on first subscription, and automatically destroyed on last disconnection, with minimal logic of its own except to handle the list of listeners and to iterate over them, delivering callbacks. Because the singletons are global, any part of the code can connect, disconnect, or place events on that bus for listeners to receive. EBus is generally used for situations where event flow is more important than the source of the event, (or the source comes from many different components and is listened to by many others), and avoids writing boilerplate for the usual implementation of that sort of system, which would be to create a custom global singleton which receives calls, only to turn around and reflect them back down to subscribed listeners.
