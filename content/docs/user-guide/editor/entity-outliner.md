---
linkTitle: Entity Outliner
title: Entity Outliner
description: Manage your entities with the Entity Outliner in Open 3D Engine (O3DE).
weight: 200
---

The **Entity Outliner** shows all the entities and prefabs in the level. You can view the parenting hierarchies, lock selections, show and hide entities in the viewport, and create search filters.

## Opening Entity Outliner

1. In O3DE Editor, choose **Tools**, **Entity Outliner**.

1. In the Entity Outliner, you can create, select, search, and filter for entities.

   ![Use the Entity Outliner to view all the entities in your level.](/images/user-guide/editor/interface-entity-outliner.png)

   You can select multiple entities by doing one of the following in the **Entity Outliner**:

- Use **Ctrl + Left Mouse Button** to select multiple entities one at a time to be part of a multi-selection.
- Use **Shift + Left Mouse Button** to select a range of entities.

## Reordering Entities

When you create entities or instantiate prefabs in Entity Outliner without anything selected, they appear at the bottom of the list. If an entity is selected, however, the new entity or prefab will be a child of the selected entity.

1. To move an entity, right-click an entity and choose **Move up** or **Move down**.

     ![Move an entity up and down the Entity Outliner.](/images/user-guide/component/entity_system/component-entity-outliner-reorder.png)

1. You can also drag and drop one or more entities into the preferred order. Select and drag the entity until a white line appears in your preferred location.

     ![Drag and drop to reorder an entity.](/images/user-guide/component/entity_system/component-entity-outliner-reorder-drag-drop.png)

1. To make an entity the child of another entity, select and drag the entity to its intended parent. A white box appears around the parent entity.

     ![Drag and drop to parent an entity.](/images/user-guide/component/entity_system/component-entity-outliner-parenting-drag-drop.png)

## Hiding and Showing Entities

You can hide entities so that they don't appear in the viewport, so that the viewport shows only the entities that you want. If you hide a parent entity, all children entities are also hidden. You can also hide child entities within a parent entity.

1. In the **Entity Outliner**, click the eye icon next to the entity. The crossed-out eye icon indicates that the entity doesn't appear in the viewport.

1. To show the entity, click the icon again.

     ![Hide and show entities in the viewport.](/images/user-guide/component/entity_system/component-entity-outliner-hiding.png)

## Locking Entities 

You can lock entities so that they can't be selected in the viewport.  This allows you to only select the entities that you want to edit. If you lock a parent entity, all child entities are also locked. You can also lock individual child entities within a parent entity.

1. In the **Entity Outliner**, click the lock icon next to the entity. The icon appears white when the entity is locked.

     ![Lock entities in the Entity Outliner so that that can't be selected in the viewport.](/images/user-guide/component/entity_system/component-entity-outliner-locking.png)

1. To unlock the entity, click the lock icon again.

## Search and Filter for Entities

For levels that have many entities, you can search and filter for the entities that you want. Enter text in the search filter box to find specific entities.

**To search for an entity by *name***

1. In the **Entity Outliner**, enter the name for the entity.

1. To filter by component, click the filter icon.

1. Enter component names in the search field that appears or scroll and select the entities that you want. Any entity that has the specified component appears in the results.
**Example**

     The entities that appear have either the **Camera** or the **Trigger Area** components attached.

     ![Search for entities in the Entity Outliner.](/images/shared/shared-entity-outliner-search-filter.png)

1. To clear search results, click **Clear**.

**To search for an entity by *ID***

1. In the **Entity Outliner**, enter the complete ID for the entity. Partial matches and wildcard searches are not supported.

    You can also sort entities so that they appear in the order that you want in the **Entity Outliner**.

**To sort entities**

1. In the **Entity Outliner**, click the sort icon.

     ![Sort entities in the Entity Outliner.](/images/shared/shared-entity-outliner-sort-filter.png)

1. Choose the following options:

     - **Sort: Manually** - Manually organize entities.
     - **Sort: A to Z**- Sort entities alphabetically, in ascending order.
     - **Sort: Z to A** - Sort entities, in descending order.
     - **Scroll to Selected** - When you select an entity in the viewport, the **Entity Outliner** scrolls to that entity. If you select multiple entities, the **Entity Outliner** scrolls to the last selected entity.
     - **Expand Selected** - When you select an entity in the viewport, the **Entity Outliner** expands the hierarchy to show any child entities.

     You can also select an entity in the **Entity Outliner** to find it in the viewport or in reverse. This feature helps you find the entities that you want, especially in large levels.

**To locate an entity or prefab**

1. In the **Entity Outliner**, right-click an entity and choose **Find in viewport**. The viewport navigates to the corresponding entity.

     ![Find prefabs or entities in the viewport from the Entity Outliner.](/images/shared/shared-search-find-in-outliner.png)

1. In the viewport, right-click a prefab or entity and choose **Find in Entity Outliner**. The **Entity Outliner** navigates to the corresponding item.

     ![Find entities in the Entity Outliner from the viewport.](/images/shared/shared-viewport-search-find-in-outliner.png)