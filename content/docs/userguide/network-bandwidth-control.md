# Controlling Bandwidth Usage<a name="network-bandwidth-control"></a>

[GridMate](network-intro.md) provides several ways to control the bandwidth that your game uses, including bandwidth throttling and the prioritization of [replica](network-replicas-replica.md) updates\.

## Controlling the Send Rate<a name="network-bandwidth-control-send-rate"></a>

You can use GridMate to control the server send rate, which is a common technique for reducing bandwidth usage in multiplayer games\. In this scenario, a multiplayer game is hosted by a dedicated server to which clients send their replica changes at their default rate \(for example, 60 frames per second\)\. To reduce bandwidth usage, you lower the server send rate \(for example, to 20 transmissions per second\)\. To avoid jitter when this technique is used, the client must be able to interpolate the game state that it receives from the server\. 

To control the server send rate in GridMate, set the time interval for replica data transmissions: 

```
ReplicaMgr* replicaManager = session->GetReplicaMgr(); // Get the replica manager instance. This assumes the session has been established.
replicaManager->SetSendTimeInterval(100); // Set the send interval to 100 milliseconds. 10 updates per second will be sent.
```

Setting the `SetSendTimeInterval` to `0` sends the data at the engine's frame rate\. The default is `0`\.

## Bandwidth Limiter<a name="network-bandwidth-control-bandwidth-limiter"></a>

Another technique is to limit outgoing bandwidth in exchange for increased latency in the replication of objects\. In GridMate, you can do this by setting a bandwidth limit on replica manager\. To do so, specify a byte limit for `SetSendLimit`, as in the following example: 

```
ReplicaMgr* replicaManager = session->GetReplicaMgr(); // Get the replica manager instance. This assumes the session has been established.
replicaManager->SetSendLimit(10000); // Set the transmission limit to 10 kilobytes per second.
```

Setting `SetSendLimit` to `0` disables the bandwidth limiter\. The default is `0`\. 

## Controlling Burst Length<a name="network-bandwidth-control-burst-length"></a>

You can use the GridMate limiter to accommodate short bursts in bandwidth if your bandwidth usage is not already at its maximum\. This can be useful in many game applications\. For example, when a user is in a multiplayer lobby, the corresponding bandwidth usage is quite low\. However, when the user joins the game, the bandwidth usage spikes as the initial game state replicates from the server to the client\. To control the length of the burst permitted, specify the desired number of seconds for `SetSendLimitBurstRange`, as in the following example: 

```
ReplicaMgr* replicaManager = session->GetReplicaMgr(); // Get the replica manager instance. This assumes the session has been established.
replicaManager->SetSendLimitBurstRange(5.f); // Set the maximum permitted length of the burst to 5 seconds.
```

Bursts in bandwidth usage are allowed for the number of seconds specified, after which the bandwidth is capped to the value set by `SetSendLimit`\. The default value for `SetSendLimitBurstRange` is 10 seconds\. If bandwidth usage has already reached its limit when the burst occurs, bandwidth usage continues to be capped, and the `SetSendLimitBurstRange` setting has no effect\. 

## Prioritization of Replica Updates<a name="network-bandwidth-control-replica-priority"></a>

Every [replica chunk](network-replicas-chunks.md) has a priority that you can assign\. The priority is represented by an integer from `0` through `65534`\. Larger integers represent higher priorities\. Replicas with higher priorities are sent first\. The default is `32768`\. 

This prioritization is especially important when you use the bandwidth limiter because you can use it to define which objects are more important and which are less important\. If your game has a bandwidth cap and you have prioritized your replicas appropriately, the objects with higher priority are sent more often\. The objects with lower priority are sent only when there is enough bandwidth to accommodate them\. 

For convenience, GridMate provides five predefined priorities that you can use for custom replica chunks: 

```
static const ReplicaPriority k_replicaPriorityHighest = 0xFFFE; // Decimal 65534, highest priority.

static const ReplicaPriority k_replicaPriorityHigh = 0xC000;    // Decimal 49152, high priority.

static const ReplicaPriority k_replicaPriorityNormal = 0x8000;  // Decimal 32768, normal priority. This is the Default.

static const ReplicaPriority k_replicaPriorityLow = 0x4000;     // Decimal 16384, low priority.

static const ReplicaPriority k_replicaPriorityLowest = 0x0000;  // Decimal 0, lowest possible priority.
```

By default, all chunks have normal priority \(**`k_replicaPriorityNormal`**\)\. You can use these predefined priorities as is, or use them to create your own, as in the following example:

```
// A replica chunk with this priority will be sent before all the chunks with Normal priority, but after all the chunks with High priority:
const ReplicaPriority k_myCustomPriority = (k_replicaPriorityNormal + k_replicaPriorityHigh) / 2; // (=Decimal 40960)
```

The priority for the whole replica is the maximum priority found in its chunks\. Priority for a chunk can be set after the chunk is created, or at any point during its lifetime, as in the following example:

```
MyChunk::Ptr myChunk = GridMate::CreateReplicaChunk<MyChunk>(...);
myChunk->SetPriority(k_replicaPriorityLow); // Sets low priority for myChunk.
```

Chunks with the same priority are sent and received in the order of their creation\. Replicas created earlier are sent and received first\.

## Tuning Bandwidth at Runtime<a name="network-bandwidth-control-runtime-tuning"></a>

You can tune bandwidth usage while the game is running by using the following configuration variables \(CVars\):


****  

| CVar | Description | 
| --- | --- | 
| gm\_replicasSendTime | The time, in milliseconds, between replica transmissions\. A value of 0 binds the interval to the GridMate tick rate\. | 
| gm\_replicasSendLimit | The limit, in bytes, of the amount of replica data that can be sent per second\. A value of 0 disables the limit\. | 
| gm\_burstTimeLimit | The time, in seconds, that bursts in bandwidth are allowed\. Bursts are allowed only if the bandwidth is not capped when the burst occurs\. | 