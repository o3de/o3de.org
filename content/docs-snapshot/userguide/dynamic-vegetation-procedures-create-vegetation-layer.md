# Creating a Vegetation Layer<a name="dynamic-vegetation-procedures-create-vegetation-layer"></a>

Creating a vegetation layer is the first and most basic step in creating your dynamic vegetation\. The following procedure uses a simple workflow and assets from the Starter Game project\.

**To create a vegetation layer**

1. [Create an entity](creating-entity.md) and name it\. 

   In this example, the entity is named *BasicCoverage*\.  
![\[Create an entity and name it BasicCoverage.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/dynamic/create-vegetation-layer-basic-coverage.png)

1. [Add](component-working-adding.md) the **Vegetation Layer Spawner** component to your entity\.  
![\[Add the Vegetation Layer Spawner component to your entity.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/dynamic/create-vegetation-layer-layer-spawner.png)

   The **Vegetation Layer Spawner** component is the core component that initializes the engine that spawns vegetation\.

1. Click **Add Required Component** and choose **Vegetation Reference Shape**\.  
![\[Choose the Vegetation Reference Shape for your Vegetation Layer Spawner.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/dynamic/create-vegetation-layer-add-shape.png)

   The **Vegetation Reference Shape** has no shape on its own\. You must next create a child entity and add a **Shape **component, which you will reference in the **Vegetation Reference Shape**\.

1. Right\-click **BasicCoverage**, select **Create Child Entity**, and name it **TestBox**\.

1. Select **TextBox**, click **Add Component**, and select the **Box Shape** component\.

1. Adjust the size and position of the shape so that it's large enough for your purposes and intersects with the ground\.  
![\[Adjust your shape to cover a sufficient area and intersect with the ground.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/dynamic/create-vegetation-layer-adjust-shape.png)

1. Select **BasicCoverage** and, in the **Vegetation Reference Shape** component, click the target symbol and select the **TestBox** entity\.

1. Click **Add Required Component** and choose **Vegetation Asset List**\.

   The **Vegetation Asset List** component defines what to plant\. This is where you specify vegetation assets\.  
![\[On the Vegetation Layer Spawner, click Add Component and select Vegetation Asset List.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/dynamic/create-vegetation-layer-asset-list.png)

1. In the **Vegetation Asset List** component, next to **Mesh Asset**, click **Browse \(\.\.\.\)**\.  
![\[Click Browse (…) to select a Mesh Asset.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/dynamic/create-vegetation-layer-browse.png)

1. In the **Search** bar, enter **grass** and select one of the grass assets in the results\.  
![\[Click Browse (…) to select a Mesh Asset.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/dynamic/create-vegetation-layer-asset-grass.png)

   You should have a uniform grassy field with the grass in a grid formation\.  
![\[After selecting your grass asset, you have a grassy field with a grid-like appearance.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/dynamic/create-vegetation-layer-grass-grid.png)