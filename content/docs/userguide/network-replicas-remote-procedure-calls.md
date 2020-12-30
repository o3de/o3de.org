---
description: ' Use remote procedure calls (RPCs) to send events or requests through
  replicas in &ALYlong;. '
slug: network-replicas-remote-procedure-calls
title: Remote Procedure Calls (RPCs)
---
# Remote Procedure Calls \(RPCs\)<a name="network-replicas-remote-procedure-calls"></a>

RPCs allow games to send events or requests to remote nodes through replicas\. They can be used to send messages to a specific node, or to route function calls to the authoritative node\. For example, you can use RPCs to implement functions that change the position of an object\. This ensures that changes happen only at the node that owns the object\. For server\-authoritative games, reliable RPCs can be used for sending frequent client input commands\.

RPCs have the following characteristics:
+ RPC arguments can be of any type, as long as a valid marshaler is provided\.
+ All RPC requests are routed to the primary replica\.
+ The RPC handler function in the primary replica chooses whether to propagate the RPC to proxy replicas\.
+ RPCs are not kept in the history, and late\-joining clients might not receive RPCs requested before the client joined\.

Like datasets, RPCs are declared as replica chunk members\. An RPC handler function is bound to the RPC as part of the declaration\. RPC requests are forwarded to the handler function along with the arguments and an `RpcContext` associated with the request\.

The RPC handler function can perform additional checks before executing the request\. 

The handler for an RPC returns a Boolean value to GridMate\. This value is used on the replica's primary node to determine whether the RPC is propagated to all proxies\.

Remote procedure calls are always invoked first on the primary node for the replica\. This is true whether the initial caller is a primary or proxy\. The primary node's RPC handler decides whether the RPC should be propagated to the proxy nodes based on the return value of the RPC handler\. The user returns `true` to mean "propagate to all replica proxies," and `false` to mean "only invoke this RPC on the primary\."

RPCs have a constructor that requires a string\. This is used for debugging and statistical purposes\. Any debugging or network monitoring exposes the given RPC name\. Using modern C\+\+, the name can also be specified inline, as in the following example\.

```
Rpc<RpcArg<AZ::u32>>::BindInterface<MyClass,
&MyClass::Func> Rpc = {"My RPC"};
```

## Examples<a name="network-replicas-remote-procedure-calls-examples"></a>

The following examples show how RPCs can be used in GridMate\.

### Example 1<a name="network-replicas-remote-procedure-calls-example-1"></a>

In the following example, `Rpc1` is an RPC that takes a single parameter of type `u32`\. It uses the default `u32` marshaler\.

```
class MyReplicaChunk : public GridMate::ReplicaChunk
{
    bool Rpc1Handler(AZ::u32 val, const GridMate::RpcContext& context) { /* RPC Logic */ }
    GridMate::Rpc<GridMate::RpcArg<AZ::u32>>::BindInterface<MyReplicaChunk, &MyReplicaChunk::Rpc1Handler> Rpc1;
};
```

### Example 2<a name="network-replicas-remote-procedure-calls-example-2"></a>

In the following example, `Rpc2` is an RPC that takes a single parameter of type `s32`\. It uses `IntegerQuantizationMarshaler`, with a range from `-100` to `100` and writes one byte to the wire\.

```
class MyReplicaChunk : public GridMate::ReplicaChunk
{
    bool Rpc2Handler(AZ::s32 val, const GridMate::RpcContext& context) { /* RPC Logic */ }
    GridMate::Rpc<GridMate::RpcArg<AZ::s32, GridMate::IntegerQuantizationMarshaler<-100, 100, 1>>>::BindInterface<MyReplicaChunk, &MyReplicaChunk::Rpc2Handler> Rpc2;
};
```

### Example 3<a name="network-replicas-remote-procedure-calls-example-3"></a>

In the following example, `Rpc3` is an RPC that takes two parameters; a `u8` and a string\. It uses the default marshalers for each argument\.

```
class MyReplicaChunk : public GridMate::ReplicaChunk
{
    bool Rpc3Handler(AZ::u8 val, const AZStd::string& str, const GridMate::RpcContext& context) { /* RPC Logic */ }
    GridMate::Rpc<GridMate::RpcArg<AZ::u8>, GridMate::RpcArg<const AZStd::string&>>::BindInterface<MyReplicaChunk, &MyReplicaChunk::Rpc3Handler> Rpc3;
};
```

### Example 4<a name="network-replicas-remote-procedure-calls-example-4"></a>

If you want to send a custom class as an RPC parameter, you must first write a marshaler for it, as in the following example\.

```
struct MyClass
{
    AZ::Crc32 m_name;
    AZ::u32 m_value;
};

namespace GridMate
{
    template<>
    class Marshaler<MyClass>
    {
    public:
        static const AZStd::size_t MarshalSize = Marshaler<AZ::Crc32>::MarshalSize + sizeof(AZ::u32);
 
        void Marshal(WriteBuffer& wb, const MyClass& value) const
        {
            wb.Write(value.m_name);
            wb.Write(value.m_value);
        }
        void Unmarshal(MyClass & value, ReadBuffer& rb) const
        {
            rb.Read(value.m_name);
            rb.Read(value.m_value);
        }
    };
}
```

An RPC that passes a parameter of the foregoing class might be declared like this:

```
class MyReplicaChunk : public GridMate::ReplicaChunk
{
    bool Rpc4Handler(const MyClass& value, const GridMate::RpcContext& context) { /* RPC Logic */ }
    GridMate::Rpc<GridMate::RpcArg<const MyClass&>>::BindInterface<MyReplicaChunk, &MyReplicaChunk::Rpc4Handler> Rpc4;
};
```

For `Rpc4`, the first and only argument is a `const` reference to the `MyClass` object\. The `const MyClass&` is specified to indicate that the `Rpc4Handler` function takes a `const` reference\. This allows you to avoid making a copy of the object when it is passed to the handler function\. Behind the scenes, GridMate stores a temporary value of `MyClass`, which is what the reference binds to\. The temporary referent is removed after the RPC has been called\. You can also use this technique to marshal objects that are wrapped in smart pointers\.

### Example 5<a name="network-replicas-remote-procedure-calls-example-5"></a>

In order to invoke an RPC on a given chunk instance, you can simply call the RPC, as in the following example\.

```
class MyReplicaChunk : public GridMate::ReplicaChunk
{
    bool Rpc5Handler(AZ::u32 val, const GridMate::RpcContext& context) { /* RPC Logic */ }
    GridMate::Rpc<GridMate::RpcArg<AZ::u32>>::BindInterface<MyReplicaChunk, &MyReplicaChunk::Rpc1Handler> Rpc5;
};

void Foo(MyChunkType* myChunkInstance)
{
    myChunkInstance->Rpc5(1);
}
```

`Rpc5` is an RPC that takes a single parameter of type `u32`\. It uses the default `u32` marshaler\. Calling `Foo` invokes the RPC on the replica chunk instance and passes in a value of `1`\.

## RPC Type Traits<a name="network-replicas-remote-procedure-calls-type-traits"></a>

RPCs have an optional `typetraits` parameter\. The following traits are expected in the `traits` class\.


****  

| Trait | Default Value | Description | 
| --- | --- | --- | 
| s\_isReliable | true | Uses reliable transmission to send the RPC\. | 
| s\_isPostAttached | true | Forces any dirty datasets to also be sent reliably in advance\. This is useful if the RPC relies on the data in the datasets to be up to date on the destination peer\. | 