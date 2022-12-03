---
linkTitle: Create Terrain from Images
title: Create Terrain from Images
description: Learn to create terrain in Open 3D Engine (O3DE) by using source images as inputs.
---

Terrain in **Open 3D Engine (O3DE)** is generated from *gradients*. Gradients, in the context of this tutorial, represent changes in elevation and weight masks for materials. Gradients can be generated procedurally or processed from an image. In this tutorial, you'll create terrain elevation and apply detail materials using image gradients, and add support for PhysX simulations with a heightfield collider and physics materials.

This tutorial requires that you have the **Terrain**, **Gradient Signal**, **Landscape Canvas**, and **PhysX** Gems enabled in your project.

The final level will look like this:

| | |
| - | - |
| {{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/terrain-final-level-2.png" alt="Illustration of the final tutorial level results." >}} | {{< image-width src="/images/learning-guide/tutorials/environments/terrain-from-images/terrain-final-level.png" alt="Illustration of the final tutorial level results." >}} |

The tutorial is split into several parts to make it easier to refer back to individual sections.

| Tutorial | Description |
| - | - |
| [Create a Terrain-Ready Level](create-a-terrain-ready-level) | Create a new level for O3DE that is ready for authoring terrain. |
| [Create Terrain Assets](create-terrain-assets) | Create the terrain assets needed for this tutorial. |
| [Create Terrain Shape](create-terrain-shape) | Create the overall shape of the terrain in the level. |
| [Texture the Terrain](texture-terrain) | Add color and surface types to the terrain. |
| [Physicalize the Terrain](physicalize-terrain) | Physicalize the terrain by adding a physics collider. |
| [Experiment Further](experiment) | Experiment with the created terrain. |
