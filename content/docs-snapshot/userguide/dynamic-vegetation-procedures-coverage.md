# Expanding Vegetation Coverage<a name="dynamic-vegetation-procedures-coverage"></a>

After you create a vegetation patch, you can expand it so that your vegetation covers the entire level\.

**To expand vegetation coverage**

1. Create an entity and name it *WorldBox*\.

1. Click **Add Component** and select the Box Shape component\.

1. In the **Box Shape** component, specify values for the x\-, y\-, and z\-axes to match your level\. For example, if you created a level with a texture dimension of 512 x 512, specify similar values such as `512.0`, `512.0`, and `64.0`\.  
![\[Create an entity to cover your level.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/dynamic/expanding-vegetation-coverage-1.png)

1. Select the **BasicCoverage** entity\.

1. On the **Vegetation Reference Shape** component, for **Shape Entity Id**, select the **WorldBox** entity\.  
![\[Specify the WorldBox entity for the Vegetation Reference Shape component.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/dynamic/expanding-vegetation-coverage-2.png)  
**Example**  

   The vegetation appears for the entire level\. As you move through the level, the vegetation dynamically appears\.  
![\[Specify a world box entity so that vegetation appears for the entire level.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/dynamic/expanding-vegetation-coverage-3.png)