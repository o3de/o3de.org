# Modifying a Slice and Saving Changes<a name="component-slice-push-changes"></a>

If you modify an entity that is part of a slice instance, you create an override for that change\. An override means that the slice instance has different component properties than its source slice\. You can verify that a slice has overrides with the following:
+ In the **Entity Inspector**, the components and the properties that differ from the source slice appear orange\. For more information, see [Entity Inspector](component-entity-inspector.md)\.
+ In the **Entity Outliner**, the entity appears orange and has a dot if a child slice has an override\. For more information, see the [Entity Outliner table](component-slices.md#identify-slices)\.

**Example**  
In the **Entity Inspector**, for this slice instance, the **Mesh asset** property is different from its source slice, so the component and the property name appears orange\.   

![\[Properties with overrides.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shared-modify-slice-overrides-entity-inspector.png)
In the **Entity Outliner**, the slice instances with overrides appear orange\.  

![\[Entities with overrides.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shared-modify-slice-overrides-entity-outliner.png)

You can then choose to save that override to all other slice instances\. 

**To save a slice override**

1. In the viewport or the **Entity Outliner**, right\-click the entity, choose **Save slice overrides**, and then select the slice\. This saves the override to all other slice instances\. The number of changes appears next to the slice\. 
**Note**  
You can also right\-click the component property in the **Entity Inspector** and choose **Save field override**\.  
**Example**  

   This shows a slice instance with eight total changes: one removal and seven updates\.  
![\[Save slice overrides for all slice instances.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shared-modify-slice-push-change-overrides.png)

1. To save multiple slice overrides, in the **Entity Outliner** or the viewport, select your entities, right\-click and then choose **Save slice overrides**, **Save slice overrides \(Advanced\)**\.  
![\[Choose Advanced to save slice overrides for all slice instances.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/modify-slice-push-change-multiple-overrides.png)

1. In **Save Slice Overrides – Advanced** dialog box, for **Property**, select the changes that you want and then select the target slices to which you want to save the overrides\. You can also select or deselect the following check boxes\.
   +  **Changed** – Overrides to existing entities\.
   + **Added** – Added entities\.
   + **Removed** – Deleted entities\.  
![\[Select the changes that you want to save to the slice instance.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/shared-modify-slice-push-change.png)

1. When finished, choose **Save Selected Overrides**\.

**Note**  
To quickly save changes to a selected slice, select the slice and press **Alt\+S**\.
Because slices can be nested, you can save modifications to one or more levels of the nested slice hierarchy\. To save changes to the top slice root in the hierarchy, select the root slice and press **Ctrl\+Alt\+S**\.