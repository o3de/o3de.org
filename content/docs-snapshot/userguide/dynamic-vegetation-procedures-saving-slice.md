# Saving the Vegetation Area as a Slice<a name="dynamic-vegetation-procedures-saving-slice"></a>

Save your vegetation area as a slice so that you can easily place it in other locations or levels and further customize it\.

Slices enable you to place multiple instances of the vegetation for your level\. If you make a change to a slice, you can save the override to all other instances of the slice\. For example, if you change the vegetation asset type from red to yellow flowers, you can choose to update all instances of the slice so that the vegetation area appears with yellow flowers\.

For more information, see [Working with Slices](component-slices.md)\.

**To reference vegetation using slices**

1. In the **Entity Inspector**, select the **BasicCoverage** entity\.

1. Right\-click the entity and choose **Create slice**, enter a name such as *`BasicCoverage.slice`*, and save it to a directory\.

1. In the **Asset Browser**, navigate to the `BasicCoverage.slice` file\.

1. Select and drag the file into the viewport\. This creates an instance of the slice\.  
**Example**  

   Two slice instances in the viewport have the same vegetation assets and configuration\.  
![\[Use slice instances to replicate vegetation areas.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/dynamic/create-new-vegetation-reference-area-slice-1.png)

1. Select the new instance of the **BasicCoverage** entity\.

1. On the **Vegetation Asset List** component, click the **Mesh Asset** and select a yellow flower asset\.   
![\[In the slice instance that you placed, select a yellow flower for the Mesh Asset.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/dynamic/create-new-vegetation-reference-area-slice-2.png)
**Note**  
A property that appears orange has an override\. An override is a component change that is different than its source slice\. For more information, see [Modifying a Slice and Saving Changes](component-slice-push-changes.md)\.

1. Right\-click the property, choose **Save field override**, and choose `basiccoverage.slice`\. 

   This updates all instances of the slice to use yellow flowers\.