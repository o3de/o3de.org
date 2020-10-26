# Reusing Vegetation in Multiple Areas<a name="dynamic-vegetation-reusing-in-multiple-areas"></a>

After you create your vegetation entity, you can designate your customized vegetation to appear in another area\. You do this by referencing another shape\. For example, if you created a forest patch that includes the vegetation assets and arrangement for your level, you can create another entity with a different shape and reference this new shape for your vegetation\. With this feature, you can reuse your vegetation in different areas of your level without creating a separate vegetation entity each time\.

**To reuse vegetation in a new area**

1. In the **Entity Inspector**, select the **BasicCoverage** entity\.

1. Right\-click the entity, choose **Create child entity**, and name it *Cylinder\(PlacementTest\)*\.

1. Click **Add Component** and select the **Cylinder Shape** component\.

1. Select the **Cylinder\(PlacementTest\)** entity and move it away from the vegetation area\.  
![\[Multiple reference shapes for vegetation areas.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/dynamic/create-new-vegetation-reference-area.png)

1. Select the **BasicCoverage** entity\.

1. On the **Vegetation Reference Shape** component, for **Shape Entity Id**, specify the **Cylinder\(PlacementTest\)** entity\.   
![\[Specify different shapes for the Vegetation Reference Shape component.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/dynamic/create-new-vegetation-reference-area-1.png)  
**Example**  

   The vegetation appears in the cylinder instead of the box shape\.  
![\[Switch the reference shape for the vegetation to appear.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/dynamic/create-new-vegetation-reference-area-2.png)