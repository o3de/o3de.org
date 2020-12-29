# Blocking Vegetation in Select Areas<a name="dynamic-vegetation-procedures-vegetation-blockers"></a>

You can create areas in your level to block vegetation from appearing\. For example, you can use this feature to create areas around buildings or homes where vegetation shouldn't appear\.

**To block vegetation in select areas**

1. Create an entity and name it *Blocker*\.

1. Click **Add Component** and select the **Vegetation Layer Blocker** component\. 

1. Click **Add Required Component** and select a shape, such as the **Box Shape** component\.

1. In the **Box Shape** component properties, for **Dimensions**, enter values for the x\-, y\-, and z\-axes, such as `6.0`, `6.0`, and `4.0`\.  
![\[Create a vegetation area blocker.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/dynamic/block-vegetation-select-areas-1.png)

1. Move the **Blocker** entity to the vegetation area\. The entity blocks the vegetation from appearing in the specified shape\.  
**Example**  

   A box shape vegetation blocker placed in the same area as a **Mesh** component blocks vegetation within and around the tower mesh\.  
![\[Specify vegetation blockers in your level.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/dynamic/block-vegetation-select-areas-2.png)