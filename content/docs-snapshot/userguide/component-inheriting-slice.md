# Creating Nested Slices<a name="component-inheriting-slice"></a>

A nested slice contains instances of other slices\. Nested slices can store their own overrides for component and entity properties\. They can also contain their own entities\. 

For example, suppose that you have a slice called `wheel.slice`, composed of one wheel\. You have another slice called `motorcyle_body.slice`, composed of an engine, seat, and frame\. You create a new slice called `motorcycle.slice` and add two instances of the wheel slice and one instance of the motorcycle body slice, and then save the changes\. The body and wheel slices are now nested in the motorcycle slice\.

**To create a nested slice**

1. In the **Entity Outliner**, drag one or more slices onto another slice\. The slices become child entities of the slice you dropped them on\.

1. Right\-click the parent entity and choose **Create slice**\.

1. The **Create Slice** dialog box will appear giving you a choice of creating a fresh slice or a nested slice\. Choose **Nested Slice**\.  
![\[Choose Nested Slice in the Create Slice dialog box.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/create-slice-fresh-or-nested.png)

1. Enter a file name for the slice and then save\.

When you create a slice hierarchy, you can select the root slice for that slice\. This is useful if you have a large slice hierarchy and you want to quickly navigate between the slice instances\.

**To move up or down the slice hierarchy**

1. In the **Entity Outliner**, right\-click a child entity in the slice hierarchy and choose **Select slice root**\.

1. In the dialog menu, view the slice hierarchy for the selected slice\.  
![\[Select the slice root in the Entity Outliner.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/component/entity-outliner-select-slice-root.png)

1. Choose a slice to select that slice in the **Entity Outliner**\.

**Note**  
To select the top slice in the hierarchy, select a slice and press **Shift\+R**\.
To select the next parent slice up, press **R**\.