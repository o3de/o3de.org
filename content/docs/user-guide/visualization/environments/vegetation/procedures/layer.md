---
linkTitle: Layers
title: Creating a Vegetation Layer
description: Create a basic vegetation layer in Open 3D Engine.
weight: 100
toc: true
---

Creating a vegetation layer is the most basic step in creating your dynamic vegetation, however a few requirements must be met in order to spawn vegetation successfully.


**Prerequisites**

To spawn vegetation assets using a **Vegetation Layer Spawner** component, you must have a surface to plant on. You can establish a surface by doing any of the following:

* Add a **Mesh Surface Tag Emitter** component to the *Ground* entity that exists as a part of the *Atom Default Environment* entity hierarchy that is included with each new level. (This technique is used in the example that follows.)
* Add a **Mesh Surface Tag Emitter** component to any other entity that has a Mesh component.
* Add a **Shape Surface Tag Emitter** component to an entity that has a Shape component.
* Add [Terrain](/docs/user-guide/components/reference/terrain/layer_spawner) to the level.

You must also have vegetation assets that the **Vegetation Layer Spawner** can spawn. For the example that follows, we created a prefab named `DryGrassLarge.prefab` using the following steps:

1. Create a new entity.
2. Add a **Mesh** component.
3. Assign a vegetation `.fbx` file to the **Mesh** component.
4. Save the entity as a prefab.

Now that the basic requirements for spawning vegetation are met, we can create our vegetation layer.


**To create a vegetation layer**

1. Create an entity and name it.

    In this example, the entity is named *BasicCoverage*.

    ![Create an entity and name it BasicCoverage.](/images/user-guide/vegetation/dynamic/create-vegetation-layer-basic-coverage.png)

2. Add the **Vegetation Layer Spawner** component to your entity.

    ![Add the Vegetation Layer Spawner component to your entity.](/images/user-guide/vegetation/dynamic/create-vegetation-layer-layer-spawner.png)

    The **Vegetation Layer Spawner** component is the core component that initializes the engine that spawns vegetation.

3. Click **Add Required Component** and choose **Shape Reference**.

    ![Choose the Shape Reference for your Vegetation Layer Spawner.](/images/user-guide/vegetation/dynamic/create-vegetation-layer-add-shape.png)

    The **Shape Reference** has no shape on its own. You must next create a child entity and add a **Shape component**, which you will reference in the **Shape Reference**.

4. Right-click **BasicCoverage**, select **Create Entity**, and name it *TestBox*.

5. Select *TestBox*, click **Add Component**, and select the **Box Shape** component.

6. Adjust the size and position of the shape so that it's large enough for your purposes and intersects with the ground.

    ![Adjust your shape to cover a sufficient area and intersect with the ground.](/images/user-guide/vegetation/dynamic/create-vegetation-layer-adjust-shape.png)

7. Select *BasicCoverage* and, in the **Shape Reference** component, click the {{< icon "picker.svg" >}} **entity picker** icon and select the *TestBox* entity.

8. Click **Add Required Component** and choose **Vegetation Asset List**.

    The **Vegetation Asset List** component defines what to plant. This is where you specify vegetation assets.

    ![On the Vegetation Layer Spawner, click Add Component and select Vegetation Asset List.](/images/user-guide/vegetation/dynamic/create-vegetation-layer-asset-list.png)

9. In the **Vegetation Asset List** component, change the **Instance Spawner** type to Prefab, and then next to **Prefab Asset**, click the {{< icon "file-folder.svg" >}} **folder** icon to browse for your asset.

    ![Click the Folder icon to select a Prefab Asset.](/images/user-guide/vegetation/dynamic/create-vegetation-layer-browse.png)

10. In the **Pick a Prefab** window, enter *grass* into the search bar to filter the list of available prefabs. Select the `DryGrassLarge.prefab` asset in the results.

     ![Use search to find a prefab asset.](/images/user-guide/vegetation/dynamic/create-vegetation-layer-asset-grass.png)

     You should have a uniform grassy field with the grass in a grid formation.

     ![After selecting your grass asset, you have a grassy field with a grid-like appearance.](/images/user-guide/vegetation/dynamic/create-vegetation-layer-grass-grid.png)
