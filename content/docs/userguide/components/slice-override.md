---
description: ' Revert overrides in &ly-editor;. '
title: Reverting and Forcing Overrides
---
# Reverting and Forcing Overrides {#component-slice-override}

When you change any part of a slice instance, such as adding a component, removing a component, or modifying a component property, you create an override\. Overrides to component properties are highlighted with bold orange text in the **Entity Inspector**\. You can revert the override to remove the override in order to resume inheriting from the source slice\.

**To revert property overrides**

1. In the **Entity Inspector**, right\-click the property, component, or entity that you modified\.

1. Choose **Revert overrides** and choose one of the following: 
   + **Property** - Revert changes to the property that you selected\.
   + **Component** - Revert all changes to the component that you selected\.
   + **Entity** - Revert all changes to the entity that you selected, such as added or removed components or changed properties\.  
![\[Image NOT FOUND\]](/images/shared/shared-component-slices-revert-property.png)

##  {#component-slice-override-reverting}

**Note**  
In the **Entity Inspector**, reverting overrides to a parent entity doesn't revert overrides to its children\. This only affects changes that you made directly to the parent entity\. 
If you revert overrides to the parent entity in **Entity Outliner**, this change also reverts overrides to its children\.

##  {#component-slice-override-all-entities}

## Forcing a Property Override {#component-slice-force-property-override}

Unmodified properties inherit changes made to the source slice\. If you don't want a property to inherit changes from the source slice, you can create an override to the property\.

**To force a property override**

1. In the **Entity Inspector**, right\-click an unchanged component property\. 

1. Choose **Force property override**\.  
![\[Override changes for a property on a component.\]](/images/userguide/component/component-slices-force-override-modification.png)

   The property override appears orange to indicate that it no longer inherits modifications from the slice\.