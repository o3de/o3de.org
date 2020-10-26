# Networking Architecture<a name="networking-architecture"></a>

## Fundamental Concepts<a name="networking-architecture-fundamental-concepts"></a>

 Lumberyard provides a network layer that supports a wide variety of game types on multiple operating systems and does not restrict game developers to using any particular network topology\. You are able to create games using three network topologies: P2P full mesh, client/server, and a hybrid mode that consists of a full mesh network connected to a client/server network\. You can create gameplay objects that are server authoritative, and gameplay objects that are client authoritative\. 

 In this discussion, peer and host have the following meanings: 

 **Peer** \- A network node that is participating in a game session\. 

 **Host** \- A special kind of a peer that manages the game session\. The host can run on one of the game clients or be a dedicated server\.  

 Synchronization of the states of various networked game objects is achieved through the GridMate replication model\. One important design element is the concept of a `horizon`\. GridMate does not maintain a full graph of the replication network at each node\. Instead, each node is only aware of the peers that it has a direct connection to; everything else is considered the "horizon"\. Nodes keep track of which replica updates are arriving from which peer \(upstream\) only for purposes of routing, so they know where to forward upstream requests and, in the case of hub nodes, where to send them downstream\. Basically, if a node receives a request for a replica it doesn’t own, it forwards it upstream\. 

## GridMate Architecture<a name="networking-architecture-gridmate"></a>

 The following diagram shows the major components of the GridMate architecture and their relationships\. 

![\[GridMate architecture\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/networking/network-architecture-gridmate.jpg)

For more information, see the following pages\.
+ [Carrier](network-carrier.md)
+ [Marshalling](network-marshalling.md)
+ [Sessions](network-session-service.md)
+ [Replicas](network-replicas.md)
+ [Replica Manager](network-replicas-replica-manager.md)