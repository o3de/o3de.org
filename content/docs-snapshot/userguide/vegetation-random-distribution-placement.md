# Random Placement Using the Vegetation Distribution Filter<a name="vegetation-random-distribution-placement"></a>

The **Vegetation Distribution Filter** component creates the look of random placement by limiting the amount of vegetation that the **Vegetation Layer Spawner** component produces\.

Before completing the following procedure, you must have the following:
+ At least one asset defined in your vegetation layer\.
+ An entity that contains a gradient component\. For instructions, see [Creating a Gradient Entity](vegetation-random-distribution-selection.md#create-gradient-entity)\.

**To create random distribution**

1. In the **Entity Outliner**, select the entity that contains the **Vegetation Layer Spawner** component\.

1. In the **Entity Inspector**, click **Add Component** and select **Vegetation Distribution Filter**\.

1. In the **Vegetation Distribution Filter** component's properties, next to **Gradient Entity Id**, click the target button\.

1. In the **Entity Outliner**, select the **Gradient** entity\.

1. \(Optional\) Adjust the values for **Threshold Min** and **Threshold Max** to specify how much of the gradient can appear in the vegetation\. 