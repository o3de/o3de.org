---
linkTitle: Physicalize the Terrain
title: Physicalize the Terrain
description: Physicalize the terrain by adding a physics collider.
weight: 500
toc: true
---

In this tutorial section, you will physicalize the terrain by adding a physics collider.

## Add terrain physics

You can add collision to terrain for PhysX simulation and apply [physics materials](/docs/user-guide/interactivity/physics/nvidia-physx/materials/) that define the physical properties of the terrain such as dynamic and static friction. To add physics to a terrain, do the following:

1. Add a **PhysX Heightfield Collider** component to the **Terrain Spawner** entity.

2. The **PhysX Heightfield Collider** component displays a warning about missing a required component. Choose **Add Required Component** and select **Terrain Physics Heightfield Collider** from the list.

3. The **PhysX Heightfield Collider** component adds a collider to the terrain so that dynamic PhysX objects collide with it. You can enable the **Use Baked Heightfield** property for better performance if the heightfield doesn't change at runtime, such as when the terrain is generated from an image gradient (heightmap).

4. The **Terrain Physics Heightfield Collider** component works just like the **Terrain Surface Materials List** component. Add a default physics material for the terrain to define its physical properties. You can also add specific physics materials that match the detail materials you applied in the previous section. For example, if you have detail materials for mud, grass, and rock, you can apply physics materials that are appropriate for those different detail materials.
