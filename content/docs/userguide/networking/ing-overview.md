---
description: ' Learn about &ALYlong;''s networking capabilities. '
title: Overview
---
# Overview {#networking-overview}

Lumberyard enables multiplayer functionality through the following software layers:
+ AZFramework
  + Netbinding
+ GridMate
  + Replica
  + Session
  + Carrier
  + Driver

These layers are illustrated in the following diagram\.

![\[Lumberyard network system layers\]](/images/userguide/networking/networking-overview.png)

## NetBinding {#networking-overview-netbinding}

The network binding API of the AzFramework library provides a way for components to synchronize their state over the network\. The API is implemented on top of GridMate replicas\. A special `NetBindingComponent` is responsible for the actual binding process, so entities that need to be synchronized need to have a `NetBindingComponent` added to them\. When a game enters a multiplayer session, the `NetBindingComponent` collects replica chunks from the `NetBindables` on the entity, and adds them to a replica primary\. 

## GridMate {#networking-overview-gridmate}

GridMate is a library that enables you to easily add online features to your games on multiple operating systems and devices\. The GridMate API library has two general categories: network synchronization and online systems\. Each API is designed to be modular and extensible\. Services can be enabled independently of each other, and different implementations can be provided for each API\. Optional features are implemented as plugins for ease of customization\. GridMate is built on top of Lumberyard’s AzCore library\. Service APIs are implemented using EBuses \(AzCore’s implementation of signal/slots\) to improve modularity and extensibility\. All GridMate allocations are piped through two specific allocators: `GridMateAllocatorMP` is used for allocations from the network synchronization APIs\. `GridMateAllocator` is used for all other allocations, such as those from the online APIs and core system allocations\. GridMate also supports debugging through AzCore’s Driller framework\. All network and replication events are reported and can be captured for logging and debugging purposes\.

### Replica {#networking-overview-replica}

GridMate uses a single\-primary replication model\. For each replica, one node in the session owns the primary copy, and everyone else has a proxy copy\. Replicas can be individually migrated from node to node at any time\.

At the core of GridMate's replication model is the replica\. Replicas, along with the chunks, datasets and RPCs that make up the replica, provide a mechanism for capturing and propagating the game state\. Replicas also serve as the point of interaction for external game systems\. Replicas can be owned by any node in the network and can be migrated to whichever node that can process them most efficiently\.

Each node in the replication network runs a local instance of replica manager\. As a node establishes connections to other nodes, it adds them to the replica manager as peers\. This builds out its replication network\.

One important design element of GridMate replicas is the broadcast nature of the system\. Many replication systems allow users to specify replication targets directly, either per replica or per update\. This attempt to enable bandwidth optimizations is error prone and puts the implementation burden on gameplay programmers who are often less familiar with network desynchronization issues\. Instead, GridMate's approach follows the rule “when something happens, it happens for everyone”\. 

### Session {#networking-overview-session}

The session service is responsible for managing and maintaining the connectivity required to other members in a game session\. GridMate’s session service consists of a simple matchmaking API to facilitate integration with existing matchmaking services, and a session implementation that supports three topologies: P2P full mesh, client/server and a hybrid mode that consists of a full mesh network connected to a client/server network\. Host migration is available when using full mesh topology\. Host migration is a multi\-step process that begins as nodes lose connectivity to the session host\. The first step is host election: as nodes disconnect from the host, they broadcast a request for a new host election, and go through a series of voting rounds, until a majority is reached or the election process times out\. The new host\(s\) then starts the migration process, dropping problematic connections and migrating replicas until the session is stable again before resuming normal operations\. During this time the connection graph can be very unstable, and a variety of steps are taken to improve success rate\.

### Carrier {#networking-overview-carrier}

GridMate’s carrier implementation provides reliable and unreliable messaging\. Messages are sent over a channel\. Each channel represents an independent stream of messages\. Reliable and unreliable messages can be sent over the same channel\. Within a channel, message delivery is always ordered, and out\-of\-order unreliable messages are always discarded\. GridMate supports multiple channels to compartmentalize the effect of packet losses and reordering\. GridMate provides separate dedicated channels for replication and voice chat traffic\. To minimize impact to and from the game thread, the current carrier implementation performs network sends and receives from a separate IO thread\. Decoupling sends and receives into separate threads and incorporating epoll/IOCP is planned\. The carrier API provides hooks for congestion control, connection handshakes and network simulators\. Users can use the default implementations in GridMate or provide their own custom implementations\. 

### Driver {#networking-overview-driver}

The driver is the interface for the lowest level of the transport layer\. Lumberyard ships with several driver implementations: `SocketDriver` is a generic socket driver that supports BSD/WinSock/Posix sockets on the corresponding operating systems\. The `SecureSocketDriver` supports encrypted communication through the DTLS protocol by using OpenSSL\.

## Other GridMate Features {#networking-overview-other-features}

Other GridMate features include:
+ **Online Service** \- Provides essential user information used by the other APIs\.
+ **Achievements** \- An API for in\-game achievements support\.
+ **Leaderboards** \- An API for leaderboard support\.
+ **Online Storage** \- An API for online storage support\.

## CryNetwork Backward Compatibility \(Deprecated\) {#networking-overview-crynetwork-shim}

Lumberyard has a backwards compatibility layer for the deprecated legacy networking system called "CryNetwork"\. This layer is mostly encapsulated inside the CryNetwork library and exposed through the `INetwork` interface\. The layer is intended only for projects that were built using CryNetwork so that you can transition them to Lumberyard's network technology \(NetBinding components and GridMate\)\. Because the CryNetwork backward compatibility API layer uses CPU and bandwidth inefficiently, we strongly recommend that you do not build or release multiplayer games using it\.

For information on the compatibility layer, see [CryNetwork Backward Compatibility](https://docs.aws.amazon.com/lumberyard/latest/legacyreference/network-crynetwork-backward-compatibility.html)\.

**Topics**
+ [NetBinding](#networking-overview-netbinding)
+ [GridMate](#networking-overview-gridmate)
+ [Other GridMate Features](#networking-overview-other-features)
+ [CryNetwork Backward Compatibility \(Deprecated\)](#networking-overview-crynetwork-shim)
+ [Networking Architecture](/docs/userguide/networking/ing-architecture.md)
+ [Carrier](/docs/userguide/networking/carrier.md)
+ [Marshalling](/docs/userguide/networking/marshalling.md)
+ [Sessions](/docs/userguide/networking/session-service.md)
+ [Replicas](/docs/userguide/networking/replicas.md)
+ [Replica Manager](/docs/userguide/networking/replicas-replica-manager.md)