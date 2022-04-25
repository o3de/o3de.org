---
linkTitle: Using Gradients
title: Using Gradients to Create Random Distribution
description: Link gradient entities to vegetation entities to create random distribution in Open 3D Engine dynamic vegetation.
weight: 600
toc: true
---

You can use gradients in different areas of O3DE, such as with audio and AI. Gradients are particularly helpful in dynamic vegetation, where they create a realistically random look in the distribution of your vegetation.

You can achieve the appearance of random distribution by using gradients to create both random selection and random placement.

Before you can complete these procedures, you must first [create a vegetation layer](./layer).

Random selection means that the vegetation that is selected for each point on the grid is variable. Each asset's chance of being selected depends on the weight that is assigned to it. You create weight-based random selection using the **Vegetation Asset Weight Selector** component.

Random placement means that some points on the grid have vegetation on them and some don't. The **Vegetation Distribution Filter** limits the amount of vegetation that the **Vegetation Layer Spawner** component produces.

**Topics**
+ [Creating Weight-Based Random Selection](./selection-random)
+ [Random Placement Using the Vegetation Distribution Filter](./place-random)
