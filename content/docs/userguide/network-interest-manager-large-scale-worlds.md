# Using GridMate for Large\-Scale Worlds<a name="network-interest-manager-large-scale-worlds"></a>

GridMate is Lumberyard's networking system\. Interest manager is Lumberyard's solution to large\-scale networked worlds\.

**Topics**
+ [The Relationship Between Replica Manager and Interest Manager](#network-interest-manager-large-scale-worlds-replica-manager-and-interest-manager)
+ [Interest Manager](#network-interest-manager-large-scale-worlds-interest-manager)
+ [Slice Caching and Entity Lifecycle Management](#network-interest-manager-large-scale-worlds-caching)
+ [Multiplayer Sample Implementation](#network-interest-manager-large-scale-worlds-multiplayer-sample-implementation)
+ [Proximity Net Interest Component](#network-interest-manager-large-scale-worlds-proximity-net-interest-component)
+ [Writing Your Own Interest Manager Attributes, Rules and Rule Handlers in C\+\+](network-interest-manager-custom-rule-handler.md)

## The Relationship Between Replica Manager and Interest Manager<a name="network-interest-manager-large-scale-worlds-replica-manager-and-interest-manager"></a>

Interest manager is an optional feature that controls the sending of replicas in large\-scale network game applications\. [Replica Manager](network-replicas-replica-manager.md) works without interest manager\. However, replica manager sends replicas to all peers\. Thus, all associated entities with the Network Binding component on them appear on all peers\. When the Interest Manager component is created and initialized, it tells the replica manager to no longer broadcast all replicas to all peers\. Interest manager acts as an overseer of replica manager and coordinates replicas and peers\.

![\[Replica manager and interest manager\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/networking/network-interest-manager-large-scale-worlds-1.png)

## Interest Manager<a name="network-interest-manager-large-scale-worlds-interest-manager"></a>

Broadcasting all replicas to all peers is not feasible for large\-scale networked worlds\. For these applications, you can use interest manager to control which replicas are broadcast to which peers and under what conditions\. The following diagram shows the relationship between interest manager, clients, and replicas\.

![\[Interest manager, clients, and replicas\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/networking/network-interest-manager-large-scale-worlds-2.png)

In this arrangement, replicas have *attributes*\. Each peer can have *rules* that define the conditions under which attributes are matched and sent to or removed from that peer\. Your server or authoritative peer can have several *rule handlers* that match rules to attributes\. Interest manager does the work of matching and merging results and sending or removing replicas from the appropriate peers\.

Suppose that you want to build a spatial system that replicates objects based on where your client peer is located within your world\. An *attribute* would be a geometrical volume that represents the location and bounds of the replica\. A *rule* would define a geometrical volume that your client considers in its vicinity of interest\. A *rule handler* would perform smart spatial matching among these spatial objects\.

At a low level, GridMate uses the following constructs to implement attributes, rules, and handlers:

```
GridMate::ProximityInterestAttribute
GridMate::ProximityInterestRule
GridMate::ProximityInterestHandler
```

The [Multiplayer Sample](sample-project-multiplayer-enhanced.md) that is included with Lumberyard contains a practical implementation of these\. For detailed information on writing your own attributes, rules, and rule handlers, see [Writing Your Own Interest Manager Attributes, Rules and Rule Handlers in C\+\+](network-interest-manager-custom-rule-handler.md)\.

## Slice Caching and Entity Lifecycle Management<a name="network-interest-manager-large-scale-worlds-caching"></a>

`NetBindingSystem` caches slices for interest manager\. Slice instances are cached and reused for the entities from the same slice instance\. Whenever a replica is activated, the cache is searched to see if a slice that contains the entity is already in the cache\. If the lookup is successful, the entity is reused\.

When a game entity is no longer needed \(that is, `UnBindGameEntity` is called\), `NetBindingSystem` decides whether to deactivate the entity or destroy it\. If the entity is in the cache, `NetBindingSystem` deactivates the entity\. If the entity is not found in the cache, `NetBindingSystem` destroys the entity\.

## Multiplayer Sample Implementation<a name="network-interest-manager-large-scale-worlds-multiplayer-sample-implementation"></a>

The Multiplayer sample shows how to achieve interest\-based filtering of networked entities in your own application\.

Because the goal is to control entities, interest manager must work with entities and components\. The Multiplayer sample uses the following components to accomplish this:
+ Interest Manager
+ Game Player Net Interest
+ Proximity Net Interest

While the sample is not comprehensive, it provides a starting point for you to understand the technology and implement a system that matches your needs\.

### Interest Manager Component<a name="network-interest-manager-large-scale-worlds-interest-manager-component"></a>

Lumberyard's `AzFramework::InterestManagerComponent` is intended for use as a system component in your application\.

The `InterestManagerComponent` initializes both the interest manager and the following built\-in rule handlers:
+ Proximity rule handler \(`GridMate::ProximityInterestHandler`\) – Use the proximity rule handler to specify, based on their spatial proximity, which entities appear in each of your peers\. The rule handler uses axis\-aligned bounding boxes\.
+ Bitmask rule handler \(`GridMate::BitmaskInterestHandler`\) – Use the bitmask rule handler to filter out replicas based on their bit mask value\. This is useful for entities whose presence is determined by custom grouping\.

To register `InterestManagerComponent` as a system component, override `AZ:: Module:: GetRequiredSystemComponents()`\. As a system component, the `InterestManagerComponent` is initialized before any other nonsystem entities and nonsystem components\. For more information, see [System Components](az-module-system-components.md)\.

For reference, see the following code\. The source file is `\dev\MultiplayerSample\Gem\Code\Source\MultiplayerSampleModule.cpp`\.

```
class MultiplayerSample
    : public CryHooksModule
{
    public:
        MultiplayerSample()
            : CryHooksModule()
        {
            ...
            // System Components
            RegisterSystemComponent<AzFramework::InterestManagerComponent>(); // enabling interest management
			...
        } 
		template<class T>
        void RegisterSystemComponent()
        {
            m_descriptors.push_back(T::CreateDescriptor());
            m_systemComponents.push_back(azrtti_typeid<T>());
        } 
        /**
         * Add required SystemComponents to the SystemEntity.
         */
        AZ::ComponentTypeList GetRequiredSystemComponents() const
        {
            return m_systemComponents; // this is how Lumberyard will get your system components and attach them on your behalf
        }
		...
        AZ::ComponentTypeList m_systemComponents;
};
```

### Game Player Net Interest<a name="network-interest-manager-large-scale-worlds-game-player-net-interest"></a>

The game player net interest rule \(`MultiplayerSample::GamePlayerNetInterest`\) defines the entities in which the game player is interested and contains the `GridMate::ProximityInterestRule`\. The console variable `mps_interestRadius` determines the radius of the game player's interest\. The Multiplayer sample uses the following procedure to create the player entity\. You can find the source code in the file `dev\MultiplayerSample\Gem\Code\Source\Components\Spawn\PlayerSpawnComponent.cpp`\.

```
void PlayerSpawnComponent::SpawnPlayerEntity()
{
    if (m_playerEntity == nullptr)
    {
        m_playerEntity = aznew AZ::Entity("Game Player");
        if (m_playerEntity)
        {
            m_playerEntity->CreateComponent<GamePlayerComponent>();
            m_playerEntity->CreateComponent<GamePlayerNetInterest>();
            m_playerEntity->CreateComponent<AzFramework::NetBindingComponent>();
            m_playerEntity->Init();
            m_playerEntity->Activate(); 
            AZ::EntityBus::MultiHandler::BusConnect(m_playerEntity->GetId());
        } 
       ...
    }
}
```

The rule is created in `GamePlayerNetInterest::BindTargetEntity()`, which is called when the replica of this entity is bound\. The source code location is `\dev\MultiplayerSample\Gem\Code\Source\Components\Networking\GamePlayerNetInterest.cpp`\.

```
void GamePlayerNetInterest::BindTargetEntity(const AZ::EntityId& entityId)
{
	...
    PeerId peerId = InvalidReplicaPeerId;
    EBUS_EVENT_ID_RESULT(peerId, GetEntityId(), GamePlayerInterfaceBus, GetPeerId); // Find our own peer ID. 
    ProximityInterestHandler* proximityInterest = nullptr;
    EBUS_EVENT_RESULT(proximityInterest, AzFramework::InterestManagerRequestsBus, GetProximityInterest);
    if (proximityInterest)
    {
        m_proximityRule = proximityInterest->CreateRule(peerId); // Finally, create the interest manager rule.
    }
     ...
}
```

After the rule is created, the spatial information can be set at any time\. The Multiplayer sample uses `OnTick` to update the player's location\. `GamePlayerNetInterest` retrieves the latest transform of the player location and sets the local proximity rule accordingly\. The source code is in `GamePlayerNetInterest.cpp`\.

```
void GamePlayerNetInterest::OnTick(float deltaTime, AZ::ScriptTimePoint time)
{
    ...
    AZ::Transform worldTM;
    EBUS_EVENT_ID_RESULT(worldTM, m_targetEntityId, AZ::TransformBus, GetWorldTM); 
    // This updates your local proximity rules that define which entities you are interested in.
    m_proximityRule->Set(AZ::Aabb::CreateCenterRadius(worldTM.GetPosition(), m_interestRadius));
}
```

## Proximity Net Interest Component<a name="network-interest-manager-large-scale-worlds-proximity-net-interest-component"></a>

The Proximity Net Interest component describes the attribute for the entity to which it is attached\. The component listens to the transform changes of the entity and updates its internal attribute accordingly\. This allows interest manager to control the entity's presence on peers based on the peers' game player net interest\. In the **Entity Inspector**, the name of this component is **Proximity Interest attribute**\.

![\[Proximity Interest attribute in the Entity Inspector\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/networking/network-interest-manager-large-scale-worlds-3.png)

Entities that are filtered by interest manager have the Proximity Net Interest component attached\. This component listens to transform changes of `TransformComponent` and updates its GridMate attribute accordingly\. The following is the related code snippet from `\dev\MultiplayerSample\Gem\Code\Source\Components\Networking\ProximityNetInterest.cpp`\.

```
void ProximityNetInterestComponent::OnTransformChanged(const AZ::Transform& localTM, const AZ::Transform& worldTM)
{
    ...
    AZ::Aabb bbox = AZ::Aabb::CreateNull();
    CollisionInfo info;
    EBUS_EVENT_ID_RESULT(info, GetEntityId(), CollidableBus, GetCollisionInfo); // Get our bounding box.
    if (info.m_shape)
    {
        bbox = info.m_shape->GetEncompassingAabb();
    }
    m_attribute->Set(bbox); // Update GridMate::ProximityInterestAttribute value for the interest manager.
    ...
}
```