# Creating a Slice<a name="component-slices-creating"></a>

A slice can contain any number of entities that have their own transform hierarchy\. The slice, however, must have a single transform root\. This means that you can change the size and position of child entities without affecting the parent entity\. But if you change the size or position of the parent entity, the child entities automatically adjust as well\.

**To create a slice**

1. In the viewport or in the **Entity Outliner**, select one or more entities to include in the slice\.

1. In the viewport or the **Entity Outliner** choose **Create slice**\.

1. Save the slice file to the preferred location\. We recommend that you save slices to your game project folder\. Name your slices meaningfully and organize them into directories and subdirectories\. 

**Note**  
If you want Lumberyard Editor to add a number to your slices by default \(for example, *NewSlice001*\), you can set this option in the **General Settings**\. For more information, see [General Settings](lumberyard-editor-customizing.md#lumberyard-editor-customizing-preferences-general)\.
To save multiple entities in a slice, they must have a single transform root\. If they don't, then a **Cannot Create Slice** dialog box appears, giving you the opportunity to fix this issue by creating a root entity\. Select **Yes** to create a root entity while creating the slice\.  

![\[Choose Yes in the Cannot Create Slice dialog box to create a root entity while creating the slice.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/cannot-create-slice-create-root-entity.png)

You also create a slice from another slice\. This creates a new slice and that slice will no longer inherit from its previous source slice\.

For example, if you have a slice instance named `car.slice` and you want to use that slice instance to create a new slice, you can create a detached slice named `bus.slice`\. You will then have two separate slices that no longer inherit from each other\. 

**To create a slice from an existing slice and remove inheritance**

1. In the **Entity Outliner**, select and right\-click the slice instance that you want\.

1. Choose **Create detached slice**\.

1. Enter a file name for the slice and then save\.