---
linkTitle: Experiment Further
title: Experiment Further
description: Experiment with the created terrain.
weight: 600
toc: true
---

In this tutorial section, you can experiment with the created terrain to try out more features of the terrain system.

## Scale the terrain

At this point, the terrain is 256 m x 256 m in size. However, the scale can be adjusted if desired.

1. Select the **Terrain Spawner** entity.

2. Set the **Dimensions** of the **Axis Aligned Box Shape** to `512.0, 512.0, 100.0`.

3. Set the **Z Dimension** of the Transform to `50.0`.

4. If either the heights or the surface materials look blocky, make sure that the Sampling Type on the Image Gradients is set to either `Bilinear` or `Bicubic`.

5. Experiment by setting the box shape to other sizes.

## Duplicate the terrain

1. Right-click on the **Terrain Spawner** entity in the Entity Inspector and choose **Create Prefab...**.

2. A dialog will appear asking if you would like to move or retain the references to external entities. Select **Move**.

3. Create a second copy of the terrain in the level by right-clicking in the Entity Outliner and choosing **Instantiate Prefab...**.

4. Experiment by moving the second copy around in the level.

## Create a hole

1. Create a new entity (hotkey **Ctrl + Alt + N**). Name the entity `Terrain Hole`.

2. With the entity selected, set each dimension of the [**Transform**](/docs/user-guide/components/reference/transform) component's **Translate** values to `0.0 m` so that the entity exists at the origin of the world.

3. Add a [**Terrain Layer Spawner**](/docs/user-guide/components/reference/terrain/layer_spawner) component and an [**Axis Aligned Box Shape**](/docs/user-guide/components/reference/shape/axis-aligned-box-shape) component.

4. Set the **Dimensions** on the **Axis Aligned Box Shape** to `20.0`, `20.0`, `1.0`. This defines the size of the hole.

5. On the **Terrain Layer Spawner**, disable **Use Ground Plane** and set the **Sub Priority** to 10. This creates a terrain spawner with no terrain data and a priority higher than the default.

6. In the viewport window, experiment by dragging the **Terrain Hole** entity around so that it overlaps different parts of the primary terrain.
