---
linktitle: Network Entity Hierarchies
title: Multiplayer Network Entity Hierarchies
description: A reference for creating network entity hierarchies in Open 3D Engine (O3DE).
weight: 600
---

*Network Hierarchies* provide a convenient way to group related entities under one logical group. Entities in such a hierarchy process their network input together as one, including their input creation, processing and rollback.

{{<important>}}
Network Hierarchies are designed for small groups of entities.

By default the limit is set to 16 entities. You can modify this limit with CVar: `bg_hierarchyEntityMaxLimit`.
{{</important>}}

## Hierarchical Components

In order to declare a network hierarchy, you have to use a combination of hierarchical components: `NetworkHierarchyRootComponent` and `NetworkHierarchyChildComponent`. `NetworkHierarchyRootComponent` marks an entity as the root of a hierarchy and it should be placed on the highest parent of your entity prefab or a group of entities. `NetworkHierarchyRootComponent` marks an entity as a child of a hierarchy. It should be added on child entities under the entity with `NetworkHierarchyRootComponent`.

Network hierarchies can be created either in the Editor or by parenting entities at runtime.

### Creating Network Hierarchies in the Editor

1. Creating a network entity with all its network common components:
    - Network Binding Component
    - Network Transform Component


1. Add a Mesh component for visual information in the Editor.

1. Here is an example of a simple network entity:

    ![Starting Network Entity](/images/user-guide/networking/multiplayer/starting_network_entity.png)

1. To make it a hierarchical root entity, add a **Network Hierarchy Root** component:

    ![Starting Hierarchy Root Entity](/images/user-guide/networking/multiplayer/starting_hierarchy_root_entity.png)

    The resulting entity is a parent entity for hierarchical child entities.

1. Form a hierarchical child entity by adding a **Network Hierarchy Child** component:

    ![Starting Hierarchy Child Entity](/images/user-guide/networking/multiplayer/starting_hierarchy_child_entity.png)

    Notice that this entity is a child entity to the root entity.

    ![Simple Hierarchy Example](/images/user-guide/networking/multiplayer/simple_hierarchy.png)

    Often, a hierarchy is a group of entities that you want to spawn at runtime. In these cases, you want to create a prefab out of the entities.

    ![Simple Hierarchy Prefab](/images/user-guide/networking/multiplayer/simple_hierarchy_prefab.png)

    It is important that the entity with a **Network Hierarchy Root** component is at the top parent entity within the prefab. All other entities should have a **Network Hierarchy Child** component on them.


### ImGui Hierarchy Debugger

O3DE Multiplayer Gem comes with a debugger to help you trouble shoot and analyze hierarchy structure in an O3DE application. It can be enabled by bringing up ImGui menu (**HOME** key by default), and then selecting **Multiplayer** > **Multiplayer Hierarchy Debugger**. With the hierarchy debugger enabled, you will be able to browse hierarchies and get debug text in the world over the root entities of hierarchies.

Using this debugger, you can find the following information about a hierarchy:
- Its root entity name
- Total number of entities in the hierarchy
- Entity name of each member within the hierarchy
- The `AZ::EntityId` of each member
- The network ID of each member, `Multiplayer::NetEntityId`
- Its hierarchical role within the hierarchy, either child, root, or an inner root that acts as a child in the case of nested hierarchies.


### Adding Input Processing to Network Hierarchies

Any entity that has component(s) that perform multiplayer input processing component need to have either:
- **Local Prediction Input**
- **Network Hierarchy Root**
- **Network Hierarchy Child**

For example, here is an example component that has a `NetworkInput` field in its definition.

```xml
<?xml version="1.0"?>

<Component
    Name="NetworkInputProcessingExampleComponent"
    Namespace="MultiplayerSample"
    OverrideComponent="false"
    OverrideController="false"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

    <NetworkInput Type="float" Name="InputValue" Init="0.0f" />

</Component>
```

Add a component to provide multiplayer input processing:

![Hierarchy Debug Overlay](/images/user-guide/networking/multiplayer/hierarchy_child_entity_with_input_processing_component.png)

As a general rule, a hierarchy must have one **Local Prediction Input** component at its top parent entity to process multiplayer input. However, hierarchical child entities need only a **Network Hierarchy Child** component to process their multiplayer input.


### Creating Network Hierarchies at Runtime

Network hierarchies are automatically updated, created and disbanded at runtime whenever parent-child relationship changes among entities with either a hierarchy root or hierarchy child component. When the `AZ::TransformBus` EBus is used to change the attachments of entities, the hierarchies are updated at runtime.

### Hierarchies of Hierarchies

It is possible to create a hierarchy out of several hierarchies by attaching the root of one hierarchy to an entity from another hierarchy. In such cases, an inner root component becomes a hierarchical child of this new parent, until it is detached from the hierarchy. This is useful when constructing vehicles, weapons and players out of different prefabs that are attached and detached at runtime as needed.


{{<note>}}
For more information on network hierarchies, read the [ServerHierarchyTests source](https://github.com/o3de/o3de/blob/development/Gems/Multiplayer/Code/Tests/ServerHierarchyTests.cpp).
{{</note>}}
