description: ' Use DataSet objects in &ALY; to synchronize a state across the network. '
slug: network-replicas-data-sets
title: Datasets
---
# Datasets<a name="network-replicas-data-sets"></a>

You can use `DataSet` objects to synchronize the state of a session across the network\. When a value in the dataset changes, the updates are propagated automatically\. Datasets can be of any type, but they must support the assignment and comparison operators\. Your `DataSet` declaration can specify a custom marshaler\. If you do not specify a marshaler, the `DataSet` object uses `GridMate::Marshaler<T>`\.

A `DataSet` must be declared inside a `ReplicaChunk` object\. A `ReplicaChunk` object can contain up to 32 `DataSet` objects\. You must supply a debug name to the dataset constructor\.

The following example declares a `ReplicaChunk` object that has two `DataSet` objects of type `float`\. One dataset uses the default marshaler\. The other dataset uses a custom marshaler called `MyCustomMarshaler`\.

```
class MyChunkType : public GridMate::ReplicaChunk
{
    public:
    MyChunkType()
        : m_synchedFloat("SynchedFloat")
        , m_synchedHalf("SynchedHalf")
    {
    }
 
    GridMate::DataSet<float> m_synchedFloat;
    GridMate::DataSet<float, MyCustomMarshaler> m_synchedHalf;
};  
```

Datasets can be optionally bound to a callback on the chunk interface so that the callback is called when new data arrives\.

```
class MyChunkType : public GridMate::ReplicaChunk
{
public:
    MyChunkType()
        : m_synchedFloat("SynchedFloat")
    {
    }
 
    // Callback to call when new data arrives.
    void OnSynchedFloatData(const float& newValue, const GridMate::TimeContext& timeContext);
 
    GridMate::DataSet<float>::BindInterface<MyChunkType, amp;MyChunkType::OnSynchedFloatData> m_synchedFloat;
};
```

[Eventual consistency](https://docs.aws.amazon.com/general/latest/gr/glos-chap.html#eventualconsistency) is guaranteed for datasets\. Normally, datasets propagate unreliably\. To compensate for potential packet losses, and to minimize latency, GridMate handles events in the following order:

1. A user changes a value in the dataset\.

1. The new value is broadcast to the remote peers\.

1. The dataset stops changing\.

1. A user\-configurable grace period elapses\.

1. A last update is sent reliably\.

1. To conserve bandwidth, propagation is suspended until the next change\.

You can change the length of the grace period in step 4 by calling `SetMaxIdleTime`:

```
...
GridMate::DataSet<Vector3> m_pos;
...
 
...
m_pos.SetMaxIdleTime(5.f);  // Suspend sending if m_pos has not changed for 5 ticks
...
```

## Carrier ACK Feedback<a name="network-replicas-data-sets-carrier-ack-feedback"></a>

Lumberyard 1\.12 introduced, as a preview feature, carrier ACK feedback\. 

In the default GridMate implementation, a change in a dataset causes four unreliable updates and then one reliable update to be sent\. This technique can result in many reliable packets on the network\. Because reliable packets require ordering, preceding packets cannot be processed until a lost packet is successfully retransmitted\. The resulting delay can cause jitter\.

To avoid this issue, you can enable carrier ACK feedback\.

When carrier ACK feedback is enabled, a changed dataset propagates its update unreliably until the receiver sends an ACK to acknowledge that it received the update\. This approach removes the requirement for updates to be sent reliably \(step 5 in the previous section\)\. Additionally, if a dataset update is acknowledged as received before the grace period specified by `MaxIdleTime`, GridMate saves bandwidth by not sending additional unneeded updates\.

To enable carrier ACK feedback, set the `k_enableAck` property of `ReplicaTarget` to `true` in the `ReplicaTarget.cpp` file, as in the following example:

```
...
bool ReplicaTarget::k_enableAck = true;
...
```

## Examples<a name="network-replicas-data-sets-examples"></a>

The examples in this section show three ways to create datasets\.

### Example 1<a name="network-replicas-data-sets-example-1"></a>

The following example creates a `DataSet` object that uses the default marshaler to store a `u32` value\.

```
GridMate::DataSet<AZ::u32> m_data;
```

### Example 2<a name="network-replicas-data-sets-example-2"></a>

The following example creates a `DataSet` object that stores a float\. The data written to the network is half float size because of the specified marshaler\.

```
GridMate::DataSet<float, HalfMarshaler> m_data;
```

### Example 3<a name="network-replicas-data-sets-example-3"></a>

The following example creates a `DataSet` object that stores an `s32` value using the default marshaler for `s32`\. Whenever the `DataSet` value changes, the `DataSetHandler` function is called on the `MyReplicaChunk` instance\. This is true for both primary and proxy nodes; the event is triggered on local data changes for the primary and upon received data changes for the proxies\.

```
class MyReplicaChunk : public GridMate::ReplicaChunk
{
    void DataSetHandler(const AZ::s32& value, const GridMate::TimeContext& context) { /* Data Changed Logic */ }
    GridMate::DataSet<AZ::s32>::BindInterface<MyReplicaChunk, &MyReplicaChunk::DataSetHandler> Data;
};
```

## Throttlers<a name="throttlers"></a>

Datasets can be throttled based on an optional throttler parameter to the template\. The throttler can choose to send data or withhold downstream updates unless a certain condition has been met\. The throttler must implement the `WithinThreshold` method using the following syntax\.

```
bool WithinThreshold(T previousValue, T currentValue);
```

The return value of the method determines whether to send the data to the proxy peers\.