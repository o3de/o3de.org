description: ' Use replica chunks in &ALYlong; to store data sets and remote procedure
  calls. '
slug: network-replicas-chunks
title: Replica Chunks
---
# Replica Chunks<a name="network-replicas-chunks"></a>

 A replica chunk is a user extendable network object\. One or more `ReplicaChunk` objects can be owned by a [replica](network-replicas-replica.md), which is both a container and manager for replica chunks\. A replica is owned by a primary peer and is propagated to other network nodes as a proxy replica\. The data that a replica chunk contains should generally be related to the other data stored within it\. Since multiple chunks can be attached to a replica, unrelated data can be stored in other chunks within the same replica\. 

 A replica chunk can contain [Datasets](network-replicas-data-sets.md) and/or [Remote Procedure Calls \(RPCs\)](network-replicas-remote-procedure-calls.md)\. Data sets store arbitrary data, which only the primary replica is able to modify\. Any changes are propagated to the chunks in proxy replicas on the other nodes\. RPCs are methods that can be executed on remote nodes\. They are first invoked on the primary, which decides whether the invocation will be propagated to the proxies\. 

## Replica Chunk Requirements and Limitations<a name="network-replicas-chunks-limitations"></a>

A replica chunk has several important attributes:
+ It can have up to 32 `DataSet` definitions\.
+ It can have up to 256 RPC definitions\.
+ It is reference counted and therefore must be held by a [smart pointer](https://en.wikipedia.org/wiki/Smart_pointer)\.
+ It is not synchronized across the session until the replica manager is ready\.

## Implementing a New Replica Chunk Type<a name="network-replicas-chunks-new-type"></a>

You have two ways to implement a new replica chunk type: handle data set changes and RPC calls \("game logic"\) inside the chunk, or outside the chunk\. In both cases, the following apply:
+ The name of the chunk type must be unique throughout the system\. To achieve this, every replica chunk type must implement the static member function `const char* GetChunkName()`\. The string returned by the `GetChunkName` function must uniquely identify the chunk type\. 
+ To indicate whether the ownership of this type of chunk is transferrable, every chunk type needs to override the `bool IsReplicaMigratable()` virtual function\. If any chunk in a replica is not migratable, the replica's ownership cannot be transferred from one peer to another\. 
+  Every chunk type must define a smart pointer that holds the chunk type instances\.  

### Declaring a Replica Chunk Type with Internal Game Logic Handling<a name="network-replicas-chunks-new-type-logic-inside"></a>

To have your replica chunk class handle game logic directly, it should inherit from `ReplicaChunk`:

```
class MyChunk : public GridMate::ReplicaChunk
{
public:
    GM_CLASS_ALLOCATOR(MyChunk); // Using GridMate's allocator
 
    MyChunk() 
        : m_data("Data", 0)                 // Initializing integer DataSet to zero, and assigning a name for it
        , MyRpcMethodRpc("MyRpcMethodRpc")  // Initializing RPC by passing in its name; the RPC name is for debugging purposes
    {
    }
 
 
    typedef AZStd::intrusive_ptr<DataSetChunk> Ptr;          // Defining smart pointer type for this chunk
    static const char* GetChunkName() { return "MyChunk"; }  // Unique chunk type name
    bool IsReplicaMigratable() override { return false; }    // Specify whether the chunk can participate in replica's ownership changes
  
    bool MyRpcMethod(int value, const GridMate::RpcContext& context)
    {
                     // Handle event here
        return true; // Propagate this call to all proxies
    }
  
    GridMate::Rpc<GridMate::RpcArg<int>>::BindInterface<MyChunk, &CustomChunk::MyRpcMethod> MyRpcMethodRpc;
    GridMate::DataSet<int> m_data;
 };
```

### Declaring a Replica Chunk Type with External Game Logic Handling<a name="network-replicas-chunks-new-type-logic-outside"></a>

To have your replica chunk class act as a simple data carrier and forward data changes and events to a designated handler \(an external class\), inherit your handler class from `ReplicaChunkInterface`, and your replica chunk class from `ReplicaChunkBase`: 

```
class CustomHandler : public GridMate::ReplicaChunkInterface
{
public:
    GM_CLASS_ALLOCATOR(CustomHandler); // using GridMate's allocator
 
    void DataSetHandler(const int& value, const GridMate::TimeContext& context)
    {
        // Handle changes
    }
 
    bool RpcHandler(AZ::u32 value, const GridMate::RpcContext &context)
    {
                     // Handle event here
        return true; // Propagate this call to all proxies
    }
};
  
class MyChunk : public GridMate::ReplicaChunkBase
{
public:
    GM_CLASS_ALLOCATOR(MyChunk); // Using GridMate's allocator
 
    MyChunk()
        : m_data("Data", 0)                // Initializing integer DataSet to zero and assigning a name for it
        , MyRpcMethodRpc("MyRpcMethodRpc") // Initializing RPC by passing its name; the RPC's name is used for debugging purposes
    {
    }
 
 
    typedef AZStd::intrusive_ptr<DataSetChunk> Ptr;         // Defining smart pointer type for this chunk
    static const char* GetChunkName() { return "MyChunk"; } // Unique chunk type name
    bool IsReplicaMigratable() override { return false; }   // Whether chunk can participate in replica's ownership changes
 
    GridMate::DataSet<int>::BindInterface<CustomHandler, &CustomHandler::DataSetHandler> m_data;
    GridMate::Rpc<GridMate::RpcArg<AZ::u32>>::BindInterface<CustomHandler, &CustomHandler::RpcHandler> MyRpcMethodRpcPC;
 };
```

### Registering Chunk Type<a name="network-replicas-chunks-new-type-registering"></a>

 Every user\-defined replica chunk type should be registered with `ReplicaChunkDescriptorTable` to create the factory required by the [Replica Manager](network-replicas-replica-manager.md)\.

To register replica chunks, use this call: 

```
GridMate::ReplicaChunkDescriptorTable::Get().RegisterChunkType<MyChunk>();
```

## Attaching a Replica Chunk to the Replica<a name="network-replicas-chunks-attaching-to-replica"></a>

You must add a replica chunk to a replica before you bind the replica to replica manager\. After you bind the replica to replica manager, you cannot add or remove replica chunks to or from the replica\. 

To create a replica chunk, use this call: 

```
MyChunk::Ptr myChunk = GridMate::CreateReplicaChunk<MyChunk>(<...>);
```

Where `<...>` is forwarded to the `MyChunk` constructor\.

To attach the chunk to a replica, use this call:

```
replica->AttachReplicaChunk(myChunk);
```

Alternatively, you can create the chunk and attach it in one step:

```
GridMate::CreateAndAttachReplicaChunk<MyChunk>(replica, <...>);
```

After you add the chunk to the replica, the replica retains a smart pointer to the chunk\. The chunk is released only when its replica is destroyed\. 