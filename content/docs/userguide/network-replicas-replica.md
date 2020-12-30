---
description: ' Learn how replicas are used by GridMate peers to synchronize a replicas
  state across a &ALYlong; session. '
slug: network-replicas-replica
title: Replica
---
# Replica<a name="network-replicas-replica"></a>

Replicas are core components of GridMate's replication system that are created by network\-connected GridMate peers\. When a peer creates a replica, GridMate propagates the replica over the network to synchronize the replica's state across the session\. A locally created and owned replica is called a *primary replica*\. The copy of the primary replica that connected peers receive is called a *proxy replica*\. The synchronization and instantiation of replicas is handled by [Replica Manager](network-replicas-replica-manager.md)\. 

## Replica Chunks<a name="network-replicas-replica-chunks"></a>

Every replica holds a collection of user\-defined [`ReplicaChunk`](network-replicas-chunks.md) objects that are synchronized with all the peers in the current session\. A replica chunk is a container for user\-defined [DataSet](network-replicas-data-sets.md) objects and [Remote Procedure Calls \(RPCs\)](network-replicas-remote-procedure-calls.md)\. Any change to a `DataSet` object or a call to an RPC causes the replica to synchronize its state across the session\. 

### Limitations<a name="network-replicas-replica-chunk-limitations"></a>

Replica chunks have the following limitations:
+  Each replica can contain only 32 chunks\. 
+  Chunks can be attached or detached only when a replica is not bound to a replica manager\.

### Creating a Replica and Attaching Chunks<a name="network-replicas-replica-creating"></a>

 To create a replica, invoke the following method: 

```
GridMate::ReplicaPtr replica = GridMate::Replica::CreateReplica();
```

Most use cases require only one chunk per replica\. To create a chunk and attach it to a replica by using a single call, use the `CreateAndAttachReplicaChunk` helper function, as in the following example: 

```
GridMate::CreateAndAttachReplicaChunk<MyReplicaChunk>(replica, ...);
```

 If you just want to attach a chunk to a replica, do the following:

```
replica->AttachReplicaChunk(myChunk);
```

For more information about the creation and propagation of replica chunks, see [Replica Chunks](network-replicas-chunks.md)\.

### Binding a Replica to the Session Replica Manager<a name="network-replicas-replica-binding"></a>

In order for a replica to be synchronized, it must be bound to the session replica manager\. After you create a replica and attach chunks to it, get the replica manager from the [GridMate session](network-session-service.md)\. Then, bind the replica to it as follows: 

```
GridMate::ReplicaManager* replicaManager = session->GetReplicaMgr();
replicaManager->AddMaster(replica);
```

Proxy replicas are automatically instantiated by remote peers' replica managers and, therefore, automatically bound\. 

## Replica Ownership<a name="network-replicas-replica-ownership"></a>

When a peer creates a replica and binds it to the session replica manager, that peer becomes the owner of the replica\. Each replica can be owned by only one peer\. The replica owner is the only peer on the network that has the authority to change the state of the replica\. For example, it can change the chunks' datasets or directly execute its RPCs\. Any state changes performed on a proxy replica are considered invalid and do not propagate throughout the session\. RPCs can be called on a proxy replica, but the calls are forwarded to the owner for confirmation before they can be executed\. Once this confirmation is given, the RPC is sent to all proxies and also executed locally by the peer\. If the primary replica denies the execution, no peers receive the RPC call\. 

### Changing Ownership<a name="network-replicas-replica-ownership-changing"></a>

Replica ownership can be transferred from one peer to another, but the current owner of the replica must agree to the transfer\. For information on how a replica owner can prevent transfer of ownership, see [Replica Chunks](network-replicas-chunks.md)\.

Ownership transfer happens automatically when a session performs host migration on a peer\-to\-peer network\. You can also request it explicitly by invoking the following method: 

```
replica->RequestChangeOwnership(); // Request ownership of a given replica for the local peer
```

Ownership transfer is an asynchronous process\. When an ownership transfer is completed, each replica chunk is notified of the change by the `OnReplicaChangeOwnership` callback function\. 

### Replica ID<a name="network-replicas-replica-ownership-replica-id"></a>

Each replica has a unique ID associated with it\. The replica ID is guaranteed to be unique within a particular GridMate session\. You can use the replica ID to retrieve a replica from the session replica manager, as in the following example:

```
GridMate::ReplicaManager* replicaManager = session->GetReplicaMgr();
GridMate::ReplicaPtr replica = replicaManager->FindReplica(myReplicaId);
 
if (replica == nullptr)
{
    // Replica with given ID does not exist
    return;
}
 
if (replica->IsProxy())
{
    // This is a proxy replica
}
 
if (replica->IsMaster())
{
    // This is a primary replica
}
```

### Lifetime<a name="network-replicas-replica-lifetime"></a>

The lifetime of a replica is controlled by a `GridMate::ReplicaPtr`, which is a reference\-counted smart pointer\. The replica manager retains a reference to every replica that is bound to it\. It is therefore safe to omit a reference to the replica from user code; the replica is not destroyed as long as the reference is held in replica manager\. However, you can force the replica manager to release its reference and free the replica by invoking the following method: 

```
replica->Destroy();
```

## Sample Code<a name="network-replicas-replica-sample-code"></a>

This example creates a user\-defined chunk, creates a replica, attaches the chuck to the replica, and binds the replica to the session replica manager\. 

```
// User-defined ReplicaChunk class to be carried with the replica
class MyChunk : public GridMate::ReplicaChunk
{
public:
    GM_CLASS_ALLOCATOR(MyChunk);
    typedef AZStd::intrusive_ptr<MyChunk> Ptr; // smartptr to hold the chunk
    static const char* GetChunkName() { return "MyChunk"; } // Unique chunk name
    bool IsReplicaMigratable() override { return false; } // Replica ownership
                                                          // cannot be changed
 
    MyChunk () : m_data("Data", 0) { } // chunk constructor
    void OnReplicaActivate(const ReplicaContext& rc) override // Called when replica is bound 
                                                              // to the replica manager (both
                                                              // on local and remote peers)
    {
        // printing out whether it is a proxy or a primary replica
        if (IsMaster())
            printf("I am primary!\n");
        if (IsProxy())
            printf("I am proxy!\n");
    }
 
    GridMate::DataSet<int> m_data; // data this chunk holds
 };
 
GridMate::ReplicaPtr replica = GridMate::Replica::CreateReplica(); // Creating a replica
GridMate::CreateAndAttachReplicaChunk<MyChunk>(replica); // Creating chunk of our custom type
                                                         // and attaching it to the replica
 
GridMate::ReplicaManager* replicaManager = session->GetReplicaMgr(); // Getting replica manager instance 
                                                                     // from current session
replicaManager->AddMaster(replica); // Binding replica to the replica manager, 
                                    // making local peer the owner of this replica
 
...
// Starting from this point and up until replica destruction, the replica and MyChunk object
// that the replica is carrying are synchronized with other peers.
// Other peers receive the new replica and bind it to their replica managers. When this is done, 
// OnReplicaActivate is triggered, and the "I am proxy" message is printed out on the remote peers. 
// Every change of m_data DataSet results in the synchronization of the new value in 
// the primary replica with all of the proxy replicas.
```