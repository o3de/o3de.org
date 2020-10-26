# Writing Your Own Interest Manager Attributes, Rules and Rule Handlers in C\+\+<a name="network-interest-manager-custom-rule-handler"></a>

You can freely extend the GridMate interest manager system with your own logic\. To create a custom rule handler, inherit and implement the `GridMate::BaseRulesHandler` C\+\+ interface\. The following snippet shows the code for the `BaseRulesHandler` class\.

```
// dev\Code\Framework\GridMate\GridMate\Replica\Interest\RulesHandler.h
  
namespace GridMate
{
    class InterestManager;
 
    /**
    *  BaseRulesHandler: base handler class.
    *  RulesHandler's job is to provide InterestManager with matching pairs of attributes and rules.
    */
    class BaseRulesHandler
    {
    public:
        BaseRulesHandler()
            : m_slot(0)
        {}
 
        virtual ~BaseRulesHandler() { };
 
        /**
        *  Ticked by InterestManager to retrieve new matches or mismatches of interests.
        */
        virtual void Update() = 0;
 
        /**
        *  Returns result of a previous update.
        *  This only returns changes that happened on the previous tick, not the whole world state.
        */
        virtual const InterestMatchResult& GetLastResult() = 0;
 
        /**
        *  Called by InterestManager when the given handler instance is registered.
        */
        virtual void OnRulesHandlerRegistered(InterestManager* manager) = 0;
 
        /**
        *  Called by InterestManager when the given handler is unregistered.
        */
        virtual void OnRulesHandlerUnregistered(InterestManager* manager) = 0;
 
        /**
        *  Returns the InterestMananger that this handler is bound to, or nullptr if it's unbound.
        */
        virtual InterestManager* GetManager() = 0;
 
    private:
        friend class InterestManager;
 
        InterestHandlerSlot m_slot;
    };
} // namespace GridMate
```

Of interest is the method `GetLastResult`, which returns `InterestMatchResult`\. `InterestMatchResult` is essentially an unordered map between replicas and a list of the peers on which the replicas should be present\. If a peer is not on the list for a replica and has the replica's proxy, the interest manager removes the replica's proxy\. The following code shows the declaration of the `InterestMatchResult` class\.

```
// dev\Code\Framework\GridMate\GridMate\Replica\Interest\InterestDefs.h
  
    using InterestPeerSet = unordered_set<PeerId>;
 
    /**
     * InterestMatchResult: a structure to gather new matches from handlers.
     * Passed to handler within matching context when handler's Match method is invoked.
     * User must fill the structure with changes that handler recalculated.
     *
     * Specifically, the changes should have all the replicas that had their list of associated peers modified.
     * Each entry replica - new full list of associated peers.
     */
    class InterestMatchResult : public unordered_map<ReplicaId, InterestPeerSet>
```

It's up to you to decide how you want your rule handler to match up rules and attributes\. To help you get started, GridMate provides some simple base classes for rules and attributes, as the following code shows\.

```
// dev\Code\Framework\GridMate\GridMate\Replica\Interest\InterestDefs.h
 
    /**
    *  Base class for interest rules.
    */
    class InterestRule
    {
    public:
        explicit InterestRule(PeerId peerId, RuleNetworkId netId)
            : m_peerId(peerId)
            , m_netId(netId)
        {}
 
        PeerId GetPeerId() const { return m_peerId; }
        RuleNetworkId GetNetworkId() const { return m_netId; }
 
    protected:
        PeerId m_peerId; ///< the peer this rule is bound to
        RuleNetworkId m_netId; ///< network id
    };
    ///////////////////////////////////////////////////////////////////////////
 
 
    /**
    *  Base class for interest attributes.
    */
    class InterestAttribute
    {
    public:
        explicit InterestAttribute(ReplicaId replicaId)
            : m_replicaId(replicaId)
        {}
 
        ReplicaId GetReplicaId() const { return m_replicaId; }
 
    protected:
        ReplicaId m_replicaId; ///< Replica id this attribute is bound to
    };
```

For more details and examples, see the code for `GridMate::BitmaskInterestHandler` and `GridMate::ProximityInterestHandler`\. The associated source code files are in the Lumberyard directory `dev\Code\Framework\GridMate\GridMate\Replica\Interest`\.