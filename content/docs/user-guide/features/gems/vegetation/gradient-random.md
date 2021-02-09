---
description: ' Link gradient entities to vegetation entities to create random distribution
  in Amazon Lumberyard dynamic vegetation. '
title: Using Gradients to Create Random Distribution
---
# Using Gradients to Create Random Distribution {#dynamic-vegetation-procedures-gradient-random-selection}

You can use gradients in different areas of Lumberyard, such as with audio and AI\. Gradients are particularly helpful in dynamic vegetation, where they create a realistically random look in the distribution of your vegetation\.

You can achieve the appearance of random distribution by using gradients to create both random selection and random placement\.

Before you can complete these procedures, you must first [create a vegetation layer](/docs/user-guide/features/gems/vegetation/layer.md)\.

Random selection means that the vegetation that is selected for each point on the grid is variable\. Each asset's chance of being selected depends on the weight that is assigned to it\. You create weight\-based random selection using the **Vegetation Asset Weight Selector** component\.

Random placement means that some points on the grid have vegetation on them and some don't\. The **Vegetation Distribution Filter** limits the amount of vegetation that the **Vegetation Layer Spawner** component produces\.

**Topics**
+ [Creating Weight\-Based Random Selection](/docs/user-guide/features/gems/vegetation/selection-random.md)
+ [Random Placement Using the Vegetation Distribution Filter](/docs/user-guide/features/gems/vegetation/place-random.md)