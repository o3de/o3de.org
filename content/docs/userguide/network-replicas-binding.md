description: ' Bind &ALYlong; components to the network by adding the NetBindingComponent. '
slug: network-replicas-binding
title: Creating a NetBindable Component
---
# Creating a NetBindable Component<a name="network-replicas-binding"></a>

For a Lumberyard component to share data on the network, it must include the `NetBindingComponent`\. The `NetBindingComponent` creates a [replica](network-replicas-replica.md) for the component and can bind any [replica chunk](network-replicas-chunks.md) that a component creates to the replica\.

**To enable networking on a component**

1. Inherit the component from `AzFramework::NetBindable`:

   ```
   #include <AzFramework/Network/NetBindable.h>
   class ShipComponent
   : public Component
   , public AzFramework::NetBindable
   ```

1. Modify the `AZ_COMPONENT` definition to include `AzFramework::NetBindable`:

   ```
   AZ_COMPONENT(ShipComponent,"{D466FD68-96C9-45AF-8A89-59402B0350F7}", AzFramework::NetBindable);
   ```

1. Modify `SerializeContext` to include `AzFramework::NetBindable`:

   ```
   if (serialize)
   {
   serializeContext->Class<ShipComponent, AzFramework::NetBindable, AZ::Component>()
         ...
   }
   ```

1. Implement the `AzFramework::NetBindable` interfaces: 

   ```
   // Called during network binding on the primary. Implementations should create and return a new binding.
   virtual GridMate::ReplicaChunkPtr GetNetworkBinding() = 0;
   
   // Called during network binding on proxies.
   virtual void SetNetworkBinding(GridMate::ReplicaChunkPtr chunk) = 0;
   
   // Called when network is unbound. Implementations should release their references to the binding.
   virtual void UnbindFromNetwork() = 0;
   ```

**Notes**
+ If the `AZ_COMPONENT` definition change is missing, the `NetBindingComponent` does not recognize the component when it checks for components to add to the replica\.
+ If the `SerializeContext` definition is missing, the primary replica still functions correctly\. However, the proxy cannot match the IDs because it is not serialized as an `AzFramework::NetBindable` interface\.
+ Changes to these definitions require a re\-export of levels for the static IDs to match correctly\.

## Network Binding Function Details<a name="network-replicas-binding-details"></a>

The following functions are available for working with component entities on the network\.

### GetNetworkBinding<a name="network-replicas-binding-details-get"></a>

The component uses this function to create its `ReplicaChunk` and initialize any state it wants to synchronize across the session\. This function is called only on the primary `ComponentEntity`\. The `ReplicaChunk` that is returned is automatically attached to the appropriate `Replica`\.

### SetNetworkBinding<a name="network-replicas-binding-details-set"></a>

This function passes a `ReplicaChunk` to the component and initializes the internal data of the component to match that of the `ReplicaChunk`\. This function is called only on the proxy `ComponentEntity` instances that are already bound to an appropriate `Replica`\.

### UnbindFromNetwork<a name="network-replicas-binding-details-unbind"></a>

The `UnbindFromNetwork` function is called to stop the component from reacting to data updates from the network\. This can happen, for example, when the primary no longer exists, has been deactivated, or has relinquished control to the local source\. 

## Creating a Chunk<a name="network-replicas-binding-creating-a-chunk"></a>

After you have enabled the `NetBindable` interface on the *component*, you must create a `ReplicaChunk` object that will store any state that the component wants to share\. 

```
class ShipComponentReplicaChunk : public GridMate::ReplicaChunkBase
{
public:
    AZ_CLASS_ALLOCATOR(ShipComponentReplicaChunk, AZ::SystemAllocator, 0);

    static const char* GetChunkName() { return "ShipComponentReplicaChunk"; }

       ShipComponentReplicaChunk()
        : SetFiring("SetFireLaser")
        , m_playerEntityId("PlayerEntityId")
    {
    }

    bool IsReplicaMigratable()
    {
        return true;
    }

    GridMate::Rpc< GridMate::RpcArg<bool> >::BindInterface<ShipComponent, &ShipComponent::SetFiringRPC, NetworkUtils::ShipControllerRPCTraits> SetFiring;
    GridMate::DataSet<AZ::EntityId>::BindInterface<ShipComponent, &ShipComponent::OnNewNetPlayerEntityId> m_playerEntityId;
};
```

**Note**  
 You must reflect this new replica chunk's datasets and RPCs in the component's `Reflect` function\. 

```
AzFramework::NetworkContext* netContext = azrtti_cast<AzFramework::NetworkContext*>(context);

if (netContext)
{
    netContext->Class<ShipComponent>()
        ->Chunk<ShipComponentReplicaChunk>()
        ->RPC<ShipComponentReplicaChunk, ShipComponent>("SetFireLaser", &ShipComponentReplicaChunk::SetFiring)
        ->Field("PlayerEntityId", &ShipComponentReplicaChunk::m_playerEntityId)
        ;
}
```

In order for the component to react to a change in the `DataSet` object, one of the following must occur:
+ The replica chunk must signal to the component when the change occurs \(in the example, this is done using the `BindInterface` extension to `DataSet`\)\.
+ The component must poll the replica chunk and check the `DataSet` object for changes\.

## Example: Filling Out the AzFramework::NetBindable Interface<a name="network-replicas-binding-netbindable-interface"></a>

The examples below illustrate the use of `GetNetworkBinding`, `SetNetworkBinding` and `UnbindFromNetwork`\.

### GetNetworkBinding<a name="network-replicas-binding-netbindable-interface-get"></a>

In the following example, the component creates the new replica chunk and initializes the data to be networked\. This function is called by the primary replica to retrieve the binding from the component\.

```
GridMate::ReplicaChunkPtr ShipComponent::GetNetworkBinding()
{
    ShipComponentReplicaChunk* replicaChunk = GridMate::CreateReplicaChunk<ShipComponentReplicaChunk>();
    replicaChunk->SetHandler(this);
    m_replicaChunk = replicaChunk;

    return m_replicaChunk;
}
```

### SetNetworkBinding<a name="network-replicas-binding-netbindable-interface-set"></a>

In the following example, the component is bound to the supplied replica chunk\. It also relinquishes its local state to the state specified by the replica chunk\. This function is called on proxies to hand their binding over to the component\.

```
void ShipComponent::SetNetworkBinding(GridMate::ReplicaChunkPtr chunk)
{
    chunk->SetHandler(this);
    m_replicaChunk = chunk;

    ShipComponentReplicaChunk* shipControllerChunk = static_cast<ShipComponentReplicaChunk*>(m_replicaChunk.get());
    SetPlayerEntityIdImpl(shipControllerChunk->m_playerEntityId.Get());        
}
```

### UnbindFromNetwork<a name="network-replicas-binding-netbindable-interface-unbind"></a>

```
void ShipComponent::UnbindFromNetwork()
{
    m_replicaChunk->SetHandler(nullptr);
    m_replicaChunk = nullptr;
}
```

## Maintaining State<a name="network-replicas-binding-maintaining-state"></a>

The last step is to create checks to make sure that any local modifications to the preferred networkable state do not overwrite the networked state\. In addition, you must update the replica chunk whenever the local state changes and the component is in control of the state\. 

```
void ShipComponent::OnNewNetPlayerEntityId(const AZ::EntityId& playerEntityId, const GridMate::TimeContext& tc)
{
    (void)tc;
    SetPlayerEntityIdImpl(playerEntityId);
}

bool ShipComponent::SetFiringRPC(bool firing, const GridMate::RpcContext& rpcContext)
{
    if (AllowRPCContext(rpcContext))
    {
        SetFiring(firing);
    }

    return false;
}    

// Component implementation of to set firing
void ShipComponent::SetFiring(bool firing)
{
    m_isFiring = firing;

    if (!AzFramework::NetQuery::IsEntityAuthoritative(GetEntityId()))
    {
        // If the ship component is not authoritative, send an RPC update to the replica chunk
        ShipComponentReplicaChunk* shipChunk = static_cast<ShipComponentReplicaChunk*>(m_replicaChunk.get());
        shipChunk->SetFiring(firing);
    }
    else
    {
        if (m_isFiring)
        {
            EBUS_EVENT_ID(GetGun(), ShipGunBus, StartFire);
        }
        else
        {
            EBUS_EVENT_ID(GetGun(), ShipGunBus, StopFire);
        }
    }
}

void ShipComponent::SetPlayerEntityIdImpl(AZ::EntityId playerEntityId)
{
    AZ_Error("ShipControllerComponent",!m_playerEntityId.IsValid() || !playerEntityId.IsValid(),"Trying to rebind an already bound ship");
    if (m_playerEntityId != playerEntityId)
    {
        m_playerEntityId = playerEntityId;
        HandleShipSetup();

        if (m_replicaChunk && AzFramework::NetQuery::IsEntityAuthoritative(GetEntityId()))
        {
            // If you are authoritative over the entity and the component is replicated, update the value of the DataSet and propagate to clients 
            ShipComponentReplicaChunk* shipChunk = static_cast<ShipComponentReplicaChunk*>(m_replicaChunk.get());
            shipChunk->m_playerEntityId.Set(m_playerEntityId);
        }
    }
}
```