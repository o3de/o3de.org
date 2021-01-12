---
description: ' Learn how each GridMate session''s replica manager manages the primary
  and proxy replicas in a &ALYlong; game session. '
title: Replica Manager
---
# Replica Manager<a name="network-replicas-replica-manager"></a>

The replica manager is a subsystem that is responsible for managing the synchronization of replicas\. The replica manager is responsible for the following:
+ Marshaling and unmarshaling the replicas in each peer
+ Forwarding replicas from one peer to another
+ Handling ownership changes of replicas
+ Managing replica lifetimes

**Managing Replica Lifecycle**  
The replica manager must do the following:
+ Keep track of all replicas by holding a reference\-counted pointer to every primary and proxy replica object\.
+ Guarantee consistency across the session by capturing and propagating the last state of every replica before a replica is destroyed\.
+ Guarantee that all proxies reach eventual consistency before a replica is deactivated\.
+ Release all GridMate references to a replica object when the object has been destroyed\.

**Topics**
+ [Binding a New Primary Replica to Replica Manager](#network-replicas-binding-new-primary-replica)
+ [Retrieving Replicas from Replica Manager](#network-replicas-retrieving-replicas-from-replica-manager)
+ [How Replica Manager Updates Replicas](#network-replicas-update)
+ [Task Manager](/docs/userguide/networking/replicas-manager-task-manager.md)

## Binding a New Primary Replica to Replica Manager<a name="network-replicas-binding-new-primary-replica"></a>

After a new primary replica is created, it must be bound to the replica manager as follows:

```
GridMate::ReplicaManager* replicaManager = session->GetReplicaMgr(); // Get replica manager from the current session
replicaManager->AddMaster(myReplica1); // Bind replica to replica manager
replicaManager->AddMaster(myReplica2); // Bind replica to replica manager
```

Proxy replicas are bound to their session's replica managers automatically\. Each `ReplicaManager` instance holds a reference to every replica that is bound to it\. That changes only when the user calls `Destroy()` on the replica or when the `ReplicaManager` itself is destroyed\.

## Retrieving Replicas from Replica Manager<a name="network-replicas-retrieving-replicas-from-replica-manager"></a>

Every replica has a numeric identifier that is unique in the session\. To find a replica by its ID, invoke `FindReplica(<ReplicaId>)`, as in the following example: 

```
GridMate::ReplicaPtr replica = replicaManager->FindReplica(<myReplicaId>); 
AZ_Assert(replica != nullptr, "Replica with id=%d not found.", <myReplicaId>);
```

## How Replica Manager Updates Replicas<a name="network-replicas-update"></a>

The GridMate session triggers the replica manager to perform replica updates on a continuous basis\. These updates include the following actions:
+ Unmarshaling
+ Update from replica
+ Update replicas
+ Marshaling

### Marshaling: Sending Data to Other Peers<a name="network-replicas-update-marshaling"></a>

Changes in a replica must be replicated to every remote peer in the GridMate session\. To communicate a change in one of its replicas, a peer's replica manager serializes the replica object into a send buffer\. It then sends the object to the network\. Replica marshaling occurs in two main phases: 
+ **Data Preparation** – A premarshaling phase that, based on changes in the replica, determines which RPCs and `DataSet` objects to send\. This phase also validates the data integrity of the objects to be sent\. 
+ **Actual Marshaling** – The transformation of a replica object into a byte stream\. The actual data that must be marshaled depends on how much new information the primary replica has relative to its corresponding remote proxy replica\. For example, new proxy replicas require all information about the primary replica\. This includes its [datasets](/docs/userguide/networking/replicas-data-sets.md), [RPCs](/docs/userguide/networking/replicas-remote-procedure-calls.md), and construction metadata\. Previously synchronized proxy replicas require only the information from the primary replica that is different, including any pending RPC calls\.

### Unmarshaling: Receiving Data from Other Peers<a name="network-replicas-update-unmarshaling"></a>

In unmarshaling, the replica manager communicates with the remote peers, receives and parses new data from them, and updates its own replicas accordingly\. These updates can include accepting new peers, instantiating new proxy replicas, handling ownership changes, or destroying proxy replicas\.

**Note**  
For more information about marshaling, see [Marshalling](/docs/userguide/networking/marshalling.md)\.

### Update from Replica: Updating Proxy Replicas<a name="network-replicas-update-updatefromreplica"></a>

A change in a custom [ReplicaChunk](/docs/userguide/networking/replicas-chunks.md) results in an `UpdateFromChunk` callback that causes all proxy replicas to update their state\. RPCs from proxy and primary replicas are processed and invoked during this step\.

### Update Replicas: Updating Primary Replicas Locally<a name="network-replicas-update-updatereplica"></a>

A change in a custom replica chunk results in an `UpdateChunk` callback that causes all primary replicas on a local peer to update their states\. 