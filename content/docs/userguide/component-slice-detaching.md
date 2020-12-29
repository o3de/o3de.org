# Detaching Entities and Slice Instances<a name="component-slice-detaching"></a>

You can detach entities within a slice or detach the entire slice instance\. 
+ When you detach an entity, that entity no longer inherits any changes from its source slice\. Use this feature so that the entity becomes a standalone entity\. 
+ When you detach a slice instance, the entities in the slice instance hierarchy no longer inherit changes from the former source slice\. Use this feature if you want this slice instance \(and all its child slices\) to become standalone entities\.
+ This option appears only when you are managing slice hierarchies for a slice instance\. 

![\[Detach the selected entities or all entities in the slice instance.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/modify-slice-detaching-entities.png)

**To detach specific entities within a slice instance**

1. In the **Entity Outliner**, select one or more entities within a slice instance\.

1. Right\-click the selection and choose **Detach**, **Selection**\.

   A dialog box appears that tells you that the entity will be converted into a non\-slice entity and that the action cannot be undone\. 

1. Choose **Detach**\. The selected entities are now standalone\.

You can also detach the entire slice instance so that all entities in the instance are standalone\.

**To detach a slice instance**

1. In the **Entity Outliner**, select any part of a slice\.

1. Right\-click the selection and choose **Detach**, **Instance**\.

   A dialog box appears that tells you that the detached instance will no longer inherit any changes from its slice and that all entities in the slice instance will be converted into non\-slice entities\. 

1. Choose **Detach**\. All entities are now standalone\.