---
linkTitle: Terrain
title: Terrain
description: Create terrain through a combination of proceduralism and authored content.
weight: 100
toc: true
---

The terrain system uses a series of components to enable terrain authoring, simulation, and visualization for levels of aribtrary size. To use the terrain system, you must enable the Terrain Gem for your project.

## System Requirements

To use the full capabilities of the terrain system, enable the following Gems:

| | | |
| - | - | - |
| **Terrain Gem** | Required | Provides the terrain system and the core terrain components. These are the foundation for enabling the terrain system and creating terrain areas. |
| **Gradient Signal Gem** | Dependency | Provides gradient and gradient modifier components, which are used to express height and surface type data to the terrain system. The gradient components generate various gradient signals, such as random noise and Perlin noise, or enable the use of authored data such as height maps or weight maps. The gradient modifier components modify and mix the gradient signals. |
| **Surface Data Gem** | Dependency | Enables the terrain system to emit signals, or tags, that communicate its surface characteristics. This system enables the Dynamic Vegetation system to place objects on the terrain surface without having any direct knowledge or dependency on the terrain system itself. |
| **FastNoise Gem** | Optional | Provides an expressive **FastNoise Gradient** component that generates many procedural noise variations. In **Entity Inspector**, the **FastNoise Gradient** component appears in the **Gradient** category. You use it like any other gradient component. |
