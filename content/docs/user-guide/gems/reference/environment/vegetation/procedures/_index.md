---
linkTitle: Procedures
title: Dynamic vegetation procedures
description: Learn the basic procedures to create realistic-looking dynamic vegetation in Open 3D Engine.
---

Creating realistic dynamic vegetation in O3DE starts with a few basic procedures that you can follow up with endless customizations.

You can perform these procedures in the order that they appear, which presents a basic workflow. Or you can pick and choose the procedures that you need. The examples in these procedures use assets in the Starter Game project.

The following table summarizes each documented procedure, its purpose, and the components used.


****

| Procedure | Purpose | Components Used |
| --- | --- | --- |
| [Creating a Vegetation Layer](./layer) | The first basic step in creating dynamic vegetation. Establishes the size and shape of your vegetation area and adds vegetation assets. | Vegetation Layer Spawner, a Shape component, and Vegetation Asset List |
| [Using Gradients to Create Random Distribution](./gradient-random) | Gradients can create a random, natural look in the selection and placement of your vegetation. You add a Gradient component to a separate entity and reference it from the Vegetation Layer Spawner entity. | On the **Gradient** entity: **Perlin Noise Gradient** and **Gradient Transform Modifier** On the **Vegetation Layer Spawner** entity: **Vegetation Asset Weight Selector** and **Vegetation Distribution Filter** |
| [Adding Scale, Rotation, and Position Modifiers](./adding-modifiers) | Changes the look of your vegetation even more by adding scale, rotational, and positional variances. Uses the gradient that you created in the previous procedure. | Vegetation Rotation Modifier, Vegetation Scale Modifier, and Vegetation Position Modifier |
| [Expanding Vegetation Coverage](./coverage) |  Expand your vegetation coverage to use in another area or to cover your entire level.  |  **Vegetation Reference Shape** or **Shape** component  |
| [Blocking Vegetation in Select Areas](./blockers) |  Create a vegetation blocker to prevent vegetation from appearing in a specific area of your level.  |  **Vegetation Layer Blocker** and a **Shape** component  |
