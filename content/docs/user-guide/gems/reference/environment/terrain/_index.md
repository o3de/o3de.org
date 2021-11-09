---
linkTitle: Terrain
title: Terrain Gem
description: Introduction to the Open 3D Engine (O3DE) Terrain Gem.
toc: true
---


The Terrain Gem is an experimental terrain system.  Use the terrain system to create, manipulate, render, and simulate a terrain surface.

## Features

The Terrain Gem has the following key features:

* Maps height, color, and surface data to regions of the world.
* Provides gradient-based and shape-based authoring tools and workflows to create and manipulate the terrain data.
* Exposes a queryable API that is usable by both simulation and rendering.
* Renders an efficient, high-quality terrain visualization across the view distance.
* Integrates with physics to provide a "physical" simulation of the terrain in the virtual world.

## Enabling the Terrain Gem

To enable the Terrain Gem, do the following:

1. Use **Project Manager** or the command line to add the Terrain Gem to your project.
2. Build your project using Project Manager, Visual Studio, or CMake.

## Components

| Component | Description | 
| - | - |
| [Terrain Layer Spawner](/docs/user-guide/components/reference/terrain/layer_spawner) | Spawns a terrain region contained within configurable bounds, and allows prioritization of overlapping terrain layers. |
| [Terrain Height Gradient List](/docs/user-guide/components/reference/terrain/height_gradient_list) | Provides terrain height data from a list of gradients. |
| [Terrain Surface Material List](/docs/user-guide/components/reference/terrain/surface-material-list) | Defines mappings between a surface type and a render material. |