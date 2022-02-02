---
linkTitle: Layers
title: Creating a Vegetation Layer
description: Create a basic vegetation layer in Open 3D Engine.
weight: 100
toc: true
---

Creating a vegetation layer is the most basic step in creating your dynamic vegetation, however a few requirements must be met in order to spawn vegetation successfully.


**Pre-requisites/Setup**

* Vegetation assets spawned via a Vegetation Layer Spawner component require a surface to plant on. This can be done one of several ways:
   * In the following workflow, we established a surface by adding a **Mesh Surface Tag Emitter** component to the *Ground* entity that exists as a part of the *Atom Default Environment* entity hierarchy that is added to each new level.
   * You can also establish a surface by:
     - Adding a **Mesh Surface Tag Emitter** component to any other entity with a Mesh component
     - Adding a **Shape Surface Tag Emitter** component to an entity with a Shape component
     - Adding [Terrain](/docs/user-guide/components/reference/terrain/layer_spawner) to the level
      
* Vegetation assets exist to spawn:
   * In the following workflow, we created a saved prefab to spawn via the **Vegetation Layer Spawner** by:
      1. Creating a new entity
      2. Adding a **Mesh** component
      3. Assigning a vegetation `.fbx` file to the **Mesh** component
      4. Naming and saving the configured entity as a prefab

Now that the basic requirements for spawning vegetation are met, we can create our vegetation layer.


**To create a vegetation layer**

1. Create an entity and name it.

    In this example, the entity is named *BasicCoverage*.

    ![Create an entity and name it BasicCoverage.](/images/user-guide/vegetation/dynamic/create-vegetation-layer-basic-coverage.png)

1. Add the **Vegetation Layer Spawner** component to your entity.

    ![Add the Vegetation Layer Spawner component to your entity.](/images/user-guide/vegetation/dynamic/create-vegetation-layer-layer-spawner.png)

    The **Vegetation Layer Spawner** component is the core component that initializes the engine that spawns vegetation.

1. Click **Add Required Component** and choose **Shape Reference**.

    ![Choose the Shape Reference for your Vegetation Layer Spawner.](/images/user-guide/vegetation/dynamic/create-vegetation-layer-add-shape.png)

    The **Shape Reference** has no shape on its own. You must next create a child entity and add a **Shape component**, which you will reference in the **Shape Reference**.

1. Right-click **BasicCoverage**, select **Create Entity**, and name it *TestBox*.

1. Select *TestBox*, click **Add Component**, and select the **Box Shape** component.

1. Adjust the size and position of the shape so that it's large enough for your purposes and intersects with the ground.

    ![Adjust your shape to cover a sufficient area and intersect with the ground.](/images/user-guide/vegetation/dynamic/create-vegetation-layer-adjust-shape.png)

1. Select *BasicCoverage* and, in the **Shape Reference** component, click the target symbol and select the *TestBox* entity.

1. Click **Add Required Component** and choose **Vegetation Asset List**.

    The **Vegetation Asset List** component defines what to plant. This is where you specify vegetation assets.

    ![On the Vegetation Layer Spawner, click Add Component and select Vegetation Asset List.](/images/user-guide/vegetation/dynamic/create-vegetation-layer-asset-list.png)

1. In the **Vegetation Asset List** component, change the **Instance Spawner** type to Prefab, and then next to **Prefab Asset**, click the folder icon to browse for your asset.

    ![Click the Folder icon to select a Prefab Asset.](/images/user-guide/vegetation/dynamic/create-vegetation-layer-browse.png)

1. We have a saved prefab with *grass* in the name, so in the **Search** bar, we enter *grass* and select the grass asset in the results.

    ![Click the Folder icon to select a Prefab Asset.](/images/user-guide/vegetation/dynamic/create-vegetation-layer-asset-grass.png)

    You should have a uniform grassy field with the grass in a grid formation.

    ![After selecting your grass asset, you have a grassy field with a grid-like appearance.](/images/user-guide/vegetation/dynamic/create-vegetation-layer-grass-grid.png)
