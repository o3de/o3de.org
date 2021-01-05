---
description: ' Learn how to synchronize game state by using &ALY;''s component entity
  system. '
slug: network-synchronizing-game-state-using-components
title: Synchronizing Game State Using Components
---
# Synchronizing Game State Using Components<a name="network-synchronizing-game-state-using-components"></a>

The network binding API in the AZ framework provides a way for components to synchronize their states over the network\.

To enable network synchronization for a component, you must do the following:

1. Derive the component from `NetBindable` and implement the network binding interfaces\.

1. Implement a new replica chunk type and add the datasets and RPCs necessary to provide synchronization\.

**Topics**
+ [Synchronizing an Entity with a NetBindingComponent](#network-synchronizing-netbindingcomponent)
+ [Binding Process on Remote Nodes](#network-synchronizing-binding-process-remote)
+ [Unbinding Process](#network-synchronizing-unbinding-process)
+ [NetBindable Component Flexibility](#network-synchronizing-netbindable-flexibility)
+ [Entity IDs](#network-synchronizing-entity-ids)
+ [Synchronizing Animations Across a Network](/docs/userguide/networking/synchronizing-animation.md)
+ [Creating a NetBindable Component](/docs/userguide/networking/replicas-binding.md)
+ [Transform Component Interpolation](/docs/userguide/networking/transform-component-interpolation.md)

## Synchronizing an Entity with a NetBindingComponent<a name="network-synchronizing-netbindingcomponent"></a>

Because a special `NetBindingComponent` is responsible for the actual binding process, entities that need to be synchronized must have a `NetBindingComponent` added to them\. When a game enters a multiplayer session, the `NetBindingComponent` collects replica chunks from the `NetBindable` instances on the entity and adds them to a [Replica](/docs/userguide/networking/replicas-replica.md) primary\. A special `NetBindingChunk` captures and stores spawning and other binding information for the entity\. `NetBindingComponent` instances activated during a multiplayer session automatically start the binding process\.

## Binding Process on Remote Nodes<a name="network-synchronizing-binding-process-remote"></a>

As replicas arrive at remote nodes, `NetBindingChunk` starts the entity spawning and binding process on the remote node\. The binding process is completely asynchronous\. The replicas become active first\. Then an entity spawn request is queued\. After the entity becomes available, its `NetBindable` components are bound to their corresponding chunks\. Finally, the entity is activated\.

## Unbinding Process<a name="network-synchronizing-unbinding-process"></a>

When replicas are removed, affected `NetBindingComponent` instances start the unbinding process\. By default, entities that are unbound from proxy replicas are deleted, but this doesn’t have to be always the case\. A game can choose to keep all entities in place and seamlessly switch to single\-player mode\.

## NetBindable Component Flexibility<a name="network-synchronizing-netbindable-flexibility"></a>

A `NetBindingComponent` must exist for an entity to be bound to the network\. This allows `NetBindable` components to be used in single\-player modes without any additional runtime cost\. `NetBindable` instances can also be disabled for each instance\. This gives you the additional flexibility: The transform component can provide entity transform synchronization by default, but for special entities, a physics or animation component can provide more advanced synchronization\.

## Entity IDs<a name="network-synchronizing-entity-ids"></a>

In Lumberyard, every entity has a unique ID so that it can be referenced in the game\. Entity IDs are 64\-bit strings generated using an algorithm that ensures uniqueness across computing devices\. To reduce binding complexity, the net binding system spawns entities to be bound to proxy replicas using the same ID as the primary\.

The following diagram shows how the net binding system binds an entity to the network and spawns an entity\. It does this with the same ID that it binds to a proxy replica\.

![\[GirdMate network binding system\]](/images/userguide/networking/net-binding-system.png)