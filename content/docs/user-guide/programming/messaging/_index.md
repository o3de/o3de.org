---
linktitle: Event Messaging
title: Event Messaging Systems
description: Learn about the event messaging systems in Open 3D Engine (O3DE). 
weight: 300
---

Event messaging systems are core parts of **Open 3D Engine (O3DE)** that allow cross-system communication. When you develop systems that need to communicate with other parts of O3DE, you need to use the event messaging systems that O3DE has in place.

## Section topics

| Topic | Description | 
| --- | --- |
| [Overview](overview) | An overview of the event messaging systems in O3DE and how they compare to each other. |
| [EBus](ebus) | An overview of the **Event Bus (EBus)** system. EBus is a single global bus that all systems can use to invoke requests and dispatch messages, respectively known as *request* and *notification* buses. |
| [EBuses in Depth](ebus-design) | A closer look at the technical design of EBuses and how to use them. |
| [AZ::Interface](az-interface) | A simpler alternative to EBus, `AZ::Interface` creates global request buses for invoking requests across systems. |
| [AZ::Event](az-event) | A simpler alternative to EBus, `AZ::Event` publishes single-value messages, which other components can subscribe to and process using the event's handler. |
