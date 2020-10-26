# Working with Entities<a name="component-entity-outliner-entities"></a>

**Topics**
+ [Creating an Entity](creating-entity.md)
+ [Reordering Entities](#component-entity-outliner-reordering)
+ [Hiding and Showing Entities](#component-entity-outliner-hiding)
+ [Locking Entities](#component-entity-outliner-locking)
+ [Search and Filter for Entities](#component-entity-outliner-filtering)

## Reordering Entities<a name="component-entity-outliner-reordering"></a>

When you create entities or instantiate slices, they appear at the bottom of the list in the **Entity Outliner**\.

**To reorder entities in the Entity Outliner**

1. To move an entity, right\-click an entity and choose **Move up** or **Move down**\.  
![\[Move an entity up and down the Entity Outliner.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/entity_system/component-entity-outliner-reorder.png)

1. You can also drag and drop one or more entities into the preferred order\. Select and drag the entity until a white line appears in your preferred location\.  
![\[Drag and drop to reorder an entity.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/entity_system/component-entity-outliner-reorder-drag-drop.png)

1. To make an entity the child of another entity, select and drag the entity to its intended parent\. A white box appears around the parent entity\.  
![\[Drag and drop to parent an entity.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/entity_system/component-entity-outliner-parenting-drag-drop.png)

## Hiding and Showing Entities<a name="component-entity-outliner-hiding"></a>

You can hide entities so that they don't appear in the viewport, so that the viewport shows only the entities that you want\. If you hide a parent entity, all children entities are also hidden\. You can also hide child entities within a parent entity\.

**To hide and show entities**

1. In the **Entity Outliner**, click the eye icon next to the entity\. The crossed\-out eye icon indicates that the entity doesn't appear in the viewport\.

1. To show the entity, click the icon again\.  
![\[Hide and show entities in the viewport.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/entity_system/component-entity-outliner-hiding.png)

## Locking Entities<a name="component-entity-outliner-locking"></a>

You can lock entities so that they can't be selected in the viewport, so that you can select only the entities that you want to edit\. If you lock a parent entity, all children entities are also locked\. You can also lock child entities within a parent entity\.

**To lock entities**

1. In the **Entity Outliner**, click the lock icon next to the entity\. The icon appears white when the entity is locked\.  
![\[Lock entities in the Entity Outliner so that that can't be selected in the viewport.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/entity_system/component-entity-outliner-locking.png)

1. To unlock the entity, click the lock icon again\.

## Search and Filter for Entities<a name="component-entity-outliner-filtering"></a>

For levels that have many entities, you can search and filter for the entities that you want\. Enter text in the search filter box to find specific entities\.

**To search for an entity by *name***

1. In the **Entity Outliner**, enter the name for the entity\.

1. To filter by component, click the filter icon\. 

1. Enter component names in the search field that appears or scroll and select the entities that you want\. Any entity that has the specified component appears in the results\.  
**Example**  

   The entities that appear have either the **Camera** or the **Trigger Area** components attached\.  
![\[Search for entities in the Entity Outliner.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shared-entity-outliner-search-filter.png)

1. To clear search results, click **Clear**\.

**To search for an entity by *ID***
+ In the **Entity Outliner**, enter the complete ID for the entity\. Partial matches and wildcard searches are not supported\.

You can also sort entities so that they appear in the order that you want in the **Entity Outliner**\.

**To sort entities**

1. In the **Entity Outliner**, click the sort icon\.  
![\[Sort entities in the Entity Outliner.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shared-entity-outliner-sort-filter.png)

1. Choose the following options:
   + **Sort: Manually** – Manually organize entities\. See [Reordering Entities](#component-entity-outliner-reordering)\.
   + **Sort: A to Z **– Sort entities alphabetically, in ascending order\.
   + **Sort: Z to A** – Sort entities, in descending order\.
   + **Scroll to Selected** – When you select an entity in the viewport, the **Entity Outliner** scrolls to that entity\. If you select multiple entities, the **Entity Outliner** scrolls to the last selected entity\.
   + **Expand to Selected** – When you select an entity in the viewport, the **Entity Outliner** expands the hierarchy to show any child entities\.

You can also select an entity in the **Entity Outliner** to find it in the viewport or in reverse\. This feature helps you find the entities that you want, especially in large levels\.

**To locate an entity or slice**

1. In the **Entity Outliner**, right\-click an entity and choose **Find in viewport**\. The viewport navigates to the corresponding entity\.  
![\[Find slices or entities in the viewport from the Entity Outliner.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shared-search-find-in-outliner.png)

1. In the **Entity Outliner**, right\-click the slice or slice entity and choose **Find slice in Asset Browser**\. The **Asset Browser** navigates to the corresponding slice\.  
![\[Find entities or slices in the Asset Browser from the Entity Outliner.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shared-component-entity-outliner-search-find-in-asset-browser.png)

1. In the viewport, right\-click a slice or entity and choose **Find in Entity Outliner**\. The **Entity Outliner** navigates to the corresponding item\.  
![\[Find entities in the Entity Outliner from the viewport.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shared-viewport-search-find-in-outliner.png)