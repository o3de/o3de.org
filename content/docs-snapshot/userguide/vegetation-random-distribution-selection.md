# Creating Weight\-Based Random Selection<a name="vegetation-random-distribution-selection"></a>

When you create distribution using random selection, the vegetation asset that is selected for a particular point on the grid varies\. The assigned weight of each asset determines its chance of selection\. In this procedure, you specify weights and link to the gradient using the **Vegetation Asset Weight Selector** component\.

## Preparing the Vegetation Entity<a name="prepare-vegetation-entity"></a>

The vegetation entity, or the entity that contains the **Vegetation Layer Spawner** component, must contain a component that assigns values for selection of the listed assets\. This procedure uses the **Vegetation Asset Weight Selector** component for that purpose\. It's also helpful, though unnecessary, to add multiple assets if you haven't already\. If you have only one asset listed, your one asset and bare ground are used when you link the gradient in [Creating a Gradient Entity](#create-gradient-entity)\.

**To prepare the vegetation entity**

1. Ensure that you have three or more vegetation assets on your entity that has the **Vegetation Layer Spawner**\.

   To add more vegetation assets, do the following:

   1. In the **Vegetation Asset List** component's properties, next to **Embedded Assets**, click **\+**\.
**Note**  
When specifying your first asset, you don't need to click \+ because there is an empty asset displayed by default\. Specify the mesh\.  
![\[In the Vegetation Asset List component's properties, next to Embedded Assets, click the plus sign.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/dynamic/dynamic-vegetation-procedures-gradient-random-selection-browse.png)

   1. Under the blank asset, listed as **<asset name>**, next to **Mesh Asset**, click **Browse \(…\)**\.  
![\[Under the blank asset, next to Mesh Asset, click Browse (…).\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/dynamic/dynamic-vegetation-procedures-gradient-random-selection-add-asset.png)

   1. In the search bar, enter a search term, such as **flower**, and select a vegetation asset\.  
![\[In the search bar, enter a search term, such as flower, and select a vegetation asset.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/dynamic/dynamic-vegetation-procedures-gradient-random-selection-select-flower.png)

   Repeat this step with different assets until you have three or more assets\.

   Although you have specified multiple assets, only the first asset that you added appears in the Viewport\. The next several procedures show you how to distribute the vegetation so that all of them appear\.

1. Click **Add Component**, **Vegetation Asset Weight Selector**\.

   In the next step, [Creating a Gradient Entity](#create-gradient-entity), you link this component to the gradient, which supplies values between 0\.0 to 1\.0 at a given position\. Assets are then mapped based on those values and each asset's weight and order values\.

## Creating a Gradient Entity<a name="create-gradient-entity"></a>

The gradient entity provides the noise signal to reference from the vegetation entity\.

**To create a gradient entity**

1. [Create a child entity](creating-entity.md) under your vegetation area entity and select it\.

1. Rename your new entity to a descriptive name, such as **Gradient**\.  
![\[Rename your new entity to a descriptive name, such as Gradient.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/dynamic/dynamic-vegetation-procedures-gradient-random-selection-rename-entity.png)

1. [Add](component-working-adding.md) the component **Perlin Noise Gradient**\.

   This component generates a type of noise called Perlin noise, which mimics the type of randomness found in nature\. 
**Note**  
If you don't have the **Gradient** category in your list of components, you must enable the **Gradient** gem\.

1. Add the required **Gradient Transform Modifier** component\.

   This component controls how the procedural noise is generated in the world space\.

1. Click **Add Required Component** and select **Vegetation Reference Shape**\.

1. In the **Vegetation Reference Shape** component's properties, next to **Shape Entity Id**, click the target button\.  
![\[In the Vegetation Reference Shape component's properties, next to Shape Entity Id, click the target button.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/dynamic/dynamic-vegetation-procedures-gradient-random-selection-target.png)

1. In the **Entity Outliner**, select the **TestBox** entity \(or the entity that contains your shape if you named it something else\)\.

   The **Shape Entity Id** field populates with the entity name that you selected and uses the shape on that entity as its reference shape\.  
![\[In the Entity Outliner, select the TestBox entity.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/dynamic/dynamic-vegetation-procedures-gradient-random-selection-basic-coverage.png)

## Linking the Gradient to the Vegetation Area<a name="link-gradient-entity-to-vegetation"></a>

Before the gradient that you created can have any effect on the vegetation, you must reference the gradient from within the vegetation area\. This means the component that you reference the gradient \(in this example, the **Vegetation Asset Weight Selector**\) in uses the gradient's information for its selection of values\. 

You can reference the gradient that you created in any number of components\. In the procedure [Adding Scale, Rotation, and Position Modifiers](dynamic-vegetation-procedures-adding-modifiers.md), you use the same gradient for the vegetation modifiers\.

**To link the gradient entity to the vegetation entity**

1. Select the entity **BasicCoverage**\.

1. On the **Vegetation Asset Weight Selector** component's properties, next to **Gradient Entity Id**, click the target\.  
![\[In the Vegetation Asset Weight Selector component's properties, next to Gradient Entity Id, click the target.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/dynamic/link-gradient-entity-to-vegetation-target.png)

1. In the **Entity Outliner**, select the **Gradient** entity\.

   The **Gradient Entity Id** field populates with the entity name\.

   Your vegetation area should now have variation in its vegetation selection\.  
![\[Vegetation area with random selection of listed assets.\]](http://docs.aws.amazon.com/lumberyard/latest/userguide/images/vegetation/dynamic/link-gradient-entity-to-vegetation-distributed.png)