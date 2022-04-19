---
linkTitle: Collision Layers
title: PhysX Collision Layers
description: ' Create collision layers for the PhysX system in Open 3D Engine (O3DE). '
weight: 300
toc: true
---

With collision layers, you can place related PhysX entities into categories. The following list demonstrates some example PhysX collision layers:

* **Terrain** - Terrain, flooring, and any entities that player entities can traverse.
* **Static objects** - Entities that have colliders, but no animation or rigid body components, such as large rocks, tree trunks, and walls.
* **Players** - All player controlled entities.
* **Enemies** - Entities that move via script or AI that can deal damage to, and receive damage from, player controlled entities.
* **Projectiles** - Entities that can deal damage.

A project can have up to 64 PhysX collision layers. The layers that you define are specific to your project. When a **PhysX Collider** component is added to an entity, it is assigned a collision layer with index **\[0\]** called `Default`. You can assign each collider component to one layer. An entity can have multiple collider components assigned to different layers.

## Create a collision layer

1. In O3DE Editor, from the **Tools** menu, choose **PhysX Configuration**.

1. Choose the **Collision Filtering** tab.

1. Click the **Layers** button to view the layers list.

1. Type the name of the layer into an available text field. Layer names must be 32 characters or less.

    ![Creating Layers in the PhysX Configuration tool.](/images/user-guide/interactivity/physics/nvidia-physx/configuring/physx-configuration-2.png)

## Collision layer assignment

1. In **O3DE Editor**, select an entity with a **PhysX Collider** component you'd like to assign to a collision layer.

1. In the **PhysX Collider** component, from the **Collision Layer** property, choose one of the available collision layers from the drop-down list.

    ![The PhysX Collider component in the Entity Inspector.](/images/user-guide/interactivity/physics/nvidia-physx/configuring/physx-configuration-3.png)

{{< note >}} 
* If you rename a layer, its references are updated automatically.
* Layers can't be reordered.
* If you create, rename, or delete a collision layer while an entity with a collider assigned to the layer is selected, the changes don't appear in the **Entity Inspector**. To see the changes, deselect and reselect the entity to refresh the component interface.
{{< /note >}}
