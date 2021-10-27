---
title: Network Hierarchy Entities
description: A reference for creating hierarchical network entities.
linktitle: Hierarchies
---

*Network Hierarchies* provide a convenient way to group related entities under one logical group. Entities in such a hierarchy process their network input together as one, including their input creation, processing and rollback.

{{<important>}}
Network Hierarchies are designed for small groups of entities.

By default the limit is set to 16 entities. You can modify this limit with CVar: `bg_hierarchyEntityMaxLimit`.
{{</important>}}

## Hierarchical Components

In order to declare a network hierarchy, you have to use a combination hierarchical components: `NetworkHierarchyRootComponent` and `NetworkHierarchyChildComponent`. `NetworkHierarchyRootComponent` marks an entity as the root of a hierarchy. It should be placed on the highest parent of your entity prefab or an group of entities. `NetworkHierarchyRootComponent` marks an entity as a child of a hierarchy. It should be added on child entities under the entity with `NetworkHierarchyRootComponent`.

Network hierarchies can be created either in the Editor as as well as by parenting entities at runtime.

### Creating Network Hierarchies in the Editor

1. First, start by creating a network entity with all its network common components:
    - Network Binding Component
    - Network Transform Component


1. We will also add a Mesh component for visual information in the Editor.

1. Here is an example of a simple network entity:

    ![Starting Network Entity](/images/user-guide/gems/reference/multiplayer/starting_network_entity.png)

1. In order to make it a hierarchical root entity, we need to add `Network Hierarchy Root Component`:

    ![Starting Hierarchy Root Entity](/images/user-guide/gems/reference/multiplayer/starting_hierarchy_root_entity.png)

1. This entity will be parent entity for hierarchical child entities.

1. A hierarchical child entity is formed by adding `Network Hierarchy Child Component`.

    ![Starting Hierarchy Child Entity](/images/user-guide/gems/reference/multiplayer/starting_hierarchy_child_entity.png)

1. Notice that this entity is a child entity to the root entity.

    ![Simple Hierarchy Example](/images/user-guide/gems/reference/multiplayer/simple_hierarchy.png)

1. Often a hierarchy is a group of entities that you want to spawn at runtime. In such cases you want to create a prefab out of the entities.

    ![Simple Hierarchy Prefab](/images/user-guide/gems/reference/multiplayer/simple_hierarchy_prefab.png)

1. It is important that the entity with `Network Hierarchy Root Component` as at the top parent entity within the prefab. All other entities should have `Network Hierarchy Child Component` on them.


### ImGui Hierarchy Debugger

O3DE Multiplayer Gem comes with a debugger to help you trouble shoot and analyze hierarchy structure in your level. It can be enabled by bringing up ImGui menu.('HOME' key by default.) And then selecting `Multiplayer` -> `Multiplayer Hierarchy Debugger`.

![Turning On Hierarchy ImGui](/images/user-guide/gems/reference/multiplayer/turning_on_imgui_hierarchy_debugger.png)

With the hierarchy debugger enabled, you will be able to browse hierarchies and get debug text in the world over the root entities of hierarchies.

![Hierarchy Debug Overlay](/images/user-guide/gems/reference/multiplayer/imgui_hierarchy_debugger_overlay.png)

Using this debugger, you can find the following information about a hierarchy:
- Its root entity name
- Total number of entities in the hierarchy
- Entity name of each member within the hierarchy
- `AZ::EntityId` of each member
- Network id of each member, `Multiplayer::NetEntityId`
- Its hierarchical role within the hierarchy, either child, root, or an inner root that acts as a child in the case of nested hierarchies.


### Adding Input Processing to Network Hierarchies

Any entity that has component(s) that perform multiplayer input processing component need to have either:
- `Local Prediction Input Component`
- `Network Hierarchy Root Component`
- `Network Hierarchy Child Component`

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

This will cause this component to require a component that provides multiplayer input processing during entity activation and during its assembly in the Editor, as can be seen in the following screenshot from the Editor.

![Hierarchy Debug Overlay](/images/user-guide/gems/reference/multiplayer/hierarchy_child_entity_with_input_processing_component.png)

As a general rule, a hierarchy must have one `Local Prediction Input Component` at its top parent entity to process multiplayer input.

![Hierarchy Debug Overlay](/images/user-guide/gems/reference/multiplayer/hierarchy_root_with_local_prediction_component.png)

While hierarchical child entities need only to have `Network Hierarchy Child Component` to process their multiplayer input.

![Hierarchy Debug Overlay](/images/user-guide/gems/reference/multiplayer/hierarchy_child_entity_with_input_processing.png)



### Creating Network Hierarchies at Runtime

Network Hierarchies are automatically updated, created and disbanded at runtime whenever parent-child relationship changes among entities with `Network Hierarchy Root Component` or `Network Hierarchy Child Component`.

In other words, you can use `AZ::TransformBus` to attach and detach entities to other entities. If such entities have hierarchical components, any hierarchies involved will be automatically rebuilt at runtime.

### Hierarchies of Hierarchies

It is possible to create a hierarchy out of several hierarchies by attaching the root of one hierarchy to an entity from another hierarchy. In such cases, an inner root (an entity with `Network Hierarchy Root Component`) becomes a hierarchical child until it is detached from the hierarchy. This is useful when constructing vehicles, weapons and players out of different prefabs that are attached and detached at runtime as needed.


{{<note>}}
You can find a lot of extra behind the scenes information by browsing the unit tests for network hierarchies here:
https://github.com/o3de/o3de/blob/development/Gems/Multiplayer/Code/Tests/ServerHierarchyTests.cpp
{{</note>}}
