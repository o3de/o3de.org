---
linkTitle: Porting Terrains
title: Porting Terrains
description: Learn how to export terrain data and materials from Lumberyard and how to use them in O3DE
weight: 500
toc: true
---

This tutorial teaches you how **export terrain data from Lumberyard** to a set of textures, and how to use these textures with [O3DE terrain system](docs/learning-guide/tutorials/environments/create-terrain-from-images/) to create a terrain with the same topography and overall look.

| O3DE Experience | Time to Complete | Feature Focus | Last Updated |
| - | - | - | - |
| Beginner | 20 Minutes | Port terrain data from Lumberyard to O3DE | February 27, 2024 |

## Export heightmap and splat maps from Lumberyard

Open the [Starter Game project](get-starter-game-project) project with Lumberyard, open the main map and via the top menu open **"Tools/Terrain Editor"** (steps *1.* and *2.*).

![Lumberyard Terrain editor](/images/learning-guide/tutorials/lumberyard-to-o3de/terrain-editor.png)

Via the Terrain Editor File menu (step *3.*) you will be able to **export the heightmap** of this terrain. You can name it `heightmap_gsi.tif` and place it in your O3DE project or Gem (the `_gsi` is important for O3DE to know how to import this texture).

Then you can open the Terrain Texture Layers via the Tools menu (step *4.*) and click on **"Export Splat Map"** for each layer. You can name them as you like and import them in your O3DE project.

![Splat map](/images/learning-guide/tutorials/lumberyard-to-o3de/splat-map.png)

Don't forget to close the Lumberyard Asset Processor from the taskbar when you are done.

## Create the terrain in O3DE

You will need to enable the Terrain Gem on your project (follow [this documentation](/docs/user-guide/project-config/add-remove-gems/) to learn how to enable Gems) then open the SinglePlayer level.

In the Entity Outliner on the left, select the SinglePlayer prefab at the very top. Add both the [**Terrain World**](/docs/user-guide/components/reference/terrain/world) and [**Terrain World Renderer**](/docs/user-guide/components/reference/terrain/world-renderer) level components.

Create a new entity and rename it to **"TerrainSpawner"**. Create a child entity and rename it to **"HeightMap"**. Select the "TerrainSpawner" entity :

1. Set its translation to (1024, 1024, 256).
2. Add a [**Terrain Layer Spawner**](/docs/user-guide/components/reference/terrain/layer_spawner). It will displays a warning about missing a required component. 
3. Choose **Add Required Component** and select [**Axis Aligned Box Shape**](/docs/user-guide/components/reference/shape/axis-aligned-box-shape) from the list. You can set the box dimensions to (2048, 2048, 512).
4. Finally add a [**Terrain Height Gradient List**](/docs/user-guide/components/reference/terrain/height_gradient_list) component. Pick the HeightMap entity from the Entity Outliner.

Now you can select the **"HeightMap"** entity :

1. Set its translation to (0, 0, 0).
2. Add a [**Shape Reference**](/docs/user-guide/components/reference/shape/shape-reference) component and pick the "TerrainSpawner" entity from the Entity Outliner.
3. Add a [**GradientTransformModifier**](/docs/user-guide/components/reference/gradient-modifiers/gradient-transform-modifier/) component and an [**Image Gradient**](/docs/user-guide/components/reference/gradients/image-gradient/) component. Save the level.
4. In the Image Gradient, pick the `heightmap_gsi.tif` (select the StreamingImage with dropdown, else there is currently a crash if you pick the image)

You level should look like the image below

![O3DE terrain](/images/learning-guide/tutorials/lumberyard-to-o3de/terrain.png)

## Re-create terrain materials in O3DE

Todo

![O3DE terrain material](/images/learning-guide/tutorials/lumberyard-to-o3de/terrain-material.png)

## Assign terrain materials in O3DE

Todo

![Surface tags](/images/learning-guide/tutorials/lumberyard-to-o3de/surface-tags.png)

![O3DE terrain final](/images/learning-guide/tutorials/lumberyard-to-o3de/terrain-final.png)
