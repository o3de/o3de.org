---
linkTitle: Overview
title: Multiplayer Gem Overview
description: An overview of the Multiplayer Gem in Open 3D Engine (O3DE). Includes an introduction to multiplayer components, which provide network state synchronization.
weight: 100
---

In Open 3D Engine, the synchronization needed for multiplayer support is performed through *multiplayer components*. Like other components in O3DE, these are attached to *entities*. Multiplayer components offer the capability to receive function calls from a remote source, *remote procedure calls (RPC)*, and define the data to be synchronized across the network. Each multiplayer component, normally generated as an [autocomponent](./autocomponents), defines its own requirements for other data to be present and which functions are available.

Some of the features offered in the O3DE Multiplayer Gem include:

* Role-based synchronization and replication rules
* Local prediction and backwards reconciliation ("rollback")
* Server-authoritative asynchronous multiplayer

## Multiplayer components

Open 3D Engine multiplayer components are built on top of standard O3DE components, offering the following data and functionality for network communication:

* **Network properties**, state information about the component that gets replicated between hosts.
* **Remote procedure calls (RPCs)**, allowing for messages to be sent to a particular component on an entity.

Together, these represent an event-driven messaging system. When a property changes on a network component, it triggers an event; Similarly, when an RPC is invoked, it sends a trigger to the relevant component. This means that the multiplayer gem uses a *push-based* model rather than *poll-based* model for synchronizing information across the clients and server. Using this model keeps code and entity management simpler, as well as offering the performance benefits of not requiring a network state check on a timer.

{{< important >}}
Network components are the **only** built-in way to communicate between entities in O3DE. Due to the engine's ability to distribute and interact with entities across multiple hosts, there is no guarantee that any two entities have authoritative representations on the same host.
{{< /important >}}

## Network properties

The O3DE Multiplayer Gem uses *delta replication* to transmit property changes across hosts. The delta replication method uses a system where a server maintains information about both each client's last acknowledged state and the current world state, then sends the differences between the two across the network. When the client receives this information, it updates the world state if the packet was received in the correct sequence.

One important consideration of this style of replication is that it requires the client to send an acknowledgement (`ACK`) message back to the server. The O3DE AzNetworking framework offers reliable UDP packets, including acknowledgement.

Without taking advanced networking features into consideration, a server checks for a delta on every frame by:

1. Inspecting a snapshot of the world state against each client's acknowledged state.
1. If the world state is different from the last state which resulted in an `ACK`, generate a delta for that client.
1. Transmit the delta to the client.

Clients would then update themselves from a delta by:

1. Checking if the received delta is in sequence.
1. Extracting the delta information and updating the world state.
1. Sending an `ACK` to the server indicating the world was updated.

## Remote procedure calls (RPCs)

Remote procedure calls are how O3DE allows for pushing messages between hosts, rather than sending an update based on server world state. Open 3D Engine offers both *reliable* and *unreliable* RPCs. By default, RPCs are reliable.

**Reliable** RPCs use a queue for guaranteed delivery. When sending any reliable packet, the packet is also inserted into a priority queue and given a timeout value related to the latency of the connection the message is being sent on. On timeout, if the reliable packet was not explicitly acknowledged, the packet will be retransmitted. On the receiving end, the O3DE client tracks every reliable packet received and guarantee that any packet will only be delivered at most once. While this feature provides *guaranteed* delivery, it doesn't provide *ordered* delivery.

**Unreliable** RPCs are sent over a "fire and forget" method. The host sending the message has no way to ensure that the message was received.

## Multiplayer entity roles

Since each entity with a multiplayer component is replicated across the network, they should be thought of as existing on more than one host simultaneously. This consideration introduces the problem of *authority* over the network - which hosts have precedence to set network state, define the replication rules, and determine which roles a host can play. In O3DE, these roles are intentionally compile-time enforced.

The roles offered for O3DE multiplayer hosts are:

* **Client**: The lowest privilege role for a component. The smallest possible subset of network properties are replicated to this role, and its behavior is strictly read-only. Use this role when working with entities that should contain only presentation logic and act as a proxy for invoking RPCs. Examples of entities which should use this role are AIs and entities under the control of another host.
* **Autonomous**: A role with the _illusion_ of write access. Autonomous roles are usually assigned to components directly under local user control, and receive a larger amount of network information than a Client role. Autonomous roles can also take advantage of predictive networking.
* **Authority**: This role has ultimate authority. It has full write access, and sees all network properties on the component.

In addition to the roles described above, O3DE has an additional role found only in multiserver instances:

* **ServerProxy**: Provided to servers which *don't* have authority over a particular component. The proxy dummies out the networking properties which the server should treat as if they were in the Client role. In the event of a server crash, proxy servers can fully assume the Server role as a hot backup.
