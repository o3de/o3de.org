---
linkTitle: Collision Groups
title: PhysX Collision Groups
description: ' Create collision groups for the PhysX system in Open 3D Engine. '
weight: 400
toc: true
---

Collision groups act as masks for collision layers. You can specify which collision layers are part of a collision group. A collision layer can be included in multiple collision groups. Each PhysX collider component can interact with one collision group. The collider can interact with any collider assigned to a collision layer included in the selected collision group.

Colliders interact if their collision layers are in each other's collision group. If one collision layer is not present in the other layer's collision group, the colliders don't interact.

## Create a collision group

1. In O3DE Editor, from the **Tools** menu, choose **PhysX Configuration**.

1. Choose the **Collision Filtering** tab.

1. Click the **Groups** button to view the collision groups list. The available collision layers appear as columns.

1. Click **Add**, and then enter the name of the group into the text box.

    ![Adding Collision Groups in the PhysX Configuration tool.](/images/user-guide/interactivity/physics/nvidia-physx/configuring/physx-configuration-4.png)

1. Check the checkbox in the collision layer column to include the collision layer in the collision group. Clear the checkbox to exclude the collision layer from the collision group.

## Collision group assignment

1. In **O3DE Editor**, select an entity with a **PhysX Collider** component you'd like to assign a collision group.

1. In the **PhysX Collider** component, from the **Collides With** property, choose one of the available collision groups from the drop-down list.

    ![Choosing a collision group for the PhysX Collider component in the Entity Inspector.](/images/user-guide/interactivity/physics/nvidia-physx/configuring/physx-configuration-5.png)

## Example collision group configuration 

The following example defines **Player**, **Enemy**, **Bullet**, and **Terrain** layers. These collision layers are categorized into the following collision groups:

+ **PlayerBullet** - Collides with **Enemy** and **Terrain**.
+ **EnemyBullet** - Collides with **Player** and **Terrain**.
+ **TerrainCollision** - Collides with **Player**, **Enemy**, **Bullet**, and **Terrain**.
+ **PlayerCollision** - Collides with **Enemy**, **Bullet**, and **Terrain**.

![An example collision group configuration.](/images/user-guide/interactivity/physics/nvidia-physx/configuring/physx-configuration-6.png)

A bullet fired by the player has the following layer and group:
+ Layer: **Bullet**
+ Group: **PlayerBullet**

A bullet fired by the enemy has the following layer and group:
+ Layer: **Bullet**
+ Group: **EnemyBullet**

{{< note >}}
You don't have to define an "enemy bullet" or a "player bullet" layer. Instead, define a single **Bullet** layer and create separate collision groups to specify the objects that it collides with.
{{< /note >}}
